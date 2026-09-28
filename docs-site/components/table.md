---
demo: table
---

# nax-table

> 当前版本：0.1.0

> nax-ui 数据表格组件（uni-app x / 蒸汽模式）。columns + data 数据驱动，支持斑马纹、边框、固定表头、横向滚动、排序、行数省略、空态与操作列。

## 安装

```text
uni_modules/nax-table
```

easycom 自动生效，页面直接使用 `<nax-table />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 基础用法

```uvue
<template>
	<nax-table :data="list" :columns="cols" stripe border @row-click="onRow"></nax-table>
</template>

<script setup>
	import { NaxTableColumn } from '@/uni_modules/nax-table/components/nax-table/table-types.uts'

	const cols = [
		new NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),
		new NaxTableColumn({ name: 'age', label: '年龄', width: '70', sorter: true }),
		new NaxTableColumn({ label: '#', type: 'index', width: '50' })
	]
	const list = [
		{ name: '张三', age: 24 },
		{ name: '李四', age: 31 }
	]
</script>
```

:::

::: details 排序

```uvue
<nax-table :data="list" :columns="cols" @sort-change="onSortChange"></nax-table>
```

```uts
const cols = [
	new NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),
	// sorter: true 表头可点，组件内部排序并按其渲染
	new NaxTableColumn({ name: 'score', label: '分数', sorter: true, align: 'center' })
]
const list = [
	{ name: '张三', score: 88 },
	{ name: '李四', score: 95 },
	{ name: '王五', score: 72 }
]

// 同列点击循环：无 → asc → desc → 无；数值列按数值比较，字符串列按码点比较
function onSortChange(state : NaxTableSortState) {
	console.log(state.name, state.order, state.source)
}
```

:::

::: details 自定义排序

```uvue
<nax-table :data="list" :columns="cols" @sort-change="onSortChange"></nax-table>
```

```uts
const cols = [
	new NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),
	// sorter: 'custom' 组件不排序，只 emit sort-change（source = 'custom'）
	new NaxTableColumn({ name: 'level', label: '等级', width: '80', sorter: 'custom' })
]
const list = ref([] as any[])

// 业务按 name / order 自行请求或排序后替换 data；order 为 '' 表示取消排序
function onSortChange(state : NaxTableSortState) {
	if (state.source == 'custom') {
		reload(state.name, state.order)
	}
}

function reload(name : string, order : string) {
	// list.value = 排序后的结果
}
```

:::

::: details 值映射 filters

```uvue
<nax-table :data="list" :columns="cols"></nax-table>
```

```uts
const cols = [
	new NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),
	// 值 → 文案；命中展示文案，未命中回退展示原值
	new NaxTableColumn({
		name: 'sex',
		label: '性别',
		width: '70',
		align: 'center',
		filters: new Map<string, string>([['0', '男'], ['1', '女']])
	})
]
const list = [
	{ name: '张三', sex: 0 },
	{ name: '李四', sex: 1 },
	{ name: '王五', sex: 2 }
]
```

:::

::: details 序号列 + 操作列

```uvue
<nax-table
	:data="list"
	:columns="cols"
	height="260px"
	:stripe="true"
	@action="onAction"
></nax-table>
```

```uts
const cols = [
	// 序号列自动渲染行号（从 1 开始），行号为 data 绝对下标
	new NaxTableColumn({ type: 'index', width: '50', align: 'center' }),
	new NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),
	new NaxTableColumn({ name: 'city', label: '城市' }),
	new NaxTableColumn({
		type: 'operation',
		label: '操作',
		width: '110',
		renders: [
			new NaxTableOperation({ name: '编辑', type: 'primary' }),
			new NaxTableOperation({ name: '删除', type: 'error' })
		]
	})
]
const list = [
	{ name: '张三', city: '杭州' },
	{ name: '李四', city: '上海' }
]

