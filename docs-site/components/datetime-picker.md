---
demo: datetime-picker
---

# nax-datetime-picker

> 当前版本：0.1.13（见 `changelog.md`）

uni-app x 时间选择器（底部弹层 + `picker-view`）。

## 安装

```text
uni_modules/nax-datetime-picker
```

easycom 自动生效，页面直接使用 `<nax-datetime-picker />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 基础用法

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

### mode

| 值 | 列 |
|----|----|
| datetime | 年 月 日 时 分（+ 秒） |
| date | 年 月 日 |
| time | 时 分（+ 秒） |
| year-month | 年 月 |
| year | 年 |
| month-day | 月 日 |

### 常用 Props

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

### 事件

confirm 回调字段：value / timestamp / formatted / year / month / day / hour / minute / second / mode。

另有 update:show、update:modelValue、cancel、change、open、close。

### 平台说明

- 全端原生 picker-view（含鸿蒙）。
- 鸿蒙禁用选项点选，请滑动后确认。
- 鸿蒙暗黑模式通过 `mask-top-style` / `mask-bottom-style` 移除原生滚轮默认的白色渐变遮罩；该分端处理由 `APP-HARMONY` 条件编译。
- 微信小程序滚动中点确认会被忽略。

> 说明：鸿蒙 `picker-view` 打开时的滚到目标动画为原生行为，**无法设置 duration**。未传 `min-date` 时默认近 30 年～当前+10 年，以缩短年列滚动距离。需要更早日期请显式传 `min-date`。


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | boolean | `false` | v-model:show 弹层显隐 |
| modelValue | [Number, String] | `0 as any` | v-model 选中值（时间戳 ms，或日期时间字符串） |
| mode | string | `'datetime'` | datetime \| date \| time \| year-month \| year \| month-day |
| minDate | [Number, String] | `'' as any` | / maxDate 可选范围（时间戳或 YYYY-MM-DD[ HH:mm:ss]） |
| maxDate | [Number, String] | `'' as any` |  |
| minHour | number | `0` | maxHour minMinute maxMinute minSecond maxSecond 时分秒范围 |
| maxHour | number | `23` |  |
| minMinute | number | `0` |  |
| maxMinute | number | `59` |  |
| minSecond | number | `0` |  |
| maxSecond | number | `59` |  |
| showSecond | boolean | `false` | 是否显示秒列（datetime / time） |
| showUnit | boolean | `true` | 列文案是否带单位（年/月/日…） |
| title | string | `''` |  |
| confirmText | string | `'确认'` |  |
| cancelText | string | `'取消'` |  |
| confirmColor | string | `''` |  |
| cancelColor | string | `''` |  |
| maskClosable | boolean | `true` |  |
| maskCloseAble | boolean | `true` |  |
| safeAreaInsetBottom | boolean | `true` |  |
| zIndex | number | `10076` |  |
| preserveSelection | boolean | `true` |  |
| showTrigger | boolean | `false` | 内置触发条 |
| placeholder | string | `'请选择'` |  |
| disabled | boolean | `false` |  |
| border | boolean | `true` |  |
| size | string | `'md'` |  |
| format | string | `''` | 触发条/回传 formatted 自定义格式；空则按 mode 默认 |
| customClass | string | `''` |  |


## Events

| 事件 | 说明 |
|------|------|
| update:show | / update:modelValue / confirm / cancel / change / open / close |
| update:modelValue |  |
| confirm |  |
| cancel |  |
| change |  |
| open |  |
| close |  |


## Slots

| 插槽 | 说明 |
|------|------|
| trigger | 自定义触发区（需 showTrigger） |
