---
demo: empty
---

# nax-empty

> 当前版本：0.1.5

空状态占位。用于列表无数据、搜索无结果、加载失败等场景。

## 安装

- 插件市场：[nax-empty](https://ext.dcloud.net.cn/plugin?id=29034)

easycom 自动生效，页面直接使用 `<nax-empty />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 用法

```uvue
<!-- 基础 -->
<nax-empty></nax-empty>

<!-- 自定义文案 + 操作 -->
<nax-empty title="暂无订单" description="去逛逛，下单后会出现在这里">
  <template #action>
    <nax-button type="primary" size="sm" label="去首页" @click="goHome"></nax-button>
  </template>
</nax-empty>

<!-- 图标语义 -->
<nax-empty icon="file-off" description="暂无相关文件"></nax-empty>
<nax-empty icon="message-off" description="消息箱是空的"></nax-empty>

<!-- 自定义图片 -->
<nax-empty image="/static/empty.png" description="网络异常"></nax-empty>
```

:::

::: details 基础

```uvue
<nax-empty></nax-empty>
```

:::

::: details 标题 + 描述

```uvue
<nax-empty icon="notes-off" title="暂无订单" description="下单后，订单会出现在这里"></nax-empty>
```

:::

::: details 图标语义

```uvue
<nax-empty icon="file-off" description="暂无相关文件"></nax-empty>
<nax-empty icon="notes-off" description="暂无列表"></nax-empty>
<nax-empty icon="database-off" description="暂无数据"></nax-empty>
<nax-empty icon="message-off" description="消息箱是空的"></nax-empty>
```

:::

::: details 操作按钮

```uvue
<nax-empty icon="notes-off" title="列表为空" description="试着新建一条数据吧">
	<template #action>
		<nax-button type="primary" size="sm" label="新建" @click="onCreate"></nax-button>
	</template>
</nax-empty>
```

```uts
const lastEvent = ref('无')

function onCreate() {
	lastEvent.value = '新建'
}
```

:::

::: details 多个操作

action 插槽配合 nax-space 排列多个按钮。

```uvue
<nax-empty icon="search" description="换个关键词试试">
	<template #action>
		<nax-space size="sm">
			<nax-space-item>
				<nax-button size="sm" label="清空筛选" @click="onClear"></nax-button>
			</nax-space-item>
			<nax-space-item>
				<nax-button type="primary" size="sm" label="重新搜索" @click="onSearch"></nax-button>
			</nax-space-item>
		</nax-space>
	</template>
</nax-empty>
```

```uts
function onClear() {
	// 清空筛选
}

function onSearch() {
	// 重新搜索
}
```

:::

::: details 尺寸 image-size

```uvue
<nax-empty image-size="sm" description="小号 sm"></nax-empty>
<nax-empty image-size="md" description="中号 md（默认档）"></nax-empty>
```

:::

::: details 隐藏插图

```uvue
<nax-empty :show-image="false" description="仅文案的空状态"></nax-empty>
```

:::

::: details 自定义插图槽

```uvue
<nax-empty description="使用 #image 自定义">
	<template #image>
		<nax-icon name="star" size="40" color="#f0a020"></nax-icon>
	</template>
	<template #action>
		<nax-button size="sm" type="warning" label="去收藏" @click="onStar"></nax-button>
	</template>
</nax-empty>
```

```uts
function onStar() {
	// 去收藏
}
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg-secondary` | 次级背景色 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-text-secondary` | 次要文字色 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | boolean | `true` | 是否显示，默认 true |
| title | string | `''` | 主标题（可选） |
| description | string | `'暂无数据'` | 描述文案，默认「暂无数据」 |
| image | string | `''` | 插图地址；有值时优先于 icon |
| imageSize | string | `'120'` | `sm` 小 \| `md` 中 \| `lg` 大 或数字（px）；默认 120 |
| imageMode | string | `'aspectFit'` | 图片 mode，默认 aspectFit |
| icon | string | `''` | 无图时的 nax-icon 名；空则 database-off（暂无数据） |
| iconSize | string | `'48'` | `sm` 小 \| `md` 中 \| `lg` 大 或数字（px）；默认 48 |
| iconColor | string | `''` | 图标颜色 |
| showImage | boolean | `true` | 是否展示插图区，默认 true |
| customClass | string | `''` | 根节点扩展 class |



## Slots

| 插槽 | 说明 |
|------|------|
| image | 自定义插图 |
| title | 自定义标题 |
| description | 自定义描述 |
| action | 操作区（按钮等） |
| default | 额外内容 |
