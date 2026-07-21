# nax-tabbar

自定义底部标签栏（非 pages.json 原生 tabBar）。面向 uni-app x：字体图标优先、轻量徽标、fixed 占位与安全区。

## 用法

```uvue
<template>
  <view class="page">
    <scroll-view class="body" scroll-y>
      <!-- 页面内容 -->
    </scroll-view>
    <nax-tabbar v-model="tab" :list="tabs" @change="onChange" @click="onClick" />
  </view>
</template>

<script setup lang="uts">
const tab = ref(0)
const tabs = [
  { text: '首页', icon: 'home' },
  { text: '发现', icon: 'search', badge: 12 },
  { text: '发布', icon: 'plus', midButton: true },
  { text: '消息', icon: 'heart', dot: true },
  { text: '我的', icon: 'user' }
]

function onChange(index: number) {
  console.log('change', index)
}

function onClick(index: number) {
  // 重复点同一项也会触发，可做「回顶」等
}
</script>
```

> 路由切换由业务处理：本组件只负责 UI 选中态与事件，不自动 `switchTab` / `reLaunch`。

## Props

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|
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

### list 项字段

| 字段 | 说明 |
|------|------|
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

**图标优先级：** 配置了图片路径 → `image`；否则 `nax-icon` 字体图标（性能更优）。

## 事件

| 事件 | 参数 | 说明 |
|------|------|------|
| update:modelValue | number | v-model |
| change | number | 选中下标变化 |
| click | number | 点击项（含重复点击同一项） |

## 主题 Token

- `--nax-color-bg` / `--nax-color-border`
- `--nax-color-primary` / `--nax-color-primary-deep`
- `--nax-color-text-secondary`
- `--nax-color-error`
- `--nax-font-size-xs`

## 依赖

- `nax-icon`
- `nax-ui-theme`（可选，提供统一 token）

## 与原生 tabBar

- 本组件是 **自定义 tab 栏 UI**，可在任意页面使用。
- 若需多页原生 tab 栈，仍配置 `pages.json` tabBar；自定义栏可配合隐藏原生栏使用。
- 官方建议自定义 tab 页内容用 `visibility` 切换保活，而非反复 `v-if` 销毁。
