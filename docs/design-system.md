# nax-ui 设计规范

> 适用范围：`uni_modules/nax-ui` 及本仓库演示工程  
> 目标端：App（Android / iOS / HarmonyOS）+ Web + 微信小程序  
> 渲染模式：蒸汽模式优先；样式隔离策略 2.0  
> 技术栈：uvue + uts（组合式 API）

---

## 1. 产品定位

`nax-ui` 是面向 **uni-app x** 的通用 UI 组件库，不是 uts 原生插件。

| 维度 | 约定 |
|------|------|
| 包形态 | 单包套装：`uni_modules/nax-ui` |
| 使用方式 | easycom 自动注册，业务侧尽量零 import |
| 设计原则 | props 管行为，class / CSS 变量 / externalClasses 管外观 |
| 兼容策略 | 先把 uni-app x 做好，不优先兼容老 uni-app |
| 文档形态 | 组件清单 + 设计规范 + 每个组件 demo 页 |

不做什么：

- 不把 UI 库做成 uts 原生组件（地图/相机等除外，当前阶段不做）
- 不在 props 里塞大量 `xxxStyle` / 颜色字符串做主题
- 不依赖 Web 独有 CSS 作为核心样式
- 不默认支持 Options API

---

## 2. 命名规范

### 2.1 组件命名

| 规则 | 示例 | 说明 |
|------|------|------|
| 前缀 | `nax-` | 固定前缀，避免与官方/第三方冲突 |
| 目录 | `components/nax-button/nax-button.uvue` | 满足 easycom |
| 标签 | `<nax-button />` | kebab-case |
| 文件 | 组件名与目录同名 | 严格一致 |
| 类型/工具 | `NaxButtonProps`、`useNaxTheme` | PascalCase / camelCase |

### 2.2 Props / Events / Slots

| 类型 | 命名 | 示例 |
|------|------|------|
| Boolean 行为 | `disabled` / `loading` / `clearable` | 不用 `isDisabled` |
| 枚举外观 | `type` / `size` / `variant` | 见下方取值表 |
| 文案 | `label` / `placeholder` / `title` | 短词优先 |
| 事件 | `click` / `change` / `confirm` / `cancel` / `close` | 不写 `onXxx` 作为 prop |
| 默认插槽 | 默认内容 | 无 name |
| 具名插槽 | `prefix` / `suffix` / `icon` / `title` / `extra` / `footer` | 语义化 |

### 2.3 CSS class

| 规则 | 示例 |
|------|------|
| 根节点 | `nax-button` |
| 修饰符 | `nax-button--primary`、`nax-button--lg`、`nax-button--disabled` |
| 元素 | `nax-button__text`、`nax-button__icon` |
| 状态 | `--hover` / `--active` / `--disabled` / `--loading` |
| 外部可覆盖 | 通过 `externalClasses` 暴露，如 `custom-class` |

BEM 轻量版：`block__element--modifier`，只允许 class 选择器。

### 2.4 Token / CSS 变量

| 层级 | 命名 | 示例 |
|------|------|------|
| 原始 token | `--nax-color-blue-500` | 不直接在组件业务里用 |
| 语义 token | `--nax-color-primary` | 组件默认使用语义层 |
| 组件 token | `--nax-button-height` | 组件局部可覆盖 |
| SCSS 变量 | `$nax-color-primary` | 仅编译期辅助，最终以 CSS 变量落地 |

---

## 3. 设计 Token

### 3.1 颜色

#### 品牌与功能色

| Token | 默认值 | 用途 |
|-------|--------|------|
| `--nax-color-primary` | `#18a058` | 主操作、链接 |
| `--nax-color-success` | `#18a058` | 成功 |
| `--nax-color-warning` | `#f0a020` | 警告 |
| `--nax-color-danger` | `#d03050` | 危险/错误（兼容） |
| `--nax-color-error` | `#d03050` | 错误（推荐，与按钮 type=error 对齐） |
| `--nax-color-info` | `#2080f0` | 信息提示 |

