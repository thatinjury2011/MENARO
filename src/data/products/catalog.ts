// 产品唯一来源。
//
// 改产品只需要动这一个文件：
//   · 加/删产品      → 加/删一条记录（zh 与 en 都要写，漏一个 TypeScript 就报错）
//   · 调整露出位置   → 改 show 里的开关
//
// 改之前同一份产品信息散在 7 个文件里（产品页网格 / 首页精选 / 产品页精选大卡片 /
// 首页 Hero 标题 / 页脚产品链接 / 案例「使用产品」/ meta description），
// 加一个产品要改 7 处、漏一处就前后不一致。现在全部从这里取。

import type { Locale } from "../../i18n/locales";

export interface ProductText {
  name: string;
  /** 页脚链接 / SEO 用的短名；不填则回退到 name */
  shortName?: string;
  description: string;
  /** 产品卡片底部的关键词条 */
  keywords?: string[];
  /** 产品页「精选产品」大卡片的要点列表；只有上该板块的产品需要 */
  highlights?: string[];
}

export interface Product {
  /** 稳定标识：锚点、案例引用、将来做产品详情页 URL 都用它。改中文名不影响它 */
  slug: string;
  /** 产品卡片图（透明底 PNG） */
  image: string;
  /** 产品页「精选产品」大卡片的横幅图 */
  bannerImage?: string;
  /** 在哪些板块露出 —— 增删板块只改这里，不用回头翻组件 */
  show: {
    /** 首页 Hero 大标题 */
    hero?: boolean;
    /** 首页「精选产品」四宫格 */
    home?: boolean;
    /** 产品页「精选产品」大卡片 */
    featured?: boolean;
    /** 页脚「产品」链接 */
    footer?: boolean;
  };
  /**
   * 各语言文案。新增语言时在这里补一个字段（如 fr: ProductText）——
   * 于是每条产品都会因为缺这个键而报错，不可能漏翻。
   */
  zh: ProductText;
  en: ProductText;
}

