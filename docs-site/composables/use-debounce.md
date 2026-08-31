# useDebounce 防抖

无头防抖：窗口期内多次 `call` 只执行最后一次；窗口期结束才真正触发。适合搜索输入、窗口 resize 等高频场景。

## 签名

```ts
useDebounce(fn : (payload : any | null) => void, wait? : number) : NaxDebounceHandle
```

必须在 setup 内同步调用。

## 参数

| 参数 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `fn` | `(payload: any \| null) => void` | — | 防抖后执行的回调 |
| `wait` | `number` | `300` | 窗口期（毫秒） |

## 返回 Handle

| 成员 | 说明 |
|------|------|
| `call(payload)` | 触发一次调用（payload 为单载荷，多参数请包对象传入）；窗口期内重复调用重置计时，只执行最后一次 |
| `cancel()` | 取消未执行的调用 |
| `flush()` | 立即执行待处理的最后一次调用并清空 |

## 用法示例

搜索输入防抖（输入停止 300ms 后才请求）：

```uvue
<script setup>
	import { useDebounce } from '@/uni_modules/nax-use/composables/use-debounce.uts'

	const search = useDebounce((payload : string | null) => {
		console.log('搜索：', payload)
	}, 300)
	// 输入框 @input 时：search.call(keyword)
</script>
```

多参数场景（包对象传入）：

```uvue
<script setup>
	import { useDebounce } from '@/uni_modules/nax-use/composables/use-debounce.uts'

	const save = useDebounce((payload : any | null) => {
		const data = payload as { id : number, content : string }
		console.log('保存：', data.id, data.content)
	}, 500)

	function onContentChange(id : number, content : string) {
		save.call({ id, content })
	}
</script>
```

取消 / 立即执行（如卸载时把未提交的输入落盘）：

```uvue
<script setup>
	import { onUnmounted } from 'vue'
	import { useDebounce } from '@/uni_modules/nax-use/composables/use-debounce.uts'

	const persist = useDebounce((payload : any | null) => {
		// 写缓存 / 提交请求
	}, 1000)

	onUnmounted(() => {
		persist.flush() // 卸载前立即执行待处理的最后一次
	})
	// persist.cancel() 用于主动放弃
</script>
```

## 注意事项

- 单载荷设计（`payload: any | null`），多参数请包对象传入
- 必须在 setup 内同步调用（内部依赖组件实例生命周期清理定时器）