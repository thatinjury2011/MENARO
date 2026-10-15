// 对应 src/layouts/Layout.astro
import { seoNameList } from "../products/catalog";
import { brandName } from "../site";

/** 品牌名唯一来源是 src/data/site.ts，全站只在这里被读一次 */
export const BRAND = brandName.zh;

/** <title> 的分隔符：页面名 | 品牌 */
export const titleSeparator = " | ";

/** 全局 <meta name="description">：产品名从产品目录派生，增删产品自动同步 */
export function metaDescription(): string {
  return `${BRAND} —— 美纳罗建筑材料与系统解决方案：${seoNameList().join("、")}。`;
}
