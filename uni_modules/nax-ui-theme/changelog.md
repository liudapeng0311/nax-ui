## 0.1.2（2026-07-16）

- 文档：主题接入改为 L0 默认色 / L1 启动配置 / L2 运行时切换
- 明确宿主 class 优先挂 layout，不必每页重复
## 0.1.1（2026-07-14）

- 主题挂载选择器由 `page` 改为 `.nax-theme`（兼容 uvue / 鸿蒙，仅 class 选择器）
- 暗色改为 `.nax-theme-dark`，移除 `page.nax-theme-dark`

## 0.1.0（2026-07-14）

- 初始化 token 约定包
- 提供 `theme/default.css` 默认浅色语义变量
- 提供 `theme/dark.css` 暗色覆盖（`.nax-theme-dark`）
- 文档说明与独立 `nax-*` 组件弱依赖接入方式
