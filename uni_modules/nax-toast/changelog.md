## 0.1.5（2026-07-31）

- 修复 Android 端无蒙层 Toast 的 `center` 与 `top` 定位偏上问题：`center` 改为按屏幕高度定位，`top` 下移至 `128px`；有蒙层与无蒙层路径均使用 `APP-ANDROID` 隔离，iOS、鸿蒙、Web 和小程序保持原有行为。

## 0.1.4（2026-07-30）

- 微信小程序：`position: 'top'` 改为根据状态栏、右上角胶囊与默认 `44px` 导航内容高度计算顶部偏移，并额外保留 `16px` 间距；有、无蒙层路径均使用 `MP-WEIXIN` 条件编译隔离，避免提示压住自定义导航栏。Web 与 App 端行为保持不变。

## 0.1.3（2026-07-30）

- 微信小程序：修复宿主页同时使用 `<nax-toast />` 与同名导入 `naxToast` 时的编译命名冲突；示例改用本地函数别名，确保宿主在 `MP-WEIXIN` 正常注册，`position: 'top' | 'center' | 'bottom'` 恢复生效。Web 与 App 端行为保持不变。

## 0.1.2（2026-07-29）

- 鸿蒙：`position: 'top'` 的有、无蒙层轻提示下移至 `128px`，避开状态栏和导航栏区域（`APP-HARMONY`）。

## 0.1.1（2026-07-29）

- 鸿蒙：`position: 'center'` 的无蒙层轻提示改为按屏幕高度定位，修复固定 `280px` 导致的视觉偏上问题（`APP-HARMONY`）。

## 0.1.0（2026-07-20）

- 首版：函数式 `naxToast()` / `hideNaxToast()` 与宿主组件 `nax-toast`
- 支持 type：text / success / error / warning / info / loading
- 支持 position：top / center / bottom；可选遮罩 overlay
- 全局只需挂载一次宿主，业务页直接 import 调用
