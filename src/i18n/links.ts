// 站内链接的本地化。
//
// 数据层里的 href 一律写成语言无关的形式（"/products"），
// 由组件在渲染时转成 "/products"（中文）或 "/en/products"（英文）。
//
// 这里没有用 Astro 的 getRelativeLocaleUrl()：它会**给无尾斜杠的路径补一个尾斜杠**
// （实测 getRelativeLocaleUrl("zh", "/products") 返回 "/products/"），
// 会让现有中文站所有内链的 URL 形式都变掉。自己换算可以保证：
//   · 中文（默认语言）的 href 输出与加英文之前**完全一致**
//   · 英文只是简单加一层 /en 前缀
// 前缀规则与 astro.config.ts 的 i18n.routing.prefixDefaultLocale 保持一致：
// 默认语言不加前缀，其余语言加。
import { defaultLocale, type Locale } from "./locales";

/**
 * 只处理以 "/" 开头的站内页面路径。
 * 外链、tel:、mailto:、锚点（"#"）原样返回 —— 这些不该被加语言前缀。
 * 注意：图片路径（/images/…）同样以 "/" 开头，但那是静态资源，不能走这个函数。
 *
 * 输出统一**不带尾斜杠**（站点根路径除外）：vercel.json 里是
 * `cleanUrls: true` + `trailingSlash: false`，带尾斜杠的地址会被 301 掉，
 * canonical / hreflang 里就更不该出现。
 */
export function localeHref(locale: Locale, href: string): string {
  if (!href.startsWith("/")) return href;
  const path = href.length > 1 ? href.replace(/\/+$/, "") : "/";
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/**
 * 从 pathname 去掉语言前缀，得到「语言无关」的路径。
 * 用于语言切换器的目标地址，以及 canonical / hreflang。
 *   ("zh", "/products/")      → "/products/"
 *   ("en", "/en/products/")   → "/products/"
 *   ("en", "/en/")            → "/"
 */
export function pathWithoutLocale(locale: Locale, pathname: string): string {
  if (locale === defaultLocale) return pathname || "/";
  const prefix = `/${locale}`;
  if (pathname === prefix || pathname === `${prefix}/`) return "/";
  if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length);
  return pathname || "/";
}
