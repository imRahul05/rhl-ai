import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Repo files that pages read with `fs` (src/lib/skills.ts, repo.ts, llms.ts).
 * Pages are prerendered at build time, but on Vercel each one is also backed by
 * a server function that re-renders it on revalidation and some fallback
 * requests. File tracing cannot follow `fs` paths built at runtime, so without
 * this list those functions ship without skills/ and crash with
 * "Could not locate the repo-level skills/ directory from /var/task/apps/landing-page".
 * Paths are relative to this app; keep it in sync with what src/lib reads.
 */
const REPO_CONTENT = [
  '../../pnpm-workspace.yaml', // findRepoRoot() looks for this
  '../../README.md',
  '../../docs/*.md',
  '../../skills/README.md',
  '../../skills/*/SKILL.md',
  '../../skills/*/package.json',
  '../../templates/*/README.md',
  '../../packages/*/package.json',
  '../../packages/*/README.md',
  '../../projects/*/README.md',
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname, '../../'),
  outputFileTracingIncludes: {
    '/**': REPO_CONTENT,
  },
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
