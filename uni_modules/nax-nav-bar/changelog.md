## 0.2.0（2026-09-05）
- 新增 `centerClickable`：中间区域（default 插槽）可接收点击；仅 Web / 小程序需要开启（`#ifndef APP-ANDROID || APP-IOS || APP-HARMONY` 下 `pointer-events: auto`），App 端无 pointer-events 限制无需处理
- 修复 App（含蒸汽）组件隔离下 `type="primary"` 时 CSS 变量失效：背景色与反白文字改用内联 `var(--nax-color-*,fallback)` 字符串兜底（`#ifdef APP-ANDROID || APP-IOS || APP-HARMONY`），其它端行为不变
## 0.1.6（2026-08-18）
- 蒸汽模式兼容：`lines` CSS 声明迁移为 `<text>` 的 `:max-lines` 属性（官方蒸汽模式方案），消除 Vapor 运行时与 CSS 编译器警告
## 0.1.5（2026-08-18）
- 蒸汽模式兼容：移除 `<text>` 上不支持的 `lines` 属性，改为 CSS `lines` 声明（各文本 class 补齐 `lines: N;`），消除 App 蒸汽模式 warning
## 0.1.4（2026-08-14）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.3（2026-08-07）
- 支持 iOS 端：App 端能力分支（沉浸式、安全区等）已覆盖 `APP-IOS`，iOS 直接可用
## 0.1.2（2026-07-31）
- 修复 Android 暗黑模式下默认返回图标颜色过深的问题：`APP-ANDROID` 下由导航栏显式传入单层 `--nax-color-text` 变量，避免 `nax-icon` 内部嵌套 CSS 变量 fallback 解析异常；浅色模式、`primary` 类型及显式 `backIconColor` 保持原有行为。
## 0.1.1（2026-07-27）

- 新增 `backIconColor`，用于 App 端显式同步运行时主题图标色

## 0.1.0（2026-07-21）

- 初版 `nax-nav-bar`
- 支持 title / showBack / backText / backIcon / autoBack / homeUrl
- fixed + placeholder + immersive；safeAreaInsetTop（App JS / Web env）
- type：default | primary；titleAlign：center | left
- 微信等小程序预留胶囊右侧空间；返回栈底支持 homeUrl reLaunch
- 插槽：left / default / right
- 依赖 nax-icon、nax-ui-theme（弱依赖 + fallback）
