'use client';

import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import InstrumentList from '@/components/features/Track/InstrumentList';
import TrackMenu from '@/components/features/Track/TrackMenu';
import WavePlay from '@/components/features/Track/WavePlay';
import IconDoubleCircle from '@/components/icons/IconDoubleCircle';
import IconTripleDots from '@/components/icons/IconTripleDots';
import useOutSideClick from '@/hooks/useOutSideClick';
import { useRef, useState } from 'react';

function Track() {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSelInstOpen, setIsSelInstOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const selectInstRef = useRef<HTMLDivElement | null>(null);

  function handlePlayTrack() {
    setIsPlay(!isPlay);
  }

  function handleOpenMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  useOutSideClick(menuRef, () => setIsMenuOpen(false));

  function handleOpenSelInst() {
    setIsSelInstOpen((prev) => !prev);
  }

  useOutSideClick(selectInstRef, () => setIsSelInstOpen(false));

  return (
    <Box borderStyle='solid'>
      <div className='w-full flex flex-col gap-5'>
        <div className='w-full flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <IconDoubleCircle color='#ffffff' />
            <span>악기 이름</span>
          </div>
          <div
            className='relative w-auto py-2 cursor-pointer'
            onClick={handleOpenMenu}
          >
            <IconTripleDots color='#ffffff' />
            {isMenuOpen && (
              <div ref={menuRef} className='absolute z-10 top-0 right-0'>
                <TrackMenu />
              </div>
            )}
          </div>
        </div>
        <div className='flex gap-4'>
          <div className='relative w-full'>
            <Button onClick={handleOpenSelInst}>악기 선택</Button>
            {isSelInstOpen && (
              <div
                ref={selectInstRef}
                className='absolute z-10 pt-1 overflow-hidden'
              >
                <InstrumentList instrumentId={1} />
              </div>
            )}
          </div>
          <Button
            onClick={handlePlayTrack}
            buttonStyle='bg-jihyegra text-white'
          >
            트랙 재생
          </Button>
        </div>
        <WavePlay isPlay={isPlay} />
      </div>
    </Box>
  );
}

export default Track;
