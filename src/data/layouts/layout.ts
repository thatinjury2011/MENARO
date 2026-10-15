// 对应 src/layouts/Layout.astro
import { seoNameList } from "../products/catalog";
import { brandName } from "../site";
import type { Locale } from "../../i18n/locales";

/** 品牌名唯一来源是 src/data/site.ts，全站只在这里被读一次 */
export const BRAND: Record<Locale, string> = brandName;

/** <title> 的分隔符：页面名 | 品牌 */
export const titleSeparator = " | ";

/** 全局 <meta name="description">：产品名从产品目录派生，增删产品自动同步 */
export function metaDescription(locale: Locale): string {
  const products = seoNameList(locale).join(locale === "zh" ? "、" : ", ");
  return locale === "zh"
    ? `${BRAND.zh} —— 美纳罗建筑材料与系统解决方案：${products}。`
    : `${BRAND.en} — high-performance tile installation systems: ${products}.`;
}
