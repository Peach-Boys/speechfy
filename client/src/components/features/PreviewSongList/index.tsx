'use client';

import Spinner from '@/components/common/Spinner';
import PreviewSongItem from '@/components/features/PreviewSongList/PreviewSongItem';
import { useGetPreviewSongList } from '@/service/queries/useGetPreviewSongList';
import { IPreviewSong } from '@/types/song';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Props {
  selectSong: number;
  setSelectSong: React.Dispatch<React.SetStateAction<number>>;
}

function PreviewSongList({ selectSong, setSelectSong }: Props) {
  const { workroom_id } = useParams();
  const [previewSongs, setPreviewSongs] = useState<IPreviewSong[]>();
  const { data, isLoading } = useGetPreviewSongList(workroom_id as string);

  useEffect(() => {
    if (data) {
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
          previewSongs.map((previewSong) => (
            <PreviewSongItem
              key={previewSong.songId}
              song={previewSong}
              selected={previewSong.songId === selectSong}
              onSelect={() =>
                setSelectSong((prev: number) =>
                  prev === previewSong.songId ? -1 : previewSong.songId
                )
              }
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
