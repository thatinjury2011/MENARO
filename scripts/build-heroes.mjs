/**
 * 从 Figma 按图层导出的无文字 hero 图 → src/assets 下各页面目录的 hero.webp
 *
 * 源图放在 design/figma-hero/（gitignored，由 Figma MCP download_assets 导出）。
 * 节点对照表见下方 HEROES；重新导出时替换同名文件即可重跑。
 *
 * 运行：node scripts/build-heroes.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'design/figma-hero');
const OUT = path.join(ROOT, 'src/assets');

/** [源文件, 目标相对路径(不含扩展名), Figma 节点, 选项] */
const HEROES = [
  ['home.png', 'home/hero', '413:3438'],
  ['cases.png', 'cases/hero', '83:1266'],
  ['solutions-index.png', 'solutions/index/hero', '83:1364'],
  ['solutions-industrial.png', 'solutions/industrial-floor/hero', '206:2576'],
  ['about.png', 'about/hero', '83:1567'],
  ['about-manufacturing.png', 'about/manufacturing/hero', '45:1326'],
  ['global.png', 'global/hero', '83:1467'],
  ['contact.png', 'contact/hero', '85:2294'],
  ['quote.png', 'quote/hero', '83:1819'],
  ['products-tile-grout.png', 'products/tile-grout/hero', '8:100'],
  ['products-tile-adhesive.png', 'products/tile-adhesive/hero', '249:3202'],
  ['products-sealant.png', 'products/sealant/hero', '45:765'],
  ['products-floor.png', 'products/floor/hero', '45:959'],
  // 该节点导出为空，用 rawImage 原图（1900x932）按设计裁切框裁成 1900x712
  ['products-detail-tile-grout.jpg', 'products/detail-tile-grout/hero', '45:652', { crop: [1900, 712] }],
  ['products-detail-sealant.png', 'products/detail-sealant/hero', '45:867'],
  ['products-detail-floor.png', 'products/detail-floor/hero', '45:1062'],
];

const MAX_WIDTH = 3840;

async function main() {
  const rows = [];
  for (const [file, destRel, nodeId, opts = {}] of HEROES) {
    const src = path.join(SRC, file);
    const dst = path.join(OUT, `${destRel}.webp`);
    await fs.mkdir(path.dirname(dst), { recursive: true });

    let img = sharp(src);
    const meta = await img.metadata();
    if (opts.crop) {
      img = img.resize({ width: opts.crop[0], height: opts.crop[1], fit: 'cover', position: 'centre' });
    } else if (meta.width > MAX_WIDTH) {
      img = img.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }
    const out = await img.webp({ quality: 82, effort: 6 }).toFile(dst);
    const [before, after] = await Promise.all([fs.stat(src), fs.stat(dst)]);
    rows.push({
      dest: path.relative(ROOT, dst),
      nodeId,
      size: `${out.width}x${out.height}`,
      before: before.size,
      after: after.size,
    });
    console.log(
      `${path.relative(ROOT, dst).padEnd(46)} ${String(out.width).padStart(4)}x${String(out.height).padEnd(5)} ${(
        before.size / 1048576
      ).toFixed(1)}MB -> ${(after.size / 1024).toFixed(0)}KB`,
    );
  }

  const sum = (k) => rows.reduce((a, b) => a + b[k], 0);
  console.log(
    `\nOK ${rows.length} 张 hero：${(sum('before') / 1048576).toFixed(1)} MB → ${(sum('after') / 1048576).toFixed(2)} MB`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
