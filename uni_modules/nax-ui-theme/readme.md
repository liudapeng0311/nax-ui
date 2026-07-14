# nax-ui-theme

`nax-ui` 设计 **Token 约定包**（不是 UI 组件）。

- 提供统一的 `--nax-*` CSS 变量
- 默认浅色：`theme/default.css`
- 暗色覆盖：`theme/dark.css`
- 供 `nax-button` 等**独立插件**共享主题
- **弱依赖**：业务组件不强制安装本包；组件内仍有 fallback

## 安装

放入：

```text
uni_modules/nax-ui-theme
```

## 快速接入（推荐）

在业务工程 `App.uvue`：

```css
@import "@/uni_modules/nax-ui-theme/theme/default.css";
/* 可选暗色变量表（需配合 class 切换） */
@import "@/uni_modules/nax-ui-theme/theme/dark.css";
```

页面根节点：

```html
<view class="nax-theme">
  <nax-button type="primary" label="确定"></nax-button>
</view>
```

覆盖品牌色：

```css
.nax-theme {
	--nax-color-primary: #7c3aed;
}
```

> uvue / 鸿蒙仅支持 class 选择器，**禁止** `page {}`。

## 暗色主题

1. 引入 `default.css` + `dark.css`
2. 给页面根节点或局部容器加 class：`nax-theme nax-theme-dark`

```html
<view class="nax-theme nax-theme-dark">
	<nax-button type="primary" label="暗色区按钮"></nax-button>
</view>
```

## 与组件的关系

| 包 | 职责 |
|----|------|
| `nax-ui-theme` | 定义变量名与默认值 |
| `nax-button` 等 | `var(--nax-color-primary, #1677ff)` 消费变量 |
| 业务 `App.uvue` | `@import` 主题并覆盖品牌色 |

组件 **不** 运行时强依赖本包；未引入时使用组件 fallback。

## 变量一览（核心）

| 变量 | 默认（浅色） |
|------|----------------|
| `--nax-color-primary` | `#1677ff` |
| `--nax-color-success` | `#00b578` |
| `--nax-color-warning` | `#ff8f1f` |
| `--nax-color-danger` | `#ff3141` |
| `--nax-color-text` | `#1f1f1f` |
| `--nax-color-bg` | `#ffffff` |
| `--nax-color-bg-secondary` | `#f5f6f8` |
| `--nax-color-border` | `#e5e6eb` |
| `--nax-button-height` | `36px` |
| `--nax-button-padding-x` | `16px` |
| `--nax-button-radius` | `3px` |

完整设计说明见：`docs/design-system.md`、`docs/theme.md`。

## 兜底

若目标端 `@import` 异常，把 `theme/default.css` / `dark.css` 内容粘贴到 `App.uvue` 的 `<style>` 中即可。
