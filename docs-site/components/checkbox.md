---
demo: checkbox
---

# nax-checkbox / nax-checkbox-group

> 当前版本：0.1.5

uni-app x 复选框 / 复选框组。

## 安装

- 插件市场：[nax-checkbox](https://ext.dcloud.net.cn/plugin?id=29029)

easycom 自动生效，页面直接使用 `<nax-checkbox />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 基础用法

### 单独使用

```uvue
<nax-checkbox v-model="checked" label="同意协议" @change="onChange"></nax-checkbox>
```

### 复选框组

```uvue
<nax-checkbox-group v-model="values" @change="onGroupChange">
  <nax-checkbox name="apple" label="苹果"></nax-checkbox>
  <nax-checkbox name="banana" label="香蕉"></nax-checkbox>
  <nax-checkbox name="orange" label="橙子"></nax-checkbox>
</nax-checkbox-group>
```

> 组内用 `name` / `value` 作为选项标识（`value` 优先），不要再给子项绑 `v-model`。

:::

::: details 单独使用

```uvue
<nax-checkbox v-model="alone" label="同意用户协议" @change="onAloneChange"></nax-checkbox>
```

```uts
const alone = ref(true)

function onAloneChange(v : boolean) {
	// change：true / false
}
```

:::

::: details 基础组

```uvue
<nax-checkbox-group v-model="basic" @change="onGroupChange">
	<nax-checkbox name="apple" label="苹果"></nax-checkbox>
	<nax-checkbox name="banana" label="香蕉"></nax-checkbox>
	<nax-checkbox name="orange" label="橙子"></nax-checkbox>
</nax-checkbox-group>
```

```uts
const basic = ref(['apple'] as string[])

function onGroupChange(v : string[]) {
	// v：当前选中值数组
}
```

:::

::: details 形状 shape

```uvue
<nax-checkbox-group v-model="shapeVals" shape="circle">
	<nax-checkbox name="a" label="圆形"></nax-checkbox>
	<nax-checkbox name="b" label="多选"></nax-checkbox>
</nax-checkbox-group>
```

```uts
const shapeVals = ref(['a'] as string[])
```

:::

::: details 尺寸 size

```uvue
<nax-checkbox-group v-model="sizeSm" size="sm">
	<nax-checkbox name="s" label="sm"></nax-checkbox>
</nax-checkbox-group>

<nax-checkbox-group v-model="sizeMd" size="md">
	<nax-checkbox name="m" label="md"></nax-checkbox>
</nax-checkbox-group>

<nax-checkbox-group v-model="sizeLg" size="lg">
	<nax-checkbox name="l" label="lg"></nax-checkbox>
</nax-checkbox-group>
```

```uts
const sizeSm = ref(['s'] as string[])
const sizeMd = ref(['m'] as string[])
const sizeLg = ref(['l'] as string[])
```

:::

::: details 禁用 disabled

```uvue
<nax-checkbox-group v-model="disabledVals">
	<nax-checkbox name="on" label="可选"></nax-checkbox>
	<nax-checkbox name="off" label="禁用项" disabled></nax-checkbox>
</nax-checkbox-group>

<nax-checkbox-group v-model="disabledGroup" disabled>
	<nax-checkbox name="g1" label="整组禁用"></nax-checkbox>
	<nax-checkbox name="g2" label="不可点"></nax-checkbox>
</nax-checkbox-group>
```

```uts
const disabledVals = ref(['on'] as string[])
const disabledGroup = ref(['g1'] as string[])
```

:::

::: details 文案不可点 labelDisabled

```uvue
<nax-checkbox-group v-model="labelLock" label-disabled>
	<nax-checkbox name="x" label="只能点左侧方框"></nax-checkbox>
	<nax-checkbox name="y" label="点文字无效"></nax-checkbox>
</nax-checkbox-group>
```

```uts
const labelLock = ref([] as string[])
```

:::

::: details 最多选 2 项 max

```uvue
<nax-checkbox-group v-model="maxVals" :max="2" wrap>
	<nax-checkbox name="1" label="选项一"></nax-checkbox>
	<nax-checkbox name="2" label="选项二"></nax-checkbox>
	<nax-checkbox name="3" label="选项三"></nax-checkbox>
	<nax-checkbox name="4" label="选项四"></nax-checkbox>
</nax-checkbox-group>
```

```uts
const maxVals = ref(['1'] as string[])
```

:::

::: details 自定义颜色 activeColor

```uvue
<nax-checkbox-group v-model="colorVals" active-color="#2080f0">
	<nax-checkbox name="c1" label="信息色"></nax-checkbox>
	<nax-checkbox name="c2" label="多选"></nax-checkbox>
</nax-checkbox-group>
```

```uts
const colorVals = ref(['c1'] as string[])
```

:::

::: details 横向均分 width

```uvue
<nax-checkbox-group v-model="widthVals" width="50%">
	<nax-checkbox name="w1" label="左侧 50%"></nax-checkbox>
	<nax-checkbox name="w2" label="右侧 50%"></nax-checkbox>
	<nax-checkbox name="w3" label="再一行左"></nax-checkbox>
	<nax-checkbox name="w4" label="再一行右"></nax-checkbox>
</nax-checkbox-group>
```

```uts
const widthVals = ref(['w1', 'w2'] as string[])
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
| shape | string | `'square'` | `square` 方形 \| `circle` 圆形 |
| disabled | boolean | `false` | 禁用 |
| labelDisabled | boolean | `false` | 为 true 时点击文案不切换 |
| activeColor | string | `''` | 选中色 |
| iconSize | string | `''` | 勾选图标字号（数字字符串 px） |
| labelSize | string | `''` | 文案字号（数字字符串 px） |
| size | string | `'md'` | `sm` 小 \| `md` 中 \| `lg` 大 |
| customClass | string | `''` | 根节点扩展 class |

## nax-checkbox-group Props

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| modelValue | string[] | `[]` | 选中标识数组（`v-model`） |
| disabled | boolean | `false` | 整组禁用 |
| shape | string | `square` | 统一子项形状 |
| size | string | `md` | 统一子项尺寸 |
| activeColor | string | `''` | 统一选中色 |
| iconSize | string | `''` | 统一图标字号 |
| labelSize | string | `''` | 统一文案字号 |
| labelDisabled | boolean | `false` | 统一：文案是否不可点选 |
| max | number | `0` | 最多可选数量；`0` 不限制 |
| wrap | boolean | `false` | 每个选项独占一行 |
| width | string | `''` | 子项宽度（如 `50%` / `120px`） |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| update:modelValue | 单独使用时的 v-model |
| change | 选中态变化（boolean） |

## nax-checkbox-group Events

| 事件 | 说明 |
|------|------|
| update:modelValue | v-model |
| change | 选中数组变化 |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义标签内容 |
