'use client';

import Input from '@/components/common/Input';
import IconLightning from '@/components/icons/IconLightning';
import clsx from 'clsx';
import { useState } from 'react';

function GenerateImage() {
  const [title, setTitle] = useState<string>('');

  return (
    <div className='w-full flex flex-col justify-between items-center gap-5'>
      <div className='w-full flex text-xl'>앨범 이미지</div>
      <div className='w-full py-30 flex flex-col items-center bg-gray-900 rounded-[10px] text-m'>
        <span>제목을 입력하고 버튼을 누르면</span>
        <span>AI가 어울리는 앨범 커버를</span>
        <span>만들어 줄거에요!</span>
      </div>
      <div className='w-full px-3 flex items-center'>
        <span className='w-1/10'>제목</span>
        <Input title={title} setTitle={setTitle} />
      </div>
      <button
        className={clsx(
          'flex items-center gap-2 px-4 py-2 rounded-[10px] cursor-pointer',
          title.length > 1 ? 'bg-pink-500' : 'bg-zinc-700'
        )}
      >
        <IconLightning />
        앨범 이미지 생성
      </button>
    </div>
  );
}

export default GenerateImage;
