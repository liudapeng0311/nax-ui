
# nax-card

> 当前版本：0.1.4

内容卡片。标题 / 额外区 / 封面 / 页脚，主题 token 背景与边框。

## 安装

```text
uni_modules/nax-card
```

easycom 自动生效，页面直接使用 `<nax-card />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 用法
```demo demo-card
<nax-card title="标题" extra="更多">
  <text>正文内容</text>
</nax-card>

<nax-card title="带页脚" :show-footer="true" segmented>
  <text>正文</text>
  <template #footer>
    <nax-button size="sm" label="操作"></nax-button>
  </template>
</nax-card>
```

### 基础
```uvue
<nax-card title="基础卡片" extra="更多">
	<text>用卡片承载一段说明、列表摘要或操作入口。</text>
</nax-card>
```

### 仅正文
```uvue
<nax-card>
	<text>没有标题时，正文自动吃掉上下内边距，适合纯内容块。</text>
</nax-card>
```

### 尺寸 size
```uvue
<nax-card size="sm" title="小号 sm" extra="sm">
	<text>更紧凑的内边距</text>
</nax-card>

<nax-card size="md" title="中号 md" extra="md">
	<text>默认档</text>
</nax-card>

<nax-card size="lg" title="大号 lg" extra="lg">
	<text>更宽松</text>
</nax-card>
```

### 分割线 segmented
```uvue
<nax-card title="订单摘要" extra="详情" segmented :show-footer="true">
	<text>商品合计 ¥128.00</text>
	<text>含运费 ¥8.00</text>
	<template #footer>
		<nax-button type="primary" size="sm" label="去支付" @click="onPay"></nax-button>
	</template>
</nax-card>
```

```uts
function onPay() {
	uni.showToast({ title: '去支付', icon: 'none' })
}
```

### 封面 cover
```uvue
<nax-card title="风景推荐" extra="2.3k" :show-cover="true" :show-footer="true" segmented>
	<template #cover>
		<view class="cover"><text>Cover</text></view>
	</template>
	<text>周末短途：湖边步道与日落观景点。</text>
	<template #footer>
		<nax-space size="sm">
			<nax-space-item>
				<nax-button size="sm" label="收藏" @click="onStar"></nax-button>
			</nax-space-item>
			<nax-space-item>
				<nax-button type="primary" size="sm" label="查看" @click="onView"></nax-button>
			</nax-space-item>
		</nax-space>
	</template>
</nax-card>
```

```uts
function onStar() {
	uni.showToast({ title: '已收藏', icon: 'none' })
}

function onView() {
	uni.showToast({ title: '查看', icon: 'none' })
}
```

### 可点击 hoverable
```uvue
<nax-card title="设置项入口" hoverable @click="onCardClick">
	<template #extra>
		<nax-icon name="chevron-right" size="18" color="var(--nax-color-text-secondary, #767c82)"></nax-icon>
	</template>
	<text>开启 hoverable 后有按压反馈</text>
</nax-card>
```

```uts
function onCardClick() {
	uni.showToast({ title: '卡片点击', icon: 'none' })
}
```

### 无边框
```uvue
<nax-card title="无边框" :bordered="false">
	<text>bordered=false，适合嵌在已有面板里</text>
</nax-card>
```

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 背景色 |
| `--nax-color-bg-hover` | 按压/悬停背景色 |
| `--nax-color-border` | 边框色 |
| `--nax-color-divider` | 分割线色 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-text-secondary` | 次要文字色 |

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | `''` | 标题 |
| extra | string | `''` | 右侧额外文案 |
| bordered | boolean | `true` | 是否显示边框，默认 true |
| hoverable | boolean | `false` | 是否开启按压反馈 |
| size | string | `'md'` | `sm` 小 \| `md` 中 \| `lg` 大（内边距档位）；默认 `md` |
| segmented | boolean | `false` | 页头/页脚与正文间是否画分割线，默认 false |
| showCover | boolean | `false` |  |
| showFooter | boolean | `false` |  |
| showHeader | boolean | `false` |  |
| customClass | string | `''` | 根节点扩展 class |

## Events

| 事件 | 说明 |
|------|------|
| click | 点击卡片 |

## Slots

| 插槽 | 说明 |
|------|------|
| default | 正文 |
| header | 自定义整块页头（覆盖 title/extra） |
| title | 自定义标题 |
| extra | 自定义右侧区 |
| cover | 封面（页头上方） |
| footer | 页脚 |
