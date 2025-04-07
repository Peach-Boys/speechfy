'use client';

import Input from '@/components/common/Input';
import { usePostCreateWorkroom } from '@/service/queries/usePostCreateWorkroom';
import { useState } from 'react';

function CreateWorkroom() {
  const [title, setTitle] = useState<string>('');
  const mutation = usePostCreateWorkroom(title);
  function handleCreateWorkroom() {
    mutation.mutate();
  }

  return (
    <div className='w-full flex flex-col gap-5'>
      <Input title={title} setTitle={setTitle} maxLen={12} />
      <button
        className='w-full py-2 bg-gray-200 text-gray-800 rounded-[10px]'
        onClick={handleCreateWorkroom}
      >
        만들기
      </button>
    </div>
  );
}

export default CreateWorkroom;
