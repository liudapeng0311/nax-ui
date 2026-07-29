## 0.1.2 (2026-07-29)
- 移除第三方组件库参考表述，完善独立组件文档。

## 0.1.1（2026-07-19）

- 滑块切换改为 transform 平移 + 轨道变色过渡，观感更顺滑

## 0.1.0（2026-07-19）

- 初版 `nax-switch`
- 支持 Switch 主能力：v-model、size、loading、disabled、activeColor、inactiveColor、vibrateShort
- 主题弱依赖 `nax-ui-theme`；loading 图标依赖 `nax-icon`
- App 端 loading 旋转用 JS transform 兜底；Web/小程序用 CSS animation