// payload.name 为按钮文案（即操作标识），payload.index 为 data 绝对下标
function onAction(payload : NaxTableActionPayload, row : any) {
	uni.showToast({ title: payload.name + ' 第 ' + (payload.index + 1).toString() + ' 行', icon: 'none' })
}
```

:::

::: details 固定表头 + 竖向滚动

```uvue
<nax-table :data="list" :columns="cols" height="260px"></nax-table>
```

```uts
// height 有值时表体在固定高度内独立滚动，表头位于滚动区之外、天然固定；
// 纯数字按 px，不传则表格随内容撑开（不出现纵向滚动）
const list = ref([] as any[])
const cols = [
	new NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),
	new NaxTableColumn({ name: 'city', label: '城市' }),
	new NaxTableColumn({ name: 'age', label: '年龄', width: '70', align: 'center' })
]
```

:::

::: details 横向滚动

```uvue
<nax-table :data="list" :columns="cols"></nax-table>
```

```uts
// 各列显式指定 width，列总宽超出容器时横向滚动；
// 指定了 width 的列不参与剩余宽度均分，未指定的列均分剩余空间
const cols = [
	new NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),
	new NaxTableColumn({ name: 'phone', label: '手机号', width: '130' }),
	new NaxTableColumn({ name: 'email', label: '邮箱', width: '200' }),
	new NaxTableColumn({ name: 'address', label: '地址', width: '240' })
]
const list = [
	{ name: '张三', phone: '13800000000', email: 'zhangsan@example.com', address: '浙江省杭州市西湖区某街道 88 号' }
]
```

:::

::: details 多行省略 / 空值占位 / formatter

```uvue
<nax-table :data="list" :columns="cols" empty-string="--"></nax-table>
```

```uts
const cols = [
	// lines 取值 1-5，超出按行数截断省略
	new NaxTableColumn({ name: 'title', label: '标题', lines: 2 }),
	// formatter 返回值作为单元格文本
	new NaxTableColumn({
		name: 'score',
		label: '得分',
		width: '80',
		align: 'center',
		formatter: (row : any, index : number) : string => {
			const v = row['score']
			if (v == null) {
				return '-'
			}
			return ((v as number) + 10).toString() + ' 分'
		}
	}),
	// 列级 emptyString 优先于组件级
	new NaxTableColumn({ name: 'remark', label: '备注', width: '90', emptyString: '无备注' })
]
const list = [
	{ title: '这是一条很长很长的标题，会在第二行末尾出现省略号', score: 90, remark: '' },
	{ title: '短标题', remark: '正常' }
]
```

:::

::: details 空状态

```uvue
<nax-table :data="[]" :columns="cols"></nax-table>

<nax-table :data="list" :columns="cols">
	<template #empty>
		<nax-empty icon="search" description="暂无数据，换个条件试试"></nax-empty>
	</template>
</nax-table>
```

```uts
// data 为空且 empty 为 true（默认）时展示内置空态；#empty 槽可完全自定义
const list = ref([] as any[])
const cols = [
	new NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),
	new NaxTableColumn({ name: 'city', label: '城市' })
]
```

:::

::: details 多选

```uvue
<nax-table :data="list" :columns="cols" @selection-change="onSelectionChange"></nax-table>
```

```uts
const cols = [
	new NaxTableColumn({ type: 'selection', width: '44' }),
	new NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),
	new NaxTableColumn({
		name: 'score',
		label: '分数',
		width: '80',
		align: 'center',
		// 返回 false 的行勾选框置灰、不可勾选，且不参与全选
		selectable: (row : any, index : number) : boolean => {
			return (row['score'] as number) >= 60
		}
	})
]
const list = [
	{ name: '张三', score: 88 },
	{ name: '李四', score: 95 },
	{ name: '王五', score: 42 }
]

// 选中行数组按 data 绝对下标维护；替换 data 或翻页会自动清空
function onSelectionChange(rows : any[]) {
	console.log('已选 ' + rows.length.toString() + ' 行')
}
```

:::

::: details 合计行

```uvue
<nax-table :data="list" :columns="cols" :show-summary="true" sum-text="合计"></nax-table>
```

```uts
// 默认对「全为数值的 text 列」自动求和（保留 2 位小数），非数值列留空
const cols = [
	new NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),
	new NaxTableColumn({ name: 'score', label: '分数', width: '80', align: 'center' })
]
const list = [
	{ name: '张三', score: 88 },
	{ name: '李四', score: 95 }
]
```

:::

::: details 自定义合计（colspan 跨列）

```uvue
<nax-table
	:data="list"
	:columns="cols"
	:show-summary="true"
	:summary-method="mySummary"
