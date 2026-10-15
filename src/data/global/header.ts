// 对应 src/components/global/SiteHeader.astro

/** 主导航（结构 + 文案） */
export const navItems = [
  { href: "/", zh: { label: "首页" } },
  { href: "/products", zh: { label: "产品" } },
  { href: "/solutions", zh: { label: "解决方案" } },
  { href: "/cases", zh: { label: "项目案例" } },
  { href: "/about", zh: { label: "关于我们" } },
  { href: "/contact", zh: { label: "联系我们" } },
];

export const headerUi = {
  zh: {
    homeAria: "MENARO 首页",
    mainNavAria: "主导航",
    mobileNavAria: "移动端导航",
    quote: "获取报价",
    searchLabel: "搜索",
    searchPlaceholder: "搜索",
    /** 语言切换：当前语言 / 可切语言 */
    langCurrent: "中",
    langOther: "EN",
    openMenu: "打开导航菜单",
    closeMenu: "关闭导航菜单",
  },
};
