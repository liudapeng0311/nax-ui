# nax-datetime-picker

uni-app x 时间选择器（底部弹层 + `picker-view`）。

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
| show | false | v-model:show；**微信小程序端系统弹层模式不生效**（点触发条弹出，自动回写 false） |
| modelValue | 0 | 时间戳 ms 或日期字符串 |
| mode | datetime | 见上表；**微信小程序端 datetime / month-day / time + show-second 无法映射系统弹层，保持自建弹层** |
| min-date / max-date | 1950 / 当前+10年 | 可选范围（微信小程序端系统弹层模式映射为 start / end） |
| show-second | false | 显示秒列（微信小程序端 time + show-second 退回自建弹层） |
| show-unit | true | 列单位；**微信小程序端系统弹层模式不生效**（列由微信渲染） |
| format | '' | 自定义 formatted（触发条回显，各端生效） |
| show-trigger | false | 内置触发条；**微信小程序端系统弹层模式始终渲染触发条作为弹层触发区域** |
| clearable | true | 触发条有选中值时显示清除按钮 |
| mask-closable | true | 点遮罩关闭；**微信小程序端系统弹层模式不生效** |
| safe-area-inset-bottom | true | 底部安全区；**微信小程序端系统弹层模式不生效** |

## 预设初值

`v-model` 绑定非 `0` 的初值，进入页面触发条即显示该时间，打开弹层也直接停在它上面（`preserveSelection` 默认 `true`），无需手动 set：

```uvue
<nax-datetime-picker
  v-model:show="show"
  v-model="value"
  mode="datetime"
  show-trigger
  @confirm="onConfirm"
></nax-datetime-picker>
```

```uts
// 今天 10:30
function todayAt(hour : number, minute : number) : number {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0).getTime()
}

const value = ref(todayAt(10, 30))
```

初值可传时间戳（ms）或日期字符串，两种写法等价：

```uts
const value = ref(new Date(2026, 0, 1, 9, 0, 0).getTime())  // 时间戳
const value = ref('2026-01-01 09:00')                        // 字符串
```

设为 `0`（或 `''` / `null`）表示未选择，触发条显示 `placeholder`。若初始时间早于 `min-date` 或晚于 `max-date`，会被自动收敛到边界内。

## 日期时间区间

组件以**单值**为模型（`v-model` 一个时间戳），区间用两个实例组合实现，不需要额外组件。

### 两个 picker 并列

起止各一个内置触发条，用 `min-date` / `max-date` 互相约束，先选哪个都行：

```uvue
<view class="row">
  <nax-datetime-picker
    v-model:show="startShow"
    v-model="startValue"
    mode="datetime"
    show-trigger
    placeholder="开始时间"
    :max-date="endValue"
    @confirm="onStartConfirm"
  ></nax-datetime-picker>
  <nax-datetime-picker
    v-model:show="endShow"
    v-model="endValue"
    mode="datetime"
    show-trigger
    placeholder="结束时间"
    :min-date="startValue"
    @confirm="onEndConfirm"
  ></nax-datetime-picker>
</view>
```

未选中时 `v-model` 为 `0`，传给 `min-date` / `max-date` 即视为「未传边界」，等价于不约束，无需额外判断。

### 单触发条 + 两步选择

只要一个触发条时，两个实例都不传 `show-trigger`（不渲染内置触发条），自己渲染触发区，并在起点 `close` 后自动打开终点：

```uvue
<view class="range-trigger" @click="onSpanOpen">
  <text>{{ spanDisplay }}</text>
</view>

<nax-datetime-picker
  v-model:show="startShow"
  v-model="startValue"
  mode="datetime"
  title="选择开始时间"
  :max-date="endValue"
  @confirm="onStartConfirm"
  @cancel="onSpanCancel"
  @close="onStartClose"
></nax-datetime-picker>
<nax-datetime-picker
  v-model:show="endShow"
  v-model="endValue"
  mode="datetime"
  title="选择结束时间"
  :min-date="startValue"
  @confirm="onEndConfirm"
></nax-datetime-picker>
```

```uts
const startShow = ref(false)
const startValue = ref(0)
const endShow = ref(false)
const endValue = ref(0)
let pendingEnd = false

function onSpanOpen() {
  if (startValue.value == 0) {
    startShow.value = true
  } else if (endValue.value == 0) {
    endShow.value = true
  } else {
    startShow.value = true
  }
}

function onStartConfirm(e : UTSJSONObject) {
  // 起点确认，待弹层退场后接续选终点
  pendingEnd = true
}

function onSpanCancel() {
  pendingEnd = false
}

function onStartClose() {
  if (!pendingEnd) return
  pendingEnd = false
  endShow.value = true
}
```

接续时机用 `@close` 而非 `@confirm`：`close` 在退场动画结束后触发（面板已卸载），此时再打开第二个弹层不会出现两层遮罩叠加。

### 注意

- 微信小程序端可映射模式（`date` / `year` / `year-month` / `time` 无秒）走微信系统弹层，`v-model:show` 不生效。单触发条两步方案请用 `datetime` / `month-day` / `time` + `show-second`（自建弹层），或仅在其他端使用。
- 纯日期区间还可直接用 `nax-calendar`（`mode="range"`）或 `nax-date-strip`（`type="range"`）。

## 事件

confirm 回调字段：value / timestamp / formatted / year / month / day / hour / minute / second / mode。

另有 update:show、update:modelValue、cancel、change、open、close、clear。

内置触发条有选中值时，右侧显示清除按钮并隐藏下拉箭头（`clearable`，默认开启，二者互斥），点击后清空选中并回写空的 `v-model`（`0`）。

## 平台说明

- **微信小程序**：`date` / `year` / `year-month` / `time`（未开 `show-second`）使用微信系统弹层 `picker`（`mode="date"` / `mode="time"`，`min-date` / `max-date` / `min-hour` / `max-hour` 等范围映射 `start` / `end`），滚动吸附后点「确定」回调，值即最终值；系统弹层 UI 不可定制（`confirm-text` / `cancel-text` / 颜色 / `z-index` 等弹层定制 props 不生效，`title` 仅微信安卓端显示为标题），`v-model:show` 程序化打开不生效（点击触发条弹出），暗黑模式跟随微信宿主深色主题（需小程序开启 darkmode）
- **微信小程序**：`datetime` / `month-day` / `time` + `show-second` 无法映射微信系统弹层，保持自建弹层（picker-view）不变
- 鸿蒙禁用选项点选，请滑动后确认。
- 鸿蒙暗黑模式：组件自动移除原生滚轮默认的白色渐变遮罩。

> 说明：鸿蒙 `picker-view` 打开时的滚到目标动画为原生行为，**无法设置 duration**。未传 `min-date` 时默认近 30 年～当前+10 年，以缩短年列滚动距离。需要更早日期请显式传 `min-date`。
