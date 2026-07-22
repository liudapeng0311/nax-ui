## 0.2.2（2026-07-22）
- 新增内置图标：loader-4（loader 已有，一并保留）

## 0.2.1（2026-07-21）
- 新增内置图标：file-off / notes-off / database-off / message-off

## 0.2.0（2026-07-21）
- 默认图标集由 Lucide 切换为 **Tabler Icons**（MIT）语义子集
- 重建字体子集与 base64 内联 `@font-face`
- 构建脚本改为读取 `catalog.json` + `tabler-codepoints.json`

## 0.1.9（2026-07-19）
- 新增内置图标：square / circle / square-check

## 0.1.8（2026-07-17）
- 新增内置图标：image / image-off / loader

## 0.1.7（2026-07-16）
- package：安装依赖增加 nax-ui-theme（运行时仍弱依赖 + fallback）

## 0.1.6（2026-07-16）
- 鸿蒙：include-font-padding 仅在 APP-ANDROID 条件编译中声明，消除 uvue-css WARNING

## 0.1.5（2026-07-15）
- 根节点改为单 `<text>`，去掉 view/text 嵌套，修复字形在方框内偏移
- 宽高/字号/行高全部使用 inline px
- 字形在 em 方框内几何居中

## 0.1.4（2026-07-15）
- 修复 web/小程序：图标字形在自身方框内偏移
- 归一化字体 metrics

## 0.1.3（2026-07-15）
- 图标字号方框 + line-height 对齐
- Android 关闭 includeFontPadding

## 0.1.2（2026-07-15）
- 字体改为子集 + base64 内联，修复微信小程序本地字体路径失败

## 0.1.1（2026-07-15）
- `@font-face` 仅保留 font-family / src，兼容 uvue / 鸿蒙

## 0.1.0（2026-07-14）
- 初版 `nax-icon`（uvue），默认 Lucide 语义子集
