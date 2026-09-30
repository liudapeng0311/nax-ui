## 0.3.0（2026-09-30）
- 新增表头 / 合计行底色配置：组件 props `headerBackgroundColor` / `summaryBackgroundColor`（16 进制或任意 CSS 颜色字面量，内联渲染，可从业务数据动态给色、App 蒸汽模式同样生效）；同时新增组件级 token `--nax-table-header-bg` / `--nax-table-summary-bg`（优先于全局 `--nax-color-bg-secondary`，只影响本表格），三者优先级：prop > 组件 token > 全局 token；不传时观感与之前完全一致（固定列表头、固定合计行同步生效）
- 序号列（`type: 'index'`）支持 `formatter`：配了 `formatter` 时由业务接管编号渲染（如 `'No.' + (index + 1)`、补零、加前缀），`index` 为 data 绝对下标；不配时行为不变（仍为 `index + 1`，从 1 开始，排序 / 内部分页 / 虚拟滚动下连续）
- 新增日期编辑：列配置 `editor`（`date` / `datetime` / `time` / `year` / `year-month` / `month-day`）+ `editable: true` 后点击单元格弹日期选择，确认后与文本编辑同样提交 `cell-edit`（组件仍不改 data）；新增列字段 `minDate` / `maxDate`（可选范围，`'YYYY-MM-DD'` 或带时间）与 `showSecond`（datetime / time 显示秒列）
- 日期编辑写回值按原值类型：原值为数字 → 时间戳（number）；字符串 → 按列 `format`（缺省用编辑器默认模板，如 `YYYY-MM-DD` / `HH:mm`）格式化后的字符串；`cell-edit` 的 `oldValue` / `value` 语义与文本编辑一致（值未变化不触发）
- 弹层实现：`nax-datetime-picker` 单实例挂在表格根节点（编辑态单例），按列配置 `v-if` 挂载，未配日期列时不引入实例；`uni_modules.dependencies` 新增 `nax-datetime-picker`
- 微信小程序端：`date` / `year-month` / `time`（未开 `showSecond`）用微信原生 picker（`mode="date"` + `fields` 控制粒度 / `mode="time"`）；微信系统弹层只能由用户点击触发，故交互为「点单元格进入编辑态 → 再点单元格内的选择框弹出」，单元格内容即触发区（条件编译 `#ifdef MP-WEIXIN`）
- 微信端 `datetime` / `month-day` / `time` + `showSecond` 无法映射微信 picker（无对应 mode / 无秒列），退回组件自建弹层，与其它端交互一致
- 修复固定列层的行/列下标错用本地下标：固定列覆盖层的 `row-click`、多选勾选态与 `isEditingCell` / `cell-edit` 的 `colIndex` 会取到「固定列内序号」或「窗口内行号」而非绝对下标（虚拟滚动 / 分页 + 固定列组合下选中态与编辑态可能错位，序号列与文本数量也可能不一致）；现统一经 `absIndex` / `fixedColIndex` 换算，非固定列场景行为不变
- 新增列配置 `backgroundColor`（16 进制）：自定义可编辑单元格的编辑框底色，展示态（灰底虚线框）与编辑态（输入框）共用同一底色，点击前后不会突然变色；内联字面量渲染，App 蒸汽模式同样生效（原生节点 `var()` 不可靠），Web / 小程序行为一致；仅 `editable: true` 的列生效，不传时沿用原 token（展示态 `--nax-color-bg-hover`、编辑态 `--nax-color-bg`），默认观感不变；固定列正文同步生效
## 0.2.0（2026-09-29）
- 新增 `editGap` prop（`boolean`，默认 `true` 保持原样）：`edit-gap="false"` 时编辑框铺满单元格，消除相邻可编辑列之间由「单元格左右内边距」形成的空隙；左右内边距改由内部 text/input 承担，文字仍与只读列对齐；固定列正文同步支持（表头保持 12px 不位移）
- 修复可编辑单元格进入编辑态后文字跳回左对齐：编辑输入框此前不带 `text-align`（原生 input 默认左对齐），`align: 'right'` / `'center'` 的列点进去即丢对齐；现按列 `align` 输出 `text-align`，进出编辑态位置一致
- 修复 date 列 `format` 模板大小写敏感：`yyyy-mm-dd` 这类小写模板此前只有 `mm`（分钟占位）被替换，`yyyy` / `dd` 原样残留（实际渲染成 `yyyy-00-dd`）；现模板大小写不敏感（`yyyy-mm-dd` 与 `YYYY-MM-DD` 等价），`mm` 歧义按 Excel 习惯消解——出现在 `hh` 之后按分钟、否则按月份，并新增 `yy` 两位年
- 修复 date 列日期串解析的跨端/时区不一致：字符串先自行拆分量再 `new Date(y, m-1, d, h, mi, s)` 构造本地时间，避免纯日期串在 Web 被按 UTC 解析后用本地分量取值差一天；自解析失败时按 `-` → `/` 归一化交平台解析（同 `nax-datetime-picker`），带时区标识（`Z` / `±偏移`）的串仍交回平台解析（原行为不变）
- 修复 Web / 微信小程序可编辑单元格展示态底色框比单元格宽出左右内边距（`<text>` 默认 `content-box`）：补 `box-sizing: border-box`，与 App 端观感对齐；条件编译 `#ifndef APP-ANDROID || APP-IOS || APP-HARMONY`，App 三端行为不变
- number 列 `format`（`#,###.00` 千分位、`0.0%` 百分比）与既有 props / events 行为不变，属向后兼容新增与修复
## 0.1.0（2026-09-28）
- 初版 `nax-table`（uni-app x / 蒸汽模式），columns + data 数据驱动的数据表格
- 列类型 text / index / operation / selection；`stripe` 斑马纹、`border` 单元格边框、`highlight` 行点击高亮
- 固定表头（表头位于纵向滚动区外，`height` 有值时表体独立滚动）+ 列宽超出容器时横向滚动
- 文本列 `lines` 多行省略、`emptyString` 空值占位、`formatter` 自定义单元格文本、`align` / `headerAlign` 对齐、`color` 单元格文字色
- 排序：`sorter: true` 组件内部排序（受控外观 + `sort-change`）/ `sorter: 'custom'` 仅 emit `sort-change` 由业务处理
- 多选：`type: 'selection'` 表头全选 / 半选 + `selection-change`；列 `selectable` 控制行是否可勾选（禁用行不参与全选）
- 合计行 `showSummary` / `sumText` / `summaryMethod`（cell 支持 `colspan` 跨列）、分组表头 `groupTitle`（相邻同名合并）
- 分页 `showPaging`（`inner` 组件切片 / `outer` 受控 + `page-change`）、加载更多 `showLoadMore` / `finished` + `load-more`
- 固定列 `fixed`（左侧覆盖层 + 主区 `@scroll` 纵向单向同步）、虚拟滚动 `virtual` + `rowH`（spacer 占位 + 窗口裁剪）
- 可编辑单元格 `editable`（`cell-edit` 提交，组件不修改 `data`）；行焦点 `row-blur`；操作列 `renders` + `action`
- 实例方法：`resetHighlight` / `clearSelection` / `toggleRowSelection` / `toggleAllSelection` / `clearSort` / `resetPage`
- 依赖 `nax-empty`、`nax-icon`、`nax-ui-theme`
