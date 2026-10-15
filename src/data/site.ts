// 数据层入口 / 约定说明（其余数据文件按下面的规则摆放）
//
// 【目录规则】src/data 的层级与 src/layouts、src/components、src/pages 一一对应：
//   src/layouts/Layout.astro                  →  src/data/layouts/layout.ts
//   src/components/global/SiteFooter.astro    →  src/data/global/footer.ts
//   src/components/home/Hero.astro            →  src/data/home/hero.ts
//   src/pages/products.astro（页面级 props）  →  src/data/pages/products.ts
//   一个组件一个数据文件，不合并成「大杂烩」。
//
// 【两种数据形状】
//   · 「列表」类 —— 结构字段（href、图片…）只写一次，文案放在每一条的 zh 键下：
//         { href: "/products", zh: { label: "产品" } }
//     这样将来加英文只补 zh 旁边的 en，不会把 href 复制成两份。
//   · 「扁平文案」类 —— 一个 { zh: { ... } } 字典，组件里 const t = xxxUi.zh;
//   · 不随语言变的内容（法务主体名、社交平台名、图标路径）不进 locale 结构。
//
// 【本文件只放】多个区块都要引用、又不属于任何单个区块的常量。

/** logo alt、品牌署名；英文站会是 "MENARO" */
export const brandName = { zh: "MENARO 美纳罗" };

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
  },
};

/** 联系方式的展示标签（首页报价区 / 联系页信息卡共用） */
export const contactLabels = {
  zh: {
    phone: "电话",
    whatsapp: "WhatsApp",
    wechat: "微信",
    email: "邮箱",
    address: "地址",
  },
};
