export default [
  {
    heading: '排序',
    body: "```uvue\n<nax-table :data=\"list\" :columns=\"cols\" @sort-change=\"onSortChange\"></nax-table>\n```\n\n```uts\nconst cols = [\n\tnew NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),\n\t// sorter: true 表头可点，组件内部排序并按其渲染\n\tnew NaxTableColumn({ name: 'score', label: '分数', sorter: true, align: 'center' })\n]\nconst list = [\n\t{ name: '张三', score: 88 },\n\t{ name: '李四', score: 95 },\n\t{ name: '王五', score: 72 }\n]\n\n// 同列点击循环：无 → asc → desc → 无；数值列按数值比较，字符串列按码点比较\nfunction onSortChange(state : NaxTableSortState) {\n\tconsole.log(state.name, state.order, state.source)\n}\n```"
  },
  {
    heading: '自定义排序',
    body: "```uvue\n<nax-table :data=\"list\" :columns=\"cols\" @sort-change=\"onSortChange\"></nax-table>\n```\n\n```uts\nconst cols = [\n\tnew NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),\n\t// sorter: 'custom' 组件不排序，只 emit sort-change（source = 'custom'）\n\tnew NaxTableColumn({ name: 'level', label: '等级', width: '80', sorter: 'custom' })\n]\nconst list = ref([] as any[])\n\n// 业务按 name / order 自行请求或排序后替换 data；order 为 '' 表示取消排序\nfunction onSortChange(state : NaxTableSortState) {\n\tif (state.source == 'custom') {\n\t\treload(state.name, state.order)\n\t}\n}\n\nfunction reload(name : string, order : string) {\n\t// list.value = 排序后的结果\n}\n```"
  },
  {
    heading: '值映射 filters',
    body: "```uvue\n<nax-table :data=\"list\" :columns=\"cols\"></nax-table>\n```\n\n```uts\nconst cols = [\n\tnew NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),\n\t// 值 → 文案；命中展示文案，未命中回退展示原值\n\tnew NaxTableColumn({\n\t\tname: 'sex',\n\t\tlabel: '性别',\n\t\twidth: '70',\n\t\talign: 'center',\n\t\tfilters: new Map<string, string>([['0', '男'], ['1', '女']])\n\t})\n]\nconst list = [\n\t{ name: '张三', sex: 0 },\n\t{ name: '李四', sex: 1 },\n\t{ name: '王五', sex: 2 }\n]\n```"
  },
  {
    heading: '序号列 + 操作列',
    body: "```uvue\n<nax-table\n\t:data=\"list\"\n\t:columns=\"cols\"\n\theight=\"260px\"\n\t:stripe=\"true\"\n\t@action=\"onAction\"\n></nax-table>\n```\n\n```uts\nconst cols = [\n\t// 序号列自动渲染行号（从 1 开始），行号为 data 绝对下标\n\tnew NaxTableColumn({ type: 'index', width: '50', align: 'center' }),\n\tnew NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),\n\tnew NaxTableColumn({ name: 'city', label: '城市' }),\n\tnew NaxTableColumn({\n\t\ttype: 'operation',\n\t\tlabel: '操作',\n\t\twidth: '110',\n\t\trenders: [\n\t\t\tnew NaxTableOperation({ name: '编辑', type: 'primary' }),\n\t\t\tnew NaxTableOperation({ name: '删除', type: 'error' })\n\t\t]\n\t})\n]\nconst list = [\n\t{ name: '张三', city: '杭州' },\n\t{ name: '李四', city: '上海' }\n]\n\n// payload.name 为按钮文案（即操作标识），payload.index 为 data 绝对下标\nfunction onAction(payload : NaxTableActionPayload, row : any) {\n\tuni.showToast({ title: payload.name + ' 第 ' + (payload.index + 1).toString() + ' 行', icon: 'none' })\n}\n```"
  },
  {
    heading: '固定表头 + 竖向滚动',
    body: "```uvue\n<nax-table :data=\"list\" :columns=\"cols\" height=\"260px\"></nax-table>\n```\n\n```uts\n// height 有值时表体在固定高度内独立滚动，表头位于滚动区之外、天然固定；\n// 纯数字按 px，不传则表格随内容撑开（不出现纵向滚动）\nconst list = ref([] as any[])\nconst cols = [\n\tnew NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),\n\tnew NaxTableColumn({ name: 'city', label: '城市' }),\n\tnew NaxTableColumn({ name: 'age', label: '年龄', width: '70', align: 'center' })\n]\n```"
  },
  {
    heading: '横向滚动',
    body: "```uvue\n<nax-table :data=\"list\" :columns=\"cols\"></nax-table>\n```\n\n```uts\n// 各列显式指定 width，列总宽超出容器时横向滚动；\n// 指定了 width 的列不参与剩余宽度均分，未指定的列均分剩余空间\nconst cols = [\n\tnew NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),\n\tnew NaxTableColumn({ name: 'phone', label: '手机号', width: '130' }),\n\tnew NaxTableColumn({ name: 'email', label: '邮箱', width: '200' }),\n\tnew NaxTableColumn({ name: 'address', label: '地址', width: '240' })\n]\nconst list = [\n\t{ name: '张三', phone: '13800000000', email: 'zhangsan@example.com', address: '浙江省杭州市西湖区某街道 88 号' }\n]\n```"
  },
  {
    heading: '多行省略 / 空值占位 / formatter',
    body: "```uvue\n<nax-table :data=\"list\" :columns=\"cols\" empty-string=\"--\"></nax-table>\n```\n\n```uts\nconst cols = [\n\t// lines 取值 1-5，超出按行数截断省略\n\tnew NaxTableColumn({ name: 'title', label: '标题', lines: 2 }),\n\t// formatter 返回值作为单元格文本\n\tnew NaxTableColumn({\n\t\tname: 'score',\n\t\tlabel: '得分',\n\t\twidth: '80',\n\t\talign: 'center',\n\t\tformatter: (row : any, index : number) : string => {\n\t\t\tconst v = row['score']\n\t\t\tif (v == null) {\n\t\t\t\treturn '-'\n\t\t\t}\n\t\t\treturn ((v as number) + 10).toString() + ' 分'\n\t\t}\n\t}),\n\t// 列级 emptyString 优先于组件级\n\tnew NaxTableColumn({ name: 'remark', label: '备注', width: '90', emptyString: '无备注' })\n]\nconst list = [\n\t{ title: '这是一条很长很长的标题，会在第二行末尾出现省略号', score: 90, remark: '' },\n\t{ title: '短标题', remark: '正常' }\n]\n```"
  },
  {
    heading: '空状态',
    body: "```uvue\n<nax-table :data=\"[]\" :columns=\"cols\"></nax-table>\n\n<nax-table :data=\"list\" :columns=\"cols\">\n\t<template #empty>\n\t\t<nax-empty icon=\"search\" description=\"暂无数据，换个条件试试\"></nax-empty>\n\t</template>\n</nax-table>\n```\n\n```uts\n// data 为空且 empty 为 true（默认）时展示内置空态；#empty 槽可完全自定义\nconst list = ref([] as any[])\nconst cols = [\n\tnew NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),\n\tnew NaxTableColumn({ name: 'city', label: '城市' })\n]\n```"
  },
  {
    heading: '多选',
    body: "```uvue\n<nax-table :data=\"list\" :columns=\"cols\" @selection-change=\"onSelectionChange\"></nax-table>\n```\n\n```uts\nconst cols = [\n\tnew NaxTableColumn({ type: 'selection', width: '44' }),\n\tnew NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),\n\tnew NaxTableColumn({\n\t\tname: 'score',\n\t\tlabel: '分数',\n\t\twidth: '80',\n\t\talign: 'center',\n\t\t// 返回 false 的行勾选框置灰、不可勾选，且不参与全选\n\t\tselectable: (row : any, index : number) : boolean => {\n\t\t\treturn (row['score'] as number) >= 60\n\t\t}\n\t})\n]\nconst list = [\n\t{ name: '张三', score: 88 },\n\t{ name: '李四', score: 95 },\n\t{ name: '王五', score: 42 }\n]\n\n// 选中行数组按 data 绝对下标维护；替换 data 或翻页会自动清空\nfunction onSelectionChange(rows : any[]) {\n\tconsole.log('已选 ' + rows.length.toString() + ' 行')\n}\n```"
  },
  {
    heading: '合计行',
    body: "```uvue\n<nax-table :data=\"list\" :columns=\"cols\" :show-summary=\"true\" sum-text=\"合计\"></nax-table>\n```\n\n```uts\n// 默认对「全为数值的 text 列」自动求和（保留 2 位小数），非数值列留空\nconst cols = [\n\tnew NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),\n\tnew NaxTableColumn({ name: 'score', label: '分数', width: '80', align: 'center' })\n]\nconst list = [\n\t{ name: '张三', score: 88 },\n\t{ name: '李四', score: 95 }\n]\n```"
  },
  {
    heading: '自定义合计（colspan 跨列）',
    body: "```uvue\n<nax-table\n\t:data=\"list\"\n\t:columns=\"cols\"\n\t:show-summary=\"true\"\n\t:summary-method=\"mySummary\"\n></nax-table>\n```\n\n```uts\nconst cols = [\n\tnew NaxTableColumn({ type: 'selection', width: '44' }),\n\tnew NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),\n\tnew NaxTableColumn({ name: 'city', label: '城市' }),\n\tnew NaxTableColumn({ name: 'score', label: '分数', width: '80', align: 'center' })\n]\nconst list = [\n\t{ name: '张三', city: '杭州', score: 88 },\n\t{ name: '李四', city: '上海', score: 95 }\n]\n\n// 返回的单元格依次占据合计行；传了 summaryMethod 后完全由业务控制\nfunction mySummary(columns : NaxTableColumn[], data : any[]) : NaxTableSummaryCell[] {\n\tconst cells : NaxTableSummaryCell[] = []\n\tconst info = new NaxTableSummaryCell()\n\tinfo.text = '共 ' + data.length.toString() + ' 人'\n\t// 跨「复选框 + 姓名 + 城市」3 列，让平均分落到分数列下方\n\tinfo.colspan = 3\n\tcells.push(info)\n\tconst avg = new NaxTableSummaryCell()\n\tavg.text = '平均 ' + avgScore(data)\n\tavg.align = 'right'\n\tcells.push(avg)\n\treturn cells\n}\n\nfunction avgScore(data : any[]) : string {\n\tif (data.length == 0) {\n\t\treturn '0'\n\t}\n\tvar sum = 0.0\n\tfor (var i = 0; i < data.length; i++) {\n\t\tsum += data[i]['score'] as number\n\t}\n\treturn (Math.round(sum / data.length * 100) / 100).toString()\n}\n```"
  },
  {
    heading: '分组表头',
    body: "```uvue\n<nax-table :data=\"list\" :columns=\"cols\"></nax-table>\n```\n\n```uts\n// 相邻列 groupTitle 相同即合并为一组（一级分组）；空串的列不参与分组行\nconst cols = [\n\tnew NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),\n\tnew NaxTableColumn({ name: 'chinese', label: '语文', groupTitle: '成绩', align: 'center' }),\n\tnew NaxTableColumn({ name: 'math', label: '数学', groupTitle: '成绩', align: 'center' }),\n\tnew NaxTableColumn({ name: 'city', label: '城市', groupTitle: '信息' }),\n\tnew NaxTableColumn({ name: 'phone', label: '电话', groupTitle: '信息', width: '120' })\n]\nconst list = [\n\t{ name: '张三', chinese: 90, math: 85, city: '杭州', phone: '13800000001' },\n\t{ name: '李四', chinese: 78, math: 94, city: '上海', phone: '13800000002' }\n]\n```"
  },
  {
    heading: '内部分页',
    body: "```uvue\n<nax-table\n\t:data=\"list\"\n\t:columns=\"cols\"\n\theight=\"300px\"\n\t:show-paging=\"true\"\n\t:paging=\"paging\"\n\t@page-change=\"onPageChange\"\n></nax-table>\n```\n\n```uts\n// pagingMode 默认 inner：data 传全量，组件按 pageSize 自动切片\nconst list = ref([] as any[])   // 全量数据\nconst paging = new NaxTablePaging({ current: 1, pageSize: 10, pageCount: 5, navNum: true })\nconst cols = [\n\tnew NaxTableColumn({ type: 'index', width: '50', align: 'center' }),\n\tnew NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),\n\tnew NaxTableColumn({ name: 'score', label: '分数', width: '70', align: 'center' })\n]\n\nfunction onPageChange(state : NaxTablePageState) {\n\tconsole.log('第 ' + state.current.toString() + ' / ' + state.pages.toString() + ' 页')\n}\n```"
  },
  {
    heading: '外部数据分页',
    body: "```uvue\n<nax-table\n\t:data=\"pageRows\"\n\t:columns=\"cols\"\n\theight=\"300px\"\n\tpaging-mode=\"outer\"\n\t:show-paging=\"true\"\n\t:paging=\"paging\"\n\t@page-change=\"onPageChange\"\n></nax-table>\n```\n\n```uts\n// pagingMode=\"outer\"：data 只放当前页数据，组件不切片，翻页由业务请求\nconst pageRows = ref([] as any[])\nconst paging = new NaxTablePaging({ current: 1, pageSize: 10, total: 0, pageCount: 5 })\nconst cols = [\n\tnew NaxTableColumn({ type: 'index', width: '50', align: 'center' }),\n\tnew NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),\n\tnew NaxTableColumn({ name: 'score', label: '分数', width: '70', align: 'center' })\n]\n\nfunction onPageChange(state : NaxTablePageState) {\n\tpaging.current = state.current\n\tloadPage(state.current, state.pageSize)\n}\n\nfunction loadPage(current : number, pageSize : number) {\n\t// 请求第 current 页；返回后 pageRows.value = rows、paging.total = total\n}\n```"
  },
  {
    heading: '加载更多',
    body: "```uvue\n<nax-table\n\t:data=\"list\"\n\t:columns=\"cols\"\n\theight=\"240px\"\n\t:show-load-more=\"true\"\n\t:finished=\"finished\"\n\t@load-more=\"onLoadMore\"\n></nax-table>\n```\n\n```uts\nconst list = ref([] as any[])\nconst finished = ref(false)\n\n// 触底或点击「加载更多」触发；finished 为 true 后显示「没有更多了」且不再触发\nfunction onLoadMore() {\n\tloadNextPage()\n}\n\nfunction loadNextPage() {\n\t// 追加下一页数据；没有更多时 finished.value = true\n}\n```"
  },
  {
    heading: '固定列',
    body: "```uvue\n<nax-table :data=\"list\" :columns=\"cols\" height=\"240px\" :stripe=\"true\"></nax-table>\n```\n\n```uts\n// fixed: true 固定在左侧，必须显式指定 width（未指定按 100px 处理）；\n// 序号 / 多选 / 事件 index 均为 data 绝对下标，横向滚动与裁剪下保持一致\nconst cols = [\n\tnew NaxTableColumn({ name: 'name', label: '姓名', width: '90', fixed: true }),\n\tnew NaxTableColumn({ type: 'index', width: '50', align: 'center' }),\n\tnew NaxTableColumn({ name: 'city', label: '城市', width: '110' }),\n\tnew NaxTableColumn({ name: 'phone', label: '电话', width: '130' }),\n\tnew NaxTableColumn({ name: 'email', label: '邮箱', width: '190' })\n]\nconst list = ref([] as any[])\n```"
  },
  {
    heading: '虚拟滚动',
    body: "```uvue\n<nax-table\n\t:data=\"list\"\n\t:columns=\"cols\"\n\theight=\"300px\"\n\t:virtual=\"true\"\n\trow-h=\"44\"\n></nax-table>\n```\n\n```uts\n// virtual 需与 height、固定行高 rowH（默认 44px）配合使用，行高不固定时不要开启；\n// 实现为上下 spacer 占位 + 窗口裁剪（可见区 ± 5 行），与 nax-virtual-list 同思路\nconst list = ref([] as any[])   // 例如 1000 行\nconst cols = [\n\tnew NaxTableColumn({ type: 'index', width: '60', align: 'center' }),\n\tnew NaxTableColumn({ name: 'name', label: '姓名', width: '110' }),\n\tnew NaxTableColumn({ name: 'score', label: '分数', width: '80', align: 'center' })\n]\n```"
  },
  {
    heading: '字段格式化（dataType + format）',
    body: "```uvue\n<nax-table :data=\"list\" :columns=\"cols\"></nax-table>\n```\n\n```uts\nconst cols = [\n\t// date 列：YYYY / MM / DD / HH / mm / ss 占位替换\n\tnew NaxTableColumn({ name: 'date', label: '日期', width: '110', dataType: 'date', format: 'YYYY-MM-DD' }),\n\t// number 列：# 为整数位占位（#,## 千分位），后缀固定小数位\n\tnew NaxTableColumn({ name: 'amount', label: '金额', width: '110', align: 'center', dataType: 'number', format: '#,###.00' }),\n\t// 含 % 时按百分比输出\n\tnew NaxTableColumn({ name: 'weight', label: '占比', width: '90', align: 'center', dataType: 'number', format: '0.0%' })\n]\nconst list = [\n\t{ date: '2026-09-01', amount: 1234567.891, weight: 0.456 },\n\t{ date: '2026-09-15', amount: 98765.4, weight: 0.083 }\n]\n```"
  },
  {
    heading: '单元格点击',
    body: "```uvue\n<nax-table :data=\"list\" :columns=\"cols\" @cell-click=\"onCellClick\"></nax-table>\n```\n\n```uts\nconst cols = [\n\tnew NaxTableColumn({ name: 'name', label: '姓名', width: '90' }),\n\tnew NaxTableColumn({ name: 'score', label: '分数', width: '80', align: 'center' })\n]\nconst list = [\n\t{ name: '张三', score: 88 }\n]\n\n// payload.value 为单元格原始值，未经 filters / formatter 处理；\n// 点击单元格同时仍会触发 row-click\nfunction onCellClick(payload : NaxTableCellPayload, row : any) {\n\tconsole.log(payload.name, payload.colIndex, payload.index, payload.value)\n}\n```"
  },
  {
    heading: '可编辑单元格',
    body: "```uvue\n<nax-table :data=\"list\" :columns=\"cols\" @cell-edit=\"onCellEdit\"></nax-table>\n```\n\n```uts\nconst cols = [\n\tnew NaxTableColumn({ name: 'name', label: '姓名（可编辑）', width: '130', editable: true }),\n\tnew NaxTableColumn({ name: 'city', label: '城市（可编辑）', editable: true }),\n\tnew NaxTableColumn({ name: 'age', label: '年龄（只读）', width: '110', align: 'center' })\n]\nconst list = ref([\n\t{ name: '张三', city: '杭州', age: 24 },\n\t{ name: '李四', city: '上海', age: 31 }\n] as any[])\n\n// 点击进入输入态，失焦或确认后提交；组件不直接修改 props.data，由业务更新数据源；\n// dataType 为 number 的列提交时自动转数值（解析失败回退原值）\nfunction onCellEdit(payload : NaxTableCellEditPayload, row : any) {\n\trow[payload.name] = payload.value\n}\n```"
  },
  {
    heading: '实例方法（ref）',
    body: "```uvue\n<nax-table\n\tref=\"tableRef\"\n\t:data=\"list\"\n\t:columns=\"cols\"\n\theight=\"200px\"\n\t:highlight=\"true\"\n\t:show-paging=\"true\"\n\t:paging=\"paging\"\n></nax-table>\n<nax-button size=\"sm\" label=\"清除高亮\" @click=\"onClearHighlight\"></nax-button>\n<nax-button size=\"sm\" label=\"回第一页\" @click=\"onResetPage\"></nax-button>\n```\n\n```uts\n// uts 下组件 ref 不能按 any 调方法，需在业务侧声明 expose 类型\ntype NaxTableExpose = {\n\tresetHighlight : () => void\n\tclearSelection : () => void\n\ttoggleRowSelection : (index : number, selected ? : boolean) => void\n\ttoggleAllSelection : () => void\n\tclearSort : () => void\n\tresetPage : () => void\n}\n\nconst tableRef = ref(null as NaxTableExpose | null)\nconst list = ref([] as any[])\nconst paging = new NaxTablePaging({ current: 1, pageSize: 8, pageCount: 5 })\n\nfunction onClearHighlight() {\n\tconst t = tableRef.value\n\tif (t != null) {\n\t\tt.resetHighlight()\n\t}\n}\n\nfunction onResetPage() {\n\tconst t = tableRef.value\n\tif (t != null) {\n\t\tt.resetPage()\n\t}\n}\n```"
  }
]
