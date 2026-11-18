import type { Lang } from '../i18n/config';

export const site = {
  name: 'MENARO',
  title: {
    zh: 'MENARO｜高品质建筑材料制造与全球供应',
    en: 'MENARO | High-quality building materials, manufactured and supplied worldwide',
  } satisfies Record<Lang, string>,
  description: {
    zh: '美纳罗专注于高品质建筑材料的研发、制造与全球供应，为全球经销商、批发商、品牌客户与工程采购商提供可靠的产品、专业定制服务和稳定的供应保障。',
    en: 'MENARO focuses on the development, manufacturing and global supply of high-quality building materials, serving distributors, wholesalers, brand owners and project buyers worldwide with reliable products, professional customisation and dependable supply.',
  } satisfies Record<Lang, string>,
};