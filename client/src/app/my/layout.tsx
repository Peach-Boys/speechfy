import { Metadata } from 'next';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'SPEECHFY 마이페이지',
  description: 'SPEECHFY의 개인 작업 및 완성곡 관리 페이지',
};

function MyLayout({ children }: Props) {
  return (
    <>
      <div className='w-full h-full'>{children}</div>
    </>
  );
}

export default MyLayout;
