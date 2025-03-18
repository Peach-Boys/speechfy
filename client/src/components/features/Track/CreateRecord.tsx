'use client';

import NewRecord from '@/components/features/NewRecord/NewRecord';
import RecordBox from '@/components/features/RecordBox';
import { useState } from 'react';

function CreateRecord() {
  const [status, setStatus] = useState<boolean>(false);

  function handleChangeStatus() {
    setStatus(!status);
  }

  return (
    <div>
      {status ? (
        <RecordBox handleCloseCreate={handleChangeStatus} />
      ) : (
        <NewRecord handleCreateInstrument={handleChangeStatus} />
      )}
    </div>
  );
}

export default CreateRecord;
