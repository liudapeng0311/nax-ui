## 0.1.1（2026-07-16）

- 修复鸿蒙：加载失败 / 空图 / 自定义失败插槽背景不显示
- 状态层使用 width/height:100% + 内联 background-color 兜底
- 去掉嵌套 CSS 变量写法（蒸汽模式兼容）

## 0.1.0（2026-07-16）

- 初版 nax-image（uvue）
- 原生 image 封装：mode / lazyLoad / 尺寸 / shape
- 加载中占位（默认 loading 旋转图标；App 端定时 transform 兜底）
- 加载失败 / 空 src 占位（error 图标 + 文案）
- loading / error 插槽可覆盖默认占位