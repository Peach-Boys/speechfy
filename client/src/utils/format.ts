/**
 * 음악 재생 시간 포맷
 * @param time 시간(초)
 * @returns 음악 재생 시간 포맷 (00:00)
 */
export function formatMusicTime(time: number) {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, '0');

  return `${minutes}:${seconds}`;
}
