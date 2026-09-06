# nax-loading

局部 / 区块加载指示。

## 用法

```uvue
<nax-loading></nax-loading>
<nax-loading text="加载中"></nax-loading>
<nax-loading icon="loader" text="加载中"></nax-loading>
<nax-loading icon="loader-4" vertical text="请稍候" size="lg" type="primary"></nax-loading>
<nax-loading :show="pending" text="提交中"></nax-loading>
```

## Props

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| show | boolean | `true` | 是否显示 |
| size | string | `md` | `sm` / `md` / `lg` |
| text | string | `''` | 文案 |
| vertical | boolean | `false` | 纵向排布 |
| type | string | `default` | 语义色 |
| color | string | `''` | 自定义颜色 |
| icon | string | `loading` | 旋转图标：`loading` / `loader` / `loader-4` |
| custom-class | string | `''` | 根节点扩展 class |

### icon 取值

| 值 | 说明 |
|------|------|
| loading | 默认，对应 nax-icon `loading`（Tabler loader-2） |
| loader | nax-icon `loader` |
| loader-4 | nax-icon `loader-4` |

也可用 `#icon` 插槽完全自定义图标（将不再使用 `icon` prop）。

## 插槽

| 名称 | 说明 |
|------|------|
| default | 自定义文案区 |
| icon | 自定义图标 |

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-error` | 错误色 |
| `--nax-color-info` | 信息色 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-text-secondary` | 次要文字色 |
| `--nax-color-warning` | 警告色 |


## 依赖

- `nax-icon`
- `nax-ui-theme`（可选）

## 说明

- 按钮内加载请继续用 `nax-button` 的 `loading`。
