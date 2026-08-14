---
demo: picker
---

# nax-picker

> 当前版本：0.1.4

通用弹出容器，用于自定义弹层内容。支持从 **底部 / 中间 / 左侧 / 右侧** 弹出。

## 安装

- 插件市场：[nax-picker](https://ext.dcloud.net.cn/plugin?id=29019)

easycom 自动生效，页面直接使用 `<nax-picker />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 基础用法

```uvue
<nax-button label="打开" @click="show = true"></nax-button>
<nax-picker v-model:show="show" position="bottom">
  <view class="panel">
    <text>自定义内容</text>
  </view>
</nax-picker>
```

:::

::: details 弹出位置 position

```uvue
<nax-button type="primary" label="底部 bottom" @click="openAt('bottom')"></nax-button>
<nax-button label="中间 center" @click="openAt('center')"></nax-button>
<nax-button label="左侧 left" @click="openAt('left')"></nax-button>
<nax-button label="右侧 right" @click="openAt('right')"></nax-button>

<nax-picker v-model:show="mainShow" :position="mainPosition">
	<view class="panel">
		<text class="panel__title">{{ positionTitle }}</text>
		<text class="panel__desc">position = {{ mainPosition }}</text>
		<nax-button type="primary" label="完成" @click="mainShow = false"></nax-button>
	</view>
</nax-picker>
```

```uts
const mainShow = ref(false)
const mainPosition = ref('bottom')

const positionTitle = computed((): string => {
	if (mainPosition.value == 'center') {
		return '中间弹出'
	}
	if (mainPosition.value == 'left') {
		return '左侧抽屉'
	}
	if (mainPosition.value == 'right') {
		return '右侧抽屉'
	}
	return '底部弹出'
})

function openAt(pos : string) {
	mainPosition.value = pos
	mainShow.value = true
}
```

:::

::: details 行为

```uvue
<nax-button size="sm" label="禁止点遮罩关闭" @click="openMaskLocked"></nax-button>
<nax-button size="sm" label="无圆角" @click="openNoRound"></nax-button>
<nax-button size="sm" label="自定义宽高（右侧 60%）" @click="openCustomSize"></nax-button>

<nax-picker v-model:show="lockedShow" position="center" :mask-closable="false">
	<text class="panel__title">不可点遮罩关闭</text>
	<nax-button type="primary" label="知道了" @click="lockedShow = false"></nax-button>
</nax-picker>

<nax-picker v-model:show="noRoundShow" position="bottom" :round="false">
	<text class="panel__title">无圆角底部面板</text>
	<nax-button label="关闭" @click="noRoundShow = false"></nax-button>
</nax-picker>

<nax-picker v-model:show="sizeShow" position="right" width="60%">
	<text class="panel__title">宽 60% 侧栏</text>
	<nax-button type="primary" label="关闭" @click="sizeShow = false"></nax-button>
</nax-picker>
```

```uts
const lockedShow = ref(false)
const noRoundShow = ref(false)
const sizeShow = ref(false)

function openMaskLocked() {
	lockedShow.value = true
}

function openNoRound() {
	noRoundShow.value = true
}

function openCustomSize() {
	sizeShow.value = true
}
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 背景色 |
| `--nax-color-mask` | 遮罩色 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | boolean | `false` | v-model:show 控制显隐 |
| position | string | `'bottom'` | `bottom` 底部 \| `center` 居中 \| `left` 左侧 \| `right` 右侧；默认 `bottom` |
| round | boolean | `true` | 圆角面板，默认 true |
| mask | boolean | `true` | 是否显示遮罩，默认 true |
| maskClosable | boolean | `true` | 点击遮罩是否关闭，默认 true |
| closeOnMask | boolean | `true` | 同 maskClosable（兼容命名） |
| closeOnClickOverlay | boolean | `true` | 同 maskClosable（兼容命名） |
| zIndex | number | `10070` | 层级，默认 10070 |
| duration | number | `280` | 动画时长 ms，默认 280 |
| width | string | `''` | 面板宽度（center 默认约 86% 屏宽；left/right 抽屉默认约 78%） |
| height | string | `''` | 面板高度（left/right 抽屉默认全屏高；bottom/center 可选） |
| safeAreaInsetBottom | boolean | `true` | 底部安全区（position=bottom 时默认 true） |
| customClass | string | `''` | 根节点扩展 class |
| customStyle | string | `''` | 根节点扩展 style |

## 弹出位置

| position | 说明 | 动画 |
|----------|------|------|
| `bottom` | 底部面板（默认） | slide-up |
| `center` | 居中弹层（默认约 86% 屏宽） | zoom |
| `left` | 左侧抽屉（贴边全高，默认约 78% 屏宽） | slide-left |
| `right` | 右侧抽屉（贴边全高，默认约 78% 屏宽） | slide-right |


## Events

| 事件 | 说明 |
|------|------|
| update:show | 显隐变更 |
| open | 打开（进场开始） |
| opened | 打开完成（进场结束） |
| close | 关闭完成（退场结束且容器卸载） |
| click-mask | 点击遮罩 |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义面板内容 |
