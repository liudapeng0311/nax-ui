## 0.1.6（2026-08-18）
- 蒸汽模式兼容：`lines` CSS 声明迁移为 `<text>` 的 `:max-lines` 属性（官方蒸汽模式方案），消除 Vapor 运行时与 CSS 编译器警告
## 0.1.5（2026-08-18）
- 蒸汽模式兼容：移除 `<text>` 上不支持的 `lines` 属性，改为 CSS `lines` 声明（各文本 class 补齐 `lines: N;`），消除 App 蒸汽模式 warning
## 0.1.4（2026-08-14）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.3（2026-08-07）
- 支持 iOS 端：组件为全端公共实现，无端差异代码，iOS 直接可用
## 0.1.2（2026-07-31）
- 移除第三方组件库参考表述，完善独立组件文档。
## 0.1.1（2026-07-29）

- 修复暗黑主题下 `variant="solid"` 图标与关闭按钮固定为白色、未与正文颜色保持一致的问题。

## 0.1.0（2026-07-20）

- 初版 `nax-alert`
- 支持 AlertTips 核心能力：type / title / description / showIcon / closable / center
- 扩展 `variant`：`light`（默认浅底）/ `solid`；兼容 `effect=light|dark`
- 支持 `show` + `update:show` 受控显示
- 事件：`click` / `close` / `update:show`；插槽：`default` / `title` / `icon`
