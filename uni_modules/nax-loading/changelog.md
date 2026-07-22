## 0.1.2（2026-07-22）

- 鸿蒙：加载旋转改用原生 `animate`（失败再低频 setProperty 兜底），修复 setInterval 高频响应式掉帧

## 0.1.1（2026-07-22）

- 新增 `icon`：`loading` | `loader` | `loader-4`，默认 `loading`

## 0.1.0（2026-07-21）

- 初版 `nax-loading`（局部/区块加载指示）
- `size` sm|md|lg；`text` 文案；`vertical` 图标上文案下
- `show` 显示控制；`color` / `type` 颜色
- App 端定时 transform 旋转；Web/小程序 CSS `@keyframes`
