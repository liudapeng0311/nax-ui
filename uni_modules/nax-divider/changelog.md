## 0.1.1（2026-07-22）

- 修复竖向纯分割线高度塌缩：纯竖线改为根节点自身绘制（对齐 nax-line）
- 新增 `length`：竖向高度；纯竖线默认 `100%`（父级需有明确高度）
- demo 补充「拉满容器」与「与文字并排 length」两种竖向用法

## 0.1.0（2026-07-21）

- 初版 `nax-divider`（可带文字的内容分割线）
- `direction`：`horizontal` / `vertical`
- `text` / 默认插槽；`contentPosition` left/center/right
- `dashed` 虚线；`type` 语义色；`color` 透传色
- `size` hairline/sm/md；`space` 外边距
