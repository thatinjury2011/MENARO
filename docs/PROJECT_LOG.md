# Menaro 项目全局日志（滚动版）

> **文档版本**：v1.2.0 ｜ **最后更新**：2026-11-11 ｜ **维护者**：bo li
>
> **用途**：任何新会话 / 新协作者读这一份，就能掌握项目现状与历史决策。
> **规则**：每完成一个任务，在 §5 追加一行记录（版本号自增），并在 §6 看板更新状态。

---

## 1. 项目概况

| 项 | 内容 |
| --- | --- |
| 项目名 | Menaro |
| 类型 | 跨境电商独立站（DTC） |
| 本地路径 | `D:\独立站\menaro` |
| 代码仓库 | `https://github.com/thatinjury2011/MENARO`（公开，默认分支 `main`） |
| 当前阶段 | 起步期 —— 仅有工具链配置，无业务代码 |
| 技术栈 | **Astro + Tailwind CSS + daisyUI**（已定稿，见 ADR-001） |

---

## 2. 环境快照

| 组件 | 版本 |
| --- | --- |
| OS | Windows 11 (x64) |
| VS Code | 1.145.3 |
| Node.js | v22.20.0 |
| npm | 11.6.2 |
| git | 2.49.0.windows.1 |
| Python | 3.13.7 |

VS Code 已安装相关扩展：Tailwind CSS IntelliSense、ESLint、Prettier、Figma (`figma.figma-vscode-extension` 0.4.8)。

---

## 3. 已启用的 MCP / 插件

| 名称 | 作用域 | 状态 | 说明 |
| --- | --- | --- | --- |
| `figma` | 用户级插件 | ✅ 可用 | 官方插件 `figma/mcp-server-guide`，已本地修补 schema，详见 [troubleshooting/figma-mcp.md](troubleshooting/figma-mcp.md) |
| `github` | 用户级 | ✅ 可用 | GitHub MCP Server（远端） |
| `Astro docs` | 用户级 | ✅ 可用 | `https://mcp.docs.astro.build/mcp` |
| `daisyUI` | 用户级 | ✅ 可用 | GitMCP 代理 `saadeghi/daisyui` |
| `vercel` | 用户级插件 | ⚠️ 需授权 | 插件已装，尚未完成 OAuth |
| `tdx-finance` | 用户级 | ❌ 不可用 | OAuth 资源元数据探测失败（`Failed to fetch resource metadata`） |
| `openclaw-gateway` | 用户级 | ❔ 未知 | — |

> 工作区级 `.vscode/mcp.json` 已删除，MCP 配置统一走用户级，避免同名服务器重复注册。

---

## 4. 关键决策记录（ADR 摘要）

| ID | 决策 | 理由 | 日期 |
| --- | --- | --- | --- |
| ADR-001 | 技术栈定为 **Astro + Tailwind CSS + daisyUI** | 独立站以内容 + 转化页为主，Astro 零 JS 静态输出成本低；Tailwind v4 `@theme` 可 1:1 承接设计令牌；daisyUI 提供 btn/card/collapse/drawer 等现成组件，减少自研 | 2026-11-11（已确认） |
| ADR-002 | Figma 接入方式采用**官方插件**而非手写 `mcp.json` | 插件自带 45 个工具的 `_meta` 与 skills，出码质量更高；手写配置每次重启需重新 OAuth | 2026-11-11 |
| ADR-003 | 修补插件 `mcp.json` 使其符合 Agent Plugins 1.0.0 schema | 官方发布版本不合规，Agent Host 会静默忽略整个配置 | 2026-11-11 |
| ADR-004 | 产品中心**不单独建页**，用「全部产品右侧抽屉」承载（待最终确认） | 设计稿中 `83:1142` 产品中心页已隐藏，同时提供了完整的抽屉交互稿 | 2026-11-11（待确认） |

---

## 5. 版本变更日志（滚动）

> 版本规则：`主.次.修订`
> - **修订**：文档/配置微调、错别字
> - **次**：完成一个任务、修复一个问题、新增文档
> - **主**：里程碑（技术栈定稿、首个页面/功能上线、正式部署）

| 版本 | 日期 | 类型 | 摘要 | 相关文档 |
| --- | --- | --- | --- | --- |
| v1.2.0 | 2026-11-11 | 次 | 技术栈定稿（Astro+Tailwind+daisyUI）；完成 Figma 设计稿全面分析，输出页面清单/令牌/组件/交互/风险与实施路线 | [design-analysis.md](design-analysis.md) |
| v1.1.0 | 2026-11-11 | 次 | 仓库重置：本地项目接管 `thatinjury2011/MENARO`，旧内容与历史全部丢弃（orphan 强推）；新增 `.gitignore` | 本文档 §5.1 |

### v1.2.0 详细内容（2026-11-11）

