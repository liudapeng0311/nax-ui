# 主题接入

`nax-ui-theme` 是 nax-ui 的主题 Token 约定包（不是 UI 组件）。

- 提供统一的 `--nax-*` CSS 变量
- 默认浅色变量：`theme/default.css`
- 暗色覆盖变量：`theme/dark.css`
- 运行时弱依赖：组件未安装本包时仍可使用内置 fallback

## 接入分档

| 档位 | 说明 | 适用场景 |
|------|------|----------|
| L0 默认色 | 不接本包，组件使用内置 fallback | 试用组件、固定单品牌页面 |
| L1 启动配置 | `@import` 主题文件，并挂载一处 `nax-theme` | 正式业务、统一品牌色 |
| L2 运行时切换 | 在 L1 基础上切换暗色 class 或覆盖变量 | 深色模式、多品牌、设置页换肤 |

建议正式业务至少完成 L1；只有需要深色或运行时换肤时再增加 L2。

## 安装

```text
uni_modules/nax-ui-theme
```

组件包通常会将 `nax-ui-theme` 声明为安装时依赖，但自动安装不等于自动引入样式，也不等于自动挂载 `nax-theme`。

## L0：默认色

不安装或不引入本包时，组件仍可通过内置 fallback 显示：

```css
color: var(--nax-color-primary, #18a058);
```

此模式适合先跑通页面，但不提供完整的统一 Token 和可靠换肤能力。

## L1：启动配置

### 1. App 全局引入主题

在 `App.uvue` 的 `<style>` 中引入主题文件：

```css
@import "@/uni_modules/nax-ui-theme/theme/default.css";
/* 需要暗色变量表时再引入，切换方式见 L2 */
@import "@/uni_modules/nax-ui-theme/theme/dark.css";
```

### 2. 宿主节点挂载主题 class

优先在应用 layout 或壳页面最外层挂载一次：

```html
<view class="nax-theme">
  <!-- 页面内容 -->
</view>
```

没有统一 layout 时，再在各页面根节点挂载 `nax-theme`。主题变量挂在 class 节点上，子树才能稳定继承。

不要使用依赖 tag 或 id 的写法：

```css
/* 不推荐：uvue，尤其鸿蒙端不要依赖 page 选择器 */
page { --nax-color-primary: #18a058; }
```

## L2：运行时切换

在 L1 基础上，通过切换暗色 class 或覆盖变量实现运行时换肤。具体实现方式：

- 在根节点切换 `nax-theme` 与暗色 class（如 `nax-theme-dark`）组合
- 或在 `:root` 级别覆盖 `--nax-*` 变量（业务自身维护变量表）

> 变量清单以 `uni_modules/nax-ui-theme/theme/default.css` 与 `dark.css` 为准；设计规范见仓库 `docs/design-system.md`。
