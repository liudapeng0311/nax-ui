---
demo: nav-bar
---

# nax-nav-bar

# nax-nav-bar
自定义顶部导航栏（需页面 `navigationStyle: custom`）。面向 uni-app x：状态栏安全区、fixed 占位、返回栈兜底、微信小程序胶囊预留。

## 安装

```text
uni_modules/nax-nav-bar
```

easycom 自动生效，页面直接使用 `<nax-nav-bar />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 用法

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

`pages.json`：

```json
{
  "path": "pages/demo/index",
  "style": {
    "navigationStyle": "custom",
    "navigationBarTitleText": ""
  }
}
```

### 自定义右侧

```uvue
<nax-nav-bar title="详情">
  <template #right>
    <nax-icon name="search" size="22" @click="onSearch" />
  </template>
</nax-nav-bar>
```

### 仅事件、不自动返回

```uvue
<nax-nav-bar title="编辑" :auto-back="false" @back="onBack" />
```

### 事件

| 事件 | 参数 | 说明 |
|------|------|------|
| back | — | 点击返回；`autoBack` 为 true 时仍会触发后再导航 |

### 主题 Token

- `--nax-color-bg` / `--nax-color-border`
- `--nax-color-primary`
- `--nax-color-text` / `--nax-color-text-inverse`
- `--nax-font-size-md` / `--nax-font-size-lg`
- `--nax-font-weight-medium`

### 注意

1. 页面必须 `navigationStyle: custom`，否则会与系统导航栏叠层。
2. 微信小程序会为右侧预留胶囊宽度；其它小程序无胶囊 API 时不做错误 margin。
3. 首页 / tab 页通常设 `show-back=false`，或配置 `home-url` 作为栈底出口。


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | `''` | 标题文案 |
| showBack | boolean | `true` | 是否显示返回区，默认 true |
| backText | string | `''` | 返回文案（可选） |
| backIcon | string | `'chevron-left'` | 返回图标名（nax-icon），默认 chevron-left；空字符串则不显示图标 |
| backIconColor | string | `''` | 返回图标颜色；空串时跟随导航栏 type / 主题 |
| autoBack | boolean | `true` | 点击返回是否自动 navigateBack，默认 true |
| homeUrl | string | `''` | 栈底无法返回时 reLaunch 目标；空则仅 emit |
| fixed | boolean | `true` | 是否固定顶部，默认 true |
| placeholder | boolean | `true` | fixed 且非 immersive 时是否占位，默认 true |
| immersive | boolean | `false` | 沉浸：fixed 时不占位（内容可滚入顶栏下） |
| border | boolean | `true` | 底部分割线，默认 true |
| safeAreaInsetTop | boolean | `true` | 顶部状态栏安全区，默认 true |
| type | string | `'default'` | 外观 default \| primary，默认 default |
| height | string | `'44'` | 内容行高度（纯数字按 px），默认 44 |
| zIndex | number | `980` | fixed 层级，默认 980 |
| titleAlign | string | `'center'` | 标题对齐 center \| left，默认 center |
| show | boolean | `true` | 是否显示，默认 true |
| customClass | string | `''` | 根扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| back | 点击返回（autoBack 前后均会触发） |


## Slots

| 插槽 | 说明 |
|------|------|
| left | 左侧扩展（在返回按钮右侧） |
| default | 中间自定义（覆盖 title） |
| right | 右侧操作区 |
