# nax-swiper

`nax-ui` 轮播组件（uni-app x / uvue）。

基于原生 `swiper` / `swiper-item` 封装，提供统一 API、主题圆角与数字指示器。

## 安装

```text
uni_modules/nax-swiper
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

## 依赖

| 依赖 | 说明 |
|------|------|
| `nax-ui-theme` | **安装时依赖**（下载本插件时建议自动带上）；**运行时弱依赖**（未 `@import` / 未挂 `nax-theme` 时组件走 fallback） |

> 安装 theme 后仍需：`App.uvue` `@import` + 应用 layout/页面 **一处** `class="nax-theme"`。详见仓库 `docs/theme.md`（L0/L1/L2）。

## 基础用法

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

## 自动播放 / 循环

```html
<nax-swiper
  :list="banners"
  autoplay
  :interval="3000"
  circular
  height="180"
></nax-swiper>
```

## 受控 current

```html
<nax-swiper
  :list="banners"
  v-model:current="current"
  height="180"
  @change="onChange"
></nax-swiper>
```

## 数字指示器

```html
<nax-swiper
  :list="banners"
  indicator
  indicator-type="number"
  indicator-position="bottom-right"
  height="180"
></nax-swiper>
```

## 色块 / 文案项（推荐，微信小程序友好）

```html
<nax-swiper :list="panels" height="140"></nax-swiper>
```

```uts
const panels = ref([
  { bg: '#1677ff', text: '页 1' } as UTSJSONObject,
  { bg: '#18a058', text: '页 2' } as UTSJSONObject
] as UTSJSONObject[])
```

## 自定义 swiper-item（默认插槽）

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

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| list | array | `[]` | 图片 url，或含 `src`/`image`/`url`/`text`/`bg` 的对象 |
| current | number | `0` | 当前页（可用 `v-model:current`） |
| height | string | `160` | 高度；纯数字按 px |
| autoplay | boolean | `false` | 自动播放 |
| interval | number | `3000` | 自动切换间隔 ms |
| duration | number | `500` | 动画时长 ms |
| circular | boolean | `true` | 循环衔接 |
| vertical | boolean | `false` | 纵向 |
| indicator | boolean | `true` | 显示指示器 |
| indicatorType | string | `dot` | `dot` / `number` |
| indicatorColor | string | `''` | 指示点颜色（dot） |
| indicatorActiveColor | string | `''` | 当前指示点颜色（dot） |
| indicatorPosition | string | `bottom` | number 指示器位置 |
| imageMode | string | `aspectFill` | image mode |
| previousMargin | string | `0px` | 前边距 |
| nextMargin | string | `0px` | 后边距 |
| displayMultipleItems | number | `1` | 同时显示滑块数（会按 item 数钳制） |
| itemCount | number | `0` | 自定义 `swiper-item` 数量（`list` 为空时建议必传） |
| disableTouch | boolean | `false` | 禁止手势 |
| radius | boolean | `true` | 圆角 |
| customClass | string | `''` | 根节点扩展 class |

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
| default | 自定义 `swiper-item`（`list` 为空时；小程序请传 `itemCount`） |

## 主题

| Token | 用途 |
|-------|------|
| `--nax-swiper-radius` | 圆角（默认跟 `--nax-radius-lg`） |
| `--nax-swiper-number-bg` | 数字指示器背景 |
| `--nax-swiper-number-color` | 数字指示器文字色 |