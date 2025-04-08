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
        source: '/my',
        destination: '/',
        permanent: true,
      },
      {
        source: '/workroom/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/error',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
