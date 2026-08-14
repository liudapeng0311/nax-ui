---
demo: image
---

# nax-image

> 当前版本：0.1.9

`nax-ui` 图片组件（uni-app x / uvue）。
基于原生 `image` 封装，提供统一尺寸/圆角 API，以及**加载中**与**加载失败**占位。

## 安装

- 插件市场：[nax-image](https://ext.dcloud.net.cn/plugin?id=29037)

easycom 自动生效，页面直接使用 `<nax-image />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 基础用法

```html
<nax-image
  src="https://example.com/a.jpg"
  width="120"
  height="120"
  shape="round"
></nax-image>
```

:::

::: details 加载 / 失败占位

默认开启 `showLoading` / `showError`。可用插槽自定义：

```html
<nax-image src="https://example.com/a.jpg" width="160" height="120">
  <template #loading>
    <text>加载中…</text>
  </template>
  <template #error>
    <text>图片走丢了</text>
  </template>
</nax-image>
```

:::

::: details 懒加载

```html
<nax-image
  src="https://example.com/a.jpg"
  lazy-load
  width="100%"
  height="180"
></nax-image>
```

:::

::: details 基础 / mode

```uvue
<nax-image :src="okSrc" width="100" height="100" mode="aspectFill"></nax-image>
<nax-image :src="okSrc" width="100" height="100" mode="aspectFit"></nax-image>
<nax-image :src="okSrc" width="100" height="100" mode="scaleToFill"></nax-image>
```

```uts
const okSrc = ref('https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg')
```

:::

::: details 形状 shape

```uvue
<nax-image :src="okSrc" width="88" height="88" shape="square"></nax-image>
<nax-image :src="okSrc" width="88" height="88" shape="round"></nax-image>
<nax-image :src="okSrc" width="88" height="88" shape="circle"></nax-image>
```

```uts
const okSrc = ref('https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg')
```

:::

::: details 加载中 / 失败

```uvue
<nax-image force-loading width="120" height="120" loading-text="加载中"></nax-image>
<nax-image :src="badSrc" width="120" height="120" :timeout="8000" error-text="加载失败" @error="onError"></nax-image>
<nax-image src="" width="120" height="120" error-text="无图片"></nax-image>
```

```uts
const badSrc = ref('https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/nax-ui-not-found.png')

function onError() {
	// error: 加载失败
}
```

:::

::: details 自定义插槽

```uvue
<nax-image :src="badSrc" :timeout="8000" width="100%" height="140" shape="round">
	<template #error>
		<view class="slot-box">
			<text class="slot-box__text">自定义失败插槽</text>
		</view>
	</template>
</nax-image>
```

```uts
const badSrc = ref('https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/nax-ui-not-found.png')
```

:::

::: details 宽图（块级）

```uvue
<nax-image :src="okSrc" width="100%" height="160" shape="round" mode="aspectFill" @click="onClickImage"></nax-image>
```

```uts
const okSrc = ref('https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg')

function onClickImage() {
	// click: 宽图
}
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg-secondary` | 次级背景色 |
| `--nax-color-text-placeholder` | 占位文字色 |
| `--nax-color-text-secondary` | 次要文字色 |
| `--nax-image-bg` | 容器背景 |
| `--nax-image-status-bg` | 占位层背景 |
| `--nax-image-radius` | 图片圆角（`shape=round` 时，默认跟 `--nax-radius-md` / 3px，对齐 button） |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| src | string | `''` | 图片地址 |
| mode | string | `'aspectFill'` | 裁剪/缩放模式，同原生 image |
| width | string | `'100%'` | 宽度；纯数字按 px |
| height | string | `'200'` | 高度；纯数字按 px |
| shape | string | `'square'` | `square` 方形 \| `round` 圆角 \| `circle` 圆形 |
| lazyLoad | boolean | `false` | 懒加载 |
| fadeShow | boolean | `true` | 加载完成淡入（App 等端） |
| webp | boolean | `false` | 是否解析 webp（按端支持） |
| draggable | boolean | `true` | 是否可拖拽（Web） |
| showMenuByLongpress | boolean | `false` | 长按菜单（小程序） |
| showLoading | boolean | `true` | 是否展示加载占位 |
| showError | boolean | `true` | 是否展示失败占位 |
| loadingText | string | `''` | 加载文案 |
| errorText | string | `'加载失败'` | 失败文案 |
| timeout | number | `0` | 加载超时（ms）；0 不限制，超时未加载完成按失败处理 |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| load | 加载成功 |
| error | 加载失败 |
| click | 点击 |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 覆盖内容 |
| loading | 自定义加载占位 |
| error | 自定义失败占位 |
