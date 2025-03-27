'use client';

import PlayBar from '@/components/common/PlayBar';
import IconPlay from '@/components/icons/IconPlay';
import IconStop from '@/components/icons/IconStop';
import { useState } from 'react';

interface Props {}

function CompleteSong({}: Props) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <div className='w-full  flex flex-col items-center gap-5'>
      <div className='w-full flex text-xl'>완성 듣기</div>
      <PlayBar currentTime={0} endTime={120} />
      <div
        className='size-10 flex justify-center items-center bg-white rounded-full cursor-pointer'
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? <IconStop /> : <IconPlay />}
      </div>
    </div>
  );
}

export default CompleteSong;
