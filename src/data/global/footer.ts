// 对应 src/components/global/SiteFooter.astro
// 「产品」列不在这里 —— 它来自 src/data/products/catalog.ts 的 show.footer

export const footerUi = {
  zh: {
    blurb:
      "源自意大利技术，结合高端品质，为全球项目提供可靠、环保的瓷砖铺贴系统解决方案。",
    legalPrefix: "Legal company name: ",
    groupProducts: "产品",
    groupSolutions: "解决方案",
    groupCompany: "公司",
    contactTitle: "联系我们",
    copyright: "© 2025 MENARO. 保留所有权利.",
    privacy: "隐私政策",
    terms: "使用条款",
  },
  en: {
    blurb:
      "Italian-derived technology and premium quality, delivering reliable and environmentally responsible tile installation systems for projects worldwide.",
    legalPrefix: "Legal company name: ",
    groupProducts: "Products",
    groupSolutions: "Solutions",
    groupCompany: "Company",
    contactTitle: "Contact us",
    copyright: "© 2025 MENARO. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
  },
};

/** 页脚「解决方案」列 */
export const footerSolutionLinks = [
  { href: "/solutions", zh: { label: "住宅空间" }, en: { label: "Residential" } },
  { href: "/solutions", zh: { label: "商业空间" }, en: { label: "Commercial" } },
  {
    href: "/solutions",
    zh: { label: "浴室与厨房" },
    en: { label: "Bathroom & Kitchen" },
  },
  {
    href: "/solutions",
    zh: { label: "公共基础" },
    en: { label: "Public Infrastructure" },
  },
];

/** 页脚「公司」列 */
export const footerCompanyLinks = [
  { href: "/about", zh: { label: "品牌故事" }, en: { label: "Brand Story" } },
  { href: "/about", zh: { label: "品质保障" }, en: { label: "Quality Assurance" } },
  { href: "/cases", zh: { label: "项目案例" }, en: { label: "Projects" } },
  { href: "/contact", zh: { label: "联系我们" }, en: { label: "Contact Us" } },
];

/** 页脚联系区的文案在组件里由 src/data/site.ts 的 contact 派生，这里不再重复定义 */

/** 社交图标（线性图标内联，避免引入图标库）；平台名不翻译 */
export const socials = [
  {
    name: "Instagram",
    href: "#",
    d: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="16.8" cy="7.2" r="1"/>',
  },
  {
    name: "Facebook",
    href: "#",
    d: '<path d="M14.5 8.5H17V5.5h-2.5A4 4 0 0 0 10.5 9.5V12H8v3h2.5v6h3v-6h2.6l.6-3h-3.2V9.6a1 1 0 0 1 1-1.1Z"/>',
  },
  {
    name: "YouTube",
    href: "#",
    d: '<rect x="3" y="6" width="18" height="12" rx="4"/><path d="m11 9.8 3.3 2.2-3.3 2.2V9.8Z"/>',
  },
  {
    name: "LinkedIn",
    href: "#",
    d: '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M7.5 10.5V17"/><path d="M7.5 7.2v.1"/><path d="M11.5 17v-4a2 2 0 0 1 4 0v4"/>',
  },
  {
    name: "X",
    href: "#",
    d: '<path d="M4.5 4.5l15 15"/><path d="M19.5 4.5l-15 15"/>',
  },
];
