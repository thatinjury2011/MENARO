# Menaro 项目指南

跨境电商独立站项目。当前处于**脚手架阶段**：Astro + Tailwind v4 + daisyUI 骨架可跑，业务页面从 P1 开始实现。

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

1. **Tailwind / daisyUI 优先**：设计稿里的 `.mn-*` 自定义类只做等价替换（`btn btn-primary`、`card`、`collapse`…），Tailwind 表达不了才写 CSS。
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
│  ├─ ui/                      # 原子件：Container / Button / ArrowLink / ArrowIcon / SectionHeading
│  ├─ site/                    # 全站结构：Header / Footer
│  └─ pages/<page>/            # 单页私有区块，如 pages/home/*
├─ data/site.ts                # 导航与站点元信息（单一数据源）
├─ pages/                      # index 首页、404
└─ styles/global.css           # @theme --mn-* 令牌 + daisyUI 主题 menaro
public/brand/                  # 品牌 Logo（绿/白两版）
```

**组件分层约定**：`ui/` 无业务语义；跨页复用的业务区块放 `components/sections/`（尚未开始）；单页私有放 `components/pages/<page>/`。

## 版本约束（重要）

- **Node ≥ 22.23.4**（Astro 7 硬要求），当前统一用 **26.13.1**；`package.json` 已声明 `engines`。
- **不要单独安装 vite**：Astro 7 自带 `vite@8`，`@tailwindcss/vite` 共用同一份。多装一份 vite 会重演编译期崩溃。
- 升级/排障细节见 [docs/troubleshooting/astro-toolchain-versions.md](docs/troubleshooting/astro-toolchain-versions.md)。

## Figma MCP（易踩坑，先看这里）

Figma 官方插件的 `mcp.json` 不符合 Agent Plugins 1.0.0 schema，会导致 Copilot Agent Host 静默忽略整个配置。
修复步骤见 [docs/troubleshooting/figma-mcp.md](docs/troubleshooting/figma-mcp.md)。
