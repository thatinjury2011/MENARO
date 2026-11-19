# Menaro 项目全局日志（滚动版）

> **文档版本**：v1.11.15 ｜ **最后更新**：2026-11-19 ｜ **维护者**：bo li
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
| 当前阶段 | **首页逐页像素校对**（40 条路由已全量落地，进入逐页视觉校对与细节修正） |
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
| v1.11.15 | 2026-11-19 | 次 | **首页「美缝与填缝材料」卡片换 2x 高清版**：`src/assets/home/collection-tile-grout.webp` 由 408×250（22 KB）换成 1632×1000（272 KB，源 3318×2022 裁到卡片比例 1.632 后降采样）；`ProductCollection` 的 srcset 改为按图分别给（美缝 `[480,960,1640]`，其余 3 张仍 `[408,816]`），DPR1 取 480w、DPR2 取 960w；其余 3 张卡片未动 | 本文档 §5.1 |
| v1.11.14 | 2026-11-19 | 次 | **美缝系列「瓷砖美缝与接缝保护」配图换 2x 高清版**：`src/assets/products/tile-grout/intro.webp` 由 1186×820（71 KB）换成 2318×1604（273 KB，源图 2318×2896 裁到 1.445 版式比例、内容上下各留 143/142px）；`IntroBlock` 新增 `imageWidths` 参数、`SeriesPage` 仅对 tile-grout 传 `[600,900,1186,1642,2318]`，DPR2 下浏览器取 2318w 真正 2x；其它 3 个系列与其余图片未动 | 本文档 §5.1 |
| v1.11.13 | 2026-11-19 | 次 | **页头「产品体系」改为触发全部产品抽屉**：新增 `site/ProductDrawer.astro`（右侧 800 宽抽屉 + `rgba(1,54,45,.53)` 遮罩、130 高页头、2 个 744×110 分类条、12 行 700×78 目录、744×116 合作卡）与 `src/data/product-drawer.ts` 双语目录数据；`Header` 导航项由 `<a>` 改 `<button>`（`aria-expanded` / `aria-controls`，手机端菜单仍指向 `/products`）；12 个分类图标 + 邮件/电话/合作图标入 `src/assets/drawer/`；Esc / 遮罩 / 关闭按钮三种关闭方式 + 焦点管理 | [design-analysis §5.2](design-analysis.md) |
| v1.11.12 | 2026-11-19 | 次 | **询价流程步骤块改为弹性分配**：4 个步骤按内容自适应宽度 + `mx-auto` 箭头居中，块间由 0 拉开到 81px（中文）/ 66px（英文）；英文文案更长，额外用 `lg:max-w-[286px]` 换行来腾出间距 | [design-analysis §3.5](design-analysis.md) |
| v1.11.11 | 2026-11-19 | 次 | **获取报价页逐页校对**：新增页级 `QuoteHero`（整幅 616、标题 64/93、2 行说明 + 72×3 短装饰线 + 首屏 3 优势「图标 39 + 18/20 双行 + 竖分隔线」，**无 CTA 按钮**）与 `QuoteForm`（标签 18 + 输入框 58 带前置图标 `#cfd3cd` 边框、意向产品 54 高标题条 + 「规划中」药丸、提交按钮 1046×67 全宽 + →）；`WhyCard` 重做为「图 471×556 + 降绿渐变 + 36/42 两行标题 + 4 条 24px 白勾」；`QuoteSteps` 重做为 `#f6f6f4` 235 高的「左标题 49/71 + 竖分隔线 + 4 步 45px 图标 + ›」；页脚复用深绿变体；删除已无引用的 `InquiryForm` | [design-analysis §3.5](design-analysis.md) |
| v1.11.10 | 2026-11-19 | 次 | **联系我们页逐页校对**：新增页级 `ContactHero`（整幅 402 高、标题 75/102、眉标 19/32、说明 23/38、**无 CTA 按钮**）与 `ContactForm`（意向产品分组带浅绿标题条、无「规划中」标签、字段 20.5/57 高、提交按钮 275×75 + ↗）；`ContactCard` 改浅绿卡 `#edf4ef` + 图 705×423 + 分隔线 + 5 行 61px 圆形图标；两栏改 793 / 28 / 885；新增**深绿页脚变体**（`Footer theme="dark"` + `Base footerTheme`，含白色社交图标）；面包屑加 `width`/`space` 参数；询盘表单文案抽到 `src/data/inquiry-form.ts` 共用 | [design-analysis §3.5](design-analysis.md) |
| v1.11.9 | 2026-11-19 | 次 | **关于我们页逐页校对**：品牌标识改用 Figma 横版 lockup（323×58，原为堆叠版 + 灰 tagline）；Hero 标题 64/93、正文 3 行手排断行、主按钮 248×81；创始人区块改 **749 / 80 / 838** 三栏（文字列右溢 24px 以复现设计断行）、标题 46/69、副标题 29/42、正文 18/41.7、引言卡 826×148 `#f6f7f3` + 导出稿引号图；全球布局 4 卡 404×332 + 图标与文案缩进 92、核心优势 6 卡 265×215 `#b1c5ba` 描边 + 手排断行；JoinBand 文字改深绿去蒙版、标题 56/84；修正卡片图标顺序（台州=定位、安徽=厂房）与文案（配套→配备、解决方案→产品方案） | [design-analysis §3.5](design-analysis.md) |
| v1.11.8 | 2026-11-19 | 次 | **全球合作页逐页校对**：合作卡改 **540×182 白底 + `#dddddd` 1px 直角边框**、3 列间距 17、标题 27/39、说明 18/27、内边距 左50/上51；区块底色白、区块间距 68/106；修复 `scrim="strong"` 在移动端导致文字压图不可读；三处区块「右侧说明」改为与标题底部对齐（-18px）| [design-analysis §3.5](design-analysis.md) |
| v1.11.7 | 2026-11-19 | 次 | **内页眉标加粗改色 + Hero 次按钮状态修正**：所有眉标（Hero 18/27、区块 16/24）改 `font-bold` + `text-mn-ink`（原为灰色常规字重）；outline 按钮改为**白底 + `#708a7d` 描边 + `#083c30` 绿字 20px / px30**，次按钮 229×81、两键间距 18；页头报价按钮改 `min-w-[130px]` 避免英文换行 | [design-analysis §3.5](design-analysis.md) |
| v1.11.6 | 2026-11-19 | 次 | **解决方案页逐页校对**：应用分类卡 404×350/间距 12/标题 26-39/白色 ↗24；服务流程卡 404×137 白底、序号与标题同行 18px、说明 16px；区块底色 `#f6f6f4`；标题块间距/内边距按节点还原。**附带修复 `ArrowIcon` 不认 `className`**（全站箭头尺寸与白色一直没生效） | [design-analysis §3.5](design-analysis.md) |
| v1.11.5 | 2026-11-19 | 次 | **项目案例页逐页校对**：内页内容区改为 1652（新增 `Container width="narrow"`）；PageHero 改为整幅 banner + 左侧渐隐、标题 63/91、按钮 219×81；案例卡 536×462/间距 23/标题 34-51/分类 20-30；CTA band 高 285、按钮 240×70；面包屑 18px 去下边框 | [design-analysis §3.4–3.5](design-analysis.md) |
| v1.11.4 | 2026-11-19 | 次 | **Hero 白色过渡定位并修正**：叠加的 `lg:bg-linear-to-r from-white via-white/75` 才是「白过头」的原因（原图亮度与设计稿一致），已移除桌面端叠加层，仅保留移动端 `bg-white/85`；40% 处亮度 241 → 187（设计 187） | 见本文档 §5.1 |
| v1.11.3 | 2026-11-19 | 次 | **首页「制造与品质」重做**：4 张卡改为**白底卡**（图 415×249 + 白卡内 20/30 粗体标题与 16/26 灰副标题，卡间距 16px、无圆角），区块底色改 `#f6f6f2`；底部双栏改为**两种深绿**（左 `#083c30` / 右 `#184e43`，间距 6px），栏内 16px 标签 + 26/38 粗体标题 + 16/26 说明 | [design-analysis §3.1](design-analysis.md) |
| v1.11.2 | 2026-11-19 | 次 | **首页字号/尺寸全面对齐 + 页头修复**：区块标题 48/70、副标题 18/27、卡片标题 20/30 描述 14/22 圆钮 42px、CTA 带标题 38/56、文字链接 18px bold（查看全部产品 22px 带 ↗）；页头 Logo 放大到 82px、导航 16px bold/44px 间距、报价按钮补箭头并锁定 130×54；Hero 换 Figma 导出的横版 lockup、副标题 29px、正文 17/38 | [design-analysis §3.4](design-analysis.md) |
| v1.11.1 | 2026-11-19 | 次 | **首页文字配色校正 + 页脚 Logo 换版**：页脚改用横版标志 `logo-horizontal.png`（270×55，`#083c30`），底色 `#fbfaf6`，导航/法务改 `#6c766e`；新增 `mn-desc`(#7d8c84)、`mn-cta`(#00372d) 两个令牌并纠正 `mn-muted`(#718178→#6c766e)；卡片标题改品牌绿、CTA 圆钮改 `#00372d` | [design-analysis §3.1](design-analysis.md) |
| v1.11.0 | 2026-11-19 | 次 | **首页逐页像素校对（第 1 轮）**：修复内容区宽度（1706 → 实际渲染仅 1626，Container 内边距吃掉了 max-width）；产品系列卡片改为真间隔 24px + 浅底 `mn-paper` + 实心绿箭头；更多产品规划改用 `roadmap.webp` 底图 + 3 张独立白卡（379:379:864）；建筑应用方案小字改左对齐三段式并恢复设计的两行断行 | 见本文档 §5.1 |
| v1.10.1 | 2026-11-19 | 修订 | **修复 PowerShell profile 路径**：fnm 初始化此前写入未被加载的 `profile.ps1`，导致新终端仍用系统 Node 22.20.0；改写入 `Microsoft.PowerShell_profile.ps1` 后 `node -v` 为 v26.13.1，dev 服务 (4321) 验证通过 | [troubleshooting/astro-toolchain-versions.md](troubleshooting/astro-toolchain-versions.md) |
| v1.10.0 | 2026-11-18 | 次 | **中英双语上线**：`/` 为中文、`/en` 为英文，40 条路由（20×2）；新增 `src/i18n/`（config / utils / ui / home / series）与 12 个双语页面组件，页头语言切换按当前路径互跳，`<html lang>`、`hreflang`、og:locale 随语言切换 | 见本文档 §5.1 |
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

### v1.11.15 详细内容（2026-11-19）

首页「产品系列 · 美缝与填缝材料」卡片配图换成 2x 高清版（用户提供 `A1.webp`，3318×2022）。

1. **素材处理**：源图比例 1.641，卡片固定 `aspect-[408/250]`=1.632，左右各裁 9px 后降到 **1632×1000** 入库（WebP q88，272 KB；原 408×250 / 22 KB）。裁切参数：`extract({left:9,top:0,width:3300,height:2022}).resize(1632,1000)`。
2. **响应式**：`ProductCollection` 的 `widths` 从统一 `[408,816]` 改为**按图给**：美缝 `[480,960,1640]`，其余 3 张保持 `[408,816]`。为什么要 480 而不是 409：`sizes="(min-width:1024px) 25vw"` 在 1920 下算出来是 **480**，之前给 410/820 会让浏览器在 DPR1 取 820、DPR2 取 1632（浪费一条带宽）；对齐 480 后实测 DPR1→480w、DPR2→960w。
3. **构图核对**：把设计稿 `home.webp` 的卡片图（x106–514 / y1243–1492）与新图、旧图并排比对，三者构图基本一致，新图罐体略大（约 10%），在 409px 卡片上几乎看不出差异。
4. **验证**：`npm run build` 42 页；1920 无横向溢出；卡片渲染 409×250 不变；英文首页同组件同步生效。
5. **注意**：另 3 张卡片仍是 408 宽原图，DPR2 下会取 408（略糊）——属既有状态，等对应 2x 素材到齐再一起换。

### v1.11.14 详细内容（2026-11-19）

美缝系列页「瓷砖美缝与接缝保护」左侧配图换成 2x 高清版（用户提供的 `desktop-04-photo-1.png`，2318×2896）。

1. **素材处理**：源图整幅是**竖构图带大量空白**（内容 y947–2266、x121–2203），直接入库会把 section 撑成竖版。按原版式比例 2318×1604（1.445）裁切，内容上下留白 143 / 142px 居中 → `src/assets/products/tile-grout/intro.webp`（WebP q88，273 KB；原 1186×820 / 71 KB）。裁切参数：`extract({left:0,top:804,width:2318,height:1604})`。
2. **响应式**：`IntroBlock` 增加可选 `imageWidths`（默认仍是 `[600,900,1186]`，另 3 个系列不受影响）；`SeriesPage` 仅对 `tile-grout` 传 `[600,900,1186,1642,2318]`。实测 DPR1 取 1186w、DPR2 取 2318w，卡片渲染 821×568 不变（aspect 1.445）。
3. **验证**：`npm run build` 42 页通过；1920 无横向溢出；`/products/tile-grout` 与 `/en/products/tile-grout` 共用同一组件。
4. **⚠️ 待业务方确认**：新 2x 素材的构图比原图更「满」——内容占画幅高度 82%（原 60.6%）、罐体本身也比原图高约 28%，所以换图后罐子视觉上比之前大约 10%，底部货架只露一条。若要与原视觉重量一致，两条路：一是用脚本给背景补边距（可合成近白渐变），二是重新导出**四周留白更多**的 2x 素材；当前先按「直接用素材」上线，未做补边。

### v1.11.13 详细内容（2026-11-19）

页头「产品体系」触发的全部产品抽屉。导出稿 `Pc图片及图标/首页 _ 全部产品弹窗（展开状态）/全部产品弹窗（展开状态）.png`（1920×1572）。

1. **触发导航（`Header.astro`）**：导航项按 `href === '/products'` 渲染成 `<button data-drawer-open aria-expanded aria-controls="product-drawer">`，样式与其它导航项共用 `navItemClass`（hover 下划线不变）；`<ProductDrawer />` 放在 `</header>` **之后**——header 有 `backdrop-blur`，会成为 `position: fixed` 的包含块，放里面抽屉会被裁成 header 大小。手机端菜单（`lg:hidden`）仍指向 `/products`。
2. **抽屉本体（新增 `components/site/ProductDrawer.astro`）**：
   - 根节点 `fixed inset-0 z-[60]`（盖住 sticky header 的 z-50），遮罩 `bg-[#01362d]/[0.53]` 淡入；面板 `w-full max-w-[800px]` 右贴边、`translate-x-full → 0`（0.3s）
   - 页头 130 高：logo **270×55**（`/brand/logo-horizontal.png`，此前只被页脚用过）+ 1×51 竖线 + 「产品目录」**23/32 Bold** + 关闭 30×30；关闭按钮 `mr-[20px]` 让右缘落在 1872（导出稿位置）
   - 内容区 `px-[28px] pb-[58px]`（高度算下来正好 1572，不出滚动条）；分类条 744×110 圆角 10 + 底图；目录行 700×78（`mx-[22px]`，图标 48 → 16 → 1×28 竖线 → 32 → 文案，右侧药丸 + chevron 46）；合作卡 744×116 `#edf3ee`
3. **数据（新增 `src/data/product-drawer.ts`）**：zh/en 两组 × 6 条，字段 `icon / name / meta / href / planned`；已上线 4 条指向 `/products/{tile-grout,tile-adhesive,sealant,floor}`，规划中 8 条指向 `/contact`（按 PDF「导航里点击没有页面的 → 联系我们」）；合作卡含 `mailto:info@menarobm.com`、`tel:+8657688539555`。
4. **素材**：`scripts/build-assets.mjs` 的「产品抽屉」段补 15 条映射 → `src/assets/drawer/`（12 个 48px 分类图标 + collab + contact-email/phone，原 `category-title` / `category-bg` 保留）；箭头 / × / 对勾 / 时钟按项目约定用内联 SVG。
   - **顺带修掉一个陷阱**：这个脚本的 `ENTRIES` 里还留着 16 条 `*/hero` 映射，整表重跑会把 `build-heroes.mjs` 导出的**无文字图层图覆盖成整幅 banner（文字烘焙进去）**——本次就误覆盖过一次，已从 git 恢复。现已加守卫 `isHeroDest()`：目标以 `/hero` 结尾直接跳过并打印 `SKIP hero 16 个`。
5. **交互**：点击触发按钮开合；关闭 = 关闭按钮 / 点遮罩 / Esc；打开时 `body` 锁滚动、焦点移到关闭按钮、Tab 在面板内循环，关闭后焦点回到触发按钮；300ms 后隐藏（用 `isOpen` 标记避免快速开合被旧定时器关掉）。
6. **多语言**：英文分类说明更长 → 说明列 `max-w-[440px]` + 分类条 `py-[12px]`（中文保持 110 高）、行高用 `min-h` 自适应；英文合作卡标题缩短为「More products & manufacturing」避免标题折三行。
7. **验证**：`npm run build` 42 页；CDP 实测（1920）面板 1120/800、logo 1148,38、分类条 130、目录 271、卡 1398、内容高 1442 = 视口 1572 − 页头 130；与导出稿逐段文字墨迹比对：行标题 1278–1408 vs 1277–1408、说明 1308–1673 vs 1305–1671、分类标题 1308–1529 vs 1306–1527、合作卡标题 1264–1467 vs 1261–1465（竖向误差 ≤2px）；1024→1920 五档 × zh/en 双语言无额外溢出（1600 宽页头 9px / 40px 溢出为**既有问题**，A/B 换成 `<a>` 后数值相同）。
8. **遗留**：导出稿的分类序号是细衬线（约 63×45），系统 `Times New Roman` 同高时宽 54——不引入 webfont 的前提下保留高度一致、宽度略窄。

### v1.11.11 详细内容（2026-11-19）

获取报价（Figma `83:1778`，导出稿 `design/reference/pages/quote.webp` 1920×2402）。

1. **Hero（新增 `components/pages/quote/QuoteHero.astro`）**：整幅 616 高，**无 CTA 按钮**。
   - 眉标 18/27 → 标题 **64/93**（mt 36）→ 说明 **18/41** 两行手排（mt 15，最大宽 560）
   - **72×3 深绿短装饰线** `#093929`（mt 26）
   - 首屏 3 优势：图标 **39** + 标题/描述 **18/20** 双行（设计两个文本层仅隔 20px）+ **1×22 竖分隔线** `#c9cfc9`；列宽 72、间距 60（实测 4px 偏移后加 `pl-[4px]` 对齐设计的 138/331/524）
   - 图标来源：`value-shield`（盾牌）、新增 **`layers-outline`**（从 Figma `83:1823` 2x 导出）、`form-globe`（线框地球）
2. **双栏（`WhyCard` 471 / 29 / `QuoteForm` 1152）**：
   - `WhyCard`：`#083c30` 圆角 5；图 **471×556** + 底部 90px 降绿渐变（导出稿里照片下缘正是渐隐）；标题 **36/42** 两行、字距 1.44；4 条白勾（`why-01` 24px）+ 18/27 加粗，行距 51、左缩进 24（勾距卡左 80）
   - `QuoteForm`：白底 + `#dddddd` 1px 直角边框；标题 40/52、右上 `* 为必填项` 18/27；意向产品 label 18 + 两组各 **54 高浅绿标题条**；复选 24×24 `#578b73`；**组 02 六项带「规划中」药丸**（63×24 圆角 36 + 12px 圈点图标），组 01 不带（导出稿如此）
   - 7 个字段：label **18/27** + `*` `#bd695b`，输入框 **58 高**、`#cfd3cd` 边框、**前置 22px 图标**（user/mail/globe/whatsapp/company/box/pencil）、占位 18 `#6c766e`；公司名占满整行
   - **导出稿没有底部说明行**（此前多出一行 note），删掉后输入框 → 提交按钮间距 43，卡片高 1146
   - 提交按钮 **1046×67 全宽**、文字与箭头居中（gap 25）
3. **询价流程（`QuoteSteps`）**：`#f6f6f4`、高 235；左「询价流程」**49/71** + 「简单 · 高效 · 专业」**26/38**，`#7c867e` 竖分隔线在 270 处；4 步图标 **45px** + 18/27 标题与描述，每步右侧 `›` 箭头 20px；步骤列改弹性均分（原固定 335.5 会在 1024–1440 溢出 100+px）
4. **步骤图标映射修正**：导出稿第 1 步与第 3 步**共用同一个「文档」图标**，第 2 步为耳机（`process-03`）、第 4 步为箱（`process-02`）；原映射把 4 个图标错位了一格
5. **清理**：`InquiryForm.astro` 已无任何引用（联系/报价都改用各自的表单组件）→ 删除；`inquiry-form.ts` 的组 01 `planned` 全部改 false、组 02 全部 true（与导出稿一致），并补 `planned` 文案
6. **验证**：`npm run build` 42 页；1920 实测 眉标 214、标题 277、说明 385、装饰线 493、优势图标 541（x 155/348/541）、卡片 803（471×1151 / 1152）、必填 852、组 01 956、输入框 1406/1522/1638/1719、提交 1855（1046×67）、流程带 2029、页脚 2264、整页 2406（设计 2401）；360→1920 九档无溢出；EN 版首屏优势不再折行

### v1.11.10 详细内容（2026-11-19）

联系我们（Figma `83:1693`，导出稿 `design/reference/pages/contact.webp` 1920×2097）。

1. **页面结构**：设计里这一页没有底部 CTA 带，也不复用通用 PageHero——是「矮 hero + 面包屑 + 双栏（联系信息 / 询盘表单）+ 深绿页脚」。
2. **Hero（新增 `components/pages/contact/ContactHero.astro`）**：整幅 402 高（素材本身就是 1920×402 的裁切版）、眉标 19/32、标题 **75/102**、说明 23/38 `#34483b`、**无 CTA 按钮**；上 95 / 下 113。
3. **面包屑**：本页用 **default 容器（1706）** 与下方内容对齐（此前固定 narrow 会偏 27px）；上下留白改 **16**（`space="compact"`），否则整块下移 15px。
4. **双栏（`ContactCard` + `ContactForm`）**：左 793 / 间距 28 / 右 885（两卡等高，左卡多出的底部空白由网格拉伸产生）。
   - 左卡：浅绿底 **`#edf4ef`**、圆角 3；眉标 17.5/31、标题 47/70、正文 20.5/35（手排 2 行）、图 705×423 圆角 4、分隔线 `#c4d1c7`、小标题 29/45、5 行联系信息（圆形图标 61px `#00392e` + 左间距 25 + 标签/值 20.5/31）
   - 右卡：白底 + `#e7e7e7` 1px 直角边框；眉标 17.5/31、标题 40/59、必填说明 19/33、字段标签 20.5/32（`*` 用 `#bd695b`）、输入框 **57 高 + `#d9dfd9` 1.5px 边框**、占位符 `#91968f`；意向产品两组各带 **浅绿标题条 57 高**（`#fbfcfa` 块 + `#edf4ef/60` 条），复选 24×24 描边 `#578b73`、选中填 `#083c30`；提交按钮 **275×75 + ↗**
5. **深绿页脚变体**：导出稿里 **只有联系我们和获取报价**两页是深绿页脚（`#01362d`，白 logo / 白导航 / 白色社交图标），其余页面仍是米白。新增 `Footer theme="dark"` + `Base footerTheme`（默认 light，其它页面零变化）；社交图标另存 `social-*-white.webp`（LinkedIn/YouTube 是「白块 + 挖空字形」，直接 `invert` 滤镜会渲成白方块）。
6. **顺带整理**：询盘表单的中英文文案/产品分组/国家列表抽到 `src/data/inquiry-form.ts`，`InquiryForm`（获取报价）与新的 `ContactForm` 共用一份；`Button` 加 `direction="up-right"`。
7. **验证**：`npm run build` 42 页；1920 实测 hero 117..519、面包屑 535、双栏 589、左卡 793×1337、右卡 885、提交按钮 275×75、页脚深绿 `#01362d`；9 档宽度（360→1920）无溢出；`/about` `/global` `/cases` `/quote` 复查页脚仍为米白、面包屑仍在 y760/761（默认参数零回归）。

### v1.11.9 详细内容（2026-11-19）

关于我们（Figma `83:1522`，导出稿 `design/reference/pages/about.webp` 1920×3541）。

1. **Hero（`PageHero brandMark`）**：
   - 品牌标识原本用 `public/brand/logo.png`（堆叠版 + 灰色 tagline），设计是**横版 lockup 319×58** → 改用 `src/assets/brand/logo-hero.webp`（980×176，渲染 323×58）
   - 内容区 520 宽（设计正文最长行 482，原 490 会让第 3 行折行 → 整页高度 +28）
   - 标题 **64/93**、副标题 18/27 取**实色 `mn-ink`**（原 `/80` 偏灰）、正文 18/**28** 三行**手排断行**（`\n` + `whitespace-pre-line`）
   - 上 96 / 下 106，标题 mt 22、副标题 -7、正文 mt 12、按钮 mt 44；主按钮 **248×81**（`brandMark` 时 min-w 改 248）
   - 高度 616，与设计 118..734 对齐
2. **创始人区块（`FounderBlock`）**：
   - 容器 `narrow`（内容 1652）；网格 **749 / gap 80 / 1fr**，`2xl` 才用 749 固定，`lg` 走 45% 防窄屏挤压
   - 文字列 `lg:-mr-[24px]`（≈838）——设计文字框比容器宽 15px，不加宽则 7 行断行位置全错
   - 眉标 FOUNDER 14/21 灰 + 字距 .2em；标题 **46/69**、副标题 **29/42**；正文 **18/41.7**（设计每行手排 41.66，行距 2.3 只适合中文，英文走 34）
   - 引言卡 **826×148 `#f6f7f3` 圆角 4**：引号改用**导出稿原图**（`quote-open/close.webp`，34×34，去白底转透明），文字 26/39 斜体、署名 Wang UP 24 斜体 + 67px 细线，底部 12
3. **全球运营与制造布局（`GlobalLocations`）**：上 89 / 下 73；眉标 16/24、标题 48/70、右侧说明 18/27 **右对齐**（`mb-[20px]`）；卡片 **404×332 `#daddd8` 直角**、图 404×137、图标 48 + 定位行 20/16、标题 26/38（左缩进 92）、说明 17/**20**（手排断行，右内边距 20 才能容纳 289px 长行）
4. **核心优势（`AdvantageBand`）**：上 48 / 下 64；`#083c30` 底；眉标 `M E N A R O` 16 全白 + 字距 .3em、标题 48/70、右侧说明单行 18/27 白；卡片 **265×215、1px `#b1c5ba` 描边、圆角 5**、图标 54、标题 18/27、说明 17/20 白（6 段全部手排断行）
5. **JoinBand**：**去掉绿色蒙版**（设计是「亮照片 + 深绿字」）；标题 **56/84**、副标题 34/51、说明 26/**35** 全深绿加粗；按钮 248×81；上 66 / 下 70
6. **数据修正**：卡片图标顺序（台州=定位针、安徽=厂房）此前反了；文案 `配套` → `配备`、`解决方案` → `产品方案`
7. **验证**：`npm run build` 42 页；1920 实测 hero 117..733、创始人标题 974、全球标题 1694、优势标题 2269、Join 标题 2716、引言卡 1409..1557（826×148）、卡片 404×332 / 265×215，页面总高 3548（设计 3541）；9 档宽度（360→1920）`scrollWidth === clientWidth`

### v1.11.8 详细内容（2026-11-19）

全球合作页（Figma `83:1428`，导出稿 `design/reference/pages/global.webp` 1920×2404）。

1. **合作方式区块**（`PartnerTypes`）：
   - 卡片 **540×182**、白底、**`#dddddd` 1px 直角边框**（原：浅绿灰边框 `mn-border` + 8px 圆角 + 4 列）
   - **3 列**布局，列间距 17、行间距 18（设计 `133 / 690 / 1247` 三列，第四张换行）
   - 卡片标题 16 → **27/39 Bold `#1b2e25`**，说明 13 → **18/27 `#6c766e`**
   - 内边距 左 50 / 上 51；区块上 68 / 下 106（原 80 / 80）
   - 右侧说明 18/27，最大宽 560（设计 513，单行）
2. **区块右侧说明的垂直位置（三处统一）**：设计里 note 与**标题底边**相差 18px，不是与整个「眉标+标题」块居中。此前用 `items-center` 会顶高 20px。改为 `lg:items-end` + note `lg:mb-[18px]`，同时修正 `ApplicationGrid`（解决方案）与 `ProcessSteps`（解决方案 / 全球合作）。实测：解决方案 note 931..958（设计 931..958，完全一致）、全球合作 948..975（设计 950..977，差 2px）。
3. **`scrim="strong"` 移动端修复**：上一版为它写的是**全程横向渐变**，在 390 宽下只覆盖左侧 52%，右侧文字压在图上看不清。改为「移动端整幅 `bg-white/90`、lg 以上才用渐变」，与 `light` 变体同结构。
4. **验证**：`npm run build` 42 页；1920 实测 眉标 883、标题 923..993、note 948..975、合作卡 `1024..1206 / 1224..1406`（x `127..666 / 683..1222`）、流程区 1512..1980、CTA 1980..2268，与设计（884 / 925..995 / 950..977 / 1026..1208 / 1226..1408 / 1514..1982 / 1982..2267）基本重合，页高 2410 vs 2403；`/en/global` 页高 2465、390 移动端 2669，均无横向溢出。

### v1.11.7 详细内容（2026-11-19）

1. **眉标字体（全站）**：Figma 里所有 eyebrow 都是 **Bold + 深色**，我们此前统一做成「灰色常规字重」，于是视觉上像辅助说明而不是标签。
   - 内页 Hero 眉标（`应用场景` / `MENARO · APPLICATIONS` / `合作方式`）：18 / 27 **Bold** `#1b2e25`
   - 区块眉标（`应用分类` / `服务流程` / `项目展示`）：16 / 24 **Bold** `#1b2e25`
   - 改动落在 `PageHero`、`SectionHeading`、`ApplicationGrid`、`ProcessSteps`、`CaseGrid`
   - 注意：**区块副标题（subtitle）仍是灰色常规**，只有眉标改粗，两者不要混淆
2. **Hero 两个按钮**（节点 `83:1398` primary / `83:1402` outline）：
   - primary `查看产品`：219×81、`#083c30` 底、白字 18 / 26.1、px 26、箭头 22 —— 已经正确
   - outline `获取报价`：设计是 **白底 + `#708a7d` 描边 + `#083c30` 绿字 20 / 29、px 30**，此前是 `border-mn-border`（#dce4df 极浅灰）+ `text-mn-ink` + 18px，看起来像「禁用态」；且背景透明会让 hero 图透出。已改为白底 + 中灰绿描边 + 品牌绿字
   - 次按钮宽 229（原 219）、两键间距 18（原 16）
3. **页头报价按钮**：`w-[130px]` 会让英文 `Get a Quote` 折成两行，改为 `min-w-[130px]` —— 中文仍是 130×54，英文自动到 153×54。
4. **验证**：`npm run build` 42 页；1920 实测眉标 `18px/27px w700 rgb(25,51,44)`、`应用分类/服务流程 16px w700`；按钮 `查看产品 x127 219×81 #083c30` / `获取报价 x364 229×81 #ffffff + #708a7d`（设计 133/370，差值来自 15px 滚动条）；Hero 文字与设计逐项对齐（眉标 268、标题 342、说明 420）；`/en/solutions`、390 移动端、`/products/tile-grout`、`/cases` 均无溢出。

### v1.11.6 详细内容（2026-11-19）

解决方案页（Figma `83:1329`，导出稿 `design/reference/pages/solutions.webp` 1920×2340）。

1. **应用分类区块**（`ApplicationGrid`）：
   - 卡片 404×350（原 3:4 竖图）、四列、间距 **12px**（原 20）、**直角**（原 8px 圆角）
   - 卡片标题 15 → **26 / 39 Bold**，右上斜箭头 **24px 白色**（原 16px 灰白、方向 →）
   - 内边距 左 38 / 底 18；区块标题 40 → **48/70**、眉标 16、右侧说明 18/27 单行
   - 区块 上 51 / 下 100
2. **服务流程区块**（`ProcessSteps`）：
   - 底色 `bg-base-200/70` → **`#f6f6f4`**
   - 卡片 404×137 纯白、无边框（原圆角 + 边框），内边距 左 38 / 上 37 / 下 36
   - 序号与标题**同一行**（`01先选场景`，18/27 Bold `#1b2e25`）；原实现是「绿色序号独立一行 + 15px 标题」
   - 说明 16/26；区块 上 91 / 下 99
3. **顺带修复 `ArrowIcon`**：组件只声明了 `class` 参数，而全站调用都写 `className`，导致**尺寸与颜色一直被忽略**（箭头固定 16px、继承父级颜色）。现在两个参数都支持，箭头按调用方设定渲染；这一条同时修正了首页产品卡、`ArrowLink` 等处的箭头尺寸。
4. **验证**：`npm run build` 42 页；1920 实测 应用卡 `999–1349`、流程卡 `1681–1818`、CTA `1917–2205`（设计 1000–1350 / 1682–1819 / 1918–2203），页高 2347 vs 设计 2340；`/en/solutions` 页高 2374；无横向溢出。

### v1.11.5 详细内容（2026-11-19）

项目案例页（Figma `83:1236`，导出稿 `design/reference/pages/cases.webp` 1920×2968）。

1. **内容区宽度**：该页正文列是 **1652**（134…1785），比首页 1706 窄 54px。`Container` 新增 `width="narrow"`（`max-w-[1732px]`），PageHero / Breadcrumb / InquiryCta 统一用它。三者在全站只出现在内页，因此内页整体归位。
2. **Hero**：
   - 原实现把图片放在右侧 58% 列，其余用白色渐变遮住；设计与导出稿都是**整幅 banner**（1920×618）＋左侧渐隐，改为全铺 `object-cover`。
   - 图片是否整幅由**宽高比判定**（≥2.4 视为 banner）。`products/tile-grout` 的 hero 是 0.94 竖版占位图，仍走右侧列，避免占位文字铺满首屏。
   - 新增 `scrim` 参数：`light`（默认，图内已烘焙渐隐，如案例/方案/关于）与 `strong`（图本身偏暗、需要更重白纱，用在全球合作）。
   - 标题 44 → **63/91**，眉标 13 → **16/26**，描述 14 → **18/27**，按钮 219×81（`Button size="lg"`，箭头 22）。
   - 间距按节点还原：眉标→标题 35、标题→描述 17、描述→按钮 87；band 高 616。
3. **面包屑**：13 → **18/27**，上下 27px，**去掉下边框**（导出稿此处无分割线）。
4. **案例网格**：卡片 536×462（原 4:3 → `aspect-[536/462]`）、间距 23（原 24）、容器 1652；**直角**（原 `rounded-box`）；标题 20 → **34/51**、分类 12 → **20/30**；内边距左 47 / 底 62、标题与分类间距 14。第七张宽卡 1648×462。
5. **底部 CTA**：band 高 285（原约 200）、眉标 16、标题 38.5/56、描述 18/27、按钮 240×70；`Button` 新增 `size="cta"`。
6. **验证**：`npm run build` 42 页；1920 实测 hero 117–733、眉标 865、标题 897、网格 1004、CTA 2543–2831，与设计（118–734 / 866 / 908 / 1005 / 2546–2831）一致；页面高 2973 vs 设计 2967；390 无横向溢出。
7. **连带回归检查**：`/solutions`、`/global`、`/contact`、`/products/tile-grout` 均无溢出；`/global` 因原图偏暗改用 `scrim="strong"`，`/products/tile-grout` 占位图仍为右侧列布局。

### v1.11.4 详细内容（2026-11-19）

**结论：不是原图的问题，是我们自己叠的 CSS 渐变。**

1. **对比方法**：同一相对位置（x=10%…80%、hero 中线 y=600）取三组亮度——源图 `src/assets/home/hero.webp`、设计导出稿 `design/reference/pages/home.webp`、我们渲染的页面。
2. **数据**：源图与设计稿几乎重合（x=10% 241/239、x=30% 188/182、x=40% 181/187），**说明原图自带的白色渐隐就是设计的效果**；而渲染值是 254/244/241，整体多出 25–45% 的白 —— 来自 `Hero.astro` 里这段叠加层：

   ```html
   <div class="absolute inset-0 bg-white/85 lg:bg-transparent lg:bg-linear-to-r lg:from-white lg:via-white/75 lg:to-white/0"></div>
   ```

   `via-white/75` 意味着画面中间还要再压 75% 白，横向一直延伸，于是「白色过渡」被拉得很宽。
3. **修正**：桌面端移除该层（`lg:hidden`），移动端保留 `bg-white/85`（移动端文字压在整图之上，需要这层保证可读性，且没有移动端导出稿可比对）。
4. **复测**：x=10% 241/239、30% 185/182、40% 187/187，与设计稿对齐；50%–80% 有 ±20 的差异，源于 hero 图 `object-cover object-right` 的取景与设计稿轻微不同，属图像本身而非样式。
5. **遗留**：`products/tile-grout`、`products/floor`、`products/sealant`、`products/detail-sealant`、`quote` 五处仍是占位图，等统一换图时一并处理（见 §7）。

### v1.11.3 详细内容（2026-11-19）

「制造与品质」区块此前只做了图 + 一行文字，漏掉了设计里的**白卡容器**和双栏配色，已按导出稿重做。

1. **4 张卡片**：设计每张是**白色卡片**（`#ffffff`），图片 415×249 铺满卡片上部，下部白底内 20/30 粗体标题 + 16/26 灰色副标题（两行文字在设计里是同一词，如「制造协同 / 制造协同」）。卡片**直角无圆角**、间距 **16px**；此前是图片圆角浮在区块底色上、只有一行 15px 文字。
2. **区块底色** `#f6f6f2`（此前用 `bg-base-200/70` 偏冷绿）。
3. **双栏深绿区**：不是同色拼合，而是**左深右浅**两色——左 `#083c30`、右 `#184e43`，中间 6px 缝；内边距 44px；标签 16/26（白 70%）、标题 **26/38 Bold**、说明 16/26（白 75%）。新增令牌 `--color-mn-green-soft: #184e43`。
4. **章节说明**：右侧两行 18/27 右对齐（`#6c766e`），与设计一致。
5. **验证**：`npm run build` 42 页通过；1920 下实测卡片 `107..521 / 538..951 / 968..1382 / 1399..1812`（415 宽、16px 缝），双栏 `107..956`(左) / `963..1812`(右)、6px 缝，区块底色 `#f6f6f2`，均与导出稿一致；390 下 `scrollWidth === clientWidth`，卡片竖排正常。

### v1.11.2 详细内容（2026-11-19）

字号全部取自 Figma 节点（`get_design_context`），已整理成 [design-analysis §3.4](design-analysis.md) 表格，后续页面直接对照。

1. **页头**（节点 `83:936`）：
   - Logo 由 44px 高放大到 **82px**（设计 237×82，位于 116px 高页头的 y=20）；60px 用于 lg–2xl 之间避免挤压
   - 导航 16px **Bold**、项间距 44px，并锁定左边界 654px（`2xl:ml-[270px]` 抵消滚动条 15px 后的实测对齐）
   - 语言切换 16px，与按钮间距 12px
   - 「获取报价」**补上缺失的箭头**（22px），并改为确定性宽度 **130×54**、圆角 4、`justify-between`；此前用 daisyUI `.btn` 实际被撑到 177px
   - 底色改 `#f8f9f7`（设计值）
2. **Hero**（节点 `413:3446`）：改用 Figma 导出的**横版 lockup**（`MENARO 美纳罗` + `更好的材料，更好的建筑`，490×88），自动去掉白底并 trim 存为 `src/assets/brand/logo-hero.webp`（980×176，28 KB）；副标题 18 → **29/42**，正文 15 → **17/38**，主标题行高收到 65。
3. **区块标题**（`SectionHeading`）：44 → **48/70**，副标题 16 → **18/27**；`全球合作伙伴` 同步 48/70；底部 CTA 标题 34 → **38/56**。
4. **产品卡片**（节点 `249:3633`）：标题 18 → **20/30**，描述 13 → **14/22**，CTA 13 → **14 bold**，圆形箭头 32 → **42px**（内含 20px 箭头），并统一 `#00372d`。
5. **文字链接**：`ArrowLink` 增加 `direction` 参数并升级为 **18px bold**（设计 `#1b2e25`）；产品系列的「查看全部产品」单独做成 **22px bold + ↗ 20px**（设计 `249:3706`）。
6. **移动端**：「产品系列 / 项目案例」的标题行在 `sm` 以下改为竖排，避免副标题换行后与右侧链接挤在一起。
7. **验证**：`npm run build` 42 页通过；CDP 在 390 / 768 / 1024 / 1280 / 1440 / 1920 六档 `scrollWidth === clientWidth`；1920 下页头实测 logo `108..343`、导航 `654..1456`、语言 `1636..1667`、按钮 `1683..1812(130×54)`，与设计 `113..348 / 654..1456 / 1631.. / 1682..1812` 一致。

### v1.11.1 详细内容（2026-11-19）

1. **页脚 Logo 不匹配（用户反馈）**：设计稿页脚用的是**横版标志**（MENARO + 美纳罗® + 下方 slogan 一体），而我们两处都用了页头的**堆叠版** `logo.png`。原始素材一直在导出包里没被采用：`Pc图片及图标/MENARO 最终版 _ 01 _ 首页/图片-图标/共用页脚_/MENARO 白色横版标志.png`（270×55，实测主色就是 `#083c30`），已复制为 `public/brand/logo-horizontal.png`。页脚原本额外渲染的 slogan 段落随之删除（已烘焙在图内），`alt` 里带本地化 slogan。
2. **页脚其它差异**（同一节点 `413:3621` 复核）：底色应为 `#fbfaf6`（不是白）；导航/版权/法务文字统一 `#6c766e`，字号 17px / 16px（原为 13px 与 `mn-ink`）；社交图标 33px；分隔线为 `#083c30` 28% 透明度；法务项之间加 `|` 分隔；导航去掉「获取报价」（设计页脚只有 8 项，与页头 8 个导航项一致）；内容区比正文再内缩 27px（设计页脚内容宽 1652 vs 正文 1706）。
3. **配色令牌校正**：`--color-mn-muted` 由 `#718178` 改为 `#6c766e`；新增 `--color-mn-desc: #7d8c84`（卡片描述）与 `--color-mn-cta: #00372d`（卡片 CTA 文案 + 圆形箭头底）。修正后的完整色板见 [design-analysis §3.1](design-analysis.md)。
4. **首页文字颜色落位**：产品卡片标题、更多产品规划标题与内层卡标题 → `text-mn-green`（`#083c30`，此前误用 `mn-ink`）；卡片描述 → `text-mn-desc`；「了解系列」与圆形箭头 → `mn-cta`。大区块标题保持 `mn-ink`。
5. **验证**：`npm run build` 通过（42 页）；CDP 在 390 / 768 / 1440 / 1920 四档 `scrollWidth === clientWidth`；1920 下页脚实测 logo `127..397`、导航 `645..1396`、社媒 `1557..1779`，与设计稿（133..402 / 650..1399 / 1500..1784）一致；/en 页脚同版式。

### v1.11.0 详细内容（2026-11-19）

> 校对基准：`design/reference/pages/home.webp`（1920×5802 整页导出），所有数值都在 1920 视口下量取。

1. **内容区宽度（全局，根因）**：`Container.astro` 原为 `max-w-[1706px] px-10`，padding 吃掉 80px → 实际内容区只有 **1626px**，比导出稿（107…1814，即 1706px）窄了 80px，使所有页面整体内缩。改为 `max-w-[1786px]` 后内容区在 ≥1786 视口下正好 1706px，与导出稿对齐。**此改动影响全站**，后续页面校对按新基准进行。
2. **产品系列 4 卡**：导出稿卡片 402×250（图）+ 浅底文字区，卡间距 24–27px，无边框、无圆角；此前用 `gap-px + bg-mn-border` 伪造 1px 分隔线，视觉上"粘成一块"。现改为 `gap-6` + 文字区 `bg-mn-paper`（#f5f7f4，导出稿实测 #f5f8f5）；右下箭头按钮在导出稿里是**实心深绿圆 + 白箭头**（此前是描边、hover 才填充），已改常态实心。
3. **更多产品规划**：整体背景不是纯色，而是 `src/assets/home/roadmap.webp`（**1706×288**，浅绿 + 右上木格栅）——之前误用 `bg-base-200/70` 平涂。现以该图作底图层（lg 以上 `object-cover object-right`，移动端回落 `#f2f8f0` 纯色）。内部 3 块改为**独立白卡**（`rounded-lg` + `shadow-sm`），列宽按导出稿实测 379 : 379 : 864 用 `lg:grid-cols-[379fr_379fr_864fr]`，卡间距 17px；标题字号 32px（导出稿墨高 30px）、正文 15px、图标 40px。
4. **建筑应用方案小字**：导出稿里该段落是**左对齐、位于标题与右侧链接之间**（x=689，宽 646，18px/36px 行高），折成两行、第二行只剩"方案。"；此前实现是右对齐并压在链接上方。现改为 `flex-row + items-end + justify-between` 三段式，段落 `max-w-[660px] text-[18px] leading-9`，实测渲染宽 646px、两行断点与导出稿一致。
5. **验证方法与结论**：
   - 用 CDP（`Emulation.setDeviceMetricsOverride`）在 390 / 768 / 1440 / 1920 四档测量 `documentElement.scrollWidth`，均等于 `clientWidth`，**无横向溢出**。
   - ⚠️ 用 `chrome --window-size=390 --screenshot` 截图会因窗口最小宽度被裁剪，看起来像溢出——**截图不代表布局宽度**，判断溢出必须用 CDP 量 `scrollWidth`（踩坑记录见 [troubleshooting/chrome-headless-screenshot.md](troubleshooting/chrome-headless-screenshot.md)）。
   - 1440 下内层第三张卡（含 6 个 chip）会折成两行，属容器变窄后的正常响应式行为。

### v1.10.0 详细内容（2026-11-18）

1. **路由方案**：中文（默认）留在根路径，英文挂 `/en` 前缀；`astro.config.mjs` 未启用 `i18n` 自动化，改用 `src/i18n/utils.ts` 的 `getLangFromUrl` / `localizePath` / `alternateLangHref`，组件直接读 `Astro.url` 判断语言，避免层层透传 props。
2. **文案单一来源**：`src/i18n/ui.ts`（导航、页脚、法务链接、状态标签）、`src/i18n/home.ts`（首页 9 个区块）、`src/i18n/series.ts`（4 个产品系列页）、`src/data/product-details.ts`（3 个详情页，`zh`/`en` 并列）、各页面组件内 `{ zh, en }[lang]`。产品详情与系列页的图片走 `slug → assets` 映射，一份版式服务两种语言。
3. **页面组件化**：原先 20 个页面里的版式搬进 `components/pages/<area>/*Page.astro`（自带 Base 与 `<title>`），`src/pages/**` 与 `src/pages/en/**` 只剩 3 行 wrapper，改版式只改一处。
4. **语言切换**：页头 `EN` / `中文` 链接按当前路径互跳（如 `/products/tile-grout` ↔ `/en/products/tile-grout`），移动端菜单同样带切换项；`Base.astro` 输出 `<html lang>`、两条 `hreflang` 备用链接与对应 `og:locale`。
5. **本地化细节**：表单标签与国家级选项、面包屑 aria、社媒名称、`规划中 / Planned`、`已上线 / Available` 全部进字典；日期与电话格式按语言书写。
6. **验证**：`npm run build` 通过（41 页）；40 条路由（20 中文 + 20 英文）在 1440 下全部 200 且无横向溢出；`/en` 首页、`/en/products/tile-adhesive`、`/en/sitemap`、`/en/quote` 逐屏核对，语言切换双向跳转正确。
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
| P4 多语言：中文 + 英文（`/en`） | 2026-11-18 | 见 v1.10.0 |
| 修复 PowerShell 未加载 fnm（Node 26 不生效） | 2026-11-19 | 见 v1.10.1 |
| 首页逐页像素校对（第 1 轮：产品系列 / 更多规划 / 建筑应用方案 + 内容区宽度） | 2026-11-19 | 见 v1.11.0 |
| 首页文字配色校正 + 页脚 Logo 换版（第 2 轮） | 2026-11-19 | 见 v1.11.1 |
| 首页字号/尺寸/箭头 + 页头报价按钮箭头（第 3 轮） | 2026-11-19 | 见 v1.11.2 |
| 首页制造与品质区块重做（第 4 轮） | 2026-11-19 | 见 v1.11.3 |
| Hero 白色过渡定位（源图问题，非样式问题） | 2026-11-19 | 见 v1.11.4 |
| 项目案例页逐页校对 | 2026-11-19 | 见 v1.11.5 |
| 解决方案页逐页校对 | 2026-11-19 | 见 v1.11.6 |
| 内页眉标加粗改色 + Hero 次按钮状态（全站） | 2026-11-19 | 见 v1.11.7 |
| 全球合作页逐页校对 | 2026-11-19 | 见 v1.11.8 |
| 关于我们页逐页校对 | 2026-11-19 | 见 v1.11.9 |
| 联系我们页逐页校对 | 2026-11-19 | 见 v1.11.10 |
| 获取报价页逐页校对 | 2026-11-19 | 见 v1.11.11 |
| 全部产品抽屉（页头「产品体系」触发） | 2026-11-19 | 见 v1.11.13 |
| 美缝系列配图换 2x 高清版 | 2026-11-19 | 见 v1.11.14（构图偏「满」，待确认是否补白） |
| 首页美缝卡片换 2x 高清版 | 2026-11-19 | 见 v1.11.15（另 3 张卡片仍待 2x 素材） |

### 进行中

| 任务 | 状态 | 下一步 |
| --- | --- | --- |
| 全站逐页双端像素校对 | 进行中 | 已完成：首页 / 案例 / 方案 / 全球合作 / 关于我们 / 联系我们 / 获取报价；下一站「制造与品质」 |
| 设计稿隐藏画板确认 | 待业务方确认 | 4 处隐藏 + 3 处宽度基准，见 design-analysis §7 |
| EN 页头在 1024 宽溢出 11px | 待排期 | 英文导航 + 报价按钮在 1024 视口超出（所有 `/en` 页一致），需整体调整 Header 换行阈值 |

### 待办 / 候选

| 任务 | 优先级 | 备注 |
| --- | --- | --- |
| 替换 5 张 hero 占位图 | 高 | 美缝系列 / 环氧系列 / 密封胶系列 / 密封胶详情 / 获取报价 |
| 询盘表单接后端 | 高 | 当前表单为静态 HTML（`action="#"`），需接 API 或第三方表单服务 |
| 多语言扩展（阿语 / 俄语等） | 低 | 现架构按 `locales` 数组 + 字典扩展，加语言只需补字典与 `/xx` 路由 |
| 首页「查看全部产品」改为打开抽屉 | 中 | 抽屉已落地（v1.11.13），首页产品系列区块的 `查看全部产品` 目前仍跳 `/products`，可改为同一触发器 |
| 批量导出 69 个设计素材 | — | 已由 v1.5.0 本地整理替代；如设计更新需重新导出，复用 `scripts/build-assets.mjs` 映射 |
| 配置 Vercel 项目（当前构建会失败） | 中 | 待有业务代码后再接 |
| 完成 `vercel` MCP 授权 | 中 | 后续部署需要 |
| 确认后可删除旧仓库备份 `D:\独立站\_backup_MENARO_20261111` | 低 | 3.4 MB，纯安全网 |
| 排查 `tdx-finance` MCP 不可用 | 低 | OAuth 元数据探测失败 |
| Figma 插件自动更新后重新打 schema 补丁 | 按需 | 见 troubleshooting 文档「复发处理」 |

---

## 7. 已知风险 / 注意事项

- **Figma 插件升级会覆盖 `mcp.json`**，需要重新打 schema 补丁（文档里有一步步命令）。
- **不要用 PowerShell `Get-Content`/`Set-Content` 改源码**：5.1 默认按 GBK 读写，会把中文注释与代码行写坏（已踩过，见 [troubleshooting/powershell-encoding.md](troubleshooting/powershell-encoding.md)）。
- **无头 Chrome 截图会误判溢出**：`--window-size=390` 受 Windows 最小窗口宽度影响，判定溢出必须量 `scrollWidth === clientWidth`（见 [troubleshooting/chrome-headless-screenshot.md](troubleshooting/chrome-headless-screenshot.md)）。
- **Node 双版本并存**：fnm 已在 PowerShell 终端生效（26.13.1），但系统级 `C:\Program Files\nodejs` 仍是 22.20.0；cmd / Git Bash / 未加载 profile 的进程跑 Astro 7 会直接报错。彻底规避需卸载 Node 22，见 [troubleshooting/astro-toolchain-versions.md](troubleshooting/astro-toolchain-versions.md)。
- **hero 占位图（待替换）**：`products/tile-grout`、`products/floor`、`products/sealant`、`products/detail-sealant`、`quote` 五处 hero 当前是**斜纹占位图**（图上写明「占位图 · 待替换」+ 目标路径）。
  - 原因：Figma 在导出后改版，这 5 张与导出稿内容不一致；而导出稿里只有带文字的整图，没有独立照片图层。
  - 替换方式：拿到最终版无文字底图后，**直接覆盖同名 `src/assets/.../hero.webp`**，无需改代码；`scripts/build-heroes.mjs` 已把这几项列入 `SKIP`，重跑管线不会把旧图刷回来。
- **别整表重跑 `build-assets.mjs` 覆盖 hero**（本坑真实踩过，v1.11.13 已加守卫）：该脚本 `ENTRIES` 里残留 16 条 `*/hero` 映射，指向的是**整幅 banner**（含烘焙文字），一跑就会把按图层导出的无文字底图刷回去。现用 `isHeroDest()` 跳过 `/hero` 结尾的目标，日志会打印 `SKIP hero 16 个`；改动映射表后请确认这行还在。
- **Banner 文案**（已解决）：原以为文字烘焙进图，实为整页截图导致；v1.6.0 已改为按图层导出无文字底图，文案走 HTML。
- **`Pc图片及图标/` 132 MB 素材未纳入版本控制**，含大量以 `2.png`、`Group 44.png` 命名的原始导出与整页截图，直接提交会让仓库膨胀。
- 项目已纳入版本控制（`thatinjury2011/MENARO`，默认分支 `main`），破坏性操作前先确认工作区干净。
- 用户级 MCP 配置含 `.install-staging` 下的旧路径条目（vercel 插件），若清理需同步修改 `chat.pluginLocations`。
