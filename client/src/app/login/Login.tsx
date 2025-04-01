'use client';

import { useLogin } from '@/service/queries/useLogin';
import { useEffect } from 'react';

function LoginContext() {
  const { mutate: login } = useLogin();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log(code);
    if (!code) return;
    login(code);
  }, []);
  return <></>;
}

export default LoginContext;
