# nax-loading

局部 / 区块加载指示。App 端定时 `transform` 旋转；Web / 小程序用 CSS `@keyframes`。

## 用法

```uvue
<nax-loading></nax-loading>
<nax-loading text="加载中"></nax-loading>
<nax-loading vertical text="请稍候" size="lg" type="primary"></nax-loading>
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
| custom-class | string | `''` | 根节点扩展 class |

## 插槽

| 名称 | 说明 |
|------|------|
| default | 自定义文案区 |
| icon | 自定义图标 |

## 依赖

- `nax-icon`
- `nax-ui-theme`（可选）

## 说明

1. 全局面板式 Loading（遮罩 + 命令式 API）后续可对齐 `nax-toast` 宿主模式扩展。
2. 按钮内加载请继续用 `nax-button` 的 `loading`。
