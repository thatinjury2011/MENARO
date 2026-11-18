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

export interface ProductCard {
  title: string;
  desc: string;
  image: ImageMetadata;
}

export interface ProductDetail {
  series: string;
  slug: string;
  title: string;
  description: string;
  model: string;
  packaging: string;
  highlight: string;
  hero: ImageMetadata;
  heroAlt: string;
  showcase: ImageMetadata;
  showcaseAlt: string;
  cards: ProductCard[];
}

const packagingCard = (image: ImageMetadata): ProductCard => ({
  title: '产品包装',
  desc: '包装形式与标签信息可按实际采购需求确认。',
  image,
});

const customCard = (image: ImageMetadata): ProductCard => ({
  title: '资料与定制',
  desc: '可咨询检测资料、包装规格与品牌定制服务。',
  image,
});

export const productDetails: ProductDetail[] = [
  {
    series: 'tile-grout',
    slug: 'mg-700',
    title: '氢化碳环彩砂美缝剂',
    description: '适合追求细腻砂感效果的瓷砖接缝项目。',
    model: 'MG-700',
    packaging: '双管 420ml/组',
    highlight: '环氧彩砂、双组份包装、瓷砖接缝',
    hero: groutHero,
    heroAlt: '氢化碳环彩砂美缝剂应用场景',
    showcase: groutShowcase,
    showcaseAlt: '氢化碳环彩砂美缝剂包装',
    cards: [
      packagingCard(groutGallery01),
      { title: '产品应用', desc: '适用于相应的瓷砖接缝装饰与保护场景。', image: groutGallery02 },
      customCard(groutGallery03),
    ],
  },
  {
    series: 'sealant',
    slug: 'ms-786',
    title: '高级中性耐候密封胶',
    description: '用于系统窗、阳光房及幕墙等建筑接缝密封方向。',
    model: 'MS-786',
    packaging: '单管 300ml/支',
    highlight: '中性硅酮、建筑接缝、密封应用',
    hero: sealantHero,
    heroAlt: '高级中性耐候密封胶应用场景',
    showcase: sealantShowcase,
    showcaseAlt: '高级中性耐候密封胶包装',
    cards: [
      packagingCard(sealantGallery01),
      { title: '产品应用', desc: '适用于相应的建筑接缝密封与保护场景。', image: sealantGallery02 },
      customCard(sealantGallery03),
    ],
  },
  {
    series: 'floor',
    slug: 'epoxy-sand',
    title: '环氧彩砂自流平系统',
    description: '适用于需要彩砂质感与地坪使用强度的商业及工业空间。',
    model: '—',
    packaging: '按体系与供货规格确认',
    highlight: '彩砂质感、自流平、系统供货',
    hero: floorHero,
    heroAlt: '环氧彩砂自流平系统地坪场景',
    showcase: floorShowcase,
    showcaseAlt: '环氧彩砂自流平系统包装',
    cards: [
      packagingCard(floorGallery01),
      { title: '产品应用', desc: '适用于相应的地坪装饰与保护场景。', image: floorGallery02 },
      customCard(floorGallery03),
    ],
  },
];

export const findProductDetail = (series: string, slug: string) =>
  productDetails.find((item) => item.series === series && item.slug === slug);
