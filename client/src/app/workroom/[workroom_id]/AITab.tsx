'use client';

import PreviewSongList from '@/components/features/PreviewSongList';
import TagField from '@/components/features/TagField';
import { IAISong } from '@/types/song';
import React, { useState } from 'react';

interface Props {
  select: (number | null)[];
  setSelect: React.Dispatch<React.SetStateAction<(number | null)[]>>;
}

const temp: IAISong[] = [
  {
    id: 0,
    tags: [
      { id: 0, label: '기타' },
      { id: 1, label: '피아노' },
      { id: 2, label: '장르1' },
      { id: 3, label: '분위기1' },
    ],
    url: 'https://www.youtube.com/watch?v=K4DyBUG242c',
  },
  {
    id: 1,
    tags: [
      { id: 0, label: '기타' },
      { id: 1, label: '피아노' },
      { id: 6, label: '피아노' },
      { id: 7, label: '피아노' },
      { id: 8, label: '장르1' },
      { id: 9, label: '분위기1' },
    ],
    url: 'https://www.youtube.com/watch?v=K4DyBUG242c',
  },
  {
    id: 2,
    tags: [
      { id: 0, label: '기타' },
      { id: 1, label: '피아노' },
      { id: 2, label: '장르1' },
      { id: 3, label: '분위기1' },
    ],
    url: 'https://www.youtube.com/watch?v=K4DyBUG242c',
  },
  {
    id: 3,
    tags: [
      { id: 0, label: '기타' },
      { id: 1, label: '피아노' },
      { id: 2, label: '장르1' },
      { id: 3, label: '분위기1' },
    ],
    url: 'https://www.youtube.com/watch?v=K4DyBUG242c',
  },
];

function AITab({ select, setSelect }: Props) {
  const [selectSong, setSelectSong] = useState<number>(-1);
  return (
    <div className='w-full h-full min-h-4/5 max-h-5/6 p-5 flex flex-col items-center gap-3'>
      <div className='text-sm h-fit'>
        당신이 작업한 노래의{' '}
        <span className='bg-jihyegra rounded-full py-1 px-2'>장르</span>{' '}
        <span className='bg-jihyegra rounded-full py-1 px-2'>분위기</span>를
        선택해주세요.
      </div>
      <TagField select={select} setSelect={setSelect} />
      <div className='w-full h-fit'>
        <button className='w-full h-fit py-3 mb-5 rounded-[10px] bg-gray-600 cursor-pointer'>
          AI 추천 받기 (임시 버튼)
        </button>
      </div>
      <PreviewSongList
        songs={temp}
        selectSong={selectSong}
        setSelectSong={setSelectSong}
      />
    </div>
  );
}

export default AITab;
