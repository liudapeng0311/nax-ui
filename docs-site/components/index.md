# 组件总览

> 53 个独立组件包 + 1 个主题包 + nax-use 组合式函数包，全部基于 uni-app x / uvue 实现，组件 easycom 自动注册。

## 基础组件

| 组件 | 说明 |
|------|------|
| [nax-button](/components/button) | 通用按钮。色系与层级参考 ：基础 / 次要 / 次次要 / 次次次要 / 虚线 / 禁用。 |
| [nax-text](/components/text) | 文本 Text：主题色 / 字号 / 省略 / 加粗 / 装饰 / 模式格式化（价格、手机号、姓名、日期、链接）等。 |
| [nax-icon](/components/icon) | 字体图标（Tabler 语义子集）；支持 `glyph` + `font-family` 接入自备图标字体（iconfont 码位可直接粘贴）。 |
| [nax-space](/components/space) | 间距容器。横向/纵向排列子项并统一间距。配合 nax-space-item 使用。 |
| [nax-line](/components/line) | 纯线条（布局分隔）。横/竖、粗细、虚线、语义色；默认走 --nax-color-divider。 |
| [nax-divider](/components/divider) | 内容分割线（可带文字）。与 nax-line 分工：line 只画纯线，本组件负责「文案分隔」。 |
| [nax-tag](/components/tag) | 标签。能力对齐  Tag：类型 / 尺寸 / 边框 / 圆角 / 可关闭 / 可选中。 |
| [nax-badge](/components/badge) | 徽标。 |
| [nax-avatar](/components/avatar) | 头像。能力对齐  Avatar：尺寸 / 形状 / 图片 / 文字 / 描边 / 失败回退。 |
| [nax-rich-text](/components/rich-text) | 富文本。自研解析渲染器引擎（默认，全端一致）与内置 rich-text 引擎双通道：HTML 字符串 / 节点列表双入口，全局字号/颜色/行高/字体，图片预览，内容点击事件。 |

## 布局组件

| 组件 | 说明 |
|------|------|
| [nax-cell](/components/cell) | 单元格。设置项 / 列表行基础。对齐  CellItem + 清单 API。 |
| [nax-card](/components/card) | 内容卡片。标题 / 额外操作 / 封面 / 页脚插槽，主题 token 背景与边框。 |
| [nax-grid](/components/grid) | 宫格容器。配合 nax-grid-item 使用。 |
| [nax-steps](/components/steps) | 步骤条容器。list 数据驱动或配合 nax-step 组合使用。 |
| [nax-list](/components/list) | 滚动列表壳：内部 scroll-view 触底加载 + 下拉刷新 + 空/错/底态。虚拟列表见 nax-virtual-list。 |
| [nax-virtual-list](/components/virtual-list) | 固定行高虚拟列表。App 端 spacer 窗口裁剪；Web/小程序固定总高 + translateY（规避滚动锚定连滚）。iOS/鸿蒙滚动合并更新 + scrollend 同步事件。 |
| [nax-table](/components/table) | 数据表格。columns/data 驱动，支持斑马纹、边框、固定表头、横向滚动、排序、行数省略、空态、多选、合计行、分组表头、分页、加载更多、固定列、虚拟滚动。 |
| [nax-swipe-action](/components/swipe-action) | 滑动操作。左滑露出右侧操作按钮；可与 nax-swipe-action-group 互斥展开。 |
| [nax-swiper](/components/swiper) | 轮播。基于原生 swiper 封装。 |

## 表单组件

