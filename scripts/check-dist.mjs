/**
 * 校验 `dist/` 里所有本地资源引用都真实存在。
 *
 * 背景：`<img src={asset.src}>` 这类写法在 dev 下看着正常，build 后 `asset.src`
 * 可能指向一个没被产出的文件名（HTTP 404），只在线上暴露。
 * 详见 docs/troubleshooting/astro-image-src.md。
 *
 * 运行：`npm run build` 之后执行 `npm run check`
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');

if (!fs.existsSync(DIST)) {
  console.error('dist/ 不存在，先跑 npm run build');
  process.exit(1);
}

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });

const files = walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const existing = new Set(files.map((f) => path.relative(DIST, f).replace(/\\/g, '/')));

const REF = /(?:src|srcset|href)="(\/[^"]+)"/g;
const missing = new Map();

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(REF)) {
    const refs = match[1]
      .split(',')
      .map((part) => part.trim().split(/\s+/)[0])
      .filter(Boolean);

    for (const ref of refs) {
      if (!ref.startsWith('/') || ref.startsWith('//')) continue;
      const clean = decodeURIComponent(ref.split(/[?#]/)[0]).replace(/^\//, '');
      if (!clean) continue;
      const candidates = [
        clean,
        `${clean}.html`,
        `${clean}index.html`,
        `${clean.replace(/\/$/, '')}/index.html`,
      ];
      if (candidates.some((c) => existing.has(c))) continue;
      const page = path.relative(DIST, file).replace(/\\/g, '/');
      if (!missing.has(ref)) missing.set(ref, new Set());
      missing.get(ref).add(page);
    }
  }
}

if (missing.size) {
  console.error(`✗ ${missing.size} 个资源引用在 dist/ 里找不到：\n`);
  for (const [ref, pages] of [...missing].sort()) {
    console.error(`  ${ref}   （${pages.size} 个页面，例如 ${[...pages][0]}）`);
  }
  process.exit(1);
}

console.log(`✓ ${htmlFiles.length} 个页面的本地资源引用全部存在（dist/ 共 ${files.length} 个文件）`);
