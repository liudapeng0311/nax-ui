# nax-notice-bar

滚动通告栏。提供常用能力。

## 用法示例

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
|---|---|---|---|
| list | array | `[]` | 通告文案；`string` 或 `{ text\|title\|label }` |
| type | string | `warning` | `primary` / `info` / `success` / `warning` / `error` / `none` |
| mode | string | `horizontal` | `horizontal` / `vertical` |
| scroll | string | `''` | `seamless` 衔接 / `step` 步进；空则看 `is-circular` |
| is-circular | boolean | `true` | 兼容：水平衔接 vs 步进 |
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

## Events

| 事件 | 说明 |
|---|---|
| click | 点击文案；步进为 index，衔接为 `-1` |
| close | 点击关闭 |
| getMore | 点击更多 |
| end | 步进播到最后一项 |
| update:show | 显示状态变化 |

## Slots

| 名称 | 说明 |
|---|---|
| icon | 自定义左侧图标 |

## 依赖

- `nax-icon`
- `nax-ui-theme`（可选）
