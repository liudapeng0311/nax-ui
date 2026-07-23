# 自定义底栏 + 原生 Tab 路由（推荐方案）

本文说明演示宿主与业务接入 `nax-tabbar` 时，**如何做到多页 Tab 切换接近原生秒切**（尤其鸿蒙 / App）。

相关实现：

- 宿主路由：`common/demo-catalog.uts` → `switchDemoTab` / `hideDemoNativeTabBar`
- 原生配置：`pages.json` → `tabBar`
- 自定义 UI：`nax-tabbar`（四个主 Tab 页底部）

---

## 1. 问题：为什么「点了要等一会才切」

`nax-tabbar` **只负责 UI 与事件**，不内置路由。业务若在 `@change` 里用：

| API | 行为 | 体感 |
|-----|------|------|
| `uni.reLaunch` | 清空整栈 + **整页销毁重建** | 最慢（鸿蒙常见 0.5–1s+） |
| `uni.redirectTo` | 替换当前页，仍新建页 | 中等 |
| `uni.navigateTo` | 压栈，返回栈变乱 | 不适合 Tab |
| **`uni.switchTab`** | **原生 Tab 保活切换** | 最快 |

延迟往往不在点击事件，而在 **页面被反复销毁再创建**。

---

## 2. 推荐方案（本仓库已采用）

### 思路

1. 把「主 Tab 页」登记为 **`pages.json` 原生 `tabBar` 页面**（系统负责保活与 `switchTab`）
2. 业务 UI 继续用 **`nax-tabbar`**（图标 / 徽标 / 中间凸起 / 主题）
3. 每个 Tab 页 `onShow` 调 **`uni.hideTabBar({ animation: false })`**，隐藏原生底栏，避免双栏
4. Tab 互切统一走 **`uni.switchTab`**，禁止对 Tab 页 `reLaunch` / `redirectTo`

```text
用户点 nax-tabbar
    → @change(index)
    → uni.switchTab({ url })
    → 系统切到已保活的 Tab 页（onShow，尽量不 onLoad）
    → onShow 里 hideTabBar + 刷新主题等轻逻辑
```

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

说明：

- `list` 2–5 项；`pagePath` **不要**前导 `/`
- 图标文件建议保留（部分端校验路径）；本仓库用接近透明的占位图，因原生栏会被隐藏
- 四个主页须出现在 `pages` 数组中，且通常把首页放在 `pages[0]`

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

## 3. 注意点

### 3.1 `switchTab` 不带 query

错误：

```uts
uni.switchTab({ url: '/pages/catalog/index?tab=2' }) // 不可靠 / 常被忽略
```

正确：

- 模块单例 / 全局 store 暂存参数
- 目标页 `onShow` 读取并清空（**保活页不会再次 onLoad**）

本仓库：`setPendingCatalogTab` / `takePendingCatalogTab`。

### 3.2 子页面用 `navigateTo`

组件 demo、场景详情等 **非 Tab 页** 继续：

```uts
uni.navigateTo({ url: '/pages/components/button/index' })
```

从子页返回 Tab 页用系统返回即可；若要从子页「跳到某个 Tab」：

```uts
uni.switchTab({ url: '/pages/mine/index' })
```

（会关闭非 Tab 页栈，符合常见 App 行为。）

### 3.3 禁止事项

- 不要对 Tab 页默认 `reLaunch`（演示「重置整个宿主」除外）
- 不要 `navigateTo` 打开已登记的 Tab 页（应 `switchTab`）
- 不要只在某一个 Tab 页 `hideTabBar`，**每个 Tab 页 onShow 都要调**
- 不要假设 `hideTabBar` 可在 `App.onLaunch` 成功（当时往往还不是 Tab 页）

### 3.4 首帧双栏闪一下

原生栏可能在首帧闪现后被隐藏。缓解：

- `hideTabBar` 放在 `onShow` 尽早调用，`animation: false`
- 原生 `tabBar` 背景色与页面底栏接近
- 占位图标用透明 / 弱对比

### 3.5 平台

| 端 | 说明 |
|----|------|
| App Android / iOS / HarmonyOS | `switchTab` + `hideTabBar` 为主路径；鸿蒙收益最大 |
| Web / 小程序 | 同样适用；小程序也可用「自定义 tabBar」官方机制，思路一致 |
| 鸿蒙 | 不支持按项隐藏单个 tab item（整栏 hide 可用） |

---

## 4. 备选方案

### A. 单页 + 内容保活（无原生 tabBar）

适合 Tab 少、强依赖「一个页面内切换」：

- 一个容器页 + 多个子区块
- 显示用 CSS **`visibility`**，不要反复 `v-if` 销毁（官方对自定义 tab 内容的建议）
- `nax-tabbar` 只改 `modelValue`

优点：无原生栏闪烁；缺点：首屏包体/逻辑集中，深链与页面栈语义弱。

### B. 仅 `redirectTo`（无 tabBar）

比 `reLaunch` 快，但仍重建页面，**无法保活滚动位置与表单状态**。只适合过渡或极简 demo。

### C. 只用原生 tabBar

不要自定义 UI 时，直接用系统底栏 + `switchTab`，最简单。需要徽标凸起主题时再换 `nax-tabbar`。

---

## 5. 业务接入检查清单

- [ ] 主 Tab 页写入 `pages.json` → `tabBar.list`
- [ ] 互切统一 `uni.switchTab`（或封装一层）
- [ ] 各 Tab 页 `onShow` → `uni.hideTabBar({ animation: false })`
- [ ] 页面底部使用 `nax-tabbar`，`model-value` 与当前 Tab 一致
- [ ] 跨 Tab 传参加模块/store，并在 **onShow** 消费
- [ ] 子页 `navigateTo`；回 Tab 用返回或 `switchTab`
- [ ] 真机确认：鸿蒙 / Android 切换是否仍卡顿；是否双栏

---

## 6. 与组件文档的关系

- `nax-tabbar` 组件说明：`uni_modules/nax-tabbar/readme.md`
- 组件清单：`docs/component-inventory.md`
- 压窗盖住 tabBar：`docs/popup-window.md`（原生栏隐藏后，盖住的是自定义 `nax-tabbar` 层级）

## 7. 重 Tab 首开：先出页，再挂内容

正确模型：

```text
点击 Tab → switchTab 立刻切到目标页（轻页壳）
         → 页内 loading
         → onReady 后挂重列表
```

不要把 50+ `nax-cell` 放进首帧与 `switchTab` 抢时间；渲染慢应表现为**页内加载**，而不是**点了半天才跳过去**。

组件 Tab（`pages/catalog/index`）实现：

1. 首屏只挂 nav / search / tabs / tabbar + `nax-loading`
2. `onReady` + `setTimeout(0)` 后再挂列表
3. 鸿蒙列表更重：先约 12 条再补全（`APP-HARMONY`）
4. 列表字段扁平化为 string 数组；`demoComponentList` 模块级缓存

二次进入同一 Tab 走系统保活，一般不再走首挂路径。
