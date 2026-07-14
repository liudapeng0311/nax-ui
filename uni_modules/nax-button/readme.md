# nax-button

`nax-ui` 通用按钮组件（uni-app x / uvue）。

## 安装

```text
uni_modules/nax-button
```

easycom 自动生效。

### 推荐同时安装主题包

```text
uni_modules/nax-ui-theme
```

并在 `App.uvue` 引入：

```css
@import "@/uni_modules/nax-ui-theme/theme/default.css";
```

未安装主题包时，组件仍可使用内置 fallback 颜色。

## 基础用法

```html
<nax-button type="primary" label="确定" @click="onConfirm"></nax-button>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | string | `default` | `default` / `tertiary` / `primary` / `info` / `success` / `warning` / `error` |
| variant | string | `solid` | `solid` / `outline` / `text` / `light` |
| size | string | `md` | `sm` / `md` / `lg` |
| shape | string | `square` | `square` / `round` / `circle` |
| disabled | boolean | `false` | 禁用 |
| loading | boolean | `false` | 加载中，阻止点击 |
| block | boolean | `false` | 块级宽度 |
| label | string | `''` | 按钮文案 |
| customClass | string | `''` | 根节点扩展 class |

> 兼容：`type="danger"` 会映射为 `error`。

## Events

| 事件 | 说明 |
|------|------|
| click | 点击触发；`disabled` / `loading` 时不触发 |

## 主题变量

- `--nax-color-primary`
- `--nax-color-info`
- `--nax-color-success`
- `--nax-color-warning`
- `--nax-color-error`（或 `--nax-color-danger`）
- `--nax-color-text`
- `--nax-color-text-inverse`
- `--nax-color-bg`
- `--nax-color-bg-secondary`
- `--nax-color-border`
- `--nax-button-height`
- `--nax-button-padding-x`
- `--nax-button-radius`

详见：`docs/theme.md`、`uni_modules/nax-ui-theme/readme.md`。