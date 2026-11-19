# Chrome 无头截图 ≠ 布局视口（像素校对踩坑）

> 首次记录：2026-11-19（首页逐页校对第 1 轮）｜影响范围：误判「页面横向溢出」

## 现象

用 `chrome --headless=new --window-size=390,6000 --screenshot=...` 截取移动端页面时，截图右侧出现「内容一直顶到画布边缘、箭头按钮被切掉」的样子，看起来像页面横向溢出。但同一份产物在浏览器里正常，`scrollWidth` 也没有超标。

## 根因

`--window-size` 设置的是**浏览器窗口**尺寸，不是布局视口。Windows 上 Chrome 有最小窗口宽度，请求 390 时实际布局视口更宽（本次约为 410），而 `--screenshot` 画布仍按 390 输出，于是右侧被裁掉 —— 是截图裁剪，不是布局溢出。

对比证据（同一页面，测量第一张产品卡的背景色跨度）：

| 请求宽度 | 卡片实测跨度 | 预期（`px-5` 两侧各 20） |
| --- | --- | --- |
| 390 | 20–389（370px） | 应为 350px ❌ |
| 500 | 20–479（460px） | 460px ✅ |

## 正确做法：用 CDP 量化

判断溢出**永远量 `scrollWidth` 与 `clientWidth`**，不要凭截图目测。

```powershell
# 1) 带调试端口启动（ps 里要用数组传参，别用逗号拼接字符串）
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
Start-Process -FilePath $chrome -ArgumentList @(
  '--headless=new','--disable-gpu','--remote-debugging-port=9333',
  "--user-data-dir=$env:TEMP\chrome-prof",'--window-size=390,800',
  'http://127.0.0.1:4322/'
)
# 2) 取 webSocketDebuggerUrl
curl http://127.0.0.1:9333/json
```

```js
// Node 22+ 自带全局 WebSocket，无需装 puppeteer
const { webSocketDebuggerUrl } = (await (await fetch("http://127.0.0.1:9333/json")).json())
  .find((t) => t.type === "page" && t.url.includes("4322"));

await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 900, deviceScaleFactor: 1, mobile: true });
const r = await ev(`(() => {
  const vw = document.documentElement.clientWidth;
  const bad = [];
  document.querySelectorAll("*").forEach((el) => {
    const b = el.getBoundingClientRect();
    if (b.width > 0 && b.right > vw + 0.5) bad.push(el.tagName + "." + String(el.className).slice(0, 60));
  });
  return { vw, scrollW: document.documentElement.scrollWidth, count: bad.length, bad: bad.slice(0, 8) };
})()`);
```

只有 `scrollWidth > clientWidth` 才是真的溢出；要截图就用 `Page.captureScreenshot`（配合 `captureBeyondViewport: true`），它会按真实布局视口出图。

## 顺带结论

`Emulation.setDeviceMetricsOverride` 下 `clientWidth` 在 1440/1920 会比 `innerWidth` 小 15px（滚动条）。所以「1920 视口」的真实可用宽度是 **1905**，内容区 1706 时左右各留 99.5px —— 比 Figma 里 1920 画布的 107px 少 7.5px，属正常现象，不必追。
