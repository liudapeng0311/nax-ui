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
