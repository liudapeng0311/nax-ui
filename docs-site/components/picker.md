---
demo: picker
---

# nax-picker

通用弹出容器，用于自定义弹层内容。支持从 **底部 / 中间 / 左侧 / 右侧** 弹出。

## 安装

```text
uni_modules/nax-picker
```

easycom 自动生效，页面直接使用 `<nax-picker />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

> 当前版本：0.1.2（见 `changelog.md`）

## 代码示例

### 基础用法

```uvue
<nax-button label="打开" @click="show = true"></nax-button>
<nax-picker v-model:show="show" position="bottom">
  <view class="panel">
    <text>自定义内容</text>
  </view>
</nax-picker>
```

### 弹出位置

| position | 说明 | 动画 |
|----------|------|------|
| `bottom` | 底部面板（默认） | slide-up |
| `center` | 居中弹层（默认约 86% 屏宽） | zoom |
| `left` | 左侧抽屉（贴边全高，默认约 78% 屏宽） | slide-left |
| `right` | 右侧抽屉（贴边全高，默认约 78% 屏宽） | slide-right |

### 事件

| 事件 | 说明 |
|------|------|
| update:show | 显隐变更 |
| open | 打开开始 |
| opened | 打开动画结束 |
| close | 关闭完成 |
| click-mask | 点击遮罩 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | boolean | `false` | v-model:show 控制显隐 |
| position | string | `'bottom'` | bottom \| center \| left \| right，默认 bottom |
| round | boolean | `true` | 圆角面板，默认 true |
| mask | boolean | `true` | 是否显示遮罩，默认 true |
| maskClosable | boolean | `true` | 点击遮罩是否关闭，默认 true |
| closeOnMask | boolean | `true` | 同 maskClosable（兼容命名） |
| closeOnClickOverlay | boolean | `true` | 同 maskClosable（兼容命名） |
| zIndex | number | `10070` | 层级，默认 10070 |
| duration | number | `280` | 动画时长 ms，默认 280 |
| width | string | `''` | 面板宽度（center 默认约 86% 屏宽；left/right 抽屉默认约 78%） |
| height | string | `''` | 面板高度（left/right 抽屉默认全屏高；bottom/center 可选） |
| safeAreaInsetBottom | boolean | `true` | 底部安全区（position=bottom 时默认 true） |
| customClass | string | `''` | 根节点扩展 class |
| customStyle | string | `''` | 根节点扩展 style |


## Events

| 事件 | 说明 |
|------|------|
| update:show | 显隐变更 |
| open | 打开（进场开始） |
| opened | 打开完成（进场结束） |
| close | 关闭完成（退场结束且容器卸载） |
| click-mask | 点击遮罩 |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义面板内容 |
