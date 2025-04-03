'use client';

import Box from '@/components/common/Box';
import IconClose from '@/components/icons/IconClose';
import { useRecord } from '@/hooks/useRecord';
import { ITrack } from '@/types/track';
import React, { SetStateAction, useEffect, useState } from 'react';
import Recording from './Recording';
import SelectInstrument from './SelectInstrument';
import SelectMode from './SelectMode';

interface Props {
  setIsCreate: React.Dispatch<SetStateAction<boolean>>;
  addTrack: (track: ITrack) => void;
}

const label = ['악기 선택', '녹음', '녹음 중'];

function RecordBox({ setIsCreate, addTrack }: Props) {
  const { isRecording, startRecording, stopRecording, audio } = useRecord();
  const [level, setLevel] = useState<number>(0); // 녹음 절차

  function handleNextLevel() {
    setLevel(level + 1);
  }

  function handleClose() {
    setIsCreate(false);
    setLevel(0);
  }

  function handleAddTrack() {
    addTrack({
      order: 0,
      trackId: 1,
      instrumentName: 'SoundHelix-Song-1',
      isPlaying: false,
      trackName: 'SoundHelix-Song-1',
      trackUrl: audio,
    });
  }
  useEffect(() => {
    console.log(audio);
    if (!isRecording && audio !== '') {
      handleAddTrack();
      setIsCreate(false);
    }
  }, [audio]);

  return (
    <Box borderStyle='solid'>
      <div className='flex flex-col items-center gap-10'>
        <div className='w-full h-full flex justify-between'>
          <span>{label[level]}</span>
          {!isRecording && (
            <div className='cursor-pointer' onClick={handleClose}>
              <IconClose width={15} height={15} color='#ffffff' />
            </div>
          )}
        </div>
        {level == 0 && <SelectInstrument handleNextLevel={handleNextLevel} />}
        {level == 1 && <SelectMode handleNextLevel={handleNextLevel} />}
        {level == 2 && (
          <Recording
            isRecording={isRecording}
            stopRecording={stopRecording}
            startRecording={startRecording}
          />
        )}
      </div>
    </Box>
  );
}

export default RecordBox;
