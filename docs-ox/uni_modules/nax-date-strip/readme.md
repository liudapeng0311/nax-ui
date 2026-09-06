# nax-date-strip

`nax-ui` 日期横条（uni-app x / uvue）。以横向滚动条方式展示一段连续日期，支持单选、多选与范围选择。

## 依赖

| 依赖 | 说明 |
|------|------|
| `nax-ui-theme` | 主题 token（运行时弱依赖） |

## 基础用法

```html
<nax-date-strip v-model="value" @change="onChange"></nax-date-strip>
```

`value` 为 `Date | null`。

## 类型

```html
<!-- 多选 -->
<nax-date-strip v-model="multipleValue" type="multiple"></nax-date-strip>
<!-- 范围选择 -->
<nax-date-strip v-model="rangeValue" type="range"></nax-date-strip>
```

多选与范围的 `v-model` 为 `Date[]`；范围选中后为 `[开始, 结束]`。

## 范围 / 最大天数

```html
<nax-date-strip
  v-model="rangeValue"
  type="range"
  :min="new Date(2024, 0, 1)"
  :max="new Date(2024, 0, 20)"
  :max-days="5"
  :over-max-days="onOverMaxDays"
  :allow-same-day="false"
></nax-date-strip>
```

`min` / `max` 默认分别为当前周上一周的周一与下一周的周日；不传时默认展示以当前周为中心的三周。

## 禁用与过滤

```html
<!-- 禁用周末 -->
<nax-date-strip v-model="value" :min="minDate" :max="maxDate" :disabled-date="disabledWeekend"></nax-date-strip>

<!-- 仅展示工作日 -->
<nax-date-strip v-model="value" :min="minDate" :max="maxDate" :filter="onlyWorkday"></nax-date-strip>
```

`disabledDate(date)` 返回 `true` 禁选；`filter(date)` 返回 `true` 才展示该日期。

## 格式化日期

```html
<nax-date-strip v-model="value" :formatter="formatter"></nax-date-strip>
```

```ts
const formatter = (day: any) => {
  if (day.date.getDay() == 0 || day.date.getDay() == 6) {
    day.bottom = '休'
    if (day.type != 'selected') {
      day.style = 'background-color:#fdf3e4;color:#c97c10;border-color:#fcefda;'
    }
  }
}
```

`formatter` 接收 `CalendarDay` 对象，可改写：

- `day.top`：第一行文案（默认显示周几）
- `day.bottom`：第三行文案（默认显示范围标记或农历）
- `day.style`：内联样式字符串，应用到格子与日期数字
- `day.className`：附加 class

`CalendarDay` 结构：

| 字段 | 说明 |
|------|------|
| `date` | `Date` 日期对象 |
| `text` / `dayText` | 日期数字 |
| `type` | `normal` / `today` / `disabled` / `selected` / `start` / `end` / `middle` |
| `top` / `bottom` | 上下行文案 |
| `style` / `className` | 自定义样式 / class |
| `key` | `YYYY-MM-DD` |

## 展示农历

```html
<nax-date-strip v-model="value" :min="minDate" :max="maxDate" show-lunar></nax-date-strip>
```

## 值格式化

默认绑定值为 `Date` 对象；设置 `value-format` 后绑定字符串：

```html
<nax-date-strip v-model="strValue" value-format="YYYY-MM-DD"></nax-date-strip>
```

支持标记：`YYYY` `YY` `MM` `M` `DD` `D` `HH` `H` `mm` `ss`。

## Props

| 属性 | 说明 | 默认 |
|------|------|------|
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
|------|------|
| update:modelValue | 选中变化（v-model） |
| change | 选中变化（参数同 update:modelValue） |

## 主题定制

通过 CSS 变量覆盖：

| Token | 用途 | 默认 |
|-------|------|------|
| `--nax-date-strip-column-gap` | 格子间距 | `16rpx` |
| `--nax-date-strip-item-width` | 格子宽度 | `128rpx` |
| `--nax-date-strip-item-padding-y` / `-x` | 格子内边距 | `18rpx` / `12rpx` |
| `--nax-date-strip-item-border-radius` | 格子圆角 | `--nax-radius-md` |
| `--nax-date-strip-item-border-color` | 格子边框色 | `transparent` |
| `--nax-date-strip-item-bg` | 格子背景 | `transparent` |
| `--nax-date-strip-item-week-font-size` / `-color` / `-order` | 周几行 | `12px` / 次要色 / `1` |
| `--nax-date-strip-item-day-font-size` / `-color` / `-order` | 日期数字行 | `16px` / 主文字 / `2` |
| `--nax-date-strip-item-info-font-size` / `-color` / `-order` | 信息行 | `12px` / 次要色 / `3` |
| `--nax-date-strip-item-selected-color` / `-bg` | 选中文字 / 背景 | 反白 / 主色 |
| `--nax-date-strip-item-middle-bg` | 范围中间底色 | `--nax-color-primary-secondary` |
| `--nax-date-strip-item-today-color` | 今天文字色 | `--nax-color-primary` |

示例：通过 `order` 变量把周几移到日期下方，去掉间距改成直角：

```html
<nax-date-strip
  v-model="value"
  style="--nax-date-strip-column-gap:0px;--nax-date-strip-item-border-radius:0px;--nax-date-strip-item-week-order:3;"
></nax-date-strip>
```

## 注意

- 农历计算覆盖 1900 - 2100 年。
- 组件默认展示以当前周为中心的 3 周（`min`/`max` 可自定义）。
- 蒸汽模式仅组合式 API；样式仅 class 选择器。