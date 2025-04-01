'use client';

import Tag from '@/components/common/Tag';
import IconTripleDots from '@/components/icons/IconTripleDots';
import { BaseWorkroom } from '@/types/workroom';
import { useRouter } from 'next/navigation';

interface Props {
  workroom: BaseWorkroom;
}

function WorkroomBox({ workroom }: Props) {
  const route = useRouter();
  function handleEnterWorkroom() {
    route.push(`/workroom/${workroom.studioId}`);
  }
  return (
    <section className='w-full p-3 flex flex-col gap-4 border-1 rounded-[10px]'>
      <div className='w-full flex gap-4'>
        <div className='px-3 py-2 rounded-[10px] bg-white text-gray-800'>
          {workroom.name[0]}
        </div>
        <div className='w-full'>
          <div className='w-full'>{workroom.name}</div>
          <div className='w-full'>{workroom.modifiedAt}</div>
        </div>
        <IconTripleDots color='#ffffff' />
      </div>
      <div className='w-full flex flex-wrap gap-2'>
        {workroom.trackInfo.map((t) => (
          <Tag key={t} label={t} isSelect />
        ))}
      </div>
      <div className='w-full flex justify-end'>
        <button
          className='px-5 py-2 bg-white text-gray-800 rounded-[10px] cursor-pointer'
          onClick={() => handleEnterWorkroom()}
        >
          작업하기 &gt;
        </button>
      </div>
    </section>
  );
}

export default WorkroomBox;
