import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  ...(process.env.SKIP_STANDALONE !== 'true' && { output: 'standalone' as const }),
  typescript: { ignoreBuildErrors: true }, // `pnpm type-check` runs tsc in CI
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'maskaniapi.codevertexafrica.com', pathname: '/media/**' }],
    formats: ['image/avif', 'image/webp'],
  },
  poweredByHeader: false,
  turbopack: {},
};

export default nextConfig;
