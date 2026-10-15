// 对应 src/components/contact/ContactPage.astro
// 该组件是 /contact 与 /quote 两个页面的公共主体
export const contactPageContent = {
  zh: {
    hero: {
      label: "MENARO",
      title: "联系 · 获取报价",
      subtitle: "有问题或项目需求？",
      description: "我们的团队将帮助您找到合适的解决方案",
      features: [
        { name: "快速响应" },
        { name: "专家支持" },
        { name: "全球服务" },
        { name: "可靠品质" },
      ],
    },
    cta: {
      title: "还有其他问题？",
      description: "我们的专家团队可提供专业建议和定制化解决方案",
    },
  },
};
