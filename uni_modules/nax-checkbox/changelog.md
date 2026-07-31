## 0.1.2（2026-07-31）
- 修复 Android 端 group 注入使用 `null` 默认值时被推断为 `Void` 的运行时崩溃：通过 `APP-ANDROID` 让 checkbox-group 提供普通 `Ref` 状态，checkbox 使用同类型默认值和明确函数兜底。其它端保持原有注入实现与行为。
## 0.1.1 (2026-07-29)
- 移除第三方组件库参考表述，完善独立组件文档。

## 0.1.0（2026-07-19）

- 初版 `nax-checkbox` / `nax-checkbox-group`
- 支持 Checkbox 主能力：单独使用 / 组使用、shape、size、max、labelDisabled、activeColor
- 主题弱依赖 `nax-ui-theme`，勾选图标依赖 `nax-icon`
