# nax-notice-bar

滚动通告栏。能力对齐 [uView Pro NoticeBar](https://uviewpro.cn/zh/components/noticeBar.html)。

## 用法

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

## Props

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|
| list | array | `[]` | 通告文案；`string` 或 `{ text\|title\|label }` |
| type | string | `warning` | `primary` / `info` / `success` / `warning` / `error` / `none` |
| mode | string | `horizontal` | `horizontal` / `vertical` |
| scroll | string | `''` | `seamless` 衔接 / `step` 步进；空则看 `is-circular` |
| is-circular | boolean | `true` | 兼容 uView：水平衔接 vs 步进 |
| show-icon | boolean | `true` | 左侧图标 |
| icon | string | `''` | 自定义 `nax-icon` 名 |
| show-more | boolean | `false` | 右侧更多箭头 |
| closable | boolean | `false` | 右侧关闭 |
| autoplay | boolean | `true` | 自动播放 |
| paused | boolean | `false` | 暂停（优先于 playState） |
| play-state | string | `play` | `play` / `paused` |
| duration | number | `2000` | 步进周期 ms |
| speed | number | `50` | 衔接滚动 px/s |
| separator | string | 全角空格 | 衔接拼接分隔符 |
| disable-touch | boolean | `true` | 步进禁止手滑 |
| show | boolean | `true` | 是否显示 |
| no-list-hidden | boolean | `true` | list 为空时隐藏 |
| custom-class | string | `''` | 根节点扩展 class |

## 事件

| 事件 | 说明 |
|------|------|
| click | 点击文案；步进为 index，衔接为 `-1` |
| close | 点击关闭 |
| getMore | 点击更多 |
| end | 步进播到最后一项 |
| update:show | 显示状态变化 |

## 插槽

| 名称 | 说明 |
|------|------|
| icon | 自定义左侧图标 |

## 端差异

- **Web / 小程序**：衔接模式用 CSS `@keyframes` 动画
- **App Android / iOS**：双段显式宽度 + `setInterval` `translateX` 模回绕（uvue 不支持 keyframes）
- **App 鸿蒙**：`UniElement.animate` 双段 0→-half 线性循环为主；失败回退 `requestAnimationFrame` + `style.setProperty` 模回绕（`#ifdef APP-HARMONY`）；步进仍用原生 swiper
- **步进模式**：三端统一原生 `swiper`

## 主题 Token

浅底语义色：`--nax-color-*-secondary`；文字色：`--nax-color-primary/info/success/warning/error`。

## 依赖

- `nax-icon`
- `nax-ui-theme`（可选）
