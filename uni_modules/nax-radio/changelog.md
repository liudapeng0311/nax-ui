## 0.1.7（2026-09-18）
- 接入 `nax-form` 表单校验联动：注入 `nax-form-item` 提供的字段级校验入口，选中变化（含 `nax-radio-group`）按 `change` 回调，使规则 `trigger: 'change'` / `['blur', 'change']` 自动生效（此前需业务侧手动调 `validateField`）
- 校验使用控件当前值而非业务侧 `model`（`model` 多在 `@change` 才同步），选择后错误提示即时消失
- 未置于 `nax-form-item` 内时为空实现，行为不变；全端一致（无条件编译差异）
## 0.1.6（2026-08-18）
- 蒸汽模式兼容：`lines` CSS 声明迁移为 `<text>` 的 `:max-lines` 属性（官方蒸汽模式方案），消除 Vapor 运行时与 CSS 编译器警告
## 0.1.5（2026-08-14）
- 精简 readme：移除内部开发向内容（设计说明 / 实现细节 / 平台差异实现等），只保留安装、用法、API、主题等用户文档
## 0.1.4（2026-08-11）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
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
