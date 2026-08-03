---
demo: space
---

# nax-space / nax-space-item

间距容器：横向 / 纵向排列子项，并统一间距。
> 因 uni-app x **样式隔离 2.0**，父组件无法给任意子节点加 margin。请用 **`nax-space-item`** 包裹每个子项（与 `nax-grid` / `nax-grid-item` 同模式）。

## 安装

```text
uni_modules/nax-space
```

easycom 自动生效，页面直接使用 `<nax-space />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

> 当前版本：0.1.1（见 `changelog.md`）

## 代码示例

### 用法

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

### nax-space Props

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| direction | string | `horizontal` | `horizontal` / `vertical`（兼容 `row` / `column`） |
| size | string | `md` | 间距：`xs`/`sm`/`md`/`lg`/`xl`，或 token 档 `1`~`10`，或纯数字 px |
| wrap | boolean | `false` | 横向是否换行 |
| align | string | `center` | 交叉轴：`start` / `center` / `end` / `baseline` / `stretch` |
| justify | string | `start` | 主轴：`start` / `center` / `end` / `between` / `around` / `evenly` |
| fill | boolean | `false` | 子项拉伸（纵向时 item 宽 100%） |
| custom-class | string | `''` | 根节点扩展 class |

### size 对照

| size | 像素 | 对应 token |
|------|------|------------|
| `xs` / `1` | 4 | `--nax-space-1` |
| `sm` / `2` | 8 | `--nax-space-2` |
| `md` / `3` | 12 | `--nax-space-3` |
| `lg` / `4` | 16 | `--nax-space-4` |
| `xl` / `5` | 20 | `--nax-space-5` |
| `6` / `8` / `10` | 24 / 32 / 40 | 对应 token |
| `"10"` / `"12px"` | 按数值 | 自定义 |

### nax-space-item

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| custom-class | string | `''` | 根节点扩展 class |

插槽 `default`：实际内容。


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| direction | string | `'horizontal'` | horizontal \| vertical；兼容 row / column |
| size | string | `'md'` | 间距：xs\|sm\|md\|lg\|xl 或 1~10（token 档）或纯数字 px / 带单位 |
| wrap | boolean | `false` | 是否换行（横向有效） |
| align | string | `'center'` | 交叉轴：start\|center\|end\|baseline\|stretch；兼容 flex 原值 |
| justify | string | `'start'` | 主轴：start\|center\|end\|between\|around\|evenly |
| fill | boolean | `false` | 子项在主轴方向拉伸占满（vertical 时 item 宽 100%） |
| customClass | string | `''` | 根节点扩展 class |



## Slots

| 插槽 | 说明 |
|------|------|
| default | 放置 nax-space-item（或任意子节点；无 item 时仅布局不保证间距） |
