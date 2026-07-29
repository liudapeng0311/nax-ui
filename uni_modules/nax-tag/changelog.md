## 0.1.2 (2026-07-29)
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
