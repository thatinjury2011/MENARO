import type { Lang } from './config';

export interface NavItem {
  label: string;
  href: string;
}

export interface UiText {
  skipToContent: string;
  nav: NavItem[];
  quote: NavItem;
  legal: NavItem[];
  logoLabel: string;
  logoAlt: string;
  tagline: string;
  brandTagline: string;
  navAria: string;
  footerNavAria: string;
  menuAria: string;
  langSwitchAria: string;
  breadcrumbAria: string;
  social: { wechat: string; linkedin: string; youtube: string; whatsapp: string };
  planning: string;
  online: string;
  learnSeries: string;
  viewAll: string;
}

export const ui: Record<Lang, UiText> = {
  zh: {
    skipToContent: '跳到主要内容',
    nav: [
      { label: '首页', href: '/' },
      { label: '产品体系', href: '/products' },
      { label: '项目案例', href: '/cases' },
      { label: '解决方案', href: '/solutions' },
      { label: '全球合作', href: '/global' },
      { label: '制造与品质', href: '/manufacturing' },
      { label: '关于我们', href: '/about' },
      { label: '联系我们', href: '/contact' },
    ],
    quote: { label: '获取报价', href: '/quote' },
    legal: [
      { label: '企业资质', href: '/about#certifications' },
      { label: '隐私政策', href: '/privacy' },
      { label: '使用条款', href: '/terms' },
      { label: '网站地图', href: '/sitemap' },
    ],
    logoLabel: 'MENARO 首页',
    logoAlt: 'MENARO 美纳罗',
    tagline: '建筑材料制造与全球供应',
    brandTagline: '更好的材料，更好的建筑',
    navAria: '主导航',
    footerNavAria: '页脚导航',
    menuAria: '打开导航菜单',
    langSwitchAria: '切换语言',
    breadcrumbAria: '面包屑',
    social: { wechat: '微信', linkedin: 'LinkedIn', youtube: 'YouTube', whatsapp: 'WhatsApp' },
    planning: '规划中',
    online: '已上线',
    learnSeries: '了解系列',
    viewAll: '查看全部',
  },
  en: {
    skipToContent: 'Skip to main content',
    nav: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Projects', href: '/cases' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Global', href: '/global' },
      { label: 'Manufacturing', href: '/manufacturing' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    quote: { label: 'Get a Quote', href: '/quote' },
    legal: [
      { label: 'Certifications', href: '/about#certifications' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
      { label: 'Sitemap', href: '/sitemap' },
    ],
    logoLabel: 'MENARO home',
    logoAlt: 'MENARO',
    tagline: 'Building materials manufacturing & global supply',
    brandTagline: 'Better materials, better buildings',
    navAria: 'Main navigation',
    footerNavAria: 'Footer navigation',
    menuAria: 'Open navigation menu',
    langSwitchAria: 'Switch language',
    breadcrumbAria: 'Breadcrumb',
    social: { wechat: 'WeChat', linkedin: 'LinkedIn', youtube: 'YouTube', whatsapp: 'WhatsApp' },
    planning: 'Planned',
    online: 'Available',
    learnSeries: 'View series',
    viewAll: 'View all',
  },
};
