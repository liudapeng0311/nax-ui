## 0.1.5（2026-08-14）
- 精简 readme：移除内部开发向内容（设计说明 / 实现细节 / 平台差异实现等），只保留安装、用法、API、主题等用户文档
## 0.1.4（2026-08-11）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.3（2026-08-07）
- 修复 iOS / Android 端横向滑动时页面 scroll-view 跟着滚动：`touchmove` 中 `preventDefault()` 改为全端调用（App 端同样有效，参考官方 touch 事件拖拽示例），阻止页面滚动抢手势；Web 和小程序行为不变。
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
