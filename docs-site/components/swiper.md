---
demo: swiper
---

# nax-swiper

> 当前版本：0.1.8

`nax-ui` 轮播组件（uni-app x / uvue）。
基于原生 `swiper` / `swiper-item` 封装，提供统一 API、主题圆角与数字指示器。

## 安装

- 插件市场：[nax-swiper](https://ext.dcloud.net.cn/plugin?id=29066)

easycom 自动生效，页面直接使用 `<nax-swiper />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 基础用法

```html
<nax-swiper :list="banners" height="180" indicator></nax-swiper>
```

```uts
const banners = ref([
  'https://example.com/1.jpg',
  'https://example.com/2.jpg',
  'https://example.com/3.jpg'
] as string[])
```

:::

::: details 自动播放 / 循环

```html
<nax-swiper
  :list="banners"
  autoplay
  :interval="3000"
  circular
  height="180"
></nax-swiper>
```

:::

::: details 受控 current

```html
<nax-swiper
  :list="banners"
  v-model:current="current"
  height="180"
  @change="onChange"
></nax-swiper>
```

:::

::: details 数字指示器

```html
<nax-swiper
  :list="banners"
  indicator
  indicator-type="number"
  indicator-position="bottom-right"
  height="180"
></nax-swiper>
```

:::

::: details 色块 / 文案项（推荐，微信小程序友好）

```html
<nax-swiper :list="panels" height="140"></nax-swiper>
```

```uts
const panels = ref([
  { bg: '#18a058', text: '页 1' } as UTSJSONObject,
  { bg: '#18a058', text: '页 2' } as UTSJSONObject
] as UTSJSONObject[])
```

:::

::: details 自定义 swiper-item（默认插槽）

`list` 为空时可用默认插槽。**微信小程序必须传 `itemCount`**（等于你写的 `swiper-item` 个数），否则可能报：

`display-multiple-items 不能大于 swiper-item 数量`

```html
<nax-swiper height="160" :list="[]" :item-count="2" :indicator="false">
  <swiper-item>
    <view class="slide"><text>自定义 1</text></view>
  </swiper-item>
  <swiper-item>
    <view class="slide"><text>自定义 2</text></view>
  </swiper-item>
</nax-swiper>
```

小程序端更推荐用 `list` + `bg`/`text`，避免 slot 投影导致 item 计数异常。

:::

::: details 基础（点指示器）

```uvue
<nax-swiper
	:list="slides"
	height="160"
	@change="onChange"
	@click="onClickItem"
></nax-swiper>
```

```uts
// list 支持 string url 或 { src|image|url, text, bg|background } 对象
const slides = ref([
	{
		bg: '#18a058',
		text: '色块 1 · primary'
	} as UTSJSONObject,
	{
		bg: '#2080f0',
		text: '色块 2 · info'
	} as UTSJSONObject,
	{
		bg: '#f0a020',
		text: '色块 3 · warning'
	} as UTSJSONObject
] as UTSJSONObject[])

function onChange(cur: number) {
	// 当前页索引
}

function onClickItem(index: number) {
	// 点击第 index 页
}
```

:::

::: details 自动播放 + 循环

```uvue
<nax-swiper
	:list="slides"
	height="160"
	autoplay
	:interval="2500"
	circular
></nax-swiper>
```

```uts
const slides = ref([
	{
		bg: '#18a058',
		text: '色块 1 · primary'
	} as UTSJSONObject,
	{
		bg: '#2080f0',
		text: '色块 2 · info'
	} as UTSJSONObject,
	{
		bg: '#f0a020',
		text: '色块 3 · warning'
	} as UTSJSONObject
] as UTSJSONObject[])
```

:::

::: details 数字指示器

```uvue
<nax-swiper
	:list="slides"
	height="160"
	indicator
	indicator-type="number"
	indicator-position="bottom-right"
></nax-swiper>
```

```uts
const slides = ref([
	{
		bg: '#18a058',
		text: '色块 1 · primary'
	} as UTSJSONObject,
	{
		bg: '#2080f0',
		text: '色块 2 · info'
	} as UTSJSONObject,
	{
		bg: '#f0a020',
		text: '色块 3 · warning'
	} as UTSJSONObject
] as UTSJSONObject[])
```

:::

::: details 受控 current

```uvue
<nax-swiper
	:list="slides"
	height="160"
	v-model:current="current"
	:indicator="true"
></nax-swiper>

<nax-button size="sm" label="上一页" @click="prev"></nax-button>
<nax-button size="sm" type="primary" label="下一页" @click="next"></nax-button>
```

```uts
const slides = ref([
	{
		bg: '#18a058',
		text: '色块 1 · primary'
	} as UTSJSONObject,
	{
		bg: '#2080f0',
		text: '色块 2 · info'
	} as UTSJSONObject,
	{
		bg: '#f0a020',
		text: '色块 3 · warning'
	} as UTSJSONObject
] as UTSJSONObject[])

const current = ref(0)

function prev() {
	if (current.value <= 0) {
		current.value = slides.value.length - 1
		return
	}
	current.value = current.value - 1
}

function next() {
	if (current.value >= slides.value.length - 1) {
		current.value = 0
		return
	}
	current.value = current.value + 1
}
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg-secondary` | 次级背景色 |
| `--nax-color-text-inverse` | 反白文字色 |
| `--nax-swiper-number-bg` | 数字指示器背景色 |
| `--nax-swiper-number-color` | 数字指示器文字色 |
| `--nax-swiper-radius` | 轮播圆角 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| list | array | `() => [] as any[]` | 图片 url 或对象；字段明细见下方 list 项表 |
| current | number | `0` | 当前页（v-model:current） |
| height | string | `'160'` | 高度，默认 160（纯数字补 px） |
| autoplay | boolean | `false` | 自动播放 |
| interval | number | `3000` | 间隔 ms |
| duration | number | `500` | 动画 ms |
| circular | boolean | `true` | 循环 |
| vertical | boolean | `false` | 纵向 |
| indicator | boolean | `true` | 指示器 |
| indicatorType | string | `'dot'` | `dot` 圆点 \| `number` 数字 |
| indicatorColor | string | `''` | 指示点颜色 |
| indicatorActiveColor | string | `''` | 当前指示点颜色 |
| indicatorPosition | string | `'bottom'` | 数字指示器位置：`bottom` 底部（默认）\| `bottom-left` 左下 \| `bottom-right` 右下 \| `top` 顶部 \| `top-left` 左上 \| `top-right` 右上 |
| imageMode | string | `'aspectFill'` | image mode |
| previousMargin | string | `'0px'` | 前边距 |
| nextMargin | string | `'0px'` | 后边距 |
| displayMultipleItems | number | `1` | 同时显示滑块数 |
| itemCount | number | `0` | 自定义 slot 时的 swiper-item 数量（list 为空时必传，微信小程序） |
| disableTouch | boolean | `false` | 禁止手势 |
| radius | boolean | `true` | 圆角 |
| customClass | string | `''` | 扩展 class |

## list 项

`list` 元素支持字符串（图片 url）或对象，对象字段如下：

| 字段 | 类型 | 说明 |
|------|------|------|
| src / image / url | string | 图片地址，优先级 `src` > `image` > `url`；字符串元素等价于传 `src` |
| bg / background | string | 背景色，优先级 `bg` > `background`；无图片时配合 `text` 渲染色块文案 |
| text / title | string | 文案，优先级 `text` > `title`；可叠加在图片上，或配合 `bg` 组成色块项 |


## Events

| 事件 | 说明 |
|------|------|
| change | 页码变化，参数 `current` |
| update:current | 同步 `v-model:current` |
| animationfinish | 动画结束，参数 `current` |
| click | 点击某一项，参数 `index`（list 模式） |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义 swiper-item（list 为空；微信小程序请传 itemCount） |
