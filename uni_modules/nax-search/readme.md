# nax-search

uni-app x 搜索框，功能主要对齐 [uView Plus Search](https://ijry.github.io/uview-plus/components/search.html) / uView Pro Search。

## 依赖

- `nax-icon`（搜索 / 清除图标）
- `nax-ui-theme`（CSS 变量 `--nax-*`，安装时依赖 / 运行时弱依赖）

## 基础用法

```uvue
<nax-search v-model="keyword" @search="onSearch" @custom="onCustom"></nax-search>
```

## 形状 shape

| 值 | 说明 |
|----|------|
| `round` | 胶囊圆角（默认） |
| `square` | 方角（`radius-md`） |

## 常用 Props

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| modelValue | string | `''` | `v-model` 值 |
| shape | string | `round` | `round` / `square` |
| background | string | `''` | 输入区背景；空则 `--nax-color-bg-hover` |
| bg-color | string | `''` | 兼容 uView；与 `background` 二选一，`background` 优先 |
| placeholder | string | `请输入关键字` | 占位 |
| clearable | boolean | `true` | 有内容时显示清除（兼容 `clearabled`） |
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

## 事件

| 事件 | 说明 |
|------|------|
| update:modelValue | v-model |
| input / change | 内容变化（当前值） |
| search | 键盘搜索/完成（当前值） |
| custom | 点击右侧操作（当前值） |
| focus / blur | 聚焦 / 失焦（当前值） |
| clear | 点击清除 |
| click | 仅 `disabled` 时点击根节点 |
| clickIcon | 点击搜索图标 |

## 插槽

| 名称 | 说明 |
|------|------|
| label | 自定义左侧 label |
| action | 自定义右侧操作区 |

## 主题 Token（可选覆盖）

| Token | 用途 |
|-------|------|
| `--nax-search-bg` | 输入区背景 |
| `--nax-search-clear-bg` | 清除按钮圆底 |
| `--nax-color-bg-hover` | 默认背景回退 |
| `--nax-color-text` | 文字 / 操作按钮 |
| `--nax-radius-md` | square 圆角 |
| `--nax-space-*` | 内边距 / 间距 |

## 平台说明

- 基于原生 `input` + `confirm-type=search`。
- 清除按钮：有内容即显示（不依赖 focus），兼容鸿蒙 focus 不稳定与 Web blur 抢点击。
- App 端去掉 Web 专用 `outline` / `appearance`（条件编译）。
- 鸿蒙端对 input 高度/行高做了加高与内联居中（`#ifdef APP-HARMONY`）。
