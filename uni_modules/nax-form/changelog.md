## 0.1.2 (2026-07-30)
- 修复 Android 端 `inject(..., null)` 将注入类型推断为 `Void`，导致 `ComputedRef cannot be cast to java.lang.Void` 并使表单项无法渲染：父表单统一提供 `Ref` 状态，子项使用同类型默认值与空函数兜底。
- 补充 `APP-ANDROID` 下表单、表单项、内容区、控件行和分隔线的 flex 拉伸与宽度约束。iOS、鸿蒙、Web 与小程序行为保持不变。

## 0.1.1 (2026-07-29)
- 移除第三方组件库参考表述，完善独立组件文档。

## 0.1.0（2026-07-19）

- 初版 `nax-form` / `nax-form-item`
- 支持 Form 主能力：model / rules / errorType / label* / borderBottom
- 方法：validate / validateField / resetFields / clearValidate / setRules
- 轻量校验：required / type / min / max / len / pattern / enum / whitespace / trigger
