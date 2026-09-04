---
demo: datetime-picker
---

# nax-datetime-picker

> 当前版本：0.3.0

uni-app x 时间选择器（底部弹层 + `picker-view`）。

## 安装

- 插件市场：[nax-datetime-picker](https://ext.dcloud.net.cn/plugin?id=29030)

easycom 自动生效，页面直接使用 `<nax-datetime-picker />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 基础用法

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

:::

::: details 日期时间 datetime

通过按钮控制弹层，v-model:show 控制显示，v-model 绑定时间戳。

```uvue
<nax-button type="primary" label="选择日期时间" @click="dtShow = true"></nax-button>

<nax-datetime-picker
	v-model:show="dtShow"
	v-model="dtValue"
	mode="datetime"
	title="选择日期时间"
	@confirm="onDtConfirm"
	@cancel="onCancel('datetime')"
></nax-datetime-picker>
```

```uts
const dtShow = ref(false)
const dtValue = ref(0)

function onDtConfirm(e : UTSJSONObject) {
	const s = e.getString('formatted')
	// s：如 2026-08-13 10:30
}

function onCancel(name : string) {
	// 取消回调
}
```

:::

::: details 内置触发条 + 日期 date

show-trigger 内置触发条，点击展开弹层。有选中值时下箭头左侧显示清除按钮（clearable 默认开启）。

```uvue
<nax-datetime-picker
	v-model:show="dateShow"
	v-model="dateValue"
	mode="date"
	show-trigger
	title="选择日期"
	placeholder="请选择日期"
	@confirm="onDateConfirm"
	@clear="onDateClear"
></nax-datetime-picker>
```

```uts
const dateShow = ref(false)
const dateValue = ref(0)

function onDateConfirm(e : UTSJSONObject) {
	const s = e.getString('formatted')
	// s：如 2026-08-13
}

function onDateClear() {
	// 触发条清除，v-model 已回写 0
}
```

:::

::: details 时间 time + 秒

show-second 显示秒级选择。

```uvue
<nax-button label="选择时间" @click="timeShow = true"></nax-button>

<nax-datetime-picker
	v-model:show="timeShow"
	v-model="timeValue"
	mode="time"
	show-second
	title="选择时间"
	@confirm="onTimeConfirm"
></nax-datetime-picker>
```

```uts
const timeShow = ref(false)
const timeValue = ref(0)

function onTimeConfirm(e : UTSJSONObject) {
	const s = e.getString('formatted')
	// s：如 10:30:45
}
```

:::

::: details 年月 year-month

```uvue
<nax-datetime-picker
	v-model:show="ymShow"
	v-model="ymValue"
	mode="year-month"
	show-trigger
	title="选择年月"
	placeholder="请选择年月"
	@confirm="onYmConfirm"
></nax-datetime-picker>
```

```uts
const ymShow = ref(false)
const ymValue = ref(0)

function onYmConfirm(e : UTSJSONObject) {
	const s = e.getString('formatted')
	// s：如 2026-08
}
```

:::

::: details 年 year / 月日 month-day

```uvue
<nax-button size="sm" label="选择年" @click="yearShow = true"></nax-button>
<nax-button size="sm" label="选择月日" @click="mdShow = true"></nax-button>

<nax-datetime-picker v-model:show="yearShow" v-model="yearValue" mode="year" title="选择年份" @confirm="onYearConfirm"></nax-datetime-picker>
<nax-datetime-picker v-model:show="mdShow" v-model="mdValue" mode="month-day" title="选择月日" @confirm="onMdConfirm"></nax-datetime-picker>
```

```uts
const yearShow = ref(false)
const yearValue = ref(0)
const mdShow = ref(false)
const mdValue = ref(0)

function onYearConfirm(e : UTSJSONObject) {
	const s = e.getString('formatted')
	// s：如 2026
}

function onMdConfirm(e : UTSJSONObject) {
	const s = e.getString('formatted')
	// s：如 08-13
}
```

:::

::: details 范围限制 minDate / maxDate

```uvue
<nax-button label="2020-01-01 ~ 2026-12-31" @click="rangeShow = true"></nax-button>

<nax-datetime-picker
	v-model:show="rangeShow"
	v-model="rangeValue"
	mode="date"
	min-date="2020-01-01"
	max-date="2026-12-31"
	title="限定范围"
	@confirm="onRangeConfirm"
></nax-datetime-picker>
```

```uts
const rangeShow = ref(false)
const rangeValue = ref(0)

function onRangeConfirm(e : UTSJSONObject) {
	const s = e.getString('formatted')
	// s：范围外的日期不可选
}
```

:::

::: details 自定义 format / 无单位

show-unit 控制是否显示年月日等单位文字，format 自定义结果格式。

```uvue
<nax-datetime-picker
	v-model:show="fmtShow"
	v-model="fmtValue"
	mode="datetime"
	show-trigger
	:show-unit="false"
	format="YYYY/MM/DD HH:mm"
	placeholder="自定义格式"
	title="自定义"
	@confirm="onFmtConfirm"
></nax-datetime-picker>
```

```uts
const fmtShow = ref(false)
const fmtValue = ref(0)

function onFmtConfirm(e : UTSJSONObject) {
	const s = e.getString('formatted')
	// s：如 2026/08/13 10:30
}
```

:::

::: details 禁用触发条

```uvue
<nax-datetime-picker
	show-trigger
	disabled
	placeholder="已禁用"
	mode="date"
></nax-datetime-picker>
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-border-width` | 边框粗细 |
| `--nax-color-bg` | 背景色 |
| `--nax-color-bg-hover` | 按压/悬停背景色 |
| `--nax-color-border` | 边框色 |
| `--nax-color-divider` | 分割线色 |
| `--nax-color-mask` | 遮罩色 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-text-black` | 纯黑文字色 |
| `--nax-color-text-disabled` | 禁用文字色 |
| `--nax-color-text-placeholder` | 占位文字色 |
| `--nax-color-text-secondary` | 次要文字色 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | boolean | `false` | v-model:show 弹层显隐；微信小程序端系统弹层模式不生效（点触发条弹出，自动回写 false） |
| modelValue | [Number, String] | `0 as any` | v-model 选中值（时间戳 ms，或日期时间字符串） |
| mode | string | `'datetime'` | `datetime` 日期时间 \| `date` 日期 \| `time` 时间 \| `year-month` 年月 \| `year` 年 \| `month-day` 月日 |
| minDate | [Number, String] | `'' as any` | 可选范围下限（时间戳或 YYYY-MM-DD[ HH:mm:ss]） |
| maxDate | [Number, String] | `'' as any` | 可选范围上限（时间戳或 YYYY-MM-DD[ HH:mm:ss]） |
| minHour | number | `0` | 小时范围下限 |
| maxHour | number | `23` | 小时范围上限 |
| minMinute | number | `0` | 分钟范围下限 |
| maxMinute | number | `59` | 分钟范围上限 |
| minSecond | number | `0` | 秒范围下限 |
| maxSecond | number | `59` | 秒范围上限 |
| showSecond | boolean | `false` | 是否显示秒列（datetime / time）；微信小程序端 time + show-second 退回自建弹层 |
| showUnit | boolean | `true` | 列文案是否带单位（年/月/日…）；微信小程序端系统弹层模式不生效（列由微信渲染） |
| title | string | `''` | 弹层标题 |
| confirmText | string | `'确认'` | 确认按钮文案 |
| cancelText | string | `'取消'` | 取消按钮文案 |
| confirmColor | string | `''` | 确认按钮文字色 |
| cancelColor | string | `''` | 取消按钮文字色 |
| maskClosable | boolean | `true` | 点遮罩关闭 |
| maskCloseAble | boolean | `true` | 点遮罩关闭（兼容拼写，等价 `maskClosable`） |
| safeAreaInsetBottom | boolean | `true` | 底部安全区 |
| zIndex | number | `10076` | 弹层层级 |
| preserveSelection | boolean | `true` | 重新打开时保留上次确认的选中值 |
| showTrigger | boolean | `false` | 内置触发条；微信小程序端系统弹层模式始终渲染触发条作为弹层触发区域 |
| clearable | boolean | `true` | 触发条有选中值时显示清除按钮，默认 true |
| placeholder | string | `'请选择'` | 触发条占位文案 |
| disabled | boolean | `false` | 禁用（触发条模式） |
| border | boolean | `true` | 触发条边框 |
| size | string | `'md'` | 触发条尺寸：`sm` 小 \| `md` 中 \| `lg` 大 |
| format | string | `''` | 触发条/回传 formatted 自定义格式；空则按 mode 默认 |
| customClass | string | `''` | 根节点扩展 class |

## mode

| 值 | 列 |
|----|----|
| datetime | 年 月 日 时 分（+ 秒） |
| date | 年 月 日 |
| time | 时 分（+ 秒） |
| year-month | 年 月 |
| year | 年 |
| month-day | 月 日 |


## Events

| 事件 | 说明 |
|------|------|
| update:show | 弹层显隐 |
| update:modelValue | v-model 选中值（时间戳或日期字符串） |
| confirm | 点确认，回调对象含 value / timestamp / formatted / year / month / day / hour / minute / second / mode |
| cancel | 点取消 |
| change | 滚轮变化（当前选中值） |
| open | 弹层打开 |
| close | 弹层关闭 |
| clear | 点击触发条清除按钮 |


## Slots

| 插槽 | 说明 |
|------|------|
| trigger | 自定义触发区（需 showTrigger） |

## 平台说明

- **微信小程序**：`date` / `year` / `year-month` / `time`（未开 `show-second`）使用微信系统弹层 `picker`（`mode="date"` / `mode="time"`，`min-date` / `max-date` / `min-hour` / `max-hour` 等范围映射 `start` / `end`），滚动吸附后点「确定」回调，值即最终值；系统弹层 UI 不可定制（`confirm-text` / `cancel-text` / 颜色 / `z-index` 等弹层定制 props 不生效，`title` 仅微信安卓端显示为标题），`v-model:show` 程序化打开不生效（点击触发条弹出），暗黑模式跟随微信宿主深色主题（需小程序开启 darkmode）
- **微信小程序**：`datetime` / `month-day` / `time` + `show-second` 无法映射微信系统弹层，保持自建弹层（picker-view）不变
- 鸿蒙禁用选项点选，请滑动后确认。
- 鸿蒙暗黑模式：组件自动移除原生滚轮默认的白色渐变遮罩。

> 说明：鸿蒙 `picker-view` 打开时的滚到目标动画为原生行为，**无法设置 duration**。未传 `min-date` 时默认近 30 年～当前+10 年，以缩短年列滚动距离。需要更早日期请显式传 `min-date`。
