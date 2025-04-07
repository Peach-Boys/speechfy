'use client';

import Spinner from '@/components/common/Spinner';
import PreviewSongItem from '@/components/features/PreviewSongList/PreviewSongItem';
import { useGetPreviewSongList } from '@/service/queries/useGetPreviewSongList';
import { useSelectSongStore } from '@/stores/selectSongStore';
import { AISong } from '@/types/song';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function PreviewSongList() {
  const { workroom_id } = useParams();
  const { selectSong, setSelectSong } = useSelectSongStore();
  const [previewSongs, setPreviewSongs] = useState<AISong[]>();
  const { data, isLoading } = useGetPreviewSongList(workroom_id as string);

  useEffect(() => {
    if (data) {
      console.log('data:', data);
      setPreviewSongs(data);
    }
  }, [data]);

  if (isLoading) return <Spinner />;

  return (
    <div className='w-full h-full flex flex-col gap-2'>
      <div className='text-xl px-1'>미리 듣기</div>
      <div className='text-sm text-gray-300 px-1'>
        AI가 추천한 곡 중 하나를 선택해주세요.
      </div>

      <div className='w-full max-h-[300px] overflow-y-auto flex flex-col gap-2 scrollbar-thin scrollbar-thumb-gray-500'>
        {previewSongs ? (
          previewSongs.map((song) => (
            <PreviewSongItem
              key={song.aiSongId}
              song={song}
              selected={song.aiSongId === selectSong?.aiSongId}
              onSelect={() => setSelectSong(song)}
            />
          ))
        ) : (
          <div className='w-full mt-5 flex justify-center items-center '>
            AI 추천 곡을 넣어보세요...!
          </div>
        )}
      </div>
    </div>
  );
}

export default PreviewSongList;
