# nax-tabbar

自定义底部标签栏（非 pages.json 原生 tabBar）。面向 uni-app x：字体图标优先、轻量徽标、fixed 占位与安全区。

## Props — Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| modelValue | number | `0` | 当前选中下标（v-model） |
| list | array | `[]` | 标签项列表 |
| fixed | boolean | `true` | 是否固定在底部 |
| placeholder | boolean | `true` | fixed 时是否插入等高占位 |
| border | boolean | `true` | 顶部分割线 |
| safeAreaInsetBottom | boolean | `true` | 底部安全区（App JS / Web·小程序 CSS env） |
| activeColor | string | `''` | 选中色；空则主题主色 |
| inactiveColor | string | `''` | 未选中色；空则次要文字色 |
| iconSize | string | `'22'` | `sm`/`md`/`lg` 或数字 px |
| height | string | `'50'` | 栏内容高度（不含安全区） |
| zIndex | number | `98` | fixed 层级 |
| badgeMax | number | `99` | 数字徽标上限 |
| show | boolean | `true` | 是否显示 |
| customClass | string | `''` | 根扩展 class |

## Props — list 项字段

| 字段 | 说明 |
|---|---|
| text / name / label | 文案 |
| icon / iconName | 未选中字体图标名（`nax-icon`） |
| selectedIcon / activeIcon | 选中字体图标名；缺省回退 `icon` |
| iconPath | 未选中图片路径 |
| selectedIconPath / activeIconPath | 选中图片路径 |
| badge / count | 数字或文本徽标 |
| dot / isDot | 红点 |
| disabled | 禁用 |
| midButton / mid | 中间凸起主按钮 |
| pagePath | 业务自用路由字段（组件不导航） |

## Events

| 事件 | 参数 | 说明 |
|---|---|---|
| update:modelValue | number | v-model |
| change | number | 选中下标变化 |
| click | number | 点击项（含重复点击同一项） |

## 依赖

- `nax-icon`
- `nax-ui-theme`（可选，提供统一 token）
