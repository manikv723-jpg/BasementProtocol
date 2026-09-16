import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  outputFileTracingExcludes: { '*': ['./data/**/*', './.env*'] },
  // One canonical host: www duplicates the whole site otherwise.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.basementprotocol.com' }],
        destination: 'https://basementprotocol.com/:path*',
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
