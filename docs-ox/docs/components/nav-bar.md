
# nax-nav-bar

> 当前版本：0.2.0

自定义顶部导航栏（需页面 `navigationStyle: custom`）。面向 uni-app x：状态栏安全区、fixed 占位、返回栈兜底、微信小程序胶囊预留。

## 安装

- 插件市场：[nax-nav-bar](https://ext.dcloud.net.cn/plugin?id=29043)

easycom 自动生效，页面直接使用 `<nax-nav-bar />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 用法
```demo demo-nav-bar
<template>
  <view class="page">
    <nax-nav-bar title="页面标题" home-url="/pages/index/index" />
    <view class="body">
      <!-- 页面内容；fixed 默认会插入占位 -->
    </view>
  </view>
</template>
```

`pages.json`：

```json
{
  "path": "pages/demo/index",
  "style": {
    "navigationStyle": "custom",
    "navigationBarTitleText": ""
  }
}
```

### 自定义右侧

```uvue
<nax-nav-bar title="详情">
  <template #right>
    <nax-icon name="search" size="22" @click="onSearch" />
  </template>
</nax-nav-bar>
```

### 仅事件、不自动返回

```uvue
<nax-nav-bar title="编辑" :auto-back="false" @back="onBack" />
```

### 默认 default
```uvue
<nax-nav-bar
	title="默认标题"
	:fixed="false"
	:safe-area-inset-top="false"
	:auto-back="false"
	@back="onBack"
></nax-nav-bar>
```

```uts
const lastBack = ref('—')

function onBack() {
	lastBack.value = 'back'
}
```

### 主色 primary
```uvue
<nax-nav-bar
	type="primary"
	title="主色导航"
	:fixed="false"
	:safe-area-inset-top="false"
	:auto-back="false"
	@back="onBack"
></nax-nav-bar>
```

### 返回文案 + 无图标
```uvue
<nax-nav-bar
	title="设置"
	back-text="关闭"
	back-icon=""
	:fixed="false"
	:safe-area-inset-top="false"
	:auto-back="false"
	@back="onBack"
></nax-nav-bar>
```

### 左对齐标题 + 无返回
```uvue
<nax-nav-bar
	title="首页风格"
	title-align="left"
	:show-back="false"
	:fixed="false"
	:safe-area-inset-top="false"
>
	<template #right>
		<nax-icon name="search" size="22"></nax-icon>
	</template>
</nax-nav-bar>
```

### 自定义中间（插槽）
```uvue
<nax-nav-bar
	:fixed="false"
	:safe-area-inset-top="false"
	:auto-back="false"
	@back="onBack"
>
	<view class="mid-tabs">
		<text class="mid-tabs__item mid-tabs__item--on">关注</text>
		<text class="mid-tabs__item">推荐</text>
	</view>
	<template #right>
		<nax-icon name="plus" size="22"></nax-icon>
	</template>
</nax-nav-bar>
```

### 沉浸 immersive（预览）
```uvue
<nax-nav-bar
	title="沉浸标题"
	type="primary"
	immersive
	:fixed="false"
	:safe-area-inset-top="false"
	:auto-back="false"
	@back="onBack"
></nax-nav-bar>
```

开启 immersive 后导航栏透明底、无底边；若同时 fixed，组件不插入占位，内容可从顶栏下方透出。

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 背景色 |
| `--nax-color-border` | 边框色 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-text-inverse` | 反白文字色 |

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | `''` | 标题文案 |
| showBack | boolean | `true` | 是否显示返回区，默认 true |
| backText | string | `''` | 返回文案（可选） |
| backIcon | string | `'chevron-left'` | 返回图标名（nax-icon），默认 chevron-left；空字符串则不显示图标 |
| backIconColor | string | `''` | 返回图标颜色；空串时跟随导航栏 type / 主题 |
| autoBack | boolean | `true` | 点击返回是否自动 navigateBack，默认 true |
| homeUrl | string | `''` | 栈底无法返回时 reLaunch 目标；空则仅 emit |
| fixed | boolean | `true` | 是否固定顶部，默认 true |
| placeholder | boolean | `true` | fixed 且非 immersive 时是否占位，默认 true |
| immersive | boolean | `false` | 沉浸：fixed 时不占位（内容可滚入顶栏下） |
| border | boolean | `true` | 底部分割线，默认 true |
| safeAreaInsetTop | boolean | `true` | 顶部状态栏安全区，默认 true |
| type | string | `'default'` | `default` 默认 \| `primary` 主要；默认 `default` |
| height | string | `'44'` | 内容行高度（纯数字按 px），默认 44 |
| zIndex | number | `980` | fixed 层级，默认 980 |
| titleAlign | string | `'center'` | `center` 居中 \| `left` 左对齐；默认 `center` |
| centerClickable | boolean | `false` | 中间区域（默认插槽）可点击；仅 Web/小程序需要（App 端无 pointer-events 限制），默认 false |
| show | boolean | `true` | 是否显示，默认 true |
| customClass | string | `''` | 根扩展 class |

## Events

| 事件 | 说明 |
|------|------|
| back | 点击返回（autoBack 前后均会触发） |

## Slots

| 插槽 | 说明 |
|------|------|
| left | 左侧扩展（在返回按钮右侧） |
| default | 中间自定义（覆盖 title） |
| right | 右侧操作区 |

## 注意

1. 页面必须 `navigationStyle: custom`，否则会与系统导航栏叠层。
2. 微信小程序会为右侧预留胶囊宽度；其它小程序无胶囊 API 时不做错误 margin。
3. 首页 / tab 页通常设 `show-back=false`，或配置 `home-url` 作为栈底出口。
4. Web/小程序端中间插槽默认不接收点击（`pointer-events: none`），需开启 `center-clickable` 并在插槽内容上自行绑定 `@click`；App 端无此限制。
