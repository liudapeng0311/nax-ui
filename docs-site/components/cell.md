---
demo: cell
---

# nax-cell / nax-cell-group

> 当前版本：0.1.5

单元格与单元格组。

## 安装

```text
uni_modules/nax-cell
```

easycom 自动生效，页面直接使用 `<nax-cell />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 用法

```uvue
<nax-cell-group title="设置">
  <nax-cell title="个人资料" is-link @click="onProfile"></nax-cell>
  <nax-cell icon="settings" title="系统设置" value="已开启" is-link></nax-cell>
  <nax-cell title="昵称" label="用于展示" value="Nax"></nax-cell>
</nax-cell-group>

<nax-cell-group title="卡片样式" inset>
  <nax-cell title="消息通知" is-link></nax-cell>
  <nax-cell title="隐私" is-link></nax-cell>
</nax-cell-group>

<!-- inset 外框：none 无边框 / horizontal 仅上下 / vertical 仅左右 -->
<nax-cell-group title="无左右边框" inset inset-border="horizontal">
  <nax-cell title="仅上下描边" is-link></nax-cell>
</nax-cell-group>
```

:::

::: details 基础

```uvue
<nax-cell-group>
	<nax-cell title="单元格" value="内容"></nax-cell>
	<nax-cell title="单元格" label="描述信息" value="内容"></nax-cell>
	<nax-cell title="单元格" value="详情" is-link @click="onCellClick('基础链接')"></nax-cell>
</nax-cell-group>
```

```uts
function onCellClick(name: string) {
	uni.showToast({ title: name, icon: 'none' })
}
```

:::

::: details 分组标题

```uvue
<nax-cell-group title="个人信息">
	<nax-cell title="昵称" value="Nax" is-link @click="onCellClick('昵称')"></nax-cell>
	<nax-cell title="手机号" value="138****0000"></nax-cell>
	<nax-cell title="个性签名" label="一句话介绍自己" value="写点什么" is-link></nax-cell>
</nax-cell-group>

<nax-cell-group title="其他设置">
	<nax-cell title="消息通知" is-link></nax-cell>
	<nax-cell title="关于我们" is-link></nax-cell>
</nax-cell-group>
```

:::

::: details 图标

```uvue
<nax-cell-group>
	<nax-cell icon="user" title="个人中心" is-link @click="onCellClick('个人中心')"></nax-cell>
	<nax-cell icon="settings" title="系统设置" value="通用" is-link></nax-cell>
	<nax-cell icon="search" title="搜索" label="全局搜索入口" is-link></nax-cell>
</nax-cell-group>
```

:::

::: details inset 圆角卡片

```uvue
<nax-cell-group title="账户" inset>
	<nax-cell title="账号安全" is-link></nax-cell>
	<nax-cell title="支付设置" is-link></nax-cell>
	<nax-cell title="隐私" value="已保护" is-link></nax-cell>
</nax-cell-group>
```

:::

::: details insetBorder 外框（inset 时）

```uvue
<nax-cell-group title="all 四边" inset inset-border="all">
	<nax-cell title="默认外框" value="all" is-link></nax-cell>
</nax-cell-group>

<nax-cell-group title="none 无外框" inset inset-border="none">
	<nax-cell title="仅圆角白底" value="none" is-link></nax-cell>
</nax-cell-group>

<nax-cell-group title="horizontal 上下" inset inset-border="horizontal">
	<nax-cell title="无左右边框" value="horizontal" is-link></nax-cell>
</nax-cell-group>

<nax-cell-group title="vertical 左右" inset inset-border="vertical">
	<nax-cell title="无上下边框" value="vertical" is-link></nax-cell>
</nax-cell-group>
```

:::

::: details 尺寸 size

```uvue
<nax-cell-group>
	<nax-cell size="sm" title="小号 sm" value="紧凑" is-link></nax-cell>
	<nax-cell size="md" title="中号 md" value="默认" is-link></nax-cell>
	<nax-cell size="lg" title="大号 lg" value="宽松" is-link></nax-cell>
</nax-cell-group>
```

:::

::: details 状态

```uvue
<nax-cell-group>
	<nax-cell title="必填项" required value="请填写" is-link></nax-cell>
	<nax-cell title="禁用" value="不可点" disabled is-link></nax-cell>
	<nax-cell title="无箭头可点" clickable @click="onCellClick('可点')"></nax-cell>
	<nax-cell title="无分割线" value="border=false" :border="false"></nax-cell>
</nax-cell-group>
```

:::

::: details 右侧插槽（开关）

```uvue
<nax-cell-group>
	<nax-cell title="消息推送" center>
		<template #right>
			<nax-switch v-model="pushOn"></nax-switch>
		</template>
	</nax-cell>
	<nax-cell title="深色模式" label="仅演示绑定" center>
		<template #right>
			<nax-switch v-model="darkSwitch"></nax-switch>
		</template>
	</nax-cell>
</nax-cell-group>
```

```uts
const pushOn = ref(true)
const darkSwitch = ref(false)
```

:::

::: details 自定义颜色

```uvue
<nax-cell-group>
	<nax-cell title="标题色" title-color="#18a058" value="主色" value-color="#18a058" is-link></nax-cell>
	<nax-cell icon="user" icon-color="#2080f0" title="图标色" value="info" is-link></nax-cell>
</nax-cell-group>
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 背景色 |
| `--nax-color-bg-hover` | 按压/悬停背景色 |
| `--nax-color-border` | 边框色 |
| `--nax-color-divider` | 分割线色 |
| `--nax-color-error` | 错误色 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-text-secondary` | 次要文字色 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | `''` | 左侧标题 |
| label | string | `''` | 标题下方说明 |
| value | string | `''` | 右侧内容 |
| icon | string | `''` | 左侧 nax-icon 名 |
| isLink | boolean | `false` | 展示右侧箭头（兼容 arrow） |
| arrow | boolean | `false` | 同 isLink（ 兼容） |
| border | boolean | `true` | 底部分割线，默认 true；组内受 cell-group.border 控制 |
| disabled | boolean | `false` | 禁用 |
| required | boolean | `false` | 标题旁必填星号 |
| center | boolean | `false` | 垂直居中（多行时） |
| clickable | boolean | `false` | 强制按压态（无箭头时也可点） |
| size | string | `'md'` | `sm` 小 \| `md` 中 \| `lg` 大 |
| iconColor | string | `''` | 左侧图标色 |
| titleColor | string | `''` | 标题色 |
| valueColor | string | `''` | 右侧值颜色 |
| customClass | string | `''` | 根节点扩展 class |

## nax-cell-group Props

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| title | string | `''` | 分组标题 |
| inset | boolean | `false` | 圆角卡片内嵌 |
| insetBorder | string | `all` | inset 外框：`all` / `none` / `horizontal` / `vertical` |
| border | boolean | `true` | 子 cell 底部分割线 |
| custom-class | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| click | 点击（disabled 不触发） |


## Slots

| 插槽 | 说明 |
|------|------|
| icon | 自定义左侧图标 |
| title | 自定义标题 |
| label | 自定义说明 |
| value | 自定义右侧值 |
| right | 右侧扩展（开关等） |
| right-icon | 右侧图标区（在箭头后） |
| default | 标题区额外内容 |

## nax-cell-group 插槽

| 名称 | 说明 |
|------|------|
| default | 放置 `nax-cell` |
| title | 自定义分组标题 |
