## 0.1.0（2026-08-31）
- 首版：自 `nax-ui` 套装迁出，独立发布。7 个组合式函数：
  - `useCountdown` 倒计时（整秒显示向上取整，逐秒不跳号；`status` 四态 idle/running/paused/finished）
  - `useValidate` 无头表单校验（依赖 `nax-form` 包内引擎 `form-state.uts`，与组件共用实现）
  - `useDebounce` 防抖（`NaxDebounceHandle`：call/cancel/flush）
  - `useThrottle` 节流（`NaxThrottleHandle`：call/cancel/flush，leading + trailing）
  - `useDatetimeParts` 日期时间 parts（依赖 `nax-datetime-picker` 包内引擎 `datetime-parts.uts`，供自建 picker-view）
  - `useInterval` 可控轮询（start/stop/running/count，running 为响应式）
  - `useStorage` 响应式本地缓存（改值即写、置 null 删 key）
- 导入路径变更：`@/uni_modules/nax-ui/composables/*` → `@/uni_modules/nax-use/composables/*`
