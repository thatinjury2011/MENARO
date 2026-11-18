/**
 * MENARO 资源整理：原始导出（Pc图片及图标）→ 规范化 WebP 资源库。
 *
 * 运行：node scripts/build-assets.mjs
 *
 * 规则：
 *  1. 只处理下面 ENTRIES / ICONS 显式声明的文件，其余（重复帧、hover 变体、UI 字形）跳过并计入报告。
 *  2. 全部输出 WebP（quality 82，保留 alpha），原图不做任何裁剪。
 *  3. 整页截图单独放 design/reference/pages，最大宽度 1920。
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'Pc图片及图标');
const OUT = path.join(ROOT, 'src/assets');
const REF = path.join(ROOT, 'design/reference/pages');

/** 原始目录 → 页面 slug（整页截图用） */
const REFERENCE = [
  ['MENARO 最终版 _ 01 _ 首页', 'home'],
  ['MENARO 最终版 _ 03 _ 项目案例', 'cases'],
  ['MENARO 最终版 _ 04 _ 解决方案', 'solutions'],
  ['MENARO 最终版 _ 05 _ 全球合作', 'global'],
  ['MENARO 最终版 _ 06 _ 关于我们', 'about'],
  ['MENARO 最终版 _ 07 _ 联系我们', 'contact'],
  ['MENARO 最终版 _ 08 _ 获取报价', 'quote'],
  ['首页 _ 全部产品弹窗（展开状态）', 'product-drawer'],
  ['MENARO｜美缝材料系列｜2880 × 6174', 'product-series-tile-grout'],
  ['MENARO 扩展 _ desktop-04 _ 美缝材料代表产品详情', 'product-detail-tile-grout'],
  ['MENARO 扩展 _ desktop-05 _ 建筑密封胶系列', 'product-series-sealant'],
  ['MENARO 扩展 _ desktop-06 _ 密封胶代表产品详情', 'product-detail-sealant'],
  ['MENARO 扩展 _ desktop-07 _ 环氧彩砂自流平与地坪系列', 'product-series-floor'],
  ['MENARO 扩展 _ desktop-08 _ 环氧彩砂自流平产品详情', 'product-detail-floor'],
  ['MENARO 扩展 _ desktop-12 _ 环氧彩砂自流平地坪', 'solution-industrial-floor'],
  ['MENARO 扩展 _ desktop-15 _ 制造与品质', 'about-manufacturing'],
  ['MENARO 扩展 _ desktop-瓷砖胶 _ 产品系列', 'product-series-tile-adhesive'],
];