1. **技术栈定稿**：Astro + Tailwind CSS + daisyUI（ADR-001 转为「已确认」）。
2. **设计稿分析**（详见 [design-analysis.md](design-analysis.md)）
   - 文件 `KcSWkCBWn8kjsP42NVVlci`，2 个页面、5 个 section、约 1 万图层
   - 有效画板：桌面 18 个 + 移动 20 个，覆盖 8 类页面
   - 设计令牌 9 个颜色（`#083c30` 主色），CSS 类名体系 `mn-*`（BEM）
   - 组件库：桌面 15 类 + 移动 6 类，含 Header/Footer/Card/Input/弹窗/抽屉
   - 交互规范：8 入口全局导航、全部产品抽屉（含 5 分类 + 手风琴）、报价表单校验
   - 素材：146 处引用 / 69 个唯一图片
3. **提出 9 项风险**，其中 4 处隐藏画板 + 3 处宽度基准不一致需业务确认。| v1.0.0 | 2026-11-11 | 里程碑 | 建立项目文档体系（AGENTS.md + PROJECT_LOG + troubleshooting）；打通 Figma MCP 并完成真机验证 | [figma-mcp.md](troubleshooting/figma-mcp.md) |

### v1.1.0 详细内容（2026-11-11）

1. **备份旧仓库**（安全网，确认无误后可删）
   - `git clone --mirror` → `D:\独立站\_backup_MENARO_20261111`（3.4 MB，含全部 refs）
2. **本地初始化**
   - `git init -b main`，新增 `.gitignore`（Node/Astro/env/Vercel 全覆盖）
   - 首个提交 `38766d9 chore: initialize Menaro project`
3. **orphan 强推覆盖远端**
   - `git remote add origin https://github.com/thatinjury2011/MENARO.git`
   - `git push -f -u origin main` → `dadcbb3...38766d9 (forced update)`
   - 远端 `main` 现仅含 `.gitignore` / `AGENTS.md` / `docs/`，旧 Astro 代码与历史已移除
4. **注意**：`main` 未被保护，强推无需额外操作；该仓库接了 Vercel（`menaro-jade.vercel.app`），本次推送会触发一次部署，纯文档仓库会导致构建失败属预期。


### v1.0.0 详细内容（2026-11-11）

1. **Figma MCP 排查与修复**（详见专题文档）
   - 现象：每次重启 VS Code 都要重新 OAuth 登录；后续连工具都注册不上。
   - 根因：① Agent Host 不自动复用缓存 token（裸配置时期）；② Figma 官方插件 `mcp.json` 违反 Agent Plugins 1.0.0 schema（缺 `$schema`、`type` 应为 `streamable-http`、多处不允许的 `_meta`），被静默丢弃。
   - 结果：`figma-whoami` / `figma-list_shaders` 实测通过，重载后 token 自动转发，**无需重新授权**。
2. **建立文档体系**：`AGENTS.md` 作为入口，本文件作为全局滚动日志，`docs/troubleshooting/` 存放专题手册。

---

## 6. 任务看板

### 已完成

| 任务 | 完成日期 | 备注 |
| --- | --- | --- |
| 打通 Figma MCP | 2026-11-11 | 见 v1.0.0 |
| 建立项目文档体系 | 2026-11-11 | 见 v1.0.0 |
| `git init` 并覆盖远端仓库 | 2026-11-11 | 见 v1.1.0，旧内容已丢弃 |
| 技术栈定稿（ADR-001） | 2026-11-11 | Astro + Tailwind + daisyUI |
| Figma 设计稿分析 | 2026-11-11 | 见 v1.2.0 / [design-analysis.md](design-analysis.md) |

### 进行中

| 任务 | 状态 | 下一步 |
| --- | --- | --- |
| 设计稿隐藏画板确认 | 待业务方确认 | 4 处隐藏 + 3 处宽度基准，见 design-analysis §7 |

### 待办 / 候选

| 任务 | 优先级 | 备注 |
| --- | --- | --- |
| P0 脚手架：Astro + Tailwind v4 + daisyUI + 令牌 + Base 布局 | 高 | 见 design-analysis §8.4 |
| 批量导出 69 个设计素材 | 高 | 用 Figma MCP `download_assets` |
| 配置 Vercel 项目（当前构建会失败） | 中 | 待有业务代码后再接 |
| 完成 `vercel` MCP 授权 | 中 | 后续部署需要 |
| 确认后可删除旧仓库备份 `D:\独立站\_backup_MENARO_20261111` | 低 | 3.4 MB，纯安全网 |
| 排查 `tdx-finance` MCP 不可用 | 低 | OAuth 元数据探测失败 |
| Figma 插件自动更新后重新打 schema 补丁 | 按需 | 见 troubleshooting 文档「复发处理」 |

---

## 7. 已知风险 / 注意事项

- **Figma 插件升级会覆盖 `mcp.json`**，需要重新打 schema 补丁（文档里有一步步命令）。
- 项目尚未纳入版本控制，任何破坏性操作无法回滚。
- 用户级 MCP 配置含 `.install-staging` 下的旧路径条目（vercel 插件），若清理需同步修改 `chat.pluginLocations`。
