# Menaro 项目指南

跨境电商独立站项目。当前进度：**中英双语 20 个页面全部落地**（中文在根路径，英文在 `/en`，共 40 条路由），进入逐页视觉校对阶段。

## 新会话第一步

按顺序读这两份文档即可快速掌握项目：

1. [docs/PROJECT_LOG.md](docs/PROJECT_LOG.md) — 项目全局状态与**滚动版本日志**（每次任务完成后必须追加一条）
2. [docs/design-analysis.md](docs/design-analysis.md) — Figma 设计稿分析（页面清单、令牌、组件、交互、实施路线）
3. [docs/troubleshooting/](docs/troubleshooting/) — 环境/工具链的踩坑与修复手册

## 强制约定

- **任何任务完成后**，在 `docs/PROJECT_LOG.md` 的「版本变更日志」表追加一行，版本号自增（见该文档的版本规则），并在「任务看板」更新状态。
- 遇到需要多次排查才解决的问题，写一份 `docs/troubleshooting/<主题>.md`，并在 PROJECT_LOG 中引用。
- 不要在两个文件里重复同一内容，PROJECT_LOG 只留摘要 + 链接。

## 环境

Windows 11 ｜ **Node v26.13.1（fnm 管理）** ｜ npm 11.20.0 ｜ git 2.49.0 ｜ Python 3.13.7 ｜ VS Code 1.145.3

> Node 由 fnm 切换，项目根目录 `.node-version` 锁定 `26.13.1`。
> 输入 `node -v` 若仍是 v22.20.0，说明当前 shell 没加载 fnm（profile 见 `docs/troubleshooting/astro-toolchain-versions.md`）。

## 技术栈（已定稿）

**Astro 7 + Tailwind CSS v4 + daisyUI 5**。设计令牌前缀 `mn-`（主色 `#083c30`），详见 design-analysis §8。

## 样式与资源原则

1. **设计以 `Pc图片及图标/` 的导出为准**，Figma 文件只作参考——两者冲突时一律以导出稿为准（导出的 PNG/整页截图就是最终版）。
2. **Tailwind / daisyUI 优先**：设计稿里的 `.mn-*` 自定义类只做等价替换（`btn btn-primary`、`card`、`collapse`…），Tailwind 表达不了才写 CSS。
2. **图片统一 WebP**：全部放 `src/assets/<页面>/`，命名 `<区块>-<序号>.webp`；PNG 只作原始素材，不进生产。
3. **通用 UI 字形用内联 SVG**（箭头、chevron、关闭、对勾、时钟），不要导出成图片。
4. 资源由 `node scripts/build-assets.mjs` 生成，映射表就是文档；重复导出/hover 变体不入库。
5. 整页参考图在 `design/reference/pages/`（已 gitignore），用于还原比对。
6. **hero/banner 图必须按图层从 Figma 导出**（`node scripts/build-heroes.mjs`，节点表见 PROJECT_LOG v1.6.0），不要从整页截图裁切——那样会把标题文字一起烘焙进图片。

## 常用命令

```powershell
npm install      # 首次
npm run dev      # http://localhost:4321
npm run build    # 静态产物 → dist/
npm run preview
```

## 目录速览

```
src/
├─ layouts/Base.astro          # SEO meta + Header/Footer 包裹
├─ components/
│  ├─ ui/                      # 原子件：Container / Button / ArrowLink / ArrowIcon / SectionHeading / Breadcrumb
│  ├─ site/                    # 全站结构：Header / Footer
│  ├─ sections/                # 跨页业务区块：PageHero / InquiryCta / ProcessSteps / InquiryForm
│  └─ pages/<page>/            # 单页私有区块：home / products / cases / solutions / global / about / contact / quote
├─ data/                       # 单一数据源：site.ts（导航）/ product-details.ts（详情页内容）
├─ pages/
│  ├─ index.astro              # 首页
│  ├─ 404.astro
│  ├─ cases / solutions/index / solutions/industrial-floor / global / contact / quote
│  ├─ about/index / about/manufacturing
│  ├─ privacy / terms / sitemap
│  └─ products/
│     ├─ index.astro           # 产品目录（/products）
│     ├─ tile-grout | tile-adhesive | sealant | floor.astro
│     └─ [series]/[product].astro   # 产品详情动态路由
└─ styles/global.css           # @theme --mn-* 令牌 + daisyUI 主题 menaro
public/brand/                  # 品牌 Logo（绿/白两版）
```

**组件分层约定**：`ui/` 无业务语义；跨页复用的业务区块放 `components/sections/`；单页私有放 `components/pages/<page>/`。产品文案统一收在 `src/data/`，页面只做排版。

**PageHero 用法**：默认（照片 58%、正文 `lg:max-w-[38vw]`）用于系列/列表页；长文案页（如工业地坪方案）传 `variant="wide"`（照片 65%、正文 30vw）；品牌页可传 `brandMark` 在标题上方渲染 Logo。

## 多语言（中文 / 英文）

- **路由**：中文在根路径（`/products`），英文加 `/en` 前缀（`/en/products`）。每个页面在 `src/pages/**` 与 `src/pages/en/**` 各有一个 3 行 wrapper，真正的版式在 `src/components/pages/<area>/*Page.astro`。
- **取语言**：组件里 `const lang = getLangFromUrl(Astro.url)`，链接一律 `localizePath(href, lang)`；不要硬编码 `/en`。
- **文案**：共用文案在 `src/i18n/ui.ts`（导航/页脚/状态标签），首页在 `src/i18n/home.ts`，产品系列在 `src/i18n/series.ts`，详情页在 `src/data/product-details.ts`（`zh`/`en` 并列），其余页面组件内用 `{ zh: {...}, en: {...} }[lang]`。
- **新增语言**：在 `src/i18n/config.ts` 的 `locales` 里加代码，补齐字典，再生成对应前缀的路由目录即可。

## 版本约束（重要）

- **Node ≥ 22.23.4**（Astro 7 硬要求），当前统一用 **26.13.1**；`package.json` 已声明 `engines`。
- **不要单独安装 vite**：Astro 7 自带 `vite@8`，`@tailwindcss/vite` 共用同一份。多装一份 vite 会重演编译期崩溃。
- 升级/排障细节见 [docs/troubleshooting/astro-toolchain-versions.md](docs/troubleshooting/astro-toolchain-versions.md)。

## Figma MCP（易踩坑，先看这里）

Figma 官方插件的 `mcp.json` 不符合 Agent Plugins 1.0.0 schema，会导致 Copilot Agent Host 静默忽略整个配置。
修复步骤见 [docs/troubleshooting/figma-mcp.md](docs/troubleshooting/figma-mcp.md)。
