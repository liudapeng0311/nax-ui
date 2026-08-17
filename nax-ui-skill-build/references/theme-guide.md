# nax-ui 主题接入指南

`nax-ui-theme` 是主题 Token 约定包（非 UI 组件），提供统一的 `--nax-*` CSS 变量。

## 接入分档

| 档位 | 说明 | 适用场景 |
|------|------|----------|
| L0 默认色 | 不接本包，组件使用内置 fallback | 试用组件、固定单品牌页面 |
| L1 启动配置 | `@import` 主题文件，并挂载一处 `nax-theme` | 正式业务、统一品牌色 |
| L2 运行时切换 | L1 基础上切换暗色 class 或覆盖变量 | 深色模式、多品牌、设置页换肤 |

正式业务至少 L1。

## L1 接入步骤

### 1. App 全局引入主题

```css
/* App.uvue 的 <style> */
@import "@/uni_modules/nax-ui-theme/theme/default.css";
/* 需要暗色变量表时再引入 */
@import "@/uni_modules/nax-ui-theme/theme/dark.css";
```

### 2. 宿主节点挂载主题 class

优先在应用 layout 或壳页面最外层挂载一次：

```html
<view class="nax-theme">
  <!-- 页面内容 -->
</view>
```

不要用 `page { ... }` 选择器挂变量（uvue / 鸿蒙端不可靠）。

### 3. 覆盖品牌色

```css
.nax-theme {
  --nax-color-primary: #18a058;
}
```

## L2 运行时切换

- 暗色：在宿主上切换 `nax-theme-dark` 修饰类（`class="nax-theme nax-theme-dark"`）
- 多品牌：预置修饰 class 覆盖变量

## dialogPage 主题同步

`dialogPage` 是独立页面，不继承触发页的 `nax-theme-dark`。用 `openNaxPopup()` 打开内置 host 时传
`themeClass`；自定义弹层页需在**自己的根节点**手动挂主题 class。

## 覆盖优先级

```
局部节点/页面变量 > 宿主上的业务覆盖（主色、dark class）> nax-ui-theme 默认 Token > 组件内 fallback
```

## 核心变量

| 变量 | 默认浅色 |
|------|----------|
| `--nax-color-primary` | `#18a058` |
| `--nax-color-success` | `#18a058` |
| `--nax-color-warning` | `#f0a020` |
| `--nax-color-error` | `#d03050` |
| `--nax-color-text` | `#333639` |
| `--nax-color-bg` | `#ffffff` |
| `--nax-color-bg-secondary` | `#fafafc` |
| `--nax-color-border` | `#f0f0f3` |

完整 Token 表见 `theme/default.css` 与 `theme/dark.css`。

## 组件级 token

每个组件卡里「主题」/token 表列出了该组件使用的 `--nax-*` 变量，可单独覆盖（如
`--nax-toast-bg`、`--nax-color-skeleton`、`--nax-button-radius`）。

> 鸿蒙 / App 端背景色请用实色 hex，`rgba()` 嵌套 `var()` 在 ucss 下可能失效。
