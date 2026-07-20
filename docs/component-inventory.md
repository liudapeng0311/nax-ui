# nax-ui 组件清单

> 状态说明：
> - `planned`：规划中
> - `mvp`：首期必做
> - `next`：二期
> - `later`：三期及以后
> - `done`：已完成（实现后更新）

命名统一：`nax-<name>`，目录：`uni_modules/nax-ui/components/nax-<name>/nax-<name>.uvue`。

---

## 1. 分期总览

| 阶段 | 目标 | 组件数（约） |
|------|------|--------------|
| **MVP（v0.1）** | 可搭页面骨架 + 主操作闭环 | 12 |
| **Next（v0.2）** | 表单与反馈可用 | 12 |
| **Later（v0.3+）** | 导航/展示/业务增强 | 15+ |

原则：
1. 先通用、高频、跨端稳。
2. 先原子组件，再复合组件。
3. 弹层类依赖稳定基础（Popup / Overlay）后再做 Dialog / ActionSheet。
4. 业务组件（如商品卡片）最后做，避免过早绑定业务。

---

## 2. MVP（v0.1）— 必做

### 2.1 基础 Foundation

| 组件 | 标签 | 优先级 | 说明 | 核心 API（提纲） |
|------|------|--------|------|------------------|
| 按钮 | `nax-button` | P0 | 主操作入口；层级参考 Naive：基础/次要/次次要/次次次要/虚线/禁用 | `type(default/primary/info/success/warning/error)` `variant(solid/secondary/tertiary/quaternary/dashed/outline)` `size` `disabled` `loading` `block` `label` `icon` `iconPosition` / `click` |
| 文本 | `nax-text` | P0 | 统一字号/颜色/省略/模式格式化（对齐 uView Pro Text） | `type` `size` `lines` `selectable` `mode` `format` `call` `decoration` `bold` `block` / `click` **done** |
| 图标 | `nax-icon` | P0 | 字体/图片图标壳 | `name` `size` `color` / `click` |
| 间距 | `nax-space` | P0 | 横向/纵向间距容器 | `direction` `size` `wrap` `align` |
| 分割线 | `nax-divider` | P1 | 内容分隔 | `direction` `dashed` `text` |
| 标签 | `nax-tag` | P1 | 状态/分类标记（对齐 Naive Tag） | `type` `variant` `size` `closable` `round` `bordered` `checkable` `checked` / `close` `click` `update:checked` **done** |

### 2.2 布局与列表单元

| 组件 | 标签 | 优先级 | 说明 | 核心 API（提纲） |
|------|------|--------|------|------------------|
| 单元格 | `nax-cell` | P0 | 设置项/列表行基础 | `title` `label` `value` `is-link` `border` / `click` |
| 单元格组 | `nax-cell-group` | P0 | Cell 分组容器 | `title` `inset` |
| 卡片 | `nax-card` | P1 | 内容承载 | `title` `extra` 插槽 `header` `footer` |

### 2.3 展示 / 状态

| 组件 | 标签 | 优先级 | 说明 | 核心 API（提纲） |
|------|------|--------|------|------------------|
| 徽标 | `nax-badge` | P1 | 数字/红点（对齐 Naive Badge） | `value` `max` `dot` `show-zero` `show` `processing` `type` `color` `offsetX/Y` `alone` / 插槽 `value` **done** |
| 头像 | `nax-avatar` | P1 | 图/文字头像（对齐 Naive Avatar） | `src` `text` `size` `shape` `bordered` `color` `fallback-src` / `click` `load` `error` **done** |
| 空状态 | `nax-empty` | P1 | 无数据占位 | `description` `image` 插槽 `action` |

### 2.4 MVP 验收标准

- [ ] 能用 Button + Cell + Space + Text + Empty 搭出列表页与简单设置页
- [ ] 主题色可通过 CSS 变量全局切换
- [ ] 每个组件有 demo 页
- [ ] App 与 Web 至少一端主流程可跑通（优先双端）

---

## 3. Next（v0.2）— 表单与反馈

### 3.1 表单 Form

