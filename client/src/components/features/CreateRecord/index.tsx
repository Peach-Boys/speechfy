'use client';

import NewRecord from '@/components/features/NewRecord';
import RecordBox from '@/components/features/RecordBox';
import { useState } from 'react';

function CreateRecord() {
  const [status, setStatus] = useState<boolean>(false);
  const traks = []; // 추후 트랙 데이터를 받아오는 과정에 수정 예정

  function handleChangeStatus() {
    setStatus(!status);
  }

  return (
    <div>
      {status ? (
        <RecordBox handleCloseCreate={handleChangeStatus} />
      ) : (
        <NewRecord
          handleCreateInstrument={handleChangeStatus}
          initial={traks.length == 0}
        />
      )}
    </div>
  );
}

export default CreateRecord;
