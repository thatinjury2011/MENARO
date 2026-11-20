# Astro 图片：`.src` 在 build 后可能指向不存在的文件

> 症状：本地 `npm run dev` 图标/图片全部正常，`npm run build` 也不报错，但**部署后个别图片 404**
> （2026-11-20 实际踩到：全部产品抽屉的 12 个虚线图标 + banner + 邮箱/电话图标在线上全是破图，其他页面图片正常）。

## 原因

```astro
import icon from '../../assets/drawer/item-grout.webp';
<img src={icon.src} alt="" width="48" height="48" />
```

`ImageMetadata.src` 是 Vite 给出的**原始资源名**，而 Astro 的图片管线实际产出的是带**额外哈希后缀**的副本：

| 引用 | dist 里实际存在的文件 |
| --- | --- |
| `/_astro/item-grout.BaiSedAS.webp`（404） | `_astro/item-grout.BaiSedAS_ZqAJXk.webp`、`_astro/item-grout.BaiSedAS_2n7l9k.webp` |

也就是说 `.src` 给出的名字**没有任何文件与之对应**。之所以有时看起来正常，是因为同一个图片在别处被 `<Image>` 用过、恰好产出了同名文件——纯属运气，改动一个组件就可能全挂。

## 修复

**一律用 `<Image>`（需要 URL 字符串时用 `getImage()`），不要手写 `.src`。**

```astro
---
import { Image } from 'astro:assets';
import icon from '../../assets/drawer/item-grout.webp';
---

<Image src={icon} alt="" width={48} height={48} class="size-[2.5em] shrink-0" />
```

- `<Image>` 的 `width` / `height` 是**像素数值**（`width={48}`），不要写成字符串
- 装饰图 `alt=""`；`class` 原样透传，布局不变
- 需要 `<img>` 语义但想拿正确 URL 时：`const { src } = await getImage({ src: icon, width: 48, format: 'webp' })`

## 兜底检查

任何一次要发版前跑：

```powershell
npm run build
npm run check
```

`scripts/check-dist.mjs` 会扫描 `dist/**/*.html` 里所有本地 `src` / `srcset` / `href`，逐个确认文件存在，缺失即非零退出并列出引用它的页面。当前基线：`42 个页面 / 373 个文件全部存在`。

> 本次修复前该检查会输出 13 条缺失（全是 `item-*.webp` / `collab.webp`），修复后归零。
