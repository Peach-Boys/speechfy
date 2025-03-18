'use client';

import Metronome from '@/components/features/RecordBox/Metronome';
import IconPlay from '@/components/icons/IconPlay';
import IconStop from '@/components/icons/IconStop';
import { useState } from 'react';

function Recording() {
  const [isRunning, setIsRunning] = useState<boolean>(false);

  return (
    <div className='w-full flex flex-col items-center gap-10'>
      <div
        className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
        onClick={() => setIsRunning(!isRunning)}
      >
        {isRunning ? (
          <IconStop width={20} height={20} color='#000000' />
        ) : (
          <IconPlay />
        )}
      </div>
      <Metronome isRunning={isRunning} />
    </div>
  );
}

export default Recording;
