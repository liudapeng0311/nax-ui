---
demo: search
---

# nax-search

> 当前版本：0.2.0

uni-app x 搜索框，功能覆盖常用搜索场景。

## 安装

- 插件市场：[nax-search](https://ext.dcloud.net.cn/plugin?id=29059)

easycom 自动生效，页面直接使用 `<nax-search />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 基础用法

```uvue
<nax-search v-model="keyword" @search="onSearch" @custom="onCustom"></nax-search>
```

:::

::: details 基础

```uvue
<nax-search
	v-model="basic"
	@search="onSearch"
	@custom="onCustom"
	@change="onChange"
></nax-search>
```

```uts
const basic = ref('')

// 点击键盘搜索按钮
function onSearch(val: string) {
	// 处理搜索
}

// 点击右侧搜索按钮
function onCustom(val: string) {
	// 处理自定义操作
}

// 输入内容变化
function onChange() {
	// 处理变化
}
```

:::

::: details 形状 shape

```uvue
<nax-search v-model="shapeRound" shape="round" placeholder="round 胶囊"></nax-search>
<nax-search v-model="shapeSquare" shape="square" placeholder="square 方角"></nax-search>
```

```uts
const shapeRound = ref('')
const shapeSquare = ref('')
```

:::

::: details 尺寸 size

```uvue
<nax-search v-model="sizeSm" size="sm" placeholder="sm"></nax-search>
<nax-search v-model="sizeMd" size="md" placeholder="md"></nax-search>
<nax-search v-model="sizeLg" size="lg" placeholder="lg"></nax-search>
```

```uts
const sizeSm = ref('')
const sizeMd = ref('')
const sizeLg = ref('')
```

:::

::: details 无右侧按钮

```uvue
<nax-search v-model="noAction" :show-action="false" placeholder="show-action=false"></nax-search>
```

```uts
const noAction = ref('')
```

:::

::: details animation（聚焦才显示操作）

```uvue
<nax-search
	v-model="anim"
	animation
	action-text="取消"
	placeholder="聚焦后出现取消"
	@custom="onCustom"
></nax-search>
```

```uts
const anim = ref('')

function onCustom(val: string) {
	// 点击取消
}
```

:::

::: details label + 边框色

```uvue
<nax-search
	v-model="withLabel"
	label="地址"
	border-color="#18a058"
	placeholder="请输入地址"
></nax-search>
```

```uts
const withLabel = ref('')
```

:::

::: details 对齐 input-align

```uvue
<nax-search v-model="alignCenter" input-align="center" :show-action="false" placeholder="居中"></nax-search>
<nax-search v-model="alignRight" input-align="right" :show-action="false" placeholder="右对齐"></nax-search>
```

```uts
const alignCenter = ref('')
const alignRight = ref('')
```

:::

::: details 自定义背景 / 图标色

```uvue
<nax-search
	v-model="customBg"
	background="#e8f5ee"
	search-icon-color="#18a058"
	action-color="#18a058"
	placeholder="浅绿背景"
></nax-search>
```

```uts
const customBg = ref('')
```

:::

::: details 禁用（点击跳转场景）

```uvue
<nax-search
	v-model="disabledVal"
	disabled
	placeholder="点击整条触发 click"
	@click="onDisabledClick"
></nax-search>
```

```uts
const disabledVal = ref('')

// 整条可点击，适合跳转搜索页等场景
function onDisabledClick() {
	uni.showToast({
		title: '跳转搜索页',
		icon: 'none'
	})
}
```

:::

::: details 清除 clearable

```uvue
<nax-search
	v-model="clearable"
	:show-action="false"
	@clear="onClear"
></nax-search>
```

```uts
const clearable = ref('可清除示例')

function onClear() {
	// 点击清除按钮
}
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-border-width` | 边框粗细 |
| `--nax-color-bg-hover` | 按压/悬停背景色 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-text-disabled` | 禁用文字色 |
| `--nax-opacity-disabled` | 禁用透明度 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | string | `''` | v-model 绑定值 |
| shape | string | `'round'` | `round` 圆形 \| `square` 方形（默认 `round`） |
| background | string | `''` | 输入区背景色；空则用 token |
| placeholder | string | `'请输入关键字'` | 占位文案 |
| clearable | boolean | `true` | 是否显示清除按钮，默认 true |
| focus | boolean | `false` | 是否自动聚焦 |
| showAction | boolean | `true` | 是否显示右侧操作按钮，默认 true |
| actionText | string | `'搜索'` | 右侧按钮文案，默认「搜索」 |
| actionColor | string | `''` | 右侧按钮文字色 |
| inputAlign | string | `'left'` | `left` 左对齐 \| `center` 居中 \| `right` 右对齐 |
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
| size | string | `'md'` | `sm` 小 \| `md` 中 \| `lg` 大 |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| update:modelValue | v-model |
| input | 输入变化（当前值），输入过程中每次触发 |
| change | 失焦时内容与聚焦时不同才触发（当前值），对齐原生 input 语义 |
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

## 平台说明

- 基于原生 `input` + `confirm-type=search`。
- 清除按钮：有内容即显示（不依赖 focus）。
