# nax-ui 文档索引

本目录存放 **nax-ui**（uni-app x 通用 UI 组件库）的产品与工程规范。

## 文档列表

| 文档 | 说明 | 谁该读 |
|------|------|--------|
| [design-system.md](./design-system.md) | 设计规范：定位、命名、Token、API、样式、主题、质量门槛 | 设计与开发 |
| [component-inventory.md](./component-inventory.md) | 组件清单：分期、依赖、兼容策略、状态看板 | 开发与排期 |
| [nax-video-headless.md](./nax-video-headless.md) | `nax-video` 无头视频播放器：行为契约、跨端边界、API、demo 与验收规范 | 视频组件作者与后续 AI |
| [popup-window.md](./popup-window.md) | 压窗屏跨端能力与小程序限制 | 弹层 / 反馈组件作者与业务 |
| [tabbar-routing.md](./tabbar-routing.md) | 自定义 nax-tabbar + 原生 tabBar/`switchTab` 秒切方案（鸿蒙性能） | 底栏 / 多页 Tab 接入 |
| [../AGENTS.md](../AGENTS.md) | 给 Codex / 协作者的仓库约束（实现时强制遵守） | 所有 AI/贡献者 |
| [../docs-site/](../docs-site/) | **组件文档站**（VitePress）：`npm run gen` 生成组件页 + `npm run dev` 本地预览 | 组件使用者 / 贡献者 |

## 推荐阅读顺序

1. `design-system.md` — 先统一设计与 API 原则  
2. `component-inventory.md` — 再按分期选组件实现  
3. `uni_modules/nax-ui-theme/readme.md` — 主题分档接入（默认能用、可选换肤）
4. `docs-site/guide/dark-mode.md` — 暗黑模式三态接入（跟随系统/浅色/深色，含各平台实现）
5. `nax-video-headless.md` — 实现无头视频播放器时的专项规范（按需）
6. `tabbar-routing.md` — 多页自定义底栏性能方案（按需）
7. `AGENTS.md` — 编码/改文档时的硬约束

## 仓库角色

| 路径 | 角色 |
|------|------|
| `uni_modules/nax-ui-theme/` | 主题 token 约定包；接入说明见包内 `readme.md` |
| `uni_modules/nax-button/` 等 | 独立 UI 插件 |
| `uni_modules/nax-ui/` | 套装骨架（可选，非必须） |
| `pages/` | 演示与文档示例页 |
| `docs/` | 规范与清单（本目录） |
| `docs-site/` | VitePress 组件文档站（独立 npm 工程；组件页由脚本从源码生成） |
| `AGENTS.md` | 自动化与人工协作约束 |

## 维护约定

- 新增组件：先更新 `component-inventory.md` 状态，再写代码与 demo
- 新增/修改 token：先改 `nax-ui-theme` 包内 README + `design-system.md`，再改组件
- 变更公共 API：先改 `design-system.md`
- 破坏性变更：必须在对应 changelog 记录
