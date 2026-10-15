// 对应 src/pages/cases.astro
export const casesPage = {
  zh: {
    title: "项目案例",
    hero: {
      label: "MENARO",
      subtitle: "在不同的真实项目案例中验证非凡的可靠性能",
      description: "从高端住宅到标志性商业空间，MENARO方案兼顾美观、强度与可靠性",
      features: [
        { name: "低VOC" },
        { name: "意大利品质" },
        { name: "高端" },
        { name: "环保友好" },
      ],
    },
    stats: [
      { label: "完成项目", value: "500+" },
      { label: "服务国家", value: "25+" },
      { label: "全球铺贴面积", value: "10M+ m2" },
      { label: "客户满意度", value: "98%" },
    ],
    /** 描述沿用 CtaSection 的默认文案（src/data/shared/ctaSection.ts），不重复写 */
    cta: {
      title: "有项目计划？",
    },
  },
  en: {
    title: "Projects",
    hero: {
      label: "MENARO",
      subtitle: "Exceptional reliability, proven across real projects",
      description:
        "From premium residences to landmark commercial spaces, MENARO balances appearance, strength and reliability",
      features: [
        { name: "Low VOC" },
        { name: "Italian Quality" },
        { name: "Premium" },
        { name: "Eco-friendly" },
      ],
    },
    stats: [
      { label: "Projects Completed", value: "500+" },
      { label: "Countries Served", value: "25+" },
      { label: "Global Tiling Area", value: "10M+ m2" },
      { label: "Client Satisfaction", value: "98%" },
    ],
    cta: {
      title: "Planning a project?",
    },
  },
};
