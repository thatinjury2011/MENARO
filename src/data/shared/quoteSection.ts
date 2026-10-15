// 对应 src/components/shared/QuoteSection.astro
import { contact, contactLabels } from "../site";

export const quoteSection = {
  zh: {
    formTitle: "获取报价",
    helpTitle: "我们随时为您提供帮助",
    qrCaption: "扫描 WhatsApp 二维码添加联系",
    qrAlt: "WhatsApp 二维码",
  },
};

/**
 * 右侧联系方式列表：标签取自 contactLabels，值取自 contact（唯一来源）。
 * href 为空表示该项不可点（微信没有 URL scheme）。
 */
export const quoteContacts = [
  {
    label: contactLabels.zh.phone,
    value: contact.phone.value,
    href: contact.phone.href,
  },
  {
    label: contactLabels.zh.whatsapp,
    value: contact.whatsapp.value,
    href: contact.whatsapp.href,
  },
  {
    label: contactLabels.zh.wechat,
    value: contact.wechat.value,
    href: undefined,
  },
  {
    label: contactLabels.zh.email,
    value: contact.email.value,
    href: contact.email.href,
  },
  {
    label: contactLabels.zh.address,
    value: contact.address.zh.full,
    href: undefined,
  },
];
