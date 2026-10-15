// 数据层入口 / 约定说明（其余数据文件按下面的规则摆放）
//
// 【目录规则】src/data 的层级与 src/layouts、src/components、src/pages 一一对应：
//   src/layouts/Layout.astro                  →  src/data/layouts/layout.ts
//   src/components/global/SiteFooter.astro    →  src/data/global/footer.ts
//   src/components/home/Hero.astro            →  src/data/home/hero.ts
//   src/pages/products.astro（页面级 props）  →  src/data/pages/products.ts
//   一个组件一个数据文件，不合并成「大杂烩」。
//
// 【多语言】
//   · 「列表」类 —— 结构字段（href、图片…）只写一次，文案按语言收在 zh / en 下：
//         { href: "/products", zh: { label: "产品" }, en: { label: "Products" } }
//     href 不复制成两份，各语言共用同一份结构。
//   · 「扁平文案」类 —— 一个 { zh: { ... }, en: { ... } } 字典。
//     组件里统一写法：
//         const locale = localeOf(Astro.currentLocale);
//         const t = xxxUi[locale];
//     TypeScript 会检查每种语言都写全，漏一个键就报错。
//   · 新增语言：只在 src/i18n/locales.ts 的 locales 里加一项，
//     再给每个 zh / en 旁边补上同名键即可。
//   · 不随语言变的内容（法务主体名、社交平台名、图标路径、图片路径）不进 locale 结构。
//
// 【多语言的实现位置】
//   src/i18n/locales.ts       语言清单（唯一来源，astro.config.ts 也读它）
//   src/i18n/links.ts         localeHref() 给站内链接加/不加语言前缀；pathWithoutLocale()
//   src/pages/[...lang]/      一个页面文件同时产出 /xxx/ 与 /en/xxx/ 两套路由
//   src/layouts/Layout.astro  <html lang>、canonical、hreflang
//   src/components/global/SiteHeader.astro  语言切换器（切到同一页的另一种语言）
//
// 【本文件只放】多个区块都要引用、又不属于任何单个区块的常量。

import type { Locale } from "../i18n/locales";

/** logo alt、品牌署名 */
export const brandName: Record<Locale, string> = {
  zh: "MENARO 美纳罗",
  en: "MENARO",
};

/** 页脚法务主体（营业执照名，不翻译） */
export const legalName = "台州市东廷科技有限公司";

// ---------------- 联系方式唯一来源 ----------------
// 之前电话 / 邮箱 / 地址在「页脚」「首页报价区」「联系页信息卡」「位置区块」各写了一遍，
// 改一次要动 3~4 个地方。统一放这里，各处派生。

export const contact = {
  phone: { value: "+86 133 2600 6020", href: "tel:+8613326006020" },
  whatsapp: { value: "+86 133 2600 6020", href: "https://wa.me/8613326006020" },
  wechat: { value: "WangUP7777" },
  email: { value: "wangup@menarobm.com", href: "mailto:wangup@menarobm.com" },
  address: {
    zh: {
      /** 完整地址（页脚 / 信息卡） */
      full: "浙江省台州市椒江区洪家街道银河名苑15幢三单元1501室",
      /** 城市行（位置区块大标题） */
      city: "中国浙江台州",
      /** 位置区块分两行展示 */
      line1: "浙江省台州市椒江区洪家街道",
      line2: "银河名苑15幢三单元1501室",
    },
    en: {
      full: "Room 1501, Unit 3, Building 15, Yinhe Mingyuan, Hongjia Street, Jiaojiang District, Taizhou, Zhejiang, China",
      city: "Taizhou, Zhejiang, China",
      line1: "Room 1501, Unit 3, Building 15, Yinhe Mingyuan",
      line2: "Hongjia Street, Jiaojiang District, Taizhou, Zhejiang, China",
    },
  },
};

/** 联系方式的展示标签（首页报价区 / 联系页信息卡共用） */
export const contactLabels: Record<
  Locale,
  {
    phone: string;
    whatsapp: string;
    wechat: string;
    email: string;
    address: string;
  }
> = {
  zh: {
    phone: "电话",
    whatsapp: "WhatsApp",
    wechat: "微信",
    email: "邮箱",
    address: "地址",
  },
  en: {
    phone: "Phone",
    whatsapp: "WhatsApp",
    wechat: "WeChat",
    email: "Email",
    address: "Address",
  },
};
