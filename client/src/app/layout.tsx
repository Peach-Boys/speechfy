import SocketContext from '@/components/common/SocketListener';
import Header from '@/components/layout/Header';
import type { Metadata } from 'next';
import React from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'SPEECHFY',
  description: '목소리를 음악으로 변환하는 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`antialiased flex justify-center`}>
        <Header />
        <div className='relative w-full h-[100dvh] overflow-hidden flex flex-col bg-black font-[Pretendard]'>
          <div className='h-[60px]' /> {/* Header space */}
          <div className='flex-1 overflow-y-auto'>{children}</div>
        </div>
        <SocketContext />
      </body>
    </html>
  );
}
