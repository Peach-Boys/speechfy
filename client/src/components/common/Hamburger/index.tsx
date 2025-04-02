'use client';

import { useState } from 'react';

function Hamburger() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className=''>
      <button
        onClick={() => setOpen(true)}
        className='z-50 fixed top-4 right-4 w-10 h-10 flex flex-col justify-center items-center space-y-1 group'
      >
        <span className='w-6 h-0.5 bg-white rounded transition-all group-hover:scale-110' />
        <span className='w-6 h-0.5 bg-white rounded transition-all group-hover:scale-110' />
        <span className='w-6 h-0.5 bg-white rounded transition-all group-hover:scale-110' />
      </button>

      {/* 오버레이 */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className='fixed inset-0 bg-black/30 backdrop-blur-sm z-40'
        />
      )}

      {/* 드로어 */}
      <div
        className={`fixed top-0 right-0 h-full w-60 bg-gray-800 shadow-lg z-50 transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='p-4 flex justify-between items-center border-b'>
          <h2 className='text-lg font-bold'>메뉴</h2>
          <button
            onClick={() => setOpen(false)}
            className='text-gray-500 text-xl cursor-pointer'
          >
            &times;
          </button>
        </div>
        <nav className='p-4 space-y-4'>
          <a href='/create' className='block text-gray-200 hover:text-white'>
            작업 하기
          </a>
          <a href='/my' className='block text-gray-200 hover:text-white'>
            마이페이지
          </a>
          <a href='#' className='block text-gray-200 hover:text-white'>
            로그아웃
          </a>
        </nav>
      </div>
    </div>
  );
}

export default Hamburger;
