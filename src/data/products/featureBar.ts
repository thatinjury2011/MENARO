// 对应 src/components/products/ProductFeatureBar.astro
export const featureBar = {
  zh: {
    features: [
      { name: "低VOC", desc: "环保配方，更适合室内空间使用", icon: "leaf" },
      { name: "耐污性能", desc: "有效抵抗污渍和灰尘，清洁更轻松", icon: "shield" },
      { name: "色彩稳定", desc: "长久保持色彩表现，不易褪色", icon: "droplet" },
      { name: "易于施工", desc: "施工手感顺滑，呈现专业饰面效果", icon: "brush" },
    ],
  },
  en: {
    features: [
      { name: "Low VOC", desc: "Eco-friendly formulation, ideal for interiors", icon: "leaf" },
      {
        name: "Stain Resistance",
        desc: "Resists stains and dust for easier cleaning",
        icon: "shield",
      },
      {
        name: "Color Stability",
        desc: "Holds its color over time without fading",
        icon: "droplet",
      },
      {
        name: "Easy Application",
        desc: "Smooth workability for a professional finish",
        icon: "brush",
      },
    ],
  },
};
