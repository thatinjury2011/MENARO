# Menaro 项目全局日志（滚动版）

> **文档版本**：v1.4.0 ｜ **最后更新**：2026-11-18 ｜ **维护者**：bo li
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
| 当前阶段 | 脚手架阶段 —— Astro 骨架可跑（Header/Footer/令牌就绪），业务页面待 P1 起实现 |
| 技术栈 | **Astro 7 + Tailwind CSS v4 + daisyUI 5**（已定稿，见 ADR-001） |

---

## 2. 环境快照

| 组件 | 版本 |
| --- | --- |
| OS | Windows 11 (x64) |
| VS Code | 1.145.3 |
| Node.js | v26.13.1（fnm 管理，项目 `.node-version` 锁定） |
| npm | 11.20.0 |
| git | 2.49.0.windows.1 |
| Python | 3.13.7 |

> ⚠️ **Node 版本约束**：Astro 7 要求 Node `>=22.23.4`。当前用 fnm 提供 26.13.1，系统级 `C:\Program Files\nodejs` 仍是 22.20.0，**只有加载了 fnm 的 shell 才是 26**。详见 [troubleshooting/astro-toolchain-versions.md](troubleshooting/astro-toolchain-versions.md)。

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
| ADR-005 | 样式一律**优先 Tailwind utility + daisyUI 组件**；设计稿给的 `.mn-*` 自定义类只做等价替换，仅在 Tailwind 无法表达时才保留自命名类 | 减少自研 CSS 维护成本，令牌与主题集中在 `@theme` | 2026-11-18（已确认） |
| ADR-006 | 图片统一 **WebP** 入 `src/assets`，PNG 只作为原始素材留存 | 压缩率约 92%，且 Astro `<Image>` 仍需源图做多尺寸派生 | 2026-11-18（已确认） |

---

## 5. 版本变更日志（滚动）

> 版本规则：`主.次.修订`
> - **修订**：文档/配置微调、错别字
> - **次**：完成一个任务、修复一个问题、新增文档
> - **主**：里程碑（技术栈定稿、首个页面/功能上线、正式部署）

| 版本 | 日期 | 类型 | 摘要 | 相关文档 |
| --- | --- | --- | --- | --- |
| v1.6.0 | 2026-11-18 | 次 | **hero 图改为 Figma 图层导出（无文字底图）**：定位 16 个 banner 图片节点并 2x 导出 → WebP，34 MB → 3.4 MB；页面标题改由 HTML 排版，SEO/多语言打通 | `scripts/build-heroes.mjs` |
| v1.5.0 | 2026-11-18 | 次 | **素材整理完成**：266 张原始导出 → 159 个规范命名 WebP + 17 张整页参考图，58.7 MB 压到 4.4 MB；脚本化可重跑 | `scripts/build-assets.mjs` |
| v1.4.0 | 2026-11-18 | 次 | **切换 Node 26 + 升级 Astro 7**：fnm 接管版本（`.node-version` + shell 集成），移除 vite pin，依赖树收敛为单一 vite 8，构建与双端渲染复验通过 | [troubleshooting/astro-toolchain-versions.md](troubleshooting/astro-toolchain-versions.md) |
| v1.3.0 | 2026-11-18 | 次 | **P0 脚手架落地**：Astro 6 + Tailwind v4 + daisyUI 5 可跑；`--mn-*` 令牌与 `menaro` 主题接入；Base 布局 + 响应式 Header/Footer + 404 占位；记录 Astro/Vite 版本坑 | [troubleshooting/astro-toolchain-versions.md](troubleshooting/astro-toolchain-versions.md) |
| v1.2.0 | 2026-11-11 | 次 | 技术栈定稿（Astro+Tailwind+daisyUI）；完成 Figma 设计稿全面分析，输出页面清单/令牌/组件/交互/风险与实施路线 | [design-analysis.md](design-analysis.md) |
| v1.1.0 | 2026-11-11 | 次 | 仓库重置：本地项目接管 `thatinjury2011/MENARO`，旧内容与历史全部丢弃（orphan 强推）；新增 `.gitignore` | 本文档 §5.1 |
| v1.0.0 | 2026-11-11 | 里程碑 | 建立项目文档体系（AGENTS.md + PROJECT_LOG + troubleshooting）；打通 Figma MCP 并完成真机验证 | [figma-mcp.md](troubleshooting/figma-mcp.md) |

### v1.6.0 详细内容（2026-11-18）

