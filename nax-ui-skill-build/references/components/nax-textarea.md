# nax-textarea

多行文本域。

## 用法示例

```uvue
<nax-textarea v-model="value" placeholder="请输入内容"></nax-textarea>

<!-- 字数统计 -->
<nax-textarea v-model="value" count placeholder="请输入内容"></nax-textarea>

<!-- 自动增高 -->
<nax-textarea v-model="value" auto-height placeholder="请输入内容"></nax-textarea>

<!-- 仅下边框 -->
<nax-textarea v-model="value" border border-type="bottom" placeholder="下划线风格"></nax-textarea>
```

## Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| modelValue | string | `''` | `v-model` 值 |
| placeholder | string | `请输入内容` | 占位 |
| height | string | `70` | 高度（数字按 px）；`auto-height` 时为 min-height |
| confirm-type | string | `return` | 键盘右下角；默认 return 可回车换行；设为 done/search 等会当完成并可能失焦 |
| disabled | boolean | `false` | 禁用 |
| readonly | boolean | `false` | 只读 |
| count | boolean | `false` | 字数统计 |
| focus | boolean | `false` | 获取焦点 |
| auto-height | boolean | `false` | 自动增高 |
| maxlength | number | `140` | 最大长度；`-1` 不限制 |
| border | boolean | `true` | 是否边框（支持 默认 surround） |
| border-type | string | `surround` | `surround` 四边 / `bottom` 仅下边框 |
| border-color | string | `''` | 边框色 |
| background | string | `''` | 背景色 |
| size | string | `md` | `sm` / `md` / `lg` |
| custom-class | string | `''` | 根节点扩展 class |

## Events

| 事件 | 说明 |
|---|---|
| update:modelValue | v-model |
| input | 输入变化（当前值），输入过程中每次触发 |
| change | 失焦时内容与聚焦时不同才触发（当前值），对齐原生 input 语义 |
| focus / blur | 聚焦 / 失焦（当前值） |
| confirm | 键盘完成（当前值） |
| linechange | 行数变化（detail） |
| keyboardheightchange | 键盘高度变化（detail） |
| click | 点击 |

## 依赖

- `nax-ui-theme`（CSS 变量 `--nax-*`，安装时依赖 / 运行时弱依赖）

## 平台说明

- 基于原生 `textarea`，`auto-height` / 键盘相关能力随端差异以官方文档为准。
- `readonly` 通过禁用原生编辑实现（样式弱于 `disabled`）。
- 鸿蒙端：原生 `cursor-spacing` 仍不支持。
