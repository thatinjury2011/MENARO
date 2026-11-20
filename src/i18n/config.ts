export const locales = ['zh', 'en'] as const;
export type Lang = (typeof locales)[number];

export const defaultLang: Lang = 'zh';

export const htmlLang: Record<Lang, string> = {
  zh: 'zh-CN',
  en: 'en',
};

/** 语言下拉里各语言的自称（触发器显示当前语言） */
export const langName: Record<Lang, string> = {
  zh: '中文',
  en: 'English',
};
