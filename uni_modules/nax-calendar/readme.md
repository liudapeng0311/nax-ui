# nax-calendar

`nax-ui` 日历选择器（uni-app x / uvue）。

功能主要对齐 [uView Pro Calendar](https://uviewpro.cn/zh/components/calendar.html)：

- 单选 `mode="date"` / 范围 `mode="range"`
- 底部弹层 / 页面内联 `isPage`
- 年/月切换、最小最大日期
- 节假日 / 加班日 / 节日标记
- 打卡签到标记

## 依赖

| 依赖 | 说明 |
|------|------|
| `nax-icon` | 导航与关闭图标 |
| `nax-button` | 确认按钮 |
| `nax-transition` | 弹层进退场 |
| `nax-ui-theme` | 主题 token（运行时弱依赖） |

## 基础用法

```html
<nax-button label="打开日历" @click="show = true"></nax-button>
<nax-calendar v-model:show="show" @change="onChange"></nax-calendar>
```

## 范围选择

```html
<nax-calendar v-model:show="show" mode="range" @change="onRange"></nax-calendar>
```

## 页面内联

```html
<nax-calendar is-page mode="date" @change="onChange"></nax-calendar>
```

## Props（摘要）

| 属性 | 说明 | 默认 |
|------|------|------|
| show | v-model:show 弹层显隐 | false |
| mode | date / range | date |
| isPage | 页面内联 | false |
| minDate / maxDate | 可选范围 | 1950-01-01 / 今天 |
| defaultDate | 单选默认 | '' |
| startDate / endDate | 范围默认 | '' |
| readonly | 只读 | false |
| holidays / workdays | 休/班日期列表 | [] |
| festivals | 节日映射对象 | {} |
| showFestival | 内置公历节日 | false |
| checkedDates / checkinMode | 打卡 | [] / false |
| safeAreaInsetBottom | 底部安全区 | true |

## Events

| 事件 | 说明 |
|------|------|
| update:show | 弹层显隐 |
| change | 确认或页面模式选完 |
| open / close | 打开 / 关闭 |
