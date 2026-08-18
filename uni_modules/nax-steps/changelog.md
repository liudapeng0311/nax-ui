## 0.1.5（2026-08-18）
- 蒸汽模式兼容：`lines` CSS 声明迁移为 `:max-lines` 属性；下级选择器规则用 `#ifndef VUE3-VAPOR` 条件编译隔离（消除 "Invalid selector" 警告），VDOM/Web/小程序行为不变
## 0.1.4（2026-08-18）
- 蒸汽模式兼容：移除 `<text>` 上不支持的 `lines` 属性，改为 CSS `lines` 声明（各文本 class 补齐 `lines: N;`），消除 App 蒸汽模式 warning
## 0.1.3（2026-08-14）
- 精简 readme：移除内部开发向内容（设计说明 / 实现细节 / 平台差异实现等），只保留安装、用法、API、主题等用户文档
## 0.1.2（2026-08-11）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.1（2026-08-07）
- 支持 iOS 端：组件为全端公共实现，无端差异代码，iOS 直接可用
## 0.1.0（2026-08-01）
- 首版：`nax-steps` + `nax-step`
- 支持 list 数据驱动 / 组合式子项
- direction horizontal|vertical；mode number|dot
- type 语义色；单步 status wait|process|finish|error
- clickable 点击事件；完成/失败图标可配置
