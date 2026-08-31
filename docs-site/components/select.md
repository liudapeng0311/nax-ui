---
demo: select
---

# nax-select

> 当前版本：0.2.1

uni-app x 列选择器（底部弹层 + `picker-view`），功能覆盖常用场景。

## 安装

- 插件市场：[nax-select](https://ext.dcloud.net.cn/plugin?id=29060)

easycom 自动生效，页面直接使用 `<nax-select />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 基础用法

```uvue
<nax-button label="打开选择" @click="visible = true"></nax-button>
<nax-select
  v-model:show="visible"
  :list="list"
  title="请选择"
  @confirm="onConfirm"
></nax-select>
```

```uts
const visible = ref(false)
const list = [
  { value: '1', label: '雪月夜' },
  { value: '2', label: '冷夜雨' }
]

function onConfirm(items: UTSJSONObject[]) {
  // items[i].value / .label / .index
}
```

:::

::: details 内置触发条

`v-model` 绑定选中值后，触发条会按 `list` 对应项的 `label` 回显；未绑定时仍显示 `placeholder`。有选中值时，右侧显示清除按钮并隐藏下拉箭头（`clearable`，默认开启，二者互斥），点击后清空选中并回写空的 `v-model`。

```uvue
<nax-select
  v-model="city"
  v-model:show="visible"
  show-trigger
  placeholder="请选择城市"
  :list="list"
  @confirm="onConfirm"
></nax-select>
```

```uts
const city = ref('1')
const visible = ref(false)
```

多列 / 联动把 `v-model` 绑成数组：

```uvue
<nax-select
  v-model="region"
  v-model:show="visible"
  show-trigger
  mode="multi-column-auto"
  :list="regionList"
  placeholder="省 / 市 / 区"
></nax-select>
```

```uts
const region = ref(['zhejiang', 'hangzhou', 'xihu'] as string[])
```

:::

::: details 单列 + 按钮打开

```uvue
<nax-button label="选择水果" type="primary" @click="openSingle"></nax-button>

<nax-select
	v-model:show="singleShow"
	:list="fruitList"
	title="选择水果"
	:default-value="singleDefault"
	@confirm="onSingleConfirm"
	@cancel="onCancel"
></nax-select>
```

```uts
const singleShow = ref(false)
const singleDefault = [1] as number[]
const singleText = ref('未选择')
const fruitList = [
	{ value: 'apple', label: '苹果' },
	{ value: 'banana', label: '香蕉' },
	{ value: 'orange', label: '橙子' },
	{ value: 'grape', label: '葡萄' },
	{ value: 'mango', label: '芒果' }
]

function openSingle() {
	singleShow.value = true
}

// items 为选中项数组，含 value / label 字段
function onSingleConfirm(items: UTSJSONObject[]) {
	singleText.value = '已选择'
}

function onCancel() {
	// 点击取消
}
```

:::

::: details 内置触发条 + v-model

```uvue
<nax-select
	v-model="triggerValue"
	v-model:show="triggerShow"
	show-trigger
	placeholder="请选择城市"
	:list="cityList"
	title="城市"
	@confirm="onTriggerConfirm"
	@clear="onTriggerClear"
></nax-select>
```

```uts
const triggerShow = ref(false)
const triggerValue = ref('sh')
const cityList = [
	{ value: 'bj', label: '北京' },
	{ value: 'sh', label: '上海' },
	{ value: 'gz', label: '广州' },
	{ value: 'sz', label: '深圳' },
	{ value: 'cd', label: '成都' }
]

function onTriggerConfirm(items: UTSJSONObject[]) {
	// 确认后 v-model 已回写选中 value，触发条按 label 回显
}

function onTriggerClear() {
	// 触发条清除，v-model 已回写空值
}
```

:::

::: details 多列 multi-column

```uvue
<nax-button label="选择时间段" @click="multiShow = true"></nax-button>

<nax-select
	v-model:show="multiShow"
	mode="multi-column"
	:list="multiList"
	title="上课时间"
	@confirm="onMultiConfirm"
></nax-select>
```

```uts
const multiShow = ref(false)
const multiText = ref('未选择')
const multiList = [
	[
		{ value: 'mon', label: '周一' },
		{ value: 'tue', label: '周二' },
		{ value: 'wed', label: '周三' },
		{ value: 'thu', label: '周四' },
		{ value: 'fri', label: '周五' }
	],
	[
		{ value: 'am', label: '上午' },
		{ value: 'pm', label: '下午' },
		{ value: 'eve', label: '晚上' }
	]
]

function onMultiConfirm(items: UTSJSONObject[]) {
	multiText.value = '已选择'
}
```

:::

::: details 多列联动 multi-column-auto

```uvue
<nax-select
	v-model="cascadeValue"
	v-model:show="cascadeShow"
	show-trigger
	mode="multi-column-auto"
	:list="regionList"
	title="选择地区"
	placeholder="省 / 市 / 区"
	@confirm="onCascadeConfirm"
	@change="onCascadeChange"
></nax-select>
```

```uts
const cascadeShow = ref(false)
const cascadeValue = ref(['zhejiang', 'hangzhou', 'xihu'] as string[])
const cascadeText = ref('未选择')
const cascadeLive = ref('-')
// 联动数据：children 表示下一级
const regionList = [
	{
		value: 'zhejiang',
		label: '浙江',
		children: [
			{
				value: 'hangzhou',
				label: '杭州',
				children: [
					{ value: 'xihu', label: '西湖' },
					{ value: 'yuhang', label: '余杭' }
				]
			},
			{
				value: 'ningbo',
				label: '宁波',
				children: [
					{ value: 'haishu', label: '海曙' },
					{ value: 'jiangbei', label: '江北' }
				]
			}
		]
	},
	{
		value: 'jiangsu',
		label: '江苏',
		children: [
			{
				value: 'nanjing',
				label: '南京',
				children: [
					{ value: 'xuanwu', label: '玄武' },
					{ value: 'gulou', label: '鼓楼' }
				]
			},
			{
				value: 'suzhou',
				label: '苏州',
				children: [
					{ value: 'gusu', label: '姑苏' },
					{ value: 'wuzhong', label: '吴中' }
				]
			}
		]
	}
]

function onCascadeConfirm(items: UTSJSONObject[]) {
	cascadeText.value = '已选择'
}

// 滚动切换联动项时触发
function onCascadeChange(items: UTSJSONObject[]) {
	cascadeLive.value = '滚动中'
}
```

:::

::: details 自定义字段名

```uvue
<nax-button label="打开（id/name）" size="sm" @click="customShow = true"></nax-button>

<nax-select
	v-model:show="customShow"
	:list="customList"
	value-name="id"
	label-name="name"
	title="自定义字段"
	@confirm="onCustomConfirm"
></nax-select>
```

```uts
const customShow = ref(false)
const customText = ref('未选择')
const customList = [
	{ id: 10, name: '一号方案' },
	{ id: 20, name: '二号方案' },
	{ id: 30, name: '三号方案' }
]

function onCustomConfirm(items: UTSJSONObject[]) {
	customText.value = '已选择'
}
```

:::

::: details 禁用触发条

```uvue
<nax-select
	show-trigger
	disabled
	placeholder="已禁用"
	:list="fruitList"
></nax-select>
```

```uts
const fruitList = [
	{ value: 'apple', label: '苹果' },
	{ value: 'banana', label: '香蕉' },
	{ value: 'orange', label: '橙子' }
]
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-border-width` | 边框粗细 |
| `--nax-color-bg` | 背景色 |
| `--nax-color-bg-hover` | 按压/悬停背景色 |
| `--nax-color-border` | 边框色 |
| `--nax-color-divider` | 分割线色 |
| `--nax-color-mask` | 遮罩色 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-text-black` | 纯黑文字色 |
| `--nax-color-text-disabled` | 禁用文字色 |
| `--nax-color-text-placeholder` | 占位文字色 |
| `--nax-color-text-secondary` | 次要文字色 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | boolean | `false` | v-model:show 控制弹层显隐 |
| modelValue | [String, Number, Boolean, Array] | `'' as any` | v-model 选中值；单列为单项 value，多列/联动为 value 数组 |
| list | array | `() => [] as any[]` | 列数据；单列一维 / 多列二维 / 联动树形（children） |
| mode | string | `'single-column'` | `single-column` 单列 \| `multi-column` 多列 \| `multi-column-auto` 多列联动（兼容 `mutil-column` / `mutil-column-auto`） |
| defaultValue | array | `() => [] as any[]` | 默认选中下标数组，如 [0] / [1, 2] |
| title | string | `''` | 顶部标题 |
| confirmText | string | `'确认'` | 确认文案，默认「确认」 |
| cancelText | string | `'取消'` | 取消文案，默认「取消」 |
| confirmColor | string | `''` | 确认色；空则用主题主色 |
| cancelColor | string | `''` | 取消色；空则用次文案色 |
| valueName | string | `'value'` | list 项 value 字段名，默认 value |
| labelName | string | `'label'` | list 项 label 字段名，默认 label |
| childName | string | `'children'` | 联动子级字段名，默认 children |
| maskClosable | boolean | `true` | 点击遮罩是否关闭，默认 true（兼容 maskCloseAble） |
| safeAreaInsetBottom | boolean | `true` | 底部安全区，默认 true（比  默认更友好） |
| zIndex | number | `10075` | 弹层层级，默认 10075 |
| preserveSelection | boolean | `true` | 再次打开是否保留上次确认项，默认 true |
| showTrigger | boolean | `false` | 是否渲染内置触发条 |
| clearable | boolean | `true` | 触发条有选中值时显示清除按钮，默认 true |
| placeholder | string | `'请选择'` | 触发条占位 |
| disabled | boolean | `false` | 触发条禁用 |
| separator | string | `' / '` | 多列展示分隔符，默认「 / 」 |
| border | boolean | `true` | 触发条是否描边，默认 true |
| size | string | `'md'` | `sm` 小 \| `md` 中 \| `lg` 大（触发条尺寸） |
| customClass | string | `''` | 根节点扩展 class |
| maskCloseAble | boolean | — | 兼容  拼写，与 maskClosable 任一为 false 则不可点遮罩关闭 |

## 模式 mode

| 值 | 说明 | list 形态 |
|----|------|-----------|
| `single-column` | 单列（默认） | `[{ value, label }]` |
| `multi-column` | 多列独立 | `[[col1...], [col2...]]` |
| `multi-column-auto` | 多列联动 | 树形，子级字段默认 `children` |

兼容：`mutil-column` / `mutil-column-auto` / `cascade`。


## Events

| 事件 | 说明 |
|------|------|
| update:show | 弹层显隐 |
| update:modelValue | 确认后回写选中值（单列单项 / 多列数组） |
| confirm | 点确认，回调选中项数组 { value, label, index, extra? } |
| cancel | 点取消 / 遮罩关闭，回调当前滚轮项 |
| change | 滚轮变化（当前选中项数组） |
| open | 弹层打开 |
| close | 弹层关闭 |
| clear | 点击触发条清除按钮 |


## Slots

| 插槽 | 说明 |
|------|------|
| trigger | 自定义触发区域（需 showTrigger） |

## 平台说明

- **iOS**：自研滚轮（原生 `picker-view` 列文字无法垂直居中），滚动停止吸附对齐选中行，支持点选。
- 其余端（Android / 鸿蒙 / Web / 微信小程序）统一使用原生 `picker-view` 滚轮。
- **鸿蒙**：原生滚轮；**已禁用选项点选**（点击被吞掉），请滑动选择后点「确认」。
- **鸿蒙暗黑模式**：组件自动移除原生滚轮默认的白色渐变遮罩。
- 微信小程序滚动未结束时点确认会被忽略（滚动结束后方可确认）。
- 联动最多 4 列。
