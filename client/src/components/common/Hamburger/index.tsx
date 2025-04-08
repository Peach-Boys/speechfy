'use client';

import { logout } from '@/service/apis/Login';
import { useEffect, useMemo, useState } from 'react';

function Hamburger() {
  const [open, setOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const isLogined = useMemo(
    () => document.cookie.includes('speechfyAccessToken'),
    [document.cookie]
  );

  function handleLogin() {
    kakaoLogin();
  }
  function kakaoLogin() {
    const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT;
    const KAKAO_SECRET = process.env.NEXT_PUBLIC_KAKAO_SECRET;
    if (!REDIRECT_URI) return;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_SECRET}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&prompt=login`;

    window.location.href = kakaoAuthUrl;
  }
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  async function handleLogout() {
    await logout();
  }

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
          {isLogined ? (
            <>
              <a
                href='/create'
                className='block text-gray-200 hover:text-white'
              >
                작업 하기
              </a>
              <a href='/my' className='block text-gray-200 hover:text-white'>
                마이페이지
              </a>
              <button
                onClick={handleLogout}
                className='block text-gray-200 hover:text-white'
              >
                로그아웃
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className='block text-gray-200 hover:text-white'
            >
              로그인
            </button>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Hamburger;
