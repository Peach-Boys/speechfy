'use client';

import Metronome from '@/components/features/RecordBox/Metronome';
import IconPlay from '@/components/icons/IconPlay';
import IconStop from '@/components/icons/IconStop';
import useCountDown from '@/hooks/useCountDown';
import { useRecord } from '@/hooks/useRecord';
import clsx from 'clsx';
import React, { SetStateAction } from 'react';

interface Props {
  setIsCreate: React.Dispatch<SetStateAction<boolean>>;
}

function Recording({ setIsCreate }: Props) {
  const { isRecording, startRecording, stopRecording } = useRecord();
  const countdown = useCountDown(isRecording);

  function handleFinishRecording() {
    setIsCreate(false);
    stopRecording();
  }

  return (
    <div className='w-full flex flex-col items-center'>
      {isRecording ? (
        <div className='w-full flex flex-col items-center gap-10'>
          <div
            className={clsx(
              'size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer',
              countdown > 4 ? 'block' : 'none'
            )}
            onClick={handleFinishRecording}
          >
            <IconStop width={20} height={20} color='#000000' />
          </div>
          {countdown > 4 ? (
            <Metronome
              isRecording={isRecording}
              bpm={125}
              onFinish={handleFinishRecording}
            />
          ) : (
            <span className='text-xl font-bold'>
              {countdown == 4 ? 'GO!' : countdown}
            </span>
          )}
        </div>
      ) : (
        <div
          className={clsx(
            'size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer',
            countdown > 4 ? 'block' : 'none'
          )}
          onClick={startRecording}
        >
          <IconPlay />
        </div>
      )}
    </div>
  );
}

export default Recording;
