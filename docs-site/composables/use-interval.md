# useInterval 可控轮询

无头定时轮询：`start/stop/running/count` 均响应式，可直接在模板中展示状态。适合列表自动刷新、在线状态心跳等场景。

## 签名

```ts
useInterval(fn : () => void, wait? : number, immediate? : boolean) : NaxIntervalState
```

必须在 setup 内同步调用。

## 参数

| 参数 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `fn` | `() => void` | — | 每次触发执行的回调 |
| `wait` | `number` | `1000` | 间隔（毫秒） |
| `immediate` | `boolean` | `false` | 是否在 `start()` 时立即执行一次 |

## 返回状态

| 成员 | 说明 |
|------|------|
| `start()` | 开始轮询（已在运行则忽略）；`immediate: true` 时先立即执行一次 |
| `stop()` | 停止轮询 |
| `running` | 是否运行中（响应式，可作模板状态） |
| `count` | 已触发次数（响应式） |

## 用法示例

基础轮询（每 5 秒刷新一次列表）：

```uvue
<script setup>
	import { useInterval } from '@/uni_modules/nax-use/composables/use-interval.uts'

	const poll = useInterval(() => {
		// fetchList()
	}, 5000)

	onShow(() => {
		poll.start()
	})
	onHide(() => {
		poll.stop()
	})
</script>
```

带立即执行与状态展示（在线状态心跳）：

```uvue
<script setup>
	import { useInterval } from '@/uni_modules/nax-use/composables/use-interval.uts'

	const beat = useInterval(() => {
		// sendHeartbeat()
	}, 3000, true)
</script>

<template>
	<view>
		<text>{{ beat.running ? '已连接' : '已断开' }}</text>
		<text>已心跳 {{ beat.count }} 次</text>
	</view>
</template>
```

## 注意事项

- `running` / `count` 为响应式 `Ref`，模板直接读值即可
- 必须与 `start()` / `stop()` 成对管理生命周期（如 `onShow` / `onHide` 或 `onMounted` / `onUnmounted`）