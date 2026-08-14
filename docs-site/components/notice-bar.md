---
demo: notice-bar
---

# nax-notice-bar

> 当前版本：0.1.19

滚动通告栏。提供常用能力。

## 安装

- 插件市场：[nax-notice-bar](https://ext.dcloud.net.cn/plugin?id=29044)

easycom 自动生效，页面直接使用 `<nax-notice-bar />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 用法

```uvue
<nax-notice-bar :list="list"></nax-notice-bar>

<!-- 水平步进 -->
<nax-notice-bar mode="horizontal" scroll="step" :list="list"></nax-notice-bar>

<!-- 垂直步进 -->
<nax-notice-bar mode="vertical" :list="list"></nax-notice-bar>

<!-- 可关闭 + 更多 -->
<nax-notice-bar
  type="error"
  closable
  show-more
  :list="list"
  @close="onClose"
  @get-more="onMore"
  @click="onClick"
></nax-notice-bar>
```

:::

::: details 水平衔接（默认）

```uvue
<nax-notice-bar :list="list" @click="onClick"></nax-notice-bar>
```

```uts
const list = ref([
	'寒雨连江夜入吴',
	'平明送客楚山孤',
	'洛阳亲友如相问',
	'一片冰心在玉壶'
] as string[])

function onClick(index : number) {
	// 点击第 index 条公告
}
```

:::

::: details 水平步进 scroll=step

```uvue
<nax-notice-bar
	scroll="step"
	:list="list"
	:duration="2500"
	@click="onClick"
	@end="onEnd"
></nax-notice-bar>
```

```uts
const list = ref([
	'寒雨连江夜入吴',
	'平明送客楚山孤',
	'洛阳亲友如相问',
	'一片冰心在玉壶'
] as string[])

function onClick(index : number) {
	// 点击第 index 条公告
}

function onEnd() {
	// 一轮滚动结束
}
```

:::

::: details 垂直滚动 mode=vertical

```uvue
<nax-notice-bar
	mode="vertical"
	type="info"
	:list="list"
	:duration="2000"
	@click="onClick"
></nax-notice-bar>
```

```uts
const list = ref([
	'寒雨连江夜入吴',
	'平明送客楚山孤',
	'洛阳亲友如相问',
	'一片冰心在玉壶'
] as string[])

function onClick(index : number) {
	// 点击第 index 条公告
}
```

:::

::: details 类型 type

```uvue
<nax-notice-bar type="primary" :list="shortList"></nax-notice-bar>
<nax-notice-bar type="info" :list="shortList"></nax-notice-bar>
<nax-notice-bar type="success" :list="shortList"></nax-notice-bar>
<nax-notice-bar type="warning" :list="shortList"></nax-notice-bar>
<nax-notice-bar type="error" :list="shortList"></nax-notice-bar>
<nax-notice-bar type="none" :list="shortList"></nax-notice-bar>
```

```uts
const shortList = ref([
	'系统将于今晚 23:00 进行维护升级，请提前保存数据。'
] as string[])
```

:::

::: details 图标 / 更多 / 关闭

```uvue
<nax-notice-bar :show-icon="false" :list="shortList"></nax-notice-bar>

<nax-notice-bar icon="star" type="primary" :list="shortList"></nax-notice-bar>

<nax-notice-bar
	show-more
	type="info"
	:list="shortList"
	@get-more="onGetMore"
></nax-notice-bar>

<nax-notice-bar v-if="showClose" closable type="error" :list="shortList" @close="onClose"></nax-notice-bar>

<nax-button size="sm" label="重置关闭示例" @click="resetClose"></nax-button>
```

```uts
const shortList = ref([
	'系统将于今晚 23:00 进行维护升级，请提前保存数据。'
] as string[])

const showClose = ref(true)

function onGetMore() {
	// 点击“更多”
}

function onClose() {
	showClose.value = false
}

function resetClose() {
	showClose.value = true
}
```

:::

::: details 暂停 / 播放

```uvue
<nax-notice-bar :list="list" :paused="paused" :speed="40"></nax-notice-bar>

<nax-button size="sm" label="暂停" @click="paused = true"></nax-button>
<nax-button size="sm" type="primary" label="播放" @click="paused = false"></nax-button>
```

```uts
const list = ref([
	'寒雨连江夜入吴',
	'平明送客楚山孤',
	'洛阳亲友如相问',
	'一片冰心在玉壶'
] as string[])

const paused = ref(false)
```

:::

::: details 兼容 is-circular=false

```uvue
<nax-notice-bar
	:is-circular="false"
	type="success"
	:list="list"
	:duration="2200"
></nax-notice-bar>
```

```uts
const list = ref([
	'寒雨连江夜入吴',
	'平明送客楚山孤',
	'洛阳亲友如相问',
	'一片冰心在玉壶'
] as string[])
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-error` | 错误色 |
| `--nax-color-error-secondary` | 错误色浅底 |
| `--nax-color-info` | 信息色 |
| `--nax-color-info-secondary` | 信息色浅底 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-primary-secondary` | 主题主色浅底 |
| `--nax-color-success` | 成功色 |
| `--nax-color-success-secondary` | 成功色浅底 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-warning-deep` | 警告色（加深） |
| `--nax-color-warning-secondary` | 警告色浅底 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| list | array | `() => [] as string[]` | 通告文案，`string` 或 `{ text \| title \| label }` 对象 |
| type | string | `'warning'` | `primary` 主要 \| `info` 信息 \| `success` 成功 \| `warning` 警告 \| `error` 错误 \| `none` 无 |
| mode | string | `'horizontal'` | `horizontal` 横向 \| `vertical` 垂直 |
| scroll | string | `''` | `seamless` 衔接 / `step` 步进；空则看 `is-circular` |
| isCircular | boolean | `true` | 兼容：水平衔接 vs 步进 |
| showIcon | boolean | `true` | 左侧图标 |
| icon | string | `''` | 自定义 `nax-icon` 名 |
| showMore | boolean | `false` | 右侧更多箭头 |
| closable | boolean | `false` | 右侧关闭 |
| autoplay | boolean | `true` | 自动播放 |
| paused | boolean | `false` | 暂停（优先于 `playState`） |
| playState | string | `'play'` | `play` 播放 \| `paused` 暂停 |
| duration | number | `2000` | 步进周期 ms |
| speed | number | `50` | 衔接滚动 px/s |
| separator | string | `'    '` | 衔接拼接分隔符 |
| disableTouch | boolean | `true` | 步进禁止手滑 |
| show | boolean | `true` | 是否显示 |
| noListHidden | boolean | `true` | list 为空时隐藏 |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| click | 点击文案；步进为 index，衔接为 `-1` |
| close | 点击关闭 |
| getMore | 点击更多 |
| end | 步进播到最后一项 |
| update:show | 显示状态变化 |

