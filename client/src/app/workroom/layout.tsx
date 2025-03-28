import { Metadata } from 'next';
import React from 'react';

interface Props {
  children: React.ReactNode;
}
export const metadata: Metadata = {
  title: 'SPEECHFY 작업실',
  description: 'SPEECHFY의 개인 작업실 페이지',
};

function WorkroomLayout({ children }: Props) {
  return (
    <>
      <div className='w-full h-full'>{children}</div>
    </>
  );
}

export default WorkroomLayout;
