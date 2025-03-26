import PreviewSongItem from '@/components/features/PreviewSongList/PreviewSongItem';
import { IAISong } from '@/types/song';
import React from 'react';

interface Props {
  songs: IAISong[];
  selectSong: number;
  setSelectSong: React.Dispatch<React.SetStateAction<number>>;
}

function PreviewSongList({ songs, selectSong, setSelectSong }: Props) {
  return (
    <div className='w-full h-full flex flex-col gap-2'>
      <div className='text-xl px-1'>미리 듣기</div>
      <div className='text-sm text-gray-300 px-1'>
        AI가 추천한 곡 중 하나를 선택해주세요.
      </div>

      <div className='w-full max-h-[300px] overflow-y-auto flex flex-col gap-2 scrollbar-thin scrollbar-thumb-gray-500'>
        {songs.map((song) => (
          <PreviewSongItem
            key={song.id}
            song={song}
            selected={song.id === selectSong}
            onSelect={() =>
              setSelectSong((prev: number) => (prev === song.id ? -1 : song.id))
            }
          />
        ))}
      </div>
    </div>
  );
}

export default PreviewSongList;
