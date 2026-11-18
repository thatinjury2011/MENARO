# Astro 工具链版本踩坑（Node / Astro / Vite）

> 首次记录：2026-11-18（P0 脚手架阶段）｜影响范围：`npm run build` 直接失败

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

## 解决（当前生效方案）

```powershell
npm i astro@^6.4.8
npm i -D vite@^7.3.8     # 让根目录只有一份 vite，与 Astro 6 对齐
npm ls vite              # 期望：只有一条 vite@7.x
npm run build
```

## 何时可以升级回 Astro 7

Node 升到 `>= 22.23.4`（推荐 24 LTS）之后，可以解除上面的 pin：

```powershell
# 先升级 Node，再执行
npm i astro@latest
npm uninstall vite        # Astro 7 搭配 vite 8，无需手动 pin
npm run build
```

升级时按 **Node → Astro → 移除 vite pin → 构建复验** 的顺序，避免再次出现两代 Vite 混用。

## 排查命令速查

```powershell
node -v
npm view astro@latest engines
npm ls vite
```
