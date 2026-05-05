import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Garante que o root do tracing seja o próprio projeto (evita warning do
  // monorepo lockfile detectado em ~/package-lock.json)
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  typedRoutes: true,
};

export default nextConfig;
