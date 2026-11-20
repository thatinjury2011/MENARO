import type { APIRoute } from 'astro';
import { staticRoutes } from '../data/seo';
import { localizePath } from '../i18n/utils';

const base = (site: URL | undefined) => site ?? new URL('https://www.menarobm.com');

const abs = (site: URL, path: string): string => {
  if (path === '/') return new URL('/', site).href;
  const isFile = /\.[a-z0-9]+$/i.test(path);
  return new URL(isFile ? path : `${path.replace(/\/+$/, '')}/`, site).href;
};

export const GET: APIRoute = ({ site }) => {
  const root = base(site);
  const urls: string[] = [];

  for (const route of staticRoutes) {
    const zh = abs(root, localizePath(route, 'zh'));
    const en = abs(root, localizePath(route, 'en'));
    const alternates = [
      `<xhtml:link rel="alternate" hreflang="zh-CN" href="${zh}"/>`,
      `<xhtml:link rel="alternate" hreflang="en" href="${en}"/>`,
      `<xhtml:link rel="alternate" hreflang="x-default" href="${zh}"/>`,
    ].join('');

    urls.push(`  <url><loc>${zh}</loc>${alternates}</url>`);
    urls.push(`  <url><loc>${en}</loc>${alternates}</url>`);
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
