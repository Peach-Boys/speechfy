import clsx from 'clsx';
import React from 'react';

interface Props {
  customClass?: string;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

function Input({ customClass, title, setTitle }: Props) {
  return (
    <div
      className={clsx(
        'w-full px-2 py-1 flex justify-between items-center border-b-1',
        customClass
      )}
    >
      <input
        className='w-full outline-0'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={20}
      />
      <div className='text-gray-400'>{title.length}/20</div>
    </div>
  );
}

export default Input;
