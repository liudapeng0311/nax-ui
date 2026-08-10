---
demo: grid
---

# nax-grid / nax-grid-item

> 当前版本：0.1.3（见 `changelog.md`）

宫格布局：由 `nax-grid` 容器 + `nax-grid-item` 子项组成。

## 安装

```text
uni_modules/nax-grid
```

easycom 自动生效，页面直接使用 `<nax-grid />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 用法

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

### Props · Grid

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| col | number | `3` | 列数，最小 1 |
| border | boolean | `true` | 是否显示网格边框 |
| align | string | `left` | 不满一行时对齐：`left` / `center` / `right` |
| gap | string | `0` | 子项间距；纯数字按 `px` |
| hover | boolean | `true` | 是否启用按压反馈 |
| custom-class | string | `''` | 根节点扩展 class |

### Props · GridItem

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| index | string | `''` | 点击回传值；空则按挂载顺序自动编号 |
| disabled | boolean | `false` | 禁用点击 |
| custom-class | string | `''` | 根节点扩展 class |

### 边框与间距

- `border=true` 且 `gap=0`：经典九宫格连线（父上/左 + 子右/下）
- `border=true` 且 `gap>0`：子项独立描边 + 圆角卡片感
- `border=false`：纯内容格，可用 `gap` 控制疏密

### 主题 Token

- `--nax-color-bg`
- `--nax-color-bg-hover`
- `--nax-color-divider` / `--nax-color-border`
- `--nax-color-text` / `--nax-color-text-secondary`
- `--nax-radius-md`
- `--nax-opacity-disabled`


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| col | number | `3` | 列数（默认 3，最小 1） |
| border | boolean | `true` | 是否显示边框（默认 true） |
| align | string | `'left'` | left \| center \| right（默认 left） |
| gap | string | `'0'` | 子项间距；纯数字按 px（默认 0） |
| hover | boolean | `true` | 是否启用按压反馈（默认 true） |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| click | 点击子项；参数为 index（string） |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 放置 nax-grid-item |
