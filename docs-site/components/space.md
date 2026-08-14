---
demo: space
---

# nax-space / nax-space-item

> 当前版本：0.1.3

间距容器：横向 / 纵向排列子项，并统一间距。
> 因 uni-app x **样式隔离 2.0**，父组件无法给任意子节点加 margin。请用 **`nax-space-item`** 包裹每个子项（与 `nax-grid` / `nax-grid-item` 同模式）。

## 安装

- 插件市场：[nax-space](https://ext.dcloud.net.cn/plugin?id=29063)

easycom 自动生效，页面直接使用 `<nax-space />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 用法

```uvue
<nax-space size="md">
  <nax-space-item>
    <nax-button type="primary" label="主要"></nax-button>
  </nax-space-item>
  <nax-space-item>
    <nax-button label="默认"></nax-button>
  </nax-space-item>
  <nax-space-item>
    <nax-button variant="tertiary" label="次要"></nax-button>
  </nax-space-item>
</nax-space>

<!-- 纵向 -->
<nax-space direction="vertical" size="sm" fill>
  <nax-space-item>
    <nax-button block label="按钮 A"></nax-button>
  </nax-space-item>
  <nax-space-item>
    <nax-button block label="按钮 B"></nax-button>
  </nax-space-item>
</nax-space>
```

:::

::: details nax-space-item

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| custom-class | string | `''` | 根节点扩展 class |

插槽 `default`：实际内容。

:::

::: details 基础横向

```uvue
<nax-space size="md">
	<nax-space-item>
		<nax-button type="primary" size="sm" label="主要"></nax-button>
	</nax-space-item>
	<nax-space-item>
		<nax-button size="sm" label="默认"></nax-button>
	</nax-space-item>
	<nax-space-item>
		<nax-button variant="tertiary" size="sm" label="次要"></nax-button>
	</nax-space-item>
</nax-space>
```

:::

::: details 间距 size

```uvue
<!-- xs (4) -->
<nax-space size="xs">
	<nax-space-item><nax-tag label="A"></nax-tag></nax-space-item>
	<nax-space-item><nax-tag label="B"></nax-tag></nax-space-item>
	<nax-space-item><nax-tag label="C"></nax-tag></nax-space-item>
</nax-space>

<!-- sm (8) -->
<nax-space size="sm">
	<nax-space-item><nax-tag label="A"></nax-tag></nax-space-item>
	<nax-space-item><nax-tag label="B"></nax-tag></nax-space-item>
	<nax-space-item><nax-tag label="C"></nax-tag></nax-space-item>
</nax-space>

<!-- md (12) -->
<nax-space size="md">
	<nax-space-item><nax-tag label="A"></nax-tag></nax-space-item>
	<nax-space-item><nax-tag label="B"></nax-tag></nax-space-item>
	<nax-space-item><nax-tag label="C"></nax-tag></nax-space-item>
</nax-space>

<!-- lg (16) -->
<nax-space size="lg">
	<nax-space-item><nax-tag label="A"></nax-tag></nax-space-item>
	<nax-space-item><nax-tag label="B"></nax-tag></nax-space-item>
	<nax-space-item><nax-tag label="C"></nax-tag></nax-space-item>
</nax-space>

<!-- 自定义 24 -->
<nax-space size="24">
	<nax-space-item><nax-tag label="A"></nax-tag></nax-space-item>
	<nax-space-item><nax-tag label="B"></nax-tag></nax-space-item>
	<nax-space-item><nax-tag label="C"></nax-tag></nax-space-item>
</nax-space>
```

:::

::: details 纵向 vertical

```uvue
<nax-space direction="vertical" size="sm">
	<nax-space-item>
		<nax-button size="sm" label="第一行"></nax-button>
	</nax-space-item>
	<nax-space-item>
		<nax-button size="sm" type="primary" label="第二行"></nax-button>
	</nax-space-item>
	<nax-space-item>
		<nax-button size="sm" type="success" label="第三行"></nax-button>
	</nax-space-item>
</nax-space>
```

:::

::: details 换行 wrap

```uvue
<nax-space size="sm" wrap>
	<nax-space-item><nax-tag type="primary" label="标签1"></nax-tag></nax-space-item>
	<nax-space-item><nax-tag type="info" label="标签2"></nax-tag></nax-space-item>
	<nax-space-item><nax-tag type="success" label="标签3"></nax-tag></nax-space-item>
	<nax-space-item><nax-tag type="warning" label="标签4"></nax-tag></nax-space-item>
	<nax-space-item><nax-tag type="error" label="标签5"></nax-tag></nax-space-item>
	<nax-space-item><nax-tag label="标签6"></nax-tag></nax-space-item>
	<nax-space-item><nax-tag label="标签7"></nax-tag></nax-space-item>
	<nax-space-item><nax-tag label="标签8"></nax-tag></nax-space-item>
</nax-space>
```

:::

::: details 对齐 align

```uvue
<!-- start -->
<nax-space align="start" size="md">
	<nax-space-item><view class="box box--sm"></view></nax-space-item>
	<nax-space-item><view class="box box--lg"></view></nax-space-item>
	<nax-space-item><view class="box box--md"></view></nax-space-item>
</nax-space>

<!-- center（默认） -->
<nax-space align="center" size="md">
	<nax-space-item><view class="box box--sm"></view></nax-space-item>
	<nax-space-item><view class="box box--lg"></view></nax-space-item>
	<nax-space-item><view class="box box--md"></view></nax-space-item>
</nax-space>

<!-- end -->
<nax-space align="end" size="md">
	<nax-space-item><view class="box box--sm"></view></nax-space-item>
	<nax-space-item><view class="box box--lg"></view></nax-space-item>
	<nax-space-item><view class="box box--md"></view></nax-space-item>
</nax-space>
```

box--sm / box--md / box--lg 为三种不同尺寸的方块，样式由页面定义。

:::

::: details 主轴 justify

```uvue
<!-- between -->
<nax-space justify="between" size="0" fill>
	<nax-space-item><nax-tag label="左"></nax-tag></nax-space-item>
	<nax-space-item><nax-tag label="中"></nax-tag></nax-space-item>
	<nax-space-item><nax-tag label="右"></nax-tag></nax-space-item>
</nax-space>

<!-- center -->
<nax-space justify="center" size="sm" fill>
	<nax-space-item><nax-tag label="A"></nax-tag></nax-space-item>
	<nax-space-item><nax-tag label="B"></nax-tag></nax-space-item>
</nax-space>
```

:::

::: details fill 纵向撑满

```uvue
<nax-space direction="vertical" size="sm" fill>
	<nax-space-item>
		<nax-button block type="primary" label="通栏按钮 A"></nax-button>
	</nax-space-item>
	<nax-space-item>
		<nax-button block label="通栏按钮 B"></nax-button>
	</nax-space-item>
</nax-space>
```

:::


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| direction | string | `'horizontal'` | `horizontal` 横向 \| `vertical` 纵向（兼容 `row` / `column`） |
| size | string | `'md'` | `xs` 特小 \| `sm` 小 \| `md` 中 \| `lg` 大 \| `xl` 特大（token 档）或 1~10（token 档）或数字（px）/ 带单位 |
| wrap | boolean | `false` | 是否换行（横向有效） |
| align | string | `'center'` | `start` 起点 \| `center` 居中 \| `end` 终点 \| `baseline` 基线 \| `stretch` 拉伸（兼容 flex 原语） |
| justify | string | `'start'` | `start` 起点 \| `center` 居中 \| `end` 终点 \| `between` 两端对齐 \| `around` 环绕 \| `evenly` 均匀分布 |
| fill | boolean | `false` | 子项在主轴方向拉伸占满（vertical 时 item 宽 100%） |
| customClass | string | `''` | 根节点扩展 class |



## Slots

| 插槽 | 说明 |
|------|------|
| default | 放置 nax-space-item（或任意子节点；无 item 时仅布局不保证间距） |
