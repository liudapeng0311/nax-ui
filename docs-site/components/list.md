---
demo: list
---

# nax-list

> 当前版本：0.1.3

滚动列表壳。负责内部滚动触底加载、下拉刷新与空 / 加载 / 结束 / 错误状态；**行内容由业务在默认插槽自行 `v-for`**（可配合 `nax-cell`）。
> 虚拟长列表请用独立组件 `nax-virtual-list`（固定行高窗口裁剪）。

## 安装

```text
uni_modules/nax-list
```

easycom 自动生效，页面直接使用 `<nax-list />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 用法

### 分页加载

```uvue
<nax-list
  height="400px"
  :loading="loading"
  :finished="finished"
  :error="error"
  :empty="list.length == 0 && !loading && loaded"
  @load="onLoad"
>
  <nax-cell
    v-for="item in list"
    :key="item.id"
    :title="item.title"
    is-link
  ></nax-cell>
</nax-list>
```

### 下拉刷新 + 加载更多

```uvue
<nax-list
  height="400px"
  :enable-refresh="true"
  :refreshing="refreshing"
  :loading="loading"
  :finished="finished"
  @refresh="onRefresh"
  @update:refreshing="(v: boolean) => { refreshing = v }"
  @load="onLoad"
>
  <!-- items -->
</nax-list>
```

```uts
function onRefresh() {
  refreshing.value = true
  // 重拉第 1 页，重置 finished
  fetchPage(1).then((rows) => {
    list.value = rows
    finished.value = rows.length < pageSize
  }).finally(() => {
    refreshing.value = false
  })
}
```

:::

::: details 说明

1. 内部滚动模式必须有明确高度：`height` 或父级 flex 高度链。
2. `empty == true` 时不会继续自动 load；首屏请先请求再决定是否 empty。
3. **下拉刷新只在 `usePageScroll=false` 时生效**；页面滚动请用页面 `onPullDownRefresh` + `uni.stopPullDownRefresh`。
4. 刷新中会暂停触底 `load`，避免并发；业务在 `@refresh` 里重置数据与 `finished`。
5. 虚拟长列表请使用 `nax-virtual-list`，勿与本壳混为 `virtual` 开关。

:::

::: details 基础分页加载

```uvue
<nax-list
	:key="key"
	height="360px"
	:loading="loading"
	:finished="finished"
	:error="error"
	:empty="empty"
	@load="onLoad"
	@click-error="resetList"
>
	<template #header>
		<text class="list-header">已加载 {{ list.length }} 条</text>
	</template>
	<nax-cell
		v-for="(title, index) in list"
		:key="index"
		:title="title"
		:value="'' + (index + 1)"
		is-link
	></nax-cell>
</nax-list>
<nax-button size="sm" label="重置列表" @click="resetList"></nax-button>
```

```uts
const list = ref([] as string[])
const loading = ref(false)
const finished = ref(false)
const error = ref(false)
const loaded = ref(false)
const key = ref(0)
const PAGE_SIZE = 10
const TOTAL = 35

const empty = computed((): boolean => {
	return loaded.value && list.value.length == 0 && !loading.value
})

function onLoad() {
	if (loading.value || finished.value) {
		return
	}
	loading.value = true
	error.value = false
	setTimeout(() => {
		const start = list.value.length
		const next = [] as string[]
		var i = 0
		while (i < PAGE_SIZE && start + i < TOTAL) {
			next.push('列表项 ' + (start + i + 1).toString())
			i++
		}
		list.value = list.value.concat(next)
		loaded.value = true
		loading.value = false
		if (list.value.length >= TOTAL || next.length == 0) {
			finished.value = true
		}
	}, 600)
}

function resetList() {
	list.value = [] as string[]
	loading.value = false
	finished.value = false
	error.value = false
	loaded.value = false
	key.value = key.value + 1
}
```

:::

::: details 下拉刷新 + 加载更多

```uvue
<nax-list
	:key="rfKey"
	height="320px"
	:enable-refresh="true"
	:refreshing="rfRefreshing"
	:loading="rfLoading"
	:finished="rfFinished"
	:error="rfError"
	:empty="rfEmpty"
	@refresh="onRfRefresh"
	@update:refreshing="onRfRefreshing"
	@load="onRfLoad"
>
	<template #header>
		<text class="list-header">刷新批次 #{{ rfBatch }} · {{ rfList.length }} 条</text>
	</template>
	<nax-cell
		v-for="(title, index) in rfList"
		:key="index"
		:title="title"
		:label="index == 0 ? '下拉可刷新' : ''"
	></nax-cell>
</nax-list>
```

```uts
const rfList = ref([] as string[])
const rfLoading = ref(false)
const rfFinished = ref(false)
const rfError = ref(false)
const rfRefreshing = ref(false)
const rfLoaded = ref(false)
const rfPage = ref(0)
const rfBatch = ref(1)
const rfKey = ref(0)
const RF_TOTAL = 28

const rfEmpty = computed((): boolean => {
	return rfLoaded.value && rfList.value.length == 0 && !rfLoading.value && !rfRefreshing.value
})

function onRfRefreshing(val : boolean) {
	rfRefreshing.value = val
}

