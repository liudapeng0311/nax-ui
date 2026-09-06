# docs-ox（试验项目）

> **⚠️ 试验项目（Experimental）**：本工程是 nax-ui 文档站的试验性分支方案，处于探索验证阶段，
> 结构与流程可能随时调整，不承诺稳定性。线上正式文档站仍是仓库根目录的 `docs-site`（VitePress）。

## 是什么

基于 [OxUniPress](https://www.npmjs.com/package/@ox-uni-press/cli)（uni-app x 跨平台 Markdown 文档框架）的
nax-ui 文档宿主：同一套 Markdown 源，构建为 uni-app x 应用，可运行于 Web / Android / iOS / 鸿蒙。

与 `docs-site` 共享文档数据源：组件演示分组来自 `docs-site/scripts/example-sections/`，侧边栏分组由
`scripts/sync-sidebar.mjs` 从 `docs-site/.vitepress/sidebar-data.mjs` 程序化同步。

## 目录说明

| 目录 / 文件 | 说明 |
|---|---|
| `docs/` | Markdown 文档源（与 docs-site 内容同源，已适配 OxUniPress 语法） |
| `content/` | `npm run build` 产物（运行时数据 + 资源），提交进仓库供 App 端直接使用 |
| `components/demo-*/` | 各组件的完整演示 wrapper（右侧手机框与窄屏内联共用），为本站定制 |
| `uni_modules/ox-uni-press/` | 文档框架插件副本，其中 demo-host / ast-renderer / doc.uvue / sidebar 为本站定制，升级插件时注意保留 |
| `uni_modules/nax-*` | nax-ui 组件包副本（供演示 wrapper 真机渲染） |
| `scripts/` | 内容构建与同步脚本（sync-sidebar.mjs / insert-demos.mjs 等） |
| `static/` | uni-app 静态资源（logo、赞赏码等） |

## 常用命令

```bash
npm install          # 安装构建依赖（@ox-uni-press/cli）
npm run build        # docs/ -> content/（改动 Markdown 后必须重跑）
npm run dev          # 监听模式
npm run preview      # 纯内容预览（交互 Demo 降级为源码展示）
```

页面运行：HBuilderX 打开本工程，"运行到浏览器"或"运行到手机"。

## 说明

- 收款码图片（`static/reward/`）遵循仓库既有约定：本地保留、随部署发布，不入 git
- 组件文档顶部的交互演示依赖 `demo-host` 分发链，组件名与 `components/demo-*` 一一对应
