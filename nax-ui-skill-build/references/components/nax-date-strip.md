# nax-date-strip

`nax-ui` 日期横条（uni-app x / uvue）。以横向滚动条方式展示一段连续日期，支持单选、多选与范围选择。

## 用法示例

```uvue
<nax-date-strip v-model="value" @change="onChange"></nax-date-strip>
```

```uvue
<!-- 多选 -->
<nax-date-strip v-model="multipleValue" type="multiple"></nax-date-strip>
<!-- 范围选择 -->
<nax-date-strip v-model="rangeValue" type="range"></nax-date-strip>
```

## Props — 格式化日期

| 字段 | 说明 |
|---|---|
| `date` | `Date` 日期对象 |
| `text` / `dayText` | 日期数字 |
| `type` | `normal` / `today` / `disabled` / `selected` / `start` / `end` / `middle` |
| `top` / `bottom` | 上下行文案 |
| `style` / `className` | 自定义样式 / class |
| `key` | `YYYY-MM-DD` |

## Props — Props

| 属性 | 说明 | 默认 |
|---|---|---|
| modelValue | 选中值；单选 Date/string，多选/范围 Date[]/string[]；空为 null/[] | - |
| type | single / multiple / range | single |
| min / max | 可选最小/最大日期 | 上一周周一 / 下周周日 |
| disabledDate | `(date) => boolean` 禁选 | - |
| filter | `(date) => boolean` 过滤展示 | - |
| maxDays | 多选/范围最多可选天数 | 不限 |
| overMaxDays | 超出最大天数回调 | - |
| formatter | `(day) => void` 自定义日期 | - |
| allowSameDay | 范围起止是否允许同一天 | false |
| valueFormat | 绑定值格式，空为 Date | '' |
| startDateText / endDateText | 起止文字 | 开始 / 结束 |
| sameDateText | 同一天文字 | 开始/结束 |
| showLunar | 显示农历 | false |
| selectedColor | 选中 / 起止格子背景色（内联，全端生效） | 空 |
| todayColor | 「今天」文字色（同上） | 空 |
| middleColor | 范围中间格子背景色（同上） | 空 |
| customClass | 根节点扩展 class | '' |

## Props — 自定义颜色（全端生效）

| 属性 | 说明 | 默认 |
|---|---|---|
| selected-color | 选中 / 起止格子背景色 | 空（跟随主题） |
| today-color | 「今天」文字色 | 空（跟随主题） |
| middle-color | 范围中间格子背景色 | 空（跟随主题） |

## Events

| 事件 | 说明 |
|---|---|
| update:modelValue | 选中变化（v-model） |
| change | 选中变化（参数同 update:modelValue） |
