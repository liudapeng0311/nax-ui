---
demo: badge
---

# nax-badge

> 当前版本：0.1.8

uni-app x 徽标组件，提供常用能力。

## 安装

- 插件市场：[nax-badge](https://ext.dcloud.net.cn/plugin?id=29024)

easycom 自动生效，页面直接使用 `<nax-badge />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 基础用法

```uvue
<!-- 锚定在内容右上角 -->
<nax-badge value="8">
  <view class="box"></view>
</nax-badge>

<!-- 红点 -->
<nax-badge dot>
  <view class="box"></view>
</nax-badge>

<!-- 独立展示 -->
<nax-badge alone value="99+"></nax-badge>
```

:::

::: details 基础 value

```uvue
<nax-badge value="5">
	<view class="avatar"><text class="avatar__text">消息</text></view>
</nax-badge>

<nax-badge value="15">
	<view class="avatar"><text class="avatar__text">通知</text></view>
</nax-badge>

<nax-badge value="hot">
	<view class="avatar"><text class="avatar__text">文本</text></view>
</nax-badge>
```

:::

::: details 红点 dot

```uvue
<nax-badge dot>
	<view class="avatar"><text class="avatar__text">未读</text></view>
</nax-badge>

<nax-badge dot type="success">
	<view class="avatar"><text class="avatar__text">在线</text></view>
</nax-badge>
```

:::

::: details 类型 type

```uvue
<nax-badge value="6" type="default">
	<view class="avatar"><text class="avatar__text">default</text></view>
</nax-badge>

<nax-badge value="6" type="error">
	<view class="avatar"><text class="avatar__text">error</text></view>
</nax-badge>

<nax-badge value="6" type="info">
	<view class="avatar"><text class="avatar__text">info</text></view>
</nax-badge>

<nax-badge value="6" type="success">
	<view class="avatar"><text class="avatar__text">success</text></view>
</nax-badge>

<nax-badge value="6" type="warning">
	<view class="avatar"><text class="avatar__text">warning</text></view>
</nax-badge>
```

:::

::: details 最大值 max

```uvue
<nax-badge value="100" :max="99">
	<view class="avatar"><text class="avatar__text">99+</text></view>
</nax-badge>

<nax-badge value="1000" :max="999">
	<view class="avatar"><text class="avatar__text">999+</text></view>
</nax-badge>

<nax-badge :value="countText" :max="99">
	<view class="avatar"><text class="avatar__text">动态</text></view>
</nax-badge>

<nax-button size="sm" label="-10" @click="changeCount(-10)"></nax-button>
<nax-button size="sm" label="+10" @click="changeCount(10)"></nax-button>
```

```uts
const count = ref(100)
const countText = computed((): string => {
	return '' + count.value
})

function changeCount(delta: number) {
	const next = count.value + delta
	if (next < 0) {
		count.value = 0
		return
	}
	count.value = next
}
```

:::

::: details show-zero

```uvue
<nax-badge value="0">
	<view class="avatar"><text class="avatar__text">隐藏 0</text></view>
</nax-badge>

<nax-badge value="0" show-zero>
	<view class="avatar"><text class="avatar__text">显示 0</text></view>
</nax-badge>
```

:::

::: details show 开关

```uvue
<nax-badge value="8" :show="badgeShow">
	<view class="avatar"><text class="avatar__text">可控</text></view>
</nax-badge>

<nax-button size="sm" :label="badgeShow ? '隐藏' : '显示'" @click="toggleShow"></nax-button>
```

```uts
const badgeShow = ref(true)

function toggleShow() {
	badgeShow.value = !badgeShow.value
}
```

:::

::: details processing 处理中

```uvue
<nax-badge value="3" processing>
	<view class="avatar"><text class="avatar__text">同步</text></view>
</nax-badge>

<nax-badge dot processing type="info">
	<view class="avatar"><text class="avatar__text">点</text></view>
</nax-badge>
```

:::

::: details 自定义 color

```uvue
<nax-badge value="8" color="#8a2be2">
	<view class="avatar"><text class="avatar__text">紫</text></view>
</nax-badge>

<nax-badge dot color="#f0a020">
	<view class="avatar"><text class="avatar__text">橙点</text></view>
</nax-badge>
```

:::

::: details 偏移 offset

```uvue
<nax-badge value="6" offset-x="0" offset-y="0">
	<view class="avatar"><text class="avatar__text">默认</text></view>
</nax-badge>

<nax-badge value="6" offset-x="8" offset-y="-4">
	<view class="avatar"><text class="avatar__text">偏移</text></view>
</nax-badge>
```

:::

::: details 独立 alone

```uvue
<nax-badge alone value="15"></nax-badge>
<nax-badge alone value="99+" type="success"></nax-badge>
<nax-badge alone dot></nax-badge>
<nax-badge alone value="NEW" type="warning"></nax-badge>
```

:::

::: details 自定义 value 插槽

```uvue
<nax-badge value="VIP">
	<view class="avatar"><text class="avatar__text">插槽</text></view>
	<template #value>
		<text class="custom-value">VIP</text>
	</template>
</nax-badge>
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-error` | 错误色 |
| `--nax-color-info` | 信息色 |
| `--nax-color-success` | 成功色 |
| `--nax-color-warning` | 警告色 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | string | `''` | 显示值；数字超过 max 显示 {max}+ |
| max | number | `0` | 最大值，0 表示不限制 |
| dot | boolean | `false` | 红点 |
| showZero | boolean | `false` | 值为 0 时是否展示 |
| show | boolean | `true` | 是否显示徽标 |
| processing | boolean | `false` | 处理中波纹 |
| alone | boolean | `false` | 独立展示 |
| type | string | `'default'` | `default` 默认 \| `success` 成功 \| `error` 错误 \| `warning` 警告 \| `info` 信息 |
| color | string | `''` | 自定义颜色 |
| offsetX | string | `''` | 水平偏移，正值向右 |
| offsetY | string | `''` | 垂直偏移，正值向下 |
| customClass | string | `''` | 根节点扩展 class |



## Slots

| 插槽 | 说明 |
|------|------|
| default | 锚定内容 |
| value | 自定义徽标内容 |
