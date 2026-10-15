// 对应 src/components/global/SiteHeader.astro

import type { Locale } from "../../i18n/locales";
/** 主导航（结构 + 文案） */
export const navItems = [
  { href: "/", zh: { label: "首页" }, en: { label: "Home" } },
  { href: "/products", zh: { label: "产品" }, en: { label: "Products" } },
  { href: "/solutions", zh: { label: "解决方案" }, en: { label: "Solutions" } },
  { href: "/cases", zh: { label: "项目案例" }, en: { label: "Projects" } },
  { href: "/about", zh: { label: "关于我们" }, en: { label: "About" } },
  { href: "/contact", zh: { label: "联系我们" }, en: { label: "Contact" } },
];

export const headerUi = {
  zh: {
    homeAria: "MENARO 首页",
    mainNavAria: "主导航",
    mobileNavAria: "移动端导航",
    quote: "获取报价",
    searchLabel: "搜索",
    searchPlaceholder: "搜索",
    openMenu: "打开导航菜单",
    closeMenu: "关闭导航菜单",
  },
  en: {
    homeAria: "MENARO home",
    mainNavAria: "Main navigation",
    mobileNavAria: "Mobile navigation",
    quote: "Get a Quote",
    searchLabel: "Search",
    searchPlaceholder: "Search",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
  },
};

/** 语言切换器的标签：写的是语言自己的名字，不随当前语言变 */
export const langLabels: Record<Locale, string> = {
  zh: "简体中文",
  en: "English",
};
