# PowerShell 改文件导致中文乱码 / 文件损坏

> 适用：Windows + Windows PowerShell 5.1 环境下，用 `Get-Content` / `Set-Content` 批量改 `src/**` 的 `.astro` / `.md` 文件。

## 症状

1. 改完文件后构建报错，例如 `titleSpacing is not defined`；
2. 打开文件看到 `照片占右侧 58%，文字区更宽（多数系�?列表页）` 这样的问号；
3. 更隐蔽的：**注释行和下一行代码被合并成一行**（`...导出�?const titleSpacing = ...`），导致整段逻辑消失。

## 根因

PowerShell 5.1 的 `Get-Content` / `Set-Content` 默认按 **ANSI（GBK）** 读写，且 `-Raw` 会把 UTF-8 多字节序列当单字节重新编码：

- 读：UTF-8 无 BOM 的中文被按 GBK 解码 → 出现 `锝?`、`�?`；
- 写：再用 GBK 编码写回 → 原文件被永久破坏，而且**换行符序列也会错位**，于是出现行合并；
- 即使加了 `-Encoding utf8`，`Set-Content` 在 5.1 下也会写入 **UTF-8 BOM**，`.astro` 的 frontmatter `---` 会带上 BOM，属于隐患。

## 正确做法

优先用编辑器 / Agent 的 `edit` 工具做字符串替换，不要用 shell 改源码。

必须用 shell 时：

```powershell
# 读：显式 UTF-8
$t = [System.IO.File]::ReadAllText($p)          # 自动识别 BOM，其余按 UTF-8
# 写：显式 UTF-8 无 BOM
[System.IO.File]::WriteAllText($p, $t, (New-Object System.Text.UTF8Encoding($false)))
```

排查遗留 BOM：

```powershell
[System.IO.File]::ReadAllBytes($p)[0..2] -join ','   # 239,187,191 就是 BOM
```

## 已踩过的坑

- 2026-11-19：用 `(Get-Content -Raw).Replace(...) | Set-Content` 改 `PageHero.astro`，把 4 处中文注释和 1 行代码合并写坏，只能整文件重写；同批 `FounderBlock.astro` 写入后带 BOM，事后手动剥离。
- 同一原因导致 `Select-String` 在正常文件里也查不到中文（只是显示问题），**不要据此判断"文件里没有中文"**。
