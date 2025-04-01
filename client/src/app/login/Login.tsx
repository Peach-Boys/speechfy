'use client';

import { useEffect } from 'react';

function LoginContext() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
  }, []);
  return <></>;
}

export default LoginContext;
