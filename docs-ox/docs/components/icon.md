
# nax-icon

> 当前版本：0.3.0

`nax-ui` 字体图标组件（uni-app x / uvue）。

## 安装

- 插件市场：[nax-icon](https://ext.dcloud.net.cn/plugin?id=29021)

easycom 自动生效，页面直接使用 `<nax-icon />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 基础用法
```demo demo-icon
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

### 自定义图标（glyph / font-family）
内置图标集固定。业务需要自有图标（品牌 logo、运营素材、多语言图标等）时，可以自备一套**图标字体**接入 `nax-icon`，无需改动组件库。

### 原理

字体图标 = 「字体」+「字形字符」。内置的 `name` 是组件库帮你做好的「名字 → 字符」映射；自定义时由你自己提供这两样：

- `glyph`：要渲染的图标码位，**直接把 iconfont 页面显示的 `&amp;#xe6cf;` 原样粘贴即可**，组件自动识别，无需手动转义
- `font-family`：你的图标字体族名，必须与已注册的 `@font-face` 的 `font-family` 一致

### 三步接入

1. 生成图标字体
2. 注册 `@font-face`
3. 用 `glyph` + `font-family` 渲染

#### 第一步：生成图标字体

以 iconfont.cn（阿里巴巴图标库）为例：

1. 挑选需要的图标加入项目
2. 项目页点击「下载到本地」，保留 **字体文件**（`.ttf` / `.woff` / `.woff2`）
3. 在「项目设置」里查看每个图标的 **Unicode 码位**（形如 `\ue001`），记下你要用的码位
4. 也可用 fontello / IcoMoon 自选 SVG 导出 ttf（可只导出需要的图标，控制字体体积）

#### 第二步：注册 @font-face

把字体文件放入项目的 `static/` 目录，在 `App.uvue` 的 `<style>` 中注册：

```css
/* App.uvue */
@font-face {
  font-family: my-icons;
  src: url('/static/my-icons.ttf');
}
```

平台差异（务必按端处理）：

| 平台 | 要求 |
|------|------|
| App（Android / iOS） | 字体文件随包发布，`src` 写项目内路径即可 |
| App（HarmonyOS） | 同上；`@font-face` 仅支持 `font-family` + `src` 两个属性 |
| H5 / Web | 支持相对路径或远程 URL（`https://...`） |
| 微信小程序 | **不支持本地字体文件路径**，必须把字体转 base64 后内联进 `src`（`nax-icon` 内置字体即此做法） |

> 提示：微信小程序可先按需裁剪字体再转 base64，避免包体膨胀。

#### 第三步：使用

直接粘贴 iconfont 页面显示的码位（Unicode 模式下的 `&#xe6cf;`），不用转义：

```html
<nax-icon glyph="&#xe6cf;" font-family="my-icons" size="20" color="#18a058"></nax-icon>
```

`glyph` 自动识别以下写法，等价：

| 写法 | 示例 | 来源 |
|------|------|------|
| HTML 实体 | `&amp;#xe6cf;` | iconfont 页面直接复制 |
| 纯十六进制 | `e6cf` | 手敲 |
| C 风格 | `0xe6cf` | 手敲 |
| Unicode 记法 | `U+E6CF` | 资料/文档 |
| JS 转义 | `\ue6cf` | 代码片段 |
| 字符本身 | 直接复制图标字符 | 高级用法 |

优先级规则：`glyph` 非空 → 直接渲染 `glyph`；`glyph` 为空 → 用 `name` 查内置映射。两者同时传时 `glyph` 生效。

### 常见问题

| 现象 | 原因与排查 |
|------|-----------|
| 显示为方块 / 乱码 | `@font-face` 未注册成功；`font-family` 名字不一致；码位不属于该字体（换别的码位验证） |
| 只传 `glyph` 没传 `font-family` | 会用内置 nax-icon 字体渲染，一般显示不出；可先用内置码位（如 `\ueb55`）验证渲染路径，再接自己的字体 |
| 一套字体不够用 | 可同时注册多套字体，不同 `nax-icon` 各传各的 `font-family` |
| 字号偏大 / 偏小 | `size` 同时控制 width / height / font-size / line-height；字体本身设计空隙大时可自行调小 size |

### 当前支持的图标

共 51 个内置图标名：

|  |  |  |  |  |
|---|---|---|---|---|
| `close` | `check` | `plus` | `minus` | `arrow-left` |
| `arrow-right` | `arrow-up` | `arrow-down` | `chevron-left` | `chevron-right` |
| `chevron-up` | `chevron-down` | `search` | `loading` | `info` |
| `warning` | `success` | `error` | `user` | `home` |
| `more` | `edit` | `delete` | `star` | `heart` |
| `settings` | `eye` | `eye-off` | `copy` | `share` |
| `image` | `image-off` | `loader` | `loader-4` | `square` |
| `circle` | `square-check` | `file-off` | `notes-off` | `database-off` |
| `message-off` | `category` | `category-filled` | `map-pin` | `map-pin-filled` |
| `player-play` | `player-pause` | `player-play-filled` | `player-pause-filled` | `arrows-maximize` |
| `arrows-minimize` |  |  |  |  |

### 尺寸 size
```uvue
<nax-icon name="search" size="sm"></nax-icon>
<nax-icon name="search" size="md"></nax-icon>
<nax-icon name="search" size="lg"></nax-icon>
<nax-icon name="search" size="28"></nax-icon>
```

### 颜色 color
```uvue
<nax-icon name="heart" color="#d03050"></nax-icon>
<nax-icon name="star" color="#f0a020"></nax-icon>
<nax-icon name="success" color="#18a058"></nax-icon>
<nax-icon name="info" color="#2080f0"></nax-icon>
```

### 状态
```uvue
<nax-icon name="settings" @click="onTap"></nax-icon>
<nax-icon name="settings" disabled @click="onTap"></nax-icon>
```

```uts
function onTap() {
	// 处理点击；disabled 时不会触发
}
```

### 配合 nax-button
```uvue
<nax-button type="primary" label="搜索">
	<template #icon>
		<nax-icon name="search" size="sm"></nax-icon>
	</template>
</nax-button>
<nax-button type="error" variant="outline" label="删除">
	<template #icon>
		<nax-icon name="delete" size="sm" color="#d03050"></nax-icon>
	</template>
</nax-button>
```

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-text` | 主文字色 |
| `--nax-icon-color` | 图标颜色 |
| `--nax-opacity-disabled` | 禁用透明度 |

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | string | `''` | 图标名（必填），可选值见“当前支持的图标”，如 `close` / `search` / `arrow-right` |
| glyph | string | `''` | 自定义字形字符或码位；可直接粘贴 iconfont 页面显示的 `&amp;#xe6cf;`，无需转义，也支持 `e6cf` / `0xe6cf` / `U+E6CF` / `\ue6cf` / 字符本身。非空时优先于 `name` |
| fontFamily | string | `''` | 自定义图标字体族名；需自行 `@font-face` 注册后配合 `glyph` 使用 |
| size | string | `'md'` | `sm` 小 \| `md` 中 \| `lg` 大 \| 数字字符串像素值（如 20 表示 20px） |
| color | string | `''` | 可选颜色；默认走 `--nax-icon-color` / `--nax-color-text` |
| disabled | boolean | `false` | 禁用点击 |
| customClass | string | `''` | 根节点扩展类名（class），用于自定义样式 |

## Events

| 事件 | 说明 |
|------|------|
| click | 点击；disabled 时不触发 |

