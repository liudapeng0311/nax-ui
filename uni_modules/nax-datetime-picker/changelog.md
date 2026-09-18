## 0.3.1（2026-09-18）
- 接入 `nax-form` 表单校验联动：注入 `nax-form-item` 提供的字段级校验入口，确认选择 / 清空 / 滚轮列变化按 `change` 回调，使规则 `trigger: 'change'` / `['blur', 'change']` 自动生效（此前需业务侧手动调 `validateField`）
- 校验使用控件当前值而非业务侧 `model`（`model` 多在 `@change` 才同步），选择或清空后错误提示即时消失
- 未置于 `nax-form-item` 内时为空实现，行为不变；仅新增注入与回调，微信小程序端系统弹层路径同样接入；全端一致
## 0.3.0（2026-09-04）
- **微信小程序端（`MP-WEIXIN`）可映射模式改用微信系统弹层 `picker`**，贴合微信原生 UI：`date`（fields=day）/ `year`（fields=year）/ `year-month`（fields=month）/ `time`（未开 `show-second`）分别映射 `mode="date"` / `mode="time"`，`min-date` / `max-date` / `min-hour` / `max-hour` 等范围映射 `start` / `end`；滚动吸附后点「确定」回调，值即最终值，消除此前 `picker-view` 的 change 延迟与确认拦截问题
- 不可映射模式（`datetime` / `month-day` / `time` + `show-second`）微信端保持自建弹层（picker-view）不变
- 微信端限制：系统弹层 UI 不可定制（`confirm-text` / `cancel-text` / 颜色 / `z-index` 等弹层定制 props 不生效；`title` 仅微信安卓端显示）；`v-model:show` 程序化打开不生效（点击触发条弹出）；暗黑模式跟随微信宿主深色主题（需小程序开启 darkmode）
- 仅影响微信小程序端；Android / iOS / 鸿蒙 / Web 行为不变
## 0.2.1（2026-08-24）
- 触发条清除按钮样式对齐 `nax-input`：移除灰色圆形底徽，改为纯 close 图标；图标随 `size` 缩放（sm 14 / md 16 / lg 18），配色与热区内边距一致；App 深色主题沿用 custom-class `nax-theme-dark` 判定字面量色（`APP-ANDROID` / `APP-IOS` / `APP-HARMONY`），其它端浅色默认不变
- 有选中值显示清除按钮时隐藏下拉箭头，二者互斥且切换位置精确重合（箭头容器补齐相同热区内边距、图标同尺寸）
- readme 同步修正清除按钮与箭头互斥的描述
## 0.2.0（2026-08-20）
- 内置触发条新增 `clearable`（默认 true）：有选中值时在下箭头左侧显示清除按钮，点击后清空选中、回写空的 `v-model`（`0`），并触发 `clear`
- 修复鸿蒙端：清空触发条选中值后，点击事件冒泡导致底部选择框重新弹出；增加触发条入口抑制并清理异步 `picker-view` 回调（`APP-HARMONY`）。
## 0.1.21（2026-08-18）
- 修复模板条件编译注释位于标签属性区被解析为属性的隐患：picker-view 的 `mask-top-style` / `mask-bottom-style` 改为条件编译双分支渲染（注释移至标签外）
## 0.1.20（2026-08-18）
- 修复蒸汽模式（App 安卓/鸿蒙）弹框滚轮高度塌陷为一条选项：原生 picker-view 高度改内联 `:style` 显式指定（CSS height 在 App 蒸汽下不可靠）
## 0.1.19（2026-08-18）
- 蒸汽模式兼容：`lines` CSS 声明迁移为 `<text>` 的 `:max-lines` 属性（官方蒸汽模式方案），消除 Vapor 运行时与 CSS 编译器警告
- 蒸汽模式（`VUE3-VAPOR`）兼容修复：触发文字 sm/lg 尺寸、iOS 主题与 Android 主题的字面量颜色覆盖共 26 条下级选择器规则用 `#ifndef VUE3-VAPOR` 条件编译隔离，消除 "Invalid selector" 警告；VDOM/Web/小程序行为不变
## 0.1.18（2026-08-18）
- 蒸汽模式兼容：移除 `<text>` 上不支持的 `lines` 属性，改为 CSS `lines` 声明（各文本 class 补齐 `lines: N;`），消除 App 蒸汽模式 warning
## 0.1.17（2026-08-18）
- **修复 Android 端深色系统下滚轮/文字不可见（呈现为空白）**：Android 不支持自定义 CSS 变量（`var(--nax-*)` 声明失效，滚轮文字退化为系统默认色，深色系统下白字白底不可见）；参照 iOS 方案，用官方主题 API（`uni.getAppBaseInfo().appTheme` + `uni.onAppThemeChange`，App 4.18+）驱动字面量颜色：面板底色、标题、取消/确认按钮、滚轮文字/选中项、指示器边框、标题分割线均按主题兜底，不再依赖 CSS 变量
- 仅影响 Android 端（`APP-ANDROID`）；iOS 原有自研滚轮字面量方案保留不变，鸿蒙、Web、微信小程序行为保持不变
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
