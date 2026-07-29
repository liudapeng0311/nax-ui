## 0.1.2 (2026-07-29)
- 移除第三方组件库参考表述，完善独立组件文档。

## 0.1.1（2026-07-29）

- 修复暗黑主题下 `variant="solid"` 图标与关闭按钮固定为白色、未与正文颜色保持一致的问题。

## 0.1.0（2026-07-20）

- 初版 `nax-alert`
- 支持 AlertTips 核心能力：type / title / description / showIcon / closable / center
- 扩展 `variant`：`light`（默认浅底）/ `solid`；兼容 `effect=light|dark`
- 支持 `show` + `update:show` 受控显示
- 事件：`click` / `close` / `update:show`；插槽：`default` / `title` / `icon`
