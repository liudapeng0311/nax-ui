---
demo: alert
---

# nax-alert

> 当前版本：0.1.3

警告提示条（页面内常驻提示）。提供常用能力。

## 安装

- 插件市场：[nax-alert](https://ext.dcloud.net.cn/plugin?id=29022)

easycom 自动生效，页面直接使用 `<nax-alert />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 用法

```uvue
<nax-alert title="温馨提示" description="请先完成实名认证后再操作。"></nax-alert>

<nax-alert type="success" title="提交成功" description="我们已收到你的申请。"></nax-alert>

<nax-alert
  type="error"
  closable
  :show="alertShow"
  title="账号异常"
  description="检测到异地登录，请修改密码。"
  @close="onClose"
  @update:show="onShowChange"
></nax-alert>
```

:::

::: details 基础

```uvue
<nax-alert
	title="温馨提示"
	description="请先完成实名认证后再进行提现操作。"
></nax-alert>
```

:::

::: details 类型 type

```uvue
<nax-alert type="primary" title="主色提示" description="这是 primary 类型。"></nax-alert>
<nax-alert type="info" title="信息提示" description="这是 info 类型。"></nax-alert>
<nax-alert type="success" title="成功提示" description="操作已成功完成。"></nax-alert>
<nax-alert type="warning" title="警告提示" description="请注意相关风险。"></nax-alert>
<nax-alert type="error" title="错误提示" description="提交失败，请稍后重试。"></nax-alert>
```

:::

::: details 实心 variant=solid

```uvue
<nax-alert type="info" variant="solid" title="信息" description="实心填充样式。"></nax-alert>
<nax-alert type="success" variant="solid" title="成功" description="实心填充样式。"></nax-alert>
<nax-alert type="warning" variant="solid" title="警告" description="实心填充样式。"></nax-alert>
<nax-alert type="error" variant="solid" title="错误" description="实心填充样式。"></nax-alert>
```

:::

::: details 仅标题 / 仅描述

```uvue
<nax-alert type="info" title="只有标题"></nax-alert>
<nax-alert type="warning" description="只有描述文字，没有标题。"></nax-alert>
```

:::

::: details 无图标 / 自定义图标

```uvue
<nax-alert :show-icon="false" type="info" title="不显示图标" description="show-icon=false"></nax-alert>
<nax-alert icon="star" type="primary" title="自定义图标" description="icon=star"></nax-alert>
```

:::

::: details 居中 center

```uvue
<nax-alert
	center
	type="success"
	title="居中展示"
	description="标题与描述水平居中。"
></nax-alert>
```

:::

::: details 可关闭 closable

```uvue
<nax-alert
	v-if="showCloseA"
	closable
	type="error"
	title="账号异常"
	description="检测到异地登录，建议立即修改密码。"
	@close="onCloseA"
></nax-alert>

<nax-alert
	closable
	:show="showCloseB"
	type="warning"
	title="受控显示"
	description="使用 show + update:show 控制。"
	@close="onCloseB"
	@update:show="onShowB"
></nax-alert>

<nax-button size="sm" label="重置关闭示例" @click="resetClose"></nax-button>
```

```uts
const showCloseA = ref(true)
const showCloseB = ref(true)

function onCloseA() {
	showCloseA.value = false
}

function onCloseB() {
	// 非受控关闭：组件已自行隐藏
}

function onShowB(v: boolean) {
	showCloseB.value = v
}

function resetClose() {
	showCloseA.value = true
	showCloseB.value = true
}
```

:::

::: details 默认插槽

```uvue
<nax-alert type="info" title="自定义描述">
	<text>描述可用默认插槽自定义，例如补充链接说明文案。</text>
</nax-alert>
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-error` | 错误色 |
| `--nax-color-error-secondary` | 错误色浅底 |
| `--nax-color-info` | 信息色 |
| `--nax-color-info-secondary` | 信息色浅底 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-primary-secondary` | 主题主色浅底 |
| `--nax-color-success` | 成功色 |
| `--nax-color-success-secondary` | 成功色浅底 |
| `--nax-color-text-inverse` | 反白文字色 |
| `--nax-color-text-secondary` | 次要文字色 |
| `--nax-color-warning` | 警告色 |
| `--nax-color-warning-deep` | 警告色（加深） |
| `--nax-color-warning-secondary` | 警告色浅底 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | string | `'warning'` | `primary` 主要 \| `info` 信息 \| `success` 成功 \| `warning` 警告 \| `error` 错误（兼容 `danger`）；默认 `warning` |
| variant | string | `'light'` | `light` 浅色 \| `solid` 实心（兼容 `effect` 的 light/dark）；默认 `light` |
| effect | string | `''` | 兼容别名：`light`（对应 `light`）/ `dark`（对应 `solid`） |
| title | string | `''` | 标题 |
| description | string | `''` | 描述；也可用默认插槽 |
| closable | boolean | `false` | 是否可关闭 |
| showIcon | boolean | `true` | 是否显示左侧图标，默认 true |
| icon | string | `''` | 自定义 nax-icon 名；空则按 type 映射 |
| center | boolean | `false` | 内容是否水平居中 |
| show | boolean | `true` | 是否显示；配合 update:show |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| click | 点击主体 |
| close | 关闭 |
| update:show | 显示状态变化 |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义描述内容 |
| title | 自定义标题 |
| icon | 自定义左侧图标 |