></nax-table>
```

```uts
const cols = [
	new NaxTableColumn({ type: 'selection', width: '44' }),
	new NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),
	new NaxTableColumn({ name: 'city', label: '城市' }),
	new NaxTableColumn({ name: 'score', label: '分数', width: '80', align: 'center' })
]
const list = [
	{ name: '张三', city: '杭州', score: 88 },
	{ name: '李四', city: '上海', score: 95 }
]

// 返回的单元格依次占据合计行；传了 summaryMethod 后完全由业务控制
function mySummary(columns : NaxTableColumn[], data : any[]) : NaxTableSummaryCell[] {
	const cells : NaxTableSummaryCell[] = []
	const info = new NaxTableSummaryCell()
	info.text = '共 ' + data.length.toString() + ' 人'
	// 跨「复选框 + 姓名 + 城市」3 列，让平均分落到分数列下方
	info.colspan = 3
	cells.push(info)
	const avg = new NaxTableSummaryCell()
	avg.text = '平均 ' + avgScore(data)
	avg.align = 'right'
	cells.push(avg)
	return cells
}

function avgScore(data : any[]) : string {
	if (data.length == 0) {
		return '0'
	}
	var sum = 0.0
	for (var i = 0; i < data.length; i++) {
		sum += data[i]['score'] as number
	}
	return (Math.round(sum / data.length * 100) / 100).toString()
}
```

:::

::: details 分组表头

```uvue
<nax-table :data="list" :columns="cols"></nax-table>
```

```uts
// 相邻列 groupTitle 相同即合并为一组（一级分组）；空串的列不参与分组行
const cols = [
	new NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),
	new NaxTableColumn({ name: 'chinese', label: '语文', groupTitle: '成绩', align: 'center' }),
	new NaxTableColumn({ name: 'math', label: '数学', groupTitle: '成绩', align: 'center' }),
	new NaxTableColumn({ name: 'city', label: '城市', groupTitle: '信息' }),
	new NaxTableColumn({ name: 'phone', label: '电话', groupTitle: '信息', width: '120' })
]
const list = [
	{ name: '张三', chinese: 90, math: 85, city: '杭州', phone: '13800000001' },
	{ name: '李四', chinese: 78, math: 94, city: '上海', phone: '13800000002' }
]
```

:::

::: details 内部分页

```uvue
<nax-table
	:data="list"
	:columns="cols"
	height="300px"
	:show-paging="true"
	:paging="paging"
	@page-change="onPageChange"
></nax-table>
```

```uts
// pagingMode 默认 inner：data 传全量，组件按 pageSize 自动切片
const list = ref([] as any[])   // 全量数据
const paging = new NaxTablePaging({ current: 1, pageSize: 10, pageCount: 5, navNum: true })
const cols = [
	new NaxTableColumn({ type: 'index', width: '50', align: 'center' }),
	new NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),
	new NaxTableColumn({ name: 'score', label: '分数', width: '70', align: 'center' })
]

function onPageChange(state : NaxTablePageState) {
	console.log('第 ' + state.current.toString() + ' / ' + state.pages.toString() + ' 页')
}
```

:::

::: details 外部数据分页

```uvue
<nax-table
	:data="pageRows"
	:columns="cols"
	height="300px"
	paging-mode="outer"
	:show-paging="true"
	:paging="paging"
	@page-change="onPageChange"
></nax-table>
```

```uts
// pagingMode="outer"：data 只放当前页数据，组件不切片，翻页由业务请求
const pageRows = ref([] as any[])
const paging = new NaxTablePaging({ current: 1, pageSize: 10, total: 0, pageCount: 5 })
const cols = [
	new NaxTableColumn({ type: 'index', width: '50', align: 'center' }),
	new NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),
	new NaxTableColumn({ name: 'score', label: '分数', width: '70', align: 'center' })
]

