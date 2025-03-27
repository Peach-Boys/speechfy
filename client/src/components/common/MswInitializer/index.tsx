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
        const { worker } = await import('@/service/mocks/worker');
        await worker.start();
      }
    }

    enableMocking();
  }, []);
  return <></>;
};

export default MswInitializer;
