// audioContext.ts
let audioContext: AudioContext | null = null;
if (typeof window !== 'undefined') {
  const AudioContextClass = window.AudioContext;
  audioContext = new AudioContextClass();
}
export default audioContext;
