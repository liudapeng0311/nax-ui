## 0.1.5（2026-08-18）
- 蒸汽模式（`VUE3-VAPOR`）兼容修复：`nax-grid-item--card` 的下级选择器规则用 `#ifndef VUE3-VAPOR` 条件编译隔离，消除 "Invalid selector" 警告；VDOM/Web/小程序行为不变
## 0.1.4（2026-08-14）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.3（2026-08-07）
- 兼容性声明：补充 iOS（`APP-IOS`）端支持，package.json 平台标记同步为 `√`
## 0.1.2（2026-07-31）
- 修复 Android（`APP-ANDROID`）`ComputedRef cannot be cast to java.lang.Void`：容器改为提供同步的 `Ref` 状态，子项以同类型 `ref(...)` 默认值注入，避免 `null` 被推断为 `Void`。
- Web、iOS、HarmonyOS 与小程序保持既有的 computed 注入行为。
## 0.1.1 (2026-07-29)
- 移除第三方组件库参考表述，完善独立组件文档。

## 0.1.0（2026-07-20）

- 初版 `nax-grid` / `nax-grid-item`
- `col` / `border` / `align` / `gap` / `hover`
- 全端 flex 布局；provide/inject 下发列数与边框
- 点击回传 index；可省略 index 自动编号
- 内置按压态，无需全局 hover class
