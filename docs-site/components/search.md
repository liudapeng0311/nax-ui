---
demo: search
---

# nax-search

> 当前版本：0.1.4（见 `changelog.md`）

uni-app x 搜索框，功能覆盖常用搜索场景。

## 安装

```text
uni_modules/nax-search
```

easycom 自动生效，页面直接使用 `<nax-search />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 基础用法

```uvue
<nax-search v-model="keyword" @search="onSearch" @custom="onCustom"></nax-search>
```

### 形状 shape

| 值 | 说明 |
|----|------|
| `round` | 胶囊圆角（默认） |
| `square` | 方角（`radius-md`） |

### 常用 Props

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| modelValue | string | `''` | `v-model` 值 |
| shape | string | `round` | `round` / `square` |
| background | string | `''` | 输入区背景；空则 `--nax-color-bg-hover` |
| bg-color | string | `''` | 兼容别名；与 `background` 二选一，`background` 优先 |
| placeholder | string | `请输入关键字` | 占位 |
| clearable | boolean | `true` | 有内容时显示清除（兼容 `clearabled`） |
| show-action | boolean | `true` | 显示右侧操作按钮 |
| action-text | string | `搜索` | 右侧按钮文案 |
| action-color | string | `''` | 右侧按钮文字色 |
| animation | boolean | `false` | 为 true 时右侧按钮仅聚焦显示 |
| input-align | string | `left` | `left` / `center` / `right` |
| disabled | boolean | `false` | 禁用；禁用时点击根节点触发 `click` |
| border-color | string | `''` | 有值时显示边框 |
| search-icon | string | `search` | 左侧图标名；空字符串隐藏 |
| search-icon-color | string | `''` | 图标色 |
| search-icon-size | string | `''` | 图标尺寸，数字按 px |
| color | string | `''` | 输入文字色 |
| placeholder-color | string | `''` | 占位色 |
| maxlength | number | `-1` | 最大长度；`-1` 不限制 |
| height | string | `''` | 覆盖高度（数字按 px） |
| label | string | `''` | 左侧文案 |
| size | string | `md` | `sm` / `md` / `lg` |
| focus | boolean | `false` | 自动聚焦 |
| adjust-position | boolean | `true` | 键盘上推页面 |
| custom-class | string | `''` | 根节点扩展 class |

### 事件

| 事件 | 说明 |
|------|------|
| update:modelValue | v-model |
| input / change | 内容变化（当前值） |
| search | 键盘搜索/完成（当前值） |
| custom | 点击右侧操作（当前值） |
| focus / blur | 聚焦 / 失焦（当前值） |
| clear | 点击清除 |
| click | 仅 `disabled` 时点击根节点 |
| clickIcon | 点击搜索图标 |

### 主题 Token（可选覆盖）

| Token | 用途 |
|-------|------|
| `--nax-search-bg` | 输入区背景 |
| `--nax-search-clear-bg` | 清除按钮圆底 |
| `--nax-color-bg-hover` | 默认背景回退 |
| `--nax-color-text` | 文字 / 操作按钮 |
| `--nax-radius-md` | square 圆角 |
| `--nax-space-*` | 内边距 / 间距 |

### 平台说明

- 基于原生 `input` + `confirm-type=search`。
- 清除按钮：有内容即显示（不依赖 focus），兼容鸿蒙 focus 不稳定与 Web blur 抢点击。
- App 端去掉 Web 专用 `outline` / `appearance`（条件编译）。
- 鸿蒙端对 input 高度/行高做了加高与内联居中（`#ifdef APP-HARMONY`）。


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | string | `''` | v-model 绑定值 |
| shape | string | `'round'` | round 圆形 \| square 方形（默认 round） |
| background | string | `''` | 输入区背景色；空则用 token |
| // 兼容  bgColor 命名
		bgColor | string | `''` |  |
| placeholder | string | `'请输入关键字'` | 占位文案 |
| clearable | boolean | `true` | 是否显示清除按钮，默认 true（对齐  clearabled） |
| // 兼容  拼写 clearabled
		clearabled | boolean | `true` |  |
| focus | boolean | `false` | 是否自动聚焦 |
| showAction | boolean | `true` | 是否显示右侧操作按钮，默认 true |
| actionText | string | `'搜索'` | 右侧按钮文案，默认「搜索」 |
| actionColor | string | `''` | 右侧按钮文字色 |
| inputAlign | string | `'left'` | left \| center \| right |
| disabled | boolean | `false` | 禁用（禁用时点击根节点触发 click，便于跳转搜索页） |
| borderColor | string | `''` | 边框色；有值才显示边框 |
| searchIcon | string | `'search'` | 左侧搜索图标名，默认 search；空字符串隐藏 |
| searchIconColor | string | `''` | 搜索图标色 |
| searchIconSize | string | `''` | 搜索图标尺寸（数字字符串按 px） |
| color | string | `''` | 输入文字颜色 |
| placeholderColor | string | `''` | placeholder 颜色 |
| placeholderStyle | string | `''` | placeholder 完整样式字符串（优先于 placeholderColor） |
| maxlength | number | `-1` | 最大长度；-1 不限制 |
| height | string | `''` | 输入区高度；数字字符串按 px；空则跟随 size |
| label | string | `''` | 搜索框左侧文案 |
| animation | boolean | `false` | 为 true 时，右侧按钮仅在聚焦时显示 |
| adjustPosition | boolean | `true` | 键盘弹起是否上推页面 |
| size | string | `'md'` | sm \| md \| lg |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| update:modelValue | v-model |
| input | 输入变化 |
| change | 输入变化（与 input 同步） |
| search | 键盘搜索/完成（当前值） |
| custom | 点击右侧操作按钮（当前值） |
| focus | 聚焦（当前值） |
| blur | 失焦（当前值） |
| clear | 点击清除 |
| click | 禁用态点击根节点 |
| clickIcon | 点击搜索图标 |


## Slots

| 插槽 | 说明 |
|------|------|
| label | 自定义左侧 label |
| action | 自定义右侧操作区 |
