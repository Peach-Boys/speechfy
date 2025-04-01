'use client';

import CompletedSongTab from '@/app/my/CompletedSongTab';
import WorkroomTab from '@/app/my/WorkroomTab';
import clsx from 'clsx';
import { useState } from 'react';

function ClientMy() {
  const [tab, setTab] = useState<string>('work');

  return (
    <div className='w-full h-full p-5 flex flex-col items-center gap-10'>
      <section className='w-full flex flex-col gap-5'>
        <div className='text-3xl'>마이페이지</div>
        <p>나의 작업실과 완성된 음악을 들을 수 있는 공간이에요.</p>
      </section>

      <ul className='w-full p-2 flex gap-5 border-1 rounded-[10px]'>
        <li
          className={clsx(
            'w-full py-2 flex justify-center items-center rounded-[10px] cursor-pointer',
            tab === 'work' && 'bg-pink-500'
          )}
          onClick={() => setTab('work')}
        >
          작업실
        </li>
        <li
          className={clsx(
            'w-full py-2 flex justify-center items-center rounded-[10px] cursor-pointer',
            tab === 'completed' && 'bg-pink-500'
          )}
          onClick={() => setTab('completed')}
        >
          완성곡
        </li>
      </ul>
      <div className='relative w-full h-full'>
        <div className={tab === 'work' ? 'block' : 'hidden'}>
          <WorkroomTab />
        </div>
        <div className={tab === 'completed' ? 'block' : 'hidden'}>
          <CompletedSongTab />
        </div>
      </div>
    </div>
  );
}

export default ClientMy;
