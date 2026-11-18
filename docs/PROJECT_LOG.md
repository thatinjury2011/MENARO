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
| ADR-004 | 产品中心**建独立目录页 `/products`**，与「全部产品右侧抽屉」共用同一套信息架构（01 建筑与装修施工材料 / 02 空间成品与定制系统 + 已上线/规划中状态） | 导航与各页「返回产品中心」都需要落点；抽屉里的目录结构本身就能直接当页面用，数据一份两用 | 2026-11-18（v1.8.0 确认） |
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
| v1.9.0 | 2026-11-18 | 次 | **其余 7 个页面落地**：项目案例 / 解决方案 / 环氧彩砂自流平地坪方案 / 全球合作 / 关于我们 / 制造与品质 / 联系我们 / 获取报价，另补 隐私政策·使用条款·网站地图；抽出 `InquiryForm`（联系与报价共用）、`ProcessSteps`、`CaseGrid`、`ApplicationGrid`、`ScenarioCards`、`ConstructionSteps`、`FeatureRow`、`FounderBlock`、`GlobalLocations`、`AdvantageBand`、`JoinBand`、`QuoteSteps`、`WhyCard`、`ContactCard`、`PartnerTypes`、`CatalogGroup`；`PageHero` 增加 `variant` 与 `brandMark` | 见本文档 §5.1 |
| v1.8.0 | 2026-11-18 | 次 | **P2 产品体系落地**：4 个系列页（美缝 / 瓷砖胶 / 密封胶 / 环氧地坪）+ 3 个产品详情页（动态路由）+ `/products` 目录页；抽出 `PageHero / Breadcrumb / InquiryCta / IntroBlock / SeriesCards / TierCards / PackagingSpecs / SupportCards / ProductShowcase / SpecCards / CatalogGroup` | 见本文档 §5.1 |
| v1.7.1 | 2026-11-18 | 执行 | 确立「**导出稿为最终版**，Figma 仅作参考」；核对发现 5 张 hero 与导出稿不一致，改用**自解释占位图**顶上（同名覆盖即可替换） | 见本文档 §7 |
| v1.7.0 | 2026-11-18 | 次 | **首页骨架落地 + P0.5 基础组件**：`Container/Button/ArrowLink/ArrowIcon/SectionHeading`；首页 9 个区块全部实现（hero→服务亮点→产品系列→更多规划→制造→应用→案例→合作伙伴→CTA）；导航/页脚按设计稿重构为浅色 | — |
| v1.6.0 | 2026-11-18 | 次 | **hero 图改为 Figma 图层导出（无文字底图）**：定位 16 个 banner 图片节点并 2x 导出 → WebP，34 MB → 3.4 MB；页面标题改由 HTML 排版，SEO/多语言打通 | `scripts/build-heroes.mjs` |
| v1.5.0 | 2026-11-18 | 次 | **素材整理完成**：266 张原始导出 → 159 个规范命名 WebP + 17 张整页参考图，58.7 MB 压到 4.4 MB；脚本化可重跑 | `scripts/build-assets.mjs` |
| v1.4.0 | 2026-11-18 | 次 | **切换 Node 26 + 升级 Astro 7**：fnm 接管版本（`.node-version` + shell 集成），移除 vite pin，依赖树收敛为单一 vite 8，构建与双端渲染复验通过 | [troubleshooting/astro-toolchain-versions.md](troubleshooting/astro-toolchain-versions.md) |
| v1.3.0 | 2026-11-18 | 次 | **P0 脚手架落地**：Astro 6 + Tailwind v4 + daisyUI 5 可跑；`--mn-*` 令牌与 `menaro` 主题接入；Base 布局 + 响应式 Header/Footer + 404 占位；记录 Astro/Vite 版本坑 | [troubleshooting/astro-toolchain-versions.md](troubleshooting/astro-toolchain-versions.md) |
| v1.2.0 | 2026-11-11 | 次 | 技术栈定稿（Astro+Tailwind+daisyUI）；完成 Figma 设计稿全面分析，输出页面清单/令牌/组件/交互/风险与实施路线 | [design-analysis.md](design-analysis.md) |
| v1.1.0 | 2026-11-11 | 次 | 仓库重置：本地项目接管 `thatinjury2011/MENARO`，旧内容与历史全部丢弃（orphan 强推）；新增 `.gitignore` | 本文档 §5.1 |
| v1.0.0 | 2026-11-11 | 里程碑 | 建立项目文档体系（AGENTS.md + PROJECT_LOG + troubleshooting）；打通 Figma MCP 并完成真机验证 | [figma-mcp.md](troubleshooting/figma-mcp.md) |

