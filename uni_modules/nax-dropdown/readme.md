# nax-dropdown

筛选栏式下拉菜单（支持 Dropdown 主场景，按 nax-ui token / uvue 约束实现）。

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

## 组件 的改进

- 外观走 `--nax-*` token，不靠 `active-color` 传色
- 有 `modelValue` 时自动高亮标题（自定义面板仍可用 `highlighted`）
- `displaySelected` 可将标题替换为已选文案
- 关闭后卸载遮罩，避免挡点击

## 依赖

- `nax-icon`
- `nax-ui-theme`（可选，有 fallback）
