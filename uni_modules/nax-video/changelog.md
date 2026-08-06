## 0.1.0（2026-08-06）

- 初版 `nax-video` 无头视频播放器（uvue）
- 原生 `<video>` + `uni.createVideoContext`：play / pause / toggle / stop / seek / seekBy / 倍速 / 静音 / 全屏
- 默认 `controls=false`；作用域插槽暴露状态与控制方法；`controls=true` 可降级原生控制条
- 状态以原生事件为真相来源；多实例独立 id / context
- 平台：Web / Android / HarmonyOS / 微信小程序；iOS 标记为未验证（`-`）
- 能力下限按 uni-app x 4.61（含 HarmonyOS video / createVideoContext）
- 首版不实现列表 recycle/reuse、弹幕、画中画、播放列表
