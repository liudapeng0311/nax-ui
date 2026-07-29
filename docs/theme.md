# nax-ui 主题接入指南

> Token 包：`uni_modules/nax-ui-theme`  
> 设计规范：`docs/design-system.md`

主题体系基于 **CSS 变量 `--nax-*`**，组件内带 **字面量 fallback**。  
目标：**默认能用、可选配置、需要时再运行时切换**——不是一上来就做完整主题中心。

---

## 1. 三档能力（先选档再接入）

| 档位 | 你得到什么 | 典型场景 | 成本 |
|------|------------|----------|------|
| **L0 默认色** | 不接 theme 也能用；组件走 fallback | 内部工具、单品牌、暂不换肤 | 零配置 |
| **L1 启动配置** | 统一 token；启动时定主色/品牌色，之后基本不变 | 白标、OEM、设计稿主色落地 | App 引入 + 一处宿主 |
| **L2 运行时切换** | 用户操作后立刻换肤（如 light/dark） | 深色模式、设置页换肤 | L1 + 切换 class/变量 |

建议：

- **组件库 / 正式业务**：至少做到 **L1**（token 统一、可覆盖主色）
- **有深色或设置页换肤**：再上 **L2**
- **先跑通页面**：可先 **L0**，不必阻塞开发

> 运行时主题 **有用但非人人刚需**：dark / 多品牌 / 可配置主色时价值高；固定单皮肤时保留变量体系即可，不必做复杂主题引擎。

---

## 2. 为什么不能「只 @import」

uvue（尤其 App / 鸿蒙）核心样式以 **class 选择器** 为主，**不要**写：

```css
page { --nax-color-primary: #18a058; } /* 鸿蒙可能报 Selector page is not supported */
```

`nax-ui-theme` 把变量挂在宿主 class 上：

```css
.nax-theme { --nax-color-primary: #18a058; /* ... */ }
```

因此：

| 步骤 | 作用 |
|------|------|
| `App.uvue` `@import` | 把规则加载进全局样式表 |
| 树上某处 `class="nax-theme"` | 变量真正挂到节点，子树可继承 |

**只 import、不挂宿主**：多数组件仍能显示（fallback），但改主色/dark **不会可靠生效**。

Sass / `uni.scss` 属于 **编译期** 变量，适合生成 CSS 或工程内部使用；**不能**替代运行时 `--nax-*`，也解决不了「宿主 class」问题。对外主题仍以 CSS 变量为准。

---

## 3. L0：默认色（零配置）

- 不安装或不安引入 `nax-ui-theme` 也可以
- 组件样式形如：`var(--nax-color-primary, #18a058)`
- 观感接近默认浅色，但 **不是** 完整 token 表，也不支持统一换肤

适合：demo 试组件、暂不接主题的业务页。

---

## 4. L1：启动配置（推荐默认）

### 4.1 App 引入一次

`App.uvue`：

```css
@import "@/uni_modules/nax-ui-theme/theme/default.css";
/* 需要暗色变量表时再引；切换仍靠 class，见 L2 */
@import "@/uni_modules/nax-ui-theme/theme/dark.css";
```

### 4.2 宿主只挂一处（优先 layout）

**推荐**：应用统一 layout / 壳页面最外层挂一次：

```html
<view class="nax-theme">
  <!-- 路由出口 / 页面内容 -->
</view>
```

**没有 layout 时**：各页面根节点挂 `nax-theme`（演示工程目前是这种）。

不要求「每个业务页面抄一遍说明」——能上移到壳就上移。

### 4.3 覆盖品牌色（启动时定死即可）

`App.uvue` 或全局样式：

```css
.nax-theme {
  --nax-color-primary: #18a058;
}
```

也可在「启动读配置」后，把主色写到宿主节点的 style / 对应 class 上（仍属 L1：启动后很少变）。

---

## 5. L2：运行时切换

在 L1 基础上增加「运行中改宿主 class 或变量」。

### 5.1 深色模式（最常见）

1. 已引入 `default.css` + `dark.css`
2. 切换时给宿主加上 / 去掉 `nax-theme-dark`：

```html
<!-- 浅色 -->
<view class="nax-theme">...</view>

<!-- 深色 -->
<view class="nax-theme nax-theme-dark">...</view>
```

可用本地状态、设置页或（后续）跟随系统深色，本质都是改宿主 class。

### 5.2 运行时改主色

在已有 `.nax-theme` 宿主上覆盖变量即可，例如改节点 style 或切换预置 class：

```css
.nax-theme--brand-a { --nax-color-primary: #18a058; }
.nax-theme--brand-b { --nax-color-primary: #18a058; }
```

### 5.3 不建议一上来做的

- 多套完整「皮肤市场」
- 每个组件独立主题包
- 复杂运行时主题引擎  

有明确产品需求再加。

---

### 5.4 dialogPage 主题同步

`dialogPage` 是独立页面，不能继承触发页的 `nax-theme-dark`。使用 `openNaxPopup()` 打开内置 host 时，传入当前主题 class：

```uts
openNaxPopup({
  title: '提示',
  themeClass: 'nax-theme-dark'
})
```

自定义 `url` 弹层页应在自身根节点挂载相同的 `nax-theme` / `nax-theme-dark` class。

## 6. 覆盖优先级

```text
局部节点 / 页面上的变量
  > 宿主上的业务覆盖（主色、dark class）
  > nax-ui-theme 默认 token（.nax-theme / .nax-theme-dark）
  > 组件内 fallback 字面量
```

---

## 7. 安装与依赖

```text
uni_modules/nax-ui-theme
```

- **弱依赖（运行时）**：组件不强制本包；未引入时走 fallback（L0）
- **安装时依赖（推荐）**：各 `nax-*` 组件的 `package.json` 已声明 `nax-ui-theme`，便于插件市场下载时自动带上
  - 注意：自动下载 **≠** 自动 `@import`、**≠** 自动挂 `nax-theme`（仍按 L1 接入）  
  注意：自动下载 **≠** 自动 `@import`、**≠** 自动挂 `nax-theme`

---

## 8. 兜底

若目标端 `@import` 异常：把 `theme/default.css`（及需要的 `dark.css`）内容粘贴进 `App.uvue` 的 `<style>`。

---

## 9. 组件作者约定

1. 外观色使用 `var(--nax-*, <fallback>)`，fallback 与 default token 对齐  
2. 不在组件内写死唯一品牌色（除非示例）  
3. 不依赖 tag / `page` / id 选择器挂主题  
4. 主题挂载点统一：`.nax-theme`、`.nax-theme-dark`  
5. 文档按 L0 / L1 / L2 表述，避免要求「每页必须接完整主题」  

---

## 10. 快速对照

| 需求 | 做法 |
|------|------|
| 先能显示 | L0，什么都不接 |
| 统一设计色、改主色 | L1：import + 一处 `nax-theme` + 覆盖变量 |
| 深色模式 | L2：再引 dark + 切换 `nax-theme-dark` |
| 只想用 Sass 一行引入一劳永逸 | 不推荐作对外方案；编译期无法替代运行时变量与宿主 |

完整 token 表见：`docs/design-system.md`、包内 `theme/default.css` / `dark.css`。
