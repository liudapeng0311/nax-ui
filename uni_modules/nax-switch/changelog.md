## 0.1.3（2026-08-07）
- 支持 iOS 端：内联 style 中 `var()` 过渡解析异常导致关闭态整钮透明/发白，iOS 下轨道与滑块色改为实色兜底（`APP-IOS` 条件编译）；显式 `activeColor`/`inactiveColor` 仍生效。Android、鸿蒙、Web 与小程序行为不变。
## 0.1.2（2026-08-01）
- 移除第三方组件库参考表述，完善独立组件文档。
## 0.1.1（2026-07-19）

- 滑块切换改为 transform 平移 + 轨道变色过渡，观感更顺滑

## 0.1.0（2026-07-19）

- 初版 `nax-switch`
- 支持 Switch 主能力：v-model、size、loading、disabled、activeColor、inactiveColor、vibrateShort
- 主题弱依赖 `nax-ui-theme`；loading 图标依赖 `nax-icon`
- App 端 loading 旋转用 JS transform 兜底；Web/小程序用 CSS animation