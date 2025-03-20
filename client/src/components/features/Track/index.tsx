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
  const [isMenuOpen, setIsMenuOepn] = useState<boolean>(false);
  const [isSelInstOpen, setIsSelIstOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const selectInstRef = useRef<HTMLDivElement | null>(null);

  function handleChangeInstrument() {}
  function handlePlayTrack() {
    setIsPlay(!isPlay);
  }

  function handleOpenMenu() {
    setIsMenuOepn((prev) => !prev);
  }

  if (menuRef) {
    useOutSideClick(menuRef, () => setIsMenuOepn(false));
  }

  function handleOpenSelInst() {
    setIsSelIstOpen((prev) => !prev);
  }
  if (selectInstRef) {
    useOutSideClick(selectInstRef, () => setIsSelIstOpen(false));
  }

  return (
    <Box borderStyle='solid'>
      <div className='w-full flex flex-col gap-5'>
        <div className='w-f flex justify-between items-center'>
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
              <div ref={menuRef} className='absolute z-1 top-0 right-0'>
                <TrackMenu />
              </div>
            )}
          </div>
        </div>
        <div className='flex gap-4'>
          <div className='relative w-full' onClick={handleOpenSelInst}>
            <Button onClick={handleChangeInstrument}>악기 선택</Button>
            {isSelInstOpen && (
              <div ref={selectInstRef} className='absolute z-1 pt-1'>
                <InstrumentList instrumentId={1} />
              </div>
            )}
          </div>
          <Button onClick={handlePlayTrack}>트랙 재생</Button>
        </div>
        <WavePlay isPlay={isPlay} />
      </div>
    </Box>
  );
}

export default Track;
