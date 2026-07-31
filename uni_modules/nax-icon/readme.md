# nax-icon

`nax-ui` 字体图标组件（uni-app x / uvue）。

默认图标集基于 **[Tabler Icons](https://tabler.io/icons)**（MIT）语义子集，通过 `name` 使用，不直接暴露 Tabler 原始包名。

## 安装

```text
uni_modules/nax-icon
```

easycom 自动生效。

### 推荐同时安装主题包

```text
uni_modules/nax-ui-theme
```

```css
@import "@/uni_modules/nax-ui-theme/theme/default.css";
```

## 依赖

| 依赖 | 说明 |
|------|------|
| `nax-ui-theme` | **安装时依赖**；**运行时弱依赖**（未挂主题时走 fallback） |

> 安装 theme 后仍需：`App.uvue` `@import` + 一处 `class="nax-theme"`。详见 `uni_modules/nax-ui-theme/readme.md`。

## 基础用法

```html
<nax-icon name="search"></nax-icon>
<nax-icon name="close" size="sm" color="#999999"></nax-icon>
<nax-icon name="arrow-right" size="20" @click="onTap"></nax-icon>
```

配合按钮：

```html
<nax-button type="primary" icon="search" label="搜索"></nax-button>

<nax-button type="primary" label="搜索">
  <template #icon>
    <nax-icon name="search" size="sm" color="#ffffff"></nax-icon>
  </template>
</nax-button>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | string | `''` | 图标名 |
| size | string | `md` | `sm` / `md` / `lg`，或数字字符串像素值 |
| color | string | `''` | 可选颜色；空则走 CSS 变量 |
| disabled | boolean | `false` | 禁用点击 |
| customClass | string | `''` | 根节点扩展 class |

### 尺寸

| size | 字号 |
|------|------|
| sm | 16px |
| md | 18px |
| lg | 20px |

## Events

| 事件 | 说明 |
|------|------|
| click | 点击触发；`disabled` 时不触发 |

## 内置图标（MVP）

```text
close, check, plus, minus
arrow-left, arrow-right, arrow-up, arrow-down
chevron-left, chevron-right, chevron-up, chevron-down
search, loading, info, warning, success, error
user, home, more, edit, delete, star, heart
settings, eye, eye-off, copy, share, image, image-off, loader, loader-4, square, circle, square-check,
file-off, notes-off, database-off, message-off,
category, category-filled, map-pin, map-pin-filled
```

完整映射见：`assets/icons/catalog.json`、`icons/mapping.json`。

语义名与 Tabler 原始名不完全相同（例如 `close` → `x`，`image` → `photo`，`more` → `dots`）。

## 主题变量

- `--nax-icon-color`（优先）
- `--nax-color-text`
- `--nax-opacity-disabled`

未传 `color` 时，组件会在根节点解析图标色，兼容样式隔离 2.0 下的浅色 / 深色主题切换。

## 重新生成图标映射

1. 编辑 `assets/icons/catalog.json`（`name` + `tabler`；实心图标加 `"filled": true`）
2. 准备 Tabler 完整字体到 `static/nax-icon.source.ttf`（`@tabler/icons-webfont` 的 `dist/fonts/tabler-icons.ttf`）
3. 确保 `assets/icons/tabler-codepoints.json` 含对应 codepoint
4. 运行：

```bash
cd uni_modules/nax-icon
# 可选：npm install --no-save @tabler/icons-webfont@3.45.0
node scripts/build-icons.mjs
```

提交产物：`static/nax-icon.ttf`、`icons/glyphs.uts`、`icons/codepoints.json`、`icons/mapping.json`、组件内 base64 `@font-face`。

## 说明

- 当前分发字体为 **45 图标子集**（约 16KB），不是完整 Tabler font。
- 组件内 `@font-face` 使用 **base64 内联**，兼容微信小程序。
- 组件 API 只暴露语义化 `name`。
- 图标源：[Tabler Icons](https://tabler.io/icons)（MIT License）。

## 已知注意

- uvue / 鸿蒙 `@font-face` 仅支持 `font-family` 与 `src`。
- 微信小程序不要改回本地字体路径。
- 重新生成需要本机 Python `fontTools`：`pip install fonttools`。
