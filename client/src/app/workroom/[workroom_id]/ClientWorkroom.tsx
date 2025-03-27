'use client';

import AITab from '@/app/workroom/[workroom_id]/AITab';
import TrackTab from '@/app/workroom/[workroom_id]/TrackTab';
import WorkroomTabs from '@/app/workroom/[workroom_id]/WorkroomTabs';
import { useGetTracks } from '@/service/queries/useGetTracks';
import { TrackListItem } from '@/service/types/Workspace';
import { ITrack } from '@/types/track';
import { useEffect, useState } from 'react';

interface Props {
  id: string;
}

function ClientWorkroom({ id }: Props) {
  const [tab, setTab] = useState<string>('work');
  const [select, setSelect] = useState<(number | null)[]>([null, null]);
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const { data, isLoading, isError } = useGetTracks(id);
  useEffect(() => {
    if (isError) {
      alert('에러가 발생했습니다.');
    }
  }, [isError]);

  useEffect(() => {
    if (data && !isLoading) {
      console.log(data);
      setTracks(
        data.trackList.map((trackData: TrackListItem) => ({
          trackId: trackData.track.trackId,
          instrumentName: trackData.track.instrumentName,
          trackUrl: trackData.track.trackUrl,
          trackName: trackData.track.trackName,
          isPlaying: false,
        }))
      );
    }
  }, [data, isLoading]);
  return (
    <div className='w-full h-full flex flex-col'>
      <WorkroomTabs tab={tab} setTab={setTab} />
      <div className='w-full flex justify-center text-2xl h-fit'>
        당근할아버지 프로젝트 {id}
      </div>
      {tab === 'work' && <TrackTab tracks={tracks} setTracks={setTracks} />}
      {tab === 'ai' && <AITab select={select} setSelect={setSelect} />}
    </div>
  );
}

export default ClientWorkroom;
