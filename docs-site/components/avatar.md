---
demo: avatar
---

# nax-avatar

> 当前版本：0.1.2（见 `changelog.md`）

uni-app x 头像组件，提供常用能力。

## 安装

```text
uni_modules/nax-avatar
```

easycom 自动生效，页面直接使用 `<nax-avatar />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 基础用法

```uvue
<!-- 图片头像 -->
<nax-avatar src="https://example.com/a.jpg"></nax-avatar>

<!-- 文字头像 -->
<nax-avatar text="NA" color="#18a058"></nax-avatar>

<!-- 自定义尺寸（px） -->
<nax-avatar src="https://example.com/a.jpg" size="48"></nax-avatar>

<!-- 边框 -->
<nax-avatar src="https://example.com/a.jpg" border-color="#18a058"></nax-avatar>
```

### 形状 shape

| 值 | 说明 |
|----|------|
| `circle` | 圆形（默认） |
| `square` | 直角方形 |
| `round` | 圆角方形 |

`round` 布尔在本组件用 `shape="circle"` 表达。

### 尺寸 size

| 值 | 边长 | 尺寸别名 |
|----|------|------------|
| `sm` / `small` | 28px | small |
| `md` / `medium` | 34px | medium（默认） |
| `lg` / `large` | 40px | large |
| 数字字符串 | 自定义 px | number |

### 事件

| 事件 | 说明 |
|------|------|
| click | 点击 |
| load | 图片加载成功 |
| error | 主图与 fallback 均失败（或仅主图失败且无 fallback） |

### 与徽标组合

```uvue
<nax-badge value="8" dot>
  <nax-avatar src="https://example.com/a.jpg"></nax-avatar>
</nax-badge>
```

### 主题 Token（可选覆盖）

| Token | 用途 |
|-------|------|
| `--nax-avatar-color` | 默认背景 |
| `--nax-avatar-border-color` | 描边色 |
| `--nax-avatar-radius` | `shape=round` 圆角 |
| `--nax-avatar-radius-square` | `shape=square` 圆角 |

### 平台说明

- 图片使用原生 `image`，`object-fit` 映射为 uni-app x `mode`。
- Harmony：根节点背景使用字面量 fallback，避免 CSS 变量失效。


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| src | string | `''` | 图片地址 |
| text | string | `''` | 文字头像内容（无图或加载失败时展示） |
| size | string | `'md'` | sm \| md \| lg \| 数字字符串（如 48）；兼容 small/medium/large（） |
| shape | string | `'circle'` | circle \| square \| round； round 对应 circle |
| bordered | boolean | `false` | 是否显示描边 |
| borderColor | string | `''` | 描边颜色；有值时可单独开启描边 |
| color | string | `''` | 背景色（文字头像常用） |
| textColor | string | `''` | 文字颜色 |
| mode | string | `'aspectFill'` | 图片 mode，同原生 image；默认 aspectFill（≈ cover） |
| objectFit | string | `''` | fill \| contain \| cover \| none \| scale-down； 兼容，优先于 mode |
| fallbackSrc | string | `''` | 图片加载失败后的回退地址 |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| click | 点击 |
| load | 图片加载成功 |
| error | 图片加载失败（含 fallback 仍失败） |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 无图 / 最终失败时的自定义内容（如图标） |
