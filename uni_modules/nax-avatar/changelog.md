## 0.1.6（2026-08-18）
- 蒸汽模式兼容：`lines` CSS 声明迁移为 `<text>` 的 `:max-lines` 属性（官方蒸汽模式方案），消除 Vapor 运行时与 CSS 编译器警告
## 0.1.5（2026-08-18）
- 蒸汽模式兼容：移除 `<text>` 上不支持的 `lines` 属性，改为 CSS `lines` 声明（各文本 class 补齐 `lines: N;`），消除 App 蒸汽模式 warning
## 0.1.4（2026-08-14）
- 精简 readme：移除内部开发向内容（设计说明 / 实现细节 / 平台差异实现等），只保留安装、用法、API、主题等用户文档
## 0.1.3（2026-08-11）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.2（2026-08-07）
- 支持 iOS 端：走 `#ifndef APP-HARMONY` 公共分支，无额外端差异代码，iOS 直接可用
## 0.1.1（2026-07-31）
- 移除第三方组件库参考表述，完善独立组件文档。
## 0.1.0（2026-07-17）

- 初版 `nax-avatar`
- ：size / shape / src / text / bordered / color / object-fit / fallback-src
- 支持 load / error / click 事件与默认插槽
