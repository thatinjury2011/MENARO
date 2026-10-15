// 对应 src/pages/products.astro
export const productsPage = {
  zh: {
    /** Layout 的页面名，会拼成「产品 | MENARO 美纳罗」 */
    title: "产品",
    hero: {
      label: "MENARO",
      subtitle: "高端瓷砖铺贴材料",
      description: "专业系统解决方案，融合意大利技术，呈现持久美观效果。",
      features: [
        { name: "高端饰面" },
        { name: "可靠品质" },
        { name: "防水" },
        { name: "环保友好" },
      ],
    },
  },
  en: {
    /** Layout 的页面名，会拼成「Products | MENARO」 */
    title: "Products",
    hero: {
      label: "MENARO",
      subtitle: "Premium tile installation materials",
      description:
        "Professional system solutions that combine Italian technology for a finish that lasts.",
      features: [
        { name: "Premium Finish" },
        { name: "Reliable Quality" },
        { name: "Waterproof" },
        { name: "Eco-friendly" },
      ],
    },
  },
};
