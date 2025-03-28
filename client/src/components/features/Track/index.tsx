'use client';

import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import InstrumentList from '@/components/features/Track/InstrumentList';
import TrackMenu from '@/components/features/Track/TrackMenu';
import WavePlay from '@/components/features/Track/WavePlay';
import IconDoubleCircle from '@/components/icons/IconDoubleCircle';
import IconTripleDots from '@/components/icons/IconTripleDots';
import useOutSideClick from '@/hooks/useOutSideClick';
import { useRef, useState, useEffect } from 'react';
import { ITrack } from '@/types/track';
import PlayBar from '@/components/common/PlayBar';

interface Props {
  track: ITrack;
  isAllPlay: boolean;
}

function Track({ track, isAllPlay }: Props) {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSelInstOpen, setIsSelInstOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const selectInstRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  useOutSideClick(menuRef, () => setIsMenuOpen(false));
  useOutSideClick(selectInstRef, () => setIsSelInstOpen(false));

  function handlePlayTrack() {
    if (!audioRef.current) return;
    if (!isPlay) {
      audioRef.current.play();
      setIsPlay(true);
    } else {
      audioRef.current.pause();
      setIsPlay(false);
    }
  }

  function handleOpenMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  function handleOpenSelInst() {
    setIsSelInstOpen((prev) => !prev);
  }

  // 재생시간 확인. 차후 재생 바 구현 여부에 따라 사용
  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    const handleTimeUpdate = () => {
      console.log(audioEl.duration, track);
      setCurrentTime(audioEl.currentTime);
      setEndTime(audioEl.duration);
    };
    audioEl.addEventListener('loadedmetadata', handleTimeUpdate);
    audioEl.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audioEl.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    if (isAllPlay) {
      audioRef.current?.play();
      setIsPlay(true);
    } else {
      audioRef.current?.pause();
      setIsPlay(false);
    }
  }, [isAllPlay]);

  useEffect(() => {
    if (currentTime === endTime) {
      setIsPlay(false);
    }
  }, [currentTime, endTime]);
  return (
    <Box borderStyle='solid'>
      <div className='w-full flex flex-col gap-5'>
        <div className='w-full flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <IconDoubleCircle color='#ffffff' />
            <span>{track.instrumentName}</span>
          </div>
          <div
            className='relative w-auto py-2 cursor-pointer'
            onClick={handleOpenMenu}
          >
            <IconTripleDots color='#ffffff' />
            {isMenuOpen && (
              <div ref={menuRef} className='absolute z-10 top-0 right-0'>
                <TrackMenu trackId={track.trackId} order={track.order} />
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
            {!isPlay ? '재생' : '일시정지'}
          </Button>
        </div>

        {/* <WavePlay isPlay={isPlay} /> */}
        <PlayBar currentTime={currentTime} endTime={endTime} />
      </div>
      <audio ref={audioRef} src={track.trackUrl} />
    </Box>
  );
}

export default Track;
