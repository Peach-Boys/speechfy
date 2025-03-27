// hooks/useDrumRnnGenerator.ts
import { useState } from 'react';

const DRUM_RNN_CHECKPOINT =
  'https://storage.googleapis.com/download.magenta.tensorflow.org/tfjs_checkpoints/music_rnn/drum_kit_rnn';

const DRUM_SAMPLES: Record<number, string> = {
  36: '/samples/kick.wav',
  38: '/samples/snare.wav',
  42: '/samples/hat.wav',
  46: '/samples/hat.wav',
  45: '/samples/tom.wav',
  47: '/samples/tom.wav',
  50: '/samples/tom.wav',
};

// 인덱스 -> pitch
const DRUM_IDX_TO_PITCH: Record<number, number> = {
  0: 36, // kick
  1: 38, // snare
  2: 42, // hihat
  3: 45, // tom
};

/**
 * seed pattern(2D 배열) + BPM + bars로 DrumsRNN & 오프라인 렌더링 → WAV
 */
export function useDrumGenerator(
  seedPattern: number[][],
  bpm: number,
  bars: number
) {
  const [loading, setLoading] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  // (1) 패턴 -> NoteSequence 변환
  function patternToNoteSequence(pattern: number[][], curBpm: number) {
    const steps = pattern.length; // ex: 16 (1마디)
    const secPerStep = 60 / curBpm / 4; // 4/4 박자, stepsPerQuarter=4
    const totalTime = steps * secPerStep;

    const notes: any[] = [];
    for (let stepIdx = 0; stepIdx < steps; stepIdx++) {
      const drumList = pattern[stepIdx];
      if (drumList.length > 0) {
        for (const drumIdx of drumList) {
          const pitchVal = DRUM_IDX_TO_PITCH[drumIdx];
          if (pitchVal == null) continue;
          const startTime = stepIdx * secPerStep;
          const endTime = (stepIdx + 1) * secPerStep;
          notes.push({
            pitch: pitchVal,
            startTime,
            endTime,
            isDrum: true,
          });
        }
      }
    }
    return {
      ticksPerQuarter: 220,
      totalTime,
      tempos: [{ time: 0, qpm: curBpm }],
      timeSignatures: [{ time: 0, numerator: 4, denominator: 4 }],
      notes,
    };
  }

  // (2) bars 마디 -> 총 스텝 계산 (1마디=16스텝 가정)
  function computeDurationSeconds(totalSteps: number, curBpm: number) {
    const secPerStep = 60 / curBpm / 4;
    return totalSteps * secPerStep;
  }

  // (3) DrumsRNN이 만든 NoteSequence -> 오프라인 렌더링
  async function scheduleDrumSamples(
    rnnResult: any,
    offlineCtx: OfflineAudioContext
  ) {
    // 샘플 로딩
    const sampleCache: Record<number, AudioBuffer> = {};
    const pitchesUsed = Array.from(
      new Set(rnnResult.notes.map((n: any) => n.pitch))
    );

    // fetch & decode
    for (let pitch of pitchesUsed) {
      const url = DRUM_SAMPLES[pitch as number];
      if (!url) continue;
      const resp = await fetch(url);
      const buf = await resp.arrayBuffer();
      sampleCache[pitch as number] = await offlineCtx.decodeAudioData(buf);
    }

    // 각 노트를 스케줄
    for (let note of rnnResult.notes) {
      const pitch = note.pitch;
      if (!sampleCache[pitch]) continue;
      const startStep = note.quantizedStartStep || 0;
      const qpm = (rnnResult.tempos[0] && rnnResult.tempos[0].qpm) || bpm;
      const secPerStep = 60 / qpm / 4;
      const startTime = startStep * secPerStep;

      const source = offlineCtx.createBufferSource();
      source.buffer = sampleCache[pitch];
      source.connect(offlineCtx.destination);
      source.start(startTime);
    }
  }

  // (4) 메인 함수: DrumsRNN → 오프라인 렌더링 → WAV
  const generateDrumBeat = async () => {
    if (typeof window === 'undefined') return;
    setLoading(true);
    setAudioURL(null);

    try {
      const mm = await import('@magenta/music');
      const { default: WavEncoder } = await import('wav-encoder');

      // 1) DrumsRNN 모델 초기화
      const drumModel = new mm.MusicRNN(DRUM_RNN_CHECKPOINT);
      await drumModel.initialize();

      // 2) 패턴->NoteSequence->quantize
      const seedNoteSeq = patternToNoteSequence(seedPattern, bpm);
      const quantizedSeed = mm.sequences.quantizeNoteSequence(seedNoteSeq, 4);

      // 3) bars 만큼 생성 (1마디=16스텝 → totalSteps = bars*16)
      const totalSteps = bars * 16;
      const seedSteps = quantizedSeed.totalQuantizedSteps; // ex. 16
      const stepsToGenerate = totalSteps + 32; // ex. bars*16 - 16

      // temperature 커스텀
      const temperature = 1.15;

      // continueSequence
      const rnnResult = await drumModel.continueSequence(
        quantizedSeed,
        stepsToGenerate,
        temperature
      );

      // 4) OfflineAudioContext
      // bars마디 => totalSteps => computeDuration
      const offlineDurationSeconds = computeDurationSeconds(totalSteps, bpm);
      const sampleRate = 44100;
      const offlineCtx = new OfflineAudioContext(
        2,
        sampleRate * offlineDurationSeconds,
        sampleRate
      );

      // 5) 스케줄링 + 렌더
      await scheduleDrumSamples(rnnResult, offlineCtx);
      const renderedBuffer = await offlineCtx.startRendering();

      // 6) WAV 인코딩
      const wavData = await WavEncoder.encode({
        sampleRate: renderedBuffer.sampleRate,
        channelData: [
          renderedBuffer.getChannelData(0),
          renderedBuffer.getChannelData(1),
        ],
      });
      const wavBlob = new Blob([wavData], { type: 'audio/wav' });
      const wavURL = URL.createObjectURL(wavBlob);

      setAudioURL(wavURL);
    } catch (err) {
      console.error('Error generating drum WAV:', err);
    }
    setLoading(false);
  };

  return {
    loading,
    audioURL,
    generateDrumBeat,
  };
}
