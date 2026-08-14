# nax-dropdown

筛选栏式下拉菜单。

## 组件

| 标签 | 说明 |
|------|------|
| `nax-dropdown` | 菜单栏容器：遮罩、展开/收起、fixed 吸顶 |
| `nax-dropdown-item` | 菜单项：默认 `options` 单选，或插槽自定义面板 |

## 基础用法

```html
<nax-dropdown border-bottom>
  <nax-dropdown-item v-model="near" title="附近" :options="nearOptions"></nax-dropdown-item>
  <nax-dropdown-item v-model="sort" title="排序" :options="sortOptions"></nax-dropdown-item>
  <nax-dropdown-item title="筛选" :highlighted="filtered">
    <!-- 自定义面板 -->
    <view>...</view>
  </nax-dropdown-item>
</nax-dropdown>
```

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 背景色 |
| `--nax-color-border` | 边框色 |
| `--nax-color-mask` | 遮罩色 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-text` | 主文字色 |


## 依赖

- `nax-icon`
- `nax-ui-theme`（可选，有 fallback）
