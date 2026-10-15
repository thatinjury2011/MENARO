// 对应 src/components/home/FeaturedProducts.astro
// 上这个板块的产品由 src/data/products/catalog.ts 里每条记录的 show.home 决定
export const featuredProducts = {
  zh: {
    title: "精选产品",
    /** 卡片底部链接 */
    cardLink: "查看详情›",
  },
  en: {
    title: "Featured Products",
    /** 卡片底部链接 */
    cardLink: "View details ›",
  },
};

/** 标题背后的装饰水印：纯装饰、不随语言变 */
export const featuredProductsWatermark = "Product";
