export interface NavItem {
  label: string;
  href: string;
}

export const site = {
  name: 'MENARO',
  title: 'MENARO｜建筑材料与系统解决方案',
  description: 'MENARO 提供美缝材料、瓷砖胶、建筑密封胶与环氧地坪等建筑材料与系统解决方案。',
} as const;

/** 全局一级导航（7 个页面入口），「获取报价」单独作为 CTA。 */
export const navItems: NavItem[] = [
  { label: '首页', href: '/' },
  { label: '产品中心', href: '/products' },
  { label: '项目案例', href: '/cases' },
  { label: '解决方案', href: '/solutions' },
  { label: '全球合作', href: '/global' },
  { label: '关于我们', href: '/about' },
  { label: '联系我们', href: '/contact' },
];

export const quoteCta: NavItem = { label: '获取报价', href: '/quote' };
