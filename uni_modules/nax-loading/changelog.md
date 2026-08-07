## 0.1.4（2026-08-07）
- Android：加载旋转改用原生 `animate`（失败再低频 setProperty 兜底），与 iOS/鸿蒙方案一致，移除 setInterval + 响应式 transform，修复 Android 端掉帧（`APP-ANDROID`）；Web 和小程序行为保持不变。
## 0.1.3（2026-08-06）
- iOS：加载旋转改用原生 `animate`（失败再低频 setProperty 兜底），与鸿蒙方案一致，修复 setInterval 高频响应式 transform 掉帧（`APP-IOS`）；Android、Web 和小程序行为保持不变。
## 0.1.2（2026-07-31）
- 鸿蒙：加载旋转改用原生 `animate`（失败再低频 setProperty 兜底），修复 setInterval 高频响应式掉帧
## 0.1.1（2026-07-22）

- 新增 `icon`：`loading` | `loader` | `loader-4`，默认 `loading`

## 0.1.0（2026-07-21）

- 初版 `nax-loading`（局部/区块加载指示）
- `size` sm|md|lg；`text` 文案；`vertical` 图标上文案下
- `show` 显示控制；`color` / `type` 颜色
- App 端定时 transform 旋转；Web/小程序 CSS `@keyframes`
