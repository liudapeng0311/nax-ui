## 0.1.16（2026-08-14）
- 精简 readme：移除内部开发向内容（设计说明 / 实现细节 / 平台差异实现等），只保留安装、用法、API、主题等用户文档
## 0.1.15（2026-08-12）
- readme 平台说明移除内部实现细节（鸿蒙遮罩 mask 样式与条件编译说明）
## 0.1.14（2026-08-11）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
# nax-datetime-picker 变更记录

## 0.1.13（2026-08-07）
- **修复 iOS 端弹窗背景透明 / 边框黑 / 分割线不显示（根因级）**：uni-app x 官方文档确认 Android/iOS 不支持自定义 CSS 变量（`var(--nax-*)` 声明在 iOS 上会整体失效 → background 取透明、border-color 取默认黑）；- **iOS 弹窗暗黑模式适配**：改用官方主题 API（`uni.getAppBaseInfo().appTheme` + `uni.onAppThemeChange`，App 4.18+）监听应用主题，JS 驱动弹窗内字面量颜色（面板 `#101014`/`#ffffff`、分割线 `#ffffff1a`/`#f5f5f7`、遮罩 `rgba(0,0,0,0.6)`/`0.4`、文字/按钮色对齐 dark.css）；根节点挂 `nax-datetime-picker--ios-dark/light` class 覆盖弹窗内颜色，不依赖 CSS 变量
- 仅影响 iOS 端；Android、鸿蒙、Web、微信小程序保持原生 picker-view 与 var 主题行为不变
## 0.1.12（2026-08-07）
- **修复 iOS 端（`APP-IOS`）打开弹框默认选中值错乱**：此前 `locateAllWheels` 在 `panelShow=true` 之前执行，而 `nax-transition` 为 v-if 渲染，此时 scroll-view 尚未挂载，`getElementById` 全部落空；挂载后 scroll-view 初始位置触发的 `scrollend` 又以视觉位置反推选中值，导致默认选中漂移到错误时间（如停在 1997-02-02 01:01）
- 调整打开时序：先挂载面板，再等滚轮列就绪后定位（未就绪自动重试），定位期间锁定 `scrollend` 处理，防止挂载初始位置污染选中值；列联动重建后重新吸附当前列，防止内容重建后 scrollTop 重置
- **修复 iOS 端选中项显示位置**：原定位公式把选中项滚到可视区第一行（`top = pad数*40 + idx*40`），现改为 `top = idx*40` 使选中项居中于可视区第 4 行，上下留白对称；`scrollend` 反推公式同步对齐
- **修复 iOS 端选中行缺少上下边框**：自研滚轮选中项原无指示器边框，现补上与其它端原生 `picker-view` 指示器一致的 1px 上下边框（`--nax-color-divider` token）
- **修复 iOS 端边框错位/闪烁**：边框原挂在选中 item 上，滑动时随内容滚动错位、点击重建时瞬间丢失变黑；改为独立固定指示器层（绝对定位在可视区中间），边框不随滚动内容移动，item 仅保留选中文字高亮
- 仅影响 iOS 端；Android、鸿蒙、Web、微信小程序保持原生 picker-view 行为不变
## 0.1.11（2026-08-06）
- **iOS 端改用自研滚轮替代原生 `picker-view`**（`APP-IOS`）：原生 picker 列内容 CSS 不生效（选项文字无法垂直居中）、挂载后从初始值长距离定位动画卡顿且会暴露错误初始值，自研滚轮由框架渲染（scroll-view + 固定行高），CSS 完全可控；打开时无动画直接定位到选中值，文字显式行高居中，滚动停止后吸附并对齐选中行，联动与 `change` 事件语义不变
- Android、鸿蒙、Web、微信小程序保持原生 picker-view 行为不变
## 0.1.10（2026-08-06）
- 曾尝试通过延长挂载抑制窗口、iOS 选项文字显式行高等方式修复 iOS 端初始值错位与文字不居中的问题，实测 iOS 原生 `picker-view` 列内容不受 CSS 控制、挂载定位动画无法消除，方案废弃（见 0.1.11 自研滚轮方案）
## 0.1.9（2026-07-31）
- 修复 Android 端（`APP-ANDROID`）暗黑模式下原生 `picker-view` 上下白色渐变遮罩覆盖时间选择器面板的问题；复用鸿蒙端的 `mask-top-style` 与 `mask-bottom-style` 透明渐变方案，iOS、Web 与小程序保持原有行为。
- 修复 Android 端（`APP-ANDROID`）时间滚轮选中项上下边框不显示的问题；为原生 `picker-view` 指示器补全 `solid` 边框样式并继续使用主题分割线 token，其它端保持原有行为。
## 0.1.8 (2026-07-29)

- 修复鸿蒙端（`APP-HARMONY`）暗黑模式下原生 `picker-view` 上下白色渐变遮罩覆盖时间滚轮背景的问题：改用 `mask-top-style` 与 `mask-bottom-style` 分别设为透明渐变；其它端保持原有遮罩行为。

## 0.1.7 (2026-07-29)
- 移除第三方组件库参考表述，完善独立组件文档。

## 0.1.6（2026-07-29）

- 修复暗黑模式下原生 `picker-view` 白色渐隐遮罩覆盖时间滚轮的问题。
- 补充选中行边界与滚轮文字层级，浅色和暗黑主题均通过 `--nax-*` token 自动适配。

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
