'use client';

import NewRecord from '@/components/features/CreateRecord/NewRecord';
import RecordBox from '@/components/features/RecordBox';
import { useWorkRoomStore } from '@/stores/workroomStore';
import { ITrack } from '@/types/track';
import React, { useState } from 'react';

function CreateRecord() {
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const { tracks, setTracks } = useWorkRoomStore();
  const addTrack = (track: ITrack) => {
    setTracks([...tracks, track]);
  };

  return (
    <div className='w-full'>
      {isCreate ? (
        <RecordBox setIsCreate={setIsCreate} addTrack={addTrack} />
      ) : (
        <NewRecord initial={tracks.length === 0} setIsCreate={setIsCreate} />
      )}
    </div>
  );
}

export default CreateRecord;
