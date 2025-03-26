'use client';

import NewRecord from '@/components/features/CreateRecord/NewRecord';
import RecordBox from '@/components/features/RecordBox';
import { ITrack } from '@/types/track';
import React, { useState } from 'react';

interface Props {
  setTracks: React.Dispatch<React.SetStateAction<ITrack[]>>;
  tracks: ITrack[];
}

function CreateRecord({ setTracks, tracks }: Props) {
  const [isCreate, setIsCreate] = useState<boolean>(false);
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
