# nax-calendar

`nax-ui` 日历选择器（uni-app x / uvue）。

## 用法示例

```uvue
<nax-button label="打开日历" @click="show = true"></nax-button>
<nax-calendar v-model:show="show" @change="onChange"></nax-calendar>
```

```uvue
<nax-calendar v-model:show="show" mode="range" @change="onRange"></nax-calendar>
```

## Props

| 属性 | 说明 | 默认 |
|---|---|---|
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
|---|---|
| update:show | 弹层显隐 |
| change | 确认或页面模式选完 |
| open / close | 打开 / 关闭 |
