---
demo: keyboard
---

# nax-keyboard

> 当前版本：0.1.3

`nax-ui` 自定义键盘（uni-app x / uvue）。
主要能力：
- 数字键盘 `mode="number"`（可带小数点）
- 车牌号键盘 `mode="car"`（中/英切换）
- 身份证键盘 `mode="card"`（含 `X`）
- 按键乱序 `random`
- 底部弹层 + 遮罩 + 顶部工具条

## 安装

- 插件市场：[nax-keyboard](https://ext.dcloud.net.cn/plugin?id=29039)

easycom 自动生效，页面直接使用 `<nax-keyboard />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 基础用法

```html
<nax-button label="打开数字键盘" @click="show = true"></nax-button>
<nax-keyboard v-model:show="show" mode="number" @change="onChange" @backspace="onBackspace" @confirm="onConfirm"></nax-keyboard>
```

:::

::: details 数字键盘

```uvue
<nax-button type="primary" label="打开数字键盘" @click="openNumber"></nax-button>
<nax-keyboard
	v-model:show="numberShow"
	mode="number"
	@change="onChange"
	@backspace="onBackspace"
	@confirm="onConfirm"
	@cancel="onCancel"
	@close="onClose"
></nax-keyboard>
```

```uts
const numberShow = ref(false)

function openNumber() {
	numberShow.value = true
}

function onChange(val : string) {
	// 追加字符 val
}

function onBackspace() {
	// 删除末位
}

function onConfirm() {
	// 确认
}

function onCancel() {
	// 取消（未确认关闭）
}

function onClose() {
	// 弹层关闭后
}
```

:::

::: details 无小数点数字键盘

```uvue
<nax-button label="打开（无 .）" @click="openNoDot"></nax-button>
<nax-keyboard
	v-model:show="noDotShow"
	mode="number"
	:dot-enabled="false"
	tips="支付密码"
	@change="onChange"
	@backspace="onBackspace"
	@confirm="onConfirm"
	@cancel="onCancel"
></nax-keyboard>
```

```uts
const noDotShow = ref(false)

function openNoDot() {
	noDotShow.value = true
}
// onChange / onBackspace 等回调同「数字键盘」示例
```

:::

::: details 身份证键盘

```uvue
<nax-button label="打开身份证键盘" @click="openCard"></nax-button>
<nax-keyboard
	v-model:show="cardShow"
	mode="card"
	@change="onChange"
	@backspace="onBackspace"
	@confirm="onConfirm"
	@cancel="onCancel"
></nax-keyboard>
```

```uts
const cardShow = ref(false)

function openCard() {
	cardShow.value = true
}
// 回调同「数字键盘」示例
```

:::

::: details 车牌号键盘

```uvue
<nax-button type="warning" label="打开车牌键盘" @click="openCar"></nax-button>
<nax-keyboard
	v-model:show="carShow"
	mode="car"
	@change="onChange"
	@backspace="onBackspace"
	@confirm="onConfirm"
	@cancel="onCancel"
></nax-keyboard>
```

```uts
const carShow = ref(false)

function openCar() {
	carShow.value = true
}
// 首字选中文省份简称，再点「中/英」切换字母数字；回调同「数字键盘」示例
```

:::

::: details 乱序键盘

```uvue
<nax-button size="sm" label="打开乱序数字键盘" @click="openRandom"></nax-button>
<nax-keyboard
	v-model:show="randomShow"
	mode="number"
	random
	tips="安全输入"
	@change="onChange"
	@backspace="onBackspace"
	@confirm="onConfirm"
	@cancel="onCancel"
></nax-keyboard>
```

```uts
const randomShow = ref(false)

function openRandom() {
	randomShow.value = true
}
// 每次打开按键随机排列，防止记录轨迹；回调同「数字键盘」示例
```

:::

::: details 无遮罩 / 自定义工具条

```uvue
<nax-button size="sm" label="打开（无遮罩）" @click="openNoMask"></nax-button>
<nax-keyboard
	v-model:show="noMaskShow"
	mode="number"
	:mask="false"
	cancel-text="关闭"
	confirm-text="确定"
	@change="onChange"
	@backspace="onBackspace"
	@confirm="onConfirm"
	@cancel="onCancel"
></nax-keyboard>
```

```uts
const noMaskShow = ref(false)

function openNoMask() {
	noMaskShow.value = true
}
// 回调同「数字键盘」示例
```

:::

::: details 插槽：上方密码预览

```uvue
<nax-button size="sm" type="success" label="打开密码键盘" @click="openSlot"></nax-button>
<nax-keyboard
	v-model:show="slotShow"
	mode="number"
	:dot-enabled="false"
	tips="请输入支付密码"
	@change="onSlotChange"
	@backspace="onSlotBackspace"
	@confirm="onConfirm"
	@cancel="onCancel"
>
	<view class="pwd">
		<view v-for="(item, index) in pwdBoxes" :key="index" class="pwd__box">
			<text class="pwd__dot">{{ item }}</text>
		</view>
	</view>
</nax-keyboard>
```

```uts
const slotShow = ref(false)
const slotPwd = ref('')

const pwdBoxes = computed((): string[] => {
	const boxes = [] as string[]
	var i = 0
	while (i < 6) {
		boxes.push(i < slotPwd.value.length ? '•' : '')
		i++
	}
	return boxes
})

function openSlot() {
	slotPwd.value = ''
	slotShow.value = true
}

function onSlotChange(val : string) {
	if (slotPwd.value.length >= 6) {
		return
	}
	slotPwd.value = slotPwd.value + val
	if (slotPwd.value.length >= 6) {
		slotShow.value = false
	}
}

function onSlotBackspace() {
	const s = slotPwd.value
	if (s.length == 0) {
		return
	}
	slotPwd.value = s.substring(0, s.length - 1)
}
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 背景色 |
| `--nax-color-bg-secondary` | 次级背景色 |
| `--nax-color-border` | 边框色 |
| `--nax-color-divider` | 分割线色 |
| `--nax-color-mask` | 遮罩色 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-text-secondary` | 次要文字色 |
| `--nax-color-warning` | 警告色 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | boolean | `false` | v-model:show 控制显隐 |
| mode | string | `'number'` | `number` 数字 \| `car` 车牌 \| `card` 卡号；默认 `number` |
| dotEnabled | boolean | `true` | number 模式是否显示小数点，默认 true |
| tooltip | boolean | `true` | 顶部工具条，默认 true |
| tips | string | `''` | 中间提示文案 |
| showTips | boolean | `true` | 是否显示中间提示，默认 true |
| cancelBtn | boolean | `true` | 是否显示取消，默认 true |
| confirmBtn | boolean | `true` | 是否显示完成，默认 true |
| cancelText | string | `'取消'` | 取消文案，默认 取消 |
| confirmText | string | `'完成'` | 完成文案，默认 完成 |
| mask | boolean | `true` | 是否显示遮罩，默认 true |
| maskClosable | boolean | `true` | 点击遮罩是否关闭，默认 true |
| maskCloseAble | boolean | `true` | 同 maskClosable |
| zIndex | number | `10075` | 层级，默认 10075 |
| random | boolean | `false` | 是否打乱按键，默认 false |
| safeAreaInsetBottom | boolean | `true` | 底部安全区，默认 true |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| update:show | 显隐变化 |
| change | 按键点击（不含退格），参数 string |
| backspace | 退格 |
| confirm | 完成 |
| cancel | 取消 |
| open | 打开 |
| close | 关闭完成 |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 键盘上方自定义内容 |
