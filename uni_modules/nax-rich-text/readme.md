# nax-rich-text

`nax-ui` 富文本组件（uni-app x / uvue）。

基于内置 `rich-text` 封装：**HTML 字符串 / 节点列表**双入口，App 端渲染模式（`native` / `web`），全局字号 / 颜色 / 行高 / 字体，以及**内容点击**（图片 / 链接）事件。

## 安装

```text
uni_modules/nax-rich-text
```

依赖：

```text
uni_modules/nax-ui-theme
```

easycom 自动生效。

### 推荐同时安装主题包

```text
uni_modules/nax-ui-theme
```

并在 `App.uvue` 引入：

```css
@import "@/uni_modules/nax-ui-theme/theme/default.css";
```

页面根节点加 `class="nax-theme"`。

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-text` | 默认文字色（内容内未显式指定颜色时生效） |

> 富文本内容的颜色以**内容内联样式**为最高优先级，其次为 `color` prop 全局色，最后回落到主题 token。

## 基础用法

```html
<nax-rich-text
  content="<h3>nax-ui</h3><p>支持 <strong>加粗</strong>、<i>斜体</i></p>"
></nax-rich-text>
```

## 节点列表

```html
<nax-rich-text :nodes="nodeList"></nax-rich-text>
```

```ts
const nodeList = [
  {
    name: 'p',
    attrs: { style: 'color: #18a058;' },
    children: [{ text: '节点列表渲染' }]
  }
] as any[]
```

`nodes` 非空时优先于 `content`。

## App 渲染模式 mode

| 选项 | 说明 |
|------|------|
| `web`（默认） | webview 渲染；标签支持最广，渲染结果与 Web 端一致 |
| `native` | 蒸汽模式下 C 语言原生渲染：长文秒开、快滑不白屏不掉帧。适合纯文本长内容（段落 / 加粗 / 链接 / 图片） |

**自动回退**：传 `mode="native"` 时，若内容含 h1-h6 / ul / li 等结构标签（native 解析不稳，会出现整块空白），或 iOS / 鸿蒙端开启 `user-select`，组件自动改用 `web` 渲染，无需手动处理。

Web / 小程序端忽略该属性（本身就是 webview 渲染）。

## 内容点击

```html
<nax-rich-text :content="html" @itemclick="onItemClick"></nax-rich-text>
```

```ts
function onItemClick(e : any) {
  // 点击图片：e.detail.src；点击链接：e.detail.href
}
```

> 小程序端 rich-text 不支持子内容点击，`itemclick` 不会触发（官方限制）。

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| content | string | `''` | HTML 字符串（nodes 为空时生效） |
| nodes | any[] | `[]` | 节点列表（非空时优先于 content） |
| mode | string | `web` | App 渲染模式：`web` / `native`；`native` 遇到不支持的结构标签自动回退 `web`。Web/小程序忽略 |
| userSelect | boolean | `false` | 文本是否可选中复制（iOS / 鸿蒙自动以 web 模式渲染以支持该能力） |
| space | string | `''` | 连续空格显示：`ensp` / `emsp` / `nbsp` |
| size | string | `md` | 全局字号：`sm`(14) / `md`(16) / `lg`(18) / `xl`(20) / `xxl`(22) / 数字字符串（px） |
| color | string | `''` | 全局文字色（内容内联样式优先） |
| lineHeight | string | `''` | 全局行高，如 `1.5` 或 `22px` |
| fontFamily | string | `''` | 全局字体 |
| show | boolean | `true` | 是否显示 |
| customClass | string | `''` | 根节点扩展 class |

## Events

| 事件 | 说明 |
|------|------|
| click | 点击根节点 |
| itemclick | 内容点击：img 返回 `detail.src`，a 返回 `detail.href`（小程序端不触发） |

## Slots

| 插槽 | 说明 |
|------|------|
| default | 预留扩展内容 |

## 平台差异与已知限制

- 内置 rich-text 不支持 `video`，如需视频请拆分内容，在视频前后各放一个 `nax-rich-text`
- 小程序端不支持 `itemclick` 子内容点击
- App 端 `mode=native` 时内容含 h1-h6 / ul / li 等结构标签会自动回退 web 渲染（native 解析不稳）
- 全局样式仅支持 font-size / font-family / line-height / color（写在 rich-text 元素上，优先级低于内容内样式）
