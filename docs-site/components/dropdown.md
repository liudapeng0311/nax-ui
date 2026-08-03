---
demo: dropdown
---

# nax-dropdown

筛选栏式下拉菜单。

## 安装

```text
uni_modules/nax-dropdown
```

easycom 自动生效，页面直接使用 `<nax-dropdown />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 组件

| 标签 | 说明 |
|------|------|
| `nax-dropdown` | 菜单栏容器：遮罩、展开/收起、fixed 吸顶 |
| `nax-dropdown-item` | 菜单项：默认 `options` 单选，或插槽自定义面板 |

### 基础用法

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

### 组件 的改进

- 外观走 `--nax-*` token，不靠 `active-color` 传色
- 有 `modelValue` 时自动高亮标题（自定义面板仍可用 `highlighted`）
- `displaySelected` 可将标题替换为已选文案
- 关闭后卸载遮罩，避免挡点击

### 平台说明

- 鸿蒙端通过 `APP-HARMONY` 为默认选项文字设置 48px 行框，保证与选项行垂直居中；其它端保持原有排版。


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| size | string | `'md'` | sm \| md \| lg，菜单栏高度，默认 md |
| menuIcon | string | `'chevron-down'` | 收起图标，默认 chevron-down |
| menuIconOpen | string | `'chevron-up'` | 展开图标，默认 chevron-up |
| menuIconSize | string | `'14'` | 图标尺寸，默认 14 |
| borderBottom | boolean | `false` | 菜单底部分割线，默认 false |
| closeOnClickMask | boolean | `true` | 点遮罩关闭，默认 true |
| closeOnClickSelf | boolean | `true` | 点默认选项后关闭，默认 true |
| duration | number | `280` | 遮罩动画 ms，默认 280 |
| borderRadius | string | `'0'` | 内容区底部圆角 px，默认 0 |
| zIndex | number | `1000` | 层级，默认 1000 |
| fixed | boolean | `false` | 菜单栏吸顶 fixed，默认 false |
| offsetTop | string | `'0'` | fixed 额外 top 偏移 px，默认 0 |
| immersive | boolean | `false` | 沉浸导航：fixed top 叠加状态栏+导航栏高度 |
| navbarHeight | string | `'44'` | 沉浸时导航栏高度，默认 44 |
| placeholder | boolean | `true` | fixed 时是否占位，默认 true |
| customClass | string | `''` | 根扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| open | 打开（index） |
| close | 关闭（index） |
| change | 切换菜单项（index） |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 放置 nax-dropdown-item |
