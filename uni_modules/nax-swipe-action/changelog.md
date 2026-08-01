## 0.1.2（2026-08-01）
- 修复 Android（`APP-ANDROID`）组内互斥运行时报 `RefImpl cannot be cast`：注入的活动项状态改用 `Ref<string>` 接收，避免将 Vue 运行时 ref 强制转换为自定义结构类型。
- Web、iOS、HarmonyOS 与小程序保持既有行为。
## 0.1.1 (2026-07-29)
- 移除第三方组件库参考表述，完善独立组件文档。

## 0.1.0（2026-07-22）

- 初版 `nax-swipe-action` / `nax-swipe-action-group`
- 支持 SwipeAction 主能力：左滑露出操作、options、show、disabled、btnWidth
- 增强：`name` 标识、`type` 语义色 token、`options[].width`、right 插槽、`nax-swipe-action-group` 互斥展开
- 事件：click / content-click / open / close / update:show
- 主题弱依赖 `nax-ui-theme`
