---
demo: text
---

# nax-text

> 当前版本：0.2.0

uni-app x 文本组件。

## 安装

- 插件市场：[nax-text](https://ext.dcloud.net.cn/plugin?id=29072)

easycom 自动生效，页面直接使用 `<nax-text />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 基础用法

```uvue
<nax-text text="这是多行输入啊"></nax-text>
<nax-text type="primary" text="主题色"></nax-text>
<nax-text mode="price" text="128.5" type="error"></nax-text>
<nax-text mode="phone" format="encrypt" text="130xxxxxxxx"></nax-text>
<nax-text :lines="2" text="超出两行显示省略号……"></nax-text>
```

:::

::: details 基础用法

```uvue
<nax-text text="我用十年青春,赴你最后之约"></nax-text>
<nax-text text="带图标的文本" prefix-icon="star" type="primary"></nax-text>
<nax-text text="后缀图标" suffix-icon="arrow-right" type="secondary"></nax-text>
```

:::

::: details 主题色

```uvue
<nax-text type="default" text="default 主文案"></nax-text>
<nax-text type="primary" text="primary 主题"></nax-text>
<nax-text type="info" text="info 信息"></nax-text>
<nax-text type="success" text="success 成功"></nax-text>
<nax-text type="warning" text="warning 警告"></nax-text>
<nax-text type="error" text="error 错误"></nax-text>
<nax-text type="secondary" text="secondary 次文案"></nax-text>
<nax-text type="placeholder" text="placeholder 占位"></nax-text>
```

:::

::: details 文字尺寸

```uvue
<nax-text size="sm" text="sm 14px"></nax-text>
<nax-text size="md" text="md 16px（默认）"></nax-text>
<nax-text size="lg" text="lg 18px"></nax-text>
<nax-text size="xl" text="xl 20px"></nax-text>
<nax-text size="20" text="数字 20px"></nax-text>
```

:::

::: details 字重与装饰

```uvue
<nax-text bold text="加粗 bold"></nax-text>
<nax-text decoration="underline" text="下划线 underline" type="info"></nax-text>
<nax-text decoration="line-through" text="删除线 line-through" type="secondary"></nax-text>
```

:::

::: details 文本省略

```uvue
<nax-text
	:lines="1"
	block
	text="单行省略：这是一段很长很长的文本内容，超出一行后会显示省略号，方便列表场景使用。"
></nax-text>
<nax-text
	:lines="2"
	block
	type="secondary"
	text="两行省略：这是一段很长很长的文本内容，用于演示多行省略效果。超出两行后会显示省略号，方便卡片摘要等场景使用。再追加一些文字以确保足够长。"
></nax-text>
```

:::

::: details 内容格式化

```uvue
<nax-text mode="price" text="128.5" type="error" bold></nax-text>
<nax-text mode="phone" text="13800138000" type="info"></nax-text>
<nax-text mode="phone" format="encrypt" text="13800138000"></nax-text>
<nax-text mode="name" format="encrypt" text="张三丰"></nax-text>
<nax-text mode="date" text="1710000000"></nax-text>
<nax-text mode="date" format="yyyy-mm-dd HH:MM" text="1710000000000" type="secondary"></nax-text>
<nax-text mode="link" text="nax-ui文档" href="https://gitee.com/liusixsix/nax-ui" @click="onLinkClick"></nax-text>
```

```uts
function onLinkClick() {
	uni.showToast({
		title: '已触发 click',
		icon: 'none'
	})
}
```

:::

::: details 拨号操作

```uvue
<nax-text
	mode="phone"
	call
	type="primary"
	text="10086"
	prefix-icon="share"
	@click="onCallClick"
></nax-text>
```

```uts
function onCallClick() {
	// 点击尝试拨打电话（真机有效）
}
```

:::

::: details 块级对齐

```uvue
<nax-text block align="left" text="左对齐 left"></nax-text>
<nax-text block align="center" text="居中 center" type="primary"></nax-text>
<nax-text block align="right" text="右对齐 right" type="secondary"></nax-text>
```

:::

::: details 文本选择

```uvue
<nax-text selectable text="长按可选中复制这段文字" type="info"></nax-text>
```

:::

::: details 自定义颜色

```uvue
<nax-text color="#8a2be2" text="自定义紫色 #8a2be2"></nax-text>
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-error` | 错误色 |
| `--nax-color-info` | 信息色 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-success` | 成功色 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-text-placeholder` | 占位文字色 |
| `--nax-color-text-secondary` | 次要文字色 |
| `--nax-color-warning` | 警告色 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | string | `'default'` | `default` 默认 \| `primary` 主题色 \| `info` 信息 \| `success` 成功 \| `warning` 警告 \| `error` 错误 \| `secondary` 次要 \| `placeholder` 占位 |
| show | boolean | `true` | 是否显示 |
| text | [String, Number] | `'' as any` | 显示文案 |
| prefixIcon | string | `''` | 前置 nax-icon 名 |
| suffixIcon | string | `''` | 后置 nax-icon 名 |
| mode | string | `'text'` | 模式：`text` 文本 \| `price` 价格 \| `phone` 手机号 \| `name` 姓名 \| `date` 日期 \| `link` 链接 |
| href | string | `''` | mode=link 时的链接 |
| format | string | `''` | 格式化：phone/name 传 encrypt；date 传时间格式（默认 yyyy-mm-dd） |
| call | boolean | `false` | mode=phone 时点击是否拨号 |
| bold | boolean | `false` | 是否加粗 |
| block | boolean | `false` | 是否块级 |
| lines | number | `0` | 最大行数，>0 时超出省略；0 不限制 |
| color | string | `''` | 自定义文字色（优先于 type） |
| size | string | `'md'` | 字号：`sm`(14) \| `md`(16 默认) \| `lg`(18) \| `xl`(20) \| 数字字符串（px） |
| decoration | string | `'none'` | 装饰：`none` 无 \| `underline` 下划线 \| `line-through` 删除线 |
| align | string | `'left'` | 对齐：`left` 左对齐（默认）\| `center` 居中 \| `right` 右对齐 |
| lineHeight | string | `''` | 行高，如 22 或 22px |
| selectable | boolean | `false` | 是否可选中复制 |
| iconSize | string | `''` | 图标尺寸；默认跟随字号 |
| iconColor | string | `''` | 图标颜色；默认跟随文字色 |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| click | 点击 |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义附加内容 |
| prefix | 自定义前置区域 |
| suffix | 自定义后置区域 |
