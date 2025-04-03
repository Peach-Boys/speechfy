// SSR용
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
    const { server } = await import('@/service/mocks/server');
    server.listen();
  }

  isMockingStarted = true;
};
