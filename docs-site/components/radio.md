---
demo: radio
---

# nax-radio / nax-radio-group

> 当前版本：0.1.7

uni-app x 单选框 / 单选框组，功能覆盖常用场景。

## 安装

- 插件市场：[nax-radio](https://ext.dcloud.net.cn/plugin?id=29056)

easycom 自动生效，页面直接使用 `<nax-radio />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 基础用法

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

:::

::: details 单独使用

```uvue
<nax-radio v-model="alone" label="默认选项" @change="onAloneChange"></nax-radio>
```

```uts
const alone = ref(true)

function onAloneChange(v : boolean) {
	// v 为选中状态
}
```

:::

::: details 基础组

```uvue
<nax-radio-group v-model="basic" @change="onGroupChange">
	<nax-radio name="apple" label="苹果"></nax-radio>
	<nax-radio name="banana" label="香蕉"></nax-radio>
	<nax-radio name="orange" label="橙子"></nax-radio>
</nax-radio-group>
```

```uts
const basic = ref('apple')

function onGroupChange(v : string) {
	// v 为当前选中 name
}
```

:::

::: details 形状 shape

```uvue
<nax-radio-group v-model="shapeCircle" shape="circle">
	<nax-radio name="c1" label="圆形（默认）"></nax-radio>
	<nax-radio name="c2" label="另一项"></nax-radio>
</nax-radio-group>

<nax-radio-group v-model="shapeSquare" shape="square">
	<nax-radio name="s1" label="方形"></nax-radio>
	<nax-radio name="s2" label="另一项"></nax-radio>
</nax-radio-group>
```

```uts
const shapeCircle = ref('c1')
const shapeSquare = ref('s1')
```

:::

::: details 尺寸 size

```uvue
<nax-radio-group v-model="sizeSm" size="sm">
	<nax-radio name="s" label="sm"></nax-radio>
</nax-radio-group>

<nax-radio-group v-model="sizeMd" size="md">
	<nax-radio name="m" label="md"></nax-radio>
</nax-radio-group>

<nax-radio-group v-model="sizeLg" size="lg">
	<nax-radio name="l" label="lg"></nax-radio>
</nax-radio-group>
```

```uts
const sizeSm = ref('s')
const sizeMd = ref('m')
const sizeLg = ref('l')
```

:::

::: details 禁用 disabled

```uvue
<nax-radio-group v-model="disabledVals">
	<nax-radio name="on" label="可选"></nax-radio>
	<nax-radio name="off" label="禁用项" disabled></nax-radio>
</nax-radio-group>

<nax-radio-group v-model="disabledGroup" disabled>
	<nax-radio name="g1" label="整组禁用"></nax-radio>
	<nax-radio name="g2" label="不可点"></nax-radio>
</nax-radio-group>
```

```uts
const disabledVals = ref('on')
const disabledGroup = ref('g1')
```

:::

::: details 文案不可点 labelDisabled

```uvue
<nax-radio-group v-model="labelLock" label-disabled>
	<nax-radio name="x" label="只能点左侧圆框"></nax-radio>
	<nax-radio name="y" label="点文字无效"></nax-radio>
</nax-radio-group>
```

```uts
const labelLock = ref('x')
```

:::

::: details 纵向排列 wrap

```uvue
<nax-radio-group v-model="wrapVal" wrap>
	<nax-radio name="1" label="选项一"></nax-radio>
	<nax-radio name="2" label="选项二"></nax-radio>
	<nax-radio name="3" label="选项三"></nax-radio>
</nax-radio-group>
```

```uts
const wrapVal = ref('1')
```

:::

::: details 自定义颜色 activeColor

```uvue
<nax-radio-group v-model="colorVal" active-color="#2080f0">
	<nax-radio name="c1" label="信息色"></nax-radio>
	<nax-radio name="c2" label="另一项"></nax-radio>
</nax-radio-group>
```

```uts
const colorVal = ref('c1')
```

:::

::: details 横向均分 width

```uvue
<nax-radio-group v-model="widthVal" width="50%">
	<nax-radio name="w1" label="左侧 50%"></nax-radio>
	<nax-radio name="w2" label="右侧 50%"></nax-radio>
	<nax-radio name="w3" label="再一行左"></nax-radio>
	<nax-radio name="w4" label="再一行右"></nax-radio>
</nax-radio-group>
```

```uts
const widthVal = ref('w1')
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 背景色 |
| `--nax-color-border-strong` | 强调边框色 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-text-disabled` | 禁用文字色 |
| `--nax-color-text-inverse` | 反白文字色 |
| `--nax-opacity-disabled` | 禁用透明度 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | boolean | `false` | 单独使用时的选中态（v-model） |
| name | string | `''` | 选项标识（组内）；value 优先 |
| value | string | `''` | 选项标识，优先级高于 name |
| label | string | `''` | 右侧文案 |
| shape | string | `'circle'` | `circle` 圆形 \| `square` 方形（默认 `circle`） |
| disabled | boolean | `false` | 禁用 |
| labelDisabled | boolean | `false` | 为 true 时点击文案不切换 |
| activeColor | string | `''` | 选中色 |
| iconSize | string | `''` | 勾选图标字号（数字字符串 px） |
| labelSize | string | `''` | 文案字号（数字字符串 px） |
| size | string | `'md'` | `sm` 小 \| `md` 中 \| `lg` 大 |
| customClass | string | `''` | 根节点扩展 class |

## nax-radio-group Props

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


## Events

| 事件 | 说明 |
|------|------|
| update:modelValue | 单独使用时的 v-model |
| change | 选中态变化；组内为选项 name，单独为 boolean |

## nax-radio-group Events

| 事件 | 说明 |
|------|------|
| update:modelValue | v-model |
| change | 选中值变化（string） |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义标签内容 |
