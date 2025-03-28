'use client';

import PlayBar from '@/components/common/PlayBar';
import Spinner from '@/components/common/Spinner';
import IconPlay from '@/components/icons/IconPlay';
import IconStop from '@/components/icons/IconStop';
import { useSelectSongStore } from '@/stores/selectSongStore';
import { useEffect, useRef, useState } from 'react';

function CompleteSong() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { selectSong } = useSelectSongStore();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false); // 재생바 로딩 상태

  function handlePlayTrack() {
    if (!audioRef.current) return;
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
    }
  }

  function handlePlayBar(time: number) {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleReady = () => {
      setIsReady(true);
    };

    audio.addEventListener('canplaythrough', handleReady);
    return () => audio.removeEventListener('canplaythrough', handleReady);
  }, [audioRef.current, selectSong]);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audioEl.currentTime);
      setEndTime(audioEl.duration);
    };
    audioEl.addEventListener('canplaythrough', handleTimeUpdate);
    audioEl.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audioEl.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [selectSong]);

  useEffect(() => {
    if (currentTime === endTime) {
      setIsPlaying(false);
    }
  }, [currentTime, endTime]);

  if (!selectSong)
    return (
      <div className='w-full'>
        <span className='w-full flex justify-center text-base'>
          AI로 추천 받은 노래를 선택해보세요!
        </span>
        <span className='w-full flex justify-center text-xs'>
          AI로 추천 받지 않는 작업물은 트랙들을 합친 음악으로 변환됩니다.
        </span>
      </div>
    );

  return (
    <div className='w-full  flex flex-col items-center gap-5'>
      <div className='w-full flex text-xl'>AI 완성곡 듣기</div>
      <PlayBar
        currentTime={currentTime}
        endTime={endTime}
        isReady={isReady}
        onSeek={(time: number) => handlePlayBar(time)}
      />
      {isReady ? (
        <div
          onClick={handlePlayTrack}
          className='size-10 p-3 bg-gray-200 rounded-full cursor-pointer hover:scale-105 transition'
        >
          {isPlaying ? <IconStop /> : <IconPlay width={15} height={16} />}
        </div>
      ) : (
        <Spinner />
      )}
      <audio ref={audioRef} src={selectSong.songSrc} />
    </div>
  );
}

export default CompleteSong;