function onRfRefresh() {
	rfRefreshing.value = true
	rfError.value = false
	setTimeout(() => {
		// 重新拉第一页，批次 +1
		rfBatch.value = rfBatch.value + 1
		rfList.value = [] as string[]
		rfPage.value = 0
		loadPage()
	}, 800)
}

function onRfLoad() {
	loadPage()
}

function loadPage() {
	if (rfLoading.value || rfFinished.value || rfRefreshing.value) {
		return
	}
	rfLoading.value = true
	rfError.value = false
	setTimeout(() => {
		const start = rfList.value.length
		const next = [] as string[]
		var i = 0
		while (i < 10 && start + i < RF_TOTAL) {
			next.push('B' + rfBatch.value.toString() + ' · 条目 ' + (start + i + 1).toString())
			i++
		}
		rfList.value = rfList.value.concat(next)
		rfPage.value = rfPage.value + 1
		rfLoaded.value = true
		rfLoading.value = false
		rfRefreshing.value = false
		if (rfList.value.length >= RF_TOTAL || next.length == 0) {
			rfFinished.value = true
		}
	}, 500)
}
```

:::

::: details 空状态

```uvue
<nax-list height="220px" :empty="true" empty-text="暂无订单" empty-icon="notes-off">
</nax-list>
```

empty=true 时展示 nax-empty（默认 notes-off）。

:::

::: details 错误重试

```uvue
<nax-list
	:key="errKey"
	height="220px"
	:loading="errLoading"
	:finished="errFinished"
	:error="errError"
	:empty="false"
	@load="onErrLoad"
>
	<nax-cell
		v-for="(title, index) in errList"
		:key="index"
		:title="title"
	></nax-cell>
</nax-list>
<nax-button size="sm" label="重置为失败流" @click="resetErr"></nax-button>
```

```uts
const errList = ref([] as string[])
const errLoading = ref(false)
const errFinished = ref(false)
const errError = ref(false)
const errAttempt = ref(0)
const errKey = ref(0)

function onErrLoad() {
	if (errLoading.value || errFinished.value) {
		return
	}
	errLoading.value = true
	errError.value = false
	errAttempt.value = errAttempt.value + 1
	const attempt = errAttempt.value
	setTimeout(() => {
		// 前两次失败，第三次成功并 finished
		if (attempt < 3) {
			errLoading.value = false
			errError.value = true
			return
		}
		errList.value = ['恢复后的条目 A', '恢复后的条目 B'] as string[]
		errLoading.value = false
		errFinished.value = true
	}, 500)
}

function resetErr() {
	errList.value = [] as string[]
	errLoading.value = false
	errFinished.value = false
	errError.value = false
	errAttempt.value = 0
	errKey.value = errKey.value + 1
}
```

:::

::: details 自定义空态 / 底态

```uvue
<nax-list height="200px" :empty="true">
	<template #empty>
		<nax-empty icon="search" description="换个关键词试试">
			<template #action>
				<nax-button size="sm" type="primary" label="清空筛选" @click="onClearFilter"></nax-button>
			</template>
		</nax-empty>
	</template>
</nax-list>
```

```uts
function onClearFilter() {
	// 清空筛选后重新加载
}
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-error` | 错误色 |
| `--nax-color-text-secondary` | 次要文字色 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| loading | boolean | `false` | 加载更多中（受控） |
| finished | boolean | `false` | 没有更多 |
| error | boolean | `false` | 加载失败；点击重试再触发 load |
| empty | boolean | `false` | 空列表（展示空态，隐藏底部状态） |
| disabled | boolean | `false` | 禁用触底加载 |
| immediateCheck | boolean | `true` | 挂载/加载结束后检查是否需继续 load，默认 true |
| offset | number | `50` | 距底触发距离（px），映射 lower-threshold |
| height | string | `''` | 内部滚动高度；空则 flex:1 由父级撑开 |
| usePageScroll | boolean | `false` | true 时不包 scroll-view，配合页面滚动 + check() |
| showScrollbar | boolean | `true` | 是否显示滚动条 |
| enableRefresh | boolean | `false` | 是否启用下拉刷新（仅内部 scroll-view） |
| refreshing | boolean | `false` | 下拉刷新中（受控，映射 refresher-triggered） |
| refresherThreshold | number | `45` | 下拉触发阈值（px） |
| refresherBackground | string | `'transparent'` | 刷新区背景色 |
| refresherDefaultStyle | string | `'black'` | `black` 黑 \| `white` 白 \| `none` 无 |
| loadingText | string | `'加载中...'` | 加载文案 |
| finishedText | string | `'没有更多了'` | 结束文案 |
| errorText | string | `'加载失败，点击重试'` | 失败文案 |
| emptyText | string | `'暂无数据'` | 空态描述 |
| emptyIcon | string | `'notes-off'` | 空态图标，默认 notes-off |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| load |  |
| refresh |  |
| update:refreshing |  |
| click-error |  |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 列表内容 |
| header | 顶部区 |
| footer | 自定义底部（覆盖默认状态） |
| empty | / loading / finished / error 状态覆盖 |

## Methods（defineExpose）

| 方法 | 说明 |
|------|------|
| check() | 手动检查是否需 load（页面滚动触底时调用） |
| tryLoad() | 在 canLoad 时直接发 `load` |
