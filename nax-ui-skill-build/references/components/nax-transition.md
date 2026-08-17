# nax-transition

uni-app x 轻量进退场过渡组件。用 class + CSS transition 实现，供遮罩、弹层、选择器等复用。

## 用法示例

```uvue
<nax-button label="切换" @click="visible = !visible"></nax-button>

<nax-transition :show="visible" name="slide-up">
  <view class="panel">
    <text>从下往上</text>
  </view>
</nax-transition>
```

## Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| show | boolean | false | 是否显示 |
| name | string | fade | 预设：fade / slide-up / slide-down / slide-left / slide-right / zoom / fade-up |
| duration | number | 280 | 时长（ms），0 表示无动画直接切换 |
| appear | boolean | false | 首次挂载且 show 时是否播放进场动画 |
| timing-function | string | ease-out | 缓动函数 |
| custom-class | string | 空 | 根节点扩展 class |

## Events

| 事件 | 说明 |
|---|---|
| before-enter | 进场开始 |
| after-enter | 进场结束 |
| before-leave | 退场开始 |
| after-leave | 退场结束（DOM 已卸载） |

## Slots

| 名称 | 说明 |
|---|---|
| default | 需要过渡的内容 |
