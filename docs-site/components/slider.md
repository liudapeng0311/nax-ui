---
demo: slider
---

# nax-slider

> 当前版本：1.0.4

uni-app x 滑动选择器，功能覆盖常用场景。

## 安装

- 插件市场：[nax-slider](https://ext.dcloud.net.cn/plugin?id=29062)

easycom 自动生效，页面直接使用 `<nax-slider />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 基础用法

```uvue
<nax-slider v-model="value" @change="onChange"></nax-slider>
```

:::

::: details 范围说明

- `start` / `end`：整条轨道的刻度范围（决定滑块视觉位置）
- `min` / `max`：可选取值区间，会被夹在 `[start, end]` 内
- 小数范围请同时设置 `:start` / `:end`（例如 0–1 且 `step=0.1`），不要只设 `min`/`max` 而保留默认 end=100

:::

::: details 基础用法

```uvue
<nax-slider v-model="basic" @change="onBasicChange"></nax-slider>
```

```uts
const basic = ref(30)

function onBasicChange(v: number) {
	// 值变化回调
}
```

:::

::: details 尺寸 size

```uvue
<nax-slider v-model="sizeSm" size="sm"></nax-slider>
<nax-slider v-model="sizeMd" size="md"></nax-slider>
<nax-slider v-model="sizeLg" size="lg"></nax-slider>
```

```uts
const sizeSm = ref(20)
const sizeMd = ref(40)
const sizeLg = ref(60)
```

:::

::: details 范围 min / max

```uvue
<nax-slider v-model="rangeVal" :min="30" :max="80" show-edge-value></nax-slider>
```

```uts
const rangeVal = ref(50)
```

:::

::: details 步长 step

```uvue
<nax-slider v-model="stepVal" :step="10"></nax-slider>
```

```uts
const stepVal = ref(30)
```

:::

::: details 小数步长

```uvue
<nax-slider v-model="stepFloat" :step="0.1" :start="0" :end="1"></nax-slider>
```

```uts
const stepFloat = ref(0.3)
```

:::

::: details 自定义颜色

```uvue
<nax-slider
	v-model="colorVal"
	active-color="#2080f0"
	inactive-color="#d6e4ff"
	block-color="#ffffff"
></nax-slider>
```

```uts
const colorVal = ref(45)
```

:::

::: details 显示起止值 showEdgeValue

```uvue
<nax-slider
	v-model="edgeVal"
	:start="0"
	:end="100"
	show-edge-value
	edge-value-position="bottom"
></nax-slider>
```

```uts
const edgeVal = ref(55)
```

:::

::: details 自定义滑块 useSlot

```uvue
<nax-slider v-model="slotVal" use-slot :block-width="28">
	<view class="custom-thumb">
		<text class="custom-thumb__text">{{ slotVal }}</text>
	</view>
</nax-slider>
```

```uts
const slotVal = ref(35)
```

:::

::: details 禁用 disabled

```uvue
<nax-slider v-model="disabledVal" disabled></nax-slider>
```

```uts
const disabledVal = ref(40)
```

:::

::: details 事件 start / moving / end

```uvue
<nax-slider
	v-model="eventVal"
	@start="onStart"
	@moving="onMoving"
	@end="onEnd"
	@change="onEventChange"
></nax-slider>
```

```uts
const eventVal = ref(25)

function onStart() {
	// 开始拖动
}

function onMoving() {
	// 拖动中
}

function onEnd() {
	// 结束拖动
}

function onEventChange(v: number) {
	// 值变化
}
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 背景色 |
| `--nax-color-border` | 边框色 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-text-secondary` | 次要文字色 |
| `--nax-opacity-disabled` | 禁用透明度 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | number | `0` | 当前值（v-model），落在 [start, end] 内 |
| start | number | `0` | 整体范围起点 |
| end | number | `100` | 整体范围终点 |
| min | number | `0` | 可选最小值（夹在 start/end 内） |
| max | number | `100` | 可选最大值（夹在 start/end 内） |
| step | number | `1` | 步长 |
| size | string | `'md'` | `sm` 小 \| `md` 中 \| `lg` 大（影响轨道高度与滑块尺寸；可用 blockWidth / height 覆盖） |
| blockWidth | number | `0` | 滑块边长（px）；0 表示跟随 size |
| height | number | `0` | 轨道高度（px）；0 表示跟随 size |
| inactiveColor | string | `''` | 轨道底色；空则主题边框色 |
| activeColor | string | `''` | 已选轨道色；空则主题主色 |
| blockColor | string | `''` | 滑块颜色；空则主题背景色 |
| disabled | boolean | `false` | 禁用 |
| useSlot | boolean | `false` | 使用默认插槽自定义滑块 |
| showEdgeValue | boolean | `false` | 显示起止数值 |
| edgeValuePosition | string | `'top'` | `top` 上方 \| `bottom` 下方 |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| update:modelValue | v-model |
| change | 值变化（松手/点击后的最终值） |
| start | 开始滑动 |
| moving | 滑动中 |
| end | 滑动结束 |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义滑块（需 useSlot） |
