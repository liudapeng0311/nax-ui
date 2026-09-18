## 0.2.1（2026-09-18）
- 修复规则 `trigger` 不生效（用户反馈：设置 `trigger: ['blur', 'change']` 后值已改动，错误提示仍不消失）：此前 `nax-form` 已提供字段校验入口但库内无消费方，`nax-form-item` 的控件插槽也无法挂载事件，字段级校验只能由业务侧手动调 `validateField(prop, event)` 触发
- `nax-form-item` 新增向插槽内表单控件提供字段级校验入口 `naxFormItemValidate(event, value)`；`NaxFormState` 新增 `validateOneWithValue(prop, event, value)`
- 控件驱动的校验使用控件传入的当前值而非读 `model`：业务侧 `model` 多在 `@change` / `@blur` 时才同步，读 `model` 会取到旧值，错误提示依然不消失
- 公共 `validate()` / `validateField()` 仍从 `model` 取值，快照与重置逻辑不变
- 全端一致（无条件编译差异）：Android / iOS / 鸿蒙 / Web / 小程序行为相同
## 0.2.0（2026-08-27）
- 新增 `labelSize` 标签字号属性：`nax-form` 表单级统一（空串跟随组件默认 15px），`nax-form-item` 可单项覆盖（空跟随 form）
## 0.1.8（2026-08-21）
- 修复 `TypeError: root.getAny is not a function`（Web 端用户反馈）：对象 props（model / rules / 规则项）在部分场景下不是真实 UTSJSONObject 实例（Web 普通/响应式对象、App 渲染层桥接等），getAny/set 方法丢失导致校验与快照全部失效。
## 0.1.7（2026-08-18）
- 蒸汽模式（`VUE3-VAPOR`）兼容修复：`nax-form-item__label-wrap--top` 的下级选择器规则用 `#ifndef VUE3-VAPOR` 条件编译隔离，消除 "Invalid selector" 警告；VDOM/Web/小程序行为不变
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
