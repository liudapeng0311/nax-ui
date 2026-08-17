# nax-picker

通用弹出容器，用于自定义弹层内容。支持从 **底部 / 中间 / 左侧 / 右侧** 弹出。

## 用法示例

```uvue
<nax-button label="打开" @click="show = true"></nax-button>
<nax-picker v-model:show="show" position="bottom">
  <view class="panel">
    <text>自定义内容</text>
  </view>
</nax-picker>
```

## Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| show | boolean | false | `v-model:show` 显隐 |
| position | string | bottom | bottom / center / left / right |
| round | boolean | true | 圆角 |
| mask | boolean | true | 遮罩 |
| maskClosable | boolean | true | 点遮罩关闭 |
| zIndex | number | 10070 | 层级 |
| duration | number | 280 | 动画 ms |
| width | string | '' | 宽度（居中默认约 86% 屏宽；左右抽屉默认约 78%） |
| height | string | '' | 高度（左右抽屉默认全屏高） |
| safeAreaInsetBottom | boolean | true | 底部安全区（仅 bottom） |
| customClass | string | '' | 根 class |
| customStyle | string | '' | 根 style |

## Events

| 事件 | 说明 |
|---|---|
| update:show | 显隐变更 |
| open | 打开开始 |
| opened | 打开动画结束 |
| close | 关闭完成 |
| click-mask | 点击遮罩 |
