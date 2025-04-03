// lib/msw/index.ts
let isMockingStarted = false;

export const initializeMSW = async () => {
  if (
    process.env.NEXT_PUBLIC_API_MOCKING !== 'enabled' ||
    process.env.NODE_ENV !== 'development' ||
    isMockingStarted
  ) {
    return;
  }

  if (typeof window === 'undefined') {
    console.log('in!!');
    const { server } = await import('@/service/mocks/server');
    server.listen();
    console.log('msw 실행');
  }

  isMockingStarted = true;
};
