import audioContext from '@/utils/audioContext';

/**
 *
 * @param frequency 주파수(Hz)
 * @param duration 지속 시간(ms)
 * @returns 비프 소리 출력
 */
function playBeep(frequency: number, duration: number) {
  if (!audioContext) {
    console.warn('AudioContext is not available.');
    return;
  }
  const oscillator = audioContext.createOscillator(); // 소리 생성 객체
  const gainNode = audioContext.createGain(); // 소리 볼륨 조절 노드

  oscillator.type = 'sine'; // Sine wave로 부드러운 소리 발생, 1000Hz -> 높은 소리 / 400Hz -> 낮은 소리
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

  // // 볼륨 설정
  gainNode.gain.setValueAtTime(1, audioContext.currentTime);
  // gainNode.gain.exponentialRampToValueAtTime(
  //   0.001,
  //   audioContext.currentTime + duration / 1000
  // ); // 부드로운 종료

  oscillator.connect(gainNode);
  // gainNode.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration / 1000);
}

export default playBeep;
