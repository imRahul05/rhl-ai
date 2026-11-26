import { buildLlmsTxt } from '@/lib/llms';

/** Plain-text Markdown for LLMs and coding agents (https://llmstxt.org). Built once, at build time. */
export const dynamic = 'force-static';

export function GET(): Response {
  return new Response(buildLlmsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
