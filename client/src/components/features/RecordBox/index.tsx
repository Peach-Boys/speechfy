'use client';

import Box from '@/components/common/Box';
import IconClose from '@/components/icons/IconClose';
import { useRecord } from '@/hooks/useRecord';
import { useUploadFlow } from '@/service/queries/useUploadFlow';
import { INSTRUMENT_TYPE } from '@/service/types/Workspace';
import { ITrack } from '@/types/track';
import { useParams } from 'next/navigation';
import React, { SetStateAction, useEffect, useState } from 'react';
import InstrumentGenerator from '../InstrumentGenerator';
import Recording from './Recording';
import SelectInstrument from './SelectInstrument';
import SelectMode from './SelectMode';

interface Props {
  setIsCreate: React.Dispatch<SetStateAction<boolean>>;
  addTrack: (track: ITrack) => void;
}

const label = ['악기 선택', '녹음', '녹음 중'];

function RecordBox({ setIsCreate, addTrack }: Props) {
  const { workroom_id } = useParams();
  const { isRecording, startRecording, stopRecording, audio } = useRecord();
  const [level, setLevel] = useState<number>(0); // 녹음 절차
  const [instrument, setInstrument] = useState<INSTRUMENT_TYPE | null>(null);
  const [isAutoComplete, setAutoComplete] = useState<boolean>();
  const mutation = useUploadFlow(workroom_id as string, audio);

  function handleNextLevel() {
    setLevel(level + 1);
  }

  function handleClose() {
    setIsCreate(false);
    setLevel(0);
  }

  function handleAddTrack() {
    mutation.mutate();
    addTrack({
      order: 0,
      trackId: 1,
      instrumentName: 'SoundHelix-Song-1',
      trackName: 'SoundHelix-Song-1',
      trackUrl: audio,
      recordId: 1,
      recordUrl: '',
      isPlaying: false,
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
          {!isRecording && !isAutoComplete && (
            <div className='cursor-pointer' onClick={handleClose}>
              <IconClose width={15} height={15} color='#ffffff' />
            </div>
          )}
        </div>
        {level == 0 && (
          <SelectInstrument
            handleNextLevel={handleNextLevel}
            setInstrument={setInstrument}
          />
        )}
        {level == 1 && (
          <SelectMode
            handleNextLevel={handleNextLevel}
            setAutoComplete={setAutoComplete}
          />
        )}
        {level == 2 && !isAutoComplete && (
          <Recording
            isRecording={isRecording}
            stopRecording={stopRecording}
            startRecording={startRecording}
          />
        )}
        {level == 2 && isAutoComplete && (
          <InstrumentGenerator selectedInst={instrument} />
        )}
      </div>
    </Box>
  );
}

export default RecordBox;
