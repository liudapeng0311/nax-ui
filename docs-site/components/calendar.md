---
demo: calendar
---

# nax-calendar

> 当前版本：0.1.2（见 `changelog.md`）

`nax-ui` 日历选择器（uni-app x / uvue）。
主要能力：
- 单选 `mode="date"` / 范围 `mode="range"`
- 底部弹层 / 页面内联 `isPage`
- 年/月切换、最小最大日期
- 节假日 / 加班日 / 节日标记
- 打卡签到标记

## 安装

```text
uni_modules/nax-calendar
```

easycom 自动生效，页面直接使用 `<nax-calendar />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 依赖

| 依赖 | 说明 |
|------|------|
| `nax-icon` | 导航与关闭图标 |
| `nax-button` | 确认按钮 |
| `nax-transition` | 弹层进退场 |
| `nax-ui-theme` | 主题 token（运行时弱依赖） |


## 代码示例

### 基础用法

```html
<nax-button label="打开日历" @click="show = true"></nax-button>
<nax-calendar v-model:show="show" @change="onChange"></nax-calendar>
```

### 范围选择

```html
<nax-calendar v-model:show="show" mode="range" @change="onRange"></nax-calendar>
```

### 页面内联

```html
<nax-calendar is-page mode="date" @change="onChange"></nax-calendar>
```

### Props（摘要）

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


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | boolean | `false` | v-model:show 控制弹层显隐（isPage 时无效） |
| mode | string | `'date'` | date \| range |
| isPage | boolean | `false` | 页面内联展示，不走底部弹层 |
| toolTip | string | `''` | 弹层顶部标题，默认「选择日期」 |
| changeYear | boolean | `true` | 是否可切换年 |
| changeMonth | boolean | `true` | 是否可切换月 |
| maxYear | [Number, String] | `2050` |  |
| minYear | [Number, String] | `1950` | / maxYear 可切换年份范围 |
| minDate | [Number, String] | `'1950-01-01'` | / maxDate 可选日期范围，YYYY-MM-DD；maxDate 空则为今天 |
| maxDate | [Number, String] | `''` |  |
| defaultDate | string | `''` | 单选默认日期 |
| startDate | string | `''` | / endDate 范围默认起止 |
| endDate | string | `''` |  |
| defaultSelectToday | boolean | `true` | 无默认值时是否选中今天 |
| readonly | boolean | `false` | 只读 |
| closeable | boolean | `true` | 弹层右上角关闭 |
| maskClosable | boolean | `true` | / maskCloseAble 点遮罩关闭 |
| maskCloseAble | boolean | `true` |  |
| safeAreaInsetBottom | boolean | `true` | 底部安全区 |
| zIndex | number | `10075` | 弹层层级 |
| confirmText | string | `'确定'` | 确认文案 |
| startText | string | `'开始'` | / endText 范围起止标记文案 |
| endText | string | `'结束'` |  |
| isActiveCurrent | boolean | `true` | 当前选中日是否高亮 |
| isChange | boolean | `false` | 切换年月时是否触发 change（仅 date） |
| holidays | array | `() => [] as string[]` | / workdays 节假日、加班日 YYYY-MM-DD 列表 |
| workdays | array | `() => [] as string[]` |  |
| festivals | object | `() => ({} as UTSJSONObject)` | 节日映射 { 'YYYY-MM-DD': '清明节' } |
| showFestival | boolean | `false` | 是否显示内置公历节日 |
| checkedDates | array | `() => [] as string[]` | 已打卡日期 |
| todayChecked | boolean | `false` | 今日已打卡 |
| checkinMode | boolean | `false` | 打卡签到模式 |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| update:show | 弹层显隐 |
| change | 确认或页面模式选完；单选/范围结构不同 |
| open | / close 打开 / 关闭 |
| close |  |

