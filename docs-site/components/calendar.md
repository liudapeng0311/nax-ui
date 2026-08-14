---
demo: calendar
---

# nax-calendar

> 当前版本：0.1.4

`nax-ui` 日历选择器（uni-app x / uvue）。

## 安装

- 插件市场：[nax-calendar](https://ext.dcloud.net.cn/plugin?id=29026)

easycom 自动生效，页面直接使用 `<nax-calendar />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 基础用法

```html
<nax-button label="打开日历" @click="show = true"></nax-button>
<nax-calendar v-model:show="show" @change="onChange"></nax-calendar>
```

:::

::: details 范围选择

```html
<nax-calendar v-model:show="show" mode="range" @change="onRange"></nax-calendar>
```

:::

::: details 页面内联

```html
<nax-calendar is-page mode="date" @change="onChange"></nax-calendar>
```

:::

::: details 单选（弹层）

```uvue
<nax-button type="primary" label="选择日期" @click="openDate"></nax-button>

<nax-calendar
	v-model:show="dateShow"
	mode="date"
	tool-tip="选择日期"
	@change="onDateChange"
	@close="onClose('date')"
></nax-calendar>
```

```uts
const dateShow = ref(false)

function openDate() {
	dateShow.value = true
}

// e.result 形如 '2026-01-01'，e.week 为星期文案
function onDateChange(e: UTSJSONObject) {
	const result = e.getString('result')
	const week = e.getString('week')
	console.log((result != null ? result : '') + ' ' + (week != null ? week : ''))
}
```

:::

::: details 范围选择

```uvue
<nax-button label="选择区间" @click="openRange"></nax-button>

<nax-calendar
	v-model:show="rangeShow"
	mode="range"
	tool-tip="选择日期区间"
	@change="onRangeChange"
></nax-calendar>
```

```uts
const rangeShow = ref(false)

function openRange() {
	rangeShow.value = true
}

// e.startDate / e.endDate 为 'YYYY-MM-DD'
function onRangeChange(e: UTSJSONObject) {
	const s = e.getString('startDate')
	const end = e.getString('endDate')
	console.log((s != null ? s : '') + ' ~ ' + (end != null ? end : ''))
}
```

:::

::: details 默认选中 default-date

```uvue
<nax-button size="sm" label="打开看默认选中" @click="customShow = true"></nax-button>

<nax-calendar
	v-model:show="customShow"
	:default-date="customDefault"
	confirm-text="完成"
	tool-tip="默认已选中"
	@change="onCustomChange"
></nax-calendar>
```

```uts
const customShow = ref(false)
const now = new Date()
const tenDaysAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)

function pad2(n: number): string {
	return n < 10 ? '0' + n.toString() : n.toString()
}

// 'YYYY-MM-DD'，这里预设 10 天前
const customDefault = tenDaysAgo.getFullYear().toString() + '-' + pad2(tenDaysAgo.getMonth() + 1) + '-' + pad2(tenDaysAgo.getDate())

function onCustomChange(e: UTSJSONObject) {
	const result = e.getString('result')
	console.log(result != null ? result : '')
}
```

:::

::: details 只读

```uvue
<nax-button size="sm" label="打开只读" @click="readonlyShow = true"></nax-button>

<nax-calendar
	v-model:show="readonlyShow"
	readonly
	:default-date="customDefault"
	tool-tip="只读预览"
></nax-calendar>
```

```uts
const readonlyShow = ref(false)
const customDefault = '2026-08-03' // 'YYYY-MM-DD'
```

:::

::: details 节假日 / 加班 / 节日

```uvue
<nax-button size="sm" label="打开" @click="holidayShow = true"></nax-button>

<nax-calendar
	v-model:show="holidayShow"
	:holidays="holidayList"
	:workdays="workdayList"
	:festivals="festivalMap"
	show-festival
	:max-date="holidayMaxDate"
	@change="onHolidayChange"
></nax-calendar>
```

```uts
const holidayShow = ref(false)
const now = new Date()
const y = now.getFullYear().toString()
const m = pad2(now.getMonth() + 1)

function pad2(n: number): string {
	return n < 10 ? '0' + n.toString() : n.toString()
}

const holidayList = [y + '-' + m + '-01', y + '-' + m + '-02'] as string[]
const workdayList = [y + '-' + m + '-06'] as string[]
const festivalMap = {
	'2026-01-01': '元旦'
} as UTSJSONObject
const holidayMaxDate = now.getFullYear().toString() + '-12-31'

