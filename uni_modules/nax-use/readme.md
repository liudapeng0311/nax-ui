# nax-use

`nax-use` 是 nax-ui 的组合式函数包（无头逻辑复用）：只提供状态与控制方法，UI 完全交给业务。定位为 **uni-app x 蒸汽模式组件库** nax-ui 生态的一部分。

## 安装方式

- 安装 `nax-ui` 套装时自动包含（套装依赖聚合本包）。
- 也可单独安装 `nax-use`。`useValidate` 依赖 `nax-form`、`useDatetimeParts` 依赖 `nax-datetime-picker`（引擎与组件共用同一实现，装本包时市场自动带依赖）；其余函数零依赖。

## 函数速查

| 函数 | 返回 | 说明 |
|------|------|------|
| `useCountdown(options)` | `NaxCountdownState` | 倒计时：`days/hours/minutes/seconds/milliseconds/total/running/started/status` + `start/pause/reset/dispose`；整秒显示向上取整（逐秒不跳号） |
| `useValidate(options)` | `NaxFormState` | 无头表单校验：`register/validate/validateField/resetFields/clearValidate/getError/errorVersion` 等，与 `nax-form` 同一实现 |
| `useDebounce(fn, wait?)` | `NaxDebounceHandle` | 防抖：`call(payload) / cancel() / flush()`；窗口内多次调用只执行最后一次 |
| `useThrottle(fn, wait?)` | `NaxThrottleHandle` | 节流：`call(payload) / cancel() / flush()`；leading + trailing |
| `useDatetimeParts(options)` | `NaxDatetimePartsState` | 日期时间 parts：`columns/indices/setTimestamp/setParts/toTimestamp/format/applyIndices`，供自建 picker-view，与 `nax-datetime-picker` 同一引擎 |
| `useInterval(fn, wait?, immediate?)` | `NaxIntervalState` | 可控轮询：`start/stop/running/count`（均响应式） |
| `useStorage(key, defaultValue?)` | `Ref<any>` | 响应式本地缓存：改值即写缓存，置 `null` 删除 key |

## 用法

```uvue
<script setup>
	import { useCountdown, NaxCountdownOptions } from '@/uni_modules/nax-use/composables/use-countdown.uts'

	const opts : NaxCountdownOptions = { time: 10 * 1000, autostart: false }
	const countdown = useCountdown(opts)
	// 模板直接读标量：countdown.days / seconds / status
	// 控制：countdown.start() / countdown.pause() / countdown.reset()
</script>
```

完整 API 与 demo 见各函数：`pages/components/use-*/index.uvue`（演示宿主内）。

## 约定

- 状态全部为标量 getter 或 `Ref`（uts 响应式友好）；返回 Handle / State 的函数必须在 setup 内同步调用
- 防抖/节流为单载荷设计（`payload: any | null`），多参数请包对象传入
- 与组件共享实现时不维护两套逻辑：`useValidate` 引擎在 `nax-form` 包内 `form-state.uts`，`useDatetimeParts` 引擎在 `nax-datetime-picker` 包内 `datetime-parts.uts`
- 文件命名 `use-<能力>.uts`（kebab-case），函数名 `use<能力>`

## 支持平台

同 nax-ui 套装：Web / 微信小程序 / App Android / App iOS / App HarmonyOS（蒸汽模式，见套装版本门槛）。纯逻辑实现，无新增端差异。
