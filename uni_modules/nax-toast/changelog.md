## 0.1.2（2026-07-29）

- 鸿蒙：`position: 'top'` 的有、无蒙层轻提示下移至 `128px`，避开状态栏和导航栏区域（`APP-HARMONY`）。

## 0.1.1（2026-07-29）

- 鸿蒙：`position: 'center'` 的无蒙层轻提示改为按屏幕高度定位，修复固定 `280px` 导致的视觉偏上问题（`APP-HARMONY`）。

## 0.1.0（2026-07-20）

- 首版：函数式 `naxToast()` / `hideNaxToast()` 与宿主组件 `nax-toast`
- 支持 type：text / success / error / warning / info / loading
- 支持 position：top / center / bottom；可选遮罩 overlay
- 全局只需挂载一次宿主，业务页直接 import 调用
