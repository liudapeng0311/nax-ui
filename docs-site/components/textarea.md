---
demo: textarea
---

# nax-textarea

> 当前版本：0.2.7

多行文本域。

## 安装

- 插件市场：[nax-textarea](https://ext.dcloud.net.cn/plugin?id=29073)

easycom 自动生效，页面直接使用 `<nax-textarea />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 基础用法

```uvue
<nax-textarea v-model="value" placeholder="请输入内容"></nax-textarea>

<!-- 字数统计 -->
<nax-textarea v-model="value" count placeholder="请输入内容"></nax-textarea>

<!-- 自动增高 -->
<nax-textarea v-model="value" auto-height placeholder="请输入内容"></nax-textarea>

<!-- 仅下边框 -->
<nax-textarea v-model="value" border border-type="bottom" placeholder="下划线风格"></nax-textarea>
```

:::

::: details 暂不支持（组件）

| 能力 | 原因 |
|------|------|
| `formatter` | UTS 不适合以 Function prop 透传 |
| `ignoreCompositionEvent` | 合成输入处理端差异大，暂不做 |
| `placeholderClass` | 样式隔离 2.0 下类穿透不稳定，请用 `placeholder-style` |
| `disableDefaultPadding` | uni-app x 原生 textarea 未统一提供 |

:::

::: details 基础用法

```uvue
<nax-textarea
	v-model="basic"
	placeholder="请输入内容"
	@change="onChange('basic')"
	@focus="onFieldFocus('sec-basic')"
	@blur="onFieldBlur"
	@keyboardheightchange="onTaKeyboard"
></nax-textarea>
```

```uts
const basic = ref('')
const lastEvent = ref('')

function onChange(name : string) {
	lastEvent.value = 'change ' + name
}

function onFieldFocus(secId : string) {
	lastEvent.value = 'focus: ' + secId
}

function onFieldBlur(value : string) {
	lastEvent.value = 'blur: ' + value
}

function onTaKeyboard(detail : UniInputKeyboardHeightChangeEventDetail) {
	// 键盘高度变化：detail.height
}
```

:::

::: details 字数统计 count

```uvue
<nax-textarea v-model="withCount" count :maxlength="100" placeholder="最多 100 字"></nax-textarea>
```

```uts
const withCount = ref('统计字数')
```

:::

::: details 自动增高 auto-height

```uvue
<nax-textarea v-model="autoH" auto-height height="70" placeholder="输入时自动增高"></nax-textarea>
```

```uts
const autoH = ref('')
```

:::

::: details 无边框 / 背景色

```uvue
<nax-textarea v-model="plain" :border="false" placeholder="无边框"></nax-textarea>
<nax-textarea v-model="plainBg" :border="false" background="#f3f3f5" placeholder="无边框 + 背景色"></nax-textarea>
```

```uts
const plain = ref('')
const plainBg = ref('')
```

:::

::: details 仅下边框 border-type=bottom

```uvue
<nax-textarea v-model="bottomBorder" border border-type="bottom" placeholder="下划线风格"></nax-textarea>
```

```uts
const bottomBorder = ref('')
```

:::

::: details 尺寸 size

```uvue
<nax-textarea v-model="sizeSm" size="sm" height="56" placeholder="sm"></nax-textarea>
<nax-textarea v-model="sizeMd" size="md" height="70" placeholder="md"></nax-textarea>
<nax-textarea v-model="sizeLg" size="lg" height="88" placeholder="lg"></nax-textarea>
```

```uts
const sizeSm = ref('')
const sizeMd = ref('')
const sizeLg = ref('')
```

:::

::: details 禁用 / 只读

```uvue
<nax-textarea v-model="disabledVal" disabled count></nax-textarea>
<nax-textarea v-model="readonlyVal" readonly></nax-textarea>
```

```uts
const disabledVal = ref('文本域已被禁用')
const readonlyVal = ref('只读状态，不可编辑')
```

:::

::: details 自定义边框色 + 高度

```uvue
<nax-textarea
	v-model="colorBorder"
	border
	border-color="#18a058"
	height="100"
	placeholder="height=100，边框 primary"
	@confirm="onConfirm"
></nax-textarea>
```

```uts
const colorBorder = ref('')
const lastEvent = ref('')

function onConfirm(value : string) {
	lastEvent.value = 'confirm: ' + value
}
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-border-width` | 边框粗细 |
| `--nax-color-bg` | 背景色 |
| `--nax-color-bg-secondary` | 次级背景色 |
| `--nax-color-border` | 边框色 |
| `--nax-color-error` | 错误色 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-text-disabled` | 禁用文字色 |
| `--nax-color-text-secondary` | 次要文字色 |
| `--nax-opacity-disabled` | 禁用透明度 |
| `--nax-textarea-bg` | 多行输入框背景色 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | string | `''` | v-model 绑定值 |
| placeholder | string | `'请输入内容'` | 占位文案 |
| height | string | `'70'` | 高度，数字按 px；autoHeight 时作为 min-height（默认 70） |
| confirmType | string | `'return'` | `return` 回车换行（默认）\| `done` 完成 \| `send` 发送 \| `search` 搜索 \| `next` 下一项 \| `go` 前往 |
| disabled | boolean | `false` | 禁用 |
| readonly | boolean | `false` | 只读 |
| count | boolean | `false` | 是否显示字数统计 |
| focus | boolean | `false` | 是否获取焦点 |
| autoHeight | boolean | `false` | 是否自动增高 |
| fixed | boolean | `false` | textarea 在 fixed 区域时需设 true |
| cursorSpacing | number | `0` | 光标与键盘距离 |
| cursor | number | `-1` | focus 时光标位置 |
| showConfirmBar | boolean | `true` | 是否显示键盘上方完成栏 |
| selectionStart | number | `-1` | 聚焦选区起点 |
| selectionEnd | number | `-1` | 聚焦选区终点 |
| adjustPosition | boolean | `true` | 键盘弹起是否上推页面 |
| holdKeyboard | boolean | `false` | 聚焦时点页面不收起键盘 |
| maxlength | number | `140` | 最大长度；-1 不限制（默认 140） |
| border | boolean | `true` | 是否显示边框，默认 true |
| borderType | string | `'surround'` | `surround` 四边 \| `bottom` 仅下边框 |
| borderColor | string | `''` | 边框色 |
| background | string | `''` | 背景色 |
| placeholderStyle | string | `''` | placeholder 样式字符串 |
| confirmHold | boolean | `false` | 点完成是否保持键盘 |
| size | string | `'md'` | `sm` 小 \| `md` 中 \| `lg` 大 |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| update:modelValue | v-model |
| input | 输入变化（当前值），输入过程中每次触发 |
| change | 失焦时内容与聚焦时不同才触发（当前值），对齐原生 input 语义 |
| focus | 聚焦（当前值） |
| blur | 失焦（当前值） |
| confirm | 键盘完成（当前值） |
| linechange | 行数变化 |
| keyboardheightchange | 键盘高度变化 |
| click | 点击区域 |


## 平台说明

- 基于原生 `textarea`，`auto-height` / 键盘相关能力随端差异以官方文档为准。
- `readonly` 通过禁用原生编辑实现（样式弱于 `disabled`）。
- 鸿蒙端：原生 `cursor-spacing` 仍不支持。
