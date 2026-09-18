## 0.3.1（2026-09-18）
- 接入 `nax-form` 表单校验联动：注入 `nax-form-item` 提供的字段级校验入口，输入值变化时按 `change`、失焦时按 `blur`、点击清空时按 `change` 回调，使规则 `trigger: ['blur', 'change']` 自动生效（此前需业务侧手动调 `validateField`）
- 校验使用控件当前值而非业务侧 `model`（`model` 多在 `@change` / `@blur` 才同步），值改对后错误提示即时消失
- 未置于 `nax-form-item` 内时为空实现，行为不变；全端一致（无条件编译差异）
## 0.3.0（2026-09-07）
- 新增 `right` 插槽：搜索框最右侧自定义区（如相机/扫码入口），不受 `showAction` / `animation` 影响，可与搜索/清除按钮共存；插槽内点击事件由内容自行绑定
## 0.2.4（2026-09-01）
- 修复 `modelValue` 被外部置 null 时崩溃（`Cannot read property length of null`，同 nax-input 0.2.6 修复）：`useStorage` 置 null 删除 key 等场景下 v-model 传入 null，`innerValue` 在初始化与 `modelValue` watch 双入口统一规整为空串；外部置 null 显示为空串，其它行为不变
## 0.2.3（2026-08-19）
- 修复蒸汽模式（App Android / iOS / HarmonyOS）输入文字显示为白色不可见：原生 input 默认文字色改为字面量内联样式，并通过 `custom-class` 支持暗色主题；Web / 微信小程序行为保持不变
## 0.2.2（2026-08-18）
- 蒸汽模式兼容：移除 `.nax-search__action-text` 中已废弃的 `lines: 1` 声明（仅 VDOM 支持，Vapor 下告警），改用 `<text>` 的 `:max-lines="1"` 属性
- 蒸汽模式（`VUE3-VAPOR`）兼容修复：下级选择器规则用 `#ifndef VUE3-VAPOR` 条件编译隔离，消除 "Invalid selector" 警告；VDOM/Web/小程序行为不变
## 0.2.1（2026-08-14）
- 移除废弃兼容属性 `clearabled`、`bgColor`，仅保留标准写法 `clearable`、`background`
- 事件语义对齐 nax-input / uni-app x 原生 input：`change` 不再与 `input` 同时触发，改为**失焦时内容与聚焦时不同才触发**；`input` 保持输入过程中每次触发
- 注意：`change` 触发时机变化，监听 `@change` 的调用方行为会改变
## 0.1.6（2026-08-12）
- readme 平台说明移除内部实现细节（条件编译、鸿蒙内联居中说明）
## 0.1.5（2026-08-11）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.4（2026-08-07）
- 支持 iOS 端：走 `#ifndef APP-HARMONY` 公共分支，无额外端差异代码，iOS 直接可用
## 0.1.3（2026-08-01）
- 移除第三方组件库参考表述，完善独立组件文档。
## 0.1.2（2026-07-27）

- 修复鸿蒙端暗黑模式下搜索输入区仍显示浅色背景的问题
- `APP-HARMONY` 分支改为优先解析 `--nax-color-bg-hover`，变量不可用时回退 `#f3f3f5`；其他端行为保持不变

## 0.1.1（2026-07-22）

- 修复鸿蒙端搜索框背景不显示（CSS 变量 background 实色 / 内联兜底）

## 0.1.0（2026-07-22）

- 初版：`nax-search` 搜索框
- 支持 Search 主能力：`shape` / `showAction` / `animation` / `search` / `custom` / 清除 / label
- 主题弱依赖 `--nax-*`；依赖 `nax-icon`