#### 文本色

| Token | 默认值 | 用途 |
|-------|--------|------|
| `--nax-color-text` | `#333639` | 主文案 |
| `--nax-color-text-secondary` | `#767c82` | 次文案（Naive textColor3） |
| `--nax-color-text-placeholder` | `#c2c2c2` | 占位（Naive placeholder） |
| `--nax-color-text-disabled` | `#c2c2c2` | 禁用 |
| `--nax-color-text-inverse` | `#ffffff` | 深色底上的文字 |

#### 背景 / 边框 / 遮罩

| Token | 默认值 | 用途 |
|-------|--------|------|
| `--nax-color-bg` | `#ffffff` | 页面/卡片底 |
| `--nax-color-bg-secondary` | `#fafafc` | 次级背景（actionColor） |
| `--nax-color-bg-hover` | `#f3f3f5` | 点击态（hoverColor） |
| `--nax-color-border` | `#e0e0e6` | 默认边框（borderColor） |
| `--nax-color-border-strong` | `#c2c2c2` | 强调边框 |
| `--nax-color-mask` | `rgba(0, 0, 0, 0.4)` | 弹层遮罩 |


#### 品牌与状态色阶（Naive hover / pressed）

| Token | 默认值 | 用途 |
|-------|--------|------|
| `--nax-color-primary-hover` | `#36ad6a` | 主题悬停 |
| `--nax-color-primary-deep` | `#0c7a43` | 主题按压 |
| `--nax-color-primary-secondary` | `#daefe4` | 主题 secondary 浅底 |
| `--nax-color-primary-tertiary` | `#e3f3eb` | 主题 tertiary 浅底 |
| `--nax-color-success-hover` / `deep` | `#36ad6a` / `#0c7a43` | 成功悬停/按压 |
| `--nax-color-success-secondary` / `tertiary` | `#daefe4` / `#e3f3eb` | 成功浅底 |
| `--nax-color-warning-hover` / `deep` | `#fcb040` / `#c97c10` | 警告悬停/按压 |
| `--nax-color-warning-secondary` / `tertiary` | `#fcefda` / `#fdf3e4` | 警告浅底 |
| `--nax-color-error-hover` / `deep` | `#de576d` / `#ab1f3f` | 错误悬停/按压 |
| `--nax-color-error-secondary` / `tertiary` | `#f7dde3` / `#f9e6ea` | 错误浅底 |
| `--nax-color-info-hover` / `deep` | `#4098fc` / `#1060c9` | 信息悬停/按压 |
| `--nax-color-info-secondary` / `tertiary` | `#dbeafc` / `#e4effd` | 信息浅底 |
| `--nax-color-divider` | `#efeff5` | 分割线 |
| `--nax-color-button-secondary` / `tertiary` | `#ececed` / `#f2f3f3` | 默认次要/次次要底 |

