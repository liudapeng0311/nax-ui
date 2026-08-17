# nax-search

uni-app x 搜索框，功能覆盖常用搜索场景。

## 用法示例

```uvue
<nax-search v-model="keyword" @search="onSearch" @custom="onCustom"></nax-search>
```

## Props — 形状 shape

| 值 | 说明 |
|---|---|
| `round` | 胶囊圆角（默认） |
| `square` | 方角（`radius-md`） |

## Props — 常用 Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| modelValue | string | `''` | `v-model` 值 |
| shape | string | `round` | `round` / `square` |
| background | string | `''` | 输入区背景；空则 `--nax-color-bg-hover` |
| bg-color | string | `''` | 兼容别名；与 `background` 二选一，`background` 优先 |
| placeholder | string | `请输入关键字` | 占位 |
| clearable | boolean | `true` | 有内容时显示清除 |
| show-action | boolean | `true` | 显示右侧操作按钮 |
| action-text | string | `搜索` | 右侧按钮文案 |
| action-color | string | `''` | 右侧按钮文字色 |
| animation | boolean | `false` | 为 true 时右侧按钮仅聚焦显示 |
| input-align | string | `left` | `left` / `center` / `right` |
| disabled | boolean | `false` | 禁用；禁用时点击根节点触发 `click` |
| border-color | string | `''` | 有值时显示边框 |
| search-icon | string | `search` | 左侧图标名；空字符串隐藏 |
| search-icon-color | string | `''` | 图标色 |
| search-icon-size | string | `''` | 图标尺寸，数字按 px |
| color | string | `''` | 输入文字色 |
| placeholder-color | string | `''` | 占位色 |
| maxlength | number | `-1` | 最大长度；`-1` 不限制 |
| height | string | `''` | 覆盖高度（数字按 px） |
| label | string | `''` | 左侧文案 |
| size | string | `md` | `sm` / `md` / `lg` |
| focus | boolean | `false` | 自动聚焦 |
| adjust-position | boolean | `true` | 键盘上推页面 |
| custom-class | string | `''` | 根节点扩展 class |

## Events

| 事件 | 说明 |
|---|---|
| update:modelValue | v-model |
| input | 输入变化（当前值），输入过程中每次触发 |
| change | 失焦时内容与聚焦时不同才触发（当前值），对齐原生 input 语义 |
| search | 键盘搜索/完成（当前值） |
| custom | 点击右侧操作（当前值） |
| focus / blur | 聚焦 / 失焦（当前值） |
| clear | 点击清除 |
| click | 仅 `disabled` 时点击根节点 |
| clickIcon | 点击搜索图标 |

## Slots

| 名称 | 说明 |
|---|---|
| label | 自定义左侧 label |
| action | 自定义右侧操作区 |

## 依赖

- `nax-icon`（搜索 / 清除图标）
- `nax-ui-theme`（CSS 变量 `--nax-*`，安装时依赖 / 运行时弱依赖）

## 平台说明

- 基于原生 `input` + `confirm-type=search`。
- 清除按钮：有内容即显示（不依赖 focus）。
