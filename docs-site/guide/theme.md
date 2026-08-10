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

主题包随 [nax-ui 套装](https://ext.dcloud.net.cn/plugin?id=29077) 一并提供（组件包通常将其声明为安装时依赖），也可单独下载：

```text
uni_modules/nax-ui-theme
```

注意：自动安装**不等于**自动引入样式，也不等于自动挂载 `nax-theme`，仍需完成下方 L1 的 `@import` 与 class 挂载。

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

### 2. 挂载主题 class

主题变量通过 class 生效：**页面上只要有一处带 `nax-theme` class 的节点，它内部的所有内容都能使用 `--nax-*` 变量**。所以：

- 如果项目有公共的页面容器（比如自定义导航栏组件包裹的页面壳），在它的最外层挂一次即可
- 没有公共容器的话，**每个页面的根节点挂一次**，例如：

```html
<!-- 页面根节点 -->
<view class="page-root nax-theme">
  <!-- 页面内所有内容都能用 --nax-* 变量 -->
</view>
```

注意：变量只对 `nax-theme` 节点**内部**生效（CSS 继承规则），不能写在页面外面：

```css
/* 不推荐：page / tag / id 选择器不参与主题继承，鸿蒙端尤其不要依赖 page 选择器 */
page { --nax-color-primary: #18a058; }
```

## L2：运行时切换

在 L1 基础上，通过切换暗色 class 或覆盖变量实现运行时换肤。具体实现方式：

- 在根节点切换 `nax-theme` 与暗色 class（如 `nax-theme-dark`）组合
- 或在 `:root` 级别覆盖 `--nax-*` 变量（业务自身维护变量表）

需要"跟随系统 / 浅色 / 深色"三态暗黑模式（含各平台实现与可直接复制的代码），见 [暗黑模式接入](./dark-mode)。

## dialogPage 主题同步

`dialogPage` 是独立页面，不能继承触发页的 `nax-theme-dark`。使用 `openNaxPopup()` 打开内置 host 时，传入当前主题 class：

```uts
openNaxPopup({
  title: '提示',
  themeClass: 'nax-theme-dark'
})
```

用 `openNaxPopup({ url })` 打开的**自定义弹层页**是独立页面，看不到触发页上的主题 class，换肤不会自动生效。需要在你**自己写的那个弹层页**根节点上手动挂主题 class：浅色挂 `nax-theme`，暗色挂 `nax-theme nax-theme-dark`（按当前暗黑状态决定）。

## 变量清单与自定义

所有 `--nax-*` 变量的默认值都定义在主题包的两个文件中（安装后在项目里可直接查看）：

- `uni_modules/nax-ui-theme/theme/default.css` — 浅色默认值
- `uni_modules/nax-ui-theme/theme/dark.css` — 深色覆盖值

想改主题色（比如换品牌主色），不用改组件，在 `nax-theme` 节点上覆盖变量即可。

**推荐写在你项目的 `App.uvue` 的 `<style>` 里**（全局样式，对所有页面生效）。例如：

```css
/* App.uvue <style> */
@import "@/uni_modules/nax-ui-theme/theme/default.css";
@import "@/uni_modules/nax-ui-theme/theme/dark.css";

/* 覆盖品牌主色 */
.nax-theme {
  --nax-color-primary: #2080f0;
}
```

如果你的项目有单独的全局样式文件（比如 `common/theme.css`），也可以把 `.nax-theme` 的覆盖规则写在那里，再在 `App.uvue` 中引入：

```css
/* App.uvue <style> */
@import "@/common/theme.css";
```

```css
/* common/theme.css */
.nax-theme {
  --nax-color-primary: #2080f0;
}
```

> 两种方式等价。要点：覆盖规则写在全局样式里（App.uvue 或其引入的 css 文件），不要写在某个页面的 `<style>` 里——那样只对该页面生效。
