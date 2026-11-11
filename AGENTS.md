# Menaro 项目指南

跨境电商独立站项目。当前处于起步阶段（尚无业务代码）。

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

Windows 11 ｜ Node v22.20.0 ｜ npm 11.6.2 ｜ git 2.49.0 ｜ Python 3.13.7 ｜ VS Code 1.145.3

## 技术栈（已定稿）

**Astro + Tailwind CSS + daisyUI**。设计令牌前缀 `mn-`（主色 `#083c30`），详见 design-analysis §8。

## Figma MCP（易踩坑，先看这里）

Figma 官方插件的 `mcp.json` 不符合 Agent Plugins 1.0.0 schema，会导致 Copilot Agent Host 静默忽略整个配置。
修复步骤见 [docs/troubleshooting/figma-mcp.md](docs/troubleshooting/figma-mcp.md)。
