/**
 * 从整页导出图（design/reference/pages/*.webp）裁出「导出目录里缺失、但整页图里存在」的配图。
 *
 * 背景：这类图没有独立图层导出，但整页导出图里是干净的纯照片区域（不含标题文字），
 * 从整页图裁切不会把文字烘焙进图片，因此可以安全使用。
 *
 * 前置：需要本地存在 design/reference/pages/（已 gitignore，由 scripts/build-assets.mjs 生成）。
 * 运行：node scripts/build-crops.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REF = path.join(ROOT, 'design/reference/pages');
const OUT = path.join(ROOT, 'src/assets');

/** [整页图, left, top, width, height, 目标相对路径(不含扩展名)] */
const CROPS = [
  ['solution-industrial-floor', 71, 1814, 568, 372, 'solutions/industrial-floor/scene-03'],
];

async function main() {
  for (const [page, left, top, width, height, rel] of CROPS) {
    const src = path.join(REF, `${page}.webp`);
    const dst = path.join(OUT, `${rel}.webp`);
    await fs.mkdir(path.dirname(dst), { recursive: true });
    await sharp(src).extract({ left, top, width, height }).webp({ quality: 86, effort: 6 }).toFile(dst);
    const st = await fs.stat(dst);
    console.log(`${path.relative(ROOT, dst).padEnd(52)} ${width}x${height}  ${(st.size / 1024).toFixed(0)}KB`);
  }
  console.log(`\n已生成 ${CROPS.length} 张裁切图。`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
