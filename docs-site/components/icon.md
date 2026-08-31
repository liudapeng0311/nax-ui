---
demo: icon
---

# nax-icon

> 当前版本：0.2.15

`nax-ui` 字体图标组件（uni-app x / uvue）。

## 安装

- 插件市场：[nax-icon](https://ext.dcloud.net.cn/plugin?id=29021)

easycom 自动生效，页面直接使用 `<nax-icon />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 基础用法

```html
<nax-icon name="search"></nax-icon>
<nax-icon name="close" size="sm" color="#999999"></nax-icon>
<nax-icon name="arrow-right" size="20" @click="onTap"></nax-icon>
```

配合按钮：

```html
<nax-button type="primary" icon="search" label="搜索"></nax-button>

<nax-button type="primary" label="搜索">
  <template #icon>
    <nax-icon name="search" size="sm" color="#ffffff"></nax-icon>
  </template>
</nax-button>
```

:::

::: details 当前支持的图标


<IconGrid :names="['close', 'check', 'plus', 'minus', 'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down', 'chevron-left', 'chevron-right', 'chevron-up', 'chevron-down', 'search', 'loading', 'info', 'warning', 'success', 'error', 'user', 'home', 'more', 'edit', 'delete', 'star', 'heart', 'settings', 'eye', 'eye-off', 'copy', 'share', 'image', 'image-off', 'loader', 'loader-4', 'square', 'circle', 'square-check', 'file-off', 'notes-off', 'database-off', 'message-off', 'category', 'category-filled', 'map-pin', 'map-pin-filled', 'player-play', 'player-pause', 'player-play-filled', 'player-pause-filled', 'arrows-maximize', 'arrows-minimize']" />



:::

::: details 尺寸 size

```uvue
<nax-icon name="search" size="sm"></nax-icon>
<nax-icon name="search" size="md"></nax-icon>
<nax-icon name="search" size="lg"></nax-icon>
<nax-icon name="search" size="28"></nax-icon>
```

:::

::: details 颜色 color

```uvue
<nax-icon name="heart" color="#d03050"></nax-icon>
<nax-icon name="star" color="#f0a020"></nax-icon>
<nax-icon name="success" color="#18a058"></nax-icon>
<nax-icon name="info" color="#2080f0"></nax-icon>
```

:::

::: details 状态

```uvue
<nax-icon name="settings" @click="onTap"></nax-icon>
<nax-icon name="settings" disabled @click="onTap"></nax-icon>
```

```uts
function onTap() {
	// 处理点击；disabled 时不会触发
}
```

:::

::: details 配合 nax-button

```uvue
<nax-button type="primary" label="搜索">
	<template #icon>
		<nax-icon name="search" size="sm"></nax-icon>
	</template>
</nax-button>
<nax-button type="error" variant="outline" label="删除">
	<template #icon>
		<nax-icon name="delete" size="sm" color="#d03050"></nax-icon>
	</template>
</nax-button>
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-text` | 主文字色 |
| `--nax-icon-color` | 图标颜色 |
| `--nax-opacity-disabled` | 禁用透明度 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | string | `''` | 图标名（必填），可选值见“当前支持的图标”，如 `close` / `search` / `arrow-right` |
| size | string | `'md'` | `sm` 小 \| `md` 中 \| `lg` 大 \| 数字字符串像素值（如 20 表示 20px） |
| color | string | `''` | 可选颜色；默认走 `--nax-icon-color` / `--nax-color-text` |
| disabled | boolean | `false` | 禁用点击 |
| customClass | string | `''` | 根节点扩展类名（class），用于自定义样式 |


## Events

| 事件 | 说明 |
|------|------|
| click | 点击；disabled 时不触发 |