/** [原始相对路径, 目标相对路径(不含扩展名)] */
const ENTRIES = [
  // ── 品牌 ─────────────────────────────────────────────
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/页头导航栏/品牌 Logo.png', 'brand/logo'],

  // ── 首页 ─────────────────────────────────────────────
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/banner/Group 44.png', 'home/hero'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/产品集合_/美缝与填缝材料.png', 'home/collection-tile-grout'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/产品集合_/瓷砖胶与铺贴材料.png', 'home/collection-tile-adhesive'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/产品集合_/建筑密封胶与结构胶.png', 'home/collection-sealant'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/产品集合_/环氧地坪与自流.png', 'home/collection-floor'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/建筑应用方案/素材包_1首页_15.png.png', 'home/application-01'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/建筑应用方案/素材包_1首页_16.png.png', 'home/application-02'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/建筑应用方案/素材包_1首页_17.png.png', 'home/application-03'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/建筑应用方案/素材包_1首页_18.png.png', 'home/application-04'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/项目案例/素材包_1首页_19.png.png', 'home/case-large-01'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/项目案例/素材包_1首页_20.png.png', 'home/case-01'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/项目案例/素材包_1首页_21.png.png', 'home/case-02'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/制造与品质/素材包_1首页_11.png.png', 'home/manufacturing-01'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/制造与品质/素材包_1首页_12.png.png', 'home/manufacturing-02'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/制造与品质/素材包_1首页_13.png.png', 'home/manufacturing-03'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/制造与品质/素材包_1首页_14.png.png', 'home/manufacturing-04'],
  [
    'MENARO 最终版 _ 01 _ 首页/图片-图标/全球合作伙伴/MENARO 最终版/01/MENARO 最终版/01/素材/素材包/1首页/22.png.png',
    'home/partners-bg',
  ],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/更多产品规划/更多产品规划｜1706-288.png', 'home/roadmap'],

  // ── 产品系列：美缝 ────────────────────────────────────
  ['MENARO｜美缝材料系列｜2880 × 6174/图片-图标/banner/banner.png', 'products/tile-grout/hero'],
  ['MENARO｜美缝材料系列｜2880 × 6174/图片-图标/产品介绍/原图.png', 'products/tile-grout/intro'],
  ['MENARO｜美缝材料系列｜2880 × 6174/图片-图标/产品系列/经典系列.png', 'products/tile-grout/series-classic'],
  ['MENARO｜美缝材料系列｜2880 × 6174/图片-图标/产品系列/专业系列.png', 'products/tile-grout/series-pro'],
  ['MENARO｜美缝材料系列｜2880 × 6174/图片-图标/产品系列/旗舰系列.png', 'products/tile-grout/series-flagship'],
  ['MENARO｜美缝材料系列｜2880 × 6174/图片-图标/包装与技术资料/原图.png', 'products/tile-grout/packaging'],

  // ── 产品系列：瓷砖胶 ──────────────────────────────────
  ['MENARO 扩展 _ desktop-瓷砖胶 _ 产品系列/图片-图标/banner.png', 'products/tile-adhesive/hero'],
  ['MENARO 扩展 _ desktop-瓷砖胶 _ 产品系列/图片-图标/瓷砖胶三档产品.png', 'products/tile-adhesive/comparison'],
  ['MENARO 扩展 _ desktop-瓷砖胶 _ 产品系列/图片-图标/瓷砖胶_/BASIC 单桶.png', 'products/tile-adhesive/bucket-basic'],
  ['MENARO 扩展 _ desktop-瓷砖胶 _ 产品系列/图片-图标/瓷砖胶_/PRO 单桶.png', 'products/tile-adhesive/bucket-pro'],
  ['MENARO 扩展 _ desktop-瓷砖胶 _ 产品系列/图片-图标/瓷砖胶_/PRO MAX 单桶.png', 'products/tile-adhesive/bucket-promax'],

  // ── 产品系列：密封胶 ──────────────────────────────────
  ['MENARO 扩展 _ desktop-05 _ 建筑密封胶系列/图片-图标/banner.png', 'products/sealant/hero'],
  ['MENARO 扩展 _ desktop-05 _ 建筑密封胶系列/图片-图标/desktop-05-photo-1.png', 'products/sealant/intro'],
  ['MENARO 扩展 _ desktop-05 _ 建筑密封胶系列/图片-图标/desktop-05-photo-2.png', 'products/sealant/series-01'],
  ['MENARO 扩展 _ desktop-05 _ 建筑密封胶系列/图片-图标/desktop-05-photo-3.png', 'products/sealant/series-02'],
  ['MENARO 扩展 _ desktop-05 _ 建筑密封胶系列/图片-图标/desktop-05-photo-4.png', 'products/sealant/series-03'],
  ['MENARO 扩展 _ desktop-05 _ 建筑密封胶系列/图片-图标/desktop-05-photo-5.png', 'products/sealant/packaging'],

  // ── 产品系列：环氧地坪 ────────────────────────────────
  ['MENARO 扩展 _ desktop-07 _ 环氧彩砂自流平与地坪系列/图片-图标/banner.png', 'products/floor/hero'],
  ['MENARO 扩展 _ desktop-07 _ 环氧彩砂自流平与地坪系列/图片-图标/desktop-07-photo-1.png', 'products/floor/intro'],
  [
    'MENARO 扩展 _ desktop-07 _ 环氧彩砂自流平与地坪系列/图片-图标/产品系列/desktop-07-photo-2.png',
    'products/floor/series-01',
  ],
  [
    'MENARO 扩展 _ desktop-07 _ 环氧彩砂自流平与地坪系列/图片-图标/产品系列/desktop-07-photo-3.png',
    'products/floor/series-02',
  ],
  [
    'MENARO 扩展 _ desktop-07 _ 环氧彩砂自流平与地坪系列/图片-图标/产品系列/desktop-07-photo-4.png',
    'products/floor/series-03',
  ],
  ['MENARO 扩展 _ desktop-07 _ 环氧彩砂自流平与地坪系列/图片-图标/desktop-07-photo-5.png', 'products/floor/packaging'],

  // ── 产品详情 ×3 ──────────────────────────────────────
  ['MENARO 扩展 _ desktop-04 _ 美缝材料代表产品详情/图片-图标/Group 52.png', 'products/detail-tile-grout/hero'],
  [
    'MENARO 扩展 _ desktop-04 _ 美缝材料代表产品详情/图片-图标/desktop-04-photo-1.png',
    'products/detail-tile-grout/product',
  ],
  [
    'MENARO 扩展 _ desktop-04 _ 美缝材料代表产品详情/图片-图标/产品规格与采购信息/desktop-04-photo-2.png',
    'products/detail-tile-grout/gallery-01',
  ],
  [
    'MENARO 扩展 _ desktop-04 _ 美缝材料代表产品详情/图片-图标/产品规格与采购信息/desktop-04-photo-3.png',
    'products/detail-tile-grout/gallery-02',
  ],
  [
    'MENARO 扩展 _ desktop-04 _ 美缝材料代表产品详情/图片-图标/产品规格与采购信息/desktop-04-photo-4.png',
    'products/detail-tile-grout/gallery-03',
  ],
  ['MENARO 扩展 _ desktop-06 _ 密封胶代表产品详情/图片-图标/banner.png', 'products/detail-sealant/hero'],
  [
    'MENARO 扩展 _ desktop-06 _ 密封胶代表产品详情/图片-图标/desktop-06-photo-1.png',
    'products/detail-sealant/product',
  ],
  [
    'MENARO 扩展 _ desktop-06 _ 密封胶代表产品详情/图片-图标/desktop-06-photo-2.png',
    'products/detail-sealant/gallery-01',
  ],
  [
    'MENARO 扩展 _ desktop-06 _ 密封胶代表产品详情/图片-图标/desktop-06-photo-3.png',
    'products/detail-sealant/gallery-02',
  ],
  [
    'MENARO 扩展 _ desktop-06 _ 密封胶代表产品详情/图片-图标/desktop-06-photo-4.png',
    'products/detail-sealant/gallery-03',
  ],
  ['MENARO 扩展 _ desktop-08 _ 环氧彩砂自流平产品详情/图片-图标/banner.png', 'products/detail-floor/hero'],
  [
    'MENARO 扩展 _ desktop-08 _ 环氧彩砂自流平产品详情/图片-图标/desktop-08-photo-1.png',
    'products/detail-floor/product',
  ],
  [
    'MENARO 扩展 _ desktop-08 _ 环氧彩砂自流平产品详情/图片-图标/desktop-08-photo-2.png',
    'products/detail-floor/gallery-01',
  ],
  [
    'MENARO 扩展 _ desktop-08 _ 环氧彩砂自流平产品详情/图片-图标/desktop-08-photo-3.png',
    'products/detail-floor/gallery-02',
  ],
  [
    'MENARO 扩展 _ desktop-08 _ 环氧彩砂自流平产品详情/图片-图标/desktop-08-photo-4.png',
    'products/detail-floor/gallery-03',
  ],

  // ── 项目案例 ─────────────────────────────────────────
  ['MENARO 最终版 _ 03 _ 项目案例/图片-图标/banner.png', 'cases/hero'],
  ['MENARO 最终版 _ 03 _ 项目案例/图片-图标/项目展示/素材包_3项目案例_2.png.png', 'cases/case-01'],
  ['MENARO 最终版 _ 03 _ 项目案例/图片-图标/项目展示/素材包_3项目案例_3.png.png', 'cases/case-02'],
  ['MENARO 最终版 _ 03 _ 项目案例/图片-图标/项目展示/素材包_3项目案例_4.png.png', 'cases/case-03'],
  ['MENARO 最终版 _ 03 _ 项目案例/图片-图标/项目展示/素材包_3项目案例_5.png.png', 'cases/case-04'],
  ['MENARO 最终版 _ 03 _ 项目案例/图片-图标/项目展示/素材包_3项目案例_6.png.png', 'cases/case-05'],
  ['MENARO 最终版 _ 03 _ 项目案例/图片-图标/项目展示/素材包_3项目案例_7.png.png', 'cases/case-06'],
  ['MENARO 最终版 _ 03 _ 项目案例/图片-图标/项目展示/素材包_3项目案例_8.png.png', 'cases/case-wide'],

  // ── 解决方案 ─────────────────────────────────────────
  ['MENARO 最终版 _ 04 _ 解决方案/图片-图标/banner.png', 'solutions/index/hero'],
  ['MENARO 最终版 _ 04 _ 解决方案/图片-图标/按建筑用途选择材料/1.png', 'solutions/index/application-01'],
  ['MENARO 最终版 _ 04 _ 解决方案/图片-图标/按建筑用途选择材料/2.png', 'solutions/index/application-02'],
  ['MENARO 最终版 _ 04 _ 解决方案/图片-图标/按建筑用途选择材料/3.png', 'solutions/index/application-03'],
  ['MENARO 最终版 _ 04 _ 解决方案/图片-图标/按建筑用途选择材料/4.png', 'solutions/index/application-04'],
  ['MENARO 扩展 _ desktop-12 _ 环氧彩砂自流平地坪/图片-图标/banner.png', 'solutions/industrial-floor/hero'],
  ['MENARO 扩展 _ desktop-12 _ 环氧彩砂自流平地坪/图片-图标/产品介绍/floor-intro.png', 'solutions/industrial-floor/intro'],
  ['MENARO 扩展 _ desktop-12 _ 环氧彩砂自流平地坪/图片-图标/应用场景/floor-scene-2.png', 'solutions/industrial-floor/scene-01'],
  ['MENARO 扩展 _ desktop-12 _ 环氧彩砂自流平地坪/图片-图标/应用场景/floor-scene-3.png', 'solutions/industrial-floor/scene-02'],
  ['MENARO 扩展 _ desktop-12 _ 环氧彩砂自流平地坪/图片-图标/施工流程/floor-step-1.png', 'solutions/industrial-floor/step-01'],
  ['MENARO 扩展 _ desktop-12 _ 环氧彩砂自流平地坪/图片-图标/施工流程/floor-step-2.png', 'solutions/industrial-floor/step-02'],
  ['MENARO 扩展 _ desktop-12 _ 环氧彩砂自流平地坪/图片-图标/施工流程/floor-step-3.png', 'solutions/industrial-floor/step-03'],
  ['MENARO 扩展 _ desktop-12 _ 环氧彩砂自流平地坪/图片-图标/施工流程/floor-step-4.png', 'solutions/industrial-floor/step-04'],
  ['MENARO 扩展 _ desktop-12 _ 环氧彩砂自流平地坪/图片-图标/应用场景/floor-step-5.png', 'solutions/industrial-floor/step-05'],

  // ── 全球合作 ─────────────────────────────────────────
  ['MENARO 最终版 _ 05 _ 全球合作/图片-图标/banner.png', 'global/hero'],

  // ── 关于我们 ─────────────────────────────────────────
  ['MENARO 最终版 _ 06 _ 关于我们/图片-图标/banner.png', 'about/hero'],
  ['MENARO 最终版 _ 06 _ 关于我们/图片-图标/素材包_6关于我们_5.png.png', 'about/intro'],
  ['MENARO 最终版 _ 06 _ 关于我们/图片-图标/我们的核心优势/素材包_6关于我们_16.png.png', 'about/advantage-bg'],
  ['MENARO 最终版 _ 06 _ 关于我们/图片-图标/全球运营与制造布局/素材包_6关于我们_6.png.png', 'about/global-01'],
  ['MENARO 最终版 _ 06 _ 关于我们/图片-图标/全球运营与制造布局/素材包_6关于我们_7.png.png', 'about/global-02'],
  ['MENARO 最终版 _ 06 _ 关于我们/图片-图标/全球运营与制造布局/素材包_6关于我们_8.png.png', 'about/global-03'],
  ['MENARO 最终版 _ 06 _ 关于我们/图片-图标/全球运营与制造布局/素材包_6关于我们_9.png.png', 'about/global-04'],

  // ── 制造与品质 ───────────────────────────────────────
  ['MENARO 扩展 _ desktop-15 _ 制造与品质/图片-图标/banner.png', 'about/manufacturing/hero'],
  ['MENARO 扩展 _ desktop-15 _ 制造与品质/图片-图标/制造与供应/desktop-15-photo-1.png', 'about/manufacturing/content-01'],
  ['MENARO 扩展 _ desktop-15 _ 制造与品质/图片-图标/制造与供应/desktop-15-photo-2.png', 'about/manufacturing/content-02'],
  ['MENARO 扩展 _ desktop-15 _ 制造与品质/图片-图标/制造与供应/desktop-15-photo-3.png', 'about/manufacturing/content-03'],
  ['MENARO 扩展 _ desktop-15 _ 制造与品质/图片-图标/制造与供应/desktop-15-photo-4.png', 'about/manufacturing/content-04'],

  // ── 联系我们 ─────────────────────────────────────────
  ['MENARO 最终版 _ 07 _ 联系我们/图片-图标/联系页主视觉.png', 'contact/hero'],
  ['MENARO 最终版 _ 07 _ 联系我们/图片-图标/采购沟通照片.png', 'contact/photo'],

  // ── 获取报价 ─────────────────────────────────────────
  ['MENARO 最终版 _ 08 _ 获取报价/图片-图标/banner.png', 'quote/hero'],
  ['MENARO 最终版 _ 08 _ 获取报价/图片-图标/为什么选择/素材包_8获取报价_5.png.png', 'quote/why'],
  ['MENARO 最终版 _ 08 _ 获取报价/图片-图标/为什么选择/Mask group.png', 'quote/why-mask'],

  // ── 产品抽屉 ─────────────────────────────────────────
  ['首页 _ 全部产品弹窗（展开状态）/图片-图标/02背景.png', 'drawer/category-bg'],
  ['首页 _ 全部产品弹窗（展开状态）/图片-图标/分类标题.png', 'drawer/category-title'],
];

