# nax-datetime-picker

uni-app x 时间选择器（底部弹层 + `picker-view`）。

## 用法示例

```uvue
<nax-button label="选择日期时间" @click="visible = true"></nax-button>
<nax-datetime-picker
  v-model:show="visible"
  v-model="value"
  mode="datetime"
  title="选择时间"
  @confirm="onConfirm"
></nax-datetime-picker>
```

## Props — mode

| 值 | 列 |
|---|---|
| datetime | 年 月 日 时 分（+ 秒） |
| date | 年 月 日 |
| time | 时 分（+ 秒） |
| year-month | 年 月 |
| year | 年 |
| month-day | 月 日 |

## Props — 常用 Props

| 属性 | 默认 | 说明 |
|---|---|---|
| show | false | v-model:show |
| modelValue | 0 | 时间戳 ms 或日期字符串 |
| mode | datetime | 见上表 |
| min-date / max-date | 1950 / 当前+10年 | 可选范围 |
| show-second | false | 显示秒列 |
| show-unit | true | 列单位 |
| format | '' | 自定义 formatted |
| show-trigger | false | 内置触发条 |
| mask-closable | true | 点遮罩关闭 |
| safe-area-inset-bottom | true | 底部安全区 |

## 依赖

- `nax-icon`（触发条箭头）
- `nax-transition`（弹层进退场动画）
- `nax-ui-theme`（CSS 变量 `--nax-*`）

## 平台说明

- 鸿蒙禁用选项点选，请滑动后确认。
- 鸿蒙暗黑模式：组件自动移除原生滚轮默认的白色渐变遮罩。
- 微信小程序滚动中点确认会被忽略。
