# useCountdown 倒计时

无头倒计时：只提供剩余时间状态与控制方法，显示样式完全由业务决定。时间基于 `Date.now()` 与目标时刻差值计算，不随定时器漂移。

## 签名

```ts
useCountdown(options : NaxCountdownOptions) : NaxCountdownState
```

必须在 setup 内同步调用。

## 选项

| 字段 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `time` | `number` | — | 总时长（毫秒），必须 > 0 |
| `millisecond` | `boolean` | `false` | 毫秒级渲染（`milliseconds` 粒度跳动）；开启后默认 33ms 更新间隔 |
| `autostart` | `boolean` | `true` | 创建后立即开始 |
| `interval` | `number` | `1000` | 更新间隔（毫秒）；`millisecond: true` 时默认 33 |
| `onFinish` | `() => void` | — | 倒计时结束回调 |

## 返回状态

| 成员 | 类型 | 说明 |
|------|------|------|
| `days` / `hours` / `minutes` / `seconds` | `number` | 剩余时分秒（整秒向上取整，逐秒不跳号；`seconds` 为 0-59） |
| `milliseconds` | `number` | 当前秒内的原始毫秒（0-999）；毫秒级 UI 请与 `total` 配 `floor` 使用 |
| `total` | `number` | 剩余总毫秒 |
| `running` | `boolean` | 是否进行中 |
| `started` | `boolean` | 是否已开始过（`start` 后为 true，`reset` 后回到 false） |
| `finished` | `boolean` | 是否已结束（剩余 <= 0） |
| `status` | `string` | 语义状态：`idle` 未开始 / `running` 进行中 / `paused` 已暂停 / `finished` 已结束 |
| `start()` | — | 从当前剩余时间继续；已结束后调用将重新开始 |
| `pause()` | — | 暂停 |
| `reset(time?)` | — | 重置；传 `time` 可改为新时长 |
| `dispose()` | — | 清理定时器；组件内使用会自动调用，页面级（无组件实例）使用需自行调用 |

## 用法示例

基础倒计时（5 分钟，自动开始），模板直接读标量：

```uvue
<script setup>
	import { useCountdown, NaxCountdownOptions } from '@/uni_modules/nax-use/composables/use-countdown.uts'

	const opts : NaxCountdownOptions = { time: 5 * 60 * 1000 }
	const countdown = useCountdown(opts)
</script>

<template>
	<text>{{ countdown.days }}天 {{ countdown.hours }}:{{ countdown.minutes }}:{{ countdown.seconds }}</text>
</template>
```

毫秒级渲染（抢购 / 竞速场景）：

```uvue
<script setup>
	import { computed } from 'vue'
	import { useCountdown, NaxCountdownOptions } from '@/uni_modules/nax-use/composables/use-countdown.uts'

	const opts : NaxCountdownOptions = { time: 30 * 1000, millisecond: true }
	const fast = useCountdown(opts)

	// SS.mmm 按 floor 配对（seconds 为 ceil 整秒显示，与小数部分混用会多 1）
	const msFloorSec = computed((): number => Math.floor((fast.total % 60000) / 1000))
</script>

<template>
	<text>{{ msFloorSec }}.{{ fast.milliseconds }} 秒</text>
</template>
```

手动控制 + 结束回调：

```uvue
<script setup>
	import { useCountdown, NaxCountdownOptions } from '@/uni_modules/nax-use/composables/use-countdown.uts'

	const opts : NaxCountdownOptions = {
		time: 10 * 1000,
		autostart: false,
		onFinish: () => {
			console.log('时间到')
		}
	}
	const manual = useCountdown(opts)
	// manual.start() / manual.pause() / manual.reset(15 * 1000) / manual.dispose()
</script>
```

状态区分"未开始"与"已暂停"（如按钮文案切换）：

```uvue
<script setup>
	import { computed } from 'vue'
	import { useCountdown, NaxCountdownOptions } from '@/uni_modules/nax-use/composables/use-countdown.uts'

	const countdown = useCountdown({ time: 60 * 1000 } as NaxCountdownOptions)

	const buttonText = computed((): string => {
		if (countdown.status == 'running') return '暂停'
		if (countdown.status == 'paused') return '继续'
		if (countdown.status == 'finished') return '重新开始'
		return '开始'
	})
</script>
```

## 注意事项

- 组件内使用卸载自动清理定时器；页面级（无组件实例）使用需自行调 `dispose()`（如 `onUnload`）
- 整秒显示向上取整（剩余 9.2s 记 10s），保证每个数字恰好显示 1 秒