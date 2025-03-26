import { formatMusicTime } from '@/utils/format';

interface Props {
  currentTime: number;
  endTime: number;
}

function PlayBar({ currentTime, endTime }: Props) {
  const percent = endTime ? (currentTime / endTime) * 100 : 0;
  return (
    <div className='w-full'>
      <div className='flex justify-between text-xs text-gray-400 mb-1 px-1'>
        <span>{formatMusicTime(currentTime)}</span>
        <span>{formatMusicTime(endTime)}</span>
      </div>
      <div className='relative w-full h-1.5 bg-gray-500 rounded-full overflow-hidden'>
        <div
          className='absolute top-0 left-0 h-full bg-jihyegra transition-all duration-300'
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default PlayBar;
