---
demo: virtual-list
---

# nax-virtual-list

> 当前版本：0.1.13

固定行高**虚拟列表**。使用 `scroll-view` + 上下 spacer，只渲染可视区与缓冲行，适合一次性持有大量数据。
> 与 `nax-list` 的区别：`nax-list` 是滚动壳（内容自行 `v-for`，不裁剪 DOM）；本组件接管数据源并做窗口裁剪。

## 安装

```text
uni_modules/nax-virtual-list
```

easycom 自动生效，页面直接使用 `<nax-virtual-list />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 能力

- 固定 `itemHeight`：全端窗口裁剪
- 作用域插槽自定义行：`{ item, index }`
- 触底 `load`、下拉刷新、空 / 加载 / 结束 / 错误态（对齐 `nax-list`）
- 方法：`scrollToIndex` / `scrollToOffset` / `getVisibleRange`

:::

::: details 用法

### 基础（大数据）

```uvue
<nax-virtual-list
  height="480px"
  :list="list"
  :item-height="56"
  :buffer="8"
  key-field="id"
>
  <template #default="{ item, index }">
    <nax-cell :title="item.title" :value="'' + (index + 1)" is-link></nax-cell>
  </template>
</nax-virtual-list>
```

```uts
const list = ref([] as UTSJSONObject[])
// 一次性生成 / 从本地读入大量数据
```

### 触底加载更多

```uvue
<nax-virtual-list
  height="480px"
  :list="list"
  :item-height="48"
  :loading="loading"
  :finished="finished"
  @load="onLoad"
>
  <template #default="{ item, index }">
    <nax-cell :title="item.title"></nax-cell>
  </template>
</nax-virtual-list>
```

### 滚动到指定行

```uts
// 模板 ref
const vlRef = ref(null)
// 调用
// vlRef.value!.scrollToIndex(500)
```

:::

::: details 注意

1. **必须等高**：每行实际高度应等于 `item-height`，否则滚动定位会漂。
2. 必须有明确高度：`height` 或父级 flex 高度链。
3. 作用域插槽在部分端对类型较严，建议用 `UTSJSONObject` 取字段。
4. 不做瀑布流 / 不等高测量。

:::

::: details 5000 条 · 窗口裁剪

```uvue
<nax-virtual-list
	ref="basicRef"
	height="420px"
	:list="basicList"
	:item-height="52"
	:buffer="10"
	key-field="id"
	@visible-change="onVisibleChange"
	@click="onRowClick"
>
	<template #default="{ item, index }">
		<nax-cell
			:title="readTitle(item)"
			:value="indexLabel(index)"
			:label="readSub(item)"
			is-link
		></nax-cell>
	</template>
</nax-virtual-list>

<nax-button size="sm" label="滚到 #2500" @click="goIndex(2500)"></nax-button>
<nax-button size="sm" type="primary" label="滚到末尾" @click="goIndex(4999)"></nax-button>
```

```uts
// 简要 mock：5000 条固定行高数据
function makeItem(id : number, prefix : string) : UTSJSONObject {
	return {
		id: id,
		title: prefix + ' 行 #' + id.toString(),
		sub: '固定行高虚拟渲染 · id=' + id.toString()
	} as UTSJSONObject
}

const basicList = ref([] as UTSJSONObject[])
function buildBasic(count : number) {
	const rows = [] as UTSJSONObject[]
	var i = 0
	while (i < count) {
		rows.push(makeItem(i, 'Item'))
		i++
	}
	basicList.value = rows
}
buildBasic(5000)

// 滚动到指定下标
const basicRef = ref(null)
function goIndex(index : number) {
	// basicRef.value?.scrollToIndex(index)
}

function onVisibleChange(e : UTSJSONObject) {
	// 可视窗口变化：e.start / e.end
}

function onRowClick(e : UTSJSONObject) {
	// 点击行：e.index
}

function readTitle(item : any | null) : string {
	if (item == null) {
		return ''
	}
	const t = (item as UTSJSONObject)['title']
	return t != null ? ('' + t) : ''
}

function readSub(item : any | null) : string {
	if (item == null) {
		return ''
	}
	const t = (item as UTSJSONObject)['sub']
	return t != null ? ('' + t) : ''
}

function indexLabel(index : any | null) : string {
	const i = index as number
	return (i + 1).toString()
}
```

:::

::: details 触底分页追加

```uvue
<nax-virtual-list
	height="360px"
	:list="pageList"
	:item-height="72"
	:buffer="6"
	key-field="id"
	:loading="pageLoading"
	:finished="pageFinished"
	:error="pageError"
	@load="onPageLoad"
	@click-error="onPageErrorClick"
>
	<template #header>
		<view class="list-header">
			<text>已加载 {{ pageList.length }} 条</text>
		</view>
	</template>
	<template #default="{ item, index }">
		<nax-cell
			:title="readTitle(item)"
			:value="indexLabel(index)"
			:label="readSub(item)"
			is-link
		></nax-cell>
	</template>
</nax-virtual-list>
```

```uts
const pageList = ref([] as UTSJSONObject[])
const pageLoading = ref(false)
const pageFinished = ref(false)
const pageError = ref(false)
const PAGE_SIZE = 30
const PAGE_MAX = 300
let pageSeed = 0