function onPageChange(state : NaxTablePageState) {
	paging.current = state.current
	loadPage(state.current, state.pageSize)
}

function loadPage(current : number, pageSize : number) {
	// 请求第 current 页；返回后 pageRows.value = rows、paging.total = total
}
```

:::

::: details 加载更多

```uvue
<nax-table
	:data="list"
	:columns="cols"
	height="240px"
	:show-load-more="true"
	:finished="finished"
	@load-more="onLoadMore"
></nax-table>
```

```uts
const list = ref([] as any[])
const finished = ref(false)

// 触底或点击「加载更多」触发；finished 为 true 后显示「没有更多了」且不再触发
function onLoadMore() {
	loadNextPage()
}

function loadNextPage() {
	// 追加下一页数据；没有更多时 finished.value = true
}
```

:::

::: details 固定列

```uvue
<nax-table :data="list" :columns="cols" height="240px" :stripe="true"></nax-table>
```

```uts
// fixed: true 固定在左侧，必须显式指定 width（未指定按 100px 处理）；
// 序号 / 多选 / 事件 index 均为 data 绝对下标，横向滚动与裁剪下保持一致
const cols = [
	new NaxTableColumn({ name: 'name', label: '姓名', width: '90', fixed: true }),
	new NaxTableColumn({ type: 'index', width: '50', align: 'center' }),
	new NaxTableColumn({ name: 'city', label: '城市', width: '110' }),
	new NaxTableColumn({ name: 'phone', label: '电话', width: '130' }),
	new NaxTableColumn({ name: 'email', label: '邮箱', width: '190' })
]
const list = ref([] as any[])
```

:::

::: details 虚拟滚动

```uvue
<nax-table
	:data="list"
	:columns="cols"
	height="300px"
	:virtual="true"
	row-h="44"
></nax-table>
```

```uts
// virtual 需与 height、固定行高 rowH（默认 44px）配合使用，行高不固定时不要开启；
// 实现为上下 spacer 占位 + 窗口裁剪（可见区 ± 5 行），与 nax-virtual-list 同思路
const list = ref([] as any[])   // 例如 1000 行
const cols = [
	new NaxTableColumn({ type: 'index', width: '60', align: 'center' }),
	new NaxTableColumn({ name: 'name', label: '姓名', width: '110' }),
	new NaxTableColumn({ name: 'score', label: '分数', width: '80', align: 'center' })
]
```

:::

::: details 字段格式化（dataType + format）

```uvue
<nax-table :data="list" :columns="cols"></nax-table>
```

```uts
const cols = [
	// date 列：YYYY / MM / DD / HH / mm / ss 占位替换
	new NaxTableColumn({ name: 'date', label: '日期', width: '110', dataType: 'date', format: 'YYYY-MM-DD' }),
	// number 列：# 为整数位占位（#,## 千分位），后缀固定小数位
	new NaxTableColumn({ name: 'amount', label: '金额', width: '110', align: 'center', dataType: 'number', format: '#,###.00' }),
	// 含 % 时按百分比输出
	new NaxTableColumn({ name: 'weight', label: '占比', width: '90', align: 'center', dataType: 'number', format: '0.0%' })
]
const list = [
	{ date: '2026-09-01', amount: 1234567.891, weight: 0.456 },
	{ date: '2026-09-15', amount: 98765.4, weight: 0.083 }
]
```

:::

::: details 单元格点击

```uvue
<nax-table :data="list" :columns="cols" @cell-click="onCellClick"></nax-table>
```

```uts
const cols = [
	new NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),
	new NaxTableColumn({ name: 'score', label: '分数', width: '80', align: 'center' })
]
const list = [
	{ name: '张三', score: 88 }
]