| 组件 | 标签 | 优先级 | 说明 | 核心 API（提纲） |
|------|------|--------|------|------------------|
| 输入框 | `nax-input` | P0 | 单行输入（对齐 uView Pro Input 主能力；不含 select/textarea） | `v-model` `type(text/password/number/digit/tel/…；不含 idcard/select/textarea)` `placeholder` `clearable` `disabled` `readonly` `maxlength` `border` `inputAlign` `passwordIcon` `size` `prefixIcon` `suffixIcon` / `input` `change` `focus` `blur` `confirm` `clear` `click` **done** |
| 多行输入 | `nax-textarea` | P1 | 多行文本（对齐 uView Pro Textarea 主能力；不含 formatter） | `v-model` `placeholder` `height` `auto-height` `maxlength` `count` `disabled` `readonly` `border` `borderType` `confirmType` `focus` / `input` `change` `focus` `blur` `confirm` `linechange` `keyboardheightchange` `click` **done** |
| 列选择器 | `nax-select` | P0 | 底部列选择（对齐 uView Pro Select；单列/多列/联动） | `v-model:show` `list` `mode(single-column/multi-column/multi-column-auto)` `default-value` `title` `show-trigger` / `confirm` `cancel` `change` **done** |
| 日历 | `nax-calendar` | P1 | 日期/范围选择（对齐 uView Pro Calendar） | `v-model:show` `mode(date/range)` `isPage` `minDate` `maxDate` `defaultDate` `startDate` `endDate` `readonly` `holidays` `workdays` `festivals` `checkinMode` / `change` `open` `close` **done** |
| 键盘 | `nax-keyboard` | P1 | 自定义键盘（对齐 uView Pro Keyboard：数字/车牌/身份证） | `v-model:show` `mode(number/car/card)` `dotEnabled` `tooltip` `tips` `random` `mask` / `change` `backspace` `confirm` `cancel` **done** |
| 开关 | `nax-switch` | P0 | 布尔切换（对齐 uView Pro Switch） | `v-model` `disabled` `loading` `size` `activeColor` `inactiveColor` `vibrateShort` / `change` **done** |
| 滑动选择器 | `nax-slider` | P1 | 区间滑动选择（对齐 uView Pro Slider） | `v-model` `start` `end` `min` `max` `step` `size` `blockWidth` `height` `activeColor` `inactiveColor` `blockColor` `disabled` `useSlot` `showValue` `valuePosition` `showEdgeValue` `edgeValuePosition` / `change` `start` `moving` `end` **done** |
| 复选框 | `nax-checkbox` | P0 | 多选（对齐 uView Pro Checkbox） | `v-model` `name`/`value` `label` `shape` `size` `disabled` `labelDisabled` `activeColor` / `change` **done** |
| 复选框组 | `nax-checkbox-group` | P0 | 多选组 | `v-model` `shape` `size` `max` `wrap` `width` `labelDisabled` `activeColor` / `change` **done** |
| 单选框 | `nax-radio` | P0 | 单选（对齐 uView Pro Radio） | `v-model` `name`/`value` `label` `shape` `size` `disabled` `labelDisabled` `activeColor` / `change` **done** |
| 单选组 | `nax-radio-group` | P0 | 单选组 | `v-model` `shape` `size` `wrap` `width` `labelDisabled` `activeColor` / `change` **done** |
| 步进器 | `nax-number-box` | P1 | 数量调节（对齐 uView Pro NumberBox） | `v-model` `min` `max` `step` `integer` `disabled` `disabledInput` `disablePlus`/`disableMinus` `asyncChange` `longPress` `size` / `change` `focus` `blur` `overlimit` `plus` `minus` **done** |
| 评分 | `nax-rate` | P1 | 星型评分（对齐 uView Pro Rate） | `v-model` `count` `disabled` `readonly` `size` `activeColor` `inactiveColor` `gutter` `minCount` `allowHalf` `touchable` `activeIcon` `inactiveIcon` / `change` **done** |
| 上传 | `nax-upload` | P1 | 图片/视频选择与预览上传（对齐 uView Pro Upload） | `fileList` `accept` `maxCount` `maxSize` `multiple` `deletable` / `afterRead` `delete` `oversize` **done** |
| 表单项 | `nax-form-item` | P1 | 标签+控件+错误（对齐 uView Pro FormItem） | `label` `prop` `rules` `required` `status` `error-message` `labelPosition` `labelWidth` / **done** |
| 表单 | `nax-form` | P1 | 校验容器（对齐 uView Pro Form） | `model` `rules` `errorType` `labelPosition` `labelWidth` / `validate` `validateField` `resetFields` `clearValidate` `setRules` **done** |

