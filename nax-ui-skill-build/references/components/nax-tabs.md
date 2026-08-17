# nax-tabs

顶部标签导航（内容切换条）。面向 uni-app x：数据驱动、可横向滚动/均分宽度、主题色指示条、轻量徽标。**只负责导航 UI**，内容区由页面自管。

## 用法示例

```uvue
<template>
  <view class="page">
    <nax-tabs v-model="current" :list="tabs" @change="onChange" />
    <view v-if="current === 0">关注</view>
    <view v-else-if="current === 1">推荐</view>
    <view v-else>热榜</view>
  </view>
</template>

<script setup lang="uts">
const current = ref(0)
const tabs = [
  { name: '关注', badge: 3 },
  { name: '推荐' },
  { name: '热榜', dot: true },
  { name: '已下线', disabled: true }
]

function onChange(index: number) {
  console.log('tab', index)
}
</script>
```

## Props — Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| modelValue | number | `0` | 当前选中下标（v-model） |
| list | array | `[]` | 标签项列表 |
| keyName | string | `'name'` | 文案优先字段名 |
| scrollable | boolean | `true` | 横向滚动；`false` 时均分宽度 |
| scrollAlign | string | 'center' | 可滚动时激活项对齐：left 必要时贴左并露出前一项 / center 居中 |
| showLine | boolean | `true` | 底部指示条 |
| lineWidth | string | `'20'` | 指示条宽度（纯数字按 px） |
| lineHeight | string | `'3'` | 指示条高度（纯数字按 px） |
| size | string | `'md'` | `sm` / `md` / `lg` |
| border | boolean | `true` | 底部分割线 |
| duration | number | `300` | 指示条过渡 ms |
| sticky | boolean | `false` | CSS sticky 吸顶（Web/小程序；App 不支持） |
| offsetTop | string | `'0'` | sticky 时 `top`（纯数字按 px） |
| badgeMax | number | `99` | 数字徽标上限 |
| customClass | string | `''` | 根扩展 class |

## Props — list 项字段

| 字段 | 说明 |
|---|---|
| name / text / label / title | 文案（`keyName` 优先） |
| badge / count | 数字或文本徽标 |
| dot / isDot | 红点 |
| disabled | 禁用 |

## Events

| 事件 | 参数 | 说明 |
|---|---|---|
| update:modelValue | number | v-model |
| change | number | 选中下标变化 |
| click | number | 点击项（含重复点同一项；禁用项不触发） |

## 依赖

- `nax-ui-theme`（可选，提供统一 token）
