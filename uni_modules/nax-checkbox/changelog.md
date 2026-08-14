## 0.1.5（2026-08-14）
- 精简 readme：移除内部开发向内容（设计说明 / 实现细节 / 平台差异实现等），只保留安装、用法、API、主题等用户文档
## 0.1.4（2026-08-11）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.3（2026-08-07）
- 支持 iOS 端：走 `#ifndef APP-ANDROID` 公共注入分支，无额外端差异代码，iOS 直接可用
## 0.1.2（2026-07-31）
- 修复 Android 端 group 注入使用 `null` 默认值时被推断为 `Void` 的运行时崩溃：通过 `APP-ANDROID` 让 checkbox-group 提供普通 `Ref` 状态，checkbox 使用同类型默认值和明确函数兜底。其它端保持原有注入实现与行为。
## 0.1.1 (2026-07-29)
- 移除第三方组件库参考表述，完善独立组件文档。

## 0.1.0（2026-07-19）

- 初版 `nax-checkbox` / `nax-checkbox-group`
- 支持 Checkbox 主能力：单独使用 / 组使用、shape、size、max、labelDisabled、activeColor
- 主题弱依赖 `nax-ui-theme`，勾选图标依赖 `nax-icon`
