---
demo: form
---

# nax-form / nax-form-item

> 当前版本：0.1.5

uni-app x 表单 / 表单项，功能覆盖常用场景。

## 安装

- 插件市场：[nax-form](https://ext.dcloud.net.cn/plugin?id=29035)

easycom 自动生效，页面直接使用 `<nax-form />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 基础用法

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

:::

::: details 基础校验

```uvue
<nax-form
	ref="formRef"
	:model="formModel"
	:rules="rules"
	label-position="left"
	:label-width="80"
	label-align="left"
	error-type="message"
	:border-bottom="true"
>
	<nax-form-item label="姓名" prop="name" required>
		<nax-input v-model="name" placeholder="请输入姓名" :clearable="true" @change="syncFormModel" @blur="syncFormModel"></nax-input>
	</nax-form-item>
	<nax-form-item label="手机" prop="phone" required>
		<nax-input v-model="phone" type="number" placeholder="请输入手机号" :clearable="true" @change="syncFormModel" @blur="syncFormModel"></nax-input>
	</nax-form-item>
	<nax-form-item label="邮箱" prop="email">
		<nax-input v-model="email" placeholder="选填，校验邮箱格式" :clearable="true" @change="syncFormModel" @blur="syncFormModel"></nax-input>
	</nax-form-item>
	<nax-form-item label="密码" prop="password" required>
		<nax-input v-model="password" type="password" placeholder="6-20 位" :clearable="true" @change="syncFormModel" @blur="syncFormModel"></nax-input>
	</nax-form-item>
	<nax-form-item label="简介" prop="intro" label-position="top">
		<nax-textarea v-model="intro" placeholder="至少 5 个字" height="80" @change="syncFormModel" @blur="syncFormModel"></nax-textarea>
	</nax-form-item>
	<nax-form-item label="性别" prop="sex" required>
		<nax-radio-group v-model="sex" @change="syncFormModel">
			<nax-radio name="1" label="男"></nax-radio>
			<nax-radio name="2" label="女"></nax-radio>
		</nax-radio-group>
	</nax-form-item>
	<nax-form-item label="协议" prop="agree" required>
		<nax-checkbox v-model="agree" label="我已阅读并同意用户协议" @change="syncFormModel"></nax-checkbox>
	</nax-form-item>
</nax-form>

<nax-button type="primary" label="提交校验" @click="onSubmit"></nax-button>
<nax-button label="重置" @click="onReset"></nax-button>
<nax-button variant="secondary" label="清空错误" @click="onClear"></nax-button>
```

```uts
type NaxFormExpose = {
	validate : () => Promise<boolean>
	resetFields : () => void
	clearValidate : () => void
}
const formRef = ref(null as NaxFormExpose | null)

const name = ref('')
const phone = ref('')
const email = ref('')
const password = ref('')
const intro = ref('')
const sex = ref('')
const agree = ref(false)

// 控件 v-model 与 UTSJSONObject model 双向同步
const formModel = {
	name: '',
	phone: '',
	email: '',
	password: '',
	intro: '',
	sex: '',
	agree: false
} as UTSJSONObject

function syncFormModel() {
	formModel.set('name', name.value)
	formModel.set('phone', phone.value)
	formModel.set('email', email.value)
	formModel.set('password', password.value)
	formModel.set('intro', intro.value)
	formModel.set('sex', sex.value)
	formModel.set('agree', agree.value)
}

const rules = {
	name: [
		{
			required: true,
			message: '请输入姓名',
			trigger: ['blur', 'change']
		} as UTSJSONObject,
		{
			min: 2,
			max: 10,
			message: '姓名长度 2-10 个字'
		} as UTSJSONObject
	] as any[],
	phone: [
		{
			required: true,
			message: '请输入手机号'
		} as UTSJSONObject,
		{
			pattern: '^1\\d{10}$',
			message: '手机号格式不正确'
		} as UTSJSONObject
	] as any[],
	email: [
		{
			type: 'email',
			message: '邮箱格式不正确'
		} as UTSJSONObject
	] as any[],
	password: [
		{
			required: true,
			message: '请输入密码'
		} as UTSJSONObject,
		{
			min: 6,
			max: 20,
			message: '密码 6-20 位'
		} as UTSJSONObject
	] as any[],
	intro: [
		{
			min: 5,
			message: '简介至少 5 个字'
		} as UTSJSONObject
	] as any[],
	sex: [
		{
			required: true,
			message: '请选择性别'
		} as UTSJSONObject
	] as any[],
	agree: [
		{
			type: 'accepted',
			required: true,
			message: '请勾选用户协议'
		} as UTSJSONObject
	] as any[]
} as UTSJSONObject

function onSubmit() {
	syncFormModel()
	if (formRef.value == null) {
		return
	}
	formRef.value.validate().then((ok: boolean) => {
		// 校验通过
	}).catch((err: any | null) => {
		// 校验失败，字段下方展示错误文案
	})
}

function onReset() {
	name.value = ''
	phone.value = ''
	email.value = ''
	password.value = ''
	intro.value = ''
	sex.value = ''
	agree.value = false
	syncFormModel()
	if (formRef.value != null) {
		formRef.value.resetFields()
		formRef.value.clearValidate()
	}
}

function onClear() {
	if (formRef.value != null) {
		formRef.value.clearValidate()
	}
}
```

:::

::: details 标签在上方 + toast 错误

```uvue
<nax-form
	ref="formTopRef"
	:model="formTopModel"
	:rules="rulesTop"
	label-position="top"
	error-type="toast"
	:border-bottom="false"
>
	<nax-form-item label="昵称" prop="nickname" required>
		<nax-input v-model="nickname" border placeholder="必填昵称" @change="syncTopModel" @blur="syncTopModel"></nax-input>
	</nax-form-item>
	<nax-form-item label="备注" prop="remark">
		<nax-input v-model="remark" border placeholder="可选" @change="syncTopModel" @blur="syncTopModel"></nax-input>
	</nax-form-item>
</nax-form>

<nax-button type="primary" label="提交（toast）" @click="onSubmitTop"></nax-button>
```

```uts
type NaxFormExpose = {
	validate : () => Promise<boolean>
	resetFields : () => void
	clearValidate : () => void
}
const formTopRef = ref(null as NaxFormExpose | null)

const nickname = ref('')
const remark = ref('')

const formTopModel = {
	nickname: '',
	remark: ''
} as UTSJSONObject

function syncTopModel() {
	formTopModel.set('nickname', nickname.value)
	formTopModel.set('remark', remark.value)
}

const rulesTop = {
	nickname: [
		{
			required: true,
			message: '请填写昵称'
		} as UTSJSONObject
	] as any[]
} as UTSJSONObject

function onSubmitTop() {
	syncTopModel()
	if (formTopRef.value == null) {
		return
	}
	formTopRef.value.validate().then((ok: boolean) => {
		// 校验通过
	}).catch((err: any | null) => {
		// 校验失败，toast 已由 form 弹出
	})
}
```

:::

::: details 外部 error-message / status

error-message 由外部控制错误文案，status 控制字段状态色。

```uvue
<nax-form :model="formManualModel" :border-bottom="true" :label-width="80">
	<nax-form-item label="账号" prop="account" :error-message="manualError" status="error">
		<nax-input v-model="account" placeholder="外部错误文案"></nax-input>
	</nax-form-item>
	<nax-form-item label="状态" prop="ok" status="success" :border-bottom="true">
		<nax-input v-model="okText" placeholder="success 下划线"></nax-input>
	</nax-form-item>
</nax-form>

<nax-button size="sm" label="设置错误" @click="setManualError"></nax-button>
<nax-button size="sm" variant="secondary" label="清除错误" @click="clearManualError"></nax-button>
```

```uts
const manualError = ref('')
const account = ref('')
const okText = ref('已通过')

const formManualModel = {
	account: '',
	ok: '已通过'
} as UTSJSONObject

function setManualError() {
	manualError.value = '账号已存在'
}

function clearManualError() {
	manualError.value = ''
}
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-border` | 边框色 |
| `--nax-color-error` | 错误色 |
| `--nax-color-success` | 成功色 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-warning` | 警告色 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| model | object | `() => ({} as UTSJSONObject)` | 表单数据对象（必填，配合 form-item prop） |
| rules | object | `() => ({} as UTSJSONObject)` | 校验规则（字段 -> 规则数组） |
| errorType | string | `'message'` | `message` 消息 \| `toast` 轻提示 \| `border-bottom` 底部描边 \| `none` 不提示 |
| borderBottom | boolean | `true` | 是否显示表单项下边框，默认 true |
| labelPosition | string | `'left'` | `left` 左侧 \| `top` 顶部 |
| labelWidth | [String, Number] | `80` | 标签宽度（px），默认 80 |
| labelAlign | string | `'left'` | `left` 左对齐 \| `center` 居中 \| `right` 右对齐 |
| customClass | string | `''` | 根节点扩展 class |

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


## Events

| 事件 | 说明 |
|------|------|
| validate | 提交校验完成，参数为是否通过（boolean） |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 放置 nax-form-item |

## 平台说明

- 控件需自行 `v-model` 绑定到 `model` 字段；提交时调用 `validate()`。
- 字段事件触发（blur/change）需业务侧调用 `validateField(prop, 'blur')`；后续可与输入类组件深度集成。