export const products: Product[] = [
  {
    slug: "epoxy-grout",
    image: "/images/products/sealing.png",
    bannerImage: "/images/products/featured.webp",
    show: { hero: true, home: true, featured: true, footer: true },
    zh: {
      name: "水性环氧彩砂",
      description: "色彩稳定、耐污耐磨，适用于高端瓷砖缝隙美化",
      keywords: ["低VOC", "耐污", "色彩稳定", "防霉"],
      highlights: [
        "先进水性环氧技术带来出色强度",
        "耐污性能和色彩一致性，适用于高端瓷砖铺贴空间",
        "水性环保，低 VOC，环保友好",
        "高强度、耐磨，经久耐用",
        "丰富色彩选择，稳定性出色",
        "适用于高端住宅和商业项目",
      ],
    },
    en: {
      name: "Water-Based Epoxy Grout",
      description:
        "Color-stable, stain- and wear-resistant grout for premium tile joints",
      keywords: [
        "Low VOC",
        "Stain resistant",
        "Color stable",
        "Mold resistant",
      ],
      highlights: [
        "Advanced water-based epoxy technology for outstanding strength",
        "Stain resistance and color consistency for premium tiled spaces",
        "Water-based and low-VOC for a more environmentally responsible finish",
        "High strength and abrasion resistance for long service life",
        "A wide color range with excellent stability",
        "Suitable for premium residential and commercial projects",
      ],
    },
  },
  {
    slug: "tile-adhesive",
    image: "/images/products/tile-glue.png",
    show: { home: true, footer: true },
    zh: {
      name: "高性能瓷砖胶",
      shortName: "瓷砖胶",
      description: "粘结力强，施工顺滑，适用于多种瓷砖铺贴场景",
      keywords: ["强粘结", "易施工", "环保配方", "耐久"],
    },
    en: {
      name: "High-Performance Tile Adhesive",
      shortName: "Tile Adhesive",
      description:
        "Strong bonding and smooth workability across a wide range of tile installations",
      keywords: ["Strong bond", "Easy to apply", "Eco formula", "Durable"],
    },
  },
  {
    slug: "epoxy-additive",
    image: "/images/products/epoxy-additive.png",
    show: { home: true, footer: true },
    zh: {
      name: "环氧美缝添加剂",
      shortName: "美缝添加剂",
      description: "提升美缝材料性能，让整体铺贴系统更耐用",
      keywords: ["防水", "抗裂", "细腻表面", "长效耐用"],
    },
    en: {
      name: "Epoxy Grout Additive",
      shortName: "Grout Additive",
      description:
        "Boosts grout performance for a longer-lasting tile installation system",
      keywords: [
        "Waterproof",
        "Crack resistant",
        "Smooth finish",
        "Long lasting",
      ],
    },
  },
  {
    slug: "waterproof-coating",
    image: "/images/products/waterproof.png",
    show: { home: true },
    zh: {
      name: "柔性防水涂料",
      shortName: "防水涂料",
      description: "为卫浴、阳台等潮湿区域提供可靠防水保护",
      keywords: ["柔韧", "安全", "防护", "稳定"],
    },
    en: {
      name: "Flexible Waterproof Coating",
      shortName: "Waterproof Coating",
      description:
        "Reliable waterproofing for bathrooms, balconies and other wet areas",
      keywords: ["Flexible", "Safe", "Protective", "Stable"],
    },
  },
  {
    slug: "tools",
    image: "/images/products/tools.png",
    show: { footer: true },
    zh: {
      name: "瓷砖铺贴工具配件",
      shortName: "铺贴工具配件",
      description: "专业工具与配件，帮助实现更精准的铺贴效果",
      keywords: ["精准", "完整", "可靠", "专业"],
    },
    en: {
      name: "Tiling Tools & Accessories",
      shortName: "Tiling Tools & Accessories",
      description:
        "Professional tools and accessories for more precise tile installation",
      keywords: ["Precise", "Complete", "Reliable", "Professional"],
    },
  },
];

// ---------------- 取值辅助 ----------------
//
// 下面每个函数都**故意不设 locale 默认值**：漏传就会编译报错，
// 从机制上避免「英文页悄悄渲染出中文」这类看不出问题的错误。

/** 短名（页脚链接 / SEO 用） */
export const shortNameOf = (product: Product, locale: Locale) =>
  product[locale].shortName ?? product[locale].name;

/** 拍平成「标识字段 + 文案字段」，组件里直接 p.name / p.description 就行 */
const flatten = (product: Product, locale: Locale) => ({
  slug: product.slug,
  image: product.image,
  bannerImage: product.bannerImage,
  ...product[locale],
});

/** 全部产品，保持本文件里的顺序（产品页网格用） */
export const productList = (locale: Locale) =>
  products.map((product) => flatten(product, locale));

/** 按露出位置取（首页精选 / 页脚链接 / …） */
export const listBy = (where: keyof Product["show"], locale: Locale) =>
  products
    .filter((product) => product.show[where])
    .map((product) => flatten(product, locale));

/**
 * 取第一个带该标记的产品（首页 Hero、产品页精选大卡片）。
 * 找不到直接抛错 —— 让构建失败，而不是页面静默少一块。
 */
export const oneBy = (where: keyof Product["show"], locale: Locale) => {
  const hit = products.find((product) => product.show[where]);
  if (!hit) throw new Error(`[data/products] 没有任何产品标记 show.${String(where)}`);
  return flatten(hit, locale);
};

/** 按 slug 取（案例里引用「用了哪个产品」这类场景） */
export const bySlug = (slug: string, locale: Locale) => {
  const hit = products.find((product) => product.slug === slug);
  if (!hit) throw new Error(`[data/products] 找不到 slug="${slug}" 的产品`);
  return flatten(hit, locale);
};

/** 所有产品的短名，拼 meta description 用 */
export const seoNameList = (locale: Locale) =>
  products.map((product) => shortNameOf(product, locale));
