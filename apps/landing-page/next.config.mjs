import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname, '../../'),
  // Set STANDALONE=1 to build a self-contained server (only traced files),
  // which reproduces the Vercel function filesystem locally.
  output: process.env.STANDALONE ? 'standalone' : undefined,
  async redirects() {
    return [
      {
        source: '/skills/frontend-performance',
        destination: '/skills/frontend-performance-engineer',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
