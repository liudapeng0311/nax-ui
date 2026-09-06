
# nax-skeleton

> 当前版本：0.1.2

骨架屏。请求完成前用灰色块模拟页面结构，降低白屏感。

## 安装

- 插件市场：[nax-skeleton](https://ext.dcloud.net.cn/plugin?id=29061)

easycom 自动生效，页面直接使用 `<nax-skeleton />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 用法
```demo demo-skeleton
<!-- 基础：标题 + 3 行段落 -->
<nax-skeleton></nax-skeleton>

<!-- 列表信息流：头像 + 标题 + 段落，重复 3 条 -->
<nax-skeleton :loading="loading" avatar :rows="2" :count="3">
  <view v-for="item in list" :key="item.id">
    <text>{{ item.title }}</text>
  </view>
</nax-skeleton>

<!-- 自定义每行宽度（逗号分隔） -->
<nax-skeleton :rows="3" rows-width="100%,90%,55%"></nax-skeleton>

<!-- 自定义骨架结构 -->
<nax-skeleton :loading="loading">
  <template #skeleton>
    <view class="card-sk">
      <view class="cover" style="height:120px;background:var(--nax-color-skeleton,#f2f3f5)"></view>
    </view>
  </template>
  <view>真实内容</view>
</nax-skeleton>
```

### 基础（标题 + 段落）
```uvue
<nax-skeleton></nax-skeleton>
```

### 头像 + 标题 + 段落
```uvue
<nax-skeleton avatar :rows="2"></nax-skeleton>
```

### 方形头像 avatar-shape
```uvue
<nax-skeleton avatar avatar-shape="square" avatar-size="40" :rows="2"></nax-skeleton>
```

### 自定义行宽 rows-width
```uvue
<nax-skeleton :rows="3" rows-width="100%,88%,52%" title-width="50%"></nax-skeleton>
```

### 列表重复 count
```uvue
<nax-skeleton avatar :rows="2" :count="3" gap="20"></nax-skeleton>
```

### 关闭动画 animate=false
```uvue
<nax-skeleton :animate="false" avatar :rows="2"></nax-skeleton>
```

### 仅段落（无标题）
```uvue
<nax-skeleton :title="false" :rows="4" rows-width="100%,100%,90%,40%"></nax-skeleton>
```

### loading 切换真实内容
```uvue
<nax-skeleton :loading="demoLoading" avatar :rows="2">
	<view class="real__row">
		<view class="real__avatar"></view>
		<view class="real__body">
			<text class="real__title">张三 · 前端工程师</text>
			<text class="real__desc">骨架结束后展示真实列表项内容。</text>
		</view>
	</view>
</nax-skeleton>

<nax-button
	type="primary"
	size="sm"
	:label="demoLoading ? '结束加载' : '重新加载 1.5s'"
	@click="toggleDemo"
></nax-button>
```

```uts
const demoLoading = ref(true)
let demoTimer = -1

function toggleDemo() {
	if (demoLoading.value) {
		demoLoading.value = false
		clearTimeout(demoTimer)
		return
	}
	demoLoading.value = true
	demoTimer = setTimeout(() => {
		demoTimer = -1
		demoLoading.value = false
	}, 1500)
}
```

### 自定义骨架 #skeleton
```uvue
<nax-skeleton :loading="cardLoading">
	<template #skeleton>
		<view class="card-sk">
			<view class="card-sk__cover nax-sk-bone"></view>
			<view class="card-sk__line nax-sk-bone"></view>
			<view class="card-sk__line nax-sk-bone card-sk__line--short"></view>
		</view>
	</template>
	<view class="card-real">
		<view class="card-real__cover"></view>
		<text class="card-real__title">自定义卡片内容</text>
		<text class="card-real__desc">封面 + 两行文案已加载完成</text>
	</view>
</nax-skeleton>

<nax-button type="primary" size="sm" label="模拟卡片加载" @click="reloadCard"></nax-button>
```

骨架占位块样式（nax-sk-bone 等 class）由页面样式自行定义。

```uts
const cardLoading = ref(true)
let cardTimer = -1

function reloadCard() {
	cardLoading.value = true
	cardTimer = setTimeout(() => {
		cardTimer = -1
		cardLoading.value = false
	}, 1500)
}
```

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-skeleton` | 骨架屏占位色 |
| `--nax-skeleton-radius` | 骨架屏圆角 |

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| loading | boolean | `true` | 是否处于加载中（显示骨架），默认 true |
| animate | boolean | `true` | 是否开启动画，默认 true |
| title | boolean | `true` | 是否显示标题行，默认 true |
| avatar | boolean | `false` | 是否显示头像，默认 false |
| avatarSize | string | `'32'` | 头像边长，默认 32 |
| avatarShape | string | `'circle'` | `circle` 圆形 \| `square` 方形；默认 `circle` |
| rows | number | `3` | 段落行数，默认 3 |
| titleWidth | string | `'40%'` | 标题宽度，默认 40% |
| titleHeight | string | `'16'` | 标题高度，默认 16 |
| rowsWidth | string | `''` | 段落宽度；单值或逗号分隔；空则末行约 60% |
| rowsHeight | string | `'16'` | 段落高度；单值或逗号分隔，默认 16 |
| count | number | `1` | 骨架条目重复次数，默认 1 |
| gap | string | `'16'` | 多条目间距，默认 16 |
| customClass | string | `''` | 根节点扩展 class |

## Slots

| 插槽 | 说明 |
|------|------|
| default | loading=false 时的真实内容 |
| skeleton | 自定义骨架结构 |
