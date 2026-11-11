# Menaro 项目全局日志（滚动版）

> **文档版本**：v1.0.0 ｜ **最后更新**：2026-11-11 ｜ **维护者**：bo li
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
| 代码仓库 | 尚未 `git init`（非 Git 仓库） |
| 当前阶段 | 起步期 —— 仅有工具链配置，无业务代码 |
| 技术栈 | 待定（候选：Astro + Tailwind + daisyUI，见 §4 ADR-001） |

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
| ADR-001 | 技术栈倾向 Astro + Tailwind + daisyUI | 已装对应 MCP / 扩展；独立站以内容 + 转化页面为主，Astro 静态输出成本低 | 2026-11-11（待确认） |
| ADR-002 | Figma 接入方式采用**官方插件**而非手写 `mcp.json` | 插件自带 45 个工具的 `_meta` 与 skills，出码质量更高；手写配置每次重启需重新 OAuth | 2026-11-11 |
| ADR-003 | 修补插件 `mcp.json` 使其符合 Agent Plugins 1.0.0 schema | 官方发布版本不合规，Agent Host 会静默忽略整个配置 | 2026-11-11 |

---

## 5. 版本变更日志（滚动）

> 版本规则：`主.次.修订`
> - **修订**：文档/配置微调、错别字
> - **次**：完成一个任务、修复一个问题、新增文档
> - **主**：里程碑（技术栈定稿、首个页面/功能上线、正式部署）

| 版本 | 日期 | 类型 | 摘要 | 相关文档 |
| --- | --- | --- | --- | --- |
| v1.0.0 | 2026-11-11 | 里程碑 | 建立项目文档体系（AGENTS.md + PROJECT_LOG + troubleshooting）；打通 Figma MCP 并完成真机验证 | [figma-mcp.md](troubleshooting/figma-mcp.md) |

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

### 进行中

| 任务 | 状态 | 下一步 |
| --- | --- | --- |
| —— | —— | —— |

### 待办 / 候选

| 任务 | 优先级 | 备注 |
| --- | --- | --- |
| 技术栈定稿（ADR-001） | 高 | 确认 Astro + Tailwind + daisyUI 是否采用 |
| `git init` 并建立首次提交 | 高 | 当前目录非 Git 仓库，无法回溯 |
| 完成 `vercel` MCP 授权 | 中 | 后续部署需要 |
| 排查 `tdx-finance` MCP 不可用 | 低 | OAuth 元数据探测失败 |
| Figma 插件自动更新后重新打 schema 补丁 | 按需 | 见 troubleshooting 文档「复发处理」 |

---

## 7. 已知风险 / 注意事项

- **Figma 插件升级会覆盖 `mcp.json`**，需要重新打 schema 补丁（文档里有一步步命令）。
- 项目尚未纳入版本控制，任何破坏性操作无法回滚。
- 用户级 MCP 配置含 `.install-staging` 下的旧路径条目（vercel 插件），若清理需同步修改 `chat.pluginLocations`。
