'use client';

import Spinner from '@/components/common/Spinner';
import WorkroomBox from '@/components/features/WorkroomBox';
import { useGetWorkroomList } from '@/service/queries/useGetWorkroomList';
import { BaseWorkroom } from '@/types/workroom';
import { useEffect, useState } from 'react';

function WorkroomTab() {
  const [workroomList, setWorkroomList] = useState<BaseWorkroom[]>([]);
  const { data, isLoading } = useGetWorkroomList();
  useEffect(() => {
    if (data) setWorkroomList(data);
  }, [data]);

  if (isLoading) return <Spinner />;

  return (
    <div className='w-full flex flex-col gap-5'>
      {workroomList.map((workroom) => (
        <WorkroomBox key={workroom.studioId} workroom={workroom} />
      ))}
    </div>
  );
}

export default WorkroomTab;
