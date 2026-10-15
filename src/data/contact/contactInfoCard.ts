// 对应 src/components/contact/ContactInfoCard.astro
// 邮箱 / 电话 / WhatsApp / 地址的值与标签来自 src/data/site.ts 的 contact、contactLabels，
// 公司名来自 site.ts 的 legalName —— 这里只放本卡片自己的文案。
export const contactInfoCard = {
  zh: {
    title: "联系信息",
    description: "您可以通过以下方式联系我们",
    hqLabel: "总部",
    hoursLabel: "营业时间",
    hours: "周一至周五: 8:30 – 18:00",
  },
};
