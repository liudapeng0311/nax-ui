# nax-input

uni-app x 单行输入框。

## 用法示例

```uvue
<nax-input v-model="value" border placeholder="请输入内容"></nax-input>

<!-- 仅下边框 -->
<nax-input v-model="value" border border-type="bottom" placeholder="下划线风格"></nax-input>
```

## Props — 类型 type

| 值 | 说明 |
|---|---|
| `text` | 文本（默认） |
| `password` | 密码（可配 `password-icon` 切换可见） |
| `number` | 数字键盘 |
| `digit` | 带小数点数字键盘 |
| `tel` | 电话键盘 |
| `email` / `url` / `nickname` / `safe-password` / `none` | 透传原生 input type |

## Props — 常用 Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| modelValue | string | `''` | `v-model` 值 |
| type | string | `text` | 见上表 |
| clearable | boolean | `true` | 有内容时显示清除 |
| input-align | string | `left` | `left` / `center` / `right` |
| placeholder | string | `请输入内容` | 占位 |
| disabled | boolean | `false` | 禁用 |
| readonly | boolean | `false` | 只读 |
| maxlength | number | `140` | 最大长度；`-1` 不限制 |
| border | boolean | `false` | 是否边框 |
| border-type | string | `surround` | `surround` 四边 / `bottom` 仅下边框 |
| border-color | string | `''` | 边框色 |
| background | string | `''` | 背景色；无边框默认透明，传入后生效 |
| password-icon | boolean | `true` | 密码可见切换 |
| size | string | `md` | `sm` / `md` / `lg` |
| height | string | `''` | 覆盖高度（数字按 px） |
| trim | boolean | `true` | 失焦去首尾空格 |
| confirm-type | string | `done` | 键盘完成按钮文案 |
| focus | boolean | `false` | 自动聚焦 |
| prefix-icon / suffix-icon | string | `''` | 前后缀图标名 |
| custom-class | string | `''` | 根节点扩展 class |

## Events

| 事件 | 说明 |
|---|---|
| update:modelValue | v-model |
| input | 输入变化（当前值），输入过程中每次触发 |
| change | 失焦时内容与聚焦时不同才触发（当前值），对齐原生 input 语义 |
| focus / blur | 聚焦 / 失焦（当前值） |
| confirm | 键盘完成（当前值） |
| click | 点击 |
| clear | 点击清除 |

## Slots

| 名称 | 说明 |
|---|---|
| prefix | 自定义前缀 |
| suffix | 自定义后缀 |

## 依赖

- `nax-icon`（清除 / 密码可见 / 前后缀图标）
- `nax-ui-theme`（CSS 变量 `--nax-*`，安装时依赖 / 运行时弱依赖）

## 平台说明

- 基于原生 `input`，键盘类型随端能力差异以官方文档为准。
- `readonly` 通过禁用原生编辑实现（样式弱于 `disabled`）。
- Android 暗黑模式下跨组件 CSS 变量可能失效，请通过 `custom-class` 传入 `nax-theme-dark`。