/** 品牌线性图标 / 社交 / 联系 / 表单 / 分类（保留为 WebP 2x 图） */
const ICONS = [
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/共用页脚_/社交_/linkedin.png', 'icons/social-linkedin'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/共用页脚_/社交_/wechat.png', 'icons/social-wechat'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/共用页脚_/社交_/whatsapp.png', 'icons/social-whatsapp'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/共用页脚_/社交_/youtube.png', 'icons/social-youtube'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/全球合作伙伴/素材包_1首页_23.png.png', 'icons/partner-01'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/全球合作伙伴/素材包_1首页_24.png.png', 'icons/partner-02'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/全球合作伙伴/素材包_1首页_25.png.png', 'icons/partner-03'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/全球合作伙伴/素材包_1首页_26.png.png', 'icons/partner-04'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/服务亮点_/4.png', 'icons/service-01'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/服务亮点_/5.png', 'icons/service-02'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/服务亮点_/6.png', 'icons/service-03'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/服务亮点_/7.png', 'icons/service-04'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/更多产品规划/11.png', 'icons/future-01'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/更多产品规划/12.png', 'icons/future-02'],
  ['MENARO 最终版 _ 01 _ 首页/图片-图标/更多产品规划/13.png', 'icons/future-03'],
  ['MENARO 最终版 _ 06 _ 关于我们/图片-图标/我们的核心优势/素材包_6关于我们_10.png.png', 'icons/advantage-01'],
  ['MENARO 最终版 _ 06 _ 关于我们/图片-图标/我们的核心优势/素材包_6关于我们_11.png.png', 'icons/advantage-02'],
  ['MENARO 最终版 _ 06 _ 关于我们/图片-图标/我们的核心优势/素材包_6关于我们_12.png.png', 'icons/advantage-03'],
  ['MENARO 最终版 _ 06 _ 关于我们/图片-图标/我们的核心优势/素材包_6关于我们_13.png.png', 'icons/advantage-04'],
  ['MENARO 最终版 _ 06 _ 关于我们/图片-图标/我们的核心优势/素材包_6关于我们_14.png.png', 'icons/advantage-05'],
  ['MENARO 最终版 _ 06 _ 关于我们/图片-图标/我们的核心优势/素材包_6关于我们_15.png.png', 'icons/advantage-06'],
  ['MENARO 最终版 _ 06 _ 关于我们/图片-图标/全球运营与制造布局/城市.png', 'icons/global-city'],
  ['MENARO 最终版 _ 06 _ 关于我们/图片-图标/全球运营与制造布局/地址.png', 'icons/global-address'],
  ['MENARO 最终版 _ 06 _ 关于我们/图片-图标/全球运营与制造布局/人员.png', 'icons/global-people'],
  ['MENARO 最终版 _ 06 _ 关于我们/图片-图标/全球运营与制造布局/未来.png', 'icons/global-future'],
  ['MENARO 最终版 _ 07 _ 联系我们/图片-图标/联系我们/WhatsApp.png', 'icons/contact-whatsapp'],
  ['MENARO 最终版 _ 07 _ 联系我们/图片-图标/联系我们/地址.png', 'icons/contact-address'],
  ['MENARO 最终版 _ 07 _ 联系我们/图片-图标/联系我们/电话.png', 'icons/contact-phone'],
  ['MENARO 最终版 _ 07 _ 联系我们/图片-图标/联系我们/时间.png', 'icons/contact-time'],
  ['MENARO 最终版 _ 07 _ 联系我们/图片-图标/联系我们/邮箱.png', 'icons/contact-mail'],
  ['MENARO 最终版 _ 07 _ 联系我们/图片-图标/页头导航/语言.png', 'icons/language'],
  ['MENARO 最终版 _ 08 _ 获取报价/图片-图标/获取报价/box.png', 'icons/form-box'],
  ['MENARO 最终版 _ 08 _ 获取报价/图片-图标/获取报价/company.png', 'icons/form-company'],
  ['MENARO 最终版 _ 08 _ 获取报价/图片-图标/获取报价/globe.png', 'icons/form-globe'],
  ['MENARO 最终版 _ 08 _ 获取报价/图片-图标/获取报价/mail.png', 'icons/form-mail'],
  ['MENARO 最终版 _ 08 _ 获取报价/图片-图标/获取报价/pencil.png', 'icons/form-pencil'],
  ['MENARO 最终版 _ 08 _ 获取报价/图片-图标/获取报价/user.png', 'icons/form-user'],
  ['MENARO 最终版 _ 08 _ 获取报价/图片-图标/获取报价/whatsapp.png', 'icons/form-whatsapp'],
  [
    'MENARO 最终版 _ 08 _ 获取报价/图片-图标/询价流程/素材包_8获取报价_huaban-3944313959 拷贝.png.png',
    'icons/process-01',
  ],
  [
    'MENARO 最终版 _ 08 _ 获取报价/图片-图标/询价流程/素材包_8获取报价_huaban-6677160743.png.png',
    'icons/process-02',
  ],
  [
    'MENARO 最终版 _ 08 _ 获取报价/图片-图标/询价流程/素材包_8获取报价_huaban-6879869017.png.png',
    'icons/process-03',
  ],
  ['MENARO 最终版 _ 08 _ 获取报价/图片-图标/为什么选择/素材包_8获取报价_4.png.png', 'icons/why-01'],
  ['MENARO 扩展 _ desktop-12 _ 环氧彩砂自流平地坪/图片-图标/产品介绍/diamond.png', 'icons/value-diamond'],
  ['MENARO 扩展 _ desktop-12 _ 环氧彩砂自流平地坪/图片-图标/产品介绍/home.png', 'icons/value-home'],
  ['MENARO 扩展 _ desktop-12 _ 环氧彩砂自流平地坪/图片-图标/产品介绍/shield.png', 'icons/value-shield'],
  ['MENARO 扩展 _ desktop-12 _ 环氧彩砂自流平地坪/图片-图标/产品介绍/ shield_副本.png', 'icons/value-shield-outline'],
  ['MENARO 扩展 _ desktop-12 _ 环氧彩砂自流平地坪/图片-图标/产品介绍/tag.png', 'icons/value-tag'],
  ['首页 _ 全部产品弹窗（展开状态）/图片-图标/图标/美缝与填缝材料.png', 'icons/category-tile-grout'],
  ['首页 _ 全部产品弹窗（展开状态）/图片-图标/图标/瓷砖胶与铺贴材料.png', 'icons/category-tile-adhesive'],
  [
    '首页 _ 全部产品弹窗（展开状态）/图片-图标/图标/建筑密封胶与结构胶｜线性图标.png',
    'icons/category-sealant',
  ],
  ['首页 _ 全部产品弹窗（展开状态）/图片-图标/图标/环氧地坪与自流平.png', 'icons/category-floor'],
  ['首页 _ 全部产品弹窗（展开状态）/图片-图标/图标/防水与防护材料.png', 'icons/category-waterproof'],
  ['首页 _ 全部产品弹窗（展开状态）/图片-图标/图标/建筑涂料与艺术漆.png', 'icons/category-coating'],
  ['首页 _ 全部产品弹窗（展开状态）/图片-图标/图标/地板与装饰面材.png', 'icons/category-flooring'],
  ['首页 _ 全部产品弹窗（展开状态）/图片-图标/图标/全屋定制与木作系统.png', 'icons/category-woodwork'],
  ['首页 _ 全部产品弹窗（展开状态）/图片-图标/图标/门窗与移门系统.png', 'icons/category-doors'],
  ['首页 _ 全部产品弹窗（展开状态）/图片-图标/图标/家具与软装家居.png', 'icons/category-furniture'],
  ['首页 _ 全部产品弹窗（展开状态）/图片-图标/图标/照明与智能控制.png', 'icons/category-lighting'],
  ['首页 _ 全部产品弹窗（展开状态）/图片-图标/图标/轮廓｜卫浴洁具与五金配件.png', 'icons/category-bathware'],
  ['首页 _ 全部产品弹窗（展开状态）/图片-图标/更多产品与制造合作.png', 'icons/more-manufacturing'],
];

