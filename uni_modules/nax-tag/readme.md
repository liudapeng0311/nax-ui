# nax-tag

标签。提供常用能力。

## 用法

```uvue
<nax-tag label="标签"></nax-tag>
<nax-tag type="success" label="成功"></nax-tag>
<nax-tag type="error" closable label="可关闭" @close="onClose"></nax-tag>
<nax-tag checkable :checked="checked" @update:checked="onChecked">可选</nax-tag>
```

## Props

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
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

## 事件

| 事件 | 说明 |
|------|------|
| click | 点击（`disabled` 不触发） |
| close | 关闭（关闭后组件隐藏） |
| update:checked | 选中态变化（`checkable`） |

## 插槽

| 名称 | 说明 |
|------|------|
| default | 自定义内容 |
| icon | 自定义前缀图标区域 |

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg-secondary` | 次级背景色 |
| `--nax-color-border` | 边框色 |
| `--nax-color-button-secondary` | 按钮次要底色 |
| `--nax-color-error` | 错误色 |
| `--nax-color-error-secondary` | 错误色浅底 |
| `--nax-color-info` | 信息色 |
| `--nax-color-info-secondary` | 信息色浅底 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-primary-secondary` | 主题主色浅底 |
| `--nax-color-success` | 成功色 |
| `--nax-color-success-secondary` | 成功色浅底 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-text-inverse` | 反白文字色 |
| `--nax-color-warning` | 警告色 |
| `--nax-color-warning-secondary` | 警告色浅底 |
| `--nax-opacity-disabled` | 禁用透明度 |

## 依赖

- `nax-icon`（关闭图标 / 可选前缀图标）
- `nax-ui-theme`（可选，提供统一 token）
