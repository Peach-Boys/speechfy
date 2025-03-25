'use client';

import AITab from '@/app/workroom/[workroom_id]/AITab';
import TrackTab from '@/app/workroom/[workroom_id]/TrackTab';
import WorkroomTabs from '@/app/workroom/[workroom_id]/WorkroomTabs';
import { useState } from 'react';

interface Props {
  id: string;
}

function ClientWorkroom({ id }: Props) {
  const [tab, setTab] = useState<string>('work');
  const [select, setSelect] = useState<(number | null)[]>([null, null]);

  return (
    <div className='w-full h-full flex flex-col'>
      <WorkroomTabs tab={tab} setTab={setTab} />
      <div className='w-full flex justify-center text-2xl h-fit'>
        당근할아버지 프로젝트 {id}
      </div>
      {tab === 'work' && <TrackTab />}
      {tab === 'ai' && <AITab select={select} setSelect={setSelect} />}
    </div>
  );
}

export default ClientWorkroom;
