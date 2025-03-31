import { formatMusicTime } from '@/utils/format';
import React from 'react';

interface Props {
  currentTime: number;
  endTime: number;
  disableTime?: boolean;
  isReady?: boolean;
  onSeek?: (time: number) => void;
}

function PlayBar({
  currentTime,
  endTime,
  disableTime = false,
  isReady = true,
  onSeek,
}: Props) {
  const percent = endTime ? (currentTime / endTime) * 100 : 0;

  /**
   * 재생바 클릭 시간 변경 이벤트 함수
   * @param {React.MouseEvent<HTMLDivElement>} e 재생바 클릭 이벤트
   * @returns
   */
  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (!onSeek) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    const time = endTime * percent;
    if (onSeek) onSeek(time);
  }

  if (!isReady) {
    return (
      <div className='relative w-full h-2 bg-gray-700 rounded-full overflow-hidden'>
        <div className='absolute w-full h-2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse bg-gray-400 rounded-full' />
      </div>
    );
  }

  return (
    <div className='w-full'>
      {!disableTime && (
        <div className='flex justify-between text-xs text-gray-400 mb-1 px-1'>
          <span>{formatMusicTime(currentTime)}</span>
          <span>{formatMusicTime(endTime)}</span>
        </div>
      )}
      <div
        className='relative w-full h-1.5 bg-gray-500 rounded-full overflow-hidden'
        onClick={handleSeek}
      >
        <div
          className='absolute top-0 left-0 h-full rounded-full bg-jihyegra shadow-md'
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default PlayBar;
