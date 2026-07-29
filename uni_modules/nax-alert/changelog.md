## 0.1.1（2026-07-29）

- 修复暗黑主题下 `variant="solid"` 图标与关闭按钮固定为白色、未与正文颜色保持一致的问题。

## 0.1.0（2026-07-20）

- 初版 `nax-alert`
- 对齐 uView Pro AlertTips 核心能力：type / title / description / showIcon / closable / center
- 扩展 `variant`：`light`（默认浅底）/ `solid`；兼容 `effect=light|dark`
- 支持 `show` + `update:show` 受控显示
- 事件：`click` / `close` / `update:show`；插槽：`default` / `title` / `icon`
