## 0.1.3（2026-08-14）
- readme Props 说明补充中文描述（direction/size/align/justify 枚举值中文含义）
## 0.1.2（2026-08-07）
- 兼容性声明：补充 iOS（`APP-IOS`）端支持，package.json 平台标记同步为 `√`
## 0.1.1（2026-08-01）
- 修复 Android 端 `nax-space-item` 注入使用 `null` 默认值时被推断为 `Void`，导致 `ComputedRef` 强转崩溃的问题；通过 `APP-ANDROID` 让父组件提供普通 `Ref` 状态，并让子组件使用同类型默认值，其它端行为保持不变。
## 0.1.0（2026-07-21）

- 初版 `nax-space` / `nax-space-item`
- `direction` / `size` / `wrap` / `align` / `justify` / `fill`
- 样式隔离 2.0：间距由 `nax-space-item` 吃 margin；容器负 margin 抵消末项外侧
