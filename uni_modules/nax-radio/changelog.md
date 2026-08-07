## 0.1.3（2026-08-07）
- 支持 iOS 端：走 `#ifndef APP-ANDROID` 公共注入分支，无额外端差异代码，iOS 直接可用
## 0.1.2（2026-08-01）
- 修复 Android 端 `inject(..., null)` 将 group 注入推断为 `Void`，导致 `RefImpl cannot be cast to java.lang.Void`：通过 `APP-ANDROID` 让 radio-group 提供普通 `Ref` 状态，radio 使用同类型默认值和明确函数兜底。其它端保持原有注入实现与行为。
## 0.1.1 (2026-07-29)
- 移除第三方组件库参考表述，完善独立组件文档。

## 0.1.0（2026-07-19）

- 初版 `nax-radio` / `nax-radio-group`
- 支持 Radio 主能力：组内单选、shape、size、labelDisabled、activeColor、wrap、width
- 主题弱依赖 `nax-ui-theme`，勾选图标依赖 `nax-icon`
