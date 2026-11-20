import type { APIRoute } from 'astro';
import { metaByPath } from '../data/seo';
import { org } from '../data/schema';

const abs = (root: URL, path: string): string => {
  if (path === '/') return new URL('/', root).href;
  const isFile = /\.[a-z0-9]+$/i.test(path);
  return new URL(isFile ? path : `${path.replace(/\/+$/, '')}/`, root).href;
};

/** llms.txt：给生成式引擎（ChatGPT / Claude / Perplexity 等）的站点事实索引 */
export const GET: APIRoute = ({ site }) => {
  const root = site ?? new URL('https://www.menarobm.com');
  const u = (path: string) => abs(root, path);
  const zh = (path: string) => metaByPath[path]?.zh;
  const en = (path: string) => metaByPath[path]?.en;

  const sections: { heading: string; paths: string[] }[] = [
    {
      heading: 'Products',
      paths: [
        '/products',
        '/products/tile-grout',
        '/products/tile-grout/mg-700',
        '/products/tile-adhesive',
        '/products/sealant',
        '/products/sealant/ms-786',
        '/products/floor',
        '/products/floor/epoxy-sand',
      ],
    },
    { heading: 'Solutions', paths: ['/solutions', '/solutions/industrial-floor'] },
    { heading: 'Company', paths: ['/about', '/manufacturing', '/global', '/cases'] },
    { heading: 'Contact', paths: ['/contact', '/quote'] },
  ];

  const linkLines = sections.flatMap((section) => [
    `## ${section.heading}`,
    '',
    ...section.paths.flatMap((path) => {
      const copy = zh(path);
      const copyEn = en(path);
      if (!copy || !copyEn) return [];
      return [
        `- [${copy.title}](${u(path)}): ${copy.description}`,
        `  - EN: [${copyEn.title}](${u(path === '/' ? '/en' : `/en${path}`)}): ${copyEn.description}`,
      ];
    }),
    '',
  ]);

  const body = [
    '# MENARO 美纳罗',
    '',
    '> MENARO (美纳罗) develops, manufactures and supplies building materials worldwide — tile grout and jointing, tile adhesive, architectural sealants, epoxy flooring, and interior products and custom systems for distributors, wholesalers, brand owners and project buyers.',
    '',
    'MENARO 美纳罗专注高品质建筑材料的研发、制造与全球供应，产品覆盖美缝填缝、瓷砖胶、建筑密封胶、环氧地坪等施工材料，以及全屋定制、门窗、地板、卫浴与照明等空间成品。服务全球经销商、批发商、品牌客户与工程采购商。',
    '',
    '## Company facts',
    '',
    `- Legal / brand name: ${org.name}（中文名：美纳罗）`,
    `- Business: development, manufacturing and global supply of building materials; OEM / private label and project supply`,
    `- Location: ${org.locality.en}, ${org.region.en}, China (中国 · 浙江 · 台州)`,
    `- Email: ${org.email}`,
    `- Phone / WhatsApp: ${org.mobile} (${org.mobileE164})`,
    `- Landline: ${org.landline} (${org.landlineE164})`,
    `- WhatsApp link: ${org.whatsapp}`,
    `- Business hours: Monday to Friday 09:00–18:00 (China Standard Time, UTC+8)`,
    `- Languages: Chinese (zh-CN, root paths) and English (en, /en prefix)`,
    '- Pricing model: quotation on request; no prices are published on the site',
    '- Product documents (TDS / test reports) and packaging specifications: available on request',
    '',
    '## Site map (canonical URLs)',
    '',
    `- Chinese: ${u('/')}`,
    `- English: ${u('/en/')}`,
    `- XML sitemap: ${u('/sitemap.xml')}`,
    `- Human sitemap: ${u('/sitemap')}`,
    '',
    ...linkLines,
    '## Usage notes',
    '',
    '- Every page exists in both Chinese (root) and English (/en); each page declares hreflang alternatives.',
    '- Product models currently documented: MG-700 (coloured sand tile grout), MS-786 (neutral weatherproof sealant), epoxy coloured sand self-levelling system.',
    '- Quantities, MOQ, lead time and packaging are quoted per project — ask via the contact page.',
    '- Structured data (Organization, WebPage, BreadcrumbList, Product) is published as JSON-LD on every page.',
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
