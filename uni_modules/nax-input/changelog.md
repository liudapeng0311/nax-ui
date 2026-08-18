## 0.2.3（2026-08-18）
- 修复蒸汽模式（App 三端）输入文字显示为白色不可见：原生 input 文字/占位/图标颜色与暗色背景改由 `custom-class` 主题状态驱动的字面量内联样式（CSS 变量在蒸汽下不可靠）；暗色检测由 Android 扩展到 iOS / 鸿蒙
## 0.2.2（2026-08-18）
- 修复密码可见切换图标语义颠倒：密文显示 `eye-off`（当前不可见）、明文显示 `eye`（当前可见），各端行为一致
## 0.2.1（2026-08-14）
- 精简 readme：移除内部开发向内容（设计说明 / 实现细节 / 平台差异实现等），只保留安装、用法、API、主题等用户文档
## 0.2.0（2026-08-12）
- 事件语义对齐 uni-app x 原生 input：`change` 不再与 `input` 同时触发，改为**失焦时内容与聚焦时不同才触发**；`input` 保持输入过程中每次触发
- 注意：`change` 触发时机变化，监听 `@change` 的调用方行为会改变
## 0.1.15（2026-08-12）
- readme 平台说明移除内部实现细节（App 端 outline / box-sizing 条件编译说明）
## 0.1.14（2026-08-12）
- readme 移除 intro 中"不包含 type=select / type=textarea"的说明
## 0.1.13（2026-08-11）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.12（2026-08-07）
- 支持 iOS 端：App 端条件编译分支已覆盖 `APP-IOS`，iOS 直接可用
## 0.1.11（2026-07-31）
- 修复 Android 暗黑模式下输入框背景、边框、文字、占位符和操作图标回退成灰白色：在 `APP-ANDROID` 下通过 `custom-class` 识别主题，并向原生 input 下发实色兜底。iOS、鸿蒙、Web 与小程序行为保持不变。
## 0.1.10 (2026-07-29)
- 移除第三方组件库参考表述，完善独立组件文档。

## （2026-07-18）

- 字号阶梯改为 sm14 / **md16** / lg18；默认高度略增以匹配 16px 正文字号
## 0.1.9（2026-07-18）

- 仅鸿蒙：lg 加高至 56px（md 48 / sm 40）；input 使用固定 height + 等值 line-height 垂直居中，取消 height:100% 裁字；Web/其它端不变

## 0.1.8（2026-07-18）

- 仅鸿蒙：lg 加高至 52px、字号 15px，min-height 兜底，修复 lg 裁字（不影响 Web/其它端）

## 0.1.7（2026-07-18）

- 回退导致全端文字裁切的改动（line-height=字号、鸿蒙 height:auto）；恢复 height:100% + 上下 padding:0

## 0.1.6（2026-07-18）

- 修复鸿蒙 lg 文字被裁切：md/lg 增高；行高跟随字号；鸿蒙端 input 使用 height:auto

## 0.1.5（2026-07-18）

- 新增 background 背景色（无边框可设色；也可用 --nax-input-bg）

## 0.1.4（2026-07-18）

- 无边框模式去掉白底与侧向描边/阴影感；原生 input 全端重置边框

## 0.1.3（2026-07-18）

- 新增 border-type：surround（四边，默认）/ bottom（仅下边框）

## 0.1.2（2026-07-18）

- 暂不支持 `type=idcard`（回落 text；待独立身份证键盘组件后再接入）

## 0.1.1（2026-07-18）

- 修复鸿蒙：有内容时不显示清除图标（不再依赖 focus 事件）
- 修复 Web：点击清除无效（blur 先于 click 卸载按钮；touchstart 提前清空 + 布局防遮挡）
## 0.1.0（2026-07-18）

- 初版 `nax-input` 单行输入框
- 功能支持 Input 主能力：`v-model` / `type` / `clearable` / `password` 可见切换 / `border` / `inputAlign` / `maxlength` / `trim` 等
- 不支持 `type=select`（请用后续 `nax-select`）、不支持 `type=textarea`（请用后续 `nax-textarea`）
- 支持 `prefixIcon` / `suffixIcon` 与 `prefix` / `suffix` 插槽
- 事件：`update:modelValue` `input` `change` `focus` `blur` `confirm` `click` `clear`
