## 0.1.3（2026-08-01）
- 移除第三方组件库参考表述，完善独立组件文档。
## 0.1.2（2026-07-27）

- 修复鸿蒙端暗黑模式下搜索输入区仍显示浅色背景的问题
- `APP-HARMONY` 分支改为优先解析 `--nax-color-bg-hover`，变量不可用时回退 `#f3f3f5`；其他端行为保持不变

## 0.1.1（2026-07-22）

- 修复鸿蒙端搜索框背景不显示（CSS 变量 background 实色 / 内联兜底）

## 0.1.0（2026-07-22）

- 初版：`nax-search` 搜索框
- 支持 Search 主能力：`shape` / `showAction` / `animation` / `search` / `custom` / 清除 / label
- 主题弱依赖 `--nax-*`；依赖 `nax-icon`
