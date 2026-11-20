import type { Lang } from '../i18n/config';
import { site } from './site';

export interface MetaCopy {
  /** 页面标题（不含品牌后缀，Base 负责拼接） */
  title: string;
  /** meta description：中文约 60–90 字，英文约 120–170 字符 */
  description: string;
}

/**
 * 逐路由的 SEO 文案，key 为**去掉 /en 前缀**的路径。
 * 单一数据源：Base 用它填充 <title> / description / og / JSON-LD 面包屑。
 */
export const metaByPath: Record<string, Record<Lang, MetaCopy>> = {
  '/': {
    zh: { title: '', description: site.description.zh },
    en: { title: '', description: site.description.en },
  },
  '/products': {
    zh: {
      title: '产品体系 · 建筑与装修材料、空间定制系统',
      description:
        'MENARO 产品体系覆盖美缝填缝、瓷砖胶、建筑密封胶、环氧地坪等施工材料，以及全屋定制、门窗、地板、卫浴与照明等空间成品，支持批量供货与品牌定制。',
    },
    en: {
      title: 'Products · construction materials and interior systems',
      description:
        'MENARO covers tile grout, tile adhesive, architectural sealants and epoxy flooring, plus whole-house joinery, doors, flooring, sanitary ware and lighting — for bulk supply and private label.',
    },
  },
  '/products/tile-grout': {
    zh: {
      title: '美缝材料 · 环氧彩砂美缝剂与填缝剂',
      description:
        '环氧彩砂美缝剂、晶瓷美缝剂与填缝材料，适合住宅、商业空间及工程项目瓷砖缝隙的装饰与保护，支持经销供货与包装定制。',
    },
    en: {
      title: 'Tile grout & jointing · epoxy coloured sand and fillers',
      description:
        'Epoxy coloured sand grout, ceramic grout and joint fillers for decorating and protecting tile joints in residential, commercial and project work, with distributor supply and custom packaging.',
    },
  },
  '/products/tile-grout/mg-700': {
    zh: {
      title: '氢化碳环彩砂美缝剂 MG-700',
      description:
        'MG-700 氢化碳环彩砂美缝剂，双组份双管 420ml/组包装，适合追求细腻砂感效果的瓷砖接缝项目；可咨询检测资料、包装规格与品牌定制。',
    },
    en: {
      title: 'MG-700 coloured sand tile grout',
      description:
        'MG-700 hydrogenated cycloaliphatic coloured sand grout in twin 420 ml cartridges, for tile joints that call for a fine sand texture. Test documents, packaging options and private label on request.',
    },
  },
  '/products/tile-adhesive': {
    zh: {
      title: '瓷砖胶与铺贴材料 · 瓷砖胶、背胶与辅材',
      description:
        '瓷砖胶、瓷砖背胶与铺贴辅材产品系列，用于住宅与商业空间的瓷砖铺贴，支持经销供货、工程配套与品牌定制。',
    },
    en: {
      title: 'Tile adhesive & installation materials',
      description:
        'Tile adhesive, tile back glue and installation accessories for tiling in residential and commercial spaces, available for distribution, project supply and private label.',
    },
  },
  '/products/sealant': {
    zh: {
      title: '建筑密封胶 · 玻璃胶、耐候密封胶与结构胶',
      description:
        '玻璃胶、耐候密封胶与结构胶等建筑密封胶产品，用于门窗、幕墙与建筑接缝的密封与粘接，可按采购需求确认包装与 OEM 定制。',
    },
    en: {
      title: 'Architectural sealants · glass, weatherproof and structural',
      description:
        'Glass sealant, weatherproof sealant and structural adhesive for sealing and bonding door and window, curtain wall and building joints, with packaging and OEM options.',
    },
  },
  '/products/sealant/ms-786': {
    zh: {
      title: '高级中性耐候密封胶 MS-786',
      description:
        'MS-786 高级中性耐候密封胶，单管 300ml/支，用于系统窗、阳光房及幕墙等建筑接缝密封，包装与标签可按实际采购需求确认。',
    },
    en: {
      title: 'MS-786 neutral weatherproof sealant',
      description:
        'MS-786 premium neutral weatherproof sealant in 300 ml cartridges for building joints in system windows, sunrooms and curtain walls; packaging and labelling confirmed against your requirements.',
    },
  },
  '/products/floor': {
    zh: {
      title: '环氧地坪与环氧彩砂自流平',
      description:
        '环氧彩砂自流平与环氧地坪材料，用于商业、工业及住宅空间的整体地面施工，可按项目需求确认材料方案与供货方式。',
    },
    en: {
      title: 'Epoxy flooring & self-levelling',
      description:
        'Epoxy coloured sand self-levelling and epoxy flooring materials for commercial, industrial and residential floors, with material proposals and supply scoped per project.',
    },
  },
  '/products/floor/epoxy-sand': {
    zh: {
      title: '环氧彩砂自流平系统',
      description:
        '环氧彩砂自流平系统，用于商业与工业空间的整体无缝地面，可按项目需求确认材料配套、用量与供货方式。',
    },
    en: {
      title: 'Epoxy coloured sand self-levelling system',
      description:
        'Epoxy coloured sand self-levelling system for seamless floors in commercial and industrial spaces, with material packages, quantities and supply scoped per project.',
    },
  },
  '/cases': {
    zh: {
      title: '项目案例 · 住宅、商业与工程应用',
      description:
        'MENARO 项目案例，覆盖住宅、商业与工程等不同场景的建筑材料应用，可按你的项目类型匹配材料方案与供货方式。',
    },
    en: {
      title: 'Project cases · residential, commercial and engineering',
      description:
        'MENARO project cases across residential, commercial and engineering applications, with material solutions and supply options matched to your project type.',
    },
  },
  '/solutions': {
    zh: {
      title: '解决方案 · 按应用场景选择建筑材料',
      description:
        '按应用场景选择建筑材料：从瓷砖铺贴、接缝处理到环氧地坪，MENARO 提供选材建议、施工配套与项目供货支持。',
    },
    en: {
      title: 'Solutions · choose materials by application',
      description:
        'Choose building materials by application — from tiling and joint finishing to epoxy flooring — with material selection advice, installation support and project supply from MENARO.',
    },
  },
  '/solutions/industrial-floor': {
    zh: {
      title: '环氧彩砂自流平地坪解决方案',
      description:
        '环氧彩砂自流平地坪解决方案：面向工业厂房、仓储与商业空间的地面材料组合、施工流程与项目供货支持。',
    },
    en: {
      title: 'Epoxy coloured sand self-levelling flooring solutions',
      description:
        'Epoxy coloured sand self-levelling flooring: material combinations, installation flow and project supply for factories, warehouses and commercial spaces.',
    },
  },
  '/global': {
    zh: {
      title: '全球合作 · 经销、批发与工程供货',
      description:
        'MENARO 面向全球经销商、批发商、品牌客户与工程采购商供货，提供产品资料、样品、包装定制与稳定的交付支持。',
    },
    en: {
      title: 'Global cooperation · distribution and project supply',
      description:
        'MENARO supplies distributors, wholesalers, brand owners and project buyers worldwide, with product documents, samples, custom packaging and dependable delivery.',
    },
  },
  '/manufacturing': {
    zh: {
      title: '制造与品质 · 生产流程与质量管控',
      description:
        'MENARO 制造与品质：从原料、生产到出厂检验的流程与品控说明，为经销供货与工程项目提供稳定一致的产品。',
    },
    en: {
      title: 'Manufacturing & quality · process and quality control',
      description:
        'Manufacturing and quality at MENARO: production flow and quality control from raw material to final inspection, keeping supply consistent for distributors and projects.',
    },
  },
  '/about': {
    zh: {
      title: '关于我们 · MENARO 美纳罗',
      description:
        '关于 MENARO 美纳罗：专注高品质建筑材料的研发、制造与全球供应，服务经销商、批发商、品牌客户与工程采购商。',
    },
    en: {
      title: 'About us · MENARO',
      description:
        'About MENARO: focused on the development, manufacturing and global supply of high-quality building materials for distributors, wholesalers, brand owners and project buyers.',
    },
  },
  '/contact': {
    zh: {
      title: '联系我们 · 产品资料与合作洽谈',
      description:
        '联系 MENARO：咨询产品资料、包装规格、样品与报价。电话 / WhatsApp +86 137 3857 7658，邮箱 menarobm@gmail.com。',
    },
    en: {
      title: 'Contact us · documents and cooperation',
      description:
        'Contact MENARO for product documents, packaging specifications, samples and pricing. Phone / WhatsApp +86 137 3857 7658, email menarobm@gmail.com.',
    },
  },
  '/quote': {
    zh: {
      title: '获取报价 · 提交采购需求',
      description:
        '提交采购询盘：填写意向产品、数量与目的市场，MENARO 将提供产品资料、包装方案与报价支持。',
    },
    en: {
      title: 'Get a quote · send your procurement requirements',
      description:
        'Send a procurement enquiry with your products, quantities and destination market, and MENARO will respond with documents, packaging options and pricing support.',
    },
  },
  '/privacy': {
    zh: {
      title: '隐私政策',
      description: 'MENARO 隐私政策：说明在询盘与网站使用过程中收集的信息类型、使用目的与保护方式。',
    },
    en: {
      title: 'Privacy policy',
      description:
        'MENARO privacy policy: what information is collected through enquiries and site usage, how it is used and how it is protected.',
    },
  },
  '/terms': {
    zh: {
      title: '使用条款',
      description: 'MENARO 使用条款：网站内容的使用范围、知识产权归属与责任说明。',
    },
    en: {
      title: 'Terms of use',
      description:
        'MENARO terms of use: how site content may be used, intellectual property ownership and scope of liability.',
    },
  },
  '/sitemap': {
    zh: { title: '网站地图', description: 'MENARO 网站地图：中英文全部页面的导航索引。' },
    en: { title: 'Sitemap', description: 'MENARO sitemap: an index of every page in Chinese and English.' },
  },
  '/404': {
    zh: { title: '页面未找到', description: '页面未找到，请返回首页或从产品体系重新查找。' },
    en: { title: 'Page not found', description: 'Page not found. Return to the homepage or browse products instead.' },
  },
};

/** 不参与索引的路由（未找到页、法务页之外的临时页） */
export const noindexPaths = new Set(['/404']);

/** 把运行时路径归一化成 metaByPath 的 key（去掉 /en 前缀、去掉尾斜杠） */
export function pathKey(pathname: string): string {
  const clean = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  if (clean === '/') return '/';
  return clean.replace(/\/+$/, '') || '/';
}

export function getMeta(pathname: string, lang: Lang): MetaCopy | undefined {
  return metaByPath[pathKey(pathname)]?.[lang];
}

/** 站内路由清单（供 sitemap.xml / llms.txt 复用，key 不含语言前缀） */
export const staticRoutes = [
  '/',
  '/products',
  '/products/tile-grout',
  '/products/tile-grout/mg-700',
  '/products/tile-adhesive',
  '/products/sealant',
  '/products/sealant/ms-786',
  '/products/floor',
  '/products/floor/epoxy-sand',
  '/cases',
  '/solutions',
  '/solutions/industrial-floor',
  '/global',
  '/manufacturing',
  '/about',
  '/contact',
  '/quote',
  '/privacy',
  '/terms',
  '/sitemap',
] as const;
