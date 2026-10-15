// 对应 src/components/solutions/BathroomSolution.astro
export const bathroomSolution = {
  zh: {
    title: "浴室解决方案",
    /** 分两行展示，中间用 <br /> 连接 */
    descriptionLines: [
      "专为潮湿区域设计",
      "系统帮助浴室实现持久美观与稳定性能",
    ],
    imageAlt: "浴室解决方案",
    features: [
      { name: "低VOC", desc: "环保配方，更适合室内空间使用", icon: "leaf" },
      { name: "耐污性能", desc: "有效抵抗污渍和灰尘，清洁更轻松", icon: "shield" },
      { name: "色彩稳定", desc: "长久保持色彩表现，不易褪色", icon: "droplet" },
      { name: "易于施工", desc: "施工手感顺滑，呈现专业饰面效果", icon: "brush" },
    ],
  },
};
