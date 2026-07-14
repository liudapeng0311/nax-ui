# nax-ui 主题接入指南

> Token 包：`uni_modules/nax-ui-theme`  
> 设计规范：`docs/design-system.md`

## 全局接入（推荐）

`App.uvue`：

```css
@import "@/uni_modules/nax-ui-theme/theme/default.css";
@import "@/uni_modules/nax-ui-theme/theme/dark.css"; /* 可选 */
```

覆盖品牌色：

```css
page {
  --nax-color-primary: #7c3aed;
}
```

## 暗色

引入 `dark.css` 后，根节点加 class：

```html
<view class="nax-theme-dark">...</view>
```

## 覆盖优先级

```text
局部节点 / 页面变量
  > App.uvue page 覆盖
  > nax-ui-theme 默认 token
  > 组件 fallback
```

## 兜底

若 `@import` 异常，把 `theme/default.css` 内容粘贴进 `App.uvue` 的 `<style>`。

## 组件作者约定

- 使用 `--nax-*` + fallback
- 推荐安装 `nax-ui-theme`，但不强依赖