'use client';

import CreateRecord from '@/components/features/CreateRecord';
import Track from '@/components/features/Track';
import IconAllPlay from '@/components/icons/IconAllPlay';
import IconReset from '@/components/icons/IconReset';
import { useDeleteAllTrack } from '@/service/queries/useDeleteAllTrack';
import { useWorkRoomStore } from '@/stores/workroomStore';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function TrackTab() {
  const { workroom_id } = useParams();

  const [isAllPlay, setIsAllPlay] = useState<boolean>(false);
  const [finishedCount, setFinishedCount] = useState<number>(0);

  const { tracks } = useWorkRoomStore();
  const { mutate } = useDeleteAllTrack(workroom_id as string);

  function handlePlayAll() {
    setIsAllPlay(true);
  }

  function handleAllStop() {
    setIsAllPlay(false);
  }

  function handleTrackFinished() {
    setFinishedCount((prev) => prev + 1);
  }

  // 전체 재생 상태 파악
  useEffect(() => {
    if (isAllPlay && finishedCount === tracks.length) {
      setIsAllPlay(false);
    }
  }, [finishedCount, isAllPlay, tracks.length]);

  return (
    <div className='w-full h-full min-h-4/5 max-h-5/6 p-5 flex flex-col items-center gap-3'>
      <div className='w-full h-fit flex justify-between'>
        <button className='flex items-center gap-1' onClick={() => mutate()}>
          <IconReset />
          <span>초기화</span>
        </button>
        <button
          className='flex items-center gap-1'
          onClick={isAllPlay ? handleAllStop : handlePlayAll}
        >
          <IconAllPlay color='#ffffff' />
          <span>{isAllPlay ? '재생 중지' : '전체 재생'}</span>
        </button>
      </div>
      <div className='w-full h-fit flex flex-col items-center gap-2'>
        {/* UI 테스트용 Track 여러 개 생성 */}
        {tracks.map((track) => (
          <Track
            key={track.trackId}
            track={track}
            isAllPlay={isAllPlay}
            onFinished={handleTrackFinished}
          />
        ))}
        <CreateRecord />
      </div>
    </div>
  );
}

export default TrackTab;
