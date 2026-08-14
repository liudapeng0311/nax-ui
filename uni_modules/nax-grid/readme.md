# nax-grid

宫格布局：由 `nax-grid` 容器 + `nax-grid-item` 子项组成。

## 用法

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

## Props · Grid

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| col | number | `3` | 列数，最小 1 |
| border | boolean | `true` | 是否显示网格边框 |
| align | string | `left` | 不满一行时对齐：`left` / `center` / `right` |
| gap | string | `0` | 子项间距；纯数字按 `px` |
| hover | boolean | `true` | 是否启用按压反馈 |
| custom-class | string | `''` | 根节点扩展 class |

## Props · GridItem

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| index | string | `''` | 点击回传值；空则按挂载顺序自动编号 |
| disabled | boolean | `false` | 禁用点击 |
| custom-class | string | `''` | 根节点扩展 class |

## Events

| 组件 | 事件 | 说明 |
|------|------|------|
| grid | `click` | 点击子项；参数为 `index`（string） |
| grid-item | `click` | 点击自身；参数为 `index`（string） |

推荐在 **`nax-grid` 上统一监听** `click`；需要单项逻辑时可同时监听 item。

## 边框与间距

- `border=true` 且 `gap=0`：经典九宫格连线（父上/左 + 子右/下）
- `border=true` 且 `gap>0`：子项独立描边 + 圆角卡片感
- `border=false`：纯内容格，可用 `gap` 控制疏密

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 背景色 |
| `--nax-color-bg-hover` | 按压/悬停背景色 |
| `--nax-color-border` | 边框色 |
| `--nax-color-divider` | 分割线色 |
| `--nax-opacity-disabled` | 禁用透明度 |

## 依赖

- `nax-ui-theme`（可选，提供统一 token）
