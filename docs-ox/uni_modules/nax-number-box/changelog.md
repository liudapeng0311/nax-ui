## 0.1.5（2026-08-14）
- 精简 readme：移除内部开发向内容（设计说明 / 实现细节 / 平台差异实现等），只保留安装、用法、API、主题等用户文档
## 0.1.4（2026-08-11）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.3（2026-08-07）
- 支持 iOS 端：组件为全端公共实现，无端差异代码，iOS 直接可用
## 0.1.2（2026-07-31）
- 移除第三方组件库参考表述，完善独立组件文档。
## 0.1.1（2026-07-19）

- 修复 Web：输入框聚焦时点加减，展示不同步 / 被 blur 旧值盖回

## 0.1.0（2026-07-19）

- 初版 `nax-number-box`
- 支持 NumberBox 主能力：v-model、min/max/step、integer、disabled、disabledInput、disablePlus/Minus、asyncChange、longPress、尺寸与颜色、插槽
- 事件：change / focus / blur / overlimit / plus / minus / update:modelValue
- 主题弱依赖 `nax-ui-theme`；图标依赖 `nax-icon`

