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
