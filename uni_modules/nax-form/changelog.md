## 0.1.6（2026-08-14）
- 精简 readme：移除内部开发向内容（设计说明 / 实现细节 / 平台差异实现等），只保留安装、用法、API、主题等用户文档
## 0.1.5（2026-08-12）
- readme 平台说明移除内部实现细节（Android provide/inject 类型推断与 APP-ANDROID 样式说明）
## 0.1.4（2026-08-11）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.3（2026-08-07）
- 支持 iOS 端：走公共注入与样式分支，App 端 flex 拉伸约束已覆盖 `APP-IOS`，iOS 直接可用
## 0.1.2（2026-07-31）
- 修复 Android 端 `inject(..., null)` 将注入类型推断为 `Void`，导致 `ComputedRef cannot be cast to java.lang.Void` 并使表单项无法渲染：父表单统一提供 `Ref` 状态，子项使用同类型默认值与空函数兜底。
- 补充 `APP-ANDROID` 下表单、表单项、内容区、控件行和分隔线的 flex 拉伸与宽度约束。iOS、鸿蒙、Web 与小程序行为保持不变。
## 0.1.1 (2026-07-29)
- 移除第三方组件库参考表述，完善独立组件文档。

## 0.1.0（2026-07-19）

- 初版 `nax-form` / `nax-form-item`
- 支持 Form 主能力：model / rules / errorType / label* / borderBottom
- 方法：validate / validateField / resetFields / clearValidate / setRules
- 轻量校验：required / type / min / max / len / pattern / enum / whitespace / trigger
