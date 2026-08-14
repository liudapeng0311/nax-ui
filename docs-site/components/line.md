---
demo: line
---

# nax-line

> 当前版本：0.1.5

纯线条（布局分隔）。围绕常见布局场景 做了主题 token、粗细阶梯、方向命名与间距语义优化。
带文案的分割线请用后续 `nax-divider`，本组件只画线。

## 安装

- 插件市场：[nax-line](https://ext.dcloud.net.cn/plugin?id=29040)

easycom 自动生效，页面直接使用 `<nax-line />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 用法

```uvue
<nax-line></nax-line>
<nax-line length="200"></nax-line>
<nax-line dashed space="12"></nax-line>
<nax-line direction="vertical" length="40"></nax-line>
<nax-line type="primary" size="md"></nax-line>
```

:::

::: details 基础

```uvue
<nax-line></nax-line>
```

默认 hairline + 100% 宽 + divider 色。

:::

::: details 长度 length

```uvue
<nax-line length="100%" space="8"></nax-line>
<nax-line length="200" space="8"></nax-line>
<nax-line length="50%" space="8"></nax-line>
```

纯数字按 px；可写 % / px / rpx。

:::

::: details 粗细 size

```uvue
<nax-line size="hairline"></nax-line>
<nax-line size="sm"></nax-line>
<nax-line size="md"></nax-line>
<nax-line size="lg"></nax-line>
```

:::

::: details 虚线 dashed

```uvue
<nax-line dashed space="8"></nax-line>
<nax-line dashed size="md" type="primary" space="8"></nax-line>
<nax-line dashed size="lg" type="warning" space="8"></nax-line>
```

:::

::: details 类型 type

```uvue
<nax-line type="default" space="8"></nax-line>
<nax-line type="primary" space="8"></nax-line>
<nax-line type="info" space="8"></nax-line>
<nax-line type="success" space="8"></nax-line>
<nax-line type="warning" space="8"></nax-line>
<nax-line type="error" space="8"></nax-line>
```

:::

::: details 内缩 inset

```uvue
<view class="card">
	<text class="card__text">列表项 A</text>
	<nax-line inset="16"></nax-line>
	<text class="card__text">列表项 B</text>
	<nax-line inset="16"></nax-line>
</view>
```

左右各内缩 16px，适合 cell 分割。

:::

::: details 竖线 vertical

```uvue
<nax-line direction="vertical" length="24" space="12"></nax-line>
<nax-line direction="vertical" length="24" space="12" type="primary" size="md"></nax-line>
<nax-line direction="vertical" length="100%" space="12"></nax-line>
```

竖线 length=100% 时父级需要有高度。

:::

::: details 自定义 color

```uvue
<nax-line color="#8a2be2" size="md" space="8"></nax-line>
<nax-line color="#8a2be2" dashed size="md" space="8"></nax-line>
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-divider` | 分割线色 |
| `--nax-color-error` | 错误色 |
| `--nax-color-info` | 信息色 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-success` | 成功色 |
| `--nax-color-warning` | 警告色 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| direction | string | `'horizontal'` | `horizontal` 横向 \| `vertical` 纵向（兼容 `row` / `column`） |
| length | string | `'100%'` | 长度；横线=宽、竖线=高；纯数字按 px；默认 100% |
| size | string | `'hairline'` | `hairline` 细线 \| `sm` 小 \| `md` 中 \| `lg` 大；默认 `hairline` |
| dashed | boolean | `false` | 虚线 |
| type | string | `'default'` | `default` 默认 \| `primary` 主要 \| `info` 信息 \| `success` 成功 \| `warning` 警告 \| `error` 错误（兼容 `danger`） |
| color | string | `''` | 自定义颜色（覆盖 type） |
| space | string | `''` | 交叉轴外边距（横线=上下；竖线=左右） |
| inset | string | `''` | 主轴两端内缩（横线=左右；竖线=上下） |
| customClass | string | `''` | 根节点扩展 class |



## 说明

1. 默认颜色使用 `--nax-color-divider`，跟随 `nax-ui-theme` / 暗黑模式。
2. 竖线 `length=100%` 时，父容器需要有明确高度，否则可能不可见。
3. 与 `nax-divider` 分工：本组件无字；带文字请用 divider。
