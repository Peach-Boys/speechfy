'use client';

import NewRecord from '@/components/features/CreateRecord/NewRecord';
import RecordBox from '@/components/features/RecordBox';
import { useState } from 'react';

interface Props {
  tracks: []; // 추후 type 만들면 상세 타입 명시
}

function CreateRecord({ tracks }: Props) {
  const [isCreate, setIsCreate] = useState<boolean>(false);

  return (
    <div className='w-full'>
      {isCreate ? (
        <RecordBox setIsCreate={setIsCreate} />
      ) : (
        <NewRecord initial={tracks.length === 0} setIsCreate={setIsCreate} />
      )}
    </div>
  );
}

export default CreateRecord;
