# nax-tabbar

自定义底部标签栏（非 pages.json 原生 tabBar）。面向 uni-app x：字体图标优先、轻量徽标、fixed 占位与安全区。

## 用法

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

## Props

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|
| modelValue | number | `0` | 当前选中下标（v-model） |
| list | array | `[]` | 标签项列表 |
| fixed | boolean | `true` | 是否固定在底部 |
| placeholder | boolean | `true` | fixed 时是否插入等高占位 |
| border | boolean | `true` | 顶部分割线 |
| safeAreaInsetBottom | boolean | `true` | 底部安全区（App JS / Web·小程序 CSS env） |
| activeColor | string | `''` | 选中色；空则主题主色 |
| inactiveColor | string | `''` | 未选中色；空则次要文字色 |
| iconSize | string | `'22'` | `sm`/`md`/`lg` 或数字 px |
| height | string | `'50'` | 栏内容高度（不含安全区） |
| zIndex | number | `98` | fixed 层级 |
| badgeMax | number | `99` | 数字徽标上限 |
| show | boolean | `true` | 是否显示 |
| customClass | string | `''` | 根扩展 class |

### list 项字段

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

## 事件

| 事件 | 参数 | 说明 |
|------|------|------|
| update:modelValue | number | v-model |
| change | number | 选中下标变化 |
| click | number | 点击项（含重复点击同一项） |

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

## 依赖

- `nax-icon`
- `nax-ui-theme`（可选，提供统一 token）

## 与原生 tabBar

- 本组件是 **自定义 tab 栏 UI**，可在任意页面使用；**不内置** `switchTab` / `reLaunch`。
- **多页秒切（推荐）**：`pages.json` 登记原生 `tabBar` → 业务用 `uni.switchTab` 互切 → 各 Tab 页 `uni.hideTabBar` → 底部渲染本组件。
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
