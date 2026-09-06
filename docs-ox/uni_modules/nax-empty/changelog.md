## 0.1.5（2026-08-18）
- 蒸汽模式兼容：`lines` CSS 声明迁移为 `<text>` 的 `:max-lines` 属性（官方蒸汽模式方案），消除 Vapor 运行时与 CSS 编译器警告
## 0.1.4（2026-08-18）
- 蒸汽模式兼容：移除 `<text>` 上不支持的 `lines` 属性，改为 CSS `lines` 声明（各文本 class 补齐 `lines: N;`），消除 App 蒸汽模式 warning
## 0.1.3（2026-08-14）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.2（2026-08-07）
- 兼容性声明：补充 iOS（`APP-IOS`）端支持，package.json 平台标记同步为 `√`
## 0.1.1（2026-07-31）
- 默认图标改为 database-off（暂无数据）；列表空场景建议 notes-off
## 0.1.0（2026-07-21）

- 初版 `nax-empty`
- `description` / `title` / `image` / `icon` / `show`
- 插槽：`image` / `title` / `description` / `action` / default
