---
demo: grid
---

# nax-grid / nax-grid-item

> 当前版本：0.1.5

宫格布局：由 `nax-grid` 容器 + `nax-grid-item` 子项组成。

## 安装

```text
uni_modules/nax-grid
```

easycom 自动生效，页面直接使用 `<nax-grid />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 用法

```uvue
<nax-grid :col="3" @click="onGridClick">
  <nax-grid-item v-for="(item, i) in list" :key="i" :index="'' + i">
    <nax-icon name="home" size="22"></nax-icon>
    <text class="grid-text">{{ item }}</text>
  </nax-grid-item>
</nax-grid>
```

无边框 + 间距：

```uvue
<nax-grid :col="4" :border="false" gap="8">
  <nax-grid-item>...</nax-grid-item>
</nax-grid>
```

:::

::: details 边框与间距

- `border=true` 且 `gap=0`：经典九宫格连线（父上/左 + 子右/下）
- `border=true` 且 `gap>0`：子项独立描边 + 圆角卡片感
- `border=false`：纯内容格，可用 `gap` 控制疏密

:::

::: details 基础 · 3 列 + 边框

```uvue
<nax-grid :col="3" @click="onGridClick">
	<nax-grid-item v-for="(icon, i) in basicIcons" :key="i" :index="'' + i">
		<nax-icon :name="icon" size="22"></nax-icon>
		<text class="grid-text">{{ basicLabels[i] }}</text>
	</nax-grid-item>
</nax-grid>
```

```uts
const basicIcons = ['home', 'user', 'image', 'search', 'settings', 'star']
const basicLabels = ['首页', '我的', '相册', '搜索', '设置', '收藏']

function onGridClick(index : string) {
	// index：grid-item 的 index
}
```

:::

::: details 4 列 · 无边框

```uvue
<nax-grid :col="4" :border="false" @click="onGridClick">
	<nax-grid-item v-for="(icon, i) in basicIcons" :key="i" :index="'noborder-' + i">
		<nax-icon :name="icon" size="20"></nax-icon>
		<text class="grid-text">{{ basicLabels[i] }}</text>
	</nax-grid-item>
</nax-grid>
```

复用上一节的 basicIcons / basicLabels / onGridClick。

:::

::: details 间距 gap + 卡片描边

border 开启且 gap 大于 0 时，子项独立描边。

```uvue
<nax-grid :col="3" gap="8" @click="onGridClick">
	<nax-grid-item v-for="(icon, i) in basicIcons" :key="i" :index="'gap-' + i">
		<nax-icon :name="icon" size="22"></nax-icon>
		<text class="grid-text">{{ basicLabels[i] }}</text>
	</nax-grid-item>
</nax-grid>
```

复用上一节的 basicIcons / basicLabels / onGridClick。

:::

::: details 对齐 align（仅 2 项）

```uvue
<nax-grid :col="3" align="left" :border="false" gap="8">
	<nax-grid-item index="a1">
		<nax-icon name="home" size="22"></nax-icon>
		<text class="grid-text">首页</text>
	</nax-grid-item>
	<nax-grid-item index="a2">
		<nax-icon name="user" size="22"></nax-icon>
		<text class="grid-text">我的</text>
	</nax-grid-item>
</nax-grid>

<nax-grid :col="3" align="center" :border="false" gap="8">
	<nax-grid-item index="b1">
		<nax-icon name="home" size="22"></nax-icon>
		<text class="grid-text">首页</text>
	</nax-grid-item>
	<nax-grid-item index="b2">
		<nax-icon name="user" size="22"></nax-icon>
		<text class="grid-text">我的</text>
	</nax-grid-item>
</nax-grid>

<nax-grid :col="3" align="right" :border="false" gap="8">
	<nax-grid-item index="c1">
		<nax-icon name="home" size="22"></nax-icon>
		<text class="grid-text">首页</text>
	</nax-grid-item>
	<nax-grid-item index="c2">
		<nax-icon name="user" size="22"></nax-icon>
		<text class="grid-text">我的</text>
	</nax-grid-item>
</nax-grid>
```

:::

::: details 徽标组合

徽标只包住图标，文案在下方；容器需 overflow: visible，避免角标被裁切。

```uvue
<nax-grid :col="3" @click="onGridClick">
	<nax-grid-item index="msg">
		<nax-badge value="9">
			<nax-icon name="share" size="22"></nax-icon>
		</nax-badge>
		<text class="grid-text">消息</text>
	</nax-grid-item>
	<nax-grid-item index="dot">
		<nax-badge dot>
			<nax-icon name="heart" size="22"></nax-icon>
		</nax-badge>
		<text class="grid-text">喜欢</text>
	</nax-grid-item>
	<nax-grid-item index="star">
		<nax-icon name="star" size="22"></nax-icon>
		<text class="grid-text">收藏</text>
	</nax-grid-item>
</nax-grid>
```

复用上一节的 onGridClick。

> 徽标默认位于内容右上角外侧，不遮挡图标；如需微调位置，用 `offset-x` / `offset-y`（正值向右、向下）向外移动。

:::

::: details 禁用 · 关闭 hover

整表 hover=false；单项 disabled 不触发 click。

```uvue
<nax-grid :col="3" :hover="false" @click="onGridClick">
	<nax-grid-item index="ok">
		<nax-icon name="check" size="22"></nax-icon>
		<text class="grid-text">可用</text>
	</nax-grid-item>
	<nax-grid-item index="off" disabled>
		<nax-icon name="close" size="22"></nax-icon>
		<text class="grid-text">禁用</text>
	</nax-grid-item>
	<nax-grid-item index="set">
		<nax-icon name="settings" size="22"></nax-icon>
		<text class="grid-text">设置</text>
	</nax-grid-item>
</nax-grid>
```

复用上一节的 onGridClick。

:::

::: details 自动 index（不传 index）

不传 index 时自动按 0, 1, 2... 递增。

```uvue
<nax-grid :col="3" @click="onGridClick">
	<nax-grid-item>
		<nax-icon name="image" size="22"></nax-icon>
		<text class="grid-text">自动0</text>
	</nax-grid-item>
	<nax-grid-item>
		<nax-icon name="search" size="22"></nax-icon>
		<text class="grid-text">自动1</text>
	</nax-grid-item>
	<nax-grid-item>
		<nax-icon name="edit" size="22"></nax-icon>
		<text class="grid-text">自动2</text>
	</nax-grid-item>
</nax-grid>
```

复用上一节的 onGridClick。

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 背景色 |
| `--nax-color-bg-hover` | 按压/悬停背景色 |
| `--nax-color-border` | 边框色 |
| `--nax-color-divider` | 分割线色 |
| `--nax-opacity-disabled` | 禁用透明度 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| col | number | `3` | 列数（默认 3，最小 1） |
| border | boolean | `true` | 是否显示边框（默认 true） |
| align | string | `'left'` | `left` 左对齐 \| `center` 居中 \| `right` 右对齐；默认 `left` |
| gap | string | `'0'` | 子项间距；纯数字按 px（默认 0） |
| hover | boolean | `true` | 是否启用按压反馈（默认 true） |
| customClass | string | `''` | 根节点扩展 class |

## Props · GridItem

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| index | string | `''` | 点击回传值；空则按挂载顺序自动编号 |
| disabled | boolean | `false` | 禁用点击 |
| custom-class | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| click | 点击子项；参数为 index（string） |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 放置 nax-grid-item |
