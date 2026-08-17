# nax-steps

步骤条。用于展示多步任务进度（物流、表单向导、审批等）。

## 用法示例

```uvue
<nax-steps :list="list" :current="1"></nax-steps>
```

```uvue
<nax-steps :current="1" direction="vertical">
  <nax-step title="提交申请" desc="2026-01-01"></nax-step>
  <nax-step title="审批中" desc="处理中"></nax-step>
  <nax-step title="完成" status="finish"></nax-step>
</nax-steps>
```

## Props — Props（nax-steps）

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
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

## Props — Props（nax-step）

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| title / name | string | `''` | 标题 |
| desc / description | string | `''` | 描述 |
| status | string | `''` | `wait` / `process` / `finish` / `error`；空则按 current 推导 |
| icon | string | `''` | 本步完成态图标覆盖 |
| disabled | boolean | `false` | 禁用点击 |
| custom-class | string | `''` | 根扩展 class |

## Events

| 事件 | 说明 |
|---|---|
| click | 点击步骤，参数为 index（number）；需 `clickable` |

## 依赖

- `nax-icon`
- `nax-ui-theme`（可选，有 fallback）
