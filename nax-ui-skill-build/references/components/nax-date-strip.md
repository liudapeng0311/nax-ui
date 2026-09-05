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

## Props

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
| customClass | 根节点扩展 class | '' |

## Events

| 事件 | 说明 |
|---|---|
| update:modelValue | 选中变化（v-model） |
| change | 选中变化（参数同 update:modelValue） |

## 说明

- `formatter` 回调接收 `CalendarDay` 对象，可改写 `top` / `bottom`（上下行文案）、`style`（内联样式字符串）、`className`；`CalendarDay` 含 `date`、`text` / `dayText`、`type`（`normal` / `today` / `disabled` / `selected` / `start` / `end` / `middle`）、`key`（YYYY-MM-DD）
- 农历覆盖 1900 - 2100 年；默认展示以当前周为中心的 3 周
- 蒸汽模式仅组合式 API；样式仅 class 选择器
