## 0.1.6（2026-09-18）
- 接入 `nax-form` 表单校验联动：注入 `nax-form-item` 提供的字段级校验入口，步进按钮 / 输入框改值按 `change`、失焦按 `blur` 回调，使规则 `trigger: ['blur', 'change']` 自动生效（此前需业务侧手动调 `validateField`）
- 校验使用控件当前值而非业务侧 `model`（`model` 多在 `@change` / `@blur` 才同步），值改对后错误提示即时消失；失焦路径只按 `blur` 触发一次，避免二次校验覆盖 `change` 规则结果
- 未置于 `nax-form-item` 内时为空实现，行为不变；全端一致（无条件编译差异）
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

