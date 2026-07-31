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
