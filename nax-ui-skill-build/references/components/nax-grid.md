# nax-grid

宫格布局：由 `nax-grid` 容器 + `nax-grid-item` 子项组成。

## 用法示例

```uvue
<nax-grid :col="3" @click="onGridClick">
  <nax-grid-item v-for="(item, i) in list" :key="i" :index="'' + i">
    <nax-icon name="home" size="22"></nax-icon>
    <text class="grid-text">{{ item }}</text>
  </nax-grid-item>
</nax-grid>
```

```uvue
<nax-grid :col="4" :border="false" gap="8">
  <nax-grid-item>...</nax-grid-item>
</nax-grid>
```

## Props — Props · Grid

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| col | number | `3` | 列数，最小 1 |
| border | boolean | `true` | 是否显示网格边框 |
| align | string | `left` | 不满一行时对齐：`left` / `center` / `right` |
| gap | string | `0` | 子项间距；纯数字按 `px` |
| hover | boolean | `true` | 是否启用按压反馈 |
| custom-class | string | `''` | 根节点扩展 class |

## Props — Props · GridItem

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| index | string | `''` | 点击回传值；空则按挂载顺序自动编号 |
| disabled | boolean | `false` | 禁用点击 |
| custom-class | string | `''` | 根节点扩展 class |

## 依赖

- `nax-ui-theme`（可选，提供统一 token）