const normalize = (p) =>
  p
    .split('/')
    .map((s) => s.trim())
    .join('/');

const srcIndex = new Map();

async function walk(dir, rel = '') {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const childRel = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) await walk(path.join(dir, e.name), childRel);
    else if (e.name !== '.DS_Store') srcIndex.set(normalize(childRel), path.join(dir, e.name));
  }
}

async function toWebp(src, destDir, base, { maxWidth } = {}) {
  await fs.mkdir(destDir, { recursive: true });
  let img = sharp(src);
  if (maxWidth) img = img.resize({ width: maxWidth, withoutEnlargement: true });
  const dst = path.join(destDir, `${base}.webp`);
  await img.webp({ quality: 82, effort: 6, alphaQuality: 90 }).toFile(dst);
  const [before, after] = await Promise.all([fs.stat(src), fs.stat(dst)]);
  return { src: path.relative(ROOT, src), dst: path.relative(ROOT, dst), before: before.size, after: after.size };
}

async function toWhiteWebp(src, destDir, base) {
  await fs.mkdir(destDir, { recursive: true });
  const meta = await sharp(src).metadata();
  const alpha = await sharp(src)
    .ensureAlpha()
    .extractChannel('alpha')
    .raw()
    .toBuffer({ resolveWithObject: true });
  const dst = path.join(destDir, `${base}.webp`);
  await sharp({
    create: {
      width: meta.width,
      height: meta.height,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .joinChannel(alpha.data, { raw: { width: meta.width, height: meta.height, channels: 1 } })
    .webp({ quality: 90, effort: 6, alphaQuality: 100 })
    .toFile(dst);
  const [before, after] = await Promise.all([fs.stat(src), fs.stat(dst)]);
  return { src: path.relative(ROOT, src), dst: path.relative(ROOT, dst), before: before.size, after: after.size };
}

async function main() {
  await walk(SRC);
  const used = new Set();
  const results = [];
  const refResults = [];
  const missing = [];
  const failed = [];

  for (const [srcRel, destRel] of [...ENTRIES, ...ICONS]) {
    const key = normalize(srcRel);
    const abs = srcIndex.get(key) ?? [...srcIndex.entries()].find(([k]) => k.endsWith(key))?.[1];
    if (!abs) {
      missing.push(srcRel);
      continue;
    }
    used.add(normalize(path.relative(SRC, abs).replace(/\\/g, '/')));
    try {
      results.push(await toWebp(abs, path.join(OUT, path.dirname(destRel)), path.basename(destRel)));
    } catch (e) {
      failed.push(`${srcRel} — ${e.message}`);
    }
  }

  // 白色版 Logo（页脚用）：保留 alpha，像素统一填白
  const logoAbs = srcIndex.get(normalize('MENARO 最终版 _ 01 _ 首页/图片-图标/页头导航栏/品牌 Logo.png'));
  if (logoAbs) {
    try {
      results.push(await toWhiteWebp(logoAbs, path.join(OUT, 'brand'), 'logo-white'));
    } catch (e) {
      failed.push(`brand/logo-white — ${e.message}`);
    }
  }

  for (const [pageDir, slug] of REFERENCE) {
    const dirKey = normalize(pageDir);
    const direct = [...srcIndex.entries()].find(([k]) => {
      const parts = k.split('/');
      return parts.length === 2 && parts[0] === dirKey && /\.png$/i.test(parts[1]);
    });
    if (!direct) {
      missing.push(`${pageDir}（整页截图）`);
      continue;
    }
    used.add(direct[0]);
    refResults.push(await toWebp(direct[1], REF, slug, { maxWidth: 1920 }));
  }

  const unused = [...srcIndex.keys()].filter((k) => !used.has(k));
  const sum = (arr) => arr.reduce((a, b) => a + b, 0);

  console.log(`\nOK 站点资源 ${results.length} 个 → ${path.relative(ROOT, OUT)}`);
  console.log(`   体积 ${(sum(results.map((r) => r.before)) / 1048576).toFixed(1)} MB → ${(sum(results.map((r) => r.after)) / 1048576).toFixed(1)} MB`);
  console.log(`OK 参考截图 ${refResults.length} 张 → ${path.relative(ROOT, REF)}`);
  console.log(`   体积 ${(sum(refResults.map((r) => r.before)) / 1048576).toFixed(1)} MB → ${(sum(refResults.map((r) => r.after)) / 1048576).toFixed(1)} MB`);
  if (missing.length) console.log(`\nWARN 源文件缺失 ${missing.length} 个:\n  ${missing.join('\n  ')}`);
  if (failed.length) console.log(`\nWARN 转换失败 ${failed.length} 个:\n  ${failed.join('\n  ')}`);
  console.log(`\n跳过（重复帧 / hover 变体 / UI 字形）${unused.length} 个`);

  await fs.writeFile(
    path.join(ROOT, 'scripts/assets-report.json'),
    JSON.stringify({ results, refResults, unused, missing, failed }, null, 2),
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
