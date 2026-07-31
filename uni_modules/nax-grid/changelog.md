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
