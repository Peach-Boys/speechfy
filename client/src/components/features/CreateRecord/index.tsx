'use client';

import NewRecord from '@/components/features/CreateRecord/NewRecord';
import RecordBox from '@/components/features/RecordBox';
import { useState } from 'react';

function CreateRecord() {
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const traks = ['']; // 추후 트랙 데이터를 받아오는 과정에 수정 예정
  console.log(isCreate);

  return (
    <div>
      {isCreate ? (
        <RecordBox setIsCreate={setIsCreate} />
      ) : (
        <NewRecord initial={traks.length === 0} setIsCreate={setIsCreate} />
      )}
    </div>
  );
}

export default CreateRecord;
