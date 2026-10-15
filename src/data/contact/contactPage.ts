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
    /** 描述沿用 CtaSection 的默认文案（src/data/shared/ctaSection.ts），不重复写 */
    cta: {
      title: "还有其他问题？",
    },
  },
  en: {
    hero: {
      label: "MENARO",
      title: "Contact · Request a Quote",
      subtitle: "Have a question or a project in mind?",
      description: "Our team will help you find the right solution",
      features: [
        { name: "Fast Response" },
        { name: "Expert Support" },
        { name: "Global Service" },
        { name: "Reliable Quality" },
      ],
    },
    cta: {
      title: "Still have questions?",
    },
  },
};
