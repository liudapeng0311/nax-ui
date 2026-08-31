# useStorage 响应式本地缓存

无头本地缓存：返回一个 `Ref`，改值即写缓存，页面其它位置（同 key）读到同一份响应式数据。适合设置项、草稿、登录态等需要跨页持久化的状态。

## 签名

```ts
useStorage(key : string, defaultValue : any | null = null) : Ref<any>
```

必须在 setup 内同步调用。

## 参数

| 参数 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `key` | `string` | — | 缓存 key |
| `defaultValue` | `any` | `null` | 无缓存时的初始值；有缓存时以缓存为准 |

## 返回

`Ref<any>`：读 `.value` 即当前值；赋新值自动写入缓存；置 `null` 删除该 key。

## 用法示例

主题设置持久化：

```uvue
<script setup>
	import { useStorage } from '@/uni_modules/nax-use/composables/use-storage.uts'

	const theme = useStorage('theme-mode', 'light')

	function toggle() {
		theme.value = theme.value == 'light' ? 'dark' : 'light'
	}
</script>

<template>
	<text>当前主题：{{ theme }}</text>
</template>
```

草稿自动保存：

```uvue
<script setup>
	import { useStorage } from '@/uni_modules/nax-use/composables/use-storage.uts'

	const draft = useStorage('editor-draft', '')

	// 输入框 @input 时直接写：draft.value = content
	// 提交成功后清除：draft.value = null（删除 key）
</script>
```

对象数据（缓存 JSON）：

```uvue
<script setup>
	import { useStorage } from '@/uni_modules/nax-use/composables/use-storage.uts'

	const profile = useStorage('user-profile', null)

	// 存：profile.value = { id: 1, name: '张三' }
	// 读：const name = profile.value?.name
</script>
```

## 注意事项

- 置 `null` 会删除 key（不是存 null），适合"清除"语义
- 返回值可直接 `v-model` 绑定（响应式）
- 必须在 setup 内同步调用