import type { APIRoute } from 'astro';

const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'cohere-ai',
  'meta-externalagent',
];

export const GET: APIRoute = ({ site }) => {
  const root = site ?? new URL('https://www.menarobm.com');
  const sitemap = new URL('/sitemap.xml', root).href;

  const body = [
    '# MENARO 美纳罗 — building materials manufacturing & global supply',
    '# All public pages may be crawled and cited. Quotation-only site: no prices are published.',
    '',
    'User-agent: *',
    'Allow: /',
    'Disallow: /404',
    'Disallow: /404.html',
    '',
    ...AI_CRAWLERS.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', 'Disallow: /404', '']),
    `Sitemap: ${sitemap}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
