# nax-ui-theme

`nax-ui` 设计 **Token 约定包**（不是 UI 组件）。

- 提供统一的 `--nax-*` CSS 变量
- 默认浅色：`theme/default.css`
- 暗色覆盖：`theme/dark.css`
- 供 `nax-button` 等**独立插件**共享主题
- **运行时弱依赖**：组件不强制安装本包，内有 fallback

接入分档（详见仓库 `docs/theme.md`）：

| 档位 | 说明 |
|------|------|
| L0 默认色 | 不接本包也能用（fallback） |
| L1 启动配置 | App `@import` + **一处** `class="nax-theme"`（优先 layout） |
| L2 运行时切换 | 如 light/dark：切换 `nax-theme-dark` 或覆盖变量 |

## 安装

```text
uni_modules/nax-ui-theme
```

## 快速接入（L1，推荐）

`App.uvue`：

```css
@import "@/uni_modules/nax-ui-theme/theme/default.css";
/* 可选：暗色变量表（切换仍靠 class） */
@import "@/uni_modules/nax-ui-theme/theme/dark.css";
```

应用 layout 或页面根节点（**优先只挂一处**）：

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
> 只 `@import` 不挂 `nax-theme` 时，组件多半走 fallback，改主色不一定生效。

## 暗色主题（L2）

1. 引入 `default.css` + `dark.css`
2. 宿主使用：`nax-theme nax-theme-dark`

```html
<view class="nax-theme nax-theme-dark">
	<nax-button type="primary" label="暗色区按钮"></nax-button>
</view>
```

## 与组件的关系

| 包 | 职责 |
|----|------|
| `nax-ui-theme` | 定义变量名与默认值 |
| `nax-*` 组件 | `var(--nax-color-primary, #1677ff)` 消费变量 |
| 业务 App / layout | `@import` + 挂载 `.nax-theme`，可选覆盖与 dark |

## 变量一览（核心）

| 变量 | 默认（浅色） |
|------|----------------|
| `--nax-color-primary` | `#1677ff` |
| `--nax-color-success` | `#18a058` |
| `--nax-color-warning` | `#f0a020` |
| `--nax-color-error` | `#d03050` |
| `--nax-color-text` | `#333639` |
| `--nax-color-bg` | `#ffffff` |
| `--nax-color-bg-secondary` | `#f5f6f8` |
| `--nax-color-border` | `#e0e0e6` |

完整说明见：`docs/design-system.md`、`docs/theme.md`。

## 兜底

若目标端 `@import` 异常，把 `theme/default.css` / `dark.css` 粘贴到 `App.uvue` 的 `<style>` 即可。