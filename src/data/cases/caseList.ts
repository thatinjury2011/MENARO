// 对应 src/components/cases/CaseList.astro
//
// 项目唯一来源。首页「项目亮点」与案例页用的是同一批项目（只是图片不同、数量不同），
// 之前两处各写了一遍名字和地点，改一处就会前后不一致。现在统一到这里：
//   · image      → 案例页网格用（/images/cases/*）
//   · homeImage  → 首页「项目亮点」用（/images/home/*）
//   · show 开关  → 决定上哪个板块

import type { Locale } from "../../i18n/locales";

export interface ProjectText {
  name: string;
  location: string;
  /** 只有「精选案例」大卡片需要 */
  featured?: {
    /** 项目类型 */
    type: string;
    /** 项目面积 */
    area: string;
    /** 完成年份 */
    year: string;
    /** 用到的产品 slug，指向 src/data/products/catalog.ts */
    productSlug: string;
    blurb: string;
    quote: string;
    quoteBy: string;
  };
}

export interface Project {
  /** 稳定标识 */
  slug: string;
  image: string;
  /** 首页「项目亮点」用图（不填则用 image） */
  homeImage?: string;
  /** 案例页「精选案例」大卡片用图（不填则用 image） */
  featuredImage?: string;
  /** 对应筛选标签的 value */
  category: string;
  show: {
    /** 首页「项目亮点」 */
    home?: boolean;
    /** 案例页「精选案例」大卡片 */
    featured?: boolean;
  };
  /** 各语言文案；新增语言时在这里补一个字段，漏翻的条目会直接报错 */
  zh: ProjectText;
  en: ProjectText;
}

export const projects: Project[] = [
  {
    slug: "lakeside-villa",
    image: "/images/cases/case-1.webp",
    homeImage: "/images/home/project-1.webp",
    category: "residence",
    show: { home: true },
    zh: { name: "湖畔别墅", location: "意大利科莫" },
    en: { name: "Lakeside Villa", location: "Como, Italy" },
  },
  {
    slug: "aurelia-hotel",
    image: "/images/cases/case-2.webp",
    homeImage: "/images/home/project-2.webp",
    featuredImage: "/images/cases/featured.webp",
    category: "hotel",
    show: { home: true, featured: true },
    zh: {
      name: "奥瑞利亚酒店",
      location: "意大利罗马",
      featured: {
        type: "酒店",
        area: "18,000 m2",
        year: "2023",
        productSlug: "epoxy-grout",
        blurb:
          "这是一个对精致度、耐久性和最终饰面要求极高的高端酒店项目。MENARO提供完整瓷砖铺贴系统，经受长期使用考验",
        quote:
          "“MENARO 产品在我们的酒店项目中表现出色。饰面效果、耐久性和服务支持都令人印象深刻”",
        quoteBy: "Marco Bianchi，项目总监",
      },
    },
    en: {
      name: "Aurelia Hotel",
      location: "Rome, Italy",
      featured: {
        type: "Hotel",
        area: "18,000 m2",
        year: "2023",
        productSlug: "epoxy-grout",
        blurb:
          "A premium hotel project with exacting demands on finish, durability and final appearance. MENARO supplied the complete tile installation system, proven under sustained use.",
        quote:
          "“MENARO products performed exceptionally on our hotel project. The finish, durability and support were all impressive.”",
        quoteBy: "Marco Bianchi, Project Director",
      },
    },
  },
  {
    slug: "greenland-tower",
    image: "/images/cases/case-3.webp",
    homeImage: "/images/home/project-3.webp",
    category: "commercial",
    show: { home: true },
    zh: { name: "绿地商务中心", location: "意大利米兰" },
    en: { name: "Greenland Business Center", location: "Milan, Italy" },
  },
  {
    slug: "metro-station",
    image: "/images/cases/case-4.webp",
    category: "public",
    show: {},
    zh: { name: "城市地铁站", location: "阿联酋迪拜" },
    en: { name: "City Metro Station", location: "Dubai, UAE" },
  },
  {
    slug: "azure-bay-resort",
    image: "/images/cases/case-5.webp",
    category: "hotel",
    show: {},
    zh: { name: "蔚蓝海湾度假村", location: "泰国普吉岛" },
    en: { name: "Azure Bay Resort", location: "Phuket, Thailand" },
  },
  {
    slug: "skyline-tower",
    image: "/images/cases/case-6.webp",
    category: "commercial",
    show: {},
    zh: { name: "天际企业大厦", location: "新加坡" },
    en: { name: "Skyline Enterprise Tower", location: "Singapore" },
  },
];

/** 案例页筛选标签（value 对应 Project.category） */
export const caseCategories = [
  { value: "all", zh: { label: "项目案例" }, en: { label: "All Projects" } },
  { value: "residence", zh: { label: "住宅" }, en: { label: "Residential" } },
  { value: "commercial", zh: { label: "商业" }, en: { label: "Commercial" } },
  { value: "hotel", zh: { label: "酒店" }, en: { label: "Hotel" } },
  {
    value: "public",
    zh: { label: "公共基础设施" },
    en: { label: "Public Infrastructure" },
  },
];

// ---------------- 取值辅助 ----------------

/** 全部项目（案例页网格用） */
export const caseList = (locale: Locale) =>
  projects.map((project) => ({
    slug: project.slug,
    image: project.image,
    homeImage: project.homeImage,
    category: project.category,
    ...project[locale],
  }));

/** 首页「项目亮点」：用 homeImage */
export const homeProjects = (locale: Locale) =>
  projects
    .filter((project) => project.show.home)
    .map((project) => ({
      slug: project.slug,
      image: project.homeImage ?? project.image,
      href: "/cases",
      ...project[locale],
    }));

/** 案例页「精选案例」大卡片 */
export const featuredProject = (locale: Locale) => {
  const hit = projects.find((project) => project.show.featured);
  if (!hit) throw new Error("[data/cases/caseList] 没有项目标记 show.featured");
  return {
    slug: hit.slug,
    image: hit.featuredImage ?? hit.image,
    ...hit[locale],
  };
};
