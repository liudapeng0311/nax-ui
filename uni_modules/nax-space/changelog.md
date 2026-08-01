## 0.1.1（2026-08-01）
- 修复 Android 端 `nax-space-item` 注入使用 `null` 默认值时被推断为 `Void`，导致 `ComputedRef` 强转崩溃的问题；通过 `APP-ANDROID` 让父组件提供普通 `Ref` 状态，并让子组件使用同类型默认值，其它端行为保持不变。
## 0.1.0（2026-07-21）

- 初版 `nax-space` / `nax-space-item`
- `direction` / `size` / `wrap` / `align` / `justify` / `fill`
- 样式隔离 2.0：间距由 `nax-space-item` 吃 margin；容器负 margin 抵消末项外侧