### v1.9.0 详细内容（2026-11-18）

1. **新增 8 个业务页 + 3 个基础页**（`src/pages/`）：
   - `/cases` 项目案例：3+3+1 大卡网格，7 个案例（导出稿文案）
   - `/solutions` 解决方案：4 个应用分类卡（仅「工业地坪」可跳转）+ 4 步选型流程
   - `/solutions/industrial-floor` 环氧彩砂自流平地坪：hero（`variant="wide"`）+ 产品介绍 5 项特性 + 3 张应用场景卡 + 5 步施工流程
   - `/global` 全球合作：4 类采购商合作卡 + 4 步合作流程
   - `/about` 关于我们：品牌标识 hero + 创始人（3 段 + 引言）+ 全球运营与制造布局 4 卡 + 深绿核心优势 6 卡 + 图片合作带
   - `/about/manufacturing` 制造与品质：4 张「从生产到交付」卡（`ratio="wide"`）
   - `/contact` 联系我们：左侧浅色信息卡（电话 / WhatsApp / 邮箱 / 工作时间）+ 右侧询盘表单
   - `/quote` 获取报价：hero + 3 项信任点 + 为什么选择卡 + 表单 + 询价流程
   - `/privacy`、`/terms`、`/sitemap`：页脚法务链接不再 404，网站地图按 4 组索引全部 20 条路由
2. **组件复用**：`InquiryForm` 一套支持 `contact` / `quote` 两种字段集（意向产品多选、联系人、国家/地区、邮箱、WhatsApp、公司、需求），联系与报价两页共用；`ProcessSteps` 从 solutions 提升到 `components/sections/`；`ScenarioCards` 增加 `ratio`（3:2 / 2:1）。
3. **`PageHero` 两个新能力**：
   - `variant="wide"`：照片占 65%、正文收窄到 `lg:max-w-[30vw]`，解决长文案页「文字压到照片上」的问题（1440 下正文右边界 472px、照片左边界 499px）
   - `brandMark`：标题上方渲染品牌标识（关于我们）
4. **补齐缺失素材**：工业地坪「工厂车间」配图在导出目录里没有独立文件，从整页导出图按像素安全区域裁切生成 `solutions/industrial-floor/scene-03.webp`（71,1814,568,372），脚本 `scripts/build-crops.mjs` 可复跑；`value-shield-outline` 图标补进 `build-assets.mjs` 映射。
5. **验证**：`npm run build` 通过（21 页）；20 条路由在 390 / 1440 双端均 200 且无横向溢出。

### v1.8.0 详细内容（2026-11-18）

1. **4 个产品系列页**（`src/pages/products/`）：`tile-grout`（美缝材料）、`tile-adhesive`（瓷砖胶）、`sealant`（建筑密封胶）、`floor`（环氧地坪）。文案与结构逐页对齐导出稿，四种结构各不相同：
   - 美缝：系列卡（旗舰/专业/经典）+ 包装规格表
   - 瓷砖胶：三档规格卡（BASIC / PRO / PRO MAX）
   - 密封胶：系列卡（单型号）+ 包装表
   - 环氧地坪：系列卡（包装按项目确认）+ 包装表
