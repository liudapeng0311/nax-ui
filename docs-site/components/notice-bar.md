---
demo: notice-bar
---

# nax-notice-bar

滚动通告栏。提供常用能力。

## 安装

```text
uni_modules/nax-notice-bar
```

easycom 自动生效，页面直接使用 `<nax-notice-bar />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

> 当前版本：0.1.15（见 `changelog.md`）

## 代码示例

### 用法

```uvue
<nax-notice-bar :list="list"></nax-notice-bar>

<!-- 水平步进 -->
<nax-notice-bar mode="horizontal" scroll="step" :list="list"></nax-notice-bar>

<!-- 垂直步进 -->
<nax-notice-bar mode="vertical" :list="list"></nax-notice-bar>

<!-- 可关闭 + 更多 -->
<nax-notice-bar
  type="error"
  closable
  show-more
  :list="list"
  @close="onClose"
  @get-more="onMore"
  @click="onClick"
></nax-notice-bar>
```

### 事件

| 事件 | 说明 |
|------|------|
| click | 点击文案；步进为 index，衔接为 `-1` |
| close | 点击关闭 |
| getMore | 点击更多 |
| end | 步进播到最后一项 |
| update:show | 显示状态变化 |

### 端差异

- **Web / 小程序**：衔接模式用 CSS `@keyframes` 动画
- **App Android / iOS**：双段显式宽度 + `setInterval` `translateX` 模回绕（uvue 不支持 keyframes）
- **App 鸿蒙**：`UniElement.animate` 双段 0→-half 线性循环为主；失败回退 `requestAnimationFrame` + `style.setProperty` 模回绕（`#ifdef APP-HARMONY`）；步进仍用原生 swiper
- **步进模式**：三端统一原生 `swiper`

### 主题 Token

浅底语义色：`--nax-color-*-secondary`；文字色：`--nax-color-primary/info/success/warning/error`。


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| list | array | `() => [] as string[]` |  |
| type | string | `'warning'` |  |
| mode | string | `'horizontal'` |  |
| scroll | string | `''` |  |
| isCircular | boolean | `true` |  |
| showIcon | boolean | `true` |  |
| icon | string | `''` |  |
| showMore | boolean | `false` |  |
| closable | boolean | `false` |  |
| autoplay | boolean | `true` |  |
| paused | boolean | `false` |  |
| playState | string | `'play'` |  |
| duration | number | `2000` |  |
| speed | number | `50` |  |
| separator | string | `'    '` |  |
| disableTouch | boolean | `true` |  |
| show | boolean | `true` |  |
| noListHidden | boolean | `true` |  |
| customClass | string | `''` |  |


## Events

| 事件 | 说明 |
|------|------|
| click |  |
| close |  |
| getMore |  |
| end |  |
| update:show |  |