// 初始自动 load · 每次滚到底部 +30 · 追加后保持当前位置
function onPageLoad() {
	if (pageLoading.value || pageFinished.value) {
		return
	}
	pageLoading.value = true
	pageError.value = false
	// 模拟接口：450ms 后追加一页
	setTimeout(() => {
		const next = [] as UTSJSONObject[]
		var n = 0
		while (n < PAGE_SIZE) {
			const id = pageSeed
			pageSeed++
			next.push(makeItem(id, 'Page'))
			n++
		}
		const merged = [] as UTSJSONObject[]
		var j = 0
		const cur = pageList.value
		while (j < cur.length) {
			merged.push(cur[j])
			j++
		}
		var k = 0
		while (k < next.length) {
			merged.push(next[k])
			k++
		}
		pageList.value = merged
		pageLoading.value = false
		if (pageList.value.length >= PAGE_MAX) {
			pageFinished.value = true
		}
	}, 450)
}

function onPageErrorClick() {
	pageError.value = false
}
```

:::

::: details 下拉刷新

```uvue
<nax-virtual-list
	height="320px"
	:list="rfList"
	:item-height="48"
	:buffer="6"
	key-field="id"
	:enable-refresh="true"
	:refreshing="rfRefreshing"
	:loading="rfLoading"
	:finished="rfFinished"
	@refresh="onRfRefresh"
	@update:refreshing="onRfRefreshing"
	@load="onRfLoad"
>
	<template #header>
		<view class="list-header">
			<text>批次 #{{ rfBatch }} · {{ rfList.length }} 条</text>
		</view>
	</template>
	<template #default="{ item, index }">
		<nax-cell :title="readTitle(item)" :value="indexLabel(index)"></nax-cell>
	</template>
</nax-virtual-list>
```

```uts
const rfList = ref([] as UTSJSONObject[])
const rfLoading = ref(false)
const rfFinished = ref(false)
const rfRefreshing = ref(false)
const rfBatch = ref(1)
let rfSeed = 0

function onRfRefreshing(v : boolean) {
	rfRefreshing.value = v
}

// 触底加载：400ms 后追加 25 条
function onRfLoad() {
	if (rfLoading.value || rfFinished.value || rfRefreshing.value) {
		return
	}
	rfLoading.value = true
	setTimeout(() => {
		appendRf(25)
		rfLoading.value = false
		if (rfList.value.length >= 120) {
			rfFinished.value = true
		}
	}, 400)
}

// 下拉刷新：500ms 后换新批次，批次号 +1
function onRfRefresh() {
	rfRefreshing.value = true
	rfFinished.value = false
	setTimeout(() => {
		rfBatch.value = rfBatch.value + 1
		rfSeed = 0
		rfList.value = [] as UTSJSONObject[]
		appendRf(30)
		rfRefreshing.value = false
		rfLoading.value = false
	}, 500)
}

function appendRf(count : number) {
	const next = [] as UTSJSONObject[]
	var n = 0
	while (n < count) {
		const id = rfSeed
		rfSeed++
		next.push(makeItem(id, 'B' + rfBatch.value.toString()))
		n++
	}
	const merged = [] as UTSJSONObject[]
	var j = 0
	const cur = rfList.value
	while (j < cur.length) {
		merged.push(cur[j])
		j++
	}
	var k = 0
	while (k < next.length) {
		merged.push(next[k])
		k++
	}
	rfList.value = merged
}
```

:::

::: details 空状态

```uvue
<nax-virtual-list
	height="200px"
	:list="emptyList"
	:item-height="48"
	:empty="true"
	empty-text="还没有虚拟列表数据"
></nax-virtual-list>
```

```uts
const emptyList = ref([] as UTSJSONObject[])
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 背景色 |
| `--nax-color-divider` | 分割线色 |
| `--nax-color-error` | 错误色 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-text-secondary` | 次要文字色 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| list | array | `() => []` | 完整数据源（不切片传参；内部按滚动窗口渲染） |
| itemHeight | number | `48` | 行高 px（固定等高） |
| buffer | number | `6` | 上下额外缓冲行数，默认 6；鸿蒙不足 12 抬到 12 |
| keyField | string | `''` | 业务 id 字段；行 DOM key 使用窗口位置 |
| height | string | `''` | 滚动区高度；空则 flex:1 |
| showScrollbar | boolean | `true` | 是否显示滚动条 |
| nestedScroll | boolean | `false` | Android 端与外层 scroll-view 协商嵌套滚动 |
| loading | boolean | `false` | / finished / error / empty 底栏状态（对齐 nax-list） |
| finished | boolean | `false` |  |
| error | boolean | `false` |  |
| empty | boolean | `false` |  |
| disabled | boolean | `false` |  |
| offset | number | `80` | 触底阈值 px |
| enableRefresh | boolean | `false` | 下拉刷新 |
| refreshing | boolean | `false` | 刷新中（受控） |
| refresherThreshold | number | `45` |  |
| refresherBackground | string | `'transparent'` |  |
| refresherDefaultStyle | string | `'black'` |  |
| loadingText | string | `'加载中...'` |  |
| finishedText | string | `'没有更多了'` |  |
| errorText | string | `'加载失败，点击重试'` |  |
| emptyText | string | `'暂无数据'` |  |
| emptyIcon | string | `'notes-off'` |  |
| customClass | string | `''` | 根扩展 class |
| itemClass | string | `''` | 行容器扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| load | 触底需要加载更多 |
| refresh | 下拉刷新 |
| update:refreshing |  |
| click-error |  |
| click | 点击行，payload: { index, item } |
| visible-change | 可视窗口变化，payload: { start, end } |
| scroll | 滚动，payload: { scrollTop, start, end } |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 作用域插槽 { item, index } |
| header | / footer / empty / loading / finished / error |

## Methods

| 方法 | 说明 |
|------|------|
| scrollToIndex(index, animated?) | 滚到索引（尽量置顶） |
| scrollToOffset(offsetY, animated?) | 滚到 px 偏移 |
| getVisibleRange() | `{ start, end, scrollTop }` |
| tryLoad() | canLoad 时发 load |
