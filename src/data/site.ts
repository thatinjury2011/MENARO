export interface NavItem {
  label: string;
  href: string;
}

export const site = {
  name: 'MENARO',
  title: 'MENARO｜高品质建筑材料制造与全球供应',
  description:
    '美纳罗专注于高品质建筑材料的研发、制造与全球供应，为全球经销商、批发商、品牌客户与工程采购商提供可靠的产品、专业定制服务和稳定的供应保障。',
} as const;

/** 主导航（与设计稿一致：产品体系 / 制造与品质 两个入口） */
export const navItems: NavItem[] = [
  { label: '首页', href: '/' },
  { label: '产品体系', href: '/products' },
  { label: '项目案例', href: '/cases' },
  { label: '解决方案', href: '/solutions' },
  { label: '全球合作', href: '/global' },
  { label: '制造与品质', href: '/about/manufacturing' },
  { label: '关于我们', href: '/about' },
  { label: '联系我们', href: '/contact' },
];

export const quoteCta: NavItem = { label: '获取报价', href: '/quote' };

export const legalLinks: NavItem[] = [
  { label: '企业资质', href: '/about#certifications' },
  { label: '隐私政策', href: '/privacy' },
  { label: '使用条款', href: '/terms' },
  { label: '网站地图', href: '/sitemap' },
];