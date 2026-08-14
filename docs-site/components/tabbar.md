---
demo: tabbar
---

# nax-tabbar

> 当前版本：0.1.8

自定义底部标签栏（非 pages.json 原生 tabBar）。面向 uni-app x：字体图标优先、轻量徽标、fixed 占位与安全区。

## 安装

- 插件市场：[nax-tabbar](https://ext.dcloud.net.cn/plugin?id=29069)

easycom 自动生效，页面直接使用 `<nax-tabbar />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 用法

```uvue
<template>
  <view class="page">
    <scroll-view class="body" scroll-y>
      <!-- 页面内容 -->
    </scroll-view>
    <nax-tabbar v-model="tab" :list="tabs" @change="onChange" @click="onClick" />
  </view>
</template>

<script setup lang="uts">
const tab = ref(0)
const tabs = [
  { text: '首页', icon: 'home' },
  { text: '发现', icon: 'search', badge: 12 },
  { text: '发布', icon: 'plus', midButton: true },
  { text: '消息', icon: 'heart', dot: true },
  { text: '我的', icon: 'user' }
]

function onChange(index: number) {
  console.log('change', index)
}

function onClick(index: number) {
  // 重复点同一项也会触发，可做「回顶」等
}
</script>
```

> 路由切换由业务处理：本组件只负责 UI 选中态与事件，不自动 `switchTab` / `reLaunch`。

:::

::: details 基础（4 项）

```uvue
<nax-tabbar
	v-model="current"
	:list="mainList"
	@change="onMainChange"
	@click="onMainClick"
></nax-tabbar>

<nax-button size="sm" label="选中 0" @click="setTab(0)"></nax-button>
<nax-button size="sm" label="消息+1" @click="incBadge"></nax-button>
```

```uts
const current = ref(0)
const msgBadge = ref(5)
const lastEvent = ref('')

const mainList = computed((): any[] => {
	return [
		{ text: '首页', icon: 'home' },
		{ text: '发现', icon: 'search' },
		{ text: '消息', icon: 'heart', badge: msgBadge.value },
		{ text: '我的', icon: 'user', dot: true }
	] as any[]
})

function setTab(index : number) {
	current.value = index
}

function incBadge() {
	msgBadge.value = msgBadge.value + 1
}

function onMainChange(index : number) {
	lastEvent.value = 'change → ' + index.toString()
}

function onMainClick(index : number) {
	lastEvent.value = 'click → ' + index.toString()
}
```

:::

::: details 非固定 / 无安全区预览

```uvue
<nax-tabbar
	:model-value="inlineTab"
	:list="inlineList"
	:fixed="false"
	:placeholder="false"
	:safe-area-inset-bottom="false"
	@update:model-value="onInlineUpdate"
	@change="onInlineChange"
></nax-tabbar>
```

```uts
const inlineTab = ref(0)

const inlineList = [
	{ text: '首页', icon: 'home' },
	{ text: '分类', icon: 'more' },
	{ text: '购物', icon: 'star' },
	{ text: '我的', icon: 'user' }
]

function onInlineUpdate(index : number) {
	inlineTab.value = index
}

function onInlineChange(index : number) {
	// index
}
```

:::

::: details 中间凸起 + 禁用项

```uvue
<nax-tabbar
	:model-value="midTab"
	:list="midList"
	:fixed="false"
	:placeholder="false"
	:safe-area-inset-bottom="false"
	@update:model-value="onMidUpdate"
	@change="onMidChange"
></nax-tabbar>
```

```uts
const midTab = ref(2)

const midList = [
	{ text: '首页', icon: 'home' },
	{ text: '动态', icon: 'image' },
	{ text: '发布', icon: 'plus', midButton: true },
	{ text: '收藏', icon: 'star', disabled: true },
	{ text: '我的', icon: 'user' }
]

function onMidUpdate(index : number) {
	midTab.value = index
}

function onMidChange(index : number) {
	// index
}
```

:::

::: details 自定义选中色

```uvue
<nax-tabbar
	:model-value="colorTab"
	:list="colorList"
	active-color="#2080f0"
	inactive-color="#a0a0a8"
	@update:model-value="onColorUpdate"
></nax-tabbar>
```

```uts
const colorTab = ref(0)

const colorList = [
	{ text: '首页', icon: 'home' },
	{ text: '搜索', icon: 'search', badge: 3 },
	{ text: '设置', icon: 'settings' }
]

function onColorUpdate(index : number) {
	colorTab.value = index
}
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 背景色 |
| `--nax-color-border` | 边框色 |
| `--nax-color-error` | 错误色 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-primary-deep` | 主题主色（加深） |
| `--nax-color-text-secondary` | 次要文字色 |
| `--nax-opacity-disabled` | 禁用透明度 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | number | `0` | 当前选中下标（v-model） |
| list | array | `() => [] as any[]` | 项列表（text/name、icon/selectedIcon、iconPath/selectedIconPath、badge/dot、disabled、midButton、pagePath） |
| fixed | boolean | `true` | 是否 fixed 贴底，默认 true |
| placeholder | boolean | `true` | fixed 时是否占位，默认 true |
| border | boolean | `true` | 顶部分割线，默认 true |
| safeAreaInsetBottom | boolean | `true` | 底部安全区，默认 true |
| activeColor | string | `''` | 选中色；空则 --nax-color-primary |
| inactiveColor | string | `''` | 未选中色；空则 --nax-color-text-secondary |
| iconSize | string | `'22'` | `sm` 小 \| `md` 中 \| `lg` 大 或数字（px）；默认 22 |
| height | string | `'50'` | 栏内容高度（纯数字按 px），默认 50 |
| zIndex | number | `98` | fixed 层级，默认 98 |
| badgeMax | number | `99` | 徽标数字上限，默认 99 |
| show | boolean | `true` | 是否显示，默认 true |
| customClass | string | `''` | 根扩展 class |

## list 项字段

| 字段 | 说明 |
|------|------|
| text / name / label | 文案 |
| icon / iconName | 未选中字体图标名（`nax-icon`） |
| selectedIcon / activeIcon | 选中字体图标名；缺省回退 `icon` |
| iconPath | 未选中图片路径 |
| selectedIconPath / activeIconPath | 选中图片路径 |
| badge / count | 数字或文本徽标 |
| dot / isDot | 红点 |
| disabled | 禁用 |
| midButton / mid | 中间凸起主按钮 |
| pagePath | 业务自用路由字段（组件不导航） |

**图标优先级：** 配置了图片路径 → `image`；否则 `nax-icon` 字体图标（性能更优）。


## Events

| 事件 | 说明 |
|------|------|
| update:modelValue | 选中下标变化 |
| change | 选中变化（number 下标） |
| click | 点击项（number 下标；含重复点同一项） |

## 说明

- 本组件是 **自定义 tab 栏 UI**，可在任意页面使用；**不内置** `switchTab` / `reLaunch`。

- **切勿**对主 Tab 页默认 `reLaunch`（整页重建，鸿蒙/App 上可感知数百毫秒～1s 延迟）。
- 单页方案：同一容器内多区块用 CSS `visibility` 保活，避免反复 `v-if` 销毁。


## 自定义底栏 + 原生 Tab 路由（推荐方案）

### 推荐方案

1. 把「主 Tab 页」登记为 **`pages.json` 原生 `tabBar` 页面**（系统负责保活与 `switchTab`）
2. 业务 UI 继续用 **`nax-tabbar`**（图标 / 徽标 / 中间凸起 / 主题）
3. 每个 Tab 页 `onShow` 调 **`uni.hideTabBar({ animation: false })`**，隐藏原生底栏，避免双栏
4. Tab 互切统一走 **`uni.switchTab`**，禁止对 Tab 页 `reLaunch` / `redirectTo`

### 配置示例（pages.json）

```json
{
  "tabBar": {
    "color": "#767c82",
    "selectedColor": "#18a058",
    "backgroundColor": "#ffffff",
    "borderStyle": "black",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "static/tabbar/blank.png",
        "selectedIconPath": "static/tabbar/blank-active.png"
      },
      {
        "pagePath": "pages/catalog/index",
        "text": "组件",
        "iconPath": "static/tabbar/blank.png",
        "selectedIconPath": "static/tabbar/blank-active.png"
      }
    ]
  }
}
```

### 路由封装示例

```uts
export function demoTabPaths() : string[] {
	return [
		'/pages/index/index',
		'/pages/catalog/index',
		'/pages/scenes/index',
		'/pages/mine/index'
	] as string[]
}

export function hideDemoNativeTabBar() {
	// 仅 Tab 页可调；非 Tab 页会 fail（HBuilderX ≥ 4.23）
	uni.hideTabBar({
		animation: false
	})
}

export function switchDemoTab(index : number) {
	const paths = demoTabPaths()
	if (index < 0 || index >= paths.length) {
		return
	}
	uni.switchTab({
		url: paths[index]
	})
}
```

### 页面侧

```uvue
<template>
  <view class="page-root">
    <!-- 内容区 -->
    <nax-tabbar :model-value="0" :list="tabList" @change="onTabChange" />
  </view>
</template>

<script setup lang="uts">
function onTabChange(index : number) {
	if (index == 0) return
	switchDemoTab(index)
}

onShow(() => {
	hideDemoNativeTabBar()
})
</script>
```

每个主 Tab 页都要挂 `nax-tabbar`（或抽公共 layout），`model-value` 对应当前下标。

---