// payload.value 为单元格原始值，未经 filters / formatter 处理；
// 点击单元格同时仍会触发 row-click
function onCellClick(payload : NaxTableCellPayload, row : any) {
	console.log(payload.name, payload.colIndex, payload.index, payload.value)
}
```

:::

::: details 可编辑单元格

```uvue
<nax-table :data="list" :columns="cols" @cell-edit="onCellEdit"></nax-table>
```

```uts
const cols = [
	new NaxTableColumn({ name: 'name', label: '姓名（可编辑）', width: '130', editable: true }),
	new NaxTableColumn({ name: 'city', label: '城市（可编辑）', editable: true }),
	new NaxTableColumn({ name: 'age', label: '年龄（只读）', width: '110', align: 'center' })
]
const list = ref([
	{ name: '张三', city: '杭州', age: 24 },
	{ name: '李四', city: '上海', age: 31 }
] as any[])

// 点击进入输入态，失焦或确认后提交；组件不直接修改 props.data，由业务更新数据源；
// dataType 为 number 的列提交时自动转数值（解析失败回退原值）
function onCellEdit(payload : NaxTableCellEditPayload, row : any) {
	row[payload.name] = payload.value
}
```

:::

::: details 实例方法（ref）

```uvue
<nax-table
	ref="tableRef"
	:data="list"
	:columns="cols"
	height="200px"
	:highlight="true"
	:show-paging="true"
	:paging="paging"
></nax-table>
<nax-button size="sm" label="清除高亮" @click="onClearHighlight"></nax-button>
<nax-button size="sm" label="回第一页" @click="onResetPage"></nax-button>
```

```uts
// uts 下组件 ref 不能按 any 调方法，需在业务侧声明 expose 类型
type NaxTableExpose = {
	resetHighlight : () => void
	clearSelection : () => void
	toggleRowSelection : (index : number, selected ? : boolean) => void
	toggleAllSelection : () => void
	clearSort : () => void
	resetPage : () => void
}

const tableRef = ref(null as NaxTableExpose | null)
const list = ref([] as any[])
const paging = new NaxTablePaging({ current: 1, pageSize: 8, pageCount: 5 })

function onClearHighlight() {
	const t = tableRef.value
	if (t != null) {
		t.resetHighlight()
	}
}

function onResetPage() {
	const t = tableRef.value
	if (t != null) {
		t.resetPage()
	}
}
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 表格 / 单元格背景 |
| `--nax-color-bg-secondary` | 表头 / 合计行 / 分页器底色 |
| `--nax-color-bg-hover` | 行 hover 底色 |
| `--nax-color-border` / `--nax-color-border-strong` | 单元格边框 / 编辑态边框 |
| `--nax-color-divider` | 行分割线 |
| `--nax-color-text` | 单元格文字 |
| `--nax-color-text-secondary` | 表头 / 分页器等次要文字 |
| `--nax-color-text-placeholder` | 空值占位 |
| `--nax-color-text-disabled` | 禁用文字 |
| `--nax-color-text-inverse` | 勾选标记反白色 |
| `--nax-color-primary` / `--nax-color-primary-secondary` | 勾选框选中态 / 选中行底色 |
| `--nax-color-success` / `--nax-color-warning` / `--nax-color-error` | 操作列按钮语义色 |
| `--nax-radius-sm` / `--nax-radius-md` | 单元格 / 容器圆角 |
| `--nax-font-size-sm` | 表头与单元格字号 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| data | array | `[]` | 行数据数组 |
| columns | array | `[]` | 列配置；type 可为 text/index/operation/selection |
| stripe | boolean | `false` | 斑马纹，默认 false |
| border | boolean | `true` | 单元格边框，默认 true |
| highlight | boolean | `false` | 点击行高亮，默认 false |
| height | string | `''` | 表体高度；纯数字按 px；不传则随内容（不纵向滚动） |
| thH | string | `'40'` | 表头行高；纯数字按 px，默认 40 |
| tdH | string | `'40'` | 单元格最小行高；纯数字按 px，默认 40 |
| emptyString | string | `''` | 全局空值占位文案，列配置优先 |
| empty | boolean | `true` | 是否显示空态（data 为空时），默认 true |
| showSummary | boolean | `false` | 合计行开关，默认 false |
| sumText | string | `'合计'` | 合计行首格文案，默认「合计」 |
| summaryMethod | function | `null` | 自定义合计，colspan 跨列 |
| showPaging | boolean | `false` | 分页器开关，默认 false |
| pagingMode | string | `'inner'` | inner 组件内部分页（自动切片）/ outer 外部分页（只 emit page-change），默认 inner |
| paging | object | `new NaxTablePaging()` | 分页配置：current/pageSize/total/pageCount/navNum/prevText/nextText |
| showLoadMore | boolean | `false` | 加载更多开关；触底或点击底部触发 load-more，默认 false |
| finished | boolean | `false` | 加载完成（不再触发 load-more），默认 false |
| virtual | boolean | `false` | 虚拟滚动开关；需配合 height 与固定行高 rowH，默认 false |
| rowH | string | `'44'` | 虚拟滚动行高；纯数字按 px，默认 44 |
| customClass | string | `''` | 根节点扩展 class |

