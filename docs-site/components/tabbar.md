---
demo: tabbar
---

# nax-tabbar

> 当前版本：0.1.7（见 `changelog.md`）

自定义底部标签栏（非 pages.json 原生 tabBar）。面向 uni-app x：字体图标优先、轻量徽标、fixed 占位与安全区。

## 安装

```text
uni_modules/nax-tabbar
```

easycom 自动生效，页面直接使用 `<nax-tabbar />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 用法

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

### 事件

| 事件 | 参数 | 说明 |
|------|------|------|
| update:modelValue | number | v-model |
| change | number | 选中下标变化 |
| click | number | 点击项（含重复点击同一项） |

### 主题 Token

- `--nax-color-bg` / `--nax-color-border`
- `--nax-color-primary` / `--nax-color-primary-deep`
- `--nax-color-text-secondary`
- `--nax-color-error`
- `--nax-font-size-xs`

### 与原生 tabBar

- 本组件是 **自定义 tab 栏 UI**，可在任意页面使用；**不内置** `switchTab` / `reLaunch`。
- **多页秒切（推荐）**：`pages.json` 登记原生 `tabBar` → 业务用 `uni.switchTab` 互切 → 各 Tab 页 `uni.hideTabBar` → 底部渲染本组件。
- **切勿**对主 Tab 页默认 `reLaunch`（整页重建，鸿蒙/App 上可感知数百毫秒～1s 延迟）。
- 单页方案：同一容器内多区块用 CSS `visibility` 保活，避免反复 `v-if` 销毁。

### 自定义底栏 + 原生 Tab 路由（推荐方案）

### 推荐方案（本仓库已采用）

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
| iconSize | string | `'22'` | 图标尺寸（sm/md/lg 或数字 px），默认 22 |
| height | string | `'50'` | 栏内容高度（纯数字按 px），默认 50 |
| zIndex | number | `98` | fixed 层级，默认 98 |
| badgeMax | number | `99` | 徽标数字上限，默认 99 |
| show | boolean | `true` | 是否显示，默认 true |
| customClass | string | `''` | 根扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| update:modelValue | 选中下标变化 |
| change | 选中变化（number 下标） |
| click | 点击项（number 下标；含重复点同一项） |

