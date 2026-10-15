// 对应 src/components/about/BrandStory.astro
export const brandStory = {
  zh: {
    title: "品牌故事",
    /** 标题背后的装饰水印（不翻译） */
    watermark: "MENARO",
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
};
