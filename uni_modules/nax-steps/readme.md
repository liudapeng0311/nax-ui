# nax-steps

步骤条。用于展示多步任务进度（物流、表单向导、审批等）。

## 组件

| 标签 | 说明 |
|------|------|
| `nax-steps` | 容器：方向、模式、当前步、语义色 |
| `nax-step` | 单步（组合式）；也可由 `list` 自动生成 |

## 依赖

- `nax-icon`
- `nax-ui-theme`（可选，有 fallback）

## 基础用法（list）

```uvue
<nax-steps :list="list" :current="1"></nax-steps>
```

```uts
const list = [
  { name: '下单' },
  { name: '出库' },
  { name: '运输' },
  { name: '签收' }
]
```

## 组合式

```uvue
<nax-steps :current="1" direction="vertical">
  <nax-step title="提交申请" desc="2026-01-01"></nax-step>
  <nax-step title="审批中" desc="处理中"></nax-step>
  <nax-step title="完成" status="finish"></nax-step>
</nax-steps>
```

## Props（nax-steps）

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| list | array | `[]` | 项：`name`/`title`、`desc`/`description`、`status`、`icon`、`disabled`；也支持字符串 |
| current | number | `0` | 当前步（从 0 起）；无显式 status 时推导 |
| direction | string | `horizontal` | `horizontal` / `vertical`（兼容 `row` / `column`） |
| mode | string | `number` | `number` / `dot` |
| type | string | `primary` | `primary` / `info` / `success` / `warning` / `error` |
| size | string | `md` | `sm` / `md` / `lg` |
| icon | string | `check` | 完成态默认图标 |
| error-icon | string | `close` | 失败态默认图标 |
| clickable | boolean | `false` | 是否可点击 |
| custom-class | string | `''` | 根扩展 class |

## Props（nax-step）

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| title / name | string | `''` | 标题 |
| desc / description | string | `''` | 描述 |
| status | string | `''` | `wait` / `process` / `finish` / `error`；空则按 current 推导 |
| icon | string | `''` | 本步完成态图标覆盖 |
| disabled | boolean | `false` | 禁用点击 |
| custom-class | string | `''` | 根扩展 class |

## Events

| 事件 | 说明 |
|------|------|
| click | 点击步骤，参数为 index（number）；需 `clickable` |

## 说明

- 外观优先 `--nax-*` token + `type`，不靠颜色字符串当主题主路径。
- 单步可显式 `status`，比仅靠 `current` 更适合失败/跳过场景。
- App 端连接线/指示器用像素尺寸，避免百分比 `max-width` 等 ucss 限制。