# nax-form

uni-app x 表单 / 表单项，功能覆盖常用场景。

## Props — nax-form Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| model | object | `{}` | 表单数据对象 |
| rules | object | `{}` | 校验规则（字段 → 规则数组） |
| error-type | string | `message` | `message` / `toast` / `border-bottom` / `none` / `message-toast` |
| border-bottom | boolean | `true` | 表单项是否显示下边框 |
| label-position | string | `left` | `left` / `top` |
| label-width | string \| number | `80` | 标签宽度（px） |
| label-align | string | `left` | `left` / `center` / `right` |
| custom-class | string | `''` | 根节点扩展 class |

## Props — 规则字段（常用）

| 字段 | 说明 |
|---|---|
| required | 是否必填 |
| type | `string` / `number` / `boolean` / `integer` / `float` / `array` / `email` / `url` / `date` 等 |
| message | 失败提示 |
| trigger | `blur` / `change` 或数组 |
| min / max / len | 长度或数值范围 |
| pattern | 正则源字符串（不要两端斜杠引号） |
| enum | 枚举数组 |
| whitespace | 纯空格是否不通过 |

## Props — nax-form-item Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| label | string | `''` | 标签文案 |
| prop | string | `''` | 对应 model 字段（校验必填） |
| rules | array | `[]` | 本项规则（优先于 form.rules） |
| required | boolean | `false` | 仅展示必填星号 |
| border-bottom | boolean | `true` | 下边框；`true` 时跟随 form 开关 |
| label-position | string | `''` | 覆盖 form |
| label-width | string \| number | `''` | 覆盖 form（px） |
| label-align | string | `''` | 覆盖 form |
| left-icon / right-icon | string | `''` | nax-icon 名 |
| status | string | `default` | `default` / `success` / `warning` / `error` |
| error-message | string | `''` | 外部错误文案（优先展示） |
| custom-class | string | `''` | 根节点扩展 class |

## Slots

| 名称 | 说明 |
|---|---|
| default（form） | 放置 form-item |
| default（item） | 表单控件 |
| label（item） | 自定义标签 |

## Methods（ref 调用）

| 方法 | 说明 |
|---|---|
| validate() | 校验全部，返回 `Promise<boolean>`；失败 reject 错误数组 |
| validateField(props?, event?) | 校验指定字段；`event` 为 `blur`/`change` 时按 trigger 过滤 |
| resetFields() | 重置为首次注册时的快照并清空错误 |
| clearValidate(props?) | 清空校验结果 |
| setRules(rules) | 手动设置规则 |

## 依赖

- `nax-icon`（表单项左右图标）
- `nax-ui-theme`（CSS 变量 `--nax-*`，安装时依赖 / 运行时弱依赖）

## 平台说明

- 控件需自行 `v-model` 绑定到 `model` 字段；提交时调用 `validate()`。
- 字段事件触发（blur/change）需业务侧调用 `validateField(prop, 'blur')`。
