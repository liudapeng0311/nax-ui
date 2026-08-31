# nax-use

`nax-use` 是 nax-ui 的组合式函数包（无头逻辑复用）：只提供状态与控制方法，UI 完全交给业务。定位为 **uni-app x 蒸汽模式组件库** nax-ui 生态的一部分。

## 用法示例

```uvue
<script setup>
	import { useCountdown, NaxCountdownOptions } from '@/uni_modules/nax-use/composables/use-countdown.uts'

	const opts : NaxCountdownOptions = { time: 10 * 1000, autostart: false }
	const countdown = useCountdown(opts)
	// 模板直接读标量：countdown.days / seconds / status
	// 控制：countdown.start() / countdown.pause() / countdown.reset()
</script>
```
