# nax-alert

警告提示条（页面内常驻提示）。提供常用能力。

## 用法示例

```uvue
<nax-alert title="温馨提示" description="请先完成实名认证后再操作。"></nax-alert>

<nax-alert type="success" title="提交成功" description="我们已收到你的申请。"></nax-alert>

<nax-alert
  type="error"
  closable
  :show="alertShow"
  title="账号异常"
  description="检测到异地登录，请修改密码。"
  @close="onClose"
  @update:show="onShowChange"
></nax-alert>
```

## Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| type | string | `warning` | `primary` / `info` / `success` / `warning` / `error`（兼容 `danger`） |
| variant | string | `light` | `light` 浅底 / `solid` 实心 |
| effect | string | `''` | 兼容：`light` / `dark`（`dark` 等价 `solid`） |
| title | string | `''` | 标题 |
| description | string | `''` | 描述；也可用默认插槽 |
| closable | boolean | `false` | 是否可关闭 |
| show-icon | boolean | `true` | 是否显示左侧图标 |
| icon | string | `''` | 自定义 `nax-icon` 名；空则按 type 映射 |
| center | boolean | `false` | 内容水平居中 |
| show | boolean | `true` | 是否显示；配合 `update:show` |
| custom-class | string | `''` | 根节点扩展 class |

## Events

| 事件 | 说明 |
|---|---|
| click | 点击主体 |
| close | 点击关闭 |
| update:show | 显示状态变化（关闭时为 `false`） |

## Slots

| 名称 | 说明 |
|---|---|
| default | 自定义描述内容 |
| title | 自定义标题 |
| icon | 自定义左侧图标 |

## 依赖

- `nax-icon`（类型图标 / 关闭图标）
- `nax-ui-theme`（可选，提供统一 token）
