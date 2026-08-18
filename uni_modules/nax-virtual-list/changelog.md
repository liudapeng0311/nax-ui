## 0.1.13（2026-08-18）
- 修复 scroll-view 标签属性区条件编译注释被解析为属性的隐患：`@scrollend`（仅鸿蒙/iOS）改为条件编译双分支渲染（注释移至标签外）
## 0.1.12（2026-08-18）
- 蒸汽模式兼容：`lines` CSS 声明迁移为 `<text>` 的 `:max-lines` 属性（官方蒸汽模式方案），消除 Vapor 运行时与 CSS 编译器警告
## 0.1.11（2026-08-18）
- 蒸汽模式兼容：移除 `<text>` 上不支持的 `lines` 属性改为 CSS `lines`；scroll-view 移除不支持的 `scroll-y` 属性
## 0.1.10（2026-08-14）
- 精简 readme：移除内部开发向内容（设计说明 / 实现细节 / 平台差异实现等），只保留安装、用法、API、主题等用户文档
## 0.1.9（2026-08-11）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.8（2026-08-07）
- 修复 iOS 端滑动掉帧：`onScroll` 从每个 scroll 事件同步更新窗口改为 32ms 合并 + `scrollend` 强制同步（`APP-IOS` 复用鸿蒙机制，`scroll`/`visible-change` 在 `scrollend` 同步触发），并在窗口中部滚动时跳过重建
- 修复 iOS 端快速滑动下方空白：缓冲行数下限抬到 12（`APP-IOS`），`scrollend` 用最新 `scrollTop` 强制对齐窗口
- Android、Web 和小程序行为保持不变
## 0.1.7（2026-08-01）
- 新增 `nested-scroll`：Android 端（`APP-ANDROID`）通过内层 `scroll-view` 的 `associative-container` 建立嵌套滚动协商；Web、iOS、HarmonyOS 及未启用该属性的实例行为保持不变。
- 修复 Android 演示页空白与内层列表无法滚动：外层滚动容器启用 `type="nested"`，并以 `nested-scroll-header` / `nested-scroll-body` 包裹页面内容；移除会阻断边界交接的 `touchmove.stop`。
- 修复 Android 警告：不再给 `nested-scroll-body` 设置仅适用于视图节点的 `flex-direction` 样式。
## 0.1.6（2026-07-30）

- 修复 Web 与微信小程序触底后连续加载后续分页：在 `WEB || MP-WEIXIN` 下增加单次触底锁，并根据剩余距离判断是否真正离开底部阈值；事件 `scrollHeight` 异常时用 `list.length * itemHeight` 兜底，数据追加后冻结解锁 350ms
- 修复加载下一页后视口直接跳到新增页底部：追加前记录 `scrollTop`，DOM 更新后恢复滚动位置；Web 的真实内容节点同时关闭 `overflow-anchor`
- 位置恢复并离开底部后主动解锁下一次触底，避免 Web 端 `scrolltolower` 早于 `scroll` 时吞掉下一页加载
- Android、iOS、鸿蒙及其它小程序端行为保持不变

## 0.1.5（2026-07-23）

- **修复 Web 端轻微滚动会一直滚到列表底部**：浏览器 Scroll Anchoring 在顶部 spacer 增高时自动推高 scrollTop，与窗口更新形成正反馈
- Web/小程序（`#ifndef APP-ANDROID || APP-IOS || APP-HARMONY`）：固定总高 + `translateY` 偏移渲染；`overflow-anchor: none`；滚动约 16ms 合并
- App 端仍使用 spacer 窗口裁剪，行为不变

## 0.1.4（2026-07-23）

- **修复鸿蒙进页空白卡死**：取消 `list-view` 全量 `v-for`（大数据/多列表嵌套易主线程假死）
- 全端统一 **spacer 窗口裁剪**（只挂载可视区 + 缓冲行）
- 鸿蒙（`APP-HARMONY`）：窗口更新带**滞后**、滚动约 32ms 合并；`scroll`/`visible-change` 在 `scrollend` 同步
- 行 key 使用窗口位置，减少节点重排

## 0.1.3（2026-07-23）

- 曾尝试鸿蒙原生 list-view 回收 + scrollend 事件同步（快滑更顺，但进页易空白卡死，已回退）

## 0.1.2（2026-07-23）

- 窗口裁剪与滚动合并尝试

## 0.1.1（2026-07-23）

- 修复微信小程序滚动时 “More than one slot named d-N” 警告：行节点改用窗口位置 key

## 0.1.0（2026-07-22）

- 首版：固定行高窗口裁剪虚拟列表
- 支持作用域插槽自定义行、触底加载、下拉刷新、空/错/底态
- 暴露 `scrollToIndex` / `scrollToOffset` / `getVisibleRange`
