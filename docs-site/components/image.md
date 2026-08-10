---
demo: image
---

# nax-image

> 当前版本：0.1.7（见 `changelog.md`）

`nax-ui` 图片组件（uni-app x / uvue）。
基于原生 `image` 封装，提供统一尺寸/圆角 API，以及**加载中**与**加载失败**占位。

## 安装

```text
uni_modules/nax-image
```

easycom 自动生效，页面直接使用 `<nax-image />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 依赖

| 依赖 | 说明 |
|------|------|
| `nax-icon` | 图标（loading 等） |
| `nax-ui-theme` | **安装时依赖**；**运行时弱依赖**（组件内 `var(--nax-*, fallback)`，未接主题也能显示） |


## 代码示例

### 基础用法

```html
<nax-image
  src="https://example.com/a.jpg"
  width="120"
  height="120"
  shape="round"
></nax-image>
```

### 加载 / 失败占位

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

### 懒加载

```html
<nax-image
  src="https://example.com/a.jpg"
  lazy-load
  width="100%"
  height="180"
></nax-image>
```

### Slots

| 插槽 | 说明 |
|------|------|
| default | 覆盖在图片上的内容 |
| loading | 自定义加载占位 |
| error | 自定义失败占位 |

### 主题

| Token | 用途 |
|-------|------|
| `--nax-image-bg` | 容器背景 |
| `--nax-image-status-bg` | 占位层背景 |
| `--nax-image-radius` | `shape=round` 圆角（默认跟 `--nax-radius-md` / 3px，对齐 button） |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| src | string | `''` | 图片地址 |
| mode | string | `'aspectFill'` | 裁剪/缩放模式，同原生 image |
| width | string | `'100%'` | 宽度；纯数字按 px |
| height | string | `'200'` | 高度；纯数字按 px |
| shape | string | `'square'` | square \| round \| circle |
| lazyLoad | boolean | `false` | 懒加载 |
| fadeShow | boolean | `true` | 加载完成淡入（App 等端） |
| webp | boolean | `false` | 是否解析 webp（按端支持） |
| draggable | boolean | `true` | 是否可拖拽（Web） |
| showMenuByLongpress | boolean | `false` | 长按菜单（小程序） |
| showLoading | boolean | `true` | 是否展示加载占位 |
| showError | boolean | `true` | 是否展示失败占位 |
| loadingText | string | `''` | 加载文案 |
| errorText | string | `'加载失败'` | 失败文案 |
| timeout | number | `0` |  |
| /** 强制显示加载占位（不发起/不展示真实图，便于演示） */
		forceLoading | boolean | `false` |  |
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