### 3.2 反馈 Feedback

| 组件 | 标签 | 优先级 | 说明 | 核心 API（提纲） |
|------|------|--------|------|------------------|
| 过渡 | `nax-transition` | P0 | 轻量进退场（弹层底座） | `show` `name(fade/slide-up/slide-down/slide-left/slide-right/zoom/fade-up)` `duration` `appear` / `before-enter` `after-enter` `before-leave` `after-leave` **done** |
| 加载 | `nax-loading` | P0 | 局部/页面加载 | `size` `vertical` `text` |
| 遮罩 | `nax-overlay` | P0 | 弹层底层 | `show` `z-index` / `click` |
| 弹出层 | `nax-picker` | P0 | 自定义内容弹出；底部/中心/左/右（原规划 nax-popup） | `v-model:show` `position(bottom/center/left/right)` `round` `mask` `maskClosable` `width` `height` / `open` `opened` `close` `click-mask` **done** |
| 轻提示 | `nax-toast` | P1 | 函数式短反馈：`naxToast()` / `hideNaxToast()`；全局挂一次宿主 | `naxToast(title|options)` `type(text/success/error/warning/info/loading)` `position` `duration` `overlay` / `hideNaxToast` **done** |
| 对话框 | `nax-dialog` | P1 | 确认/告警；声明式 `v-model:show` + 命令式 `naxDialog()`/`Alert`/`Confirm`；薄封装 nax-picker | `v-model:show` `title` `content` `showCancel` `confirmType` `asyncClose` `maskClosable` / `confirm` `cancel`；API：`naxDialog` `naxDialogAlert` `naxDialogConfirm` `hideNaxDialog` **done** |
| 动作面板 | `nax-action-sheet` | P1 | 底部操作列表；薄封装 nax-picker | `v-model:show` `actions` `title` `description` `showCancel` / `select` `cancel` **done** |
| 警告提示 | `nax-alert` | P1 | 页面内常驻提示（对齐 uView Pro AlertTips） | `type` `title` `description` `closable` `showIcon` `variant(light/solid)` `center` `show` / `close` `click` `update:show` **done** |

---

## 4. Later（v0.3+）— 导航与业务

| 组件 | 标签 | 优先级 | 说明 |
|------|------|--------|------|
| 导航栏 | `nax-nav-bar` | P1 | 页头 |
| 标签页 | `nax-tabs` | P1 | 内容切换 |
| 宫格 | `nax-grid` | P2 | 入口宫格 |
| 列表 | `nax-list` | P2 | 滚动列表壳 |
| 轮播 | `nax-swiper` | P1 | 图片/内容轮播 |
| 图片 | `nax-image` | P2 | 占位/失败态 |
| 业务卡片等 | — | later | 不进 MVP |

---

## 5. 实现状态看板（更新处）

