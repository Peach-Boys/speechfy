'use client';

import React from 'react';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

function Button({ children, onClick }: Props) {
  return (
    <button
      className='w-full py-[15px] rounded-md bg-[#d9d9d9] text-[#333333] cursor-pointer'
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
