# nax-textarea

多行文本域。功能主要对齐 [uView Pro Textarea](https://uviewpro.cn/zh/components/textarea.html)；`formatter` 等 UTS 不便支持的能力暂不做。

## 依赖

- `nax-ui-theme`（CSS 变量 `--nax-*`，安装时依赖 / 运行时弱依赖）

## 基础用法

```uvue
<nax-textarea v-model="value" placeholder="请输入内容"></nax-textarea>

<!-- 字数统计 -->
<nax-textarea v-model="value" count placeholder="请输入内容"></nax-textarea>

<!-- 自动增高 -->
<nax-textarea v-model="value" auto-height placeholder="请输入内容"></nax-textarea>

<!-- 仅下边框 -->
<nax-textarea v-model="value" border border-type="bottom" placeholder="下划线风格"></nax-textarea>
```

## 常用 Props

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| modelValue | string | `''` | `v-model` 值 |
| placeholder | string | `请输入内容` | 占位 |
| height | string | `70` | 高度（数字按 px）；`auto-height` 时为 min-height |
| confirm-type | string | `return` | 键盘右下角；默认 return 可回车换行；设为 done/search 等会当完成并可能失焦 |
| disabled | boolean | `false` | 禁用 |
| readonly | boolean | `false` | 只读 |
| count | boolean | `false` | 字数统计（清单亦称 show-count） |
| focus | boolean | `false` | 获取焦点 |
| auto-height | boolean | `false` | 自动增高 |
| maxlength | number | `140` | 最大长度；`-1` 不限制 |
| border | boolean | `true` | 是否边框（对齐 uView 默认 surround） |
| border-type | string | `surround` | `surround` 四边 / `bottom` 仅下边框 |
| border-color | string | `''` | 边框色 |
| background | string | `''` | 背景色 |
| size | string | `md` | `sm` / `md` / `lg` |
| custom-class | string | `''` | 根节点扩展 class |

更多键盘相关：`cursor`、`cursor-spacing`、`selection-start`、`selection-end`、`show-confirm-bar`、`confirm-hold`、`adjust-position`、`hold-keyboard`、`fixed`、`placeholder-style`。

## 事件

| 事件 | 说明 |
|------|------|
| update:modelValue | v-model |
| input / change | 内容变化（当前值） |
| focus / blur | 聚焦 / 失焦（当前值） |
| confirm | 键盘完成（当前值） |
| linechange | 行数变化（detail） |
| keyboardheightchange | 键盘高度变化（detail） |
| click | 点击 |

## 暂不支持（相对 uView Pro）

| 能力 | 原因 |
|------|------|
| `formatter` | UTS 不适合以 Function prop 透传 |
| `ignoreCompositionEvent` | 合成输入处理端差异大，暂不做 |
| `placeholderClass` | 样式隔离 2.0 下类穿透不稳定，请用 `placeholder-style` |
| `disableDefaultPadding` | uni-app x 原生 textarea 未统一提供 |

## 主题 Token（可选覆盖）

| Token | 用途 |
|------|------|
| `--nax-textarea-bg` / `--nax-color-bg` | 背景 |
| `--nax-color-border` | 边框 |
| `--nax-color-primary` | 聚焦边框 |
| `--nax-color-text` | 文字 |
| `--nax-color-text-secondary` | 字数统计 |
| `--nax-color-error` | 达上限字数色 |
| `--nax-radius-md` | 圆角 |
| `--nax-space-*` | 内边距 |

## 平台说明

- 基于原生 `textarea`，`auto-height` / 键盘相关能力随端差异以官方文档为准。
- `readonly` 通过禁用原生编辑实现（样式弱于 `disabled`）。
- App 端去掉 Web 专用 `outline` / `resize`（条件编译）。
- **鸿蒙**：高度与 nax-input 相同，写在原生 textarea 的明确 px 上，避免 height:100% / class height:auto 覆盖导致键盘避让测高失败；原生 cursor-spacing 仍不支持。
- **鸿蒙演示页**：关闭原生 `adjust-position`，通过 `#ifdef APP-HARMONY` 的底部键盘占位 + 按遮挡量微调 `scroll-top`（不使用 `scroll-into-view`，避免输入框被顶到顶部留白过大）。组件默认 `adjust-position` 仍为 true，业务页可直接使用原生上推。