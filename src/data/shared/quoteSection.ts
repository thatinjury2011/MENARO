// 对应 src/components/shared/QuoteSection.astro
import { contact, contactLabels } from "../site";
import type { Locale } from "../../i18n/locales";

export const quoteSection = {
  zh: {
    formTitle: "获取报价",
    helpTitle: "我们随时为您提供帮助",
    qrCaption: "扫描 WhatsApp 二维码添加联系",
    qrAlt: "WhatsApp 二维码",
  },
  en: {
    formTitle: "Request a Quote",
    helpTitle: "We're here to help",
    qrCaption: "Scan the WhatsApp QR code to reach us",
    qrAlt: "WhatsApp QR code",
  },
};

/**
 * 右侧联系方式列表：标签取自 contactLabels，值取自 contact（唯一来源）。
 * href 为空表示该项不可点（微信没有 URL scheme）。
 */
export const quoteContacts = (locale: Locale) => {
  const labels = contactLabels[locale];
  return [
    {
      label: labels.phone,
      value: contact.phone.value,
      href: contact.phone.href,
    },
    {
      label: labels.whatsapp,
      value: contact.whatsapp.value,
      href: contact.whatsapp.href,
    },
    {
      label: labels.wechat,
      value: contact.wechat.value,
      href: undefined,
    },
    {
      label: labels.email,
      value: contact.email.value,
      href: contact.email.href,
    },
    {
      label: labels.address,
      value: contact.address[locale].full,
      href: undefined,
    },
  ];
};
