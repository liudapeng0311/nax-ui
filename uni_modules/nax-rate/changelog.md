## 0.1.5（2026-09-18）
- 接入 `nax-form` 表单校验联动：注入 `nax-form-item` 提供的字段级校验入口，评分变化按 `change` 回调，使规则 `trigger: 'change'` / `['blur', 'change']` 自动生效（此前需业务侧手动调 `validateField`）
- 校验使用控件当前值而非业务侧 `model`，评分后错误提示即时消失
- 未置于 `nax-form-item` 内时为空实现，行为不变；全端一致（无条件编译差异）
## 0.1.4（2026-08-14）
- 精简 readme：移除内部开发向内容（设计说明 / 实现细节 / 平台差异实现等），只保留安装、用法、API、主题等用户文档
## 0.1.3（2026-08-11）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.2（2026-08-07）
- 支持 iOS 端：App 端条件编译分支已覆盖 `APP-IOS`，iOS 直接可用
## 0.1.1（2026-08-01）
- 移除第三方组件库参考表述，完善独立组件文档。
## 0.1.0（2026-07-19）

- 初版 `nax-rate`
- 支持 Rate 主能力：v-model、count、disabled、size、active/inactive 色、gutter、minCount、allowHalf、图标名、滑动打分
- 额外：readonly、touchable
- 事件：change / update:modelValue
- 主题弱依赖 `nax-ui-theme`；图标依赖 `nax-icon`