| 组件 | 说明 |
|------|------|
| [nax-input](/components/input) | 单行输入框。（不含 select / textarea / idcard）。 |
| [nax-search](/components/search) | 搜索框。 |
| [nax-textarea](/components/textarea) | 多行文本域。 |
| [nax-select](/components/select) | 列选择器（底部弹层 + picker-view）。 |
| [nax-calendar](/components/calendar) | 日历选择器。功能主要对齐  Calendar：单选 / 范围、弹层 / 页面内联、节假日与打卡标记。 |
| [nax-datetime-picker](/components/datetime-picker) | 时间选择器（底部弹层 + picker-view）。对齐  DatetimePicker 主能力。 |
| [nax-date-strip](/components/date-strip) | 横向日期选择条。以横条方式展示一段连续日期，支持单选 / 多选 / 范围选择。 |
| [nax-keyboard](/components/keyboard) | 自定义键盘：数字 / 车牌号 / 身份证；支持乱序、遮罩弹层与长按退格 |
| [nax-switch](/components/switch) | 开关。用于二选一场景。 |
| [nax-slider](/components/slider) | 滑动选择器。用于表单中选择某一区间值。 |
| [nax-checkbox](/components/checkbox) | 复选框。可单独使用（v-model 布尔）或置于 nax-checkbox-group 内。 |
| [nax-radio](/components/radio) | 单选框。可单独使用（v-model 布尔）或置于 nax-radio-group 内。 |
| [nax-number-box](/components/number-box) | 步进器。用于数量加减 |
| [nax-rate](/components/rate) | 评分。星型满意度评分。 |
| [nax-upload](/components/upload) | 上传。主能力：选图/预览/删除/状态；实际上传在 afterRead 中由业务完成。 |
| [nax-form](/components/form) | 表单容器。管理 model / rules，提供校验与重置。功能主要对齐  Form。 |

## 反馈组件

| 组件 | 说明 |
|------|------|
| [nax-transition](/components/transition) | 轻量进退场过渡。预设 fade / slide-up / slide-down / slide-left / slide-right / zoom / fade-up。 |
| [nax-loading](/components/loading) | 局部/区块加载指示。App 端用原生 animate 旋转；Web/小程序用 CSS 动画。 |
| [nax-progress](/components/progress) | 进度条。线形 / 圆形统一入口；props 管行为，外观走 type/size + CSS 变量。 |
| [nax-skeleton](/components/skeleton) | 骨架屏。头像/标题/段落占位；loading 控制骨架与真实内容切换。 |
| [nax-overlay](/components/overlay) | 全屏遮罩层（弹层底层）。半透明蒙层 + 可选默认插槽内容；支持淡入淡出。 |
| [nax-picker](/components/picker) | 通用弹出容器，支持自定义内容；可从底部 / 中间 / 左侧 / 右侧弹出。 |
| [nax-popup](/components/popup) | 压窗屏 / 页面级弹层。 |
| [nax-toast](/components/toast) | 轻提示宿主。全局挂载一次后，业务通过 naxToast() 命令式调用。 |
| [nax-dialog](/components/dialog) | 居中对话框：声明式 v-model:show + 命令式 naxDialog()/naxDialogAlert()/naxDialogConfirm()。 |
| [nax-action-sheet](/components/action-sheet) | 底部动作面板：标准操作列表 + 取消。薄封装 nax-picker。 |
| [nax-alert](/components/alert) | 警告提示条（页面内常驻）。能力对齐  AlertTips：类型 / 标题 / 描述 / 图标 / 可关闭 / light\|solid。 |
| [nax-notice-bar](/components/notice-bar) | 滚动通告栏，支持 NoticeBar 的水平衔接、水平步进、垂直步进、主题、图标和关闭操作。 |

## 导航组件

| 组件 | 说明 |
|------|------|
| [nax-nav-bar](/components/nav-bar) | 自定义顶部导航栏。状态栏安全区 + fixed 占位 + 返回栈兜底；微信小程序预留胶囊右侧空间。 |
| [nax-tabbar](/components/tabbar) | 自定义底部标签栏。图标字体优先、图片次之；轻量徽标；fixed + 占位 + 安全区。 |
| [nax-tabs](/components/tabs) | 顶部标签导航。list + v-model；可滚动/均分；指示条；徽标/红点/禁用。内容区由业务自管。 |
| [nax-dropdown](/components/dropdown) | 筛选栏式下拉菜单容器。配合 nax-dropdown-item；默认单选列表 + 自定义插槽面板。 |

## 展示组件

| 组件 | 说明 |
|------|------|
| [nax-image](/components/image) | 图片。基于原生 image 封装，支持加载中 / 失败占位。 |
| [nax-empty](/components/empty) | 空状态。无数据 / 失败 / 搜索无结果等占位。 |
