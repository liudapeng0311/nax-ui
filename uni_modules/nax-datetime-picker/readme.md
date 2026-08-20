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
| show | false | v-model:show |
| modelValue | 0 | 时间戳 ms 或日期字符串 |
| mode | datetime | 见上表 |
| min-date / max-date | 1950 / 当前+10年 | 可选范围 |
| show-second | false | 显示秒列 |
| show-unit | true | 列单位 |
| format | '' | 自定义 formatted |
| show-trigger | false | 内置触发条 |
| clearable | true | 触发条有选中值时显示清除按钮 |
| mask-closable | true | 点遮罩关闭 |
| safe-area-inset-bottom | true | 底部安全区 |

## 事件

confirm 回调字段：value / timestamp / formatted / year / month / day / hour / minute / second / mode。

另有 update:show、update:modelValue、cancel、change、open、close、clear。

内置触发条有选中值时，下箭头左侧会出现清除按钮（`clearable`，默认开启），点击后清空选中并回写空的 `v-model`（`0`）。

## 平台说明

- 鸿蒙禁用选项点选，请滑动后确认。
- 鸿蒙暗黑模式：组件自动移除原生滚轮默认的白色渐变遮罩。
- 微信小程序滚动中点确认会被忽略。

> 说明：鸿蒙 `picker-view` 打开时的滚到目标动画为原生行为，**无法设置 duration**。未传 `min-date` 时默认近 30 年～当前+10 年，以缩短年列滚动距离。需要更早日期请显式传 `min-date`。