2. **3 个产品详情页**：`/products/[series]/[product]` 动态路由 + `src/data/product-details.ts`：
   - `/products/tile-grout/mg-700` 氢化碳环彩砂美缝剂
   - `/products/sealant/ms-786` 高级中性耐候密封胶
   - `/products/floor/epoxy-sand` 环氧彩砂自流平系统
   版式：hero → 面包屑 → 包装概念参考 + 型号/包装标签 + 「获取批发报价」→ 3 张规格卡（产品包装 / 产品应用 / 资料与定制）→ 深绿 CTA。
3. **`/products` 目录页**：按导出稿「产品目录」抽屉的信息架构落地 —— 01 建筑与装修施工材料（前 4 项「已上线」可跳转，后 2 项「规划中」）+ 02 空间成品与定制系统（6 项规划中），图标复用 `assets/icons/category-*.webp`。ADR-004 由此确定：**独立目录页 + 抽屉共用同一套数据**，不再二选一。
4. **组件分层**：`sections/`（PageHero、InquiryCta 跨页复用）、`ui/`（Breadcrumb）、`pages/products/`（IntroBlock、SeriesCards、TierCards、PackagingSpecs、SupportCards、ProductShowcase、SpecCards、CatalogGroup）。
5. **细节对齐**：
   - hero 渐变改为 `from-40% via-48% to-60%`，照片不再被大面积冲白；hero 高度 441 → 360，标题 48 → 44px。
   - 系列卡 / 规格卡补上顶部色条（灰 / 绿 / 金）与浅灰图片底，瓷砖胶三档补「基础型 / 增强型 / 高性能柔性」副标题。
6. **验证**：`npm run build` 通过（10 页）；10 条路由在 390px 下 `scrollWidth == clientWidth`（无横向溢出）；1440 与导出稿逐段比对。
7. **与导出稿的主动偏差**（记录待确认）：
   - 环氧地坪详情第 2 张卡文案，导出稿写的是「适用于相应的**瓷砖接缝**装饰与保护场景」（疑似复制粘贴），改为「适用于相应的**地坪**装饰与保护场景」。
   - 面包屑统一 3 级（首页 / 产品体系 / 当前页）；瓷砖胶导出稿是 4 级（多一层「瓷砖铺贴与美缝材料」），因分类层没有对应页面，未采用。

### v1.7.1 详细内容（2026-11-18）

1. **设计真源**：`Pc图片及图标/` 的导出（含整页截图与切片）为最终版，Figma 文件仅作参考；两者冲突以导出为准。已写入 AGENTS.md。
2. **漂移核对**：把 16 张 hero 与导出稿逐页比对，11 张一致（首页 / 案例 / 方案 / 工业地坪 / 关于 / 制造 / 全球 / 联系 / 瓷砖胶系列 / 美缝详情 / 环氧详情），5 张不一致（美缝系列 / 环氧系列 / 密封胶系列 / 密封胶详情 / 获取报价）。
3. **占位方案**：不一致的 5 张改由 `scripts/build-placeholders.mjs` 生成**自解释占位图**（斜纹底 + 「占位图 · 待替换」+ 目标路径 + 替换说明），保持尺寸与原 slot 一致，页面版式不受影响。
4. **替换路径**：拿到最终版无文字底图后覆盖同名 `hero.webp` 即可；`build-heroes.mjs` 里的 `SKIP` 列表保证重跑不会覆盖占位图。

### v1.7.0 详细内容（2026-11-18）

