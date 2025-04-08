import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbo: {
      resolveAlias: {
        '@': './src',
      },
    },
  },
  async redirects() {
    return [
      {
        source: '/error',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
