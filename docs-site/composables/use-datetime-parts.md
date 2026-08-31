# useDatetimeParts 日期时间 parts

无头日期时间状态：持有当前年月日时分秒 parts，按 mode 生成各列可选值（已 clamp 到 min/max），供业务自建 `picker-view` 等自定义 UI。规则引擎与 `nax-datetime-picker` 组件同一实现（`datetime-parts.uts`）。

## 签名

```ts
useDatetimeParts(options : NaxDatetimePartsOptions) : NaxDatetimePartsState
```

必须在 setup 内同步调用。

## 选项

| 字段 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `mode` | `string` | `datetime` | `datetime` 日期时间 / `date` 日期 / `time` 时间 / `year-month` 年月 / `year` 年 / `month-day` 月日 |
| `value` | `number \| null` | 当前时间 | 初始时间戳（毫秒） |
| `min` | `number \| null` | 引擎默认 | 最小时间戳（毫秒，近 30 年） |
| `max` | `number \| null` | 引擎默认 | 最大时间戳（毫秒，+10 年） |
| `showSecond` | `boolean` | `false` | 是否秒列（datetime / time） |

## 返回状态

| 成员 | 类型 | 说明 |
|------|------|------|
| `mode` | `string` | 当前模式 |
| `parts` | `number[]` | 当前 parts（副本，顺序：year/month/day/hour/minute/second） |
| `columns` | `number[][]` | 每列可选值（已按 min/max 收敛），顺序与 mode 字段序列一致 |
| `indices` | `number[]` | 各列当前选中下标（喂 `picker-view` 的 value） |
| `setParts(parts)` | — | 设置 parts（自动 clamp 到 min/max 与日历合法域） |
| `setTimestamp(ms)` | — | 按时间戳设置（自动 clamp） |
| `toTimestamp()` | `number` | 收敛到边界内后的当前时间戳 |
| `format(pattern?)` | `string` | 按模式默认格式输出；可传自定义 pattern（`YYYY MM DD HH mm ss`） |
| `applyIndices(indices)` | — | 用列下标更新选中值（picker-view change 回调直接传入 value 数组） |

## 用法示例

自建 picker-view（核心组合：`columns` 渲染列、`indices` 喂选中、`applyIndices` 响应滚动）：

```uvue
<script setup>
	import { useDatetimeParts, NaxDatetimePartsOptions } from '@/uni_modules/nax-use/composables/use-datetime-parts.uts'

	const opts : NaxDatetimePartsOptions = { mode: 'datetime', value: Date.now() }
	const dt = useDatetimeParts(opts)

	function onChange(e : any) {
		dt.applyIndices(e.detail.value)
		// 选中值：dt.format() / dt.toTimestamp()
	}
</script>

<template>
	<picker-view :value="dt.indices" @change="onChange">
		<picker-view-column v-for="(col, i) in dt.columns" :key="i">
			<view v-for="(v, j) in col" :key="j" class="item">
				<text>{{ v }}</text>
			</view>
		</picker-view-column>
	</picker-view>
</template>
```

带范围限制（min/max 时间戳收敛各列可选值）：

```uvue
<script setup>
	import { useDatetimeParts, NaxDatetimePartsOptions } from '@/uni_modules/nax-use/composables/use-datetime-parts.uts'

	const opts : NaxDatetimePartsOptions = {
		mode: 'date',
		value: Date.now(),
		min: new Date(2024, 0, 1).getTime(),
		max: new Date(2026, 11, 31).getTime()
	}
	const dt = useDatetimeParts(opts)
	// dt.columns 的 年/月/日 列已按边界收敛
</script>
```

读取与格式化：

```uvue
<script setup>
	import { useDatetimeParts, NaxDatetimePartsOptions } from '@/uni_modules/nax-use/composables/use-datetime-parts.uts'

	const dt = useDatetimeParts({ mode: 'datetime' } as NaxDatetimePartsOptions)

	// 默认格式（datetime 无秒）：YYYY-MM-DD HH:mm
	const text = dt.format()
	// 自定义格式：YYYY 年 MM 月 DD 日 HH 时 mm 分
	const custom = dt.format('YYYY年MM月DD日 HH时mm分')
	// 时间戳：dt.toTimestamp()
	// 程序化改值：dt.setTimestamp(ms) / dt.setParts([2025, 6, 1, 10, 30, 0])
</script>
```

## 注意事项

- `mode` / `showSecond` / `min` / `max` 在创建时固定（MVP 不做响应式变更）
- 时分秒列无 props 级细粒度边界（如 minHour），仅按 min/max 时间戳收敛
- 与 `nax-datetime-picker` 共享同一引擎：组件在弹层内滚动、本函数供业务自建 UI，行为一致