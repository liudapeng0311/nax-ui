# nax-space

间距容器：横向 / 纵向排列子项，并统一间距。

## 用法示例

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

## Props — nax-space Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| direction | string | `horizontal` | `horizontal` 横向 \| `vertical` 纵向（兼容 `row` / `column`） |
| size | string | `md` | 间距：`xs` 特小 \| `sm` 小 \| `md` 中 \| `lg` 大 \| `xl` 特大，或 token 档 `1`~`10`，或纯数字 px |
| wrap | boolean | `false` | 横向是否换行 |
| align | string | `center` | 交叉轴：`start` 起点 \| `center` 居中 \| `end` 终点 \| `baseline` 基线 \| `stretch` 拉伸 |
| justify | string | `start` | 主轴：`start` 起点 \| `center` 居中 \| `end` 终点 \| `between` 两端对齐 \| `around` 环绕 \| `evenly` 均匀分布 |
| fill | boolean | `false` | 子项拉伸（纵向时 item 宽 100%） |
| custom-class | string | `''` | 根节点扩展 class |

## Props — nax-space-item

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| custom-class | string | `''` | 根节点扩展 class |

## 依赖

- `nax-ui-theme`（可选，设计 token 文档对齐）
