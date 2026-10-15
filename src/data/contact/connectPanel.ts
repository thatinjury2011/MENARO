// 对应 src/components/contact/ConnectPanel.astro
export const connectPanel = {
  zh: {
    title: "联系我们",
    /** 分两行展示，中间用 <br /> 连接 */
    qrHintLines: ["扫描二维码添加 WhatsApp", "便于快速沟通"],
    qrAlt: "WhatsApp 二维码",
    stats: [
      { label: "服务国家", value: "100+" },
      { label: "行业经验", value: "10+" },
      { label: "完成项目", value: "5000+" },
      { label: "技术专家", value: "50+" },
    ],
    statsHeading: "让我们一起打造优秀项目",
    statsDescription: "无论您有问题、需要支持，还是想讨论项目，我们都将帮助您推进成功",
  },
};
