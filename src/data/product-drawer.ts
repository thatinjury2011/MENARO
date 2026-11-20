/**
 * 页头「产品体系」触发的全部产品抽屉（产品目录弹窗）文案。
 * 图标按 key 在组件内映射到 src/assets/drawer，链接沿用现有产品系列路由；
 * 尚未上线（planned）的分组/条目统一落到联系我们。
 */
export interface DrawerItem {
  icon: string;
  name: string;
  meta: string;
  href: string;
  planned?: boolean;
}

export interface DrawerGroup {
  index: string;
  title: string;
  desc: string;
  bg: 'category-title' | 'category-bg';
  items: DrawerItem[];
}

export interface DrawerContent {
  panelTitle: string;
  closeLabel: string;
  online: string;
  planned: string;
  groupAria: string;
  groups: DrawerGroup[];
  collab: {
    icon: string;
    title: string;
    meta: string;
    cta: string;
    href: string;
    email: string;
    phone: string;
    emailLabel: string;
    phoneLabel: string;
  };
}

export const productDrawer: Record<'zh' | 'en', DrawerContent> = {
  zh: {
    panelTitle: '产品目录',
    closeLabel: '关闭产品目录',
    online: '已上线',
    planned: '规划中',
    groupAria: '产品分类',
    groups: [
      {
        index: '01',
        title: '建筑与装修施工材料',
        desc: '用于建筑及装修施工的铺贴、粘结、密封、防水和表面处理，为住宅、商业及工程项目提供可靠的材料解决方案。',
        bg: 'category-title',
        items: [
          { icon: 'grout', name: '美缝与填缝材料', meta: '环氧美缝剂 · 晶瓷美缝剂 · 填缝材料', href: '/products/tile-grout' },
          { icon: 'adhesive', name: '瓷砖胶与铺贴材料', meta: '瓷砖胶 · 瓷砖背胶 · 辅贴辅材', href: '/products/tile-adhesive' },
          { icon: 'sealant', name: '建筑密封胶与结构胶', meta: '玻璃胶 · 耐候密封胶 · 结构胶', href: '/products/sealant' },
          { icon: 'epoxy', name: '环氧地坪与自流平', meta: '环氧彩砂自流平 · 环氧地坪', href: '/products/floor' },
          { icon: 'waterproof', name: '防水与防护材料', meta: '防水涂料 · 防水浆料 · 防护材料', href: '/contact', planned: true },
          { icon: 'coating', name: '建筑涂料与艺术漆', meta: '内墙漆 · 外墙漆 · 艺术漆', href: '/contact', planned: true },
        ],
      },
      {
        index: '02',
        title: '空间成品与定制系统',
        desc: '为住宅及商业空间提供可安装、可使用的成品与配套系统，\n支持标准化采购与个性化定制。',
        bg: 'category-bg',
        items: [
          { icon: 'joinery', name: '全屋定制与木作系统', meta: '橱柜 · 衣柜 · 室内木门 · 墙板 · 木饰面', href: '/contact', planned: true },
          { icon: 'windows', name: '门窗与移门系统', meta: '系统门窗 · 铝木门窗 · 联动移门 · 折叠门', href: '/contact', planned: true },
          { icon: 'flooring', name: '地板与装饰面材', meta: '实木地板 · 多层地板 · SPC地板 · 饰面板', href: '/contact', planned: true },
          { icon: 'sanitary', name: '卫浴洁具与五金配件', meta: '卫浴洁具 · 龙头花洒 · 五金配件', href: '/contact', planned: true },
          { icon: 'lighting', name: '照明与智能控制', meta: '室内照明 · 商业照明 · 智能控制', href: '/contact', planned: true },
          { icon: 'furniture', name: '家具与软装家居', meta: '活动家具 · 窗帘布艺 · 家居配饰', href: '/contact', planned: true },
        ],
      },
    ],
    collab: {
      icon: 'collab',
      title: '更多产品与制造合作',
      meta: '产品制造 · 定制生产 · 项目配套',
      cta: '联系我们',
      href: '/contact',
      email: 'menarobm@gmail.com',
      phone: '+86 137 3857 7658',
      emailLabel: '企业邮箱',
      phoneLabel: '电话',
    },
  },
  en: {
    panelTitle: 'Product catalogue',
    closeLabel: 'Close product catalogue',
    online: 'Available',
    planned: 'Planned',
    groupAria: 'Product categories',
    groups: [
      {
        index: '01',
        title: 'Construction & finishing',
        desc: 'Installation, bonding, sealing, waterproofing and surface finishing.',
        bg: 'category-title',
        items: [
          { icon: 'grout', name: 'Tile grout & jointing', meta: 'Epoxy · Crystal grout · Fillers', href: '/products/tile-grout' },
          { icon: 'adhesive', name: 'Tile adhesive & installation', meta: 'Adhesive · Slurry · Accessories', href: '/products/tile-adhesive' },
          { icon: 'sealant', name: 'Sealants & structural adhesives', meta: 'Silicone · Sealant · Structural', href: '/products/sealant' },
          { icon: 'epoxy', name: 'Epoxy flooring & self-levelling', meta: 'Coloured-sand levelling · Flooring', href: '/products/floor' },
          { icon: 'waterproof', name: 'Waterproofing & protection', meta: 'Coating · Slurry · Protection', href: '/contact', planned: true },
          { icon: 'coating', name: 'Architectural & decorative coatings', meta: 'Interior · Exterior · Decorative', href: '/contact', planned: true },
        ],
      },
      {
        index: '02',
        title: 'Interior & custom systems',
        desc: 'Installable products and systems for homes and commercial spaces.',
        bg: 'category-bg',
        items: [
          { icon: 'joinery', name: 'Whole-house customisation & joinery', meta: 'Cabinets · Wardrobes · Panels', href: '/contact', planned: true },
          { icon: 'windows', name: 'Doors, windows & sliding systems', meta: 'System windows · Sliding · Folding', href: '/contact', planned: true },
          { icon: 'flooring', name: 'Flooring & decorative panels', meta: 'Solid · Engineered · SPC flooring', href: '/contact', planned: true },
          { icon: 'sanitary', name: 'Sanitary ware & hardware', meta: 'Sanitary ware · Faucets & showers · Hardware', href: '/contact', planned: true },
          { icon: 'lighting', name: 'Lighting & smart control', meta: 'Interior · Commercial · Smart', href: '/contact', planned: true },
          { icon: 'furniture', name: 'Furniture & soft furnishing', meta: 'Furniture · Textiles · Accessories', href: '/contact', planned: true },
        ],
      },
    ],
    collab: {
      icon: 'collab',
      title: 'More products & manufacturing',
      meta: 'Manufacturing · Customisation',
      cta: 'Contact us',
      href: '/contact',
      email: 'menarobm@gmail.com',
      phone: '+86 137 3857 7658',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
    },
  },
};
