# Figma MCP 接入问题 · 排查与修复手册

> 记录时间：2026-11-11 ｜ 环境：VS Code 1.145.3 + Copilot Agent Host ｜ 状态：**已解决并验证**
> 相关：[PROJECT_LOG](../PROJECT_LOG.md) §5 v1.0.0

---

## 1. 现象（按时间顺序）

| # | 现象 | 当时误判 |
| --- | --- | --- |
| 1 | 每次重启 VS Code，Figma MCP 都要重新弹浏览器授权 | 以为 token 没被保存 |
| 2 | 授权完成后当前对话里仍然没有 figma 工具可用 | 以为需要重载窗口 |
| 3 | 重载后装了官方插件，依旧 401 循环 | 以为插件也没用 |
| 4 | 日志反复出现 `MCP server "figma" requires authentication: HTTP 401 challenge` | 以为账号/网络问题 |

---

## 2. 根因（两层，缺一不可）

### 2.1 第一层：Agent Host 启动时不复用缓存的 OAuth token

- token **确实存了**：VS Code 侧日志显示 `Found 2 sessions for scopes: mcp:connect`，会话有效期 90 天（`expires in 7776000 seconds`）且可刷新。
- 但 Agent Host 是独立进程，启动时只发裸请求 → 401 → 触发重新授权。
- 相关线索：
  ```
  [warning] Authentication provider https://api.figma.com/ https://mcp.figma.com/mcp was not declared in the Extension Manifest.
  ```
  因为是手写 `mcp.json` 注册的服务器，没有扩展声明 auth provider，token 无法被自动转发。
- 只有当 VS Code 主动 `MCP authentication token forwarded for figma` 时，Agent Host 才能通过 —— 而这在裸配置下只在授权交互那一刻发生。

### 2.2 第二层：Figma 官方插件的 `mcp.json` 不符合 Agent Plugins 1.0.0 schema

装好官方插件后，Agent Host 日志出现 8 条相同警告（每启动一个会话刷一次）：

```
[WARNING] [rust:copilot_runtime::mcp::source_cache]
Ignoring invalid MCP configuration file
{"config_path":"...\agentPlugins\file-...-github-com-figma-mcp-server-guide\1a1c91534ff\mcp.json",
 "error":"missing the required \"$schema\" field"}
```

对照官方 schema `https://agent-plugins.org/schemas/1.0.0/mcp.schema.json`：

| 字段 | Figma 发布值 | 规范要求 | 结果 |
| --- | --- | --- | --- |
| `$schema` | 缺失 | **必填**，值必须是 `https://agent-plugins.org/schemas/1.0.0/mcp.schema.json` | ❌ |
| `type` | `"http"` | 枚举仅 `stdio` / `streamable-http` / `sse` | ❌ |
| `_meta` | 存在（工具图标/标题） | `additionalProperties: false` | ❌ |

→ Agent Host 直接丢弃整份配置，figma 服务器根本没被注册。

### 2.3 顺带确认：Figma 远端 MCP **不支持**固定 token

实测（均返回相同 401 OAuth challenge）：

```powershell
# A) Bearer
curl.exe -i -X POST https://mcp.figma.com/mcp `
  -H "Content-Type: application/json" -H "Accept: application/json, text/event-stream" `
  -H "Authorization: Bearer <任意值>" --data-binary "@init.json"

# B) Figma PAT
curl.exe -i -X POST https://mcp.figma.com/mcp `
  -H "X-Figma-Token: <任意值>" --data-binary "@init.json"
```

官方文档亦只描述 OAuth 登录，scope 仅 `mcp:connect`（PAT 拿不到）。
**结论：想"固定 token"只能自己拿 OAuth access_token 写进 headers（90 天需换），或本地起代理自动 refresh。**

---

## 3. 修复步骤（可复制）

### 步骤 1 · 克隆官方插件仓库

```powershell
git clone --depth 1 https://github.com/figma/mcp-server-guide `
  "$env:USERPROFILE\.cache\plugins\github.com-figma-mcp-server-guide"
```

### 步骤 2 · 注册插件（用户级 settings.json）

文件：`%APPDATA%\Code\User\settings.json`

```jsonc
"chat.pluginLocations": {
  "C:\\Users\\LB\\.cache\\plugins\\github.com-figma-mcp-server-guide": true
}
```

> VS Code 也会把插件同步一份到 `%APPDATA%\Code\agentPlugins\file-c-3A-...-figma-mcp-server-guide\<hash>\`，两侧都要保持修补后的内容。

### 步骤 3 · 修补插件 `mcp.json`（关键）

文件：`~\.cache\plugins\github.com-figma-mcp-server-guide\mcp.json`

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/mcp.schema.json",
  "mcpServers": {
    "figma": {
      "type": "streamable-http",
      "url": "https://mcp.figma.com/mcp",
      "headers": {
        "X-Figma-Plugin-Bundle": "figma_prod@2_2_193"
      }
    }
  }
}
```

