'use client';

import Box from '@/components/common/Box';
import IconClose from '@/components/icons/IconClose';
import { useRecord } from '@/hooks/useRecord';
import React, { SetStateAction, useState } from 'react';
import Recording from './Recording';
import SelectInstrument from './SelectInstrument';
import SelectMode from './SelectMode';

interface Props {
  setIsCreate: React.Dispatch<SetStateAction<boolean>>;
}

const label = ['악기 선택', '녹음', '녹음 중'];

function RecordBox({ setIsCreate }: Props) {
  const { isRecording } = useRecord();
  const [level, setLevel] = useState<number>(0); // 녹음 절차

  function handleNextLevel() {
    setLevel(level + 1);
  }

  function handleClose() {
    setLevel(0);
  }

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
        {level == 2 && <Recording setIsCreate={setIsCreate} />}
      </div>
    </Box>
  );
}

export default RecordBox;
