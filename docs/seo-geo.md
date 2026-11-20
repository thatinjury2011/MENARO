# SEO / GEO 实施说明

> 面向搜索引擎（SEO）与生成式引擎（GEO：ChatGPT / Claude / Perplexity 等）。
> 全站 42 条路由（20 页 × 2 语言 + 404 × 2）由**四个地方**统一驱动，改文案只改一个文件。

---

## 1. 站点事实（唯一来源）

| 项 | 值 |
| --- | --- |
| 正式域名 | `https://www.menarobm.com`（可用 `SITE_URL` 环境变量覆盖，见 `astro.config.mjs`） |
| 默认语言 | 中文在根路径 `/`，英文在 `/en` |
| 公司 | MENARO 美纳罗 · 中国浙江台州 |
| 电话 / WhatsApp | +86 137 3857 7658 |
| 固定电话 | 0576-8853 9555（周一至周五 09:00–18:00 CST） |
| 邮箱 | menarobm@gmail.com |
| 价格策略 | 只报价不刊价（站点不出现价格，因此 Product schema 不含 `offers`） |

---

## 2. 架构：4 个文件

| 文件 | 职责 |
| --- | --- |
| [src/data/seo.ts](../src/data/seo.ts) | **逐路由**的 title / description（zh+en）+ `staticRoutes` 清单 + `noindexPaths` |
| [src/data/schema.ts](../src/data/schema.ts) | 公司事实 `org` + JSON-LD 节点构造器（Organization / WebSite / WebPage / BreadcrumbList / Product） |
| [src/layouts/Base.astro](../src/layouts/Base.astro) | 组装 head：title、description、canonical、hreflang、robots、OG、Twitter、JSON-LD |
| [src/pages/sitemap.xml.ts](../src/pages/sitemap.xml.ts) · [robots.txt.ts](../src/pages/robots.txt.ts) · [llms.txt.ts](../src/pages/llms.txt.ts) | 三个构建期端点，全部读取上面的数据 |

### Base 的取数优先级

```
<title>       metaByPath[路径][语言].title  →  页面 <Base title>  →  site.title[语言]
description   <Base description>  →  metaByPath[路径][语言].description  →  site.description[语言]
```

`metaByPath` 的 key 是**去掉 `/en` 前缀、去掉尾斜杠**的路径（`/products/tile-grout/mg-700`）。

### 输出口径（已统一）

- canonical / hreflang / og:url / sitemap 全部**绝对地址 + 尾斜杠**（文件类路径如 `/sitemap.xml` 不加斜杠）
- hreflang 三条：`zh-CN`、`en`、`x-default`（指向中文）
- 404 输出 `<meta name="robots" content="noindex, follow">`，其余页面 `index, follow, max-image-preview:large, max-snippet:-1`
- JSON-LD 用单个 `@graph`：Organization 常驻；WebSite 仅首页；WebPage + BreadcrumbList（按路由层级自动推导）常驻；Product 由详情页传入

---

## 3. GEO（生成式引擎）

| 措施 | 位置 |
| --- | --- |
| `llms.txt`：公司事实 + 产品清单 + 使用说明的纯文本索引 | `/llms.txt`（构建期由 `seo.ts` + `schema.ts` 生成） |
| AI 爬虫白名单：GPTBot、OAI-SearchBot、ChatGPT-User、ClaudeBot、PerplexityBot、Google-Extended、Applebot-Extended、CCBot、cohere-ai、meta-externalagent | `/robots.txt` |
| 结构化实体（Organization 的地址 / 电话 / 营业时间 / `knowsAbout`） | 每页 JSON-LD |
| 明确「只报价不刊价」，避免模型编造价格 | `llms.txt` 的 Usage notes、Product schema 不含 `offers` |
| 中英双语页面各自声明 hreflang，便于按语言引用 | head + sitemap |

> 未做：可见 FAQ 区块（内容需业务方确认口径）。若后续补 FAQ，建议同时加 `FAQPage` JSON-LD。

---

## 4. 新增 / 修改页面时的 checklist

1. 在 `src/data/seo.ts` 的 `metaByPath` 里加一条（zh + en 各一个 title / description）；若该路由需要被 sitemap 收录，同时加进 `staticRoutes`。
2. 详情类页面用 `<Base title={...} type="product" jsonLd={...}>` 传 Product 节点（参考 [DetailPage.astro](../src/components/pages/products/DetailPage.astro)）。
3. 需要 noindex 的页面（未上线、临时页）把路径加进 `noindexPaths`，或给 `<Base noindex>`。
4. 图片一律给 `alt`：信息图写实义文案，装饰图写 `alt=""`。
5. 每页只保留一个 `<h1>`（当前 42 页均为 1）。

---

## 5. 校验

```powershell
npm run build
```

构建后跑一遍口径检查（Git Bash / Python 均可）：

```python
import glob, re
from collections import Counter
rows = []
for f in sorted(glob.glob("dist/**/*.html", recursive=True)):
    html = open(f, encoding="utf-8").read()
    rows.append((f, re.search(r"<title>(.*?)</title>", html, re.S).group(1),
                 re.search(r'<meta name="description" content="(.*?)"', html, re.S).group(1),
                 re.search(r'<link rel="canonical" href="(.*?)"', html).group(1)))
print("页面数", len(rows), "｜唯一 description", len({r[2] for r in rows}))
print("非正式域 canonical", [r[0] for r in rows if not r[3].startswith("https://www.menarobm.com")])
```

期望：**页面数 42、唯一 description 42、非正式域 canonical 为空**。
另可检查 `dist/sitemap.xml`（40 个 `<loc>` = 20 路由 × 2 语言）、`dist/robots.txt`、`dist/llms.txt`。

可视化验证：Rich Results Test / Schema Markup Validator 粘线上页面 URL（需先部署）。

---

## 6. 默认分享图

`public/og-default.png`（1200×630，品牌绿卡）由 `python scripts/build-og-image.py` 生成。
需要单页单独分享图时，给 `<Base image="/xxx.png">` 传站内路径或绝对地址即可。
