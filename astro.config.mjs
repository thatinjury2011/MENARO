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
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@formspree/ajax': formspreeEsm,
      },
    },
  },
});
