# useValidate 无头表单校验

无头表单校验：不依赖 `nax-form` 组件，规则、校验、错误文案全部由组合式函数提供，UI 由业务自由渲染。与 `nax-form` 共享同一引擎（`form-state.uts`），规则字段与 `nax-form` 完全一致。

## 签名

```ts
useValidate(options : NaxValidateOptions) : NaxFormState
```

必须在 setup 内同步调用。

## 选项

| 字段 | 类型 | 说明 |
|------|------|------|
| `getModel` | `() => UTSJSONObject \| null` | 返回当前表单数据 |
| `getRules` | `() => UTSJSONObject \| null` | 返回规则对象 |

## 返回状态

| 成员 | 说明 |
|------|------|
| `register(name)` | 注册字段（无 form-item 场景需手动注册，`validate()` 才能全量校验） |
| `validate()` | Promise 全量校验：通过 resolve `true`，未通过 reject 错误数组 |
| `validateField(name, value)` | 同步校验单字段，返回错误数组（空数组即通过） |
| `resetFields()` | 重置为初始快照（会写回 model） |
| `clearValidate()` | 清除错误状态 |
| `getError(name)` | 取字段错误文案（内部读 ref，computed 可自动跟踪） |
| `errorVersion` | 错误版本号（错误变化时递增，可用于自定义错误 UI 的依赖键） |

## 规则字段

与 `nax-form` 一致（`rules[name]` 为规则对象数组）：

| 字段 | 说明 |
|------|------|
| `required` | 必填 |
| `pattern` | 正则校验（字符串） |
| `type` | 类型校验：`email` 等（空值跳过） |
| `message` | 校验失败文案 |

## 用法示例

基础用法（错误文案由业务渲染）：

```uvue
<script setup>
	import { computed } from 'vue'
	import { useValidate, NaxValidateOptions } from '@/uni_modules/nax-use/composables/use-validate.uts'

	const model = {
		name: '',
		phone: ''
	} as UTSJSONObject

	const rules = {
		name: [
			{ required: true, message: '请输入姓名' } as UTSJSONObject
		],
		phone: [
			{ required: true, message: '请输入手机号' } as UTSJSONObject,
			{ pattern: '^1\\d{10}$', message: '手机号格式不正确' } as UTSJSONObject
		]
	} as UTSJSONObject

	const opts : NaxValidateOptions = {
		getModel: (): UTSJSONObject | null => model,
		getRules: (): UTSJSONObject | null => rules
	}
	const state = useValidate(opts)

	// 无 form-item 场景：手动注册字段，validate() 才能全量校验
	state.register('name')
	state.register('phone')

	// 错误文案：getError 内部读取错误数组（ref），computed 自动跟踪
	const nameError = computed((): string => state.getError('name'))
	const phoneError = computed((): string => state.getError('phone'))

	function onSubmit() {
		state.validate().then((ok : boolean) => {
			// 通过：提交
		}, (err : any) => {
			// 未通过：错误文案已写入 getError，UI 自动更新
		})
	}
</script>

<template>
	<view>
		<nax-input v-model="model.name" placeholder="姓名（必填）"></nax-input>
		<text v-if="nameError.length > 0">{{ nameError }}</text>
		<nax-input v-model="model.phone" placeholder="手机号"></nax-input>
		<text v-if="phoneError.length > 0">{{ phoneError }}</text>
		<nax-button label="提交" @click="onSubmit"></nax-button>
	</view>
</template>
```

单字段即时校验（如失焦校验）：

```uvue
<script setup>
	import { useValidate, NaxValidateOptions } from '@/uni_modules/nax-use/composables/use-validate.uts'

	const state = useValidate({
		getModel: () => model,
		getRules: () => rules
	} as NaxValidateOptions)

	function onPhoneBlur() {
		const errors = state.validateField('phone', model.getString('phone'))
		// errors.length == 0 即通过；errors[0].getString('message') 取文案
	}
</script>
```

重置：

```uvue
<script setup>
	// state.resetFields()
	// 重置后 model 已被写回快照；若输入框 v-model 绑定的是独立 ref，需手动同步回显
</script>
```

## 注意事项

- 无 form-item 场景必须手动 `register` 字段，`validate()` 才能全量校验
- `validate()` 为 Promise 校验（通过 resolve / 未通过 reject），`validateField()` 为同步校验
- 与 `nax-form` 组件共享引擎，规则与错误文案行为完全一致