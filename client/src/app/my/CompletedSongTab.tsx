'use client';

import Spinner from '@/components/common/Spinner';
import CompletedSongBox from '@/components/features/CompletedSongBox';
import { useGetCompletedSongList } from '@/service/queries/useGetCompleteSongList';
import { BaseCompletedSong } from '@/types/workroom';
import { useEffect, useState } from 'react';

function CompletedSongTab() {
  const [completeSongList, setCompleteSongList] =
    useState<BaseCompletedSong[]>();
  const { data, isLoading } = useGetCompletedSongList();

  useEffect(() => {
    if (data) setCompleteSongList(data.songList);
  }, [data]);

  if (isLoading) return <Spinner />;

  return (
    <div className='w-full flex flex-col gap-5'>
      {completeSongList?.map((song) => (
        <CompletedSongBox key={song.songId} song={song} />
      ))}
    </div>
  );
}

export default CompletedSongTab;
