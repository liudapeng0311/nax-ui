## 0.1.12（2026-08-18）
- 修复模板条件编译注释位于标签属性区被解析为属性的隐患：`webp` / `draggable` / `show-menu-by-longpress` 改为条件编译双分支渲染（注释移至标签外），消除非蒸汽端 "Property '
## 0.1.11（2026-08-18）
- 蒸汽模式兼容：`lines` CSS 声明迁移为 `<text>` 的 `:max-lines` 属性（官方蒸汽模式方案），消除 Vapor 运行时与 CSS 编译器警告
## 0.1.10（2026-08-18）
- 蒸汽模式兼容：`webp` / `draggable` / `show-menu-by-longpress` 仅在非蒸汽模式（`#ifndef VUE3-VAPOR`）下绑定，消除 App 蒸汽模式 warning
## 0.1.9（2026-08-14）
- readme 合并重复的“主题”小节为一张 Token 表
## 0.1.8（2026-08-11）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.7（2026-08-07）
- 支持 iOS 端：走 `#ifndef APP-HARMONY` 公共分支，无额外端差异代码，iOS 直接可用
## 0.1.6（2026-07-31）
- 修复暗黑模式下加载、失败与空图片占位文字因浅色背景与亮色文字叠加而不可见的问题
- Web、Android、iOS 与小程序端的占位背景改为跟随 `--nax-color-bg-secondary`，文字跟随 `--nax-color-text-secondary`
- 鸿蒙端通过 `APP-HARMONY` 显式解析暗色主题背景、文字与图标 token，变量不可用时回退到可读的浅色组合；默认图标尺寸保持 20px
## 0.1.5（2026-07-17）
- 新增 forceLoading：强制展示加载占位（demo/预览）
- demo「加载占位」改为 force-loading，避免真实图加载成功后盖住图标

## 0.1.4（2026-07-17）
- 新增 timeout：超时未 load 则进入失败态（缓解鸿蒙等端无效域名 DNS 久等）

## 0.1.3（2026-07-17）
- 加载中占位改用 nax-icon `image`，失败占位改用 `image-off`
- 移除 loading 旋转动画（静态图片占位）

## 0.1.2（2026-07-16）

- package：安装依赖增加 nax-ui-theme（运行时仍弱依赖 + fallback）

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
