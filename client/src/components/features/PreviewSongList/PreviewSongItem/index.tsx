'use client';

import PlayBar from '@/components/common/PlayBar';
import Spinner from '@/components/common/Spinner';
import Tag from '@/components/common/Tag';
import IconPlay from '@/components/icons/IconPlay';
import IconStop from '@/components/icons/IconStop';
import IconTrash from '@/components/icons/IconTrash';
import { IPreviewSong } from '@/types/song';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

interface Props {
  song: IPreviewSong;
  selected: boolean;
  onSelect: () => void;
}

function PreviewSongItem({ song, selected, onSelect }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false); // 재생바 로딩 상태

  function handlePlayTrack(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
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
  }, [audioRef.current]);

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
  }, []);

  useEffect(() => {
    if (currentTime === endTime) {
      setIsPlaying(false);
    }
  }, [currentTime, endTime]);

  return (
    <div
      className={clsx(
        'relative w-full pl-10 pr-4 py-3.5 flex justify-between items-center gap-3 rounded-xl transition-all cursor-pointer',
        selected
          ? 'bg-pink-500/10 border border-pink-400 shadow-md'
          : 'bg-white/5 hover:bg-white/10'
      )}
      onClick={onSelect}
    >
      <div className='absolute top-1/2 left-2 -translate-y-1/2'>
        {selected ? (
          <div className='w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs shadow-sm'>
            ✓
          </div>
        ) : (
          <div className='w-5 h-5 border border-gray-400 rounded-full' />
        )}
      </div>

      <div className='w-fit flex gap-1'>
        {isReady ? (
          <div
            onClick={(e) => handlePlayTrack(e)}
            className='size-8 p-2 bg-gray-200 rounded-full cursor-pointer hover:scale-105 transition'
          >
            {isPlaying ? <IconStop /> : <IconPlay width={15} height={16} />}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
      <div className='w-full flex flex-col gap-1'>
        <div className='flex flex-wrap gap-1'>
          {song.instruments.map((instrument) => (
            <Tag key={instrument.id} label={instrument.label} isSelect />
          ))}
          <Tag label={song.gerne} isSelect />
          <Tag label={song.mood} isSelect />
        </div>
        <PlayBar
          currentTime={currentTime}
          endTime={endTime}
          isReady={isReady}
          onSeek={(time: number) => handlePlayBar(time)}
        />
      </div>
      <div className='w-fit h-full flex items-center cursor-pointer hover:scale-110 transition-transform active:scale-95'>
        <IconTrash width={20} height={25} color='#ff2222' />
      </div>
      <audio ref={audioRef} src={song.songSrc} />
    </div>
  );
}

export default PreviewSongItem;
