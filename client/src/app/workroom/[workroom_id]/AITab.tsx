'use client';

import PlayBar from '@/components/common/PlayBar';
import Spinner from '@/components/common/Spinner';
import TagField from '@/components/features/TagField';
import React from 'react';

interface Props {
  select: (number | null)[];
  setSelect: React.Dispatch<React.SetStateAction<(number | null)[]>>;
}

function AITab({ select, setSelect }: Props) {
  return (
    <div className='w-full h-full min-h-4/5 max-h-5/6 p-5 flex flex-col items-center gap-3'>
      <div className='text-sm'>
        당신이 작업한 노래의{' '}
        <span className='bg-jihyegra rounded-full py-1 px-2'>장르</span>{' '}
        <span className='bg-jihyegra rounded-full py-1 px-2'>분위기</span>를
        선택해주세요.
      </div>
      <TagField select={select} setSelect={setSelect} />
      <Spinner />
      <div className='w-full'>
        <button className='w-full h-fit py-3 rounded-[10px] bg-gray-600 cursor-pointer'>
          AI 추천 받기 (임시 버튼)
        </button>
      </div>
      <PlayBar currentTime={72} endTime={120} />
    </div>
  );
}

export default AITab;
