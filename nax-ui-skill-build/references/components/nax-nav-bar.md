# nax-nav-bar

自定义顶部导航栏（需页面 `navigationStyle: custom`）。面向 uni-app x：状态栏安全区、fixed 占位、返回栈兜底、微信小程序胶囊预留。

## 用法示例

```uvue
<template>
  <view class="page">
    <nax-nav-bar title="页面标题" home-url="/pages/index/index" />
    <view class="body">
      <!-- 页面内容；fixed 默认会插入占位 -->
    </view>
  </view>
</template>
```

```uvue
<nax-nav-bar title="详情">
  <template #right>
    <nax-icon name="search" size="22" @click="onSearch" />
  </template>
</nax-nav-bar>
```

## Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| title | string | `''` | 标题 |
| showBack | boolean | `true` | 是否显示返回区 |
| backText | string | `''` | 返回文案 |
| backIcon | string | `'chevron-left'` | 返回图标（`nax-icon`）；空串不显示图标 |
| backIconColor | string | `''` | 返回图标颜色；空串时跟随导航栏 type / 主题 |
| autoBack | boolean | `true` | 点击返回是否自动 `navigateBack` |
| homeUrl | string | `''` | 栈底无法返回时 `reLaunch` 目标 |
| fixed | boolean | `true` | 是否固定顶部 |
| placeholder | boolean | `true` | fixed 且非 immersive 时是否占位 |
| immersive | boolean | `false` | 沉浸：fixed 不占位，背景透明 |
| border | boolean | `true` | 底部分割线（primary/immersive 默认无） |
| safeAreaInsetTop | boolean | `true` | 顶部状态栏安全区 |
| type | string | `'default'` | `default` / `primary` |
| height | string | `'44'` | 内容行高度（px；支持 sm/md/lg） |
| zIndex | number | `980` | fixed 层级 |
| titleAlign | string | `'center'` | `center` / `left` |
| centerClickable | boolean | `false` | 中间区域（default 插槽）可接收点击；仅 Web/小程序需开启（App 端无 pointer-events 限制） |
| show | boolean | `true` | 是否显示 |
| customClass | string | `''` | 根扩展 class |

## Events

| 事件 | 参数 | 说明 |
|---|---|---|
| back | — | 点击返回；`autoBack` 为 true 时仍会触发后再导航 |

## Slots

| 插槽 | 说明 |
|---|---|
| left | 左侧扩展（位于返回按钮右侧） |
| default | 中间自定义（覆盖 title）；Web/小程序下需 `center-clickable` 才能接收点击 |
| right | 右侧操作区 |

## 依赖

- `nax-icon`
- `nax-ui-theme`（可选，提供统一 token）
