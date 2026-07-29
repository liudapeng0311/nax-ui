# nax-select

uni-app x 列选择器（底部弹层 + `picker-view`），功能覆盖常用场景。

## 依赖

- `nax-icon`（触发条箭头）
- `nax-transition`（弹层进退场动画）
- `nax-ui-theme`（CSS 变量 `--nax-*`，安装时依赖 / 运行时弱依赖）

## 组件特性

| 点 | nax-select |
|----|------------|
| 弹层绑定 | `v-model:show`（布尔），避免占用表单 `v-model` 语义 |
| mode 拼写 | 推荐 `multi-column` / `multi-column-auto`，兼容历史 `mutil-*` 拼写 |
| 安全区 | `safe-area-inset-bottom` **默认 true** |
| 触发条 | 可选 `show-trigger`，表单页可少写一层 Cell/Button |
| 事件 | 额外 `change` / `open` / `close` |
| 遮罩关闭 | `mask-closable`（兼容 `mask-close-able`） |

## 基础用法

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

## 内置触发条

```uvue
<nax-select
  v-model:show="visible"
  show-trigger
  placeholder="请选择城市"
  :list="list"
  @confirm="onConfirm"
></nax-select>
```

## 模式 mode

| 值 | 说明 | list 形态 |
|----|------|-----------|
| `single-column` | 单列（默认） | `[{ value, label }]` |
| `multi-column` | 多列独立 | `[[col1...], [col2...]]` |
| `multi-column-auto` | 多列联动 | 树形，子级字段默认 `children` |

兼容：`mutil-column` / `mutil-column-auto` / `cascade`。

## 常用 Props

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

## 事件

| 事件 | 说明 |
|------|------|
| update:show | 显隐 |
| confirm | 确认，回调选中项数组 |
| cancel | 取消或遮罩关闭 |
| change | 滚轮变化 |
| open / close | 打开 / 关闭 |

确认项字段：`value`、`label`、`index`，若源数据有 `extra` 则带回。

## 插槽

| 名称 | 说明 |
|------|------|
| trigger | 自定义触发区域（需 `show-trigger`） |

## 主题 Token

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 面板 / 触发条背景 |
| `--nax-color-mask` | 遮罩 |
| `--nax-color-primary` | 确认色 |
| `--nax-color-text` / `secondary` / `placeholder` | 文案 |
| `--nax-color-divider` | 顶部分割线 |
| `--nax-radius-xl` | 面板顶圆角（建议业务覆盖为 12px+） |

## 平台说明

- 全端统一使用原生 `picker-view` 滚轮（含鸿蒙）。
- **鸿蒙**：原生滚轮；**已禁用选项点选**（点击被吞掉），请滑动选择后点「确认」。
- 微信小程序滚动未结束时点确认会被忽略（滚动结束后方可确认）。
- 弹层自包含，不依赖 `nax-popup`。
- 联动最多 4 列。
