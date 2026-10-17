import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  ...(process.env.SKIP_STANDALONE !== 'true' && { output: 'standalone' as const }),
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'media.codevertexafrica.com', pathname: '/maskani/**' }],
    formats: ['image/avif', 'image/webp'],
  },
  poweredByHeader: false,
  turbopack: {},
};

export default nextConfig;
