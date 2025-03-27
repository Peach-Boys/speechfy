import { formatMusicTime } from '@/utils/format';

interface Props {
  currentTime: number;
  endTime: number;
  disableTime?: boolean;
}

function PlayBar({ currentTime, endTime, disableTime = false }: Props) {
  const percent = endTime ? (currentTime / endTime) * 100 : 0;
  return (
    <div className='w-full'>
      {!disableTime && (
        <div className='flex justify-between text-xs text-gray-400 mb-1 px-1'>
          <span>{formatMusicTime(currentTime)}</span>
          <span>{formatMusicTime(endTime)}</span>
        </div>
      )}
      <div className='relative w-full h-1.5 bg-gray-500 rounded-full overflow-hidden'>
        <div
          className='absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-pink-500 to-orange-400 shadow-md'
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default PlayBar;
