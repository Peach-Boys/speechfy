import { useState } from 'react';
import { NoteSequence } from '@magenta/music';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const WavEncoder = require('wav-encoder');
const MUSIC_VAE_CHECKPOINT =
  'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_chords';

async function mergeAudioBuffers(
  buffers: AudioBuffer[],
  sampleRate: number
): Promise<AudioBuffer> {
  const totalLength = buffers.reduce((sum, buf) => sum + buf.length, 0);
  const offlineCtx = new OfflineAudioContext(1, totalLength, sampleRate);
  const mergedBuffer = offlineCtx.createBuffer(1, totalLength, sampleRate);
  const channelData = mergedBuffer.getChannelData(0);
  let offset = 0;
  for (const buffer of buffers) {
    channelData.set(buffer.getChannelData(0), offset);
    offset += buffer.length;
  }
  return mergedBuffer;
}
async function decodeBlobToAudioBuffer(
  blob: Blob,
  audioCtx: AudioContext
): Promise<AudioBuffer> {
  const arrayBuffer = await blob.arrayBuffer();
  return new Promise((resolve, reject) => {
    audioCtx.decodeAudioData(arrayBuffer, resolve, reject);
  });
}

export function useMusicVaeGenerator(
  bpm: number,
  bars: number,
  temperature: number = 1.3
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [generatedSequence, setGeneratedSequence] =
    useState<NoteSequence | null>(null);

  function computeDurationSeconds(seq: NoteSequence, curBpm: number): number {
    const steps = seq.totalQuantizedSteps || bars * 16;
    const secPerStep = 60 / curBpm / 4;
    return steps * secPerStep;
  }

  async function scheduleMelodySequence(
    seq: NoteSequence,
    offlineCtx: OfflineAudioContext
  ): Promise<void> {
    const qpm = (
      seq.tempos && seq.tempos.length > 0 ? seq.tempos[0].qpm : bpm
    ) as number;
    const secPerStep = 60 / qpm / 4;

    for (const note of seq.notes) {
      let startTime: number;
      let endTime: number;
      if (note.quantizedStartStep != null && note.quantizedEndStep != null) {
        startTime = note.quantizedStartStep * secPerStep;
        endTime = note.quantizedEndStep * secPerStep;
      } else {
        startTime = note.startTime ?? 0;
        endTime = note.endTime ?? 0;
      }

      const oscillator = offlineCtx.createOscillator();
      const gainNode = offlineCtx.createGain();
      oscillator.connect(gainNode).connect(offlineCtx.destination);

      // MIDI 피치를 주파수로 변환 (A4 = 440Hz 기준)
      const frequency = 440 * Math.pow(2, (note.pitch! + 12 - 69) / 12);
      oscillator.frequency.setValueAtTime(frequency, startTime);

      // 간단한 envelope (attack 10ms, release 20ms)
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.5, startTime + 0.01);
      gainNode.gain.setValueAtTime(0.5, endTime - 0.02);
      gainNode.gain.linearRampToValueAtTime(0, endTime);

      oscillator.start(startTime);
      oscillator.stop(endTime);
    }
  }

  const generateMelody = async (): Promise<void> => {
    if (typeof window === 'undefined') return;
    setLoading(true);
    setAudioURL(null);
    setGeneratedSequence(null);
    try {
      const mm = await import('@magenta/music');
      const musicVAE = new mm.MusicVAE(MUSIC_VAE_CHECKPOINT);
      await musicVAE.initialize();
      const audioSamples = [];
      for (let i = 0; i < 2; i++) {
        const sampleSequences: NoteSequence[] = (
          await musicVAE.sample(1, temperature, {
            chordProgression: ['C', 'G', 'Am', 'Fm'],
          })
        ).map((seq) => NoteSequence.create(seq));
        const seq: NoteSequence = sampleSequences[0];
        setGeneratedSequence(seq);

        const durationSeconds = computeDurationSeconds(seq, bpm);
        const sampleRate = 16000;
        const offlineCtx = new OfflineAudioContext(
          1,
          sampleRate * durationSeconds,
          sampleRate
        );
        await scheduleMelodySequence(seq, offlineCtx);

        const renderedBuffer = await offlineCtx.startRendering();

        const wavData = await WavEncoder.encode({
          sampleRate: renderedBuffer.sampleRate,
          channelData: [renderedBuffer.getChannelData(0)],
        });
        const wavBlob = new Blob([wavData], { type: 'audio/wav' });
        audioSamples.push(wavBlob);
      }

      const audioCtx = new AudioContext();
      const buffers: AudioBuffer[] = [];
      for (const blob of audioSamples) {
        const buffer = await decodeBlobToAudioBuffer(blob, audioCtx);
        buffers.push(buffer);
      }
      const mergedBuffer = await mergeAudioBuffers(buffers, 16000);

      const finalWavData = await WavEncoder.encode({
        sampleRate: mergedBuffer.sampleRate,
        channelData: [mergedBuffer.getChannelData(0)],
      });
      const finalBlob = new Blob([finalWavData], { type: 'audio/wav' });
      const finalWavURL = URL.createObjectURL(finalBlob);
      setAudioURL(finalWavURL);
    } catch (err) {
      console.error('Error generating melody:', err);
    }
    setLoading(false);
  };

  return {
    loading,
    audioURL,
    generatedSequence,
    generateMelody,
  };
}
