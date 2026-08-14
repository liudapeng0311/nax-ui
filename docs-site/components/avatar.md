---
demo: avatar
---

# nax-avatar

> 当前版本：0.1.3

uni-app x 头像组件，提供常用能力。

## 安装

- 插件市场：[nax-avatar](https://ext.dcloud.net.cn/plugin?id=29023)

easycom 自动生效，页面直接使用 `<nax-avatar />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 基础用法

```uvue
<!-- 图片头像 -->
<nax-avatar src="https://example.com/a.jpg"></nax-avatar>

<!-- 文字头像 -->
<nax-avatar text="NA" color="#18a058"></nax-avatar>

<!-- 自定义尺寸（px） -->
<nax-avatar src="https://example.com/a.jpg" size="48"></nax-avatar>

<!-- 边框 -->
<nax-avatar src="https://example.com/a.jpg" border-color="#18a058"></nax-avatar>
```

:::

::: details 形状 shape

| 值 | 说明 |
|----|------|
| `circle` | 圆形（默认） |
| `square` | 直角方形 |
| `round` | 圆角方形 |

`round` 布尔在本组件用 `shape="circle"` 表达。

:::

::: details 尺寸 size

| 值 | 边长 | 尺寸别名 |
|----|------|------------|
| `sm` / `small` | 28px | small |
| `md` / `medium` | 34px | medium（默认） |
| `lg` / `large` | 40px | large |
| 数字字符串 | 自定义 px | number |

:::

::: details 与徽标组合

```uvue
<nax-badge value="8" dot>
  <nax-avatar src="https://example.com/a.jpg"></nax-avatar>
</nax-badge>
```

:::

::: details 基础图片

```uvue
<nax-avatar :src="okSrc"></nax-avatar>
<nax-avatar :src="okSrc" bordered></nax-avatar>
<nax-avatar :src="okSrc" @click="onAvatarClick"></nax-avatar>
```

```uts
const okSrc = '/static/logo.png'

function onAvatarClick() {
	uni.showToast({ title: 'avatar click', icon: 'none' })
}
```

:::

::: details 描边色 border-color

```uvue
<nax-avatar :src="okSrc" bordered></nax-avatar>
<nax-avatar :src="okSrc" border-color="#18a058"></nax-avatar>
<nax-avatar :src="okSrc" border-color="#2080f0" size="48"></nax-avatar>
<nax-avatar text="NA" color="#18a058" border-color="#0c7a43" size="48"></nax-avatar>
```

```uts
const okSrc = '/static/logo.png'
```

:::

::: details 尺寸 size

```uvue
<nax-avatar :src="okSrc" size="sm"></nax-avatar>
<nax-avatar :src="okSrc" size="md"></nax-avatar>
<nax-avatar :src="okSrc" size="lg"></nax-avatar>
<nax-avatar :src="okSrc" size="56"></nax-avatar>
```

```uts
const okSrc = '/static/logo.png'
```

:::

::: details 形状 shape

```uvue
<nax-avatar :src="okSrc" shape="circle" size="48"></nax-avatar>
<nax-avatar :src="okSrc" shape="round" size="48"></nax-avatar>
<nax-avatar :src="okSrc" shape="square" size="48"></nax-avatar>
```

```uts
const okSrc = '/static/logo.png'
```

:::

::: details 文字头像 text + color

```uvue
<nax-avatar text="A"></nax-avatar>
<nax-avatar text="NA" color="#18a058"></nax-avatar>
<nax-avatar text="UI" color="#2080f0"></nax-avatar>
<nax-avatar text="!" color="#d03050" size="lg"></nax-avatar>
<nax-avatar text="文" color="#f0a020" text-color="#333639"></nax-avatar>
```

:::

::: details object-fit

```uvue
<nax-avatar :src="okSrc" size="56" object-fit="cover"></nax-avatar>
<nax-avatar :src="okSrc" size="56" object-fit="contain"></nax-avatar>
<nax-avatar :src="okSrc" size="56" object-fit="fill"></nax-avatar>
```

```uts
const okSrc = '/static/logo.png'
```

:::

::: details 失败回退 fallback-src / text

```uvue
<nax-avatar
	:src="badSrc"
	:fallback-src="okSrc"
	size="48"
	@error="onError"
></nax-avatar>

<nax-avatar
	:src="badSrc"
	text="FB"
	color="#18a058"
	size="48"
	@error="onError"
></nax-avatar>

<nax-avatar :src="badSrc" size="48" @error="onError">
	<nax-icon name="user" size="20" color="#e5e5ea"></nax-icon>
</nax-avatar>
```

```uts
const okSrc = '/static/logo.png'
const badSrc = 'https://example.com/nax-avatar-not-found.png'

function onError() {
	console.log('nax-avatar error')
}
```

:::

::: details 仅插槽（无图无字）

```uvue
<nax-avatar size="48">
	<nax-icon name="user" size="22" color="#767c82"></nax-icon>
</nax-avatar>

<nax-avatar size="48" color="#18a058">
	<nax-icon name="user" size="22" color="#ffffff"></nax-icon>
</nax-avatar>
```

:::

::: details 与 nax-badge 组合

```uvue
<nax-badge value="8" offset-x="3" offset-y="-3">
	<nax-avatar :src="okSrc" size="48"></nax-avatar>
</nax-badge>

<nax-badge dot type="success" offset-x="3" offset-y="-3">
	<nax-avatar text="在" color="#2080f0" size="48"></nax-avatar>
</nax-badge>

<nax-badge value="99+" type="error" offset-x="3" offset-y="-3">
	<nax-avatar :src="okSrc" size="48" shape="round"></nax-avatar>
</nax-badge>
```

```uts
const okSrc = '/static/logo.png'
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-avatar-color` | 头像背景色 |
| `--nax-avatar-radius` | 头像圆角 |
| `--nax-avatar-radius-square` | 方形头像圆角 |
| `--nax-avatar-text-color` | 头像文字色 |
| `--nax-color-bg-hover` | 按压/悬停背景色 |
| `--nax-color-border` | 边框色 |
| `--nax-color-text-secondary` | 次要文字色 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| src | string | `''` | 图片地址 |
| text | string | `''` | 文字头像内容（无图或加载失败时展示） |
| size | string | `'md'` | `sm` 小 \| `md` 中 \| `lg` 大 \| 数字字符串（px，默认 48）；兼容 `small` / `medium` / `large` |
| shape | string | `'circle'` | `circle` 圆形 \| `square` 方形 \| `round` 圆角（`round` 等价 `circle`） |
| bordered | boolean | `false` | 是否显示描边 |
| borderColor | string | `''` | 描边颜色；有值时可单独开启描边 |
| color | string | `''` | 背景色（文字头像常用） |
| textColor | string | `''` | 文字颜色 |
| mode | string | `'aspectFill'` | 图片 mode，同原生 image；默认 aspectFill（≈ cover） |
| objectFit | string | `''` | `fill` 填充 \| `contain` 包含 \| `cover` 覆盖 \| `none` 原样 \| `scale-down` 缩小（兼容字段，优先于 `mode`） |
| fallbackSrc | string | `''` | 图片加载失败后的回退地址 |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| click | 点击 |
| load | 图片加载成功 |
| error | 图片加载失败（含 fallback 仍失败） |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 无图 / 最终失败时的自定义内容（如图标） |

## 平台说明

- 图片使用原生 `image`，`object-fit` 映射为 uni-app x `mode`。
- Harmony：根节点背景使用字面量 fallback，避免 CSS 变量失效。
