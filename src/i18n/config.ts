export const locales = ['zh', 'en'] as const;
export type Lang = (typeof locales)[number];

export const defaultLang: Lang = 'zh';

export const htmlLang: Record<Lang, string> = {
  zh: 'zh-CN',
  en: 'en',
};

/** 语言切换按钮上显示的目标语言文案 */
export const langLabel: Record<Lang, string> = {
  zh: 'EN',
  en: '中文',
};
