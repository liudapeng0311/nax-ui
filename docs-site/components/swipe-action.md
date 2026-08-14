---
demo: swipe-action
---

# nax-swipe-action / nax-swipe-action-group

> 当前版本：0.1.4

uni-app x 滑动操作组件，功能覆盖常用场景。

## 安装

- 插件市场：[nax-swipe-action](https://ext.dcloud.net.cn/plugin?id=29065)

easycom 自动生效，页面直接使用 `<nax-swipe-action />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 基础用法

```uvue
<nax-swipe-action
  :options="options"
  @click="onAction"
>
  <nax-cell title="左滑删除"></nax-cell>
</nax-swipe-action>
```

```uts
const options = [
  { text: '删除', type: 'error', name: 'delete' }
]
```

:::

::: details 互斥展开（推荐列表场景）

```uvue
<nax-swipe-action-group>
  <nax-swipe-action
    v-for="item in list"
    :key="item.id"
    :name="item.id"
    :options="options"
    @click="onAction"
  >
    <nax-cell :title="item.title"></nax-cell>
  </nax-swipe-action>
</nax-swipe-action-group>
```

> 列表 `key` 与 `name` 请用稳定唯一 id，不要用数组下标。

:::

::: details 方法（defineExpose）

| 方法 | 说明 |
|------|------|
| open | 展开 |
| close | 收起 |

:::

::: details nax-swipe-action-group

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| customClass | string | `''` | 根扩展 class |

| 方法 | 说明 |
|------|------|
| closeAll | 收起组内全部 |

:::

::: details 基础用法

```uvue
<nax-swipe-action :options="singleOptions" @click="onSingleClick">
	<nax-cell title="左滑删除" label="options 单按钮"></nax-cell>
</nax-swipe-action>
```

```uts
const singleOptions = [
	{
		text: '删除',
		type: 'error',
		name: 'delete'
	}
]

// payload 含 name / text / itemName 字段
function onSingleClick(e: any) {
	// 处理删除
}
```

:::

::: details 多按钮 + type

```uvue
<nax-swipe-action :options="multiOptions" @click="onMultiClick">
	<nax-cell title="多操作" value="左滑试试" is-link></nax-cell>
</nax-swipe-action>
```

```uts
const multiOptions = [
	{
		text: '收藏',
		type: 'info',
		name: 'fav',
		width: 72
	},
	{
		text: '删除',
		type: 'error',
		name: 'delete',
		width: 80
	}
]

function onMultiClick(e: any) {
	// 处理点击
}
```

:::

::: details 组内互斥（推荐）

```uvue
<nax-swipe-action-group>
	<nax-swipe-action
		v-for="(id, index) in groupIds"
		:key="id"
		:name="id"
		:options="groupOptions"
		@click="onGroupClick"
	>
		<nax-cell :title="groupTitleAt(index)" :label="groupLabelAt(index)"></nax-cell>
	</nax-swipe-action>
</nax-swipe-action-group>
```

```uts
// key / name 用稳定 id，同时只展开一项
const groupIds = ref(['g1', 'g2', 'g3'] as string[])
const groupTitles = ref(['张三', '李四', '王五'] as string[])
const groupLabels = ref(['今天 10:20', '昨天', '周一'] as string[])
const groupOptions = [
	{
		text: '标为已读',
		type: 'primary',
		name: 'read',
		width: 88
	},
	{
		text: '删除',
		type: 'error',
		name: 'delete',
		width: 72
	}
]

function groupTitleAt(index: number): string {
	if (index < 0 || index >= groupTitles.value.length) {
		return ''
	}
	return groupTitles.value[index]
}

function groupLabelAt(index: number): string {
	if (index < 0 || index >= groupLabels.value.length) {
		return ''
	}
	return groupLabels.value[index]
}

function onGroupClick(e: any) {
	// 处理点击
}
```

:::

::: details 受控 show

```uvue
<nax-button size="sm" label="展开" @click="openControlled"></nax-button>
<nax-button size="sm" variant="secondary" label="收起" @click="closeControlled"></nax-button>

<nax-swipe-action v-model:show="controlledShow" :options="singleOptions" @open="onCtrlOpen" @close="onCtrlClose">
	<nax-cell title="受控项" :value="controlledValueText"></nax-cell>
</nax-swipe-action>
```

```uts
const singleOptions = [
	{
		text: '删除',
		type: 'error',
		name: 'delete'
	}
]

const controlledShow = ref(false)
const controlledValueText = computed((): string => {
	return controlledShow.value ? '已展开' : '已收起'
})

function openControlled() {
	controlledShow.value = true
}

function closeControlled() {
	controlledShow.value = false
}

function onCtrlOpen() {
	// 已展开
}

function onCtrlClose() {
	// 已收起
}
```

:::

::: details 禁用 disabled

```uvue
<nax-swipe-action disabled :options="singleOptions">
	<nax-cell title="不可滑动" label="disabled=true"></nax-cell>
</nax-swipe-action>
```

```uts
const singleOptions = [
	{
		text: '删除',
		type: 'error',
		name: 'delete'
	}
]
```

:::

::: details 自定义右侧 right 插槽

```uvue
<nax-swipe-action :right-width="88">
	<template #right>
		<view class="custom-right" @click.stop="onCustomDelete">
			<text class="custom-right__text">删除</text>
		</view>
	</template>
	<nax-cell title="自定义按钮区" label="slot right"></nax-cell>
</nax-swipe-action>
```

```uts
// custom-right 为页面自定义样式
function onCustomDelete() {
	uni.showToast({
		title: '自定义删除',
		icon: 'none'
	})
}
```

:::

::: details 列表删除示例

```uvue
<nax-swipe-action-group>
	<nax-swipe-action
		v-for="(id, index) in deleteIds"
		:key="id"
		:name="id"
		:options="deleteOptions"
		@click="onDeleteClick"
	>
		<nax-cell :title="deleteTitleAt(index)" :value="id"></nax-cell>
	</nax-swipe-action>
</nax-swipe-action-group>

<nax-button size="sm" label="重置列表" @click="resetDeletable"></nax-button>
```

```uts
// 删除后用稳定 id 当 key，避免列表错乱
const deleteIds = ref(['d1', 'd2', 'd3'] as string[])
const deleteTitles = ref(['待办 A', '待办 B', '待办 C'] as string[])
const deleteOptions = [
	{
		text: '删除',
		type: 'error',
		name: 'delete'
	}
]

function deleteTitleAt(index: number): string {
	if (index < 0 || index >= deleteTitles.value.length) {
		return ''
	}
	return deleteTitles.value[index]
}

function onDeleteClick(e: any) {
	const itemName = (e as UTSJSONObject).getString('itemName')
	const nextIds = [] as string[]
	const nextTitles = [] as string[]
	const ids = deleteIds.value
	const titles = deleteTitles.value
	for (let i = 0; i < ids.length; i++) {
		if (ids[i] != itemName) {
			nextIds.push(ids[i])
			if (i < titles.length) {
				nextTitles.push(titles[i])
			}
		}
	}
	deleteIds.value = nextIds
	deleteTitles.value = nextTitles
}

function resetDeletable() {
	deleteIds.value = ['d1', 'd2', 'd3'] as string[]
	deleteTitles.value = ['待办 A', '待办 B', '待办 C'] as string[]
}
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 背景色 |
| `--nax-color-error` | 错误色 |
| `--nax-color-info` | 信息色 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-success` | 成功色 |
| `--nax-color-text-secondary` | 次要文字色 |
| `--nax-color-warning` | 警告色 |
| `--nax-font-size-sm` | 按钮字号 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | boolean | `false` | 是否展开（受控；v-model:show） |
| disabled | boolean | `false` | 禁用滑动与按钮 |
| name | string | `''` | 项标识；组内互斥推荐传稳定 id（不要用 index） |
| index | number | `-1` | 业务序号（兼容 ；写入 click 载荷） |
| options | array | `() => [] as any[]` | 按钮列表，字段明细见下方 options 项表 |
| btnWidth | number | `72` | 默认按钮宽度（px） |
| rightWidth | number | `0` | 自定义 right 插槽宽度（px）；>0 时优先使用 |
| threshold | number | `0` | 展开阈值（px）；0 表示操作区宽度的一半 |
| autoClose | boolean | `true` | 点击按钮后自动收起 |
| closeOnClickContent | boolean | `true` | 点击内容区收起（仅已展开时） |
| vibrateShort | boolean | `false` | 展开时短震动（支持端生效） |
| customClass | string | `''` | 根节点扩展 class |

## options 项

| 字段 | 类型 | 说明 |
|------|------|------|
| text / label | string | 按钮文案 |
| name | string | 按钮标识（click 回调） |
| type | string | `default` 默认 / `primary` 主要 / `info` 信息 / `success` 成功 / `warning` 警告 / `error` 错误（`danger` 同 error） |
| color | string | 文字色覆盖 |
| bgColor / backgroundColor | string | 背景色覆盖 |
| style.backgroundColor / style.color | string | 兼容 style 写法 |
| width | number | 单项宽度（px） |
| disabled | boolean | 禁用该按钮 |


## Events

| 事件 | 说明 |
|------|------|
| update:show | v-model:show |
| open | 展开 |
| close | 收起 |
| click | 点击操作按钮；回调参数为对象，含 `index` 按钮序号、`name` 按钮标识、`text` 按钮文案、`itemName` 所在列表项 name、`itemIndex` 所在列表项 index |
| content-click | 点击内容区 |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 内容（如 nax-cell） |
| right | 自定义右侧操作区（需配合 rightWidth） |
