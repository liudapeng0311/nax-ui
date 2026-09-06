# nax-image

`nax-ui` 图片组件（uni-app x / uvue）。

基于原生 `image` 封装，提供统一尺寸/圆角 API，以及**加载中**与**加载失败**占位。

## 安装

```text
uni_modules/nax-image
```

依赖：

```text
uni_modules/nax-icon
```

easycom 自动生效。

### 推荐同时安装主题包

```text
uni_modules/nax-ui-theme
```

并在 `App.uvue` 引入：

```css
@import "@/uni_modules/nax-ui-theme/theme/default.css";
```

页面根节点加 `class="nax-theme"`。

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


## 依赖

| 依赖 | 说明 |
|------|------|
| `nax-icon` | 图标（loading 等） |
| `nax-ui-theme` | **安装时依赖**；**运行时弱依赖**（组件内 `var(--nax-*, fallback)`，未接主题也能显示） |

> 安装 theme 后仍需：`App.uvue` `@import` + 应用 layout/页面 **一处** `class="nax-theme"`。详见 `uni_modules/nax-ui-theme/readme.md`（L0/L1/L2）。

## 基础用法

```html
<nax-image
  src="https://example.com/a.jpg"
  width="120"
  height="120"
  shape="round"
></nax-image>
```

## 加载 / 失败占位

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

## 懒加载

```html
<nax-image
  src="https://example.com/a.jpg"
  lazy-load
  width="100%"
  height="180"
></nax-image>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| src | string | `''` | 图片地址 |
| mode | string | `aspectFill` | 同原生 image mode |
| width | string | `100%` | 宽度；纯数字按 px |
| height | string | `200` | 高度；纯数字按 px |
| shape | string | `square` | `square` / `round` / `circle` |
| lazyLoad | boolean | `false` | 懒加载 |
| fadeShow | boolean | `true` | 加载完成淡入（按端支持） |
| webp | boolean | `false` | 是否解析 webp（按端支持） |
| draggable | boolean | `true` | 是否可拖拽（Web） |
| showMenuByLongpress | boolean | `false` | 长按菜单（小程序） |
| showLoading | boolean | `true` | 展示加载占位 |
| showError | boolean | `true` | 展示失败占位 |
| loadingText | string | `''` | 加载文案 |
| errorText | string | `加载失败` | 失败文案 |
| customClass | string | `''` | 根节点扩展 class |

## Events

| 事件 | 说明 |
|------|------|
| load | 加载成功（透传原生事件） |
| error | 加载失败（透传原生事件） |
| click | 点击 |

## Slots

| 插槽 | 说明 |
|------|------|
| default | 覆盖在图片上的内容 |
| loading | 自定义加载占位 |
| error | 自定义失败占位 |
