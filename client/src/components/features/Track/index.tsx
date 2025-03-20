'use client';

import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import WavePlay from '@/components/features/Track/WavePlay';
import IconDoubleCircle from '@/components/icons/IconDoubleCircle';
import IconTripleDots from '@/components/icons/IconTripleDots';
import { useState } from 'react';

function Track() {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  function handleChangeInstrument() {}
  function handlePlayTrack() {
    setIsPlay(!isPlay);
  }

  return (
    <Box borderStyle='solid'>
      <div className='w-full flex flex-col gap-5'>
        <div className='w-f flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <IconDoubleCircle color='#ffffff' />
            <span>악기 이름</span>
          </div>
          <div className='cursor-pointer'>
            <IconTripleDots color='#ffffff' />
          </div>
        </div>
        <div className='flex gap-4'>
          <Button onClick={handleChangeInstrument}>악기 선택</Button>
          <Button onClick={handlePlayTrack}>트랙 재생</Button>
        </div>
        <WavePlay isPlay={isPlay} />
      </div>
    </Box>
  );
}

export default Track;
