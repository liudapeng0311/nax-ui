# useThrottle 节流

无头节流：窗口期内最多执行一次（leading + trailing）。适合滚动、拖拽、按钮连点等需要限频的场景。

## 签名

```ts
useThrottle(fn : (payload : any | null) => void, wait? : number) : NaxThrottleHandle
```

必须在 setup 内同步调用。

## 参数

| 参数 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `fn` | `(payload: any \| null) => void` | — | 节流后执行的回调 |
| `wait` | `number` | `300` | 窗口期（毫秒） |

## 返回 Handle

| 成员 | 说明 |
|------|------|
| `call(payload)` | 触发一次调用（payload 为单载荷，多参数请包对象传入）；窗口内首次立即执行，窗口结束后若期间有调用再执行一次尾调用 |
| `cancel()` | 取消未执行的尾调用 |
| `flush()` | 立即执行待处理的尾调用并清空 |

## 用法示例

滚动位置上报（每 200ms 至多一次）：

```uvue
<script setup>
	import { useThrottle } from '@/uni_modules/nax-use/composables/use-throttle.uts'

	const report = useThrottle((payload : any | null) => {
		const pos = payload as { scrollTop : number }
		console.log('上报：', pos.scrollTop)
	}, 200)
	// 滚动事件里：report.call({ scrollTop })
</script>
```

按钮防连点（提交订单）：

```uvue
<script setup>
	import { useThrottle } from '@/uni_modules/nax-use/composables/use-throttle.uts'

	const submit = useThrottle(() => {
		// 提交请求（自带首触发 + 尾触发，连点也只发一次）
	}, 1000)

	function onSubmit() {
		submit.call(null)
	}
</script>
```

## 注意事项

- 与 `useDebounce` 的区别：节流保证窗口内至多一次执行（leading + trailing），防抖保证停止后执行最后一次
- 单载荷设计（`payload: any | null`），多参数请包对象传入
- 必须在 setup 内同步调用