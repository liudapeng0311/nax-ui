# nax-select

uni-app x 列选择器（底部弹层 + `picker-view`），功能覆盖常用场景。

## 依赖

- `nax-icon`（触发条箭头）
- `nax-transition`（弹层进退场动画）
- `nax-ui-theme`（CSS 变量 `--nax-*`，安装时依赖 / 运行时弱依赖）

## 组件特性

| 点 | nax-select |
|----|------------|
| 弹层绑定 | `v-model:show`（布尔）控制显隐 |
| 选中值绑定 | `v-model`：单列为单项 `value`，多列 / 联动为 `value` 数组；内置触发条据此回显 |
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

`v-model` 绑定选中值后，触发条会按 `list` 对应项的 `label` 回显；未绑定时仍显示 `placeholder`。有选中值时，右侧显示清除按钮并隐藏下拉箭头（`clearable`，默认开启，二者互斥），点击后清空选中并回写空的 `v-model`。

```uvue
<nax-select
  v-model="city"
  v-model:show="visible"
  show-trigger
  placeholder="请选择城市"
  :list="list"
  @confirm="onConfirm"
></nax-select>
```

```uts
const city = ref('1')
const visible = ref(false)
```

多列 / 联动把 `v-model` 绑成数组：

```uvue
<nax-select
  v-model="region"
  v-model:show="visible"
  show-trigger
  mode="multi-column-auto"
  :list="regionList"
  placeholder="省 / 市 / 区"
></nax-select>
```

```uts
const region = ref(['zhejiang', 'hangzhou', 'xihu'] as string[])
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
| show | boolean | `false` | `v-model:show` 显隐；**微信小程序端不生效**（点触发条弹出，自动回写 false） |
| modelValue | string / number / boolean / array | `''` | `v-model` 选中值；单列单项，多列/联动为 value 数组 |
| list | array | `[]` | 列数据 |
| mode | string | `single-column` | 见上表 |
| default-value | number[] | `[]` | 默认选中下标 |
| title | string | `''` | 弹层标题；**微信小程序端仅安卓显示为系统弹层标题** |
| confirm-text / cancel-text | string | 确认 / 取消 | 按钮文案；**微信小程序端不生效**（系统弹层固定文案） |
| value-name / label-name | string | value / label | 字段名 |
| child-name | string | children | 联动子级字段 |
| mask-closable | boolean | `true` | 点遮罩关闭；**微信小程序端不生效**（系统弹层自带遮罩） |
| safe-area-inset-bottom | boolean | `true` | 底部安全区；**微信小程序端不生效** |
| preserve-selection | boolean | `true` | 保留上次确认下标 |
| show-trigger | boolean | `false` | 内置触发条；**微信小程序端始终渲染触发条作为弹层触发区域** |
| clearable | boolean | `true` | 触发条有选中值时显示清除按钮 |
| placeholder | string | 请选择 | 触发条占位 |
| disabled | boolean | `false` | 触发条禁用 |
| separator | string | ` / ` | 多列展示分隔 |
| z-index | number | `10075` | 层级；**微信小程序端不生效** |
| size | string | `md` | 触发条 sm/md/lg |
| border | boolean | `true` | 触发条描边 |
| custom-class | string | `''` | 根扩展 class |

## 事件

| 事件 | 说明 |
|------|------|
| update:show | 显隐 |
| update:modelValue | 确认后回写选中值（单列单项 / 多列数组）；清除时回写空值 |
| confirm | 确认，回调选中项数组 |
| cancel | 取消或遮罩关闭 |
| clear | 点击触发条清除按钮 |
| change | 滚轮变化 |
| open / close | 打开 / 关闭 |

确认项字段：`value`、`label`、`index`，若源数据有 `extra` 则带回。

## 插槽

| 名称 | 说明 |
|------|------|
| trigger | 自定义触发区域（需 `show-trigger`） |

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-border-width` | 边框粗细 |
| `--nax-color-bg` | 背景色 |
| `--nax-color-bg-hover` | 按压/悬停背景色 |
| `--nax-color-border` | 边框色 |
| `--nax-color-divider` | 分割线色 |
| `--nax-color-mask` | 遮罩色 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-text-black` | 纯黑文字色 |
| `--nax-color-text-disabled` | 禁用文字色 |
| `--nax-color-text-placeholder` | 占位文字色 |
| `--nax-color-text-secondary` | 次要文字色 |

## 平台说明

- **iOS**：自研滚轮（原生 `picker-view` 列文字无法垂直居中），滚动停止吸附对齐选中行，支持点选。
- **Android / 鸿蒙 / Web**：自建弹层 + 原生 `picker-view` 滚轮。
- **微信小程序**：使用微信系统弹层 `picker`（`selector` / `multiSelector`），贴合微信原生 UI：
  - 滚动吸附后点「确定」回调，值即最终值，无 change 延迟与确认拦截问题
  - 系统弹层 UI 不可定制：`confirm-text` / `cancel-text` / `confirm-color` / `z-index` / `safe-area-inset-bottom` 等弹层定制 props 在微信端不生效；`title` 仅微信安卓端显示为弹层标题
  - `v-model:show` 程序化打开在微信端不生效，请点击触发条弹出（`show-trigger=false` 时微信端仍会渲染触发条作为触发区域）
  - 暗黑模式：跟随微信宿主深色主题，弹层自动适配（需小程序开启 darkmode）
- **鸿蒙**：原生滚轮；已禁用选项点选（点击被吞掉），请滑动选择后点「确认」。
- **鸿蒙暗黑模式**：组件自动移除原生滚轮默认的白色渐变遮罩。
- 联动最多 4 列。
