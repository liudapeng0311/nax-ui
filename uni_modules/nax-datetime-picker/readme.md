# nax-datetime-picker

uni-app x 时间选择器（底部弹层 + `picker-view`），功能覆盖常用场景 DatetimePicker。

## 依赖

- `nax-icon`（触发条箭头）
- `nax-transition`（弹层进退场动画）
- `nax-ui-theme`（CSS 变量 `--nax-*`）

## 基础用法

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

## mode

| 值 | 列 |
|----|----|
| datetime | 年 月 日 时 分（+ 秒） |
| date | 年 月 日 |
| time | 时 分（+ 秒） |
| year-month | 年 月 |
| year | 年 |
| month-day | 月 日 |

## 常用 Props

| 属性 | 默认 | 说明 |
|------|------|------|
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

## 事件

confirm 回调字段：value / timestamp / formatted / year / month / day / hour / minute / second / mode。

另有 update:show、update:modelValue、cancel、change、open、close。

## 平台说明

- 全端原生 picker-view（含鸿蒙）。
- 鸿蒙禁用选项点选，请滑动后确认。
- 微信小程序滚动中点确认会被忽略。

> 说明：鸿蒙 `picker-view` 打开时的滚到目标动画为原生行为，**无法设置 duration**。未传 `min-date` 时默认近 30 年～当前+10 年，以缩短年列滚动距离。需要更早日期请显式传 `min-date`。