> 色板来源：[Naive UI common/light](https://github.com/tusen-ai/naive-ui/blob/main/src/_styles/common/light.ts)。默认 **primary 与 success 同为绿色 `#18a058`**（官方默认）。

> 暗黑主题：先预留 `--nax-*` 覆盖层，MVP 不做自动跟随系统；后续在 `theme-dark` class 或页面根变量中切换。

### 3.2 字号与字重

| Token | 默认值 | 场景 |
|-------|--------|------|
| `--nax-font-size-xs` | `12px` | 辅助说明、角标 |
| `--nax-font-size-sm` | `14px` | 次要文案 / 紧凑控件 |
| `--nax-font-size-md` | `16px` | **正文与控件默认**（含 nax-text size=md） |
| `--nax-font-size-lg` | `18px` | 标题 / 大控件 |
| `--nax-font-size-xl` | `20px` | 页头/强调 |
| `--nax-font-size-xxl` | `22px` | 大标题 |
| `--nax-font-weight-regular` | `400` | 正文 |
| `--nax-font-weight-medium` | `500` | 强调 |
| `--nax-font-weight-semibold` | `600` | 标题 |

### 3.3 间距

采用 **4px 基准**：

| Token | 值 | 用途 |
|-------|----|------|
| `--nax-space-0` | `0` | 复位 |
| `--nax-space-1` | `4px` | 极紧 |
| `--nax-space-2` | `8px` | 组件内小间距 |
| `--nax-space-3` | `12px` | 常用内边距 |
| `--nax-space-4` | `16px` | 页面边距/卡片 |
| `--nax-space-5` | `20px` | 区块 |
| `--nax-space-6` | `24px` | 大区块 |
| `--nax-space-8` | `32px` | 分区 |
| `--nax-space-10` | `40px` | 页面级留白 |

组件内优先使用 token，禁止魔法数散落；必要时用 `calc` 或局部组件 token。

### 3.4 圆角 / 边框 / 阴影

| Token | 默认值 | 用途 |
|-------|--------|------|
| `--nax-radius-sm` | `3px` | 标签、小控件（与 button 默认一致） |
| `--nax-radius-md` | `3px` | 输入框等通用控件默认圆角 |
| `--nax-button-radius` | `3px` | 按钮默认圆角（与 `--nax-radius-md` 同值） |
| `--nax-radius-lg` | `3px` | 卡片等（默认同 button；需要更大圆角可业务覆盖） |
| `--nax-radius-xl` | `3px` | 弹层/大卡片（默认同 button；可覆盖） |
| `--nax-radius-full` | `999px` | 胶囊/圆形 |
| `--nax-border-width` | `1px` | 默认描边 |
| `--nax-shadow-sm` | `0 1px 2px rgba(0,0,0,.06)` | 轻浮层 |
| `--nax-shadow-md` | `0 4px 12px rgba(0,0,0,.08)` | 卡片/弹层 |

> App 端阴影能力有限：核心层级优先用背景/边框表达，阴影作为增强。

### 3.5 尺寸档位（size）

全局统一三档：

| size | 高度参考 | 字号 | 左右内边距 |
|------|----------|------|------------|
| `sm` | `32px` | `14px` | `12px` |
| `md` | `40px` | `16px` | `16px` |
| `lg` | `48px` | `18px` | `20px` |

图标默认跟随 size：

| size | icon |
|------|------|
| `sm` | `16px` |
| `md` | `18px` |
| `lg` | `20px` |

### 3.6 动效

| Token | 默认值 | 用途 |
|-------|--------|------|
| `--nax-duration-fast` | `150ms` | 点击反馈 |
| `--nax-duration-normal` | `250ms` | 展开/切换 |
| `--nax-duration-slow` | `350ms` | 弹层 |
| `--nax-ease-out` | `ease-out` | 默认缓动 |

MVP 只做必要过渡；复杂动画后置。

---

## 4. 组件 API 设计原则

### 4.1 分层

```
行为 props     → disabled / loading / value / modelValue / open
语义枚举 props → type / size / variant / status
结构 props     → icon / label / closable（确有必要时）
外观           → class / externalClasses / CSS 变量
内容           → slot
交互           → emit
```

### 4.2 推荐枚举

| Prop | 允许值 | 默认 |
|------|--------|------|
| `type` | 组件自定；按钮为 `default` / `primary` / `info` / `success` / `warning` / `error`（兼容 `tertiary`→default+tertiary、`danger`→error） | `default` |
| `variant` | 按钮：`solid`(基础) / `secondary`(次要) / `tertiary`(次次要) / `quaternary`(次次次要) / `dashed`(虚线) / `outline`；兼容 `light`→secondary、`text`→quaternary | `solid` |
| `size` | `sm` / `md` / `lg` | `md` |
| `status` | `default` / `success` / `warning` / `error` | `default` |
| `shape` | `square` / `round` / `circle` | 组件自定默认 |

未列出的枚举需在组件文档中声明，并尽量复用上表语义。


### 4.2.1 按钮层级（对齐 Naive UI）

参考 [Naive UI Button](https://www.naiveui.com/zh-CN/light/components/button)：

| 中文 | `variant` | 说明 |
|------|-----------|------|
| 基础 | `solid` | 默认主操作层级。`type=default` 为白底+边框；彩色 `type` 为实心 |
| 次要 | `secondary` | 浅色填充、无边框（旧 `light` 映射至此） |
| 次次要 | `tertiary` | 更弱浅底 |
| 次次次要 | `quaternary` | 无底无边（旧 `text` 映射至此） |
| 虚线 | `dashed` | `border-style: dashed` |
| 描边 | `outline` | 透明底 + 色边（兼容保留） |
| 禁用 | `disabled` prop | `opacity: var(--nax-opacity-disabled, 0.5)`，不触发事件 |

色板默认值（Naive UI light，可被 `nax-ui-theme` 覆盖）：

| Token | 默认（Naive light） |
|-------|--------------------------|
| `--nax-color-primary` | `#18a058` |
| `--nax-color-success` | `#18a058` |
| `--nax-color-info` | `#2080f0` |
| `--nax-color-warning` | `#f0a020` |
| `--nax-color-error` | `#d03050` |
| `--nax-color-button-secondary` | `#fafafc` |
| `--nax-color-button-tertiary` | `#f3f3f5` |
| 彩色 secondary / tertiary | 实色浅底（primary `#daefe4` / `#e3f3eb`，对应 Naive 0.16/更淡叠白），避免鸿蒙 `rgba` 失效 |
### 4.3 表单组件约定

| 约定 | 说明 |
|------|------|
| 双向绑定 | 优先 `v-model` / `modelValue` + `update:modelValue` |
| 禁用 | 统一 `disabled` |
| 只读 | 统一 `readonly`（需要时） |
| 校验态 | `status` + 外部 Form 负责规则，组件只展示状态 |
| 错误文案 | 优先外部传入 `error-message` 或 FormItem 渲染 |

### 4.4 反馈组件约定

| 约定 | 说明 |
|------|------|
| 命令式 | Toast：`naxToast()` / `hideNaxToast()`（全局挂一次 `<nax-toast />`）。Dialog 快捷确认：`naxDialog()` / `naxDialogAlert()` / `naxDialogConfirm()` / `hideNaxDialog()`（全局挂一次 `<nax-dialog />`；未挂载回退 `uni.showModal`）。Loading 全局态后续同模式 |
| 声明式 | Dialog / Popup 用 `v-model:show`（自定义内容、插槽、复杂布局优先声明式；复杂弹层用 `nax-picker`） |
| 压窗屏 | 需盖住原生导航栏/tabBar 时用 `nax-popup` / `openNaxPopup`（App/Web = dialogPage；小程序不支持真压窗，见 `docs/popup-window.md`） |
| 蒙层 | 统一使用遮罩 token；点击蒙层是否关闭由 prop 控制 |
| 无障碍 | 关键操作保留文案，不只依赖颜色 |

### 4.5 externalClasses 约定

每个可定制组件至少考虑：

- `custom-class`：根节点
- 需要时：`custom-text-class` / `custom-icon-class`

不要为每个内部节点都开 externalClass；只暴露稳定扩展点。

---

## 5. 样式与布局规范（uni-app x 约束）

### 5.1 必须遵守

1. **只写 class 选择器**，不用 tag / id / 属性选择器作为核心样式。
2. **默认纵向 flex**：横向布局显式 `flex-direction: row`。
3. **文字样式写在 `<text>` 上**，不要假设继承。
4. **组件默认样式隔离**（策略 2.0 / isolated）。
5. **蒸汽模式只用组合式 API**（`<script setup lang="uts">`）。
6. **跨端样式按 App ucss 子集写**；Web 专属能力仅可作 progressive enhancement。
7. **主题通过 CSS 变量覆盖**，业务改色不改组件源码。

### 5.2 推荐写法

```uvue
<template>
  <view class="nax-button nax-button--primary" :class="rootClass" @click="onClick">
    <text class="nax-button__text">{{ label }}</text>
  </view>
</template>
```

```css
.nax-button {
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: var(--nax-button-height, 40px);
  padding-left: var(--nax-space-4);
  padding-right: var(--nax-space-4);
  border-radius: var(--nax-radius-md);
  background-color: var(--nax-color-primary);
}

.nax-button__text {
  color: var(--nax-color-text-inverse);
  font-size: var(--nax-font-size-md);
}
```

### 5.3 禁止写法

- 用 `button` 原生标签强依赖各端默认皮肤且不封装
- 深层关系选择器作为主题唯一手段
- 内联大量动态 style 拼颜色
- 在插件包内放 `pages.json` / `App.uvue` / `main.uts` / `manifest.json` / `uni.scss`

---

## 6. 主题机制

权威实现：`uni_modules/nax-ui-theme`（token 约定包，不是 UI 组件）。  
接入说明：`docs/theme.md`。

### 6.1 默认主题注入

- 业务工程在 `App.uvue` 引入：
  - `@/uni_modules/nax-ui-theme/theme/default.css`
  - 可选：`theme/dark.css`
- 组件内部只读取 `--nax-*`，并提供 fallback，不写死品牌逻辑。
- 独立 `nax-*` 插件 **弱依赖** theme：可不装，装了则统一默认值。

### 6.2 业务覆盖优先级

```
局部节点 / 页面变量
  > App.uvue 中的 page 覆盖
  > nax-ui-theme 默认 token
  > 组件默认 token fallback
```

### 6.3 与 `uni.scss` 关系

- 演示工程可继续使用 `uni.scss` 做编译期变量。
- 组件库对外主题能力以 **CSS 变量 + nax-ui-theme** 为准，避免用户必须改 scss。

---

## 7. 无障碍与文案

| 项 | 约定 |
|----|------|
| 颜色 | 不单独用颜色表达状态，搭配图标/文案 |
| 触控 | 可点区域高度尽量 ≥ 36px（lg 建议 44px） |
| 加载 | `loading` 时保留按钮占位，避免布局跳动 |
| 空态 | Empty 必须可配置描述文案与操作 |
| 中文优先 | 默认文案中文；后续 i18n 通过 props / 配置表扩展 |

---

## 8. 文档与示例规范

每个组件至少包含：

1. 用途一句话
2. 平台兼容表（App-Android / App-iOS / App-Harmony / Web / 微信小程序）
3. 基础用法
4. Props / Events / Slots / externalClasses
5. Token / 可覆盖 class
6. 注意事项（蒸汽模式、样式隔离、条件编译）

演示工程：

- `pages/components/<name>/index` 一组件一页
- 首页入口按「基础 / 表单 / 反馈 / 导航 / 展示 / 业务」分组

---

## 9. 质量门槛

组件合入前自检：

- [ ] easycom 路径正确，可直接 `<nax-xxx />` 使用
- [ ] 仅组合式 API
- [ ] 默认 size/type 行为明确
- [ ] disabled / loading 状态完整（如适用）
- [ ] 文本节点使用 `<text>`
- [ ] 样式仅 class + token
- [ ] 无 Web-only 核心依赖
- [ ] demo 页可演示主要 props
- [ ] 变更写入对应组件文档 / changelog

---

## 10. 版本与演进

| 阶段 | 目标 |
|------|------|
| v0.1 | Token + 基础组件 MVP |
| v0.2 | 表单 + 反馈闭环 |
| v0.3 | 导航/数据展示 + 主题切换 |
| v1.0 | 文档完整、插件市场可发布、平台兼容表稳定 |

变更 token 默认值属于 **潜在破坏性变更**，需在 changelog 标注。



