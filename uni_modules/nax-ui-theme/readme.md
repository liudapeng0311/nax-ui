# nax-ui-theme

`nax-ui-theme` 是 nax-ui 的主题 Token 约定包，不是 UI 组件。

- 提供统一的 `--nax-*` CSS 变量
- 默认浅色变量：`theme/default.css`
- 暗色覆盖变量：`theme/dark.css`
- 供独立 `nax-*` 组件共享主题
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

不安装或不引入本包时，组件仍可通过类似下面的 fallback 显示：

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

### 3. 覆盖品牌色

在全局样式或主题宿主 class 上覆盖变量：

```css
.nax-theme {
  --nax-color-primary: #18a058;
}
```

也可以在启动读取品牌配置后，通过宿主节点的 style 或修饰 class 写入变量。

## L2：运行时切换

### 暗色模式

引入 `default.css` 和 `dark.css` 后，在主题宿主上切换 `nax-theme-dark`：

```html
<!-- 浅色 -->
<view class="nax-theme">...</view>

<!-- 深色 -->
<view class="nax-theme nax-theme-dark">...</view>
```

### 运行时改主色

在已有 `.nax-theme` 宿主上覆盖变量，或切换预置修饰 class：

```css
.nax-theme--brand-a {
  --nax-color-primary: #18a058;
}

.nax-theme--brand-b {
  --nax-color-primary: #2080f0;
}
```

不建议在没有明确需求时引入多套完整皮肤、每组件独立主题包或复杂主题引擎。

## dialogPage 主题同步

`dialogPage` 是独立页面，不能继承触发页的 `nax-theme-dark`。使用 `openNaxPopup()` 打开内置 host 时，传入当前主题 class：

```uts
openNaxPopup({
  title: '提示',
  themeClass: 'nax-theme-dark'
})
```

用 `openNaxPopup({ url })` 打开的**自定义弹层页**是独立页面，看不到触发页上的主题 class，换肤不会自动生效。需要在你**自己写的那个弹层页**根节点上手动挂主题 class：浅色挂 `nax-theme`，暗色挂 `nax-theme nax-theme-dark`（按当前暗黑状态决定）。

## 覆盖优先级

```text
局部节点 / 页面变量
  > 宿主上的业务覆盖（主色、dark class）
  > nax-ui-theme 默认 Token
  > 组件内 fallback 字面量
```

## 组件作者约定

1. 外观色使用 `var(--nax-*, <fallback>)`，fallback 与默认 Token 对齐
2. 不在组件内写死唯一品牌色，示例除外
3. 不依赖 tag、`page` 或 id 选择器挂主题
4. 主题挂载点统一使用 `.nax-theme`、`.nax-theme-dark`
5. 组件文档引用本 README，不再引用仓库外部的主题接入文档

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

完整 Token 表见包内 `theme/default.css` 和 `theme/dark.css`；仓库设计原则见 `docs/design-system.md`。

## 兜底

若目标端 `@import` 异常，可以把 `theme/default.css` 或 `theme/dark.css` 的内容粘贴到 `App.uvue` 的 `<style>` 中。
