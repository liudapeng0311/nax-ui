
# nax-transition

> 当前版本：0.1.3

uni-app x 轻量进退场过渡组件。用 class + CSS transition 实现，供遮罩、弹层、选择器等复用。

## 安装

- 插件市场：[nax-transition](https://ext.dcloud.net.cn/plugin?id=29018)

easycom 自动生效，页面直接使用 `<nax-transition />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 基础用法
```demo demo-transition
<nax-button label="切换" @click="visible = !visible"></nax-button>

<nax-transition :show="visible" name="slide-up">
  <view class="panel">
    <text>从下往上</text>
  </view>
</nax-transition>
```

### 预设 name
```uvue
<nax-transition
	:show="visible"
	:name="currentName"
	:duration="duration"
	@before-enter="onEvent('before-enter')"
	@after-enter="onEvent('after-enter')"
	@before-leave="onEvent('before-leave')"
	@after-leave="onEvent('after-leave')"
>
	<view class="card">
		<text>过渡内容</text>
	</view>
</nax-transition>

<nax-button type="primary" :label="visible ? '隐藏' : '显示'" @click="toggle"></nax-button>
```

```uts
const visible = ref(true)
const currentName = ref('fade')
const duration = ref(280)
const lastEvent = ref('')

// 可选预设：fade / slide-up / slide-down / slide-left / slide-right / zoom / fade-up
function toggle() {
	visible.value = !visible.value
}

function pickName(name : string) {
	currentName.value = name
	// 切换预设时重新播一次，便于对比
	visible.value = false
	setTimeout(() => {
		visible.value = true
	}, 40)
}

function onEvent(name : string) {
	lastEvent.value = name
}
```

### 时长 duration
```uvue
<nax-transition :show="visible" :name="currentName" :duration="duration">
	<!-- 内容 -->
</nax-transition>
```

```uts
const duration = ref(280)

function setDuration(v : number) {
	duration.value = v
}

// 0 表示无动画
```

### 底部面板（slide-up 场景）
```uvue
<nax-transition :show="sheetShow" name="fade" :duration="280" @after-leave="onSheetGone">
	<view class="sheet-mask" @click="closeSheet"></view>
</nax-transition>
<nax-transition :show="sheetShow" name="slide-up" :duration="280" @after-leave="onSheetGone">
	<view class="sheet-panel">
		<text>底部面板：遮罩 fade + 面板 slide-up</text>
		<nax-button label="关闭" @click="closeSheet"></nax-button>
	</view>
</nax-transition>
```

```uts
const sheetShow = ref(false)
const sheetMounted = ref(false)
let sheetLeaveCount = 0

function openSheet() {
	sheetLeaveCount = 0
	sheetMounted.value = true
	// 下一帧再 show，确保容器已挂载
	setTimeout(() => {
		sheetShow.value = true
	}, 20)
}

function closeSheet() {
	sheetShow.value = false
}

function onSheetGone() {
	// mask + panel 各触发一次 after-leave
	sheetLeaveCount++
	if (sheetLeaveCount >= 2 && !sheetShow.value) {
		sheetMounted.value = false
		sheetLeaveCount = 0
	}
}
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | boolean | `false` | 是否显示 |
| name | string | `'fade'` | 动画预设：`fade` 淡入淡出（默认）\| `slide-up` 上滑 \| `slide-down` 下滑 \| `slide-left` 左滑 \| `slide-right` 右滑 \| `zoom` 缩放 \| `fade-up` 淡入上滑 |
| duration | number | `280` | 时长（ms），默认 280 |
| appear | boolean | `false` | 首次挂载且 show 时是否播放进场动画，默认 false |
| timingFunction | string | `'ease-out'` | 缓动，默认 ease-out |
| customClass | string | `''` | 根节点扩展 class |

## Events

| 事件 | 说明 |
|------|------|
| before-enter | 进场开始 |
| after-enter | 进场结束 |
| before-leave | 退场开始 |
| after-leave | 退场结束（DOM 已卸载） |

## Slots

| 插槽 | 说明 |
|------|------|
| default | 需要过渡的内容 |

## 说明

- 关闭时会等动画播完再卸载节点，避免闪断
- 布局（如底部贴边、全屏遮罩）由外层容器负责，本组件只负责进退场
