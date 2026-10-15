// 对应 src/components/shared/ValueGrid.astro
// 首页「关于 MENARO」右侧与「关于我们」页核心价值共用这份默认数据
export const valueGrid = {
  zh: {
    items: [
      {
        name: "意大利技术",
        desc: "源自意大利的先进配方，并遵循严格质量标准",
        icon: "sparkles",
      },
      {
        name: "全球市场",
        desc: "产品服务覆盖 50 多个国家和地区的专业项目",
        icon: "globe",
      },
      {
        name: "高端品质",
        desc: "严选原材料，确保稳定可靠的施工表现",
        icon: "shield",
      },
      {
        name: "专业支持",
        desc: "从选型到施工，为每一步提供专业服务",
        icon: "check",
      },
    ],
  },
  en: {
    items: [
      {
        name: "Italian Technology",
        desc: "Advanced formulations of Italian origin, held to strict quality standards",
        icon: "sparkles",
      },
      {
        name: "Global Reach",
        desc: "Serving professional projects in more than 50 countries and regions",
        icon: "globe",
      },
      {
        name: "Premium Quality",
        desc: "Carefully selected raw materials for consistent, reliable performance",
        icon: "shield",
      },
      {
        name: "Expert Support",
        desc: "Professional guidance at every step, from product selection to application",
        icon: "check",
      },
    ],
  },
};
