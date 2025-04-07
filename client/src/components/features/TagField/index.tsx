import Tag from '@/components/common/Tag';
import { TAGS } from '@/constants/tags';
import React from 'react';

interface Props {
  select: (number | null)[];
  setSelect: React.Dispatch<React.SetStateAction<(number | null)[]>>;
}

function TagField({ select, setSelect }: Props) {
  function handleTagClick(kind: number, id: number) {
    setSelect((prev) => {
      const newSelect = [...prev];
      newSelect[kind] = prev[kind] === id ? null : id;
      return newSelect;
    });
  }

  return (
    <div className='w-full min-h-1/2 max-h-5/6 p-8 flex flex-col items-center gap-10 rounded-xl bg-gray-900 overflow-auto'>
      <div className='w-full h-full flex flex-col items-center gap-3'>
        <span className='w-full flex justify-center text-2xl'>장르</span>
        <div className='flex flex-wrap gap-1 justify-center'>
          {TAGS.genre.map((g) => (
            <Tag
              key={g.id}
              label={g.label}
              onClick={() => handleTagClick(0, g.id)}
              isSelect={select[0] === g.id}
            />
          ))}
        </div>
      </div>
      <div className='w-full h-full flex flex-col items-center gap-3'>
        <span className='w-full flex justify-center text-2xl'>분위기</span>
        <div className='flex flex-wrap gap-1 justify-center text-black'>
          {TAGS.mood.map((m) => (
            <Tag
              key={m.id}
              label={m.label}
              onClick={() => handleTagClick(1, m.id)}
              isSelect={select[1] === m.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TagField;
