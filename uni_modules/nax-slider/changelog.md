## 0.1.2（2026-07-19）

- 修复小数 step 吸附：整数网格计算，避免浮点误差
- 演示页小数步长改为 `:start="0" :end="1"`（原先仅 min/max=0/1 而 end 默认 100，有效拖动区仅约 1%）

## 0.1.1（2026-07-19）

- 修复滑块被细轨道高度裁切：滑块与轨道同级布局，热区高度=滑块尺寸

## 0.1.0（2026-07-19）

- 初版 `nax-slider`
- 对齐 uView Pro Slider 主能力：v-model、start/end、min/max、step、尺寸与颜色、disabled、showValue、showEdgeValue、useSlot
- 事件：start / moving / end / change / update:modelValue
- 主题弱依赖 `nax-ui-theme`
- App 端阴影走条件编译降级为描边
