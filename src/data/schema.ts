import type { Lang } from '../i18n/config';

/** 公司事实（与联系页 / 页脚保持一致，schema 与 llms.txt 共用） */
export const org = {
  name: 'MENARO',
  alternateName: ['MENARO 美纳罗', '美纳罗'],
  legalName: { zh: 'MENARO 美纳罗', en: 'MENARO' } satisfies Record<Lang, string>,
  email: 'menarobm@gmail.com',
  mobile: '+86 137 3857 7658',
  mobileE164: '+8613738577658',
  landline: '0576-8853 9555',
  landlineE164: '+8657688539555',
  whatsapp: 'https://wa.me/8613738577658',
  locality: { zh: '台州', en: 'Taizhou' } satisfies Record<Lang, string>,
  region: { zh: '浙江', en: 'Zhejiang' } satisfies Record<Lang, string>,
  country: 'CN',
  hours: 'Mo-Fr 09:00-18:00',
  knowsAbout: [
    'tile grout',
    'epoxy coloured sand grout',
    'tile adhesive',
    'architectural sealant',
    'epoxy flooring',
    'self-levelling floor',
    'building materials manufacturing',
    'OEM and private label building materials',
  ],
};

type Node = Record<string, unknown>;

const langTag: Record<Lang, string> = { zh: 'zh-CN', en: 'en' };

export function organizationNode(lang: Lang, base: URL): Node {
  const url = (p: string) => new URL(p, base).href;
  return {
    '@type': 'Organization',
    '@id': url('/#organization'),
    name: org.name,
    alternateName: org.alternateName,
    url: url('/'),
    logo: {
      '@type': 'ImageObject',
      url: url('/brand/logo-horizontal.png'),
      width: 270,
      height: 55,
    },
    image: url('/og-default.png'),
    description:
      lang === 'zh'
        ? 'MENARO 美纳罗专注高品质建筑材料的研发、制造与全球供应，服务经销商、批发商、品牌客户与工程采购商。'
        : 'MENARO develops, manufactures and supplies high-quality building materials worldwide for distributors, wholesalers, brand owners and project buyers.',
    email: org.email,
    telephone: org.mobileE164,
    address: {
      '@type': 'PostalAddress',
      addressLocality: org.locality[lang],
      addressRegion: org.region[lang],
      addressCountry: org.country,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: org.mobileE164,
        email: org.email,
        url: org.whatsapp,
        areaServed: 'Worldwide',
        availableLanguage: ['zh-CN', 'en'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: org.landlineE164,
        areaServed: 'Worldwide',
        availableLanguage: ['zh-CN', 'en'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      },
    ],
    knowsAbout: org.knowsAbout,
  };
}

export function websiteNode(lang: Lang, base: URL): Node {
  return {
    '@type': 'WebSite',
    '@id': new URL('/#website', base).href,
    url: new URL('/', base).href,
    name: org.name,
    inLanguage: langTag[lang],
    publisher: { '@id': new URL('/#organization', base).href },
  };
}

export function webPageNode(opts: {
  lang: Lang;
  base: URL;
  pageUrl: string;
  name: string;
  description: string;
  image?: string;
}): Node {
  const { lang, base, pageUrl, name, description, image } = opts;
  return {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name,
    description,
    inLanguage: langTag[lang],
    isPartOf: { '@id': new URL('/#website', base).href },
    about: { '@id': new URL('/#organization', base).href },
    primaryImageOfPage: image ? { '@type': 'ImageObject', url: image } : undefined,
  };
}

export function breadcrumbNode(items: { name: string; url: string }[]): Node | undefined {
  if (items.length < 2) return undefined;
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function productNode(opts: {
  lang: Lang;
  base: URL;
  name: string;
  description: string;
  model: string;
  category: string;
  pageUrl: string;
  image?: string;
}): Node {
  const { lang, base, name, description, model, category, pageUrl, image } = opts;
  return {
    '@type': 'Product',
    '@id': `${pageUrl}#product`,
    name,
    description,
    sku: model,
    mpn: model,
    category,
    url: pageUrl,
    image: image ? [image] : undefined,
    brand: { '@type': 'Brand', name: org.name },
    manufacturer: { '@id': new URL('/#organization', base).href },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Model', value: model },
    ],
  };
}
