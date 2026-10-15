// 多语言清单 —— 全站唯一来源。astro.config.ts 也读这里，不在两处各写一份。
//
// ⚠️ 本文件不能 import "astro:i18n"、"astro:config/client" 这类虚拟模块，
//    否则 Astro 加载配置文件时会失败（配置文件运行在 Astro 运行时之外）。
//    依赖 Astro 运行时的东西放在 src/i18n/links.ts。

export const locales = ["zh", "en"] as const;

export type Locale = (typeof locales)[number];

/** 默认语言：URL 不加前缀（/products/），其余语言加前缀（/en/products/） */
export const defaultLocale: Locale = "zh";

/** <html lang> 与 hreflang 用的完整语言标记 */
export const htmlLang: Record<Locale, string> = {
  zh: "zh-CN",
  en: "en",
};

/**
 * 用户手动点过语言切换器后，把选择写进 localStorage 的键名。
 * 一旦有记录，LocaleRedirect 就不再按浏览器语言自动跳转 —— 用户的选择优先。
 */
export const langStorageKey = "menaro-lang";

/** 把 Astro.currentLocale 或路由参数收敛成受支持的语言；缺失时回退到默认语言 */
export function localeOf(current: string | undefined | null): Locale {
  return locales.includes(current as Locale) ? (current as Locale) : defaultLocale;
}

/**
 * [...lang] 动态路由的静态参数。
 * 默认语言用 undefined（Astro 会生成无前缀的路径），其余语言用语言代码。
 * 于是「一个页面文件」就能同时产出中文和英文两套页面。
 */
export function localeStaticPaths() {
  return locales.map((lang) => ({
    params: { lang: lang === defaultLocale ? undefined : lang },
  }));
}
