## 0.1.4（2026-08-18）
- 蒸汽模式（`VUE3-VAPOR`）兼容修复：`segmented` 分割线页头/页脚的 2 条下级选择器规则用 CSS 条件编译隔离，消除 "Invalid selector" 警告；VDOM/Web/小程序行为不变
- 蒸汽模式兼容：`lines` CSS 声明改回 `<text>` 的 `:max-lines` 属性（官方蒸汽模式方案），消除 Vapor 运行时与 CSS 编译器警告
## 0.1.3（2026-08-18）
- 蒸汽模式兼容：移除 `<text>` 上不支持的 `lines` 属性，改为 CSS `lines` 声明（各文本 class 补齐 `lines: N;`），消除 App 蒸汽模式 warning
## 0.1.2（2026-08-14）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.1（2026-08-07）
- 兼容性声明：补充 iOS（`APP-IOS`）端支持，package.json 平台标记同步为 `√`
## 0.1.0（2026-07-31）
- 初版 `nax-card`（内容卡片）
- `title` / `extra` 页头文案
- 插槽 `header` / `default` / `footer` / `title` / `extra` / `cover`
- `bordered` / `size` sm|md|lg；`hoverable` 可选按压反馈
- `show-cover` / `show-footer` / `show-header` 控制区段（uvue 插槽探测受限）
