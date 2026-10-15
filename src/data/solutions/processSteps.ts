// 对应 src/components/solutions/ProcessSteps.astro
export const processSteps = {
  zh: {
    title: "施工流程",
    steps: [
      { name: "基层处理", desc: "清洁并找平基层", icon: "layers" },
      { name: "底涂处理", desc: "涂刷底漆并等待干燥", icon: "roller" },
      { name: "瓷砖铺贴", desc: "使用瓷砖胶完成铺贴", icon: "tile" },
      { name: "填缝美化", desc: "使用环氧彩砂填充缝隙", icon: "brush" },
      { name: "边角密封", desc: "密封边角和伸缩缝", icon: "seal" },
      { name: "表面清洁", desc: "清洁表面，呈现最终效果", icon: "sparkles" },
    ],
  },
};
