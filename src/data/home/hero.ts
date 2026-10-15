// 对应 src/components/home/Hero.astro
// 大标题取产品主推项（src/data/products/catalog.ts 的 show.hero），这里只放其余文案。
export const hero = {
  zh: {
    label: "MENARO",
    subtitle: "高端瓷砖缝隙美化解决方案",
    description:
      "高性能、低VOC、色彩稳定的系统方案，保护每一处细节并提升空间质感",
    features: [
      { name: "低VOC配方" },
      { name: "色彩稳定" },
      { name: "耐污性能" },
      { name: "防霉保护" },
    ],
  },
};

/** 按钮：variant 决定描边风格（solid / ghost） */
export const heroActions = [
  { label: "浏览产品", href: "/products", variant: "solid" as const },
  { label: "查看解决方案", href: "/solutions", variant: "ghost" as const },
];
