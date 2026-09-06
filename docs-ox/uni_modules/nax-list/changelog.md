## 0.1.5（2026-08-18）
- 蒸汽模式兼容：`lines` CSS 声明迁移为 `<text>` 的 `:max-lines` 属性（官方蒸汽模式方案），消除 Vapor 运行时与 CSS 编译器警告
## 0.1.4（2026-08-18）
- 蒸汽模式兼容：移除 `<text>` 上不支持的 `lines` 属性，改为 CSS `lines` 声明（各文本 class 补齐 `lines: N;`），消除 App 蒸汽模式 warning
## 0.1.3（2026-08-14）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.2（2026-08-07）
- 兼容性声明：补充 iOS（`APP-IOS`）端支持，package.json 平台标记同步为 `√`
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