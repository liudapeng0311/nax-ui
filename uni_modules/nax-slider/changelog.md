## 1.0.4（2026-09-18）
- 接入 `nax-form` 表单校验联动：注入 `nax-form-item` 提供的字段级校验入口，拖动取值落地（`change`）时按 `change` 回调，使规则 `trigger: 'change'` / `['blur', 'change']` 自动生效（此前需业务侧手动调 `validateField`）
- 校验使用控件当前值而非业务侧 `model`，取值变化后错误提示即时消失
- 未置于 `nax-form-item` 内时为空实现，行为不变；全端一致（无条件编译差异）
## 1.0.3（2026-08-14）
- 精简 readme：移除内部开发向内容（设计说明 / 实现细节 / 平台差异实现等），只保留安装、用法、API、主题等用户文档
## 1.0.2（2026-08-11）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 1.0.1（2026-08-07）
- 支持 iOS 端：App 端条件编译分支（click 走 touch 路径、阴影降级）已覆盖 `APP-IOS`
## 1.0.0（2026-08-01）
- 移除滑块数值气泡以及 `showValue`、`valuePosition` 公共 props；当前值由业务侧在滑块外使用普通文本展示。
- 这是不兼容变更，Android、iOS、鸿蒙、Web 与小程序端统一生效；其它滑块能力保持不变。
## 0.1.4 (2026-07-29)
- 移除第三方组件库参考表述，完善独立组件文档。

## 0.1.3（2026-07-19）

- 修复 Web 类型告警：click 改用 `UniPointerEvent.clientX`，不再访问 `UniEvent.detail`
- App（含鸿蒙）click 走条件编译直接返回，选点仍由 touch 路径处理

## 0.1.2（2026-07-19）

- 修复小数 step 吸附：整数网格计算，避免浮点误差
- 演示页小数步长改为 `:start="0" :end="1"`（原先仅 min/max=0/1 而 end 默认 100，有效拖动区仅约 1%）

## 0.1.1（2026-07-19）

- 修复滑块被细轨道高度裁切：滑块与轨道同级布局，热区高度=滑块尺寸

## 0.1.0（2026-07-19）

- 初版 `nax-slider`
- 支持 Slider 主能力：v-model、start/end、min/max、step、尺寸与颜色、disabled、showValue、showEdgeValue、useSlot
- 事件：start / moving / end / change / update:modelValue
- 主题弱依赖 `nax-ui-theme`
- App 端阴影走条件编译降级为描边
