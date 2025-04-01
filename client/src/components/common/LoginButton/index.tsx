'use client';

function LoginButton() {
  function handleLogin() {
    kakaoLogin();
  }
  function kakaoLogin() {
    const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT;
    const KAKAO_SECRET = process.env.NEXT_PUBLIC_KAKAO_KEY;
    if (!REDIRECT_URI) return;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_SECRET}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&prompt=login`;

    window.location.href = kakaoAuthUrl;
  }
  return (
    <button
      className='bg-jihyegra w-full rounded-lg py-3 cursor-pointer'
      onClick={handleLogin}
    >
      카카오 로그인 &gt;
    </button>
  );
}

export default LoginButton;
