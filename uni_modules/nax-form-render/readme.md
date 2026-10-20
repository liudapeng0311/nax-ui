# nax-form-render

uni-app x 动态表单渲染器：由 schema（JSON 字符串 / 数组 / 对象）渲染出不同的表单项，校验规则同步生成。

## 依赖

| 依赖 | 说明 |
|------|------|
| `nax-form` / `nax-form-item` | 表单容器与表单项（标签、错误展示、校验链路） |
| `nax-input` / `nax-textarea` / `nax-search` / `nax-select` | 文本与选择类控件 |
| `nax-switch` / `nax-radio` / `nax-checkbox` | 开关与勾选类控件 |
| `nax-number-box` / `nax-slider` / `nax-rate` | 数值类控件 |
| `nax-datetime-picker` / `nax-calendar` / `nax-date-strip` | 日期时间类控件 |
| `nax-icon` / `nax-ui-theme` | 图标与主题 token（运行时弱依赖） |

## 基础用法

```uvue
<nax-form-render
  ref="formRef"
  v-model="formValue"
  :schema="schema"
  @change="onChange"
></nax-form-render>
```

```uts
const schema = `[
  { "prop": "account", "label": "账号", "type": "text", "placeholder": "4-12 位", "required": true },
  { "prop": "role", "label": "角色", "type": "select", "required": true,
    "options": [ { "value": "dev", "label": "开发" }, { "value": "ops", "label": "运维" } ] },
  { "prop": "notify", "label": "接收通知", "type": "switch" }
]`

const formValue = ref({} as UTSJSONObject)
const formRef = ref(null as ComponentPublicInstance | null)

function onSubmit() {
  const p = formRef.value!.validate() as Promise<boolean>
  p.then((_ok : boolean) => {
    // 通过校验，读取值：formRef.value!.getModel()
  }).catch((_err : any | null) => {
    // 校验失败，字段错误已由 nax-form-item 展示
  })
}
```

> schema 也可以传数组（`[{...}]`）或含 `fields` 数组的对象，三者在解析层等价。

## 控件类型

**控件类型是封闭枚举**——受 uni-app x 蒸汽模式渲染机制约束：模板在编译期静态分析，不支持运行期构造组件（`h()` / `resolveComponent()` 在 App 的 Vapor 模式均不支持），因此渲染分支在组件源码内以 `v-if` / `v-else-if` 穷举。**新增类型需要修改组件源码，不能由 schema 引入任意组件。**

| `type` | 控件 | 值类型 |
|--------|------|--------|
| `text` / `password` / `number-input` / `digit` / `tel` | `nax-input`（按 type 切换键盘） | string |
| `textarea` | `nax-textarea` | string |
| `search` | `nax-search` | string |
| `select` | `nax-select`（内置触发条） | string |
| `switch` | `nax-switch` | boolean |
| `radio` | `nax-radio-group` + `nax-radio` | string |
| `checkbox` | `nax-checkbox`（单勾） | boolean |
| `checkbox-group` | `nax-checkbox-group` + `nax-checkbox` | string[] |
| `number` | `nax-number-box` | number |
| `slider` | `nax-slider` | number |
| `rate` | `nax-rate` | number |
| `date` / `datetime` / `time` / `year-month` | `nax-datetime-picker`（内置触发条） | string |
| `calendar` | `nax-calendar`（组件自渲染触发条） | string |
| `date-strip` | `nax-date-strip`（行内，无弹层） | string |

schema 里出现枚举外的 `type` 时，该字段会渲染为可诊断的提示文案（而非静默空白），便于排查。

## 字段配置（schema）

| 字段 | 类型 | 说明 |
|------|------|------|
| prop | string | **必填**，字段名；对应表单值的 key，也是校验的 `prop` |
| label | string | 标签文案；缺省用 `prop` |
| type | string | 控件类型，见上表；缺省 `text` |
| placeholder | string | 占位文案 |
| required | boolean | 必填；为 true 时自动生成 `required` 规则并显示星号 |
| disabled | boolean | 禁用该字段 |
| options | array | `select` / `radio` / `checkbox-group` 的选项：`[{ value, label, disabled? }]` |
| min / max | number | 数值类下限 / 上限（`number` / `slider` / `rate`；`rate` 的 `max` 即星数） |
| step | number | 步长（`number` / `slider`） |
| maxlength | number | 文本最大长度（`textarea`，缺省 200） |
| rules | array | 该字段校验规则；存在时**取代**由 `required` 生成的那条 |
| trigger | string \| string[] | 校验触发时机；缺省 `['blur', 'change']` |
| minDate / maxDate | string | 日期类可选范围（`date` / `datetime` / `time` / `year-month` / `calendar` / `date-strip`） |
| showSecond | boolean | `datetime` / `time` 是否显示秒列 |
| tip | string | 提示文案，展示在控件下方 |

