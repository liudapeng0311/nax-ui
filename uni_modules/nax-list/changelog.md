## 0.1.1（2026-07-31）
- 新增下拉刷新：`enableRefresh` / `refreshing` / `refresherThreshold` / `refresherBackground` / `refresherDefaultStyle`
- 事件：`refresh`、`update:refreshing`（可 v-model:refreshing）
- 刷新中暂停触底 load；基于 scroll-view 原生 refresher（仅内部滚动模式）
## 0.1.0（2026-07-22）

- 初版 `nax-list` 滚动列表壳（方案 A）
- 内部 `scroll-view` 触底 `@load`；受控 `loading` / `finished` / `error` / `empty`
- 默认底态：`nax-loading` / 结束文案 / 错误可点重试；空态默认 `nax-empty`（`notes-off`）
- `immediateCheck`：挂载与加载结束后测量高度，内容不足一屏时继续 load
- `usePageScroll`：页面滚动模式，触底请页面 `onReachBottom` 调 `check()`
- **不做**：虚拟列表