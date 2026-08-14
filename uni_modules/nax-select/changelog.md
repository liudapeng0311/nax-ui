## 0.1.18（2026-08-14）
- 精简 readme：移除内部开发向内容（设计说明 / 实现细节 / 平台差异实现等），只保留安装、用法、API、主题等用户文档
## 0.1.17（2026-08-12）
- readme 平台说明移除内部实现细节（iOS 自研滚轮实现方式、鸿蒙遮罩条件编译说明）
## 0.1.16（2026-08-11）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.15（2026-08-07）
- **iOS 端（`APP-IOS`）改用自研滚轮替代原生 `picker-view`**：修复选中项文字无法在选中边框（指示器）内垂直居中的问题。iOS 原生 picker 列内容不受 CSS 控制（显式行高无效，同 nax-datetime-picker 0.1.10/0.1.11 结论），自研滚轮由框架渲染（scroll-view + 固定行高），文字显式行高居中，滚动停止吸附对齐选中行，支持点选，联动与 `change` / `confirm` 事件语义不变
- **修复 iOS 端滚动/点选后选中不生效**：`applyWheelSelection` 未把本次滚动到的新下标写入选中值，导致 `pickerValue` 被旧值原样写回，选中文字状态与选中数据均不更新；现由 `onWheelEnd` 先写入新下标再生效（对齐 datetime-picker 的 `wheelIndexes` 更新时序）
- **修复 iOS 端联动弹窗背景透明**：联动弹窗打开期间宿主页因 `change` 事件重渲染后，class 背景偶发不重绘导致整个面板透明；iOS 下面板底色与遮罩底色改走 inline style（对齐鸿蒙遮罩做法），滚轮区域显式补 class 底色
- **修复 iOS 端弹窗背景透明 / 边框黑 / 分割线不显示（根因级）**：uni-app x 官方文档确认 Android/iOS 不支持自定义 CSS 变量（`var(--nax-*)` 声明在 iOS 上会整体失效 → background 取透明、border-color 取默认黑）；- **iOS 弹窗暗黑模式适配**：改用官方主题 API（`uni.getAppBaseInfo().appTheme` + `uni.onAppThemeChange`，App 4.18+）监听应用主题，JS 驱动弹窗内字面量颜色（面板 `#101014`/`#ffffff`、分割线 `#ffffff1a`/`#f5f5f7`、遮罩 `rgba(0,0,0,0.6)`/`0.4`、文字/按钮色对齐 dark.css）；根节点挂 `nax-select--ios-dark/light` class 覆盖弹窗内颜色，不依赖 CSS 变量
- 仅影响 iOS 端；Android、鸿蒙、Web、微信小程序保持原生 picker-view 与 var 主题行为不变
## 0.1.14（2026-08-01）
- 修复 Android 端（`APP-ANDROID`）判断多列数据时将 `UTSJSONObject` 强转为 `UTSArray` 引发的 `ClassCastException`；改用 `Array.isArray()` 做运行时类型判断，其它端保持原有逻辑。
- 修复 Android 端（`APP-ANDROID`）暗黑模式下原生 `picker-view` 上下白色渐变遮罩覆盖选择器面板的问题；复用鸿蒙端的 `mask-top-style` 与 `mask-bottom-style` 透明渐变方案，iOS、Web 与小程序保持原有行为。
- 修复 Android 端（`APP-ANDROID`）滚轮选中项上下边框不显示的问题；为原生 `picker-view` 指示器补全 `solid` 边框样式并继续使用主题分割线 token，其它端保持原有行为。
## 0.1.13 (2026-07-29)

- 修复鸿蒙端（`APP-HARMONY`）暗黑模式下原生 `picker-view` 上下白色渐变遮罩覆盖弹层背景的问题：改用 `mask-top-style` 与 `mask-bottom-style` 分别设为透明渐变；其它端保持原有遮罩行为。

## 0.1.12 (2026-07-29)
- 移除第三方组件库参考表述，完善独立组件文档。

## 0.1.11（2026-07-27）

- 修复暗黑模式下弹框滚轮仍显示原生白色渐变遮罩的问题
- 移除原生白色渐变遮罩；非选中项使用次级文字色，选中项使用 `--nax-color-text-black`（浅色为黑、暗色为白），不额外添加背景块或主题色高亮

## 0.1.10（2026-07-19）

- 修复鸿蒙：遮罩盖住底部面板（面板层 z-index 改回父组件作用域）

## 0.1.9（2026-07-19）

- 修复鸿蒙：弹层遮罩半透明黑背景不显示（遮罩脱离 fade 外壳，背景色兜底）

## 0.1.8（2026-07-19）

- 修复鸿蒙：show-trigger / v-model:show 回写导致二次 open，进场动画被吞

## 0.1.7（2026-07-18）

- 弹层动画改为复用 nax-transition（遮罩 fade + 面板 slide-up）

## 0.1.6（2026-07-18）

- 鸿蒙：保留原生滚轮，显式禁用选项点选（点击 no-op），避免误以为可点选

## 0.1.5（2026-07-18）

- 鸿蒙改回原生 picker-view 滚轮（与其它端一致）；不提供列项点选，以滑动选择为准

## 0.1.4（2026-07-18）

- 鸿蒙：自定义滚轮同时支持滚动与点选（不再是纯列表）

## 0.1.3（2026-07-18）

- 鸿蒙：选项点击改为列表点选（原生 picker-view 不响应列项 click）；其它端仍为滚轮

## 0.1.2（2026-07-18）

- 修复鸿蒙联动：滚动结束后先闪第 0 项再回到目标（去掉滚动中整表 remount；仅父列变化时重建子列）

## 0.1.1（2026-07-18）

- 修复鸿蒙多列联动：父列变化后子列不刷新（强制重建 picker-view + 子列数组拷贝）

## 0.1.0（2026-07-18）

- 初版 `nax-select` 列选择器
- 支持 Select 主能力：单列 / 多列 / 多列联动、`v-model:show`、确认取消、默认下标、字段名自定义
- 优化：`multi-column` 正确拼写（兼容 `mutil-*`）、内置触发条 `showTrigger`、底部安全区默认开启、`change` 事件
