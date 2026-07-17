# nax-icon

`nax-ui` 字体图标组件（uni-app x / uvue）。

默认图标集基于 **Lucide**（ISC）语义子集，通过 `name` 使用，不直接暴露 Lucide 原始包名。

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
| `nax-ui-theme` | **安装时依赖**（下载本插件时建议自动带上）；**运行时弱依赖**（未 `@import` / 未挂 `nax-theme` 时组件走 fallback） |

> 安装 theme 后仍需：`App.uvue` `@import` + 应用 layout/页面 **一处** `class="nax-theme"`。详见仓库 `docs/theme.md`（L0/L1/L2）。

## 基础用法

```html
<nax-icon name="search"></nax-icon>
<nax-icon name="close" size="sm" color="#999999"></nax-icon>
<nax-icon name="arrow-right" size="20" @click="onTap"></nax-icon>
```

配合按钮：

```html
<!-- 推荐：直接传 icon prop -->
<nax-button type="primary" icon="search" label="搜索"></nax-button>

<!-- 或自定义插槽 -->
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
settings, eye, eye-off, copy, share, image, image-off, loader
```

完整映射见：`assets/icons/catalog.json`、`icons/mapping.json`。

## 主题变量

- `--nax-icon-color`（优先）
- `--nax-color-text`
- `--nax-opacity-disabled`

## 重新生成图标映射

仅在增删图标时需要：

```bash
cd uni_modules/nax-icon
# 使用构建依赖清单
copy package.build.json package.build.local.json
# 或临时安装
npm install --no-save lucide-static@1.24.0
node scripts/build-icons.mjs
```

更稳妥：

```bash
cd uni_modules/nax-icon
npm install --prefix . -D lucide-static@1.24.0
# 若 package.json 被 npm 改写，从 git 恢复 package.json 后执行：
node scripts/build-icons.mjs
```

推荐流程：

1. 编辑 `assets/icons/catalog.json`
2. 运行 `node scripts/build-icons.mjs`
3. 提交 `static/nax-icon.ttf`、`icons/glyphs.uts`、`icons/codepoints.json`、`icons/mapping.json`

## 说明

- 当前分发字体为 **30 图标子集**（约 10KB），不是完整 Lucide font。
- 组件内 `@font-face` 使用 **base64 内联**，兼容微信小程序（禁止本地字体路径）。
- 组件 API 只暴露语义化 `name`。
- 图标源： [Lucide](https://lucide.dev/)（ISC License）。

## 已知注意

- uvue / 鸿蒙 `@font-face` 仅支持 `font-family` 与 `src`，不要写 `font-weight` / `font-style`。
- 微信小程序不要改回本地 `url('/uni_modules/...ttf')`，会触发 `do-not-use-local-path`。
- 重新生成映射/子集需要本机 Python `fontTools`：`pip install fonttools`。
- 未在真机全端验证前，请在目标端做一次显示确认。