## 列类型

| type | 说明 |
|------|------|
| `text`（默认） | 普通文本列，取 `row[col.name]` |
| `index` | 序号列，自动展示行号（从 1 开始） |
| `operation` | 操作列，配合 `renders` 渲染按钮 |
| `selection` | 多选列，表头为全选/半选框 |

## NaxTableColumn

| 字段 | 说明 | 默认值 |
|------|------|--------|
| `name` | 字段名；index/operation 列可留空 | `''` |
| `label` | 表头文案 | `''` |
| `type` | `text` / `index` / `operation` | `text` |
| `width` | 列宽，纯数字按 px；不传均分 | `''` |
| `lines` | 单元格最大行数 1-5，超出省略 | `1` |
| `align` | 单元格对齐 `left/center/right` | `''` |
| `headerAlign` | 表头对齐，缺省跟随 `align` | `''` |
| `groupTitle` | 分组表头名；相邻相同自动合并 | `''` |
| `fixed` | 是否固定在左侧；需显式 `width`（缺省按 100px） | `false` |
| `filters` | 值 → 文案映射（如 `new Map([['0','男'],['1','女']])`），命中展示文案、未命中回退原值 | `new Map()` |
| `selectable` | 行是否可勾选 `(row, index) => boolean`（仅 selection 列生效）；返回 false 时勾选框置灰、不可勾选且不参与全选 | `null` |
| `dataType` | 字段类型 `date/number/string`（默认 string）；影响 `format` 解析与可编辑输入键盘 | `string` |
| `format` | 展示格式：date 列用日期模板（`YYYY-MM-DD HH:mm:ss` 占位替换）；number 列 `#,###.00` 千分位+小数位、含 `%` 输出百分比 | `''` |
| `editable` | 单元格是否可编辑：点击进入输入态（底色与只读列区分），失焦/确认提交 `cell-edit` | `false` |
| `emptyString` | 空值占位文案 | `''` |
| `color` | 单元格文字颜色（16 进制） | `''` |
| `sorter` | 是否可排序（仅 text 列）：`true` 内部排序 / `'custom'` 组件不排序、仅 emit `sort-change`（`source='custom'`）由业务处理 | `false` |
| `formatter` | 自定义单元格文本 `(row, index) => string` | `null` |
| `renders` | operation 列按钮 `NaxTableOperation[]` | `[]` |

## NaxTableOperation

| 字段 | 说明 | 默认值 |
|------|------|--------|
| `name` | 按钮文案，同时作为 `action` 事件的 `name` | `''` |
| `type` | 语义色 `primary/success/warning/error` | `primary` |


## Events

| 事件 | 说明 |
|------|------|
| row-click | 行点击；负载 (row, index)（index 为 data 绝对下标） |
| cell-click | 单元格点击；负载 NaxTableCellPayload + row |
| cell-edit | 可编辑单元格提交；负载 NaxTableCellEditPayload + row |
| row-blur | 行焦点转移；点击/聚焦另一行或表体滚动离开时，对上一活跃行 emit |
| sort-change | 排序变更；负载 NaxTableSortState |
| action | 操作列按钮点击；负载 (NaxTableActionPayload, row) |
| selection-change | 多选变化；负载选中行数组 any[]（按 data 绝对下标） |
| page-change | 页码变化；负载 NaxTablePageState |
| load-more | 触底/点击加载更多 |


