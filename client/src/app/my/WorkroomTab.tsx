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
    if (data) {
      console.log(data);
      setWorkroomList(data);
    }
  }, [data]);

  if (isLoading) return <Spinner />;
  console.log('workroom:', workroomList);

  return (
    <div className='w-full'>
      {workroomList.map((workroom) => (
        <WorkroomBox
          key={workroom.studioId}
          name={workroom.name}
          trackInfo={workroom.trackInfo}
          modifiedAt={workroom.modifiedAt}
        />
      ))}
    </div>
  );
}

export default WorkroomTab;
