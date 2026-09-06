
# nax-popup

> 当前版本：0.2.5

压窗屏 / 页面级弹层。
> **压窗屏**：遮罩与内容能盖住 `pages.json` 配置的**原生导航栏**和**底部 tabBar**。  
> 官方能力来源：uni-app x [`dialogPage`](https://doc.dcloud.net.cn/uni-app-x/api/dialog-page.html)（HBuilderX 4.31+）。

## 安装

- 插件市场：[nax-popup](https://ext.dcloud.net.cn/plugin?id=29054)

easycom 自动生效，页面直接使用 `<nax-popup />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 安装与注册
1. 放入 `uni_modules/nax-popup`（依赖 `nax-picker`、`nax-ui-theme`）。  
2. **注册内置 host 页**（使用简易 title/content 或默认 window 模式时必须）：

```json
{
  "path": "uni_modules/nax-popup/pages/host/index",
  "style": {
    "navigationStyle": "custom",
    "navigationBarTitleText": "",
    "app-plus": {
      "backgroundColor": "transparent",
      "background": "transparent"
    },
    "app-harmony": {
      "backgroundColor": "transparent"
    },
    "h5": {
      "backgroundColor": "transparent"
    }
  }
}
```
3. **小程序端：页面挂一次 `<nax-popup />`**（空标签、不传属性即可）。微信小程序不支持官方 `dialogPage` 压窗能力（见下方平台能力矩阵），弹层需降级为页面内渲染；这个标签就是命令式调用时的弹层容器，页面挂一次即可复用。

### 命令式：压窗屏
```uts
import {
  openNaxPopup,
  closeNaxPopup,
  naxPopupSupportsWindowCover
} from '@/uni_modules/nax-popup/index.uts'

// 1) 内置简易面板（App/Web 真压窗；小程序需挂宿主后降级）
openNaxPopup({
  title: '提示',
  content: '遮罩会盖住导航栏与 tabBar（App/Web）',
  position: 'center', // center | bottom | left | right
  maskClosable: true
})

// 2) 打开业务自定义 dialog 页（推荐复杂 UI）
openNaxPopup({
  url: '/pages/components/popup/demo-dialog',
  animationType: 'fade-in'
})

// 3) 强制页面级（全端一致，不压窗）
openNaxPopup({
  mode: 'page',
  title: '页面级',
  content: '不盖原生栏'
})

closeNaxPopup()
```

### options

`dialogPage` 是独立页面，无法继承触发页的主题 class。内置 host 需要同步暗色主题时，传入当前主题 class：

```uts
openNaxPopup({
  title: '提示',
  content: '深色主题会同步到内置 host',
  themeClass: 'nax-theme-dark'
})
```

| 字段 | 类型 | 默认 | 说明 |
|------|------|------|------|
| url | string | 内置 host | 自定义 dialog 页面路径 |
| title / content | string | '' | 内置 host 文案 |
| position | string | center | center / bottom / left / right |
| mode | string | auto | auto / window / page |
| mask | boolean | true | 遮罩 |
| maskClosable | boolean | true | 点遮罩关闭 |
| round | boolean | true | 圆角 |
| width / height | string | '' | 面板尺寸 |
| zIndex | number | 10090 | 页面级层级 |
| duration | number | 280 | 动画 ms |
| themeClass | string | '' | 应用于内置 dialogPage host 的主题 class，例如 `nax-theme-dark` |
| animationType | string | fade-in | dialogPage 动画 |
| animationDuration | number | 280 | dialogPage 动画时长 |
| disableEscBack | boolean | false | 禁 ESC 关闭 |
| triggerParentHide | boolean | false | 是否触发父页 onHide |

`mode`：

- `auto`：能压窗用 window，否则 page  
- `window`：强制 dialogPage；不支持则 warn 并降级 page  
- `page`：强制页面宿主（全端不盖原生栏）

### 声明式：页面级插槽
```demo demo-popup
<nax-button label="打开" @click="show = true"></nax-button>
<nax-popup v-model:show="show" position="bottom">
  <view class="panel">
    <text>自定义内容（页面级，不盖原生栏）</text>
  </view>
</nax-popup>
```

与 `nax-picker` 类似，适合自定义导航页或可接受不盖原生栏的场景。

### 自定义 dialog 页模板（App/Web 压窗）
```uvue
<!-- pages/xxx/my-dialog.uvue -->
<template>
  <view class="wrap" @click="close">
    <view class="mask"></view>
    <view class="panel" @click.stop>
      <!-- 业务内容 -->
    </view>
  </view>
</template>
<script setup lang="uts">
function close() {
  // #ifdef APP-ANDROID || APP-IOS || APP-HARMONY || WEB
  uni.closeDialogPage({})
  // #endif
}
</script>
<style>
.wrap { position: absolute; left:0; top:0; right:0; bottom:0; }
.mask { position: absolute; left:0; top:0; right:0; bottom:0; background-color: rgba(0,0,0,0.4); }
</style>
```

pages.json 注册该页，`navigationStyle: custom`，背景透明；再：

```uts
openNaxPopup({ url: '/pages/xxx/my-dialog' })
```

### 判断当前环境是否支持压窗
```uts
import { naxPopupSupportsWindowCover } from '@/uni_modules/nax-popup/index.uts'

// 当前环境是否支持真·压窗（dialogPage）？
// App / Web：支持，可盖住原生导航栏与 tabBar
// 微信小程序等：不支持，组件已自动降级为页面级弹层
const supported = naxPopupSupportsWindowCover()
```

### 压窗 · 内置 host（title/content）
```uvue
<nax-button type="primary" label="居中压窗" @click="openWindowCenter"></nax-button>
<nax-button size="sm" label="底部" @click="openWindowBottom"></nax-button>
<nax-button size="sm" label="mode=window" @click="openForceWindow"></nax-button>
```

```uts
function openWindowCenter() {
	openNaxPopup({
		title: '压窗屏',
		content: 'App/Web 下遮罩应盖住导航栏。点遮罩或关闭按钮退出。',
		position: 'center',
		maskClosable: true
	})
}

function openWindowBottom() {
	openNaxPopup({
		title: '底部压窗',
		content: 'position=bottom 的内置 host 面板。',
		position: 'bottom',
		maskClosable: true
	})
}

function openForceWindow() {
	openNaxPopup({
		mode: 'window',
		title: '强制 window',
		content: 'mode=window：不支持的端会 warn 并尝试页面宿主降级。',
		position: 'center'
	})
}
```

### 压窗 · 自定义 dialog 页
```uvue
<nax-button type="info" label="打开 demo-dialog 页" @click="openCustomDialog"></nax-button>
```

```uts
// 复杂 UI 推荐自建透明页 + openNaxPopup({ url })；
// animationType 建议 none，进退场动画写在 dialog 页内
function openCustomDialog() {
	openNaxPopup({
		url: '/pages/components/popup/demo-dialog',
		animationType: 'none'
	})
}
```

### 页面级 · 不压窗（全端一致）
```uvue
<nax-button label="mode=page API" @click="openPageMode"></nax-button>
<nax-button label="声明式插槽" @click="openDeclarative"></nax-button>

<nax-popup v-model:show="declShow" position="bottom">
	<view class="demo-panel">
		<text class="demo-panel__title">声明式 nax-popup</text>
		<nax-button size="sm" type="primary" label="关闭" @click="declShow = false"></nax-button>
	</view>
</nax-popup>
```

```uts
const declShow = ref(false)

function openPageMode() {
	openNaxPopup({
		mode: 'page',
		title: '页面级 API',
		content: 'mode=page：全端走页面宿主，不盖原生栏。',
		position: 'center'
	})
}

function openDeclarative() {
	declShow.value = true
}
```

### 关闭
```uvue
<nax-button size="sm" label="closeNaxPopup()" @click="onCloseApi"></nax-button>
```

```uts
function onCloseApi() {
	closeNaxPopup()
}
```

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 背景色 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-text-inverse` | 反白文字色 |
| `--nax-color-text-secondary` | 次要文字色 |

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | boolean | `false` | v-model:show 声明式显隐 |
| title | string | `''` | 简易标题（无插槽时） |
| content | string | `''` | 简易内容 |
| position | string | `'center'` | `center` 居中 \| `bottom` 底部 \| `left` 左侧 \| `right` 右侧 |
| mask | boolean | `true` | 遮罩 |
| maskClosable | boolean | `true` | 点遮罩关闭 |
| closeOnMask | boolean | `true` | 点遮罩关闭（兼容命名，等价 `maskClosable`） |
| closeOnClickOverlay | boolean | `true` | 点遮罩关闭（兼容命名，等价 `maskClosable`） |
| round | boolean | `true` | 圆角 |
| width | string | `''` | 宽度 |
| height | string | `''` | 高度 |
| zIndex | number | `10090` | 层级 |
| duration | number | `280` | 动画 ms |
| customClass | string | `''` | 根 class |

## Events

| 事件 | 说明 |
|------|------|
| update:show | 声明式显隐（v-model:show） |
| open | 弹层打开 |
| opened | 弹层打开动画结束 |
| close | 弹层关闭 |
| click-mask | 点击遮罩 |

## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义面板 |

## 平台能力矩阵

| 端 | 真·压窗（盖原生导航栏 + tabBar） | 实现方式 | 说明 |
|----|----------------------------------|----------|------|
| **App Android** | ✅ | `uni.openDialogPage` | HX ≥ 4.31 |
| **App iOS** | ✅ | `uni.openDialogPage` | HX ≥ 4.31 |
| **App HarmonyOS** | ✅ | `uni.openDialogPage` | HX ≥ 4.61 |
| **Web** | ✅ | `uni.openDialogPage` | HX ≥ 4.31 |
| **微信小程序** | ❌ | 页面级 `nax-picker` 降级 | 官方 **不支持** dialogPage |

### 为什么小程序做不到真压窗？

1. uni-app x **微信小程序端不提供** `openDialogPage` / `closeDialogPage`。  
2. 页面内 `position: fixed` 组件（含 `nax-picker` / `page-container`）只能盖住**页面内容区**，盖不住原生导航栏与原生 tabBar。  
3. 业务若必须全屏遮罩，请改用：
   - `navigationStyle: custom` 自定义导航栏；和/或
   - 自定义 tabBar（非原生 tabBar）；或
   - 系统级 `uni.showModal`（样式不可完全自定义）。

检测：

```uts
import { naxPopupSupportsWindowCover } from '@/uni_modules/nax-popup/index.uts'

if (naxPopupSupportsWindowCover()) {
  // App / Web：可压窗
} else {
  // 小程序：仅页面级
}
```

## 与 nax-picker / nax-dialog 的关系

| 组件 | 定位 | 能否盖原生栏 |
|------|------|--------------|
| `nax-picker` | 页面级通用弹出容器（插槽） | ❌ |
| `nax-dialog` | 居中确认框（页面级） | ❌ |
| **`nax-popup`** | 压窗屏 API + 简易 host + 页面级声明式 | App/Web ✅；小程序 ❌（降级） |

复杂自定义 UI：

- **不需要盖原生栏** → 继续用 `nax-picker` 声明式插槽。  
- **需要盖原生栏（App/Web）** → `openNaxPopup({ url: '/pages/你的透明弹层页' })`，自己写 dialog 页。  
- **简易文案面板** → `openNaxPopup({ title, content })` 走内置 host。

## 已知限制

1. dialogPage **不能把 Vue 插槽跨页传递**；复杂 UI 请用独立 dialog 页 + `url`。  
2. 小程序无法真压窗，库内已降级并 warn，请业务按上表改造导航/tabBar。  
3. 内置 host 仅为简易 title/content，不承担复杂表单。  
4. tabBar 页上 dialogPage 在 App 切换 tab 时可能保持（官方行为）；Web 会随 tab 隐藏/恢复。
