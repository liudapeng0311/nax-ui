## 0.1.5（2026-07-22）

- 保留原生滚到目标动画（时长不可控）
- 未传 minDate 时默认年份改为「当前年-30」起，缩短年列滚动距离

## 0.1.4（2026-07-22）

- 打开流程对齐 nax-select：readyToRender 卸载→init（先 key 后 value）→再挂载
- 移除 cover/opacity 挡动画方案，避免鸿蒙空白
- remount 时先换 key 再写 pickerValue，减少挂载后二次改值触发的滚动动画

## 0.1.3（2026-07-22）

- 修复鸿蒙：打开弹层空白不可选（取消对 picker-view 的 opacity 隐藏）
- 改为上层白底 cover 遮挡滚到目标动画，滚轮保持正常渲染

## 0.1.2（2026-07-22）

- 鸿蒙：打开弹层时遮住 picker-view 从 0 滚到目标的定位动画

## 0.1.1（2026-07-22）

- 修复鸿蒙：滚动/联动时整表 remount picker-view 导致卡死与崩溃
- 滚动 change 仅刷新列数据；remount 仅在打开初始化
- 程序化改列期间抑制 change，避免原生回抛死循环
- 打开进场延迟与 show 监听与 nax-select 对齐

## 0.1.0（2026-07-22）

- 初版 `nax-datetime-picker` 时间选择器
- 支持 mode：datetime / date / time / year-month / year / month-day
- `v-model:show` + `v-model`（时间戳）；可选 showSecond、minDate/maxDate、内置触发条
- 弹层动画复用 `nax-transition`；鸿蒙禁用选项点击（滑动选择）