function onHolidayChange(e: UTSJSONObject) {
	const result = e.getString('result')
	console.log(result != null ? result : '')
}
```

:::

::: details 打卡签到

```uvue
<nax-button size="sm" type="warning" label="打开打卡日历" @click="checkinShow = true"></nax-button>

<nax-calendar
	v-model:show="checkinShow"
	checkin-mode
	:checked-dates="checkedList"
	:today-checked="todayChecked"
	:max-date="holidayMaxDate"
	@change="onCheckinChange"
></nax-calendar>
```

```uts
const checkinShow = ref(false)
const todayChecked = ref(false)
const holidayMaxDate = '2026-12-31'
// change 后整表替换才能驱动日历重绘
const checkedList = ref(['2026-08-01', '2026-08-03'] as string[])

// 已打卡再点取消，否则加入
function onCheckinChange(e: UTSJSONObject) {
	const result = e.getString('result')
	if (result == null || result.length == 0) {
		return
	}
	const date = result
	const prev = checkedList.value
	const next = [] as string[]
	let cancelled = false
	let i = 0
	while (i < prev.length) {
		if (prev[i] == date) {
			cancelled = true
		} else {
			next.push(prev[i])
		}
		i++
	}
	if (!cancelled) {
		next.push(date)
	}
	checkedList.value = next
}
```

:::

::: details 页面内联模式 is-page

```uvue
<nax-calendar
	is-page
	mode="date"
	:default-date="pageDefault"
	:max-date="holidayMaxDate"
	@change="onPageChange"
></nax-calendar>
```

```uts
const pageDefault = '2026-08-13' // 今天，'YYYY-MM-DD'
const holidayMaxDate = '2026-12-31'

function onPageChange(e: UTSJSONObject) {
	const result = e.getString('result')
	console.log(result != null ? result : '')
}
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 背景色 |
| `--nax-color-bg-hover` | 按压/悬停背景色 |
| `--nax-color-divider` | 分割线色 |
| `--nax-color-error` | 错误色 |
| `--nax-color-info` | 信息色 |
| `--nax-color-mask` | 遮罩色 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-primary-secondary` | 主题主色浅底 |
| `--nax-color-success` | 成功色 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-text-disabled` | 禁用文字色 |
| `--nax-color-text-inverse` | 反白文字色 |
| `--nax-color-text-secondary` | 次要文字色 |
| `--nax-color-warning` | 警告色 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | boolean | `false` | v-model:show 控制弹层显隐（isPage 时无效） |
| mode | string | `'date'` | `date` 单选日期 \| `range` 范围选择 |
| isPage | boolean | `false` | 页面内联展示，不走底部弹层 |
| toolTip | string | `''` | 弹层顶部标题，默认「选择日期」 |
| changeYear | boolean | `true` | 是否可切换年 |
| changeMonth | boolean | `true` | 是否可切换月 |
| maxYear | [Number, String] | `2050` | 可切换年份上限（与 `minYear` 配套） |
| minYear | [Number, String] | `1950` | 可切换年份下限 |
| minDate | [Number, String] | `'1950-01-01'` | 可选日期下限，YYYY-MM-DD |
| maxDate | [Number, String] | `''` | 可选日期上限，YYYY-MM-DD；空则为今天 |
| defaultDate | string | `''` | 单选默认日期 |
| startDate | string | `''` | 范围选择开始日期 |
| endDate | string | `''` | 范围选择结束日期（与 `startDate` 配套） |
| defaultSelectToday | boolean | `true` | 无默认值时是否选中今天 |
| readonly | boolean | `false` | 只读 |
| closeable | boolean | `true` | 弹层右上角关闭 |
| maskClosable | boolean | `true` | 点遮罩关闭 |
| maskCloseAble | boolean | `true` | 点遮罩关闭（兼容拼写，等价 `maskClosable`） |
| safeAreaInsetBottom | boolean | `true` | 底部安全区 |
| zIndex | number | `10075` | 弹层层级 |
| confirmText | string | `'确定'` | 确认文案 |
| startText | string | `'开始'` | 范围开始标记文案 |
| endText | string | `'结束'` | 范围结束标记文案（与 `startText` 配套） |
| isActiveCurrent | boolean | `true` | 当前选中日是否高亮 |
| isChange | boolean | `false` | 切换年月时是否触发 change（仅 date） |
| holidays | array | `() => [] as string[]` | 节假日 YYYY-MM-DD 列表 |
| workdays | array | `() => [] as string[]` | 加班日 YYYY-MM-DD 列表（与 `holidays` 配套） |
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
| open | 弹层打开 |
| close | 弹层关闭 |

