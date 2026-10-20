# nax-form-render 变更记录

## 0.1.0（2026-10-20）
- 初版 `nax-form-render` 动态表单渲染器：由 schema（JSON 字符串 / 字段数组 / 含 `fields` 的对象）渲染表单项，`required` 自动生成校验规则
- 内部组合 `nax-form` + `nax-form-item`，标签、错误展示、字段注册与校验链路与手写表单完全一致；字段增删由 `nax-form-item` 的 `prop` watch 自动注册/注销
- 支持 16 类控件：`text` / `password` / `number-input` / `digit` / `tel` / `textarea` / `search` / `select` / `switch` / `radio` / `checkbox` / `checkbox-group` / `number` / `slider` / `rate` / `date` / `datetime` / `time` / `year-month` / `calendar` / `date-strip`
- **控件类型为封闭枚举**：受蒸汽模式渲染机制约束（模板编译期静态分析，`h()` / `resolveComponent()` 在 App 的 Vapor 模式不支持），渲染分支在源码内以 `v-if` / `v-else-if` 穷举；schema 出现枚举外的 `type` 时渲染可诊断提示而非静默空白
- 值回写统一走 `:model-value` + `@update:model-value`（`v-for` 内无法把 `v-model` 绑定到动态 key）。不用 `@change` 取值：各控件载荷不统一（`nax-select` / `nax-datetime-picker` 的 `change` 回传结构化数组/对象，`nax-input` / `nax-textarea` / `nax-search` 的 `change` 是「失焦且与聚焦时不同」语义）
- 端差异处理（`#ifdef APP-ANDROID || APP-IOS || APP-HARMONY`）：schema 解析读字段在 App 端走 `UTSJSONObject` API，Web / 小程序走字段访问
- 按控件类型分派初值：开关 `false`、多选 `[]`、数字类取 `min`、其余空串，避免控件拿到类型不符的值
- `nax-calendar` 无 `modelValue`，值取 `change` 载荷的 `result`，初值走 `default-date`
- 弹层类控件（`datetime-picker` / `calendar`）清除时同步复位展示文案
- Methods：`validate` / `validateField` / `resetFields` / `clearValidate` / `setSchema`（运行时替换 schema 并保留同名字段已有值）/ `getModel`
- Events：`update:modelValue` / `change`（带 `prop`）/ `confirm` / `open` / `close`
- demo：`pages/components/form-render`
