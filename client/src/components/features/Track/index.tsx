'use client';

import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal/intex';
import PlayBar from '@/components/common/PlayBar';
import InstrumentList from '@/components/features/Track/InstrumentList';
import TrackMenu from '@/components/features/Track/TrackMenu';
import IconDoubleCircle from '@/components/icons/IconDoubleCircle';
import IconTripleDots from '@/components/icons/IconTripleDots';
import { useDDSP } from '@/hooks/useDDSP';
import useOutSideClick from '@/hooks/useOutSideClick';
import { useTransferTrack } from '@/hooks/useTransferTrack';
import { useDeleteTrack } from '@/service/queries/useDeleteTrack';
import { ITrack } from '@/types/track';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface Props {
  track: ITrack;
  isAllPlay: boolean;
  onFinished: () => void;
}

function Track({ track, isAllPlay, onFinished }: Props) {
  const { workroom_id: workroomId } = useParams();

  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSelInstOpen, setIsSelInstOpen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [instrument, setInstrument] = useState<string>(track.instrumentName);
  const [endTime, setEndTime] = useState<number>(0);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const selectInstRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { initialized, toneTransfer } = useDDSP();
  const { mutate: uploadTrack } = useTransferTrack();
  const { mutate: deleteTrack } = useDeleteTrack(track.trackId);

  useOutSideClick(menuRef, () => setIsMenuOpen(false));
  useOutSideClick(selectInstRef, () => setIsSelInstOpen(false));

  useEffect(() => {
    if (track.instrumentName === instrument) return;
    if (!audioRef.current) return;
    if (!initialized) return;

    async function transTrack() {
      const url = await toneTransfer(instrument, track.trackUrl);
      uploadTrack({
        workroomId: workroomId as string,
        originalAudio: track.trackUrl,
        transAudio: url,
        instrument: instrument,
        trackName: track.trackName,
        order: track.order,
        trackId: track.trackId,
        recordId: track.recordId,
      });
    }
    transTrack();
  }, [instrument]);

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

  function handleDelete() {
    deleteTrack();
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
    if (currentTime === endTime && isPlay) {
      setIsPlay(false);
      onFinished?.();
    }
  }, [currentTime, endTime, isPlay]);

  return (
    <>
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
                  <TrackMenu
                    order={track.order}
                    setIsModalOpen={setIsModalOpen}
                  />
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
                  <InstrumentList
                    instrument={instrument}
                    setInstrument={setInstrument}
                  />
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
      <Modal label='현재 선택한 트랙을 삭제하시겠습니까?' isOpen={isModalOpen}>
        <button
          className='w-full py-3 bg-gray-400 rounded-[10px] cursor-pointer'
          onClick={() => setIsModalOpen(false)}
        >
          취소
        </button>
        <button
          className='w-full py-3 bg-red-400 rounded-[10px] cursor-pointer'
          onClick={handleDelete}
        >
          삭제
        </button>
      </Modal>
    </>
  );
}

export default Track;
