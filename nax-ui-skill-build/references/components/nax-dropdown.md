# nax-dropdown

筛选栏式下拉菜单。

## 用法示例

```uvue
<nax-dropdown border-bottom>
  <nax-dropdown-item v-model="near" title="附近" :options="nearOptions"></nax-dropdown-item>
  <nax-dropdown-item v-model="sort" title="排序" :options="sortOptions"></nax-dropdown-item>
  <nax-dropdown-item title="筛选" :highlighted="filtered">
    <!-- 自定义面板 -->
    <view>...</view>
  </nax-dropdown-item>
</nax-dropdown>
```

## Props — Props（nax-dropdown）

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| size | string | `'md'` | 菜单栏高度：`sm` / `md` / `lg` |
| menuIcon | string | `'chevron-down'` | 收起图标 |
| menuIconOpen | string | `'chevron-up'` | 展开图标 |
| menuIconSize | string | `'14'` | 图标尺寸（纯数字按 px） |
| borderBottom | boolean | `false` | 菜单底部分割线 |
| closeOnClickMask | boolean | `true` | 点遮罩关闭 |
| closeOnClickSelf | boolean | `true` | 点默认选项后关闭 |
| duration | number | `280` | 遮罩动画 ms |
| borderRadius | string | `'0'` | 内容区底部圆角（纯数字按 px） |
| zIndex | number | `1000` | 层级 |
| fixed | boolean | `false` | 菜单栏吸顶 fixed |
| offsetTop | string | `'0'` | fixed 额外 top 偏移（纯数字按 px） |
| immersive | boolean | `false` | 沉浸导航：fixed top 叠加状态栏+导航栏高度 |
| navbarHeight | string | `'44'` | 沉浸时导航栏高度（纯数字按 px） |
| placeholder | boolean | `true` | fixed 时是否占位 |
| customClass | string | `''` | 根扩展 class |

## Props — Props（nax-dropdown-item）

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| modelValue | string | `''` | 当前选中值（v-model），与 `options[].value` 对应 |
| title | string | `''` | 菜单标题 |
| options | array | `[]` | 选项 `{ label, value }` 或字符串 |
| disabled | boolean | `false` | 禁用该菜单 |
| show | boolean | `true` | 是否展示该菜单标题 |
| height | string | `''` | 默认列表高度（有值时 scroll-view，纯数字按 px） |
| highlighted | boolean | `false` | 强制高亮标题；默认跟 modelValue 自动 |
| displaySelected | boolean | `false` | 标题展示已选 label |
| labelName | string | `'label'` | 选项文案字段 |
| valueName | string | `'value'` | 选项值字段 |
| customClass | string | `''` | 根扩展 class |

## Events

| 事件 | 参数 | 说明 |
|---|---|---|
| update:modelValue | string | v-model（nax-dropdown-item） |
| change | string / number | 选中值变化（item 传 string）；切换菜单项（dropdown 传 index） |
| open | number | 展开菜单项 index（nax-dropdown） |
| close | number | 关闭菜单项 index（nax-dropdown） |

## 依赖

- `nax-icon`
- `nax-ui-theme`（可选，有 fallback）
