# Astro 工具链版本踩坑（Node / Astro / Vite）

> 首次记录：2026-11-18（P0 脚手架阶段）｜影响范围：`npm run build` 直接失败
> 状态：**已解决** —— 2026-11-18 切换到 Node 26.13.1（fnm），项目已升级到 Astro 7.4.12

## 现象

1. 安装 `astro@7.4.12` 后构建退出：

   ```
   Node.js v22.20.0 is not supported by Astro!
   Please upgrade Node.js to a supported version: ">=22.23.4"
   ```

2. 降到 `astro@6.4.8` 后仍失败：

   ```
   [@tailwindcss/vite:generate:build] Missing field `tsconfigPaths` on
   BindingViteResolvePluginConfig.resolveOptions
   ```

## 根因

1. **Node 小版本差**：Astro 7 要求 Node `>= 22.23.4`，本机为 v22.20.0。差了 3 个 patch 也会被硬拦截。
2. **Vite 双版本共存**：`@tailwindcss/vite@4.3.5` 的 peer 范围是 `^5 || ^6 || ^7 || ^8`，npm 把 `vite@8.3.8` 提升到了根目录；而 Astro 6 内部依赖 `vite@7.3.8`。插件注册进 Astro 的 Vite 7 后，运行时解析到的却是根目录的 Vite 8（rolldown 版），两代插件 API 不兼容 → 编译期报字段缺失。

## 当前方案（Node 26 + Astro 7）

### 1. Node 版本管理：fnm

fnm 由 WinGet 安装（`fnm 1.39.0`），Node 26.13.1 装在
`%APPDATA%\fnm\node-versions\v26.13.1`，并已设为 `default` 别名。

`C:\Users\LB\Documents\WindowsPowerShell\profile.ps1` 已写入 shell 集成：

```powershell
if (Get-Command fnm -ErrorAction SilentlyContinue) {
    fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression
}
```

- `--use-on-cd` 会在 `cd` 进入含 `.node-version` 的目录时自动切换版本
- 项目根目录已有 [`.node-version`](../../.node-version)（`26.13.1`）
- 验证：新开终端执行 `node -v` → `v26.13.1`、`fnm current` → `v26.13.1`

> ⚠️ 系统级 `C:\Program Files\nodejs` 仍是 **Node 22.20.0**。只有经过 fnm 初始化的 shell（PowerShell / VSCode 集成终端）才会用 26。cmd、Git Bash、GUI 工具或未加载 profile 的进程仍会拿到 22，跑 Astro 7 会直接报错。彻底避免的办法是卸载 Node 22（需要管理员权限），或为对应 shell 也加 fnm 初始化。

### 2. 依赖

```powershell
npm i astro@latest      # 7.4.12，依赖 vite ^8.3.6
npm uninstall vite      # 移除 Astro 6 时期的 vite 7 pin
npm ls vite             # 期望：只有一条 vite@8.x（@tailwindcss/vite 共用）
```

### 3. 验证

```powershell
npm run build   # 2 页静态产物，无警告
npm run dev     # 桌面 1440 / 移动 390 渲染与升级前一致
```

## 历史方案（Astro 6 + Node 22，保留备查）

Node 卡在 22.20.0 时期曾这样组合：

```powershell
npm i astro@^6.4.8
npm i -D vite@^7.3.8     # 让根目录只有一份 vite，与 Astro 6 对齐
npm run build
```

升级顺序建议：**Node → Astro → 移除 vite pin → 构建复验**，避免再次出现两代 Vite 混用。

## 排查命令速查

```powershell
node -v
npm view astro@latest engines
npm ls vite
fnm list
```
