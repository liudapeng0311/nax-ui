## 0.3.1（2026-09-10）
- 修复 host 关闭退场期间位置残留：`closeNaxPopup()` / 关闭按钮 / 遮罩关闭统一走 `closeHostSession`，退场期间冻结最后面板位置（`hostClosing` + `lastHostPosition`），picker 完全卸载后再恢复 props 位置，避免 position 提前翻转导致 picker 抽屉分支切换、根层无法卸载；`onUnmounted` 兜底覆盖退场期间无 picker 实例的场景
- 小程序降级保护：`openNaxPopup()` 传入自定义 url 时，不支持 dialogPage 的端不再静默降级打开空白面板，改为 console.warn 提示并直接返回，建议业务改用 nax-picker 声明式插槽或普通页面跳转
- 微信小程序左右抽屉顶部安全距离判定修正：胶囊避让不再只看 `position == 'right'`，改为按面板实际横向范围（width 空值按默认 78% 屏宽、纯数字按 px、百分比按屏宽折算）判断是否覆盖胶囊区域——左抽屉宽度过半、右抽屉覆盖时均预留到胶囊下沿
## 0.3.0（2026-09-08）
- 新增头部区域：标题（16px 加粗左对齐 + 单行省略）固定在 45px 高头部，右上角「✕」关闭按钮（17px 图标、26px 触区）
- 新增 `showHeader` / `showClose` prop（默认 `true`）：`showHeader` 控制整体头部（含标题与关闭按钮）显示；`showClose` 控制右上角关闭
- 命令式 `openNaxPopup()` options 同步支持 `showHeader` / `showClose`（内置 dialogPage host 与页面宿主均生效）
- `showClose=false` 时右上角隐藏关闭按钮，底部保留「关闭」按钮作为兜底关闭渠道
- 简易面板的 title 文案从正文区移入头部展示；面板加 `flex: 1` 支持定高面板内插槽 scroll-view 占满剩余空间滚动（演示页新增「面板内滚动」示例）
## 0.2.5（2026-08-18）
- 蒸汽模式兼容：`lines` CSS 声明迁移为 `<text>` 的 `:max-lines` 属性（官方蒸汽模式方案），消除 Vapor 运行时与 CSS 编译器警告
## 0.2.4（2026-08-18）
- 蒸汽模式兼容：移除 `<text>` 上不支持的 `lines` 属性，改为 CSS `lines` 声明（各文本 class 补齐 `lines: N;`），消除 App 蒸汽模式 warning
## 0.2.3（2026-08-14）
- 精简 readme：移除内部开发向内容（设计说明 / 实现细节 / 平台差异实现等），只保留安装、用法、API、主题等用户文档
## 0.2.2（2026-08-11）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.2.1（2026-08-07）
- 支持IOS端。
## 0.2.0（2026-08-01）
- 新增 `openNaxPopup({ themeClass })`：内置 dialogPage host 可应用传入的主题 class，解决独立页面无法继承触发页暗色主题的问题。
- 演示：window 模式传递当前 `nax-theme-dark`；自定义 `demo-dialog` 同步演示工程的暗色状态。
## 0.1.1（2026-07-21）

- 鸿蒙：压窗遮罩对齐 nax-picker 三阶段动画，修复半透明背景闪动
- 内置 host 默认 dialogPage animationType 改为 none，避免与内部淡入叠闪
- 关闭时先退场再 closeDialogPage

## 0.1.0（2026-07-21）

- 首版：压窗屏 `nax-popup`
- App / Web：`openNaxPopup()` 走 `uni.openDialogPage`，可盖住原生导航栏与 tabBar
- 内置 host 页：`uni_modules/nax-popup/pages/host/index`（简易 title/content）
- 声明式 `<nax-popup v-model:show>`：页面级插槽弹层（薄封装 nax-picker）
- 微信小程序：无 dialogPage，降级页面级宿主并在 readme 说明限制
