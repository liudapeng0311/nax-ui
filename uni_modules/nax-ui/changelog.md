## 0.1.23（2026-08-27）
- 依赖组件更新：`nax-input`（0.2.3→0.2.4）、`nax-textarea`（0.2.3→0.2.4）修复聚焦样式与实际焦点状态不同步：touchstart 提前点亮聚焦样式、失焦样式同步清除（移除 150ms 延迟）、点击清除/密码可见按钮不再写死聚焦态
- 依赖组件更新：`nax-form`（0.1.8→0.2.0）新增 `labelSize` 标签字号属性，表单级统一（空串跟随组件默认 15px）+ 单项覆盖（空跟随 form）
## 0.1.22（2026-08-24）
- 依赖组件更新：`nax-select`（0.2.0→0.2.1）、`nax-datetime-picker`（0.2.0→0.2.1）触发条清除按钮样式对齐 nax-input（去圆形底徽、图标随 size 缩放、配色与热区一致），且有选中值时清除按钮与下拉箭头互斥显示
- readme 官方文档链接改为可点击跳转
## 0.1.21（2026-08-21）
- 依赖组件更新：`nax-tabs`（0.1.16→0.2.0）新增 `centered` 少项居中（内容不满容器宽时整体居中，超宽仍可横滑/均分不拉伸）
- 依赖组件更新：`nax-form`（0.1.7→0.1.8）修复对象 props 非真实 UTSJSONObject 实例时 `root.getAny is not a function`（Web 端反馈），校验/快照失效
## 0.1.20（2026-08-20）
- 依赖组件更新：`nax-select`（0.1.22→0.2.0）新增 `v-model` 选中值绑定，内置触发条按绑定值回显
- 依赖组件更新：`nax-datetime-picker`（0.1.21→0.2.0）修复鸿蒙端清空按钮点击冒泡导致底部选择框重新弹出。
## 0.1.19（2026-08-19）
- 依赖组件更新：`nax-search`（0.2.2→0.2.3）修复蒸汽模式输入文字显示为白色不可见
## 0.1.18（2026-08-18）
- 依赖组件更新：nax-input（0.2.2→0.2.3）、nax-textarea（0.2.2→0.2.3）蒸汽模式输入文字白色不可见修复（字面量内联色 + 暗色检测扩展全 App 端）；nax-tabs（0.1.14→0.1.15）蒸汽模式高度丢失修复（尺寸改 CSS 变量下传）
- 依赖组件更新：nax-select（0.1.20→0.1.21）、nax-datetime-picker（0.1.19→0.1.20）蒸汽模式滚轮高度塌陷修复（picker-view 高度改内联 style）
- 依赖组件更新：nax-button（0.1.22→0.1.23）鸿蒙端按钮文字误省略修复（`max-lines` 鸿蒙端移除，恢复完整展示）
- 依赖组件更新：nax-button（0.1.22→0.1.23）鸿蒙端文字误省略修复；nax-image（0.1.11→0.1.12）、nax-select（0.1.21→0.1.22）、nax-datetime-picker（0.1.20→0.1.21）、nax-virtual-list（0.1.12→0.1.13）修复标签属性区条件编译注释被解析为属性的隐患（改双分支渲染）
- 依赖组件更新：nax-tabs（0.1.15→0.1.16）鸿蒙端高度塌陷修复（组件内 CSS 变量失效，高度改内联）
## 0.1.17（2026-08-18）
- 依赖组件更新：本轮蒸汽模式兼容修复（`lines` CSS → `:max-lines` 属性、下级选择器 `#ifndef VUE3-VAPOR` 隔离）涉及 nax-avatar/badge/button/card/cell/checkbox/datetime-picker/dialog/dropdown/empty/form/grid/icon/image/list/nav-bar/notice-bar/popup/progress/radio/search/select/steps/swipe-action/swiper/tabbar/tabs/tag/text/textarea/upload/virtual-list/action-sheet/alert 共 34 个组件包
## 0.1.14（2026-08-18）
- 依赖组件更新：25 个 nax-* 组件包蒸汽模式兼容修复（`lines` 属性→CSS、scroll-view 移除 `scroll-y`、image 平台属性条件编译）
## 0.1.13（2026-08-18）
- 依赖组件更新：`nax-datetime-picker` 修复 Android 端深色系统下滚轮/文字不可见（呈现空白），面板/文字/指示器改为官方主题 API 驱动的字面量颜色（0.1.16 → 0.1.17）
## 0.1.12（2026-08-18）
- 依赖组件更新：`nax-badge` 修复在居中容器（如宫格）内被 `align-self: flex-start` 顶偏的问题（0.1.5 → 0.1.6）
- 依赖组件更新：`nax-input` 修复密码可见切换图标语义颠倒：密文显示 `eye-off`（当前不可见）、明文显示 `eye`（当前可见）（0.2.1 → 0.2.2）
## 0.1.11（2026-08-17）
- 套装 readme 增加官方文档地址：https://www.nax-ui.cn/
## 0.1.10（2026-08-17）
- 依赖组件更新：`nax-upload` 修复 Android 端选图/选视频/上传 `ClassCastException` 崩溃（0.1.11 → 0.1.12）
## 0.1.9（2026-08-14）
- 依赖组件更新：`nax-dropdown` readme 补齐 Props / 事件表格（0.1.6 → 0.1.7）
## 0.1.8（2026-08-14）
- 精简 readme：移除内部开发向内容（设计说明 / 实现细节 / 平台差异实现等），只保留安装、用法、API、主题等用户文档
## 0.1.7（2026-08-11）
- 套装内全部组件 readme 统一"主题"小节：通过 CSS 变量覆盖表格（button 风格），各组件随包文档同步 patch 升级
## 0.1.6（2026-08-07）
- 套装内全部 `nax-*` 组件已确认支持 App iOS，`package.json` 平台标记 `ios` 由 `-` 改为 `√`；readme 支持平台补充 App iOS。
## 0.1.5（2026-08-01）
修改文档中的敏感词
## 0.1.4（2026-08-01）
- 移除套装入口 `package.json` 中的代码仓库地址。
- 明确套装入口支持 Web、微信小程序、App Android 和 App HarmonyOS；不将 iOS 标记为当前已确认支持平台。
## 0.1.3 (2026-07-31)

- 修正套装入口 README：明确 `nax-ui` 只负责聚合依赖，不提供 `<nax-ui />` 组件，并补充整套安装、按需安装和主题接入说明。
- 修正 `package.json` 元数据：补充真实描述、仓库地址、uni-app x 引擎范围、组件套装关键词和平台支持标记。

## 0.1.2 (2026-07-31)

- 补齐套装依赖，覆盖当前全部 `nax-*` 组件包与 `nax-ui-theme`，新增卡片、表单、键盘、加载、弹出容器与压窗屏依赖。

## 0.1.1 (2026-07-29)

- 移除第三方组件库参考表述，完善独立组件文档。

## 0.1.0（2026-07-14）

- 初始化套装插件骨架
- 首个可用组件见 `uni_modules/nax-button`
