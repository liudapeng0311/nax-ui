
# nax-number-box

> 当前版本：0.1.5

uni-app x 步进器（加减数量）。

## 安装

- 插件市场：[nax-number-box](https://ext.dcloud.net.cn/plugin?id=29045)

easycom 自动生效，页面直接使用 `<nax-number-box />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 基础用法
```demo demo-number-box
<nax-number-box v-model="value" @change="onChange"></nax-number-box>
```

### 基础用法
```uvue
<nax-number-box v-model="basic" @change="onBasicChange"></nax-number-box>
```

```uts
const basic = ref(1)

function onBasicChange(v : number) {
	// v 为最新值
}
```

### 尺寸 size
```uvue
<nax-number-box v-model="sizeSm" size="sm"></nax-number-box>
<nax-number-box v-model="sizeMd" size="md"></nax-number-box>
<nax-number-box v-model="sizeLg" size="lg"></nax-number-box>
```

```uts
const sizeSm = ref(1)
const sizeMd = ref(2)
const sizeLg = ref(3)
```

### 范围 min / max / step
```uvue
<nax-number-box v-model="rangeVal" :min="1" :max="10" :step="1" @overlimit="onOverlimit"></nax-number-box>

<nax-number-box v-model="stepVal" :min="0" :max="5" :step="0.5"></nax-number-box>
```

```uts
const rangeVal = ref(1)
const stepVal = ref(0)

function onOverlimit(type : string) {
	// type 为 'plus' 或 'minus'，已达边界
}
```

### 仅整数 integer
```uvue
<nax-number-box v-model="intVal" integer :min="0" :max="99"></nax-number-box>
```

```uts
const intVal = ref(3)
```

### 禁用
```uvue
<nax-number-box v-model="disabledAll" disabled></nax-number-box>

<nax-number-box v-model="disabledInputVal" disabled-input></nax-number-box>

<nax-number-box v-model="disableBtnVal" disable-plus disable-minus></nax-number-box>
```

```uts
const disabledAll = ref(5)
const disabledInputVal = ref(2)
const disableBtnVal = ref(4)
```

### 长按 longPress
```uvue
<nax-number-box v-model="longPressOn" :long-press="true"></nax-number-box>

<nax-number-box v-model="longPressOff" :long-press="false"></nax-number-box>
```

```uts
const longPressOn = ref(0)
const longPressOff = ref(0)
```

### 异步变更 asyncChange
```uvue
<nax-number-box v-model="asyncVal" async-change @change="onAsyncChange"></nax-number-box>
```

```uts
const asyncVal = ref(1)
const asyncBusy = ref(false)

// 收到 change 后延迟回写 v-model，期间可展示“提交中”状态
function onAsyncChange(v : number) {
	if (asyncBusy.value) {
		return
	}
	asyncBusy.value = true
	const target = v
	setTimeout(() => {
		asyncVal.value = target
		asyncBusy.value = false
	}, 800)
}
```

### 自定义颜色 / 宽度
```uvue
<nax-number-box v-model="colorVal" bg-color="#e8f5ee" color="#18a058" :button-size="36" :input-width="56"></nax-number-box>
```

```uts
const colorVal = ref(1)
```

### 自定义插槽
```uvue
<nax-number-box v-model="slotVal">
	<template #minus>
		<text class="slot-text">减</text>
	</template>
	<template #plus>
		<text class="slot-text">加</text>
	</template>
</nax-number-box>
```

```uts
const slotVal = ref(1)
```

### 事件
```uvue
<nax-number-box
	v-model="eventVal"
	:min="0"
	:max="20"
	@change="onEventChange"
	@focus="onEventFocus"
	@blur="onEventBlur"
	@plus="onEventPlus"
	@minus="onEventMinus"
	@overlimit="onOverlimit"
></nax-number-box>
```

```uts
const eventVal = ref(0)
const eventLog = ref('等待操作')

function onEventChange(v : number) {
	eventLog.value = 'change: ' + v.toString()
}

function onEventFocus() {
	eventLog.value = 'focus'
}

function onEventBlur(v : number) {
	eventLog.value = 'blur: ' + v.toString()
}

function onEventPlus() {
	eventLog.value = 'plus'
}

function onEventMinus() {
	eventLog.value = 'minus'
}

function onOverlimit(type : string) {
	eventLog.value = 'overlimit: ' + type
}
```

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg-hover` | 按压/悬停背景色 |
| `--nax-color-bg-secondary` | 次级背景色 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-text-disabled` | 禁用文字色 |
| `--nax-opacity-disabled` | 禁用透明度 |

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
| size | string | `'md'` | `sm` 小 \| `md` 中 \| `lg` 大 |
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
