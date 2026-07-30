## 1.0.0 (2026-07-30)
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
