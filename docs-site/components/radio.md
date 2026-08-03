---
demo: radio
---

# nax-radio / nax-radio-group

uni-app x 单选框 / 单选框组，功能覆盖常用场景。

## 安装

```text
uni_modules/nax-radio
```

easycom 自动生效，页面直接使用 `<nax-radio />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

> 当前版本：0.1.2（见 `changelog.md`）

## 代码示例

### 基础用法

### 单独使用

```uvue
<nax-radio v-model="checked" label="默认选项" @change="onChange"></nax-radio>
```

### 单选框组

```uvue
<nax-radio-group v-model="value" @change="onGroupChange">
  <nax-radio name="apple" label="苹果"></nax-radio>
  <nax-radio name="banana" label="香蕉"></nax-radio>
  <nax-radio name="orange" label="橙子"></nax-radio>
</nax-radio-group>
```

> 组内用 `name` / `value` 作为选项标识（`value` 优先），不要再给子项绑 `v-model`。组的 `v-model` 为 **字符串**（当前选中项），不是数组。

### nax-radio Props

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| modelValue | boolean | `false` | 单独使用时的选中态（`v-model`） |
| name | string | `''` | 组内选项标识 |
| value | string | `''` | 组内选项标识，优先级高于 `name` |
| label | string | `''` | 右侧文案 |
| shape | string | `circle` | `circle` / `square`；组内可被 group 覆盖 |
| size | string | `md` | `sm` / `md` / `lg` |
| disabled | boolean | `false` | 禁用 |
| labelDisabled | boolean | `false` | 为 `true` 时点击文案不切换 |
| activeColor | string | `''` | 选中色；空则 `--nax-color-primary` |
| iconSize | string | `''` | 勾选图标字号（数字字符串 px） |
| labelSize | string | `''` | 文案字号（数字字符串 px） |
| customClass | string | `''` | 根节点扩展 class |

### nax-radio Events

| 事件 | 说明 |
|------|------|
| update:modelValue | 单独使用时的 v-model |
| change | 选中态变化；组内为选项 name（string），单独为 boolean |

### nax-radio-group Props

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| modelValue | string | `''` | 当前选中标识（`v-model`） |
| disabled | boolean | `false` | 整组禁用 |
| shape | string | `circle` | 统一子项形状 |
| size | string | `md` | 统一子项尺寸 |
| activeColor | string | `''` | 统一选中色 |
| iconSize | string | `''` | 统一图标字号 |
| labelSize | string | `''` | 统一文案字号 |
| labelDisabled | boolean | `false` | 统一：文案是否不可点选 |
| wrap | boolean | `false` | 每个选项独占一行 |
| width | string | `''` | 子项宽度（如 `50%` / `120px`） |
| customClass | string | `''` | 根节点扩展 class |

### nax-radio-group Events

| 事件 | 说明 |
|------|------|
| update:modelValue | v-model |
| change | 选中值变化（string） |

### 主题 Token

- `--nax-color-primary` 默认选中色
- `--nax-color-border-strong` 未选中边框
- `--nax-color-bg` 未选中底
- `--nax-color-text` / `--nax-color-text-disabled` 文案
- `--nax-color-text-inverse` 勾选图标色
- `--nax-opacity-disabled` 禁用透明度
- `--nax-radius-sm` / `--nax-radius-full` 方/圆角

### 设计说明

- 尺寸统一为 `sm | md | lg`（不用 rpx 数字作默认 API）
- 默认 `shape` 为 `circle`（与 checkbox 默认 square 区分）
- 支持单独布尔 `v-model`（传统实现依赖 group）
- 不提供 `customStyle` 泛样式入口，扩展用 `customClass` + CSS 变量
- Android 端通过 `APP-ANDROID` 让 group 上下文使用明确的 `Ref` 与函数注入类型，避免 `null` 默认值被 UTS 推断为 `Void`。


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | boolean | `false` | 单独使用时的选中态（v-model） |
| name | string | `''` | 选项标识（组内）；value 优先 |
| value | string | `''` | 选项标识，优先级高于 name |
| label | string | `''` | 右侧文案 |
| shape | string | `'circle'` | circle \| square（默认 circle） |
| disabled | boolean | `false` | 禁用 |
| labelDisabled | boolean | `false` | 为 true 时点击文案不切换 |
| activeColor | string | `''` | 选中色 |
| iconSize | string | `''` | 勾选图标字号（数字字符串 px） |
| labelSize | string | `''` | 文案字号（数字字符串 px） |
| size | string | `'md'` | sm \| md \| lg |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| update:modelValue | 单独使用时的 v-model |
| change | 选中态变化；组内为选项 name，单独为 boolean |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义标签内容 |
