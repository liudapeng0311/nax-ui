## 0.2.8（2026-08-07）
- readme 移除构建相关内容（重新生成图标映射、fontTools 提示），仅保留用户视角文档
## 0.2.7（2026-08-07）
- 构建脚本 `build-icons.mjs` 由 `scripts/` 移至包根目录；同步更新 readme、`package.build.json` 与生成文件头注释
## 0.2.6（2026-08-07）
- 支持 iOS 端：走 `#ifndef APP-ANDROID` 公共分支，无额外端差异代码，iOS 直接可用
## 0.2.5（2026-07-31）
- 修复样式隔离 2.0 下默认图标色不随 `nax-theme-dark` 切换的问题
- 默认颜色改为在组件根节点内联解析 `--nax-icon-color` / `--nax-color-text`
- 展示页主题宿主上移到页面根节点，导航栏图标同步响应暗色主题
- Android / 鸿蒙展示页通过 `APP-ANDROID || APP-HARMONY` 显式传入主题色，规避原生 text 不响应组件边界 CSS 变量更新
## 0.2.4（2026-07-23）

- 修复鸿蒙端正文英文空白：子集字体清除 OS/2 Latin codepage 声明，避免系统用图标字体渲染 ASCII

## 0.2.3（2026-07-23）

- 新增内置图标：`category` / `category-filled` / `map-pin` / `map-pin-filled`（Tabler outline + filled 合并子集）
- 构建脚本支持 catalog 项 `"filled": true`，从 `tabler-icons-filled` 合并字形

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
