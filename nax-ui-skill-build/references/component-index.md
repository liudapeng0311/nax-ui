# nax-ui 组件索引（51 个组件 + nax-use 组合式函数）

按需选择组件：**先看这里确定组件名，再读 `components/<name>.md` 获取完整 API**。
所有组件 easycom 自动注册，模板中直接写 `<nax-xxx>` 即可，无需 import。

## 基础 Foundation

| 组件 | 一句话说明 | 组件卡 |
|------|-----------|--------|
| `nax-button` | 按钮；`type`(default/primary/info/success/warning/error) × `variant`(solid/secondary/tertiary/quaternary/dashed/outline)、loading、icon | [components/nax-button.md](components/nax-button.md) |
| `nax-text` | 文本；字号/颜色/行数省略/模式格式化 | [components/nax-text.md](components/nax-text.md) |
| `nax-icon` | 字体图标（Tabler Icons 语义子集，51）；`name`/`glyph`/`font-family`/`size`/`color`；`glyph` 支持直接粘贴 iconfont 码位（如 `&#xe6cf;`）接入自定义图标字体 | [components/nax-icon.md](components/nax-icon.md) |
| `nax-space` | 横向/纵向间距容器 + `nax-space-item` | [components/nax-space.md](components/nax-space.md) |
| `nax-line` | 纯线条（布局分隔）；hairline/sm/md/lg | [components/nax-line.md](components/nax-line.md) |
| `nax-divider` | 分割线（可带文字） | [components/nax-divider.md](components/nax-divider.md) |
| `nax-tag` | 标签；type/variant/size/closable/checkable | [components/nax-tag.md](components/nax-tag.md) |
| `nax-rich-text` | 富文本；双引擎：自研解析渲染器（默认 parser，全端一致：音频/视频播放卡、图片预览、表格对齐）与内置 rich-text 兜底；HTML/节点列表、内容点击 | [components/nax-rich-text.md](components/nax-rich-text.md) |

## 布局与列表单元

| 组件 | 一句话说明 | 组件卡 |
|------|-----------|--------|
| `nax-cell` / `nax-cell-group` | 单元格（设置项/列表行）+ 分组容器 | [components/nax-cell.md](components/nax-cell.md) |
| `nax-card` | 内容卡片；标题/额外区/封面/页脚 | [components/nax-card.md](components/nax-card.md) |
| `nax-grid` / `nax-grid-item` | 宫格布局 | [components/nax-grid.md](components/nax-grid.md) |
| `nax-list` | 滚动列表壳：触底加载 + 下拉刷新 + 空/加载/结束/错误状态 | [components/nax-list.md](components/nax-list.md) |
| `nax-virtual-list` | 固定行高虚拟列表（大列表性能） | [components/nax-virtual-list.md](components/nax-virtual-list.md) |

## 展示与状态

| 组件 | 一句话说明 | 组件卡 |
|------|-----------|--------|
| `nax-badge` | 徽标（数字/红点） | [components/nax-badge.md](components/nax-badge.md) |
| `nax-avatar` | 头像（图/文字） | [components/nax-avatar.md](components/nax-avatar.md) |
| `nax-empty` | 空状态占位 | [components/nax-empty.md](components/nax-empty.md) |
| `nax-image` | 图片；loading/error 占位 | [components/nax-image.md](components/nax-image.md) |
| `nax-loading` | 局部/区块加载 | [components/nax-loading.md](components/nax-loading.md) |
| `nax-skeleton` | 骨架屏 | [components/nax-skeleton.md](components/nax-skeleton.md) |
| `nax-progress` | 进度条；line/circle | [components/nax-progress.md](components/nax-progress.md) |
| `nax-steps` / `nax-step` | 步骤条 | [components/nax-steps.md](components/nax-steps.md) |
| `nax-swiper` | 轮播 | [components/nax-swiper.md](components/nax-swiper.md) |

## 表单 Form

