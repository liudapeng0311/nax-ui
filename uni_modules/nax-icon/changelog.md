## 0.1.8（2026-07-17）
- 新增内置图标：image / image-off / loader

## 0.1.7（2026-07-16）

- package：安装依赖增加 nax-ui-theme（运行时仍弱依赖 + fallback）

## 0.1.6（2026-07-16）

- 鸿蒙：include-font-padding 仅在 APP-ANDROID 条件编译中声明，消除 uvue-css WARNING
## 0.1.5（2026-07-15）

- 根节点改为单 `<text>`，去掉 view/text 嵌套，修复字形在方盒内偏移
- 宽高/字号/行高全部使用 inline px，避免 web 出现 18 盒 17 字号
- 字形在 em 方盒内几何居中（修复 plus 等左右不等边距）

## 0.1.4（2026-07-15）

- 修复 web/小程序：图标字形在自身方盒内偏移
- 归一化字体 metrics（win ascent 对齐 UPM），避免行盒高于字号导致偏上
- glyph 方盒使用 flex 居中

## 0.1.3（2026-07-15）

- 图标字号方盒 + line-height 对齐，改善按钮内居中

## 0.1.2（2026-07-15）

- 字体改为 30 图标子集（约 10KB），不再分发完整 Lucide font
- `@font-face` 使用 base64 内联，修复微信小程序本地字体路径失败（do-not-use-local-path）
- 图标显示为空方框的问题应随之恢复

## 0.1.1（2026-07-15）

- `@font-face` 仅保留 `font-family` / `src`，兼容 uvue / 鸿蒙
- glyph 样式移除 `font-weight` / `font-style`，避免鸿蒙 css 插件误报

## 0.1.0（2026-07-14）

- 初版 `nax-icon`（uvue）
- 支持 name / size / color / disabled / customClass / click
- 默认图标集：Lucide 语义子集（30 个）
- 提供 `scripts/build-icons.mjs` 从 Lucide font codepoints 生成映射