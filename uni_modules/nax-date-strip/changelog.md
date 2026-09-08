## 0.2.1（2026-09-08）
- 修复 Android 端按压反馈：选中格子按下时 hover-class 会把背景还原成按压前值，出现「绿底白字瞬间变透明底白字」闪烁；`--hover` 态改 `opacity: 0.7` 后按压仅整体变淡、不破坏选中底色（暗黑态同步），其它端行为不变
## 0.2.0（2026-09-07）
- 新增 `selected-color` / `today-color` / `middle-color` 颜色 props：选中（含起止）/ 今天文字 / 范围中间底色，内联字面量渲染，全端生效（App 蒸汽模式不再依赖 CSS 变量解析）
- App 暗黑主题适配：`custom-class` 含 `nax-theme-dark` 时按字面量修饰各节点（新增 `--app-dark` 修饰规则，覆盖背景/文字/禁用等），与 nax-search / nax-input / nax-upload 的暗色传递约定一致；Web / 小程序行为不变
- formatter 的 `day.style` 保留，颜色 props 追加覆盖段（后写优先级高）
## 0.1.0（2026-09-05）
- 初版 `nax-date-strip`
- 横向日期选择条：单选 / 多选 / 范围选择（`v-model` + `change`）
- 支持 `min` / `max` 可选范围（默认以当前周为中心三周）
- 支持 `disabledDate` 禁用、`filter` 过滤展示、`maxDays` + `overMaxDays` 最多可选天数
- 支持 `formatter` 自定义日期文案与样式、`allowSameDay`、起止文案
- 支持 `value-format` 绑定字符串、`show-lunar` 农历展示
- 主题通过 `--nax-date-strip-*` CSS 变量定制
