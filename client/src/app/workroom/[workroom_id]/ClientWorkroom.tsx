'use client';

import AITab from '@/app/workroom/[workroom_id]/AITab';
import CompleteTab from '@/app/workroom/[workroom_id]/CompleteTab';
import TrackTab from '@/app/workroom/[workroom_id]/TrackTab';
import WorkroomTabs from '@/app/workroom/[workroom_id]/WorkroomTabs';
import { useGetTracks } from '@/service/queries/useGetTracks';
import { TrackListItem } from '@/service/types/Workspace';
import { useWorkRoomStore } from '@/stores/workroomStore';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function ClientWorkroom() {
  const { workroom_id } = useParams();
  const [tab, setTab] = useState<string>('work');
  const [selectTag, setSelectTag] = useState<(string | null)[]>([null, null]);
  const { setTracks } = useWorkRoomStore();
  const { data, isLoading, isError } = useGetTracks(workroom_id as string);

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
          trackUrl: trackData.track.trackPresignedUrl,
          trackName: trackData.track.trackName,
          recordId: trackData.record.recordId,
          recordUrl: trackData.record.recordPresignedUrl,
          isPlaying: false,
          order: trackData.track.order,
        }))
      );
    }
  }, [data, isLoading, setTracks]);

  return (
    <div className='w-full h-full flex flex-col'>
      <WorkroomTabs tab={tab} setTab={setTab} />
      <div className='w-full flex justify-center text-2xl h-fit'>
        {workroom_id}
      </div>
      <div className='relative w-full h-full'>
        <div className={tab === 'work' ? 'block' : 'hidden'}>
          <TrackTab />
        </div>
        <div className={tab === 'gerne' ? 'block' : 'hidden'}>
          <AITab selectTag={selectTag} setSelectTag={setSelectTag} />
        </div>
        <div className={tab === 'complete' ? 'block' : 'hidden'}>
          <CompleteTab
            workroomId={workroom_id as string}
            selectTags={selectTag}
          />
        </div>
      </div>
    </div>
  );
}

export default ClientWorkroom;
