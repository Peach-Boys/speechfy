// components/MswInitializer.tsx
'use client';

import { useEffect } from 'react';

const MswInitializer = () => {
  useEffect(() => {
    async function enableMocking() {
      if (
        typeof window !== 'undefined' &&
        process.env.NODE_ENV === 'development'
      ) {
        const { worker } = await import('@/service/mocks/worker'); // 수정된 부분
        // useEffect훅안에서 클라이언트에서 동적으로 임포트 합니다.
        await worker.start();
      }
    }

    enableMocking();
  }, []);
  return <></>;
};

export default MswInitializer;
