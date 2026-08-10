---
demo: number-box
---

# nax-number-box

> 当前版本：0.1.3（见 `changelog.md`）

uni-app x 步进器（加减数量）。

## 安装

```text
uni_modules/nax-number-box
```

easycom 自动生效，页面直接使用 `<nax-number-box />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 基础用法

```uvue
<nax-number-box v-model="value" @change="onChange"></nax-number-box>
```

### Slot

| 名称 | 说明 |
|------|------|
| minus | 自定义减号内容 |
| plus | 自定义加号内容 |

### 主题 Token

- `--nax-color-bg-secondary` 默认按钮/输入背景
- `--nax-color-bg-hover` 按钮按压底
- `--nax-color-text` 默认文字/图标色
- `--nax-color-text-disabled` 禁用文字色
- `--nax-color-border` 分隔线
- `--nax-opacity-disabled` 禁用透明度
- `--nax-radius-md` 圆角
- `--nax-font-size-*` 字号

### 设计说明

- 命名：`v-model` / `modelValue`（不用 `value`）
- 增加 `size: sm | md | lg`；`inputWidth` / `buttonSize` 单位为 **px**
- 不提供 `customStyle` / `iconStyle` 对象样式，扩展用 `customClass` + CSS 变量
- 默认 `min=0`、`modelValue=0`（更通用；购物场景可自行设 `min=1`）
- 图标使用 `nax-icon` 的 `minus` / `plus`


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | number | `0` | 当前值（v-model） |
| min | number | `0` | 最小值 |
| max | number | `999999` | 最大值 |
| step | number | `1` | 步长 |
| integer | boolean | `false` | 是否仅允许整数 |
| disabled | boolean | `false` | 整体禁用 |
| disabledInput | boolean | `false` | 仅禁用中间输入 |
| disablePlus | boolean | `false` | 禁用加号 |
| disableMinus | boolean | `false` | 禁用减号 |
| asyncChange | boolean | `false` | 异步变更：点击后不立刻改内部值，等外部 v-model 回写 |
| longPress | boolean | `true` | 长按连续加减 |
| size | string | `'md'` | sm \| md \| lg |
| inputWidth | number | `0` | 输入框宽度（px）；0 跟随 size |
| buttonSize | number | `0` | 按钮边长（px）；0 跟随 size |
| showMinus | boolean | `true` | 显示减号 |
| showPlus | boolean | `true` | 显示加号 |
| bgColor | string | `''` | 按钮/输入背景；空则主题次级背景 |
| color | string | `''` | 文字/图标色；空则主题正文色 |
| cursorSpacing | number | `100` | 键盘与光标间距 |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| update:modelValue | v-model |
| change | 值变化（number） |
| focus | 输入框聚焦 |
| blur | 输入框失焦（number） |
| overlimit | 触达边界（'minus' \| 'plus'） |
| minus | 点击减号 |
| plus | 点击加号 |


## Slots

| 插槽 | 说明 |
|------|------|
| minus | 自定义减号 |
| plus | 自定义加号 |
