'use client';

import Hamburger from '@/components/common/Hamburger';
import { useRouter } from 'next/navigation';

function Header() {
  const router = useRouter();

  return (
    <header className='fixed w-full h-[60px] px-3 flex items-center bg-black z-100'>
      <div
        className='flex items-center cursor-pointer'
        onClick={() => {
          router.push('/');
        }}
      >
        <img src='/images/logo.png' alt='logo' className='w-[100px]' />
      </div>
      <div className='ml-auto'>
        <Hamburger />
      </div>
    </header>
  );
}

export default Header;
