# nax-keyboard

`nax-ui` 自定义键盘（uni-app x / uvue）。

## 用法示例

```uvue
<nax-button label="打开数字键盘" @click="show = true"></nax-button>
<nax-keyboard v-model:show="show" mode="number" @change="onChange" @backspace="onBackspace" @confirm="onConfirm"></nax-keyboard>
```

## Props

| 属性 | 说明 | 默认 |
|---|---|---|
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

## Events

| 事件 | 说明 |
|---|---|
| update:show | 显隐变化 |
| change | 按键点击（不含退格），参数为按键字符 |
| backspace | 退格（支持长按连删） |
| confirm | 完成 |
| cancel | 取消 |
| open / close | 打开 / 关闭 |

## Slots

| 名称 | 说明 |
|---|---|
| default | 键盘上方自定义内容（如密码格预览） |
