## 0.1.6（2026-08-18）
- 蒸汽模式兼容：`lines` CSS 声明迁移为 `<text>` 的 `:max-lines` 属性（官方蒸汽模式方案），消除 Vapor 运行时与 CSS 编译器警告
## 0.1.5（2026-08-18）
- 蒸汽模式兼容：移除 `<text>` 上不支持的 `lines` 属性，改为 CSS `lines` 声明（各文本 class 补齐 `lines: N;`），消除 App 蒸汽模式 warning
## 0.1.4（2026-08-14）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.3（2026-08-07）
- 支持 iOS 端：组件为全端公共实现，无端差异代码，iOS 直接可用
## 0.1.2（2026-08-01）
- 移除第三方组件库参考表述，完善独立组件文档。
## 0.1.1（2026-07-27）

- 修复暗黑模式下前缀图标与关闭图标仍使用浅色主题硬编码颜色的问题
- 图标颜色改为跟随 `--nax-color-text`、状态色及 `--nax-color-text-inverse` 主题 token，全端公共行为保持一致

## （2026-07-18）

- 字号阶梯改为 sm14 / **md16** / lg18（与全局控件默认 16 对齐）
## 0.1.0（2026-07-17）

- 初版 `nax-tag`
- ：type / size / bordered / round / closable / checkable / checked / disabled / strong / color
- 扩展 `variant`：`light`（默认，浅底）/ `solid` / `outline` / `text`
- 事件：`click` / `close` / `update:checked`；插槽：`default` / `icon`
