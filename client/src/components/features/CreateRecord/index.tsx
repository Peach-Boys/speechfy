'use client';

import NewRecord from '@/components/features/CreateRecord/NewRecord';
import RecordBox from '@/components/features/RecordBox';
import { useRecordStatusStore } from '@/stores/recordStatusStore';

function CreateRecord() {
  const { recordStatus } = useRecordStatusStore();
  const traks = []; // 추후 트랙 데이터를 받아오는 과정에 수정 예정

  return (
    <div>
      {recordStatus ? (
        <RecordBox />
      ) : (
        <NewRecord initial={traks.length === 0} />
      )}
    </div>
  );
}

export default CreateRecord;
