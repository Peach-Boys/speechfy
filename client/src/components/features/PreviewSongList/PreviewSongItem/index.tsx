'use client';

import PlayBar from '@/components/common/PlayBar';
import Spinner from '@/components/common/Spinner';
import Tag from '@/components/common/Tag';
import IconPlay from '@/components/icons/IconPlay';
import IconStop from '@/components/icons/IconStop';
import { TAGS } from '@/constants/tags';
import { useAudioPlayBar } from '@/hooks/useAudioPlayBar';
import { AISong } from '@/types/song';
import clsx from 'clsx';

interface Props {
  song: AISong;
  selected: boolean;
  onSelect: () => void;
}

function PreviewSongItem({ song, selected, onSelect }: Props) {
  const {
    audioRef,
    currentTime,
    endTime,
    handlePlay,
    handleSeek,
    isPlaying,
    isReady,
  } = useAudioPlayBar(song.signedUrl);

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
            onClick={(e) => handlePlay(e)}
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
          {/* {song.map((instrument) => (
            <Tag key={instrument.id} label={instrument.label} isSelect />
          ))} */}
          <Tag
            label={
              TAGS.genre.find((item) => item.id === song.genre)?.label ??
              song.genre
            }
            isSelect
          />
          <Tag
            label={
              TAGS.mood.find((item) => item.id === song.mood)?.label ??
              song.mood
            }
            isSelect
          />
        </div>
        <PlayBar
          currentTime={currentTime}
          endTime={endTime}
          isReady={isReady}
          onSeek={(time: number) => handleSeek(time)}
        />
      </div>
      <audio ref={audioRef} src={song.signedUrl} />
    </div>
  );
}

export default PreviewSongItem;