1. **基础组件**（`src/components/ui/`）：`Container`（1706 内容宽）、`Button`（primary/outline/white，内置箭头）、`ArrowLink`、`ArrowIcon`、`SectionHeading`。通用箭头统一内联 SVG，不占图片资源。
2. **导航按设计稿修正**：8 个入口改为 `首页 / 产品体系 / 项目案例 / 解决方案 / 全球合作 / 制造与品质 / 关于我们 / 联系我们`，右侧增加「中文」语言位 + 获取报价。
3. **页脚改为浅色**：白底 + 上级分隔线、Logo + 标语、9 条导航、4 个社交图标、`© 2026 MENARO. All Rights Reserved.` + 4 条法务链接。
4. **首页 9 个区块**（`src/components/pages/home/`）：`Hero` `ServiceHighlights` `ProductCollection` `ProductRoadmap` `Manufacturing` `Applications` `Cases` `Partners` `ContactCta`，文案全部取自 Figma 文本图层，图片全部走 `astro:assets` 多尺寸 srcset。
5. **修掉的问题**：
   - 案例大卡把按钮（`<a>`）嵌套在卡片链接（`<a>`）里，HTML 不允许 → 外层被解析器截断，按钮漂到页面顶部。改为卡片 div + 全卡覆盖链接 + `pointer-events-auto` 按钮。
   - hero 在移动端文字压在强光照片上不可读 → `bg-white/85` 移动遮罩，桌面才用左→右渐变。
   - hero logo 被 flex `stretch` 拉宽变形 → `self-start`。
6. **验证**：`npm run build` 通过（dist 1.68 MB）；1440 与 390 双端截图与设计稿逐段比对一致。
7. **待设计确认**：`项目案例` 区块副标题在设计稿中仍写作「多场景应用解决方案」（与「建筑应用方案」重复），当前按原稿保留。

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
| P1 首页骨架（9 区块）+ P0.5 基础组件 | 2026-11-18 | 见 v1.7.0 |
| P2 产品体系：4 系列页 + 3 详情页 + 目录页 | 2026-11-18 | 见 v1.8.0 |
| P3 其余页面：案例 / 方案 / 工业地坪 / 全球 / 关于 / 制造 / 联系 / 报价 + 法务 3 页 | 2026-11-18 | 见 v1.9.0 |

### 进行中

| 任务 | 状态 | 下一步 |
| --- | --- | --- |
| 全站逐页双端像素校对 | 进行中 | 页面结构已全量落地，剩余间距/字号微调 |
| 设计稿隐藏画板确认 | 待业务方确认 | 4 处隐藏 + 3 处宽度基准，见 design-analysis §7 |

### 待办 / 候选

| 任务 | 优先级 | 备注 |
| --- | --- | --- |
| 替换 5 张 hero 占位图 | 高 | 美缝系列 / 环氧系列 / 密封胶系列 / 密封胶详情 / 获取报价 |
| 询盘表单接后端 | 高 | 当前表单为静态 HTML（`action="#"`），需接 API 或第三方表单服务 |
| 多语言（中文 / EN） | 中 | 头部语言位目前是占位按钮 |
| 产品中心抽屉（全部产品） | 中 | 目录页已完成，抽屉可复用同一套 `CatalogGroup` 数据 |
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
- **hero 占位图（待替换）**：`products/tile-grout`、`products/floor`、`products/sealant`、`products/detail-sealant`、`quote` 五处 hero 当前是**斜纹占位图**（图上写明「占位图 · 待替换」+ 目标路径）。
  - 原因：Figma 在导出后改版，这 5 张与导出稿内容不一致；而导出稿里只有带文字的整图，没有独立照片图层。
  - 替换方式：拿到最终版无文字底图后，**直接覆盖同名 `src/assets/.../hero.webp`**，无需改代码；`scripts/build-heroes.mjs` 已把这几项列入 `SKIP`，重跑管线不会把旧图刷回来。
- **Banner 文案**（已解决）：原以为文字烘焙进图，实为整页截图导致；v1.6.0 已改为按图层导出无文字底图，文案走 HTML。
- **`Pc图片及图标/` 132 MB 素材未纳入版本控制**，含大量以 `2.png`、`Group 44.png` 命名的原始导出与整页截图，直接提交会让仓库膨胀。
- 项目尚未纳入版本控制，任何破坏性操作无法回滚。
- 用户级 MCP 配置含 `.install-staging` 下的旧路径条目（vercel 插件），若清理需同步修改 `chat.pluginLocations`。
