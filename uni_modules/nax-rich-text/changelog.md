## 0.2.0（2026-08-21）
- 修复 App 端（Android / iOS）富文本渲染空白 / 不全：内置 rich-text `native` 模式对 h1-h6 / ul / li 等结构标签解析不稳，会导致整块内容丢弃
- 默认渲染模式 `mode` 由 `native` 调整为 `web`（与官方默认一致，开箱即正确渲染）；`native` 保持可选，适合纯文本长内容的高性能场景
- 新增自动回退：显式传 `mode="native"` 时，检测到内容含 native 不可靠的结构标签（HTML 字符串扫描 / nodes 序列化扫描）自动改用 web 渲染
- iOS / 鸿蒙开启 `user-select` 时自动回退 web 渲染，选中复制由"不支持"变为可用
- 同步 readme 与 demo 说明

## 0.1.0（2026-08-21）
- 初版 nax-rich-text（uvue）
- 基于内置 rich-text 封装：HTML 字符串 `content` / 节点列表 `nodes` 双入口（nodes 优先）
- App 渲染模式 `mode`：默认 `native`（蒸汽模式 C 实现原生渲染）；Android VDOM 模式下 native 标签受限，可传 `web`
- 全局样式：`size` / `color` / `lineHeight` / `fontFamily` 写在 rich-text 元素自身（uni-app x 文本样式不继承）
- 内容点击事件 `itemclick` 透传（img 返回 detail.src / a 返回 detail.href；小程序端官方不支持）
- `userSelect` 可选中复制、`space` 连续空格、`show` 显隐、`customClass` 扩展
