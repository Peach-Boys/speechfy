import React from 'react';

interface Props {
  children: React.ReactNode;
}

function player({ children }: Props) {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      {children}
    </div>
  );
}

export default player;