| 组件 | 状态 | 备注 |
|------|------|------|
| `nax-button` | done | 插件包 `uni_modules/nax-button`；支持 `icon`/`iconPosition`；loading 旋转图标 |
| `nax-text` | done | 插件包 `uni_modules/nax-text`；对齐 uView Pro Text；鸿蒙省略用 `#ifdef APP-HARMONY` 双写 lines/宽度约束 |
| `nax-icon` | mvp | 插件包已有骨架 |
| `nax-swiper` | done | 插件包 `uni_modules/nax-swiper`；原生 swiper 封装；dot/number 指示器 |
| `nax-ui-theme` | done | 默认色参考 Naive light |
| `nax-avatar` | done | 插件包 `uni_modules/nax-avatar`；对齐 Naive Avatar；图片/文字/尺寸/形状/描边/fallback |
| `nax-select` | done | 插件包 `uni_modules/nax-select`；对齐 uView Pro Select；单列/多列/联动 + showTrigger；弹层动画复用 `nax-transition` |
| `nax-tag` | done | 插件包 `uni_modules/nax-tag`；对齐 Naive Tag；type/variant/size/closable/checkable/round/bordered |
| `nax-transition` | done | 插件包 `uni_modules/nax-transition`；fade/slide/zoom 预设；进退场事件 |
| `nax-picker` | done | 插件包 `uni_modules/nax-picker`；通用弹出容器；position bottom/center/left/right；动画复用 `nax-transition` |
| `nax-action-sheet` | done | 插件包 `uni_modules/nax-action-sheet`；底部操作菜单；薄封装 `nax-picker`；`actions` / `select` / `cancel` |
| `nax-alert` | done | 插件包 `uni_modules/nax-alert`；对齐 uView Pro AlertTips；type/title/description/showIcon/closable/variant/center/show |
| `nax-toast` | done | 插件包 `uni_modules/nax-toast`；函数式 `naxToast()`；全局挂一次 `<nax-toast />` 宿主；未挂载回退 `uni.showToast` |
| `nax-dialog` | done | 插件包 `uni_modules/nax-dialog`；声明式 `v-model:show` + 命令式 `naxDialog()`/`naxDialogAlert()`/`naxDialogConfirm()`；薄封装 `nax-picker`；未挂载回退 `uni.showModal` |
| `nax-keyboard` | done | 插件包 `uni_modules/nax-keyboard`；对齐 uView Pro Keyboard；number/car/card、乱序、遮罩弹层、长按退格 |
| `nax-calendar` | done | 插件包 `uni_modules/nax-calendar`；对齐 uView Pro Calendar；date/range + 弹层/页面 + 节假日/打卡；弹层动画复用 `nax-transition` |
| `nax-checkbox` / `nax-checkbox-group` | done | 插件包 `uni_modules/nax-checkbox`；单独布尔 v-model / 组 string[]；provide-inject |
| `nax-radio` / `nax-radio-group` | done | 插件包 `uni_modules/nax-radio`；单独布尔 v-model / 组 string；provide-inject |
| `nax-switch` | done | 插件包 `uni_modules/nax-switch`；布尔 v-model；loading 分端旋转；transform 滑动 + 轨道变色过渡 |
| `nax-slider` | done | 插件包 `uni_modules/nax-slider`；对齐 uView Pro Slider；v-model/min/max/step/showValue/useSlot；start/moving/end/change |
| `nax-number-box` | done | 插件包 `uni_modules/nax-number-box`；对齐 uView Pro NumberBox；加减/输入/长按/asyncChange/overlimit |
| `nax-rate` | done | 插件包 `uni_modules/nax-rate`；对齐 uView Pro Rate；v-model/count/allowHalf/minCount/滑动打分/readonly |
| `nax-form` / `nax-form-item` | done | 插件包 `uni_modules/nax-form`；对齐 uView Pro Form；轻量 rules 校验 + provide/inject |
| `nax-upload` | done | autoUpload/action/header/formData;  插件包 `uni_modules/nax-upload`；对齐 uView Pro Upload；选图/预览/删除/状态；实际上传在 afterRead |
| 其余 MVP | planned | 按依赖自底向上 |

---

## 6. 按钮层级速查（Naive 对齐）

| 中文 | `variant` | 视觉 |
|------|-----------|------|
| 基础 | `solid`（默认） | default：白底描边；彩色 type：实心填充 |
| 次要 | `secondary` | 浅色填充、无边框 |
| 次次要 | `tertiary` | 更弱浅底 |
| 次次次要 | `quaternary` | 无底无边，仅文字色 |
| 虚线 | `dashed` | 虚线描边 |
| 禁用 | `disabled` | 整体 opacity ≈ 0.5，不触发 click |

兼容：`light`→`secondary`，`text`→`quaternary`，`type="tertiary"`→`default`+`tertiary`。


