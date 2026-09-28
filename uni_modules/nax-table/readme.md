# nax-table 表格

> nax-ui 数据表格组件（uni-app x / 蒸汽模式）。columns + data 数据驱动，支持斑马纹、边框、固定表头、横向滚动、排序、行数省略、空态与操作列。

## 引入

easycom 自动注册，页面直接使用 `<nax-table />`，无需 import。

## 基础用法

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

## 列类型

| type | 说明 |
|------|------|
| `text`（默认） | 普通文本列，取 `row[col.name]` |
| `index` | 序号列，自动展示行号（从 1 开始） |
| `operation` | 操作列，配合 `renders` 渲染按钮 |
| `selection` | 多选列，表头为全选/半选框 |

## 分组表头

列配置 `groupTitle` 相邻相同即合并为一组（一级分组）；无 `groupTitle` 的列不参与分组行。

## Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
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

| 事件 | 负载 | 说明 |
|------|------|------|
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
|------|------|
| `empty` | 自定义空态（默认内嵌 nax-empty 简化样式） |

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

## 依赖

- `nax-empty`（空态占位）
- `nax-icon`（多选勾选 / 半选标记）
- `nax-ui-theme`（可选 token）

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
