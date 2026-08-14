---
demo: rate
---

# nax-rate

> 当前版本：0.1.4

uni-app x 评分组件，功能覆盖常用场景。

## 安装

- 插件市场：[nax-rate](https://ext.dcloud.net.cn/plugin?id=29057)

easycom 自动生效，页面直接使用 `<nax-rate />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 基础用法

```uvue
<nax-rate v-model="value" @change="onChange"></nax-rate>
```

:::

::: details 基础用法

```uvue
<nax-rate v-model="basic" @change="onBasicChange"></nax-rate>
```

```uts
const basic = ref(3.0)

function onBasicChange(v : number) {
	// v 为当前分值
}
```

:::

::: details 尺寸 size

```uvue
<nax-rate v-model="sizeSm" size="sm"></nax-rate>
<nax-rate v-model="sizeMd" size="md"></nax-rate>
<nax-rate v-model="sizeLg" size="lg"></nax-rate>
<nax-rate v-model="sizePx" size="32"></nax-rate>
```

```uts
const sizeSm = ref(2.0)
const sizeMd = ref(3.0)
const sizeLg = ref(4.0)
const sizePx = ref(3.0)
```

:::

::: details 星星数量 count

```uvue
<nax-rate v-model="countVal" :count="8"></nax-rate>
```

```uts
const countVal = ref(5.0)
```

:::

::: details 自定义颜色 / 间距

```uvue
<nax-rate v-model="colorVal" active-color="#d03050" inactive-color="#f0f0f3" :gutter="12"></nax-rate>

<nax-rate v-model="infoVal" active-color="#2080f0" inactive-color="#d6e4ff"></nax-rate>
```

```uts
const colorVal = ref(4.0)
const infoVal = ref(3.0)
```

:::

::: details 最少可选 minCount

```uvue
<nax-rate v-model="minVal" :min-count="2"></nax-rate>
```

```uts
const minVal = ref(2.0)
```

:::

::: details 半星 allowHalf

```uvue
<nax-rate v-model="halfVal" allow-half></nax-rate>
```

```uts
const halfVal = ref(2.5)
```

:::

::: details 禁用 / 只读

```uvue
<nax-rate v-model="disabledVal" disabled></nax-rate>
<nax-rate v-model="readonlyVal" readonly></nax-rate>
<nax-rate v-model="halfReadonly" allow-half readonly></nax-rate>
```

```uts
const disabledVal = ref(4.0)
const readonlyVal = ref(3.0)
const halfReadonly = ref(3.5)
```

:::

::: details 禁用滑动 touchable=false

```uvue
<nax-rate v-model="noTouchVal" :touchable="false"></nax-rate>
```

```uts
const noTouchVal = ref(2.0)
```

:::

::: details 自定义图标

```uvue
<nax-rate v-model="heartVal" active-icon="heart" inactive-icon="heart" active-color="#d03050"></nax-rate>
```

```uts
const heartVal = ref(3.0)
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-text-placeholder` | 占位文字色 |
| `--nax-color-warning` | 警告色 |
| `--nax-opacity-disabled` | 禁用透明度 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | number | `0` | 当前分值（v-model），支持半星小数 |
| count | number | `5` | 星星总数 |
| disabled | boolean | `false` | 禁用交互（降低透明度） |
| readonly | boolean | `false` | 只读展示（不触发交互，不降低透明度） |
| size | string | `'md'` | `sm` 小 \| `md` 中 \| `lg` 大 \| 数字像素字符串 |
| inactiveColor | string | `''` | 未选中色；空则占位色 token |
| activeColor | string | `''` | 选中色；空则警告色 token |
| gutter | number | `6` | 星星间距（px） |
| minCount | number | `0` | 最少可选星数 |
| allowHalf | boolean | `false` | 允许半星（滑动按位置；点击在半星/整星间切换） |
| touchable | boolean | `true` | 允许滑动打分 |
| activeIcon | string | `'star'` | 选中图标名（nax-icon） |
| inactiveIcon | string | `'star'` | 未选中图标名（nax-icon） |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| update:modelValue | v-model |
| change | 分值变化（number） |

