// 对应 src/components/home/FeaturedProducts.astro
// 上这个板块的产品由 src/data/products/catalog.ts 里每条记录的 show.home 决定
export const featuredProducts = {
  zh: {
    title: "精选产品",
    /** 卡片底部链接 */
    cardLink: "查看详情›",
    /** 装饰水印（不翻译） */
    watermark: "Product",
  },
};
