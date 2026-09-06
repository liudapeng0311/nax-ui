## 0.1.8（2026-08-18）
- 蒸汽模式兼容：`lines` CSS 声明迁移为 `<text>` 的 `:max-lines` 属性（官方蒸汽模式方案），消除 Vapor 运行时与 CSS 编译器警告
## 0.1.7（2026-08-18）
- 蒸汽模式兼容：移除 `<text>` 上不支持的 `lines` 属性，改为 CSS `lines` 声明（各文本 class 补齐 `lines: N;`），消除 App 蒸汽模式 warning
## 0.1.6（2026-08-18）
- 修复徽标在居中容器（如 nax-grid 宫格单元格）内被 `align-self: flex-start` 顶到一侧的偏移：移除根节点 `align-self`，气泡改为定位在按内容收缩的锚点容器上，根节点交由父级对齐；各端行为一致
## 0.1.5（2026-08-14）
- readme 移除"平台说明"小节（processing 动画端差异说明）
## 0.1.4（2026-08-11）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.3（2026-08-07）
- 支持 iOS 端：App 端 processing 波纹动画分支已覆盖 `APP-IOS`，iOS 直接可用
## 0.1.2
- App processing 波纹加密步进（30 步 / 40ms），减轻掉帧感

## 0.1.1
- 移除第三方组件库参考表述，完善独立组件文档。
- App（Android / iOS / Harmony）processing 波纹改为 JS transform 定时动画兜底（对齐 nax-button loading）
- Web / 小程序仍使用 CSS @keyframes

## 0.1.0
- 首版：（value/max/dot/showZero/show/processing/type/color/offset/alone）