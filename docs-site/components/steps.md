---
demo: steps
---

# nax-steps / nax-step

> 当前版本：0.1.2

步骤条。用于展示多步任务进度（物流、表单向导、审批等）。

## 安装

```text
uni_modules/nax-steps
```

easycom 自动生效，页面直接使用 `<nax-steps />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 组件

| 标签 | 说明 |
|------|------|
| `nax-steps` | 容器：方向、模式、当前步、语义色 |
| `nax-step` | 单步（组合式）；也可由 `list` 自动生成 |

:::

::: details 基础用法（list）

```uvue
<nax-steps :list="list" :current="1"></nax-steps>
```

```uts
const list = [
  { name: '下单' },
  { name: '出库' },
  { name: '运输' },
  { name: '签收' }
]
```

:::

::: details 组合式

```uvue
<nax-steps :current="1" direction="vertical">
  <nax-step title="提交申请" desc="2026-01-01"></nax-step>
  <nax-step title="审批中" desc="处理中"></nax-step>
  <nax-step title="完成" status="finish"></nax-step>
</nax-steps>
```

:::

::: details 说明

- 外观优先 `--nax-*` token + `type`，不靠颜色字符串当主题主路径。
- 单步可显式 `status`，比仅靠 `current` 更适合失败/跳过场景。
- App 端连接线/指示器用像素尺寸，避免百分比 `max-width` 等 ucss 限制。

:::

::: details 基础（list + current）

```uvue
<nax-steps :list="basicList" :current="basicCurrent"></nax-steps>

<nax-button size="sm" label="上一步" :disabled="basicCurrent <= 0" @click="prevBasic"></nax-button>
<nax-button size="sm" type="primary" label="下一步" :disabled="basicCurrent >= basicList.length - 1" @click="nextBasic"></nax-button>
```

```uts
const basicList = [
	{ name: '下单' },
	{ name: '出库' },
	{ name: '运输' },
	{ name: '签收' }
]

const basicCurrent = ref(1)

function prevBasic() {
	if (basicCurrent.value > 0) {
		basicCurrent.value = basicCurrent.value - 1
	}
}

function nextBasic() {
	if (basicCurrent.value < basicList.length - 1) {
		basicCurrent.value = basicCurrent.value + 1
	}
}
```

:::

::: details 点状 mode=dot

```uvue
<nax-steps :list="basicList" :current="1" mode="dot"></nax-steps>
```

```uts
const basicList = [
	{ name: '下单' },
	{ name: '出库' },
	{ name: '运输' },
	{ name: '签收' }
]
```

:::

::: details 语义色 type

```uvue
<nax-steps :list="typeList" :current="2" type="info"></nax-steps>
<nax-steps :list="typeList" :current="2" type="warning"></nax-steps>
<nax-steps :list="typeList" :current="2" type="error"></nax-steps>
```

```uts
const typeList = [
	{ name: '步骤一' },
	{ name: '步骤二' },
	{ name: '步骤三' },
	{ name: '步骤四' }
]
```

:::

::: details 尺寸 size

```uvue
<nax-steps :list="sizeList" :current="1" size="sm"></nax-steps>
<nax-steps :list="sizeList" :current="1" size="md"></nax-steps>
<nax-steps :list="sizeList" :current="1" size="lg"></nax-steps>
```

```uts
const sizeList = [
	{ name: '选购' },
	{ name: '确认' },
	{ name: '支付' }
]
```

:::

::: details 纵向 + 描述

```uvue
<nax-steps :list="verticalList" :current="verticalCurrent" direction="vertical"></nax-steps>

<nax-button size="sm" type="primary" label="推进进度" @click="nextVertical"></nax-button>
```

```uts
const verticalList = [
	{ name: '买家下单', desc: '2026-07-01 10:00' },
	{ name: '商家发货', desc: '2026-07-01 18:20' },
	{ name: '运输中', desc: '快递已揽收' },
	{ name: '已签收', desc: '待更新' }
]

const verticalCurrent = ref(1)

function nextVertical() {
	if (verticalCurrent.value < verticalList.length - 1) {
		verticalCurrent.value = verticalCurrent.value + 1
	} else {
		verticalCurrent.value = 0
	}
}
```

:::

::: details 单步 status（含失败）

```uvue
<nax-steps :list="statusList" :current="1"></nax-steps>
```

```uts
const statusList = [
	{ name: '填写信息', status: 'finish' },
	{ name: '身份核验', status: 'error', desc: '证件模糊，请重传' },
	{ name: '人工复核', status: 'wait' },
	{ name: '开通完成', status: 'wait' }
]
```

:::

::: details 组合式 nax-step

```uvue
<nax-steps :current="1" direction="vertical" type="success">
	<nax-step title="提交资料" desc="已完成"></nax-step>
	<nax-step title="人工审核" desc="进行中"></nax-step>
	<nax-step title="开通成功" desc="等待中"></nax-step>
</nax-steps>
```

:::

::: details 可点击 clickable

```uvue
<nax-steps
	:list="clickList"
	:current="clickCurrent"
	clickable
	@click="onStepClick"
></nax-steps>
```

```uts
const clickList = [
	{ name: '基本信息' },
	{ name: '上传材料' },
	{ name: '确认提交' }
]

const clickCurrent = ref(0)

// 点击第 index 步跳转
function onStepClick(index: number) {
	clickCurrent.value = index
}
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 背景色 |
| `--nax-color-border` | 边框色 |
| `--nax-color-divider` | 分割线色 |
| `--nax-color-error` | 错误色 |
| `--nax-color-info` | 信息色 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-success` | 成功色 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-text-secondary` | 次要文字色 |
| `--nax-color-text-tertiary` | 三级文字色 |
| `--nax-color-warning` | 警告色 |
| `--nax-opacity-disabled` | 禁用透明度 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| list | array | `() => [] as any[]` | 步骤列表（name/title、desc/description、status、icon、disabled；支持字符串） |
| current | number | `0` | 当前步下标（从 0 起），无显式 status 时推导 |
| direction | string | `'horizontal'` | `horizontal` 横向 \| `vertical` 纵向（兼容 `row` / `column`） |
| mode | string | `'number'` | `number` 数字 \| `dot` 圆点 |
| type | string | `'primary'` | `primary` 主要 \| `info` 信息 \| `success` 成功 \| `warning` 警告 \| `error` 错误 |
| size | string | `'md'` | `sm` 小 \| `md` 中 \| `lg` 大 |
| icon | string | `'check'` | 完成态默认图标，默认 check |
| errorIcon | string | `'close'` | 失败态默认图标，默认 close |
| clickable | boolean | `false` | 是否可点击，默认 false |
| customClass | string | `''` | 根扩展 class |

## Props（nax-step）

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| title / name | string | `''` | 标题 |
| desc / description | string | `''` | 描述 |
| status | string | `''` | `wait` / `process` / `finish` / `error`；空则按 current 推导 |
| icon | string | `''` | 本步完成态图标覆盖 |
| disabled | boolean | `false` | 禁用点击 |
| custom-class | string | `''` | 根扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| click | 点击步骤（index） |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 放置 nax-step（list 为空时） |
