// 对应 src/components/about/BrandStory.astro
export const brandStory = {
  zh: {
    title: "品牌故事",
    heading: "共同打造更好的空间",
    paragraphs: [
      "MENARO 创立于中国，秉持着一个简单信念：空间里的每一个细节都很重要。",
      "我们研发高性能、环保的瓷砖铺贴解决方案，融合中国技术、高端原材料与严格质量控制。",
    ],
    stats: [
      { label: "行业经验", value: "20+" },
      { label: "全球市场", value: "50+" },
      { label: "合作项目", value: "1000+" },
      { label: "技术专家", value: "50+" },
    ],
    originBadge: {
      title: "中国制造",
      desc: "以中国专业力与热情打造",
    },
    imageAlt: "品牌故事",
    pillars: [
      {
        name: "我们的使命",
        desc: "提供高端、创新、可持续的瓷砖铺贴解决方案，提升每个空间的美观度与耐久性",
        icon: "sparkles",
      },
      {
        name: "我们的价值观",
        desc: "质量优先、创新驱动、客户导向、诚信可信",
        icon: "shield",
      },
      {
        name: "可持续承诺",
        desc: "低 VOC、水性配方，关注健康与环境保护",
        icon: "leaf",
      },
    ],
  },
  en: {
    title: "Brand Story",
    heading: "Building better spaces together",
    paragraphs: [
      "MENARO was founded in China on a simple belief: every detail in a space matters.",
      "We develop high-performance, environmentally responsible tile installation solutions, combining Chinese engineering, premium raw materials and strict quality control.",
    ],
    stats: [
      { label: "Years of Experience", value: "20+" },
      { label: "Global Markets", value: "50+" },
      { label: "Projects Delivered", value: "1000+" },
      { label: "Technical Experts", value: "50+" },
    ],
    originBadge: {
      title: "Made in China",
      desc: "Crafted with Chinese expertise and dedication",
    },
    imageAlt: "Brand story",
    pillars: [
      {
        name: "Our Mission",
        desc: "To provide premium, innovative and sustainable tile installation solutions that improve the appearance and durability of every space",
        icon: "sparkles",
      },
      {
        name: "Our Values",
        desc: "Quality first, innovation-driven, customer-focused, honest and trustworthy",
        icon: "shield",
      },
      {
        name: "Our Sustainability Commitment",
        desc: "Low-VOC, water-based formulations that care for health and the environment",
        icon: "leaf",
      },
    ],
  },
};

/** 标题背后的装饰水印：纯装饰、不随语言变 */
export const brandStoryWatermark = "MENARO";
