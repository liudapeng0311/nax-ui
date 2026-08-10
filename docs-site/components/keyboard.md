---
demo: keyboard
---

# nax-keyboard

> 当前版本：0.1.2（见 `changelog.md`）

`nax-ui` 自定义键盘（uni-app x / uvue）。
主要能力：
- 数字键盘 `mode="number"`（可带小数点）
- 车牌号键盘 `mode="car"`（中/英切换）
- 身份证键盘 `mode="card"`（含 `X`）
- 按键乱序 `random`
- 底部弹层 + 遮罩 + 顶部工具条

## 安装

```text
uni_modules/nax-keyboard
```

easycom 自动生效，页面直接使用 `<nax-keyboard />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 依赖

| 依赖 | 说明 |
|------|------|
| `nax-icon` | 退格图标 |
| `nax-transition` | 底部进退场 |
| `nax-ui-theme` | 主题 token（运行时弱依赖） |


## 代码示例

### 基础用法

```html
<nax-button label="打开数字键盘" @click="show = true"></nax-button>
<nax-keyboard v-model:show="show" mode="number" @change="onChange" @backspace="onBackspace" @confirm="onConfirm"></nax-keyboard>
```

### Props（摘要）

| 属性 | 说明 | 默认 |
|------|------|------|
| show | v-model:show 显隐 | false |
| mode | number / car / card | number |
| dotEnabled | number 模式是否显示 `.` | true |
| tooltip | 顶部工具条 | true |
| tips | 中间提示文案 | 按 mode 默认 |
| showTips | 是否显示中间提示 | true |
| cancelBtn / confirmBtn | 取消 / 完成按钮 | true |
| mask / maskClosable | 遮罩与点遮罩关闭 | true |
| random | 按键乱序 | false |
| safeAreaInsetBottom | 底部安全区 | true |

### Slot

| 名称 | 说明 |
|------|------|
| default | 键盘上方自定义内容（如密码格预览） |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | boolean | `false` | v-model:show 控制显隐 |
| mode | string | `'number'` | number \| car \| card，默认 number |
| dotEnabled | boolean | `true` | number 模式是否显示小数点，默认 true |
| tooltip | boolean | `true` | 顶部工具条，默认 true |
| tips | string | `''` | 中间提示文案 |
| showTips | boolean | `true` | 是否显示中间提示，默认 true |
| cancelBtn | boolean | `true` | 是否显示取消，默认 true |
| confirmBtn | boolean | `true` | 是否显示完成，默认 true |
| cancelText | string | `'取消'` | 取消文案，默认 取消 |
| confirmText | string | `'完成'` | 完成文案，默认 完成 |
| mask | boolean | `true` | 是否显示遮罩，默认 true |
| maskClosable | boolean | `true` | 点击遮罩是否关闭，默认 true |
| maskCloseAble | boolean | `true` | 同 maskClosable |
| zIndex | number | `10075` | 层级，默认 10075 |
| random | boolean | `false` | 是否打乱按键，默认 false |
| safeAreaInsetBottom | boolean | `true` | 底部安全区，默认 true |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| update:show | 显隐变化 |
| change | 按键点击（不含退格），参数 string |
| backspace | 退格 |
| confirm | 完成 |
| cancel | 取消 |
| open | 打开 |
| close | 关闭完成 |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 键盘上方自定义内容 |
