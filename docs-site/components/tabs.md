---
demo: tabs
---

# nax-tabs

> 当前版本：0.2.0

顶部标签导航（内容切换条）。面向 uni-app x：数据驱动、可横向滚动/均分宽度、主题色指示条、轻量徽标。**只负责导航 UI**，内容区由页面自管。

## 安装

- 插件市场：[nax-tabs](https://ext.dcloud.net.cn/plugin?id=29070)

easycom 自动生效，页面直接使用 `<nax-tabs />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 用法

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

:::

::: details 基础 + 内容联动

```uvue
<nax-tabs v-model="basicCurrent" :list="basicList" @change="onBasicChange" @click="onBasicClick"></nax-tabs>
```

```uts
const basicCurrent = ref(0)
const lastEvent = ref('')

const basicList = [
	{ name: '关注' },
	{ name: '推荐' },
	{ name: '热榜' }
]

function onBasicChange(index : number) {
	lastEvent.value = 'change → ' + index.toString()
}

function onBasicClick(index : number) {
	lastEvent.value = 'click → ' + index.toString()
}
```

:::

::: details 可滚动（多项）· 居中 scrollAlign=center

```uvue
<nax-tabs v-model="scrollCurrent" :list="scrollList" :scrollable="true" scroll-align="center"></nax-tabs>
```

```uts
const scrollCurrent = ref(1)

const scrollList = [
	{ name: '关注' },
	{ name: '推荐' },
	{ name: '热榜' },
	{ name: '同城' },
	{ name: '直播' },
	{ name: '影视' },
	{ name: '游戏' },
	{ name: '音乐' },
	{ name: '科技' },
	{ name: '更多' }
]
```

:::

::: details 可滚动 · 贴左 scrollAlign=left

```uvue
<nax-tabs v-model="scrollLeftCurrent" :list="scrollList" :scrollable="true" scroll-align="left"></nax-tabs>
```

```uts
const scrollLeftCurrent = ref(4)

// scrollList 同上：10 项可滚动列表
```

:::

::: details 均分宽度

```uvue
<nax-tabs v-model="equalCurrent" :list="equalList" :scrollable="false"></nax-tabs>

<nax-button size="sm" label="选中 0" @click="setEqual(0)"></nax-button>
<nax-button size="sm" label="选中 1" @click="setEqual(1)"></nax-button>
<nax-button size="sm" label="选中 2" @click="setEqual(2)"></nax-button>
```

```uts
const equalCurrent = ref(0)

const equalList = [
	{ name: '全部' },
	{ name: '待付款' },
	{ name: '已完成' }
]

function setEqual(index : number) {
	equalCurrent.value = index
}
```

:::

::: details 徽标 / 红点 / 禁用

```uvue
<nax-tabs v-model="badgeCurrent" :list="badgeList" :scrollable="false"></nax-tabs>

<nax-button size="sm" label="消息+1" @click="incBadge"></nax-button>
<nax-button size="sm" label="重置徽标" @click="resetBadge"></nax-button>
```

```uts
const badgeCurrent = ref(0)
const msgBadge = ref(5)

const badgeList = computed((): any[] => {
	return [
		{ name: '消息', badge: msgBadge.value },
		{ name: '动态', dot: true },
		{ name: '下线', disabled: true },
		{ name: '我的' }
	] as any[]
})

function incBadge() {
	msgBadge.value = msgBadge.value + 1
}

function resetBadge() {
	msgBadge.value = 5
}
```

:::

::: details 尺寸 size

```uvue
<nax-tabs v-model="sizeCurrent" :list="sizeList" size="sm" :scrollable="false"></nax-tabs>
<nax-tabs v-model="sizeCurrent" :list="sizeList" size="md" :scrollable="false"></nax-tabs>
<nax-tabs v-model="sizeCurrent" :list="sizeList" size="lg" :scrollable="false"></nax-tabs>
```

```uts
const sizeCurrent = ref(0)

const sizeList = [
	{ name: '选项A' },
	{ name: '选项B' },
	{ name: '选项C' }
]
```

:::

::: details 指示条宽度 / 无指示条

```uvue
<nax-tabs v-model="lineCurrent" :list="equalList" :scrollable="false" line-width="40"></nax-tabs>
<nax-tabs v-model="lineCurrent" :list="equalList" :scrollable="false" :show-line="false"></nax-tabs>
```

```uts
const lineCurrent = ref(1)

// equalList 同「均分宽度」：3 项均分
```

:::

::: details 字符串 list + keyName

```uvue
<nax-tabs v-model="strCurrent" :list="strList" :scrollable="false"></nax-tabs>
<nax-tabs v-model="keyCurrent" :list="keyList" key-name="title" :scrollable="false"></nax-tabs>
```

```uts
const strCurrent = ref(0)
const keyCurrent = ref(0)

const strList = ['早报', '午报', '晚报']

const keyList = [
	{ title: '标题一', name: '忽略' },
	{ title: '标题二', name: '忽略' },
	{ title: '标题三', name: '忽略' }
]
```

:::

::: details 无底部分割线

```uvue
<nax-tabs v-model="basicCurrent" :list="basicList" :border="false"></nax-tabs>
```

```uts
// basicCurrent / basicList 复用「基础 + 内容联动」的声明
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 背景色 |
| `--nax-color-border` | 边框色 |
| `--nax-color-error` | 错误色 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-text-secondary` | 次要文字色 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | number | `0` | 当前选中下标（v-model） |
| list | array | `() => []` | 项列表（name/text/label/title、badge/count、dot、disabled；支持字符串项） |
| keyName | string | `'name'` | 文案优先字段，默认 name |
| scrollable | boolean | `true` | 横向滚动，默认 true；false 均分 |
| scrollAlign | string | `'center'` | `left` 左对齐 \| `center` 居中；默认 `center`；`left` 为必要时贴左并露出前一项 |
| centered | boolean | `false` | 少项居中：内容不满容器宽时整体居中（可滚动模式超宽仍可横滑；均分模式改为按内容宽居中不拉伸），默认 false |
| showLine | boolean | `true` | 指示条，默认 true |
| lineWidth | string | `'20'` | 指示条宽，默认 20（px） |
| lineHeight | string | `'3'` | 指示条高，默认 3（px） |
| size | string | `'md'` | `sm` 小 \| `md` 中 \| `lg` 大；默认 `md` |
| border | boolean | `true` | 底部分割线，默认 true |
| duration | number | `300` | 指示条过渡 ms，默认 300 |
| sticky | boolean | `false` | CSS sticky 吸顶（Web/小程序；App 端不支持），默认 false |
| offsetTop | string | `'0'` | sticky top，默认 0 |
| badgeMax | number | `99` | 徽标数字上限，默认 99 |
| customClass | string | `''` | 根扩展 class |

## list 项字段

| 字段 | 说明 |
|------|------|
| name / text / label / title | 文案（`keyName` 优先） |
| badge / count | 数字或文本徽标 |
| dot / isDot | 红点 |
| disabled | 禁用 |

字符串项也可：`list={['关注','推荐']}`。


## Events

| 事件 | 说明 |
|------|------|
| update:modelValue | v-model 选中下标 |
| change | 选中下标变化 |
| click | 点击项（含重复点同一项；禁用项不触发） |


## 全屏选项卡方案实现

**不提供**独立的 `nax-tabs-swiper` 组件。全屏选项卡 = `nax-tabs` + 原生 `swiper` 组合：

1. 共用一个 `current`（tabs 用 `v-model`，swiper 用 `:current` + `@change`）
2. swiper 关闭 `circular`，避免下标与 Tab 语义错位
3. 内容区高度 = 窗口高度 − tabs 高度；每页内用 `scroll-view` 单独滚动
4. 业务负责懒加载、嵌套列表、空状态等，不要塞进导航组件

```uvue
<template>
  <view class="page">
    <nax-tabs v-model="current" :list="tabs" />
    <swiper
      :current="current"
      :circular="false"
      :style="'height:' + contentH + 'px'"
      @change="onSwiperChange"
    >
      <swiper-item>
        <scroll-view scroll-y :style="'height:' + contentH + 'px'">
          <!-- 面板 0 -->
        </scroll-view>
      </swiper-item>
      <swiper-item>
        <scroll-view scroll-y :style="'height:' + contentH + 'px'">
          <!-- 面板 1 -->
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="uts">
const current = ref(0)
const contentH = ref(400)
const tabs = [{ name: '关注' }, { name: '推荐' }]

function onSwiperChange(e: UniSwiperChangeEvent) {
  current.value = e.detail.current
}
</script>
```
