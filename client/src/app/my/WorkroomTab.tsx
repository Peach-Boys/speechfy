'use client';

import Spinner from '@/components/common/Spinner';
import WorkroomBox from '@/components/features/WorkroomBox';
import { useGetWorkroomList } from '@/service/queries/useGetWorkroomList';
import { IWorkroom } from '@/service/types/MyPage';
import { useEffect, useState } from 'react';

function WorkroomTab() {
  const [workrooms, setWorkrooms] = useState<IWorkroom>();
  const { data, isLoading } = useGetWorkroomList();
  useEffect(() => {
    if (data) setWorkrooms(data);
  }, [data]);

  if (isLoading) return <Spinner />;

  return (
    <div className='w-full flex flex-col gap-5'>
      {workrooms?.studioList.map((workroom) => (
        <WorkroomBox key={workroom.studioId} workroom={workroom} />
      ))}
    </div>
  );
}

export default WorkroomTab;
