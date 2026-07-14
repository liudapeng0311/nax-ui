# nax-ui 文档索引

本目录存放 **nax-ui**（uni-app x 通用 UI 组件库）的产品与工程规范。

## 文档列表

| 文档 | 说明 | 谁该读 |
|------|------|--------|
| [design-system.md](./design-system.md) | 设计规范：定位、命名、Token、API、样式、主题、质量门槛 | 设计与开发 |
| [component-inventory.md](./component-inventory.md) | 组件清单：分期、依赖、兼容策略、状态看板 | 开发与排期 |
| [theme.md](./theme.md) | 主题接入：`nax-ui-theme` 用法与覆盖优先级 | 业务接入与组件作者 |
| [../AGENTS.md](../AGENTS.md) | 给 Codex / 协作者的仓库约束（实现时强制遵守） | 所有 AI/贡献者 |

## 推荐阅读顺序

1. `design-system.md` — 先统一设计与 API 原则  
2. `component-inventory.md` — 再按分期选组件实现  
3. `theme.md` — 独立插件下的全局主题接入  
4. `AGENTS.md` — 编码/改文档时的硬约束  

## 仓库角色

| 路径 | 角色 |
|------|------|
| `uni_modules/nax-ui-theme/` | 主题 token 约定包 |
| `uni_modules/nax-button/` 等 | 独立 UI 插件 |
| `uni_modules/nax-ui/` | 套装骨架（可选，非必须） |
| `pages/` | 演示与文档示例页 |
| `docs/` | 规范与清单（本目录） |
| `AGENTS.md` | 自动化与人工协作约束 |

## 维护约定

- 新增组件：先更新 `component-inventory.md` 状态，再写代码与 demo
- 新增/修改 token：先改 `nax-ui-theme` + `design-system.md` / `theme.md`，再改组件
- 变更公共 API：先改 `design-system.md`
- 破坏性变更：必须在对应 changelog 记录
