// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

// @formspree/ajax 的 package.json 里 "browser" 指向 dist/global.js（给 <script src> 用的
// IIFE 版本，没有任何 ESM 导出）。Vite 客户端构建默认优先 "browser"，会因此报
// `Missing export "initForm"`。这里把它显式指向真正的 ESM 入口。
const formspreeEsm = require.resolve('@formspree/ajax/dist/index.mjs');

// https://astro.build/config
// site 用于 canonical URL / sitemap / Astro.site 等绝对地址
export default defineConfig({
  site: 'https://menarobm.com',
  // 多语言：中文在根路径（/products/），英文加 /en/ 前缀（/en/products/）。
  // prefixDefaultLocale: false 表示默认语言（zh）不加前缀 —— 英文站上线不会改动任何现有中文 URL。
  i18n: {
    defaultLocale: "zh",
    locales: ["zh", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  server: {
    // Astro 默认端口是 4321，但在本机被 Hyper-V/WSL 的可保留端口段占用了：
    //   netsh int ipv4 show excludedportrange protocol=tcp  ->  4253-4352
    // 因此 4321 会报 `EACCES: permission denied ::1:4321`（端口被系统禁止绑定，
    // 与是否有进程占用无关）。这里改用 15200 —— 它在动态端口段（本机为 1024-15000）
    // 之外，不会被 Hyper-V/WSL 再次保留，换机也能用。
    port: 15200,
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@formspree/ajax': formspreeEsm,
      },
    },
  },
});