## Slots

| 插槽 | 说明 |
|------|------|
| empty | 自定义空态（默认内嵌 nax-empty 简化样式） |

## Methods（defineExpose）

通过组件 ref 调用（uts 下需在业务侧声明 expose 类型）：

| 方法 | 参数 | 说明 |
|------|------|------|
| `resetHighlight()` | — | 清除当前行高亮 |
| `clearSelection()` | — | 清空所有选中行 |
| `toggleRowSelection(index, selected?)` | data 绝对下标；可省略 selected 表示切换 | 勾选/取消勾选指定行；禁用行忽略 |
| `toggleAllSelection()` | — | 全选/取消全选当前渲染范围 |
| `clearSort()` | — | 排序状态复位（不改数据顺序） |
| `resetPage()` | — | 回到第一页 |

## 分组表头

列配置 `groupTitle` 相邻相同即合并为一组（一级分组）；无 `groupTitle` 的列不参与分组行。

## 注意

- 表头位于纵向滚动区之外，`height` 有值时表体独立滚动，表头天然固定
- 列总宽超出容器时横向滚动（外层 scroll-view `scroll-x`），指定了 `width` 的列不参与均分
- 排序为受控外观：`sorter: true` 时组件内部维护排序状态并按其渲染 `viewData`（数值列按数值、字符串列按码点比较）；`sorter: 'custom'` 时组件不排序、只 emit `sort-change`（`source='custom'`），业务也可完全自行处理 `sort-change` 后替换 `data`
- `max-lines` 省略依赖文本节点能力，跨端表现以 `nax-text` 同源机制为准
- 合计行默认对「全为数值的 text 列」自动求和（保留 2 位）；非数值列留空；`summaryMethod` 传入后完全由业务控制，`colspan` 可跨列（跨列样式按列宽求和 / flex 计数展开）
- `pagingMode=inner` 时 `data` 传全量、组件按 `pageSize` 切片；`outer` 时仅展示当前页数据 + emit `page-change` 由业务请求
- 多选状态按 data 绝对下标维护，`data` 替换或翻页会自动清空；虚拟滚动换窗不影响已选状态；列配置 `selectable` 返回 false 的行勾选框置灰、不可勾选、不参与全选
- 可编辑单元格：组件不直接修改 `props.data`，提交 `cell-edit` 后由业务更新数据源；`dataType: 'number'` 提交时自动转数值（解析失败回退原值）；编辑态为单例（同时只有一个单元格在编辑）
- 行焦点转移：`row-blur` 在点击另一行/单元格时对上一活跃行触发；App 端无 hover/焦点概念，为活跃行切换的近似语义

## 固定列（v3）

- 列配置 `fixed: true` 即固定在左侧；**必须显式指定 `width`**（未指定按 100px 处理）
- 实现为独立覆盖层（absolute 定位 + z-index）：fixed 列渲染在覆盖层，主区对应槽位 `visibility: hidden` 让位，横向滚动时主区从覆盖层下方穿过
- 表体纵向同步：主区 `@scroll` 把 `scrollTop` 单向同步给固定列表体（无回环）；`height` 未设置时（无纵向滚动）两侧自然对齐
- 序号列（`index`）显示的行号、多选状态、事件 `index` 均为 data 绝对下标，滚动/裁剪/分页下保持一致
- 与分组表头组合时分组行暂不支持（分组行仍按主区全列渲染，覆盖层不含分组行）；建议固定列与分组表头二选一

## 虚拟滚动（v3）

- `virtual: true` + `height` + 固定 `rowH`（默认 44px）三者配合使用；行高不固定时不要开启
- 实现为上下 spacer 占位 + 窗口裁剪（可见区 ± 5 行），与 `nax-virtual-list` 同思路
- 与 `showPaging(inner)` 组合时窗口重置到当前页头部；与多选组合时选择按绝对下标维护

## 平台说明

- **App（Android / iOS / 鸿蒙，蒸汽模式）**：支持
- **Web**：支持
- **微信小程序**：支持