要点：**加 `$schema`**、**`http` → `streamable-http`**、**删掉整个 `_meta`**。
代价：丢失工具图标与中文标题（纯外观）。

### 步骤 4 · 同步已生成的副本

```powershell
$src = "$env:USERPROFILE\.cache\plugins\github.com-figma-mcp-server-guide\mcp.json"
$dst = "C:\Users\LB\AppData\Roaming\Code\agentPlugins\file-c-3A-Users-LB-cache-plugins-github-com-figma-mcp-server-guide\1a1c91534ff\mcp.json"
Copy-Item $src $dst -Force
```

### 步骤 5 · 校验 schema（可选但推荐）

```powershell
pip install jsonschema --quiet
# 下载 schema 后用 jsonschema.validate(file, schema) 断言通过
```

### 步骤 6 · 重载窗口

`Ctrl+Shift+P` → `Developer: Reload Window`

---

## 4. 验证方法

### 4.1 日志（Agent Host）

文件：`~\.copilot\logs\process-<pid>-<n>.log`

```powershell
Select-String -Path $log -Pattern 'Service initialized as client' | Select-Object -Last 10
```

成功标志：

```
Service initialized as client
  protocol_version: 2026-07-28
  server_info: "Figma MCP Server"
```

且**不再出现** `Ignoring invalid MCP configuration file`。

### 4.2 日志（VS Code renderer）

文件：`%APPDATA%\Code\logs\<ts>\window<N>\renderer.log`

成功标志 —— 自动转发、**没有** `Opening authorization URL`：

```
[AgentHost] MCP authentication token forwarded for figma; awaiting the server's reconnection
[AgentHost] MCP server 'figma' accepted its authentication
```

### 4.3 真机调用

| 调用 | 期望 |
| --- | --- |
| `whoami` | 返回 handle / email / seat / plan |
| `list_shaders` | 返回 shader 列表 |

本次实测 whoami 输出：

```
handle: bo li
email : thatinjury2011@gmail.com
seat  : Dev    tier: pro
plan  : bo li's team (admin)  code_layers_enabled: true
```

---

## 5. 复发处理（插件自动更新后）

插件版本升级会**覆盖** `mcp.json`，症状立刻回到「重启就要授权 / 工具消失」。

症状自检：Agent Host 日志又出现 `missing the required "$schema" field`。

处理：重做 §3 步骤 3 + 步骤 4（并把 `X-Figma-Plugin-Bundle` 的版本号改成 `plugin.json` 里的新 version），然后重载窗口。

> 可考虑写一个 `PostToolUse` / 启动脚本自动打补丁；若后期频繁复发再实施。

---

## 6. 日志位置速查

| 用途 | 路径 |
| --- | --- |
| Agent Host（MCP 生命周期、401、配置丢弃） | `%USERPROFILE%\.copilot\logs\process-*.log` |
| VS Code 窗口日志根目录 | `%APPDATA%\Code\logs\<timestamp>\window<N>\` |
| 远端 MCP 授权日志 | `...\window<N>\exthost\httpsapi.figma.com httpsmcp.figma.commcp.log` |
| 单个 MCP 服务器日志 | `...\window<N>\mcpServer.*.log` |
| 渲染进程（token 转发） | `...\window<N>\renderer.log` |
| 插件同步产物 | `%APPDATA%\Code\agentPlugins\file-*\` |
| 插件源 | `%USERPROFILE%\.cache\plugins\` |

---

## 7. 备选方案（若将来又坏）

| 方案 | 做法 | 优点 | 缺点 |
| --- | --- | --- | --- |
| A. 固定 access_token | 用户级 `mcp.json` 里 `headers.Authorization: Bearer ${input:figma-token}` | 绕开 token 转发逻辑 | 90 天需手动更换；不能进版本控制 |
| B. 本地代理 + 自动 refresh | 写 Node 代理持有 refresh_token，`mcp.json` 指向 `http://127.0.0.1:3850/mcp` | 真正永久免验证 | 需要维护一个常驻进程 |
| C. 桌面版本地 MCP | `http://127.0.0.1:3845/mcp`，需开 Figma 桌面版 + Dev/Full 席位 | 无需 token | 无「写入画布」等 remote-only 能力 |
| D. 官方插件（当前方案） | 见 §3 | 工具最全、带 skills | 升级需重新打补丁 |
