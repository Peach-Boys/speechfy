if (typeof window === 'undefined') {
  self.window = self;
}

/// <reference lib="webworker" />
let mm;
function floatTo16BitPCM(output, offset, input) {
  for (let i = 0; i < input.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
}

function writeString(view, offset, str) {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}

function encodeWAV(samples, sampleRate) {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  const channels = 1;

  // RIFF header
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(view, 8, 'WAVE');
  // fmt subchunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, channels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * channels * 2, true); // byte rate
  view.setUint16(32, channels * 2, true); // block align
  view.setUint16(34, 16, true); // bits per sample
  // data subchunk
  writeString(view, 36, 'data');
  view.setUint32(40, samples.length * 2, true);

  floatTo16BitPCM(view, 44, samples);

  return view;
}

let spice = null;
let ddspModels = new Map();
let audioFeatures = null;
let audioCtx = null;
async function initModel() {
  try {
    mm = await import('@magenta/music');
    console.log('ininini');
    console.log(mm);
    spice = new mm.SPICE('/model/spice');
    await spice.initialize();

    const violinModel = new mm.DDSP('/model/violin');
    await violinModel.initialize();
    ddspModels.set('violin', violinModel);

    const fluteModel = new mm.DDSP('/model/flute');
    await fluteModel.initialize();
    ddspModels.set('flute', fluteModel);

    const trumpetModel = new mm.DDSP('/model/trumpet');
    await trumpetModel.initialize();
    ddspModels.set('trumpet', trumpetModel);

    const saxophoneModel = new mm.DDSP('/model/tenor_saxophone');
    await saxophoneModel.initialize();
    ddspModels.set('tenor_saxophone', saxophoneModel);
    self.postMessage({ type: 'initialized' });
    console.log(ddspModels);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
const readFileAndProcessAudio = async (src) => {
  try {
    const ctx = new OfflineAudioContext(1, 16000 * 17, 16000);
    await ctx.resume();
    audioCtx = ctx;
    const audioFile = await fetch(src);
    const arrayBuffer = await audioFile.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    audioFeatures = await spice?.getAudioFeatures(audioBuffer);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('알 수 없는 에러 발생');
    }
  }
};
async function convertAudio(instrument, audioSrc, sampleRate = 16000) {
  try {
    await readFileAndProcessAudio(audioSrc);
    const toneTransferredAudioData = await ddspModels
      .get(instrument)
      .synthesize(audioFeatures);
    const dataview = encodeWAV(toneTransferredAudioData, audioCtx.sampleRate);
    const blob = new Blob([dataview], { type: 'audio/wav' });
    const url = window.URL.createObjectURL(blob);
    self.postMessage({ type: 'converted', convertAudio: url });
  } catch (error) {
    throw new Error();
  }
}

self.onmessage = async function (event) {
  const { type, payload } = event.data;

  if (type === 'initialize') {
    console.log('init');
    await initModel();
  } else if (type === 'convert') {
    if (payload) {
      await convertAudio(payload.instrument, payload.audioUrl);
    }
  }
};
