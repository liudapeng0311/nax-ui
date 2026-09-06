# nax-calendar

`nax-ui` 日历选择器（uni-app x / uvue）。

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