> `date-strip` 的 `minDate` / `maxDate` 只接受日期字符串（组件内只识别 `Date` 与字符串），传时间戳数字会静默失效。

## Props

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| schema | string \| array \| object | `''` | 字段配置 |
| modelValue | object | `{}` | `v-model` 表单值；传入的初值会补齐内部空字段（不覆盖已改值） |
| rules | object | `{}` | 额外校验规则；与 schema 生成的规则合并，**同字段以本 prop 优先** |
| error-type | string | `message` | `message` / `toast` / `border-bottom` / `none` |
| border-bottom | boolean | `true` | 表单项下边框 |
| label-position | string | `left` | `left` / `top` |
| label-width | string \| number | `80` | 标签宽度（px） |
| label-align | string | `left` | `left` / `center` / `right` |
| label-size | string \| number | `''` | 标签字号（px）；空串跟随组件默认 15 |
| disabled | boolean | `false` | 整体禁用（与字段级 `disabled` 取或） |
| custom-class | string | `''` | 根节点扩展 class |

## Events

| 事件 | 载荷 | 说明 |
|------|------|------|
| update:modelValue | `UTSJSONObject` | 表单值变化（v-model） |
| change | `{ prop, value, model }` | 表单值变化；`prop` 为触发字段 |
| confirm | `{ prop, value, model }` | 确认类控件确认（`datetime` / `calendar`） |
| open / close | `string`（字段名） | 弹层类控件显隐（`calendar`） |

## Methods（ref）

| 方法 | 说明 |
|------|------|
| validate() | 校验全部字段，返回 `Promise<boolean>`；失败 reject 错误数组 |
| validateField(props?, event?) | 校验指定字段 |
| resetFields() | 重置为 schema 初始值并清空错误 |
| clearValidate(props?) | 清空校验结果 |
| setSchema(schema) | 运行时替换 schema；**保留同名字段的已有值**，字段增删自动处理 |
| getModel() | 读取当前表单值（`UTSJSONObject`） |

> `setSchema` 之后会自动 `clearValidate`，避免已移除字段的错误残留。

## 值回写与校验

- 控件统一用 `:model-value` + `@update:model-value` 回写，**不使用 `v-model`**：`v-for` 内无法把 `v-model` 绑定到动态 key。
- 之所以不用 `@change` 取值：各控件载荷不统一（例如 `nax-select` 的 `change` 回传的是选中项**数组** `[{value,label,index}]`，`nax-input` 的 `change` 仅在失焦且内容变化时触发）。`update:modelValue` 才是统一的「值已变化」信号。
- 字段级校验无需手动触发：控件在值变化 / 失焦时回调 `nax-form-item`，规则里的 `trigger` 自动生效。

## 平台说明

- `select` / `datetime-picker` 在**微信小程序端**可映射模式会走微信系统弹层（`v-model:show` 不生效，点击内置触发条弹出）；`datetime` / `month-day` / `time` + 秒无法映射，保持自建弹层。详见各控件 readme。
- `date-strip` 的 `minDate` / `maxDate` 需传日期字符串（见上）。
- `calendar` 无内置触发条，组件自渲染触发条以驱动弹层显隐；其 `@change` 载荷为对象，组件取 `result` 字段作为值。

## 主题

通过 CSS 变量覆盖（沿用 nax-ui 主题体系）：

| Token | 用途 |
|-------|------|
| `--nax-color-bg` / `--nax-color-bg-hover` | 触发条背景 / 按压态 |
| `--nax-color-border` | 触发条边框 |
| `--nax-color-text` / `--nax-color-text-secondary` / `--nax-color-text-placeholder` | 文字色 |
| `--nax-color-error` | 未知类型提示 |
| `--nax-radius-md` / `--nax-border-width` / `--nax-space-3` / `--nax-font-size-md` | 圆角 / 边框 / 内距 / 字号 |
