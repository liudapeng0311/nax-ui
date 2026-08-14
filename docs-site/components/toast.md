---
demo: toast
---

# nax-toast

> 当前版本：0.1.10

`nax-ui` 轻提示（uni-app x / uvue）。
**推荐用法：函数式调用**，业务页面不写 Toast DOM。

## 安装

- 插件市场：[nax-toast](https://ext.dcloud.net.cn/plugin?id=29074)

easycom 自动生效，页面直接使用 `<nax-toast />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 接入

### 1. 全局挂载一次宿主

在根布局或长期存活的页面挂一次（整个 App 只需一处）：

```html
<nax-toast />
```

> uni-app x 的 `App.uvue` 通常不渲染 template。请挂在自定义根布局、Tab 根页，或业务页面栈中会存活的壳页面。  
> 注意：上一页的宿主一般不会盖到当前页上，所以「全局一次」应挂在真正常驻的根布局，而不是指望页面栈底层页。

### 2. 业务页只调方法

```uts
import {
  naxToast as showNaxToast,
  hideNaxToast,
  naxToastSuccess,
  naxToastError,
  naxToastLoading
} from '@/uni_modules/nax-toast/index.uts'

showNaxToast('操作成功')
showNaxToast({ title: '保存成功', type: 'success' })
naxToastSuccess('已提交')
naxToastError('网络异常')
naxToastLoading('提交中…')
// 手动关闭（loading 常用）
hideNaxToast()
```

未挂载宿主时，会回退到 `uni.showToast`，保证基础可用。

> 微信小程序端：若当前 SFC 同时挂载 `<nax-toast />` 并导入 `naxToast`，请像上例一样给函数设置本地别名。`naxToast` 会与组件标签映射到同一个驼峰名，导致 `MP-WEIXIN` 未注册宿主组件并回退到不支持 `position` 的 `uni.showToast`。仅调用函数、不挂载宿主的业务页可继续直接导入 `naxToast`。

:::

::: details API

### naxToast(input)

| 入参 | 说明 |
|------|------|
| `string` | 等价 `{ title: string, type: 'text' }` |
| `object` | 见下表 |

| 字段 | 类型 | 默认 | 说明 |
|------|------|------|------|
| title / message | string | `''` | 文案（message 为别名） |
| type | string | `text` | `text` / `success` / `error` / `warning` / `info` / `loading` |
| icon | string | `''` | 自定义 `nax-icon` 名；空则按 type 映射 |
| duration | number | `2000` | 毫秒；`0` 不自动关闭（loading 默认 0） |
| position | string | `center` | `top` / `center` / `bottom` |
| overlay | boolean | `false` | 是否显示遮罩（loading 可设 true 防误触） |
| showIcon | boolean | `true` | 是否显示图标；`text` 类型默认无图标 |
| bg / background | string | `''` | 单次背景色（如 `#18a058` / `rgba(0,0,0,0.85)`）；空则走主题/type |

- **微信小程序**：`position: 'top'` 会依据状态栏与胶囊位置计算导航栏底部，并额外下移 `16px`，避免覆盖自定义导航栏（`MP-WEIXIN`）。

### hideNaxToast()

立即关闭当前提示。

### 快捷方法

- `naxToastSuccess(title)`
- `naxToastError(title)`
- `naxToastWarning(title)`
- `naxToastInfo(title)`
- `naxToastLoading(title?, overlay?)`

:::

::: details 基础（纯文案）

```uvue
<!-- 宿主挂载：生产建议根布局挂一次；演示页本地挂载保证可展示 -->
<nax-toast></nax-toast>
```

```uts
import {
	naxToast,
	hideNaxToast,
	naxToastSuccess,
	naxToastError,
	naxToastWarning,
	naxToastInfo,
	naxToastLoading
} from '@/uni_modules/nax-toast/index.uts'

naxToast('你好，这是一条轻提示')
```

:::

::: details 类型 type

```uvue
<nax-button type="success" label="success" @click="onSuccess"></nax-button>
<nax-button type="error" label="error" @click="onError"></nax-button>
<nax-button type="warning" label="warning" @click="onWarning"></nax-button>
<nax-button type="info" label="info" @click="onInfo"></nax-button>
```

```uts
function onSuccess() {
	naxToast({
		title: '保存成功',
		type: 'success'
	} as UTSJSONObject)
}

function onError() {
	naxToast({
		title: '提交失败',
		type: 'error'
	} as UTSJSONObject)
}

function onWarning() {
	naxToast({
		title: '请注意风险',
		type: 'warning'
	} as UTSJSONObject)
}

function onInfo() {
	naxToast({
		title: '已为你更新内容',
		type: 'info'
	} as UTSJSONObject)
}
```

:::

::: details 位置 position

```uvue
<nax-button label="top" @click="onPos('top')"></nax-button>
<nax-button label="center" @click="onPos('center')"></nax-button>
<nax-button label="bottom" @click="onPos('bottom')"></nax-button>
```

```uts
function onPos(pos : string) {
	naxToast({
		title: '位置：' + pos,
		type: 'text',
		position: pos
	} as UTSJSONObject)
}
```

:::

::: details Loading + 手动关闭

```uvue
<nax-button type="primary" label="显示 loading" @click="onLoading"></nax-button>
<nax-button label="hideNaxToast()" @click="onHide"></nax-button>
```

```uts
function onLoading() {
	naxToastLoading('提交中…', true)
	// loading 默认 duration=0 且带遮罩，需手动关闭或稍后再调 hide
	setTimeout(() => {
		hideNaxToast()
		naxToastSuccess('提交完成')
	}, 2500)
}

function onHide() {
	hideNaxToast()
}
```

:::

::: details 自定义图标 / 时长

```uvue
<nax-button label="自定义 icon" @click="onCustomIcon"></nax-button>
<nax-button label="4 秒后关闭" @click="onLong"></nax-button>
```

```uts
function onCustomIcon() {
	naxToast({
		title: '收藏成功',
		type: 'text',
		icon: 'star',
		showIcon: true
	} as UTSJSONObject)
}

function onLong() {
	naxToast({
		title: '这条会停留 4 秒',
		type: 'info',
		duration: 4000
	} as UTSJSONObject)
}
```

:::

::: details 自定义背景 bg（请用 hex）

```uvue
<nax-button label="品牌绿" @click="onCustomBg('#18a058')"></nax-button>
```

```uts
// 鸿蒙/App 请优先 hex（如 #18a058）；rgba 在端上可能失效
function onCustomBg(color : string) {
	naxToast({
		title: '自定义背景色',
		type: 'text',
		bg: color,
		color: '#ffffff',
		showIcon: false
	} as UTSJSONObject)
}
```

:::

::: details 快捷方法

```uvue
<nax-button type="success" label="naxToastSuccess" @click="onQuickSuccess"></nax-button>
<nax-button type="error" label="naxToastError" @click="onQuickError"></nax-button>
```

```uts
function onQuickSuccess() {
	naxToastSuccess('快捷成功')
}

function onQuickError() {
	naxToastError('快捷错误')
}

// 同系列：naxToastWarning('注意') / naxToastInfo('提示') / naxToastLoading('加载中', true)
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-mask` | 遮罩色 |

在 `nax-theme` 节点或全局 CSS 覆盖：

```css
.nax-theme {
  --nax-toast-bg: rgba(0, 0, 0, 0.85);
  --nax-toast-color: #ffffff;
  --nax-toast-bg-success: #18a058;
  --nax-toast-bg-error: #d03050;
  --nax-toast-bg-warning: #f0a020;
  --nax-toast-bg-info: #2080f0;
}
```

- 默认文案 / loading：半透明黑（`--nax-toast-bg`）
- success / error / warning / info：使用对应语义色底
- 单次调用优先 `bg`，覆盖主题与 type 底色
- **鸿蒙 / App**：背景请用实色 hex（如 `#18a058`）。`rgba(...)`、嵌套 `var()` 在 ucss 下可能失效


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| zIndex | number | `10090` | 层级，默认 10090 |
| customClass | string | `''` | 根节点扩展 class |


