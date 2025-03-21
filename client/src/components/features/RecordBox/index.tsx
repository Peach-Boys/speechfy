'use client';

import Box from '@/components/common/Box';
import IconClose from '@/components/icons/IconClose';
import { useRecordStatusStore } from '@/stores/recordStatusStore';
import { useState } from 'react';
import Recording from './Recording';
import SelectInstrument from './SelectInstrument';
import SelectMode from './SelectMode';

const label = ['악기 선택', '녹음', '녹음 중'];

function RecordBox() {
  const { setRecordStatus } = useRecordStatusStore();
  const [level, setLevel] = useState<number>(0); // 녹음 절차

  function handleNextLevel() {
    setLevel(level + 1);
  }

  function handleClose() {
    setLevel(0);
    setRecordStatus(false);
  }

  return (
    <Box borderStyle='solid'>
      <div className='flex flex-col items-center gap-10'>
        <div className='w-full h-full flex justify-between'>
          <span>{label[level]}</span>
          <div className='cursor-pointer' onClick={handleClose}>
            <IconClose width={15} height={15} color='#ffffff' />
          </div>
        </div>
        {level == 0 && <SelectInstrument handleNextLevel={handleNextLevel} />}
        {level == 1 && <SelectMode handleNextLevel={handleNextLevel} />}
        {level == 2 && <Recording />}
      </div>
    </Box>
  );
}

export default RecordBox;
