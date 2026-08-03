---
demo: select
---

# nax-select

uni-app x 列选择器（底部弹层 + `picker-view`），功能覆盖常用场景。

## 安装

```text
uni_modules/nax-select
```

easycom 自动生效，页面直接使用 `<nax-select />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

> 当前版本：0.1.14（见 `changelog.md`）

## 代码示例

### 组件特性

| 点 | nax-select |
|----|------------|
| 弹层绑定 | `v-model:show`（布尔），避免占用表单 `v-model` 语义 |
| mode 拼写 | 推荐 `multi-column` / `multi-column-auto`，兼容历史 `mutil-*` 拼写 |
| 安全区 | `safe-area-inset-bottom` **默认 true** |
| 触发条 | 可选 `show-trigger`，表单页可少写一层 Cell/Button |
| 事件 | 额外 `change` / `open` / `close` |
| 遮罩关闭 | `mask-closable`（兼容 `mask-close-able`） |

### 基础用法

```uvue
<nax-button label="打开选择" @click="visible = true"></nax-button>
<nax-select
  v-model:show="visible"
  :list="list"
  title="请选择"
  @confirm="onConfirm"
></nax-select>
```

```uts
const visible = ref(false)
const list = [
  { value: '1', label: '雪月夜' },
  { value: '2', label: '冷夜雨' }
]

function onConfirm(items: UTSJSONObject[]) {
  // items[i].value / .label / .index
}
```

### 内置触发条

```uvue
<nax-select
  v-model:show="visible"
  show-trigger
  placeholder="请选择城市"
  :list="list"
  @confirm="onConfirm"
></nax-select>
```

### 模式 mode

| 值 | 说明 | list 形态 |
|----|------|-----------|
| `single-column` | 单列（默认） | `[{ value, label }]` |
| `multi-column` | 多列独立 | `[[col1...], [col2...]]` |
| `multi-column-auto` | 多列联动 | 树形，子级字段默认 `children` |

兼容：`mutil-column` / `mutil-column-auto` / `cascade`。

### 常用 Props

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| show | boolean | `false` | `v-model:show` 显隐 |
| list | array | `[]` | 列数据 |
| mode | string | `single-column` | 见上表 |
| default-value | number[] | `[]` | 默认选中下标 |
| title | string | `''` | 标题 |
| confirm-text / cancel-text | string | 确认 / 取消 | 按钮文案 |
| value-name / label-name | string | value / label | 字段名 |
| child-name | string | children | 联动子级字段 |
| mask-closable | boolean | `true` | 点遮罩关闭 |
| safe-area-inset-bottom | boolean | `true` | 底部安全区 |
| preserve-selection | boolean | `true` | 保留上次确认下标 |
| show-trigger | boolean | `false` | 内置触发条 |
| placeholder | string | 请选择 | 触发条占位 |
| disabled | boolean | `false` | 触发条禁用 |
| separator | string | ` / ` | 多列展示分隔 |
| z-index | number | `10075` | 层级 |
| size | string | `md` | 触发条 sm/md/lg |
| border | boolean | `true` | 触发条描边 |
| custom-class | string | `''` | 根扩展 class |

### 事件

| 事件 | 说明 |
|------|------|
| update:show | 显隐 |
| confirm | 确认，回调选中项数组 |
| cancel | 取消或遮罩关闭 |
| change | 滚轮变化 |
| open / close | 打开 / 关闭 |

确认项字段：`value`、`label`、`index`，若源数据有 `extra` 则带回。

### 主题 Token

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 面板 / 触发条背景 |
| `--nax-color-mask` | 遮罩 |
| `--nax-color-primary` | 确认色 |
| `--nax-color-text` / `secondary` / `placeholder` | 文案 |
| `--nax-color-divider` | 顶部分割线 |
| `--nax-radius-xl` | 面板顶圆角（建议业务覆盖为 12px+） |

### 平台说明

- 全端统一使用原生 `picker-view` 滚轮（含鸿蒙）。
- **鸿蒙**：原生滚轮；**已禁用选项点选**（点击被吞掉），请滑动选择后点「确认」。
- **鸿蒙暗黑模式**：通过 `mask-top-style` / `mask-bottom-style` 移除原生滚轮默认的白色渐变遮罩；该分端处理由 `APP-HARMONY` 条件编译。
- 微信小程序滚动未结束时点确认会被忽略（滚动结束后方可确认）。
- 弹层自包含，不依赖 `nax-popup`。
- 联动最多 4 列。


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | boolean | `false` | v-model:show 控制弹层显隐（对齐  的 v-model 布尔用法） |
| list | array | `() => [] as any[]` | 列数据；单列一维 / 多列二维 / 联动树形（children） |
| mode | string | `'single-column'` | single-column \| multi-column \| multi-column-auto（兼容 mutil-column / mutil-column-auto） |
| defaultValue | array | `() => [] as any[]` | 默认选中下标数组，如 [0] / [1, 2] |
| title | string | `''` | 顶部标题 |
| confirmText | string | `'确认'` | 确认文案，默认「确认」 |
| cancelText | string | `'取消'` | 取消文案，默认「取消」 |
| confirmColor | string | `''` | 确认色；空则用主题主色 |
| cancelColor | string | `''` | 取消色；空则用次文案色 |
| valueName | string | `'value'` | list 项 value 字段名，默认 value |
| labelName | string | `'label'` | list 项 label 字段名，默认 label |
| childName | string | `'children'` | 联动子级字段名，默认 children |
| maskClosable | boolean | `true` | 点击遮罩是否关闭，默认 true（兼容 maskCloseAble） |
| /** 兼容  拼写 */
		maskCloseAble | boolean | `true` |  |
| safeAreaInsetBottom | boolean | `true` | 底部安全区，默认 true（比  默认更友好） |
| zIndex | number | `10075` | 弹层层级，默认 10075 |
| preserveSelection | boolean | `true` | 再次打开是否保留上次确认项，默认 true |
| showTrigger | boolean | `false` | 是否渲染内置触发条 |
| placeholder | string | `'请选择'` | 触发条占位 |
| disabled | boolean | `false` | 触发条禁用 |
| separator | string | `' / '` | 多列展示分隔符，默认「 / 」 |
| border | boolean | `true` | 触发条是否描边，默认 true |
| size | string | `'md'` | 触发条尺寸 sm \| md \| lg |
| customClass | string | `''` | 根节点扩展 class |
| maskCloseAble | boolean | — | 兼容  拼写，与 maskClosable 任一为 false 则不可点遮罩关闭 |


## Events

| 事件 | 说明 |
|------|------|
| update:show | 弹层显隐 |
| confirm | 点确认，回调选中项数组 { value, label, index, extra? } |
| cancel | 点取消 / 遮罩关闭，回调当前滚轮项 |
| change | 滚轮变化（当前选中项数组） |
| open | / close 打开 / 关闭 |
| close |  |


## Slots

| 插槽 | 说明 |
|------|------|
| trigger | 自定义触发区域（需 showTrigger） |
