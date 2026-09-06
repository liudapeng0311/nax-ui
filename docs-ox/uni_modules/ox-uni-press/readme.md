# ox-uni-press（OxUniPress 客户端运行时）

基于 uni-app x 的跨平台 Markdown 文档运行时。配合 `@ox-uni-press/cli` 生成的结构化内容数据，将同一套 Markdown 文档渲染为 Web / Android / iOS / 鸿蒙可用的文档应用。

```text
你的 Markdown 文档
      |
      v
@ox-uni-press/cli（Node 构建端：解析、路由、搜索索引）
      |
      v
content/ 目录下的强类型数据文件
      |
      v
本插件（uni-app x 运行时：渲染、导航、搜索、主题）
```

本插件**不依赖 uniCloud，可独立运行**（内置内容模式）。可选安装 `ox-uni-press-cloud` 启用远程内容更新。

## 目录

- [功能](#功能)
- [环境要求](#环境要求)
- [安装 CLI](#安装-cli)
- [快速开始](#快速开始内置内容模式无需-unicloud)
- [编写内容](#编写内容)
- [站点配置](#站点配置)
- [内容更新工作流](#内容更新工作流)
- [运行时 API](#运行时-api)
- [常见问题](#常见问题)
- [平台说明与已知边界](#平台说明与已知边界)

## 功能

- AST 结构化渲染：标题、段落、行内样式、链接、图片、列表、引用、代码块、表格、分隔线
- 扁平化渲染架构，组件无递归，规避 UTS 平台对组件自引用的支持差异
- 一个通用文档页承载所有文档，通过路径参数区分，无需为每篇文档注册原生页面
- 侧边栏导航 + 当前页高亮；宽屏常驻侧边栏与页内目录（滚动跟随），窄屏抽屉式侧边栏
- 全文搜索（标题/章节/正文加权，构建端生成索引）
- 深色模式：浅色 / 深色，顶栏一键循环切换
- 首页布局（hero 按钮区 + features 卡片）
- 代码复制、图片预览、404 与加载骨架屏
- 顶部状态栏安全区自适应；系统返回键拦截（先关抽屉/搜索，再回退站内历史）
- 上一页/下一页导航（按侧边栏顺序）

## 环境要求

| 依赖 | 版本要求 | 用途 |
|---|---|---|
| HBuilderX | 支持 uni-app x 的最新版 | 创建宿主工程、运行和打包 |
| Node.js | >= 24 | 运行内容构建 CLI |
| @ox-uni-press/cli | latest（npm） | 将 Markdown 构建为内容数据 |

## 安装 CLI

`@ox-uni-press/cli` 是 Node 命令行工具，负责把 Markdown 构建为插件可消费的内容数据（生成 `content/` 数据文件）。它**不是本插件的运行依赖**，只在你自己的电脑上构建内容时使用。两种使用方式任选其一：

**方式 A：全局安装一次（推荐，后续命令短）**

```bash
npm i -g @ox-uni-press/cli
```

安装后即可在任何目录直接使用短命令，本文档后续示例均采用此形式：

```bash
ox-uni-press build docs --out your-project/content
```

**方式 B：不安装，用 npx 临时执行**

不污染全局环境，每次执行时自动拉取包（首次需联网下载）：

```bash
npx @ox-uni-press/cli build docs --out your-project/content
```

> 两种方式效果完全相同。国内网络拉取缓慢时，可先为 npm 配置镜像源。验证安装成功：`ox-uni-press --help`（或 `npx @ox-uni-press/cli --help`）能打印用法说明。

## 快速开始（内置内容模式，无需 uniCloud）

### 1. 创建宿主工程

HBuilderX 新建一个空的 uni-app x 工程。完成后工程内至少有 `App.uvue`、`main.uts`、`pages.json`、`manifest.json`。

### 2. 安装插件

从 DCloud 插件市场搜索并安装 `ox-uni-press`（或手动复制本目录到工程的 `uni_modules/` 下）。安装后工程内出现 `uni_modules/ox-uni-press/`。

### 3. 整理你的 Markdown

在任意位置准备一个文档目录（本例叫 `docs/`）：

```text
docs/
├─ index.md              # 站点首页（必须，使用 layout: home）
└─ guide/
   ├─ introduction.md    # -> /guide/introduction
   └─ quick-start.md     # -> /guide/quick-start
```

`index.md` 示例：

```yaml
---
layout: home
hero:
  name: MyDocs
  text: 我的产品文档
  tagline: 基于 OxUniPress 构建
  actions:
    - text: 快速开始
      link: /guide/quick-start
      theme: brand
features:
  - title: 跨平台
    details: 同一套内容运行在 Web 与 App
---

正文（首页也可以不写正文）。
```

普通页面示例（`guide/quick-start.md`）：

```yaml
---
title: 快速开始
description: 五分钟上手
order: 1
---

# 快速开始

支持 **加粗**、*斜体*、`行内代码`、[链接](/guide/introduction)、图片、列表、引用、代码块、表格。
```

### 4. 构建内容到工程

在 `docs/` 所在目录执行：

```bash
ox-uni-press build docs --out your-project/content
```

> 未全局安装 CLI 时，把 `ox-uni-press` 换成 `npx @ox-uni-press/cli` 即可，见[安装 CLI](#安装-cli)。

- 第一个参数是 Markdown 根目录
- `--out` 指向宿主工程内的输出目录（示例中为 `content/`）

成功后输出 `content/manifest.uts`、`content/documents.uts` 等文件。如果 frontmatter 写错、路由重复或 Markdown 无法解析，会报出**精确到文件与行号**的错误，修复后重跑即可。

### 5. 注册内容提供者

编辑宿主工程 `App.uvue`：

```uts
<script lang="uts">
import { registerOxUniPress, createLocalProvider } from '@/uni_modules/ox-uni-press/utils/runtime.uts'
import { siteInfo, sitePages, navigation, sidebarGroups, searchIndex } from './content/manifest.uts'
import { documents } from './content/documents.uts'

export default {
  onLaunch() {
    registerOxUniPress({
      provider: createLocalProvider(siteInfo, sitePages, navigation, sidebarGroups, searchIndex, documents),
    })
  },
}
</script>
```

### 6. 注册文档页

编辑宿主工程 `pages.json`，将插件内置的通用文档页设为首页：

```json
{
  "pages": [
    {
      "path": "uni_modules/ox-uni-press/pages/doc/doc",
      "style": {
        "navigationStyle": "custom",
        "navigationBarTitleText": "MyDocs"
      }
    }
  ],
  "globalStyle": {
    "navigationStyle": "custom"
  }
}
```

### 7. 运行

HBuilderX 中运行到 Web 或 App。内置内容模式完全离线可用，不依赖任何后端。

**零配置默认品牌**：安装本插件后，即使不配置 `site.logo` / `site.favicon`，顶栏也会显示插件内置的默认 logo，Web 端浏览器标签栏自动注入默认图标；配置后则使用你自己的资源。

**验证要点**：能看到首页 hero 与 features 卡片；点"快速开始"能跳转；左侧边栏能切换页面；顶栏搜索能出结果；月亮图标可切换深色模式。全部正常即接入完成。

## 编写内容

### 文件即路由

| 文件位置 | 访问路径 |
|---|---|
| `index.md` | `/`（站点首页） |
| `guide/quick-start.md` | `/guide/quick-start` |
| `about.md` | `/about` |

路由冲突（两个文件解析为同一路径）在构建时报错，不会静默覆盖。文件名建议使用小写字母、数字和连字符。

### frontmatter 字段

| 字段 | 类型 | 说明 |
|---|---|---|
| `title` | string | 页面标题；未设置时取正文第一个一级标题 |
| `description` | string | 页面描述，用于搜索摘要 |
| `layout` | `"doc"` \| `"home"` | 页面布局，默认 `doc`；`home` 仅用于站点首页 |
| `order` | number | 侧边栏排序权重，越小越靠前 |
| `draft` | boolean | 草稿；`ox-uni-press build` 默认跳过，加 `--draft` 参数时包含 |
| `hero` | object | 仅首页有效：`name` / `text` / `tagline` / `actions[{ text, link, theme }]` |
| `features` | array | 仅首页有效：`[{ icon, title, details, link }]`（icon 与 link 可选） |

> frontmatter 使用 YAML 子集：标量、数组（块式/行内）、一层嵌套对象；**不支持 Tab 缩进**。未知字段会收到构建警告并保留在 meta.custom。校验失败（如 action 缺少 link）会报出字段路径与行号。

### 站点品牌（logo / favicon）

站点配置中的 `site.logo` / `site.favicon` 都是**可选项**：

- 未配置时，插件自动使用**内置默认品牌资源**（顶栏 logo 与 Web 浏览器标签图标），零配置即可运行。
- 配置后，改为使用你自己的资源，路径应以 `/` 开头并指向宿主工程可达位置（如 `/static/ox_logo.png`）。App 端需保证资源随包打包，Web 端部署时保证路径可达。

### Markdown 支持范围

| 元素 | 支持 |
|---|---|
| 标题 | `#` ~ `######`，自动生成锚点 |
| 行内样式 | 加粗、斜体、删除线、行内代码、硬换行 |
| 链接 | 站内链接按路由跳转；外部链接 App 端降级为"复制链接"，Web 端新窗口打开 |
| 列表 | 有序/无序，支持嵌套 |
| 引用块 | 支持嵌套行内元素 |
| 代码块 | 围栏代码块（```语言），带复制按钮 |
| 表格 | GFM 管道表格 |
| 图片 | 见下方说明 |
| HTML | 行内/块级 HTML 默认禁用（跨端一致性考虑） |

### 图片

正文图片构建时被拷贝到 `content/assets/`，引用路径改写为 `/assets/<相对路径>`：

```markdown
![截图](./images/demo.png)
```

内容预览服务器直接可用；宿主工程内运行时，请将该 assets 目录部署到对应可达路径，或直接使用网络图片 URL。

## 站点配置

在 Markdown 根目录下创建 `.ox-uni-press/config.ts`：

```ts
import { defineConfig } from '@ox-uni-press/core'

export default defineConfig({
  site: {
    title: 'MyDocs',              // 站点名，用于 App 顶栏与页面标题
    description: '站点描述',
    lang: 'zh-CN',
    // logo: '/static/ox_logo.png',   // 可选；未配置时使用插件内置默认 logo
    // favicon: '/static/favicon.png', // 可选；未配置时 Web 端使用插件内置默认图标
    footer: {
      copyright: '© 2026 MyDocs',
      beian: '京ICP备xxxxxxx号',   // 可选
      links: [{ text: 'GitHub', link: 'https://github.com' }],
    },
  },
  theme: {
    nav: [                         // 顶部导航（渲染端当前以侧边栏为主，nav 供头部导航扩展使用）
      { text: '指南', link: '/guide/quick-start' },
    ],
    sidebar: 'auto',               // 按目录自动分组
    outline: { depth: 2 },         // 宽屏页内目录层级
  },
})
```

自动侧边栏规则：每个一级子目录一个分组（组名即目录名），根目录文件归入无标题分组排在最前；组内按 frontmatter `order` 升序，未设置时按文件名排序。

## 内容更新工作流

```bash
# 开发时：监听变更持续重建（包含草稿）
ox-uni-press dev docs --out your-project/content

# 发布前：生产构建（默认跳过草稿）
ox-uni-press build docs --out your-project/content
```

内置模式下，修改文字内容需要**重新构建并重新打包 App**。若希望普通内容更新不发版，安装 `ox-uni-press-cloud` 使用远程内容模式（见下文）。

## 运行时 API

### registerOxUniPress(options)

在 `App.uvue` 的 `onLaunch` 中调用，整个应用只需一次：

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `provider` | ContentProvider | 是 | 内容提供者 |
| `clientVersion` | string | 否 | 客户端版本号，远程模式版本协商用 |

### createLocalProvider(...)

内置内容模式。六个参数依次为生成文件 `content/manifest.uts` 导出的 `siteInfo / sitePages / navigation / sidebarGroups / searchIndex` 与 `content/documents.uts` 导出的 `documents`。数据为强类型字面量，运行时零解析成本。

### createUniCloudProvider(options)（可选，需 ox-uni-press-cloud）

```uts
registerOxUniPress({
  provider: createUniCloudProvider({
    objectName: 'ox-uni-press-reader',
    siteId: 'my-site',
    // 断网且无缓存时的兜底，推荐传入内置快照保证离线可读
    fallback: createLocalProvider(siteInfo, sitePages, navigation, sidebarGroups, searchIndex, documents),
    // cache: true,            // 持久缓存开关，默认开启
    // verifyChecksum: true,   // 页面校验开关，默认开启
  }),
})
```

读取顺序：**网络 -> 内存缓存 -> 持久缓存（按发布版本隔离）-> fallback 兜底**。页面按需下载并缓存，二次访问离线可读；云端切换发布版本后自动清理旧缓存。

### 错误处理

Provider 错误统一携带 `ox-uni-press:<CODE>|` 前缀：

```uts
import { providerErrorCode } from '@/uni_modules/ox-uni-press/utils/runtime.uts'

const code = providerErrorCode(err)
if (code === 'CLIENT_UPGRADE_REQUIRED') {
  // 引导用户升级 App
}
```

| 错误码 | 含义 | 建议处理 |
|---|---|---|
| `PAGE_NOT_FOUND` | 页面不存在 | 展示 404（文档页已内置处理） |
| `CLIENT_UPGRADE_REQUIRED` | 内容要求更高客户端版本 | 引导升级 App |
| `SCHEMA_TOO_NEW` | 内容 schema 高于客户端支持 | 引导升级 App |
| `CHECKSUM_MISMATCH` | 页面校验失败 | 重试；持续出现可关闭 `verifyChecksum` 并反馈 |
| `OFFLINE_NO_CACHE` | 断网且无缓存/兜底 | 提示检查网络 |
| `CLOUD_UNREACHABLE` | uniCloud 调用失败 | 依赖 fallback 兜底 |

## 常见问题

**页面显示"未注册 ContentProvider"**
`App.uvue` 没有在 `onLaunch` 调用 `registerOxUniPress`，或 import 路径与实际 `content/` 目录不符。

**页面 404**
确认文件在构建根目录内、未标记 `draft: true`（或构建时加了 `--draft`），并重新执行构建更新 `content/`。

**改了 Markdown 没生效**
内置内容是构建产物，改完需要重新构建再运行；开发期建议用 `ox-uni-press dev` 监听模式。

**文档里的图片不显示**
见上文"图片"一节：`/assets/` 路径在宿主工程内需要自行保证可达，或改用网络图片。

**搜索没有结果**
索引在构建时生成，新增页面后需重新构建；远程模式下索引随发布包更新。

**深色模式切换不生效**
请检查顶栏主题按钮是否正常循环切换浅色/深色；主题选择仅支持浅色 / 深色两档。

**按系统返回键直接退出了应用**
返回键优先关闭抽屉/搜索，其次回退站内浏览历史；无历史时交还系统（即退出）。这是单页面架构的预期行为。

## 平台说明与已知边界

- 组件递归渲染依赖 easycom；接入新平台前请在 HBuilderX 中验证。
- 行内 HTML 默认禁用；远程内容只允许结构化数据。
- 外部链接在 App 端以"复制链接"降级处理，Web 端新窗口打开。
- 自定义导航栏（`navigationStyle: custom`）顶部安全区通过 `uni.getWindowInfo().statusBarHeight` 动态计算注入 header（Web 端为 0 不受影响）。
- 站内文档导航都在同一原生页面内切换数据（原生页面栈仅一页），系统返回由页面 `onBackPress` 拦截：优先关闭抽屉/搜索，其次回退站内历史（上限 50 条），无历史时交还系统默认行为。
- 鸿蒙端：`uni.onThemeChange` 未实现（调用会抛 `undefined is not callable`）。主题仅支持浅色/深色手动切换，不提供系统主题跟随，无需该 API。
- 鸿蒙端：`uni.onWindowResize` 同样未实现，已条件编译跳过；宽窄屏布局只在页面加载时计算一次，旋转或分屏时不会自动切换。
- 全平台：避免使用非标准数组扩展方法（如 `Array.pushAll`）；统一使用 `push` + 显式循环以保证 ArkTS 兼容。
- uni-app x CSS 子集不支持 `max-width` 百分比值（Web 端正常、App 端编译报错），需要"固定上限 + 自适应"的宽度在运行时按 `getWindowInfo()` 计算像素值。
- 云端 Provider 的缓存与 checksum 校验逻辑需在真机验证（UTS 与 Node 的 JSON 序列化需逐字节一致）。

## 版本升级

- 升级本插件后建议同步升级 `@ox-uni-press/cli` 并重新构建内容，保持数据契约一致
- 远程模式下服务端会拒绝 schema 高于客户端的内容并返回升级错误码，不会白屏

## 更新日志

见 [changelog.md](./changelog.md)。许可证见 [license.md](./license.md)。
