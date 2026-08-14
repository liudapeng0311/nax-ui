---
demo: switch
---

# nax-switch

> 当前版本：0.1.5

uni-app x 开关，功能覆盖常用场景。

## 安装

- 插件市场：[nax-switch](https://ext.dcloud.net.cn/plugin?id=29067)

easycom 自动生效，页面直接使用 `<nax-switch />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 基础用法

```uvue
<nax-switch v-model="checked" @change="onChange"></nax-switch>
```

:::

::: details 尺寸 size

```uvue
<nax-switch v-model="sizeSm" size="sm"></nax-switch>
<nax-switch v-model="sizeMd" size="md"></nax-switch>
<nax-switch v-model="sizeLg" size="lg"></nax-switch>
```

```uts
const sizeSm = ref(true)
const sizeMd = ref(true)
const sizeLg = ref(true)
```

:::

::: details 禁用 disabled

```uvue
<nax-switch v-model="disabledOff" disabled></nax-switch>
<nax-switch v-model="disabledOn" disabled></nax-switch>
```

```uts
const disabledOff = ref(false)
const disabledOn = ref(true)
```

:::

::: details 加载 loading

```uvue
<nax-switch v-model="loadingOff" loading></nax-switch>
<nax-switch v-model="loadingOn" loading></nax-switch>
```

```uts
const loadingOff = ref(false)
const loadingOn = ref(true)
```

模拟异步提交：switch 先切换到目标值，这里立刻回滚并进入 loading，成功后再写入。

```uvue
<nax-switch v-model="asyncVal" :loading="asyncBusy" @change="onAsyncChange"></nax-switch>
```

```uts
const asyncVal = ref(false)
const asyncBusy = ref(false)

function onAsyncChange(v : boolean) {
	if (asyncBusy.value) {
		return
	}
	const target = v
	// 回滚到切换前，进入 loading
	asyncVal.value = !target
	asyncBusy.value = true
	setTimeout(() => {
		asyncVal.value = target
		asyncBusy.value = false
	}, 1200)
}
```

:::

::: details 自定义颜色

```uvue
<nax-switch v-model="colorA" active-color="#2080f0"></nax-switch>
<nax-switch v-model="colorB" active-color="#d03050" inactive-color="#f3f3f5"></nax-switch>
```

```uts
const colorA = ref(true)
const colorB = ref(false)
```

:::

::: details 切换震动 vibrateShort

```uvue
<nax-switch v-model="vibrateVal" vibrate-short></nax-switch>
```

```uts
const vibrateVal = ref(false)
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
| modelValue | boolean | `false` | 开关状态（v-model） |
| disabled | boolean | `false` | 禁用 |
| loading | boolean | `false` | 加载中（阻止切换） |
| size | string | `'md'` | `sm` 小 \| `md` 中 \| `lg` 大 |
| activeColor | string | `''` | 打开时轨道色；空则主题 primary |
| inactiveColor | string | `''` | 关闭时轨道色；空则边框灰 |
| vibrateShort | boolean | `false` | 切换时短震动（支持端生效） |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| update:modelValue | v-model |
| change | 状态变化（boolean） |

