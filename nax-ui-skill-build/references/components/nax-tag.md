# nax-tag

标签。提供常用能力。

## 用法示例

```uvue
<nax-tag label="标签"></nax-tag>
<nax-tag type="success" label="成功"></nax-tag>
<nax-tag type="error" closable label="可关闭" @close="onClose"></nax-tag>
<nax-tag checkable :checked="checked" @update:checked="onChecked">可选</nax-tag>
```

## Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| type | string | `default` | `default` / `primary` / `info` / `success` / `warning` / `error`（兼容 `danger`） |
| variant | string | `light` | `solid` / `light`(secondary) / `outline` / `text`(quaternary)；默认浅底 |
| size | string | `md` | `sm` / `md` / `lg`；兼容常用取值 `tiny`/`small`/`medium`/`large` |
| closable | boolean | `false` | 是否可关闭 |
| disabled | boolean | `false` | 禁用 |
| round | boolean | `false` | 圆角胶囊 |
| bordered | boolean | `true` | 是否显示边框 |
| checkable | boolean | `false` | 可选中模式 |
| checked | boolean | `false` | 选中态（配合 `update:checked`） |
| strong | boolean | `false` | 加粗文字 |
| trigger-click-on-close | boolean | `true` | 点关闭时是否同时触发 `click` |
| label | string | `''` | 文案；也可用默认插槽 |
| icon | string | `''` | 前缀 `nax-icon` 名 |
| color | string | `''` | 自定义主色 |
| text-color | string | `''` | 自定义文字色 |
| border-color | string | `''` | 自定义边框色 |
| custom-class | string | `''` | 根节点扩展 class |

## Events

| 事件 | 说明 |
|---|---|
| click | 点击（`disabled` 不触发） |
| close | 关闭（关闭后组件隐藏） |
| update:checked | 选中态变化（`checkable`） |

## Slots

| 名称 | 说明 |
|---|---|
| default | 自定义内容 |
| icon | 自定义前缀图标区域 |

## 依赖

- `nax-icon`（关闭图标 / 可选前缀图标）
- `nax-ui-theme`（可选，提供统一 token）
