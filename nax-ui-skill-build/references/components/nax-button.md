# nax-button

`nax-ui` 通用按钮组件（uni-app x / uvue）。

## 用法示例

```uvue
<nax-button type="primary" label="确定" @click="onConfirm"></nax-button>
```

```uvue
<!-- 基础 -->
<nax-button label="基础"></nax-button>
<!-- 次要 -->
<nax-button variant="secondary" label="次要"></nax-button>
<!-- 次次要 -->
<nax-button variant="tertiary" label="次次要"></nax-button>
<!-- 次次次要 -->
<nax-button variant="quaternary" label="次次次要"></nax-button>
<!-- 虚线 -->
<nax-button variant="dashed" label="虚线"></nax-button>
<!-- 禁用 -->
<nax-button disabled label="禁用"></nax-button>

<!-- 主色 × 次要 -->
<nax-button type="primary" variant="secondary" label="Primary 次要"></nax-button>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| type | string | `default` | `default` / `primary` / `info` / `success` / `warning` / `error`（兼容 `tertiary`、`danger`） |
| variant | string | `solid` | `solid`(基础) / `secondary`(次要) / `tertiary`(次次要) / `quaternary`(次次次要) / `dashed`(虚线) / `outline`；兼容 `light`→secondary、`text`→quaternary |
| size | string | `md` | `sm` / `md` / `lg` |
| shape | string | `square` | `square` / `round` / `circle` |
| disabled | boolean | `false` | 禁用（整体 opacity，不触发 click） |
| loading | boolean | `false` | 加载中（阻止点击；显示旋转 loading 图标） |
| block | boolean | `false` | 块级宽度 |
| label | string | `''` | 文案 |
| icon | string | `''` | `nax-icon` 图标名；空则不渲染内置图标 |
| iconPosition | string | `left` | `left` / `right`（兼容 `end`→right） |
| customClass | string | `''` | 根节点扩展 class |

## Events

| 事件 | 说明 |
|---|---|
| click | 点击（disabled / loading 时不触发） |

## Slots

| 插槽 | 说明 |
|---|---|
| default | 自定义内容 |
| icon | 自定义前缀图标区域（可与 icon prop 并存；loading 时隐藏） |
