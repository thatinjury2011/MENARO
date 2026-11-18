import type { Lang } from './config';

export interface HomeText {
  hero: {
    tagline: string;
    logoAlt: string;
    imageAlt: string;
    titleLines: string[];
    sub: string;
    desc: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
  services: { title: string; desc: string }[];
  collection: {
    title: string;
    subtitle: string;
    link: string;
    items: { title: string; desc: string; href: string }[];
  };
  roadmap: {
    title: string;
    sub: string;
    badge: string;
    items: { title: string; desc: string }[];
    system: { title: string; desc: string; chips: string[] };
  };
  manufacturing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    note: string[];
    cards: string[];
    pillars: { label: string; title: string; desc: string }[];
  };
  applications: {
    title: string;
    subtitle: string;
    note: string;
    link: string;
    scenes: { title: string; sub: string }[];
  };
  cases: {
    title: string;
    subtitle: string;
    link: string;
    main: { title: string; sub: string; cta: string };
    items: { title: string; sub: string }[];
  };
  partners: {
    title: string;
    desc: string;
    items: { title: string; lines: string[] }[];
  };
  contactCta: { eyebrow: string; title: string; desc: string; cta: string };
}

export const home: Record<Lang, HomeText> = {
  zh: {
    hero: {
      tagline: '更好的材料，更好的建筑',
      logoAlt: 'MENARO 美纳罗',
      imageAlt: 'MENARO 建筑材料制造与全球供应的现代建筑外立面',
      titleLines: ['高品质建筑材料制造', '与全球供应'],
      sub: '建筑材料制造与全球供应',
      desc: '美纳罗专注于高品质建筑材料的研发、制造与全球供应，依托专业制造能力、稳定的生产资源及严格的品质管理体系，为全球经销商、批发商、品牌客户与工程采购商提供可靠的产品、专业定制服务和稳定的供应保障。',
      primary: { label: '查看核心产品', href: '/products' },
      secondary: { label: '商务合作', href: '/contact' },
    },
    services: [
      { title: '专业制造协同', desc: '深度合作 ．生产组织' },
      { title: '品质过程管理', desc: '从原料到交付的质量要求' },
      { title: '定制合作服务', desc: '产品规格 · 包装定制' },
      { title: '全球供应服务', desc: '定制订单 ．长期合作' },
    ],
    collection: {
      title: '产品系列',
      subtitle: 'PRODUCT COLLECTION · 产品体系',
      link: '查看全部产品',
      items: [
        { title: '美缝与填缝材料', desc: '美缝剂·填缝材料·美缝辅材', href: '/products/tile-grout' },
        { title: '瓷砖胶与铺贴材料', desc: '瓷砖胶·铺贴材料', href: '/products/tile-adhesive' },
        { title: '建筑密封胶与结构胶', desc: '建筑密封胶·结构胶', href: '/products/sealant' },
        { title: '环氧地坪与自流平', desc: '环氧彩砂自流平·地坪漆', href: '/products/floor' },
      ],
    },
    roadmap: {
      title: '更多产品规划',
      sub: '持续完善的产品布局',
      badge: '规划中',
      items: [
        { title: '防水与防护材料', desc: '防水涂料·防水浆料·防护材料' },
        { title: '建筑涂料与艺术漆', desc: '内墙漆·外墙漆·艺术漆·底漆' },
      ],
      system: {
        title: '空间成品与定制系统',
        desc: '为住宅及商业空间提供可安装、可使用的成品与配套系统',
        chips: ['全屋定制与木作系统', '门窗与移门系统', '地板与装饰面材', '卫浴洁具与五金配件', '照明与智能控制', '家具与软装家居'],
      },
    },
    manufacturing: {
      eyebrow: '专业制造与可靠交付',
      title: '制造与品质',
      subtitle: '制造与品质',
      note: ['美纳罗以自主制造基地为基础，并整合国内外优质合作制造资源，', '构建自主生产与合作制造相结合的供应体系。'],
      cards: ['制造协同', '生产与定制', '品质检验', '包装与交付'],
      pillars: [
        {
          label: '制造协同',
          title: '深度协同的制造体系',
          desc: '与专业制造企业长期协作，在部分合作生产线参与生产组织、质量管理与订单交付，形成灵活可靠的供应能力。',
        },
        {
          label: '品质与交付',
          title: '产品品质与供应保障',
          desc: '围绕产品规格、原料管理、过程检验及出口交付开展协同管理，满足不同客户的采购与定制需求。',
        },
      ],
    },
    applications: {
      title: '建筑应用方案',
      subtitle: '多场景应用解决方案',
      note: '从住宅到商业空间、从室内配套到室外建筑应用，为不同采购项目匹配适宜的材料方案。',
      link: '了解应用场景',
      scenes: [
        { title: '住宅空间', sub: '家居空间' },
        { title: '商业建筑', sub: '商业场景空间' },
        { title: '室外与建筑外立面', sub: '建筑与空间应用' },
        { title: '公共建筑与空间', sub: '公共建筑空间' },
      ],
    },
    cases: {
      title: '项目案例',
      subtitle: '多场景应用解决方案',
      link: '查看全部案例',
      main: { title: '台州腾达中心', sub: '打造高品质商务空间', cta: '洽谈商务合作' },
      items: [
        { title: '台州鑫都国际大酒店', sub: '优质建筑材料 致力城市高端酒店建设' },
        { title: '台州市腾达研究院', sub: '高性能材料 打造现代科研空间' },
      ],
    },
    partners: {
      title: '全球合作伙伴',
      desc: '我们与全球经销商，建筑商，品牌客户及工程采购商建立长期稳定的合作关系，提供优质的产品，专业的解决方案与持续的服务支持，共同推动更高品质的建筑空间。',
      items: [
        { title: '进口商与经销商', lines: ['进口商与经销商', '长期供应与渠道合作'] },
        { title: '批发与多品类采购', lines: ['批发与集中采购', '专业产品与灵活采购'] },
        { title: '品牌定制贴牌定制', lines: ['自有品牌与定制', '产品与包装定制'] },
        { title: '工程与项目供应', lines: ['工程项目供应', '项目材料与交付支持'] },
      ],
    },
    contactCta: {
      eyebrow: '携手共创更好建筑',
      title: '寻找可靠的建筑材料合作伙伴？',
      desc: '欢迎咨询产品参数、采购数量、贴牌定制需求与长期合作方案。',
      cta: '洽谈商务合作',
    },
  },
  en: {
    hero: {
      tagline: 'Better materials, better buildings',
      logoAlt: 'MENARO',
      imageAlt: 'Modern facade built with MENARO materials',
      titleLines: ['Quality building materials,', 'manufactured and supplied worldwide'],
      sub: 'Building materials manufacturing & global supply',
      desc: 'MENARO focuses on the development, manufacturing and global supply of high-quality building materials. Backed by professional manufacturing capability, stable production resources and a strict quality management system, we provide distributors, wholesalers, brand owners and project buyers worldwide with reliable products, professional customisation and dependable supply.',
      primary: { label: 'Explore products', href: '/products' },
      secondary: { label: 'Business partnership', href: '/contact' },
    },
    services: [
      { title: 'Manufacturing coordination', desc: 'Close cooperation · production organisation' },
      { title: 'Process quality control', desc: 'Quality requirements from raw material to delivery' },
      { title: 'Custom cooperation', desc: 'Product specifications · packaging customisation' },
      { title: 'Global supply service', desc: 'Custom orders · long-term cooperation' },
    ],
    collection: {
      title: 'Product collection',
      subtitle: 'PRODUCT COLLECTION',
      link: 'View all products',
      items: [
        { title: 'Tile grout & jointing', desc: 'Grout · joint filler · accessories', href: '/products/tile-grout' },
        { title: 'Tile adhesive & installation', desc: 'Tile adhesive · installation materials', href: '/products/tile-adhesive' },
        { title: 'Sealants & structural adhesives', desc: 'Sealants · structural adhesives', href: '/products/sealant' },
        { title: 'Epoxy flooring & self-levelling', desc: 'Epoxy coloured sand · floor coatings', href: '/products/floor' },
      ],
    },
    roadmap: {
      title: 'More product lines',
      sub: 'A continuously expanding portfolio',
      badge: 'Planned',
      items: [
        { title: 'Waterproofing & protection', desc: 'Waterproof coatings · waterproof slurry · protective materials' },
        { title: 'Architectural & decorative coatings', desc: 'Interior paint · exterior paint · decorative paint · primer' },
      ],
      system: {
        title: 'Interior systems & customisation',
        desc: 'Ready-to-install products and systems for residential and commercial spaces',
        chips: ['Whole-house customisation & joinery', 'Doors & sliding systems', 'Flooring & decorative panels', 'Sanitary ware & hardware', 'Lighting & smart control', 'Furniture & soft furnishing'],
      },
    },
    manufacturing: {
      eyebrow: 'Professional manufacturing, reliable delivery',
      title: 'Manufacturing & quality',
      subtitle: 'Manufacturing & quality',
      note: ['Built on our own manufacturing base and supported by qualified partner factories,', 'we combine in-house production with contracted manufacturing.'],
      cards: ['Manufacturing coordination', 'Production & customisation', 'Quality inspection', 'Packaging & delivery'],
      pillars: [
        {
          label: 'Manufacturing coordination',
          title: 'A closely coordinated manufacturing system',
          desc: 'Long-term cooperation with professional manufacturers: we take part in production planning, quality management and order delivery on selected partner lines, forming a flexible and reliable supply capability.',
        },
        {
          label: 'Quality & delivery',
          title: 'Product quality and supply assurance',
          desc: 'We coordinate around product specifications, raw material management, in-process inspection and export delivery to meet the purchasing and customisation needs of different customers.',
        },
      ],
    },
    applications: {
      title: 'Application solutions',
      subtitle: 'Solutions for multiple scenarios',
      note: 'From residential to commercial spaces, from interior fit-out to exterior applications — we match suitable material systems to each procurement project.',
      link: 'Explore applications',
      scenes: [
        { title: 'Residential', sub: 'Living spaces' },
        { title: 'Commercial buildings', sub: 'Commercial interiors' },
        { title: 'Exterior & facades', sub: 'Building envelope applications' },
        { title: 'Public buildings', sub: 'Public spaces' },
      ],
    },
    cases: {
      title: 'Project cases',
      subtitle: 'Material solutions in real projects',
      link: 'View all cases',
      main: { title: 'Taizhou Tengda Center', sub: 'Building a high-quality business space', cta: 'Discuss partnership' },
      items: [
        { title: 'Taizhou Xindu International Hotel', sub: 'Quality materials for premium hospitality projects' },
        { title: 'Taizhou Tengda Research Institute', sub: 'High-performance materials for modern research spaces' },
      ],
    },
    partners: {
      title: 'Global partners',
      desc: 'We build long-term relationships with distributors, builders, brand owners and project buyers worldwide — supplying quality products, professional solutions and continuous service support to advance better building spaces.',
      items: [
        { title: 'Importers & distributors', lines: ['Importers & distributors', 'Long-term supply and channel cooperation'] },
        { title: 'Wholesale & multi-category buyers', lines: ['Wholesale & central purchasing', 'Professional products, flexible sourcing'] },
        { title: 'Private label & OEM', lines: ['Own brand & customisation', 'Product and packaging customisation'] },
        { title: 'Project supply', lines: ['Engineering project supply', 'Project materials and delivery support'] },
      ],
    },
    contactCta: {
      eyebrow: 'Let’s build better together',
      title: 'Looking for a reliable building materials partner?',
      desc: 'Talk to us about product specifications, order quantities, private label requirements and long-term cooperation.',
      cta: 'Discuss partnership',
    },
  },
};
