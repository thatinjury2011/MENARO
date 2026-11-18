/**
 * 为「导出稿缺少无文字底图」的 hero 生成占位图。
 *
 * 背景：这 5 张 banner 在 Figma 与导出稿之间已经改版（导出稿为最终版），
 * 而导出稿里只有带文字的整图，没有独立照片图层。先把位置占住，等拿到最终版底图后
 * 直接用同名文件覆盖即可（src/assets/.../hero.webp），无需改代码。
 *
 * 运行：node scripts/build-placeholders.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'src/assets');

/** [目标相对路径(不含扩展名), 宽, 高, 说明] */
export const PLACEHOLDER_HEROES = [
  ['products/tile-grout/hero', 874, 932, '美缝材料系列'],
  ['products/floor/hero', 1748, 1864, '环氧地坪与自流平系列'],
  ['products/sealant/hero', 3800, 1424, '建筑密封胶系列'],
  ['products/detail-sealant/hero', 3800, 1424, '密封胶产品详情'],
  ['quote/hero', 3840, 1236, '获取报价'],
];

function svg(w, h, label, target) {
  const title = Math.round(Math.min(w, h) * 0.075);
  const sub = Math.round(Math.min(w, h) * 0.032);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <pattern id="stripe" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="80" height="80" fill="#eef1f2"/>
      <rect width="40" height="80" fill="#e0e6e8"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#stripe)"/>
  <rect x="6" y="6" width="${w - 12}" height="${h - 12}" fill="none" stroke="#b9c4c7" stroke-width="10"/>
  <text x="50%" y="43%" text-anchor="middle" font-family="Microsoft YaHei, Segoe UI, sans-serif"
        font-size="${title}" font-weight="700" fill="#5d6d72">占位图 · 待替换</text>
  <text x="50%" y="54%" text-anchor="middle" font-family="Microsoft YaHei, Segoe UI, sans-serif"
        font-size="${sub}" fill="#7b8a8f">${label} — 导出稿缺少无文字底图</text>
  <text x="50%" y="62%" text-anchor="middle" font-family="Consolas, monospace"
        font-size="${Math.round(sub * 0.85)}" fill="#8e9b9f">src/assets/${target}.webp</text>
  <text x="50%" y="69%" text-anchor="middle" font-family="Microsoft YaHei, Segoe UI, sans-serif"
        font-size="${Math.round(sub * 0.85)}" fill="#8e9b9f">拿到最终版底图后，用同名文件覆盖即可</text>
</svg>`;
}

async function main() {
  for (const [rel, w, h, label] of PLACEHOLDER_HEROES) {
    const dst = path.join(OUT, `${rel}.webp`);
    await fs.mkdir(path.dirname(dst), { recursive: true });
    await sharp(Buffer.from(svg(w, h, label, rel)))
      .webp({ quality: 88, effort: 6 })
      .toFile(dst);
    const st = await fs.stat(dst);
    console.log(`${path.relative(ROOT, dst).padEnd(46)} ${w}x${h}  ${(st.size / 1024).toFixed(0)}KB`);
  }
  console.log(`\n已生成 ${PLACEHOLDER_HEROES.length} 张占位图；替换时直接覆盖同名 webp 文件即可。`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
