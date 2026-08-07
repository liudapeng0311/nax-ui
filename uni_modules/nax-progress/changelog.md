## 0.1.7（2026-08-07）
- 支持 iOS 端：走 `#ifndef APP-HARMONY` 公共分支（width 过渡动画），无需额外端差异代码
## 0.1.6（2026-08-01）
- 线形鸿蒙：动画从百分比 `width` 改为独立色块 `transform: scaleX()`，修复动态更新时先闪到 100% 再回到正确进度；条内文案使用独立覆盖层，避免随色块缩放
## 0.1.5

- 线形鸿蒙：恢复 200ms 宽度动画。`:style` 不再绑定 width；用元素 `setProperty` 三阶段（先钉 from → 开 transition → 设 to），对齐 nax-overlay / 官方 transition 示例，避免先闪 100%

## 0.1.4

- 线形：鸿蒙临时关闭 width CSS transition

## 0.1.3

- 圆形去掉 transform CSS 过渡

## 0.1.2

- 修复 ≤50% 左半环底点泄漏

## 0.1.1

- 修复圆形进度断开；100% 整环实色

## 0.1.0

- 初版 `nax-progress`