| 组件 | 一句话说明 | 组件卡 |
|------|-----------|--------|
| `nax-input` | 单行输入；`v-model`、clearable、password | [components/nax-input.md](components/nax-input.md) |
| `nax-textarea` | 多行文本域；`v-model`、count、auto-height | [components/nax-textarea.md](components/nax-textarea.md) |
| `nax-search` | 搜索框；shape、showAction | [components/nax-search.md](components/nax-search.md) |
| `nax-select` | 列选择器（底部弹层）；单列/多列/联动；`v-model` + `v-model:show`；触发条可清除 | [components/nax-select.md](components/nax-select.md) |
| `nax-picker` | 通用弹出容器（自定义弹层内容） | [components/nax-picker.md](components/nax-picker.md) |
| `nax-datetime-picker` | 日期时间滚轮选择；`v-model:show` + `v-model`；触发条可清除 | [components/nax-datetime-picker.md](components/nax-datetime-picker.md) |
| `nax-calendar` | 日历；date/range | [components/nax-calendar.md](components/nax-calendar.md) |
| `nax-keyboard` | 自定义键盘；number/car/card | [components/nax-keyboard.md](components/nax-keyboard.md) |
| `nax-switch` | 开关；`v-model` | [components/nax-switch.md](components/nax-switch.md) |
| `nax-slider` | 滑动选择器；`v-model`、range | [components/nax-slider.md](components/nax-slider.md) |
| `nax-checkbox` / `nax-checkbox-group` | 复选框（组）；`v-model` | [components/nax-checkbox.md](components/nax-checkbox.md) |
| `nax-radio` / `nax-radio-group` | 单选框（组）；`v-model` | [components/nax-radio.md](components/nax-radio.md) |
| `nax-number-box` | 步进器（加减数量）；`v-model` | [components/nax-number-box.md](components/nax-number-box.md) |
| `nax-rate` | 评分；`v-model`、allowHalf | [components/nax-rate.md](components/nax-rate.md) |
| `nax-upload` | 上传；选图/预览/删除 | [components/nax-upload.md](components/nax-upload.md) |
| `nax-form` / `nax-form-item` | 表单校验容器；rules、validate() | [components/nax-form.md](components/nax-form.md) |

## 反馈 Feedback

| 组件 | 一句话说明 | 组件卡 |
|------|-----------|--------|
| `nax-transition` | 轻量进退场过渡（弹层底座） | [components/nax-transition.md](components/nax-transition.md) |
| `nax-overlay` | 全屏遮罩层 | [components/nax-overlay.md](components/nax-overlay.md) |
| `nax-toast` | 轻提示；**函数式** `naxToast()` | [components/nax-toast.md](components/nax-toast.md) |
| `nax-dialog` | 对话框；声明式 `v-model:show` + 命令式 `naxDialog()` | [components/nax-dialog.md](components/nax-dialog.md) |
| `nax-action-sheet` | 底部操作菜单 | [components/nax-action-sheet.md](components/nax-action-sheet.md) |
| `nax-alert` | 页面内常驻提示条 | [components/nax-alert.md](components/nax-alert.md) |
| `nax-notice-bar` | 滚动通告栏 | [components/nax-notice-bar.md](components/nax-notice-bar.md) |
| `nax-popup` | 压窗屏/页面级弹层（App/Web `openDialogPage`） | [components/nax-popup.md](components/nax-popup.md) |

## 导航与操作

| 组件 | 一句话说明 | 组件卡 |
|------|-----------|--------|
| `nax-nav-bar` | 自定义顶部导航栏（需 `navigationStyle: custom`） | [components/nax-nav-bar.md](components/nax-nav-bar.md) |
| `nax-tabbar` | 自定义底部标签栏（非原生 tabBar） | [components/nax-tabbar.md](components/nax-tabbar.md) |
| `nax-tabs` | 顶部标签导航；数据驱动 | [components/nax-tabs.md](components/nax-tabs.md) |
| `nax-dropdown` / `nax-dropdown-item` | 筛选栏式下拉菜单 | [components/nax-dropdown.md](components/nax-dropdown.md) |
| `nax-swipe-action` / `nax-swipe-action-group` | 左滑操作菜单 | [components/nax-swipe-action.md](components/nax-swipe-action.md) |

## 组合式函数（nax-use）

无头逻辑复用（只提供状态与控制方法，不渲染 UI）：在 `<script setup>` 中直接 `import` 使用，不走 easycom。函数速查与用法见 [components/nax-use.md](components/nax-use.md)。

| 函数 | 一句话说明 |
|------|-----------|
| `useCountdown` | 倒计时；days/hours/minutes/seconds/milliseconds/status（idle/running/paused/finished）+ start/pause/reset/dispose；整秒向上取整逐秒不跳号 |
| `useValidate` | 无头表单校验（与 `nax-form` 同一实现，依赖 nax-form 包） |
| `useDebounce` | 防抖；call/cancel/flush |
| `useThrottle` | 节流；call/cancel/flush，leading + trailing |
| `useDatetimeParts` | 日期时间 parts（与 `nax-datetime-picker` 同一引擎，依赖该包；供自建 picker-view） |
| `useInterval` | 可控轮询；start/stop/running/count（均响应式） |
| `useStorage` | 响应式本地缓存；改值即写缓存，置 `null` 删除 key |

## 选择建议（常见需求 → 组件）

- 登录/表单页 → `nax-form` + `nax-input` + `nax-button`
- 弹窗确认 → `nax-dialog`（或 `naxToast` 轻提示）
- 列表页（触底加载）→ `nax-list` + `nax-cell`；大列表 → `nax-virtual-list`
- 无数据占位 → `nax-empty`
- 底部操作菜单 → `nax-action-sheet`
- 日期/时间选择 → `nax-datetime-picker` / `nax-calendar`
- 页面骨架 → `nax-nav-bar` + `nax-tabbar` + `nax-tabs`
