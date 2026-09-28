# nax-table 表格

> nax-ui 数据表格组件（uni-app x / 蒸汽模式）。columns + data 数据驱动，支持斑马纹、边框、固定表头、横向滚动、排序、行数省略、空态与操作列。

## 用法示例

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

## Props — Props

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| `data` | 行数据数组 | `any[]` | `[]` |
| `columns` | 列配置（`NaxTableColumn[]`） | `NaxTableColumn[]` | `[]` |
| `stripe` | 斑马纹 | `boolean` | `false` |
| `border` | 单元格边框 | `boolean` | `true` |
| `highlight` | 点击行高亮 | `boolean` | `false` |
| `height` | 表体高度；纯数字按 px；不传随内容不纵向滚动 | `string` | `''` |
| `thH` | 表头行高 | `string` | `'40'` |
| `tdH` | 单元格最小行高 | `string` | `'40'` |
| `emptyString` | 全局空值占位文案（列配置 `emptyString` 优先） | `string` | `''` |
| `empty` | data 为空时是否展示内置空态 | `boolean` | `true` |
| `showSummary` | 合计行开关 | `boolean` | `false` |
| `sumText` | 合计行首格文案 | `string` | `'合计'` |
| `summaryMethod` | 自定义合计 `(columns, data) => NaxTableSummaryCell[]`；cell 支持 `colspan` 跨列 | `function \| null` | `null` |
| `showPaging` | 分页器开关 | `boolean` | `false` |
| `pagingMode` | `inner` 组件内部自动切片 / `outer` 只 emit `page-change` | `string` | `'inner'` |
| `paging` | 分页配置 `NaxTablePaging`（`current/pageSize/total/pageCount/navNum/prevText/nextText`） | `NaxTablePaging` | — |
| `showLoadMore` | 加载更多开关（触底或点击触发 `load-more`） | `boolean` | `false` |
| `finished` | 加载完成（显示「没有更多了」且不再触发） | `boolean` | `false` |
| `virtual` | 虚拟滚动开关；需配合 `height` 与固定行高 `rowH` | `boolean` | `false` |
| `rowH` | 虚拟滚动行高（px） | `string` | `'44'` |
| `custom-class` | 根节点扩展 class | `string` | `''` |

## Props — NaxTableColumn

| 字段 | 说明 | 默认值 |
|---|---|---|
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

## Props — NaxTableOperation

| 字段 | 说明 | 默认值 |
|---|---|---|
| `name` | 按钮文案，同时作为 `action` 事件的 `name` | `''` |
| `type` | 语义色 `primary/success/warning/error` | `primary` |

## Events

| 事件 | 负载 | 说明 |
|---|---|---|
| `row-click` | `(row, index)` | 行点击 |
| `cell-click` | `(NaxTableCellPayload, row)` | 单元格点击；payload 含 `name` / `colIndex` / `index`（data 绝对下标）/ `value`（未经 filters/formatter 处理的原始值） |
| `cell-edit` | `(NaxTableCellEditPayload, row)` | 可编辑单元格提交（失焦或确认）；payload 含 `name` / `colIndex` / `index` / `oldValue` / `value`；组件不改 data，由业务更新数据源 |
| `row-blur` | `(row, index)` | 行焦点转移：点击/聚焦另一行时对上一活跃行触发（App 端无 hover/焦点语义，以活跃行切换近似） |
| `sort-change` | `NaxTableSortState`（`name` + `order: asc/desc/''` + `source: internal/custom`） | 点击可排序列表头；同列循环 无→asc→desc→无。`internal` 组件内部排序；`custom`（sorter='custom'）组件不排序，业务自行处理 |
| `action` | `(NaxTableActionPayload, row)` | 操作列按钮点击；payload 含 `name` / `index` |
| `selection-change` | `any[]` 选中行数组 | 多选变化；翻页/换数据自动清空 |
| `page-change` | `NaxTablePageState`（`current/pageSize/pages`） | 页码变化；`outer` 模式由业务自行请求并替换 `data` |
| `load-more` | 无 | 触底或点击「加载更多」；`finished=true` 后不再触发 |

## Slots

| 插槽 | 说明 |
|---|---|
| `empty` | 自定义空态（默认内嵌 nax-empty 简化样式） |

## Methods（ref 调用）

| 方法 | 参数 | 说明 |
|---|---|---|
| `resetHighlight()` | — | 清除当前行高亮 |
| `clearSelection()` | — | 清空所有选中行 |
| `toggleRowSelection(index, selected?)` | data 绝对下标；可省略 selected 表示切换 | 勾选/取消勾选指定行；禁用行忽略 |
| `toggleAllSelection()` | — | 全选/取消全选当前渲染范围 |
| `clearSort()` | — | 排序状态复位（不改数据顺序） |
| `resetPage()` | — | 回到第一页 |

## 依赖

- `nax-empty`（空态占位）
- `nax-icon`（多选勾选 / 半选标记）
- `nax-ui-theme`（可选 token）

## 平台说明

- **App（Android / iOS / 鸿蒙，蒸汽模式）**：支持
- **Web**：支持
- **微信小程序**：支持
