# nax-form

uni-app x 表单 / 表单项，功能覆盖常用场景。

## 依赖

- `nax-icon`（表单项左右图标）
- `nax-ui-theme`（CSS 变量 `--nax-*`，安装时依赖 / 运行时弱依赖）

## 基础用法

```uvue
<template>
  <nax-form ref="formRef" :model="form" :rules="rules" label-width="80" error-type="message">
    <nax-form-item label="姓名" prop="name" required>
      <nax-input v-model="form.name" border placeholder="请输入姓名"></nax-input>
    </nax-form-item>
    <nax-form-item label="简介" prop="intro">
      <nax-input v-model="form.intro" border placeholder="请输入简介"></nax-input>
    </nax-form-item>
  </nax-form>
  <nax-button type="primary" label="提交" @click="onSubmit"></nax-button>
</template>

<script setup lang="uts">
const formRef = ref(null)
const form = reactive({
  name: '',
  intro: ''
} as UTSJSONObject)

const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: ['blur', 'change'] }
  ],
  intro: [
    { min: 3, max: 50, message: '简介 3-50 字' }
  ]
} as UTSJSONObject

function onSubmit() {
  const comp = formRef.value
  if (comp == null) {
    return
  }
  // 通过 defineExpose 暴露的 validate
  comp.validate().then((_ok: boolean) => {
    uni.showToast({ title: '校验通过', icon: 'none' })
  }).catch((_err: any) => {
    // 字段错误已展示
  })
}
</script>
```

> 小程序端若对象里的函数规则被过滤，请在 `onReady` 中调用 `setRules(rules)`。

## nax-form Props

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| model | object | `{}` | 表单数据对象 |
| rules | object | `{}` | 校验规则（字段 → 规则数组） |
| error-type | string | `message` | `message` / `toast` / `border-bottom` / `none` / `message-toast` |
| border-bottom | boolean | `true` | 表单项是否显示下边框 |
| label-position | string | `left` | `left` / `top` |
| label-width | string \| number | `80` | 标签宽度（px） |
| label-align | string | `left` | `left` / `center` / `right` |
| custom-class | string | `''` | 根节点扩展 class |

## nax-form Methods（ref）

| 方法 | 说明 |
|------|------|
| validate() | 校验全部，返回 `Promise<boolean>`；失败 reject 错误数组 |
| validateField(props?, event?) | 校验指定字段；`event` 为 `blur`/`change` 时按 trigger 过滤 |
| resetFields() | 重置为首次注册时的快照并清空错误 |
| clearValidate(props?) | 清空校验结果 |
| setRules(rules) | 手动设置规则 |

## 规则字段（常用）

| 字段 | 说明 |
|------|------|
| required | 是否必填 |
| type | `string` / `number` / `boolean` / `integer` / `float` / `array` / `email` / `url` / `date` 等 |
| message | 失败提示 |
| trigger | `blur` / `change` 或数组 |
| min / max / len | 长度或数值范围 |
| pattern | 正则源字符串（不要两端斜杠引号） |
| enum | 枚举数组 |
| whitespace | 纯空格是否不通过 |

> 未内置 `validator` 异步自定义函数（蒸汽模式 / 小程序传函数限制）；复杂逻辑可在提交前自行判断。

## nax-form-item Props

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
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

## 插槽

| 名称 | 说明 |
|------|------|
| default（form） | 放置 form-item |
| default（item） | 表单控件 |
| label（item） | 自定义标签 |

## 主题 Token

| Token | 用途 |
|-------|------|
| `--nax-color-text` | 标签文字 |
| `--nax-color-error` | 错误文案 / 必填星号 / 错误下划线 |
| `--nax-color-border` | 默认下划线 |
| `--nax-color-success` / `--nax-color-warning` | status 下划线 |

## 平台说明

- Android 端的 `provide/inject` 使用明确 `Ref` 与函数默认类型，避免 `null` 被推断成 `Void`；同时通过 `APP-ANDROID` 为表单及表单项补充原生 flex 拉伸与宽度约束。
- 控件需自行 `v-model` 绑定到 `model` 字段；提交时调用 `validate()`。
- 字段事件触发（blur/change）需业务侧调用 `validateField(prop, 'blur')`；后续可与输入类组件深度集成。