1. **根因纠正**：设计稿里 banner = 照片图层 + 渐隐遮罩 + 独立 `text` 节点，**文字从未烘焙进图片**；此前看到的文字来自「整页截图」而非分图层导出。因此无需向设计索要底图，可直接从 Figma 导出。
2. **16 个 hero 图片节点**（`download_assets` 2x，2880 画板按 1.333x 对齐 3840 宽）：

   | 资源 | 节点 | 资源 | 节点 |
   | --- | --- | --- | --- |
   | home | `413:3438` | products/tile-grout | `8:100` |
   | cases | `83:1266` | products/tile-adhesive | `249:3202` |
   | solutions/index | `83:1364` | products/sealant | `45:765` |
   | solutions/industrial-floor | `206:2576` | products/floor | `45:959` |
   | about | `83:1567` | products/detail-tile-grout | `45:652` |
   | about/manufacturing | `45:1326` | products/detail-sealant | `45:867` |
   | global | `83:1467` | products/detail-floor | `45:1062` |
   | contact | `85:2294` | quote | `83:1819` |

3. **版式要点**：1920 宽页面是「全宽照片 + 左侧 18% 渐隐」；2880 系列/详情页照片只占右半边（1900 或 874 宽），左侧为背景色 + 渐隐，实现时用 CSS 渐变叠加，文字全部走 HTML。
4. **异常处理**：`8:100`、`45:652` 节点导出为空白（149 B），回退使用 `rawImages` 原始上传图；其中 `45:652` 原图 1900×932 与设计框 1900×712 不符，按 `fit: cover` 居中裁切。
5. **结果**：34.0 MB → 3.38 MB，16 张全部校验为合法 WebP；脚本 `scripts/build-heroes.mjs`，源图在 `design/figma-hero/`（gitignored）。

### v1.5.0 详细内容（2026-11-18）

1. **命名规范**：`src/assets/<页面或模块>/<区块>-<序号>.webp`，全小写 kebab-case，无中文、无空格、无 `Group 44` / `2.png` 这类原始名。
2. **目录**：`brand` `icons` `home` `products/{tile-grout,tile-adhesive,sealant,floor,detail-*}` `cases` `solutions/{index,industrial-floor}` `about` `global` `contact` `quote` `drawer`。
3. **去重**：44 个完全重复文件（同一个 40×40 箭头出现 12 次）+ 47 个 hover 态/重复帧未入库；`12–48px` 的通用 UI 字形（箭头、chevron、关闭、对勾、时钟）改由内联 SVG 实现，不占用图片资源。
4. **格式**：全部 PNG → WebP（q82，保留 alpha），站点资源 **58.7 MB → 4.4 MB**；整页截图单独放 `design/reference/pages/`（1920 宽，66.4 MB → 5.1 MB）。
5. **可重跑**：`node scripts/build-assets.mjs` 依据映射表重新生成，映射表即文档。
6. **待确认问题（已定）**：banner 类图片把标题/副标题/小标签**烘焙进了图里** → 决策：向设计索取**无文字底图**，标题文案用 HTML 排版（利于 SEO 与多语言）；底图到位前，相关区块用 CSS 渐变/遮罩占位。

### v1.4.0 详细内容（2026-11-18）

1. **Node 切换**：fnm 1.39.0 提供 v26.13.1（`default` 别名），新增 `.node-version` 锁定项目版本；`Documents\WindowsPowerShell\profile.ps1` 写入 `fnm env --use-on-cd`，新终端自动生效。
2. **升级 Astro 7**：`astro@7.4.12`，删除 Astro 6 时期的 `vite@^7` 手动 pin，`package.json` 增加 `engines.node: ">=22.23.4"`；`npm ls vite` 只剩 Astro 自带的 `vite@8.3.8`。
3. **复验**：`npm run build` 通过（2 页、零警告），`npm run dev` 下桌面 1440 / 移动 390 渲染与升级前一致，产物 CSS 66.1 KB、令牌与 `data-theme=menaro` 均在。
4. **遗留**：系统级 Node 22 未卸载，cmd / Git Bash / 未加载 profile 的进程仍拿到 22.20.0，跑 Astro 7 会报错。

### v1.3.0 详细内容（2026-11-18）

1. **依赖**：`astro@6.4.8` + `tailwindcss@4.3.5` + `@tailwindcss/vite@4.3.5` + `daisyui@5.8.1`，并显式锁 `vite@7.3.8`（原因见 troubleshooting 文档）；`tsconfig.json` 继承 `astro/tsconfigs/strict`。
2. **样式层** `src/styles/global.css`
   - daisyUI 自定义主题 `menaro`（`themes: false` 关闭内置主题），9 色映射到 `primary/base-100/200/300/secondary` 等语义色
   - `@theme` 暴露 `--color-mn-*` 令牌，可直接写 `bg-mn-green`、`text-mn-muted`
   - `:focus-visible` 统一金色外发光 `#b6a36a`
