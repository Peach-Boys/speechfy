'use client';

import Metronome from '@/components/features/RecordBox/Metronome';
import IconPlay from '@/components/icons/IconPlay';
import IconStop from '@/components/icons/IconStop';
import useCountDown from '@/hooks/useCountDown';
import { useState } from 'react';

function Recording() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const countdown = useCountDown(isRunning);

  function handleChangeRunning() {
    if (isRunning) {
      setIsRunning(false);
      return;
    }
    setIsRunning(true);
  }

  return (
    <div className='w-full flex flex-col items-center gap-10'>
      <div
        className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
        onClick={handleChangeRunning}
      >
        {isRunning ? (
          <IconStop width={20} height={20} color='#000000' />
        ) : (
          <IconPlay />
        )}
      </div>
      {isRunning &&
        (countdown > 4 ? (
          <Metronome isRunning={isRunning} />
        ) : (
          <span className='text-xl font-bold'>
            {countdown == 4 ? 'GO!' : countdown}
          </span>
        ))}
    </div>
  );
}

export default Recording;
