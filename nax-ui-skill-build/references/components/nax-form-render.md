# nax-form-render

uni-app x 动态表单渲染器：由 schema（JSON 字符串 / 数组 / 对象）渲染出不同的表单项，校验规则同步生成。

## 用法示例

```uvue
<nax-form-render
  ref="formRef"
  v-model="formValue"
  :schema="schema"
  @change="onChange"
></nax-form-render>
```

## Props — 字段配置（schema）

| 字段 | 类型 | 说明 |
|---|---|---|
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

## Props — Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
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
|---|---|---|
| update:modelValue | `UTSJSONObject` | 表单值变化（v-model） |
| change | `{ prop, value, model }` | 表单值变化；`prop` 为触发字段 |
| confirm | `{ prop, value, model }` | 确认类控件确认（`datetime` / `calendar`） |
| open / close | `string`（字段名） | 弹层类控件显隐（`calendar`） |

## Methods（ref 调用）

| 方法 | 说明 |
|---|---|
| validate() | 校验全部字段，返回 `Promise<boolean>`；失败 reject 错误数组 |
| validateField(props?, event?) | 校验指定字段 |
| resetFields() | 重置为 schema 初始值并清空错误 |
| clearValidate(props?) | 清空校验结果 |
| setSchema(schema) | 运行时替换 schema；**保留同名字段的已有值**，字段增删自动处理 |
| getModel() | 读取当前表单值（`UTSJSONObject`） |

## 平台说明

- `select` / `datetime-picker` 在**微信小程序端**可映射模式会走微信系统弹层（`v-model:show` 不生效，点击内置触发条弹出）；`datetime` / `month-day` / `time` + 秒无法映射，保持自建弹层。详见各控件 readme。
- `date-strip` 的 `minDate` / `maxDate` 需传日期字符串（见上）。
- `calendar` 无内置触发条，组件自渲染触发条以驱动弹层显隐；其 `@change` 载荷为对象，组件取 `result` 字段作为值。