3. **布局与组件**
   - `src/layouts/Base.astro`：SEO meta、canonical、OG、跳到主要内容
   - `Header.astro`：桌面 116px 粘性导航（7 项 + 报价 CTA，hover 下划线动画 + `aria-current` 当前页），移动端 `<details>` 下拉菜单
   - `Footer.astro`：深绿底 + 白色 Logo + 双列链接 + 版权
   - `src/data/site.ts`：导航与站点元信息单一数据源
   - 页面：`/`（占位）、`/404`
4. **素材**：从 `Pc图片及图标` 取品牌 Logo；原「白色横版标志」实为绿色导出件，已重着色为真正的白色版（`public/brand/logo-white.png`）。
5. **验证**：`npm run build` 通过；桌面 1440 / 移动 390 截图核对；产物零 JS，CSS 66 KB。

### v1.2.0 详细内容（2026-11-11）

1. **技术栈定稿**：Astro + Tailwind CSS + daisyUI（ADR-001 转为「已确认」）。
2. **设计稿分析**（详见 [design-analysis.md](design-analysis.md)）
   - 文件 `KcSWkCBWn8kjsP42NVVlci`，2 个页面、5 个 section、约 1 万图层
   - 有效画板：桌面 18 个 + 移动 20 个，覆盖 8 类页面
   - 设计令牌 9 个颜色（`#083c30` 主色），CSS 类名体系 `mn-*`（BEM）
   - 组件库：桌面 15 类 + 移动 6 类，含 Header/Footer/Card/Input/弹窗/抽屉
   - 交互规范：8 入口全局导航、全部产品抽屉（含 5 分类 + 手风琴）、报价表单校验
   - 素材：146 处引用 / 69 个唯一图片
3. **提出 9 项风险**，其中 4 处隐藏画板 + 3 处宽度基准不一致需业务确认。

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
| P0 脚手架：Astro + Tailwind v4 + daisyUI + 令牌 + Base 布局 + Header/Footer | 2026-11-18 | 见 v1.3.0 |
| 切换 Node 26 + 升级 Astro 7 | 2026-11-18 | 见 v1.4.0 |
| 设计素材整理与 WebP 化 | 2026-11-18 | 见 v1.5.0 |
| 从 Figma 导出无文字 hero 图 | 2026-11-18 | 见 v1.6.0 |

### 进行中

| 任务 | 状态 | 下一步 |
| --- | --- | --- |
| 设计稿隐藏画板确认 | 待业务方确认 | 4 处隐藏 + 3 处宽度基准，见 design-analysis §7 |

### 待办 / 候选

| 任务 | 优先级 | 备注 |
| --- | --- | --- |
| P1 首页（01）双端还原 | 高 | 见 design-analysis §8.4 |
| 批量导出 69 个设计素材 | — | 已由 v1.5.0 本地整理替代；如设计更新需重新导出，复用 `scripts/build-assets.mjs` 映射 |
| 配置 Vercel 项目（当前构建会失败） | 中 | 待有业务代码后再接 |
| 完成 `vercel` MCP 授权 | 中 | 后续部署需要 |
| 确认后可删除旧仓库备份 `D:\独立站\_backup_MENARO_20261111` | 低 | 3.4 MB，纯安全网 |
| 排查 `tdx-finance` MCP 不可用 | 低 | OAuth 元数据探测失败 |
| Figma 插件自动更新后重新打 schema 补丁 | 按需 | 见 troubleshooting 文档「复发处理」 |

---

## 7. 已知风险 / 注意事项

- **Figma 插件升级会覆盖 `mcp.json`**，需要重新打 schema 补丁（文档里有一步步命令）。
- **Node 双版本并存**：fnm 已在 PowerShell 终端生效（26.13.1），但系统级 `C:\Program Files\nodejs` 仍是 22.20.0；cmd / Git Bash / 未加载 profile 的进程跑 Astro 7 会直接报错。彻底规避需卸载 Node 22，见 [troubleshooting/astro-toolchain-versions.md](troubleshooting/astro-toolchain-versions.md)。
- **Banner 文案**（已解决）：原以为文字烘焙进图，实为整页截图导致；v1.6.0 已改为按图层导出无文字底图，文案走 HTML。
- **`Pc图片及图标/` 132 MB 素材未纳入版本控制**，含大量以 `2.png`、`Group 44.png` 命名的原始导出与整页截图，直接提交会让仓库膨胀。
- 项目尚未纳入版本控制，任何破坏性操作无法回滚。
- 用户级 MCP 配置含 `.install-staging` 下的旧路径条目（vercel 插件），若清理需同步修改 `chat.pluginLocations`。
