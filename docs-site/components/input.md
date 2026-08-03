---
demo: input
---

# nax-input

uni-app x 单行输入框。
> **不包含** `type=select`（后续 `nax-select`）与 `type=textarea`（后续 `nax-textarea`）。

## 安装

```text
uni_modules/nax-input
```

easycom 自动生效，页面直接使用 `<nax-input />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

> 当前版本：0.1.11（见 `changelog.md`）

## 代码示例

### 基础用法

```uvue
<nax-input v-model="value" border placeholder="请输入内容"></nax-input>

<!-- 仅下边框 -->
<nax-input v-model="value" border border-type="bottom" placeholder="下划线风格"></nax-input>
```

### 类型 type

| 值 | 说明 |
|----|------|
| `text` | 文本（默认） |
| `password` | 密码（可配 `password-icon` 切换可见） |
| `number` | 数字键盘 |
| `digit` | 带小数点数字键盘 |
| `tel` | 电话键盘 |
| `email` / `url` / `nickname` / `safe-password` / `none` | 透传原生 input type |

传入 `select` / `textarea` / `idcard` 会回落为 `text`。

### 常用 Props

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| modelValue | string | `''` | `v-model` 值 |
| type | string | `text` | 见上表 |
| clearable | boolean | `true` | 有内容时显示清除 |
| input-align | string | `left` | `left` / `center` / `right` |
| placeholder | string | `请输入内容` | 占位 |
| disabled | boolean | `false` | 禁用 |
| readonly | boolean | `false` | 只读 |
| maxlength | number | `140` | 最大长度；`-1` 不限制 |
| border | boolean | `false` | 是否边框 |
| border-type | string | `surround` | `surround` 四边 / `bottom` 仅下边框 |
| border-color | string | `''` | 边框色 |
| background | string | `''` | 背景色；无边框默认透明，传入后生效 |
| password-icon | boolean | `true` | 密码可见切换 |
| size | string | `md` | `sm` / `md` / `lg` |
| height | string | `''` | 覆盖高度（数字按 px） |
| trim | boolean | `true` | 失焦去首尾空格 |
| confirm-type | string | `done` | 键盘完成按钮文案 |
| focus | boolean | `false` | 自动聚焦 |
| prefix-icon / suffix-icon | string | `''` | 前后缀图标名 |
| custom-class | string | `''` | 根节点扩展 class |

更多键盘相关：`cursor-spacing`、`selection-start`、`selection-end`、`confirm-hold`、`adjust-position`、`hold-keyboard`、`placeholder-style`。

### 事件

| 事件 | 说明 |
|------|------|
| update:modelValue | v-model |
| input / change | 内容变化（当前值） |
| focus / blur | 聚焦 / 失焦（当前值） |
| confirm | 键盘完成（当前值） |
| click | 点击 |
| clear | 点击清除 |

### 主题 Token（可选覆盖）

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 背景 |
| `--nax-color-border` | 边框 |
| `--nax-color-primary` | 聚焦边框 |
| `--nax-color-text` | 文字 |
| `--nax-radius-md` | 圆角 |
| `--nax-space-*` | 内边距 / 图标间距 |

### 平台说明

- 基于原生 `input`，键盘类型随端能力差异以官方文档为准。
- `readonly` 通过禁用原生编辑实现（样式弱于 `disabled`）。
- App 端去掉 Web 专用 `outline` / `box-sizing`（条件编译）。
- Android 暗黑模式下跨组件 CSS 变量可能失效，请通过 `custom-class` 传入 `nax-theme-dark`；组件会在 `APP-ANDROID` 下使用背景、边框、文字、占位符和图标实色兜底。


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | string | `''` | v-model 绑定值 |
| type | string | `'text'` | text \| number \| digit \| tel \| password \| email \| url \| nickname \| safe-password \| none（不支持 select / textarea / idcard） |
| clearable | boolean | `true` | 是否显示清除按钮，默认 true |
| inputAlign | string | `'left'` | left \| center \| right |
| placeholder | string | `'请输入内容'` | 占位文案 |
| disabled | boolean | `false` | 禁用 |
| readonly | boolean | `false` | 只读（不可编辑，样式弱于 disabled） |
| maxlength | number | `140` | 最大长度；-1 不限制（默认 140，对齐 ） |
| placeholderStyle | string | `'color: #e5e5ea;'` | placeholder 样式字符串 |
| confirmType | string | `'done'` | 键盘右下角按钮：done \| send \| search \| next \| go |
| focus | boolean | `false` | 是否自动聚焦 |
| passwordIcon | boolean | `true` | type=password 时是否显示可见性切换，默认 true |
| border | boolean | `false` | 是否显示边框，默认 false |
| /** surround=四边；bottom=仅下边框（下划线风格） */
		borderType | string | `'surround'` |  |
| borderColor | string | `''` | 边框色 |
| /** 背景色；无边框默认透明，传入后覆盖 */
		background | string | `''` |  |
| height | string | `''` | 高度，数字字符串按 px；空则跟随 size |
| cursorSpacing | number | `0` | 光标与键盘距离 px |
| selectionStart | number | `-1` | 聚焦时选区起点 |
| selectionEnd | number | `-1` | 聚焦时选区终点 |
| trim | boolean | `true` | 失焦时去掉两端空格，默认 true |
| confirmHold | boolean | `false` | 点完成是否保持键盘 |
| adjustPosition | boolean | `true` | 键盘弹起是否上推页面 |
| holdKeyboard | boolean | `false` | 聚焦时点页面不收起键盘 |
| size | string | `'md'` | sm \| md \| lg |
| prefixIcon | string | `''` | 前缀 nax-icon 名 |
| suffixIcon | string | `''` | 后缀 nax-icon 名 |
| customClass | string | `''` | 根节点扩展 class |
| borderType | string | — | 边框形态：surround 四边（默认）\| bottom 仅下边框 |
| background | string | — | 背景色；无边框默认透明，有值时覆盖 |


## Events

| 事件 | 说明 |
|------|------|
| update:modelValue | v-model |
| input | 输入变化（当前值） |
| change | 输入变化（与 input 同步，便于表单） |
| focus | 聚焦（当前值） |
| blur | 失焦（当前值） |
| confirm | 键盘完成（当前值） |
| click | 点击输入区域 |
| clear | 点击清除 |


## Slots

| 插槽 | 说明 |
|------|------|
| prefix | 自定义前缀 |
| suffix | 自定义后缀 |
