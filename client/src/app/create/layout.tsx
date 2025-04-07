import React from 'react';

interface Props {
  children: React.ReactNode;
}

function create({ children }: Props) {
  return <div className='w-full h-full'>{children}</div>;
}

export default create;
