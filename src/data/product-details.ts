import type { ImageMetadata } from 'astro';

import groutHero from '../assets/products/detail-tile-grout/hero.webp';
import groutShowcase from '../assets/products/detail-tile-grout/product.webp';
import groutGallery01 from '../assets/products/detail-tile-grout/gallery-01.webp';
import groutGallery02 from '../assets/products/detail-tile-grout/gallery-02.webp';
import groutGallery03 from '../assets/products/detail-tile-grout/gallery-03.webp';

import sealantHero from '../assets/products/detail-sealant/hero.webp';
import sealantShowcase from '../assets/products/detail-sealant/product.webp';
import sealantGallery01 from '../assets/products/detail-sealant/gallery-01.webp';
import sealantGallery02 from '../assets/products/detail-sealant/gallery-02.webp';
import sealantGallery03 from '../assets/products/detail-sealant/gallery-03.webp';

import floorHero from '../assets/products/detail-floor/hero.webp';
import floorShowcase from '../assets/products/detail-floor/product.webp';
import floorGallery01 from '../assets/products/detail-floor/gallery-01.webp';
import floorGallery02 from '../assets/products/detail-floor/gallery-02.webp';
import floorGallery03 from '../assets/products/detail-floor/gallery-03.webp';

interface LocaleCopy {
  title: string;
  description: string;
  model: string;
  packaging: string;
  highlight: string;
  heroAlt: string;
  showcaseAlt: string;
  cards: { title: string; desc: string }[];
}

export interface ProductDetail {
  series: string;
  slug: string;
  hero: ImageMetadata;
  showcase: ImageMetadata;
  gallery: ImageMetadata[];
  zh: LocaleCopy;
  en: LocaleCopy;
}

export const productDetails: ProductDetail[] = [
  {
    series: 'tile-grout',
    slug: 'mg-700',
    hero: groutHero,
    showcase: groutShowcase,
    gallery: [groutGallery01, groutGallery02, groutGallery03],
    zh: {
      title: '氢化碳环彩砂美缝剂',
      description: '适合追求细腻砂感效果的瓷砖接缝项目。',
      model: 'MG-700',
      packaging: '双管 420ml/组',
      highlight: '环氧彩砂、双组份包装、瓷砖接缝',
      heroAlt: '氢化碳环彩砂美缝剂应用场景',
      showcaseAlt: '氢化碳环彩砂美缝剂包装',
      cards: [
        { title: '产品包装', desc: '包装形式与标签信息可按实际采购需求确认。' },
        { title: '产品应用', desc: '适用于相应的瓷砖接缝装饰与保护场景。' },
        { title: '资料与定制', desc: '可咨询检测资料、包装规格与品牌定制服务。' },
      ],
    },
    en: {
      title: 'Hydrogenated cycloaliphatic coloured sand grout',
      description: 'For tile joint projects that call for a fine sand texture.',
      model: 'MG-700',
      packaging: 'Twin cartridge 420 ml/set',
      highlight: 'Epoxy coloured sand, twin-component packaging, tile joints',
      heroAlt: 'Coloured sand grout application',
      showcaseAlt: 'Coloured sand grout packaging',
      cards: [
        { title: 'Packaging', desc: 'Packaging format and label information confirmed against actual procurement requirements.' },
        { title: 'Applications', desc: 'For the decoration and protection of matching tile joints.' },
        { title: 'Documents & customisation', desc: 'Ask about test documents, packaging specifications and private label services.' },
      ],
    },
  },
  {
    series: 'sealant',
    slug: 'ms-786',
    hero: sealantHero,
    showcase: sealantShowcase,
    gallery: [sealantGallery01, sealantGallery02, sealantGallery03],
    zh: {
      title: '高级中性耐候密封胶',
      description: '用于系统窗、阳光房及幕墙等建筑接缝密封方向。',
      model: 'MS-786',
      packaging: '单管 300ml/支',
      highlight: '中性硅酮、建筑接缝、密封应用',
      heroAlt: '高级中性耐候密封胶应用场景',
      showcaseAlt: '高级中性耐候密封胶包装',
      cards: [
        { title: '产品包装', desc: '包装形式与标签信息可按实际采购需求确认。' },
        { title: '产品应用', desc: '适用于相应的建筑接缝密封与保护场景。' },
        { title: '资料与定制', desc: '可咨询检测资料、包装规格与品牌定制服务。' },
      ],
    },
    en: {
      title: 'Premium neutral weatherproof sealant',
      description: 'For sealing building joints in system windows, sunrooms and curtain walls.',
      model: 'MS-786',
      packaging: 'Single cartridge 300 ml',
      highlight: 'Neutral silicone, building joints, sealing applications',
      heroAlt: 'Weatherproof sealant application',
      showcaseAlt: 'Weatherproof sealant packaging',
      cards: [
        { title: 'Packaging', desc: 'Packaging format and label information confirmed against actual procurement requirements.' },
        { title: 'Applications', desc: 'For the sealing and protection of matching building joints.' },
        { title: 'Documents & customisation', desc: 'Ask about test documents, packaging specifications and private label services.' },
      ],
    },
  },
  {
    series: 'floor',
    slug: 'epoxy-sand',
    hero: floorHero,
    showcase: floorShowcase,
    gallery: [floorGallery01, floorGallery02, floorGallery03],
    zh: {
      title: '环氧彩砂自流平系统',
      description: '适用于需要彩砂质感与地坪使用强度的商业及工业空间。',
      model: '—',
      packaging: '按体系与供货规格确认',
      highlight: '彩砂质感、自流平、系统供货',
      heroAlt: '环氧彩砂自流平系统地坪场景',
      showcaseAlt: '环氧彩砂自流平系统包装',
      cards: [
        { title: '产品包装', desc: '包装形式与标签信息可按实际采购需求确认。' },
        { title: '产品应用', desc: '适用于相应的地坪装饰与保护场景。' },
        { title: '资料与定制', desc: '可咨询检测资料、包装规格与品牌定制服务。' },
      ],
    },
    en: {
      title: 'Epoxy coloured sand self-levelling system',
      description: 'For commercial and industrial floors that need a coloured sand finish and working strength.',
      model: '—',
      packaging: 'Confirmed by system and supply specification',
      highlight: 'Coloured sand finish, self-levelling, full-system supply',
      heroAlt: 'Epoxy coloured sand self-levelling floor',
      showcaseAlt: 'Self-levelling system packaging',
      cards: [
        { title: 'Packaging', desc: 'Packaging format and label information confirmed against actual procurement requirements.' },
        { title: 'Applications', desc: 'For the decoration and protection of matching floors.' },
        { title: 'Documents & customisation', desc: 'Ask about test documents, packaging specifications and private label services.' },
      ],
    },
  },
];

export const findProductDetail = (series: string, slug: string) =>
  productDetails.find((item) => item.series === series && item.slug === slug);