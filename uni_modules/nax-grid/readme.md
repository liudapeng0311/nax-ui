# nax-grid

宫格布局：同时展示多个同类入口（图标 + 文案等）。由 `nax-grid` 容器 + `nax-grid-item` 子项组成。

相对 uView Pro Grid 的改进：

- 全端统一 **flex** 布局（不用 float 分端）
- `gap` 间距；`hover` 组件内置按压态（无需写全局 class）
- `index` 可省略，按挂载顺序自动分配
- 外观走 token，不暴露 `bgColor` / `customStyle` 泛滥

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

## 主题 Token

- `--nax-color-bg`
- `--nax-color-bg-hover`
- `--nax-color-divider` / `--nax-color-border`
- `--nax-color-text` / `--nax-color-text-secondary`
- `--nax-radius-md`
- `--nax-opacity-disabled`

## 依赖

- `nax-ui-theme`（可选，提供统一 token）
