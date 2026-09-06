
# nax-overlay

> 当前版本：0.1.3

全屏遮罩层（弹层底层）。用于压暗页面、拦截点击，可叠加自定义内容（如 `nax-loading`）。

## 安装

- 插件市场：[nax-overlay](https://ext.dcloud.net.cn/plugin?id=29046)

easycom 自动生效，页面直接使用 `<nax-overlay />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 基础用法
```demo demo-overlay
<nax-overlay :show="visible" @click="visible = false"></nax-overlay>
```

```uvue
<!-- v-model + 点遮罩关闭 -->
<nax-overlay v-model:show="visible" close-on-click></nax-overlay>
```

### 遮罩 + 内容
```uvue
<nax-overlay :show="loading">
	<nax-loading vertical text="加载中" type="primary"></nax-loading>
</nax-overlay>
```

### 基础遮罩
```uvue
<nax-button type="primary" size="sm" label="打开遮罩" @click="openBasic"></nax-button>

<nax-overlay v-model:show="basicShow" close-on-click @click="onOverlayClick"></nax-overlay>
```

```uts
const basicShow = ref(false)

function openBasic() {
	basicShow.value = true
}

function onOverlayClick() {
	// 点击遮罩
}
```

### 遮罩 + Loading
```uvue
<nax-button type="primary" size="sm" label="全屏加载 2s" @click="openLoading"></nax-button>

<nax-overlay :show="loadingShow" :close-on-click="true" @update:show="onLoadingShowUpdate">
	<view class="loading-box">
		<nax-loading vertical text="加载中" type="primary"></nax-loading>
	</view>
</nax-overlay>
```

```uts
const loadingShow = ref(false)
let loadingTimer : number = -1

function openLoading() {
	loadingShow.value = true
	loadingTimer = setTimeout(() => {
		loadingShow.value = false
		loadingTimer = -1
	}, 2000)
}

function onLoadingShowUpdate(val : boolean) {
	loadingShow.value = val
	if (!val && loadingTimer >= 0) {
		clearTimeout(loadingTimer)
		loadingTimer = -1
	}
}
```

### 自定义颜色
```uvue
<nax-button size="sm" label="深蓝遮罩" @click="openColor"></nax-button>

<nax-overlay v-model:show="colorShow" close-on-click color="rgba(8, 40, 90, 0.55)"></nax-overlay>
```

```uts
const colorShow = ref(false)

function openColor() {
	colorShow.value = true
}
```

### 无动画 duration=0
```uvue
<nax-button size="sm" label="立即显示" @click="openInstant"></nax-button>

<nax-overlay v-model:show="instantShow" :duration="0" close-on-click></nax-overlay>
```

```uts
const instantShow = ref(false)

function openInstant() {
	instantShow.value = true
}
```

### 事件日志
```uvue
<nax-overlay v-model:show="basicShow" close-on-click @click="onOverlayClick" @open="onOpen('basic')" @opened="onOpened('basic')" @close="onClose('basic')"></nax-overlay>
```

```uts
const basicShow = ref(false)
const logText = ref('暂无事件')

function onOverlayClick() {
	logText.value = 'click 遮罩'
}

function onOpen(name : string) {
	logText.value = name + ' open'
}

function onOpened(name : string) {
	logText.value = name + ' opened'
}

function onClose(name : string) {
	logText.value = name + ' close'
}
```

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-mask` | 遮罩色 |

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | boolean | `false` | v-model:show 控制显隐，默认 false |
| zIndex | number | `1000` | 层级，默认 1000 |
| duration | number | `280` | 淡入淡出时长 ms，默认 280；0 为无动画 |
| color | string | `''` | 遮罩颜色；空则用 --nax-color-mask（鸿蒙未传 color 时用 #000 + opacity 0.4） |
| closeOnClick | boolean | `false` | 点击遮罩是否关闭（emit update:show false），默认 false |
| customClass | string | `''` | 根节点扩展 class |
| customStyle | string | `''` | 根节点扩展 style |

## Events

| 事件 | 说明 |
|------|------|
| update:show | 显隐变更 |
| click | 点击遮罩 |
| open | 打开（进场开始） |
| opened | 打开完成 |
| close | 关闭完成（DOM 已卸载） |

## Slots

| 插槽 | 说明 |
|------|------|
| default | 叠在遮罩上的内容（如 loading）；点击内容不冒泡到遮罩 |

## 说明

1. 完整弹层（定位面板）请用 `nax-picker`；本组件只负责蒙层。
2. Dialog / ActionSheet 等仍使用 `nax-picker` 内置 mask；本组件面向自定义浮层与独立蒙层场景。
