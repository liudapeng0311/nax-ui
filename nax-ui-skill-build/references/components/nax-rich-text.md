# nax-rich-text

`nax-ui` 富文本组件（uni-app x / uvue）。

## 用法示例

```uvue
<nax-rich-text
  content="<h3>nax-ui</h3><p>支持 <strong>加粗</strong>、<i>斜体</i></p>"
></nax-rich-text>
```

```uvue
<nax-rich-text :nodes="nodeList"></nax-rich-text>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| content | string | `''` | HTML 字符串（nodes 为空时生效） |
| nodes | any[] | `[]` | 节点列表（非空时优先于 content） |
| engine | string | `parser` | 渲染引擎：`parser`（自研解析渲染器，全端一致）/ `builtin`（内置 rich-text 兜底） |
| mode | string | `web` | 仅 builtin 引擎生效：App 渲染模式 `web` / `native`；`native` 遇到不支持的结构标签自动回退 `web`。Web/小程序忽略 |
| userSelect | boolean | `false` | 仅 builtin 引擎生效：文本是否可选中复制（iOS / 鸿蒙自动以 web 模式渲染以支持该能力） |
| space | string | `''` | 仅 builtin 引擎生效：连续空格显示：`ensp` / `emsp` / `nbsp` |
| size | string | `md` | 全局字号：`sm`(14) / `md`(16) / `lg`(18) / `xl`(20) / `xxl`(22) / 数字字符串（px） |
| color | string | `''` | 全局文字色（内容内联样式优先） |
| lineHeight | string | `''` | 全局行高，如 `1.5` 或 `22px` |
| fontFamily | string | `''` | 全局字体 |
| linkColor | string | `#18a058` | 链接颜色（parser 引擎生效） |
| show | boolean | `true` | 是否显示 |
| customClass | string | `''` | 根节点扩展 class |

## Events

| 事件 | 说明 |
|---|---|
| click | 点击根节点 |
| itemclick | 内容点击：`detail.type` 标记来源 `img` / `a` / `audio` / `embed`；图片 / 音频卡返回 `detail.src`，链接返回 `detail.href`（builtin 引擎小程序端不触发） |

## Slots

| 插槽 | 说明 |
|---|---|
| default | 预留扩展内容 |

## 平台说明

- `parser` 为默认引擎：自绘节点树，App / Web / 小程序渲染一致；内置 rich-text 限制（如视频不支持）不适用于该引擎
- `builtin` 引擎小程序端不支持 `itemclick` 子内容点击（官方限制）
- `builtin` 引擎 App 端 `mode=native` 时内容含 h1-h6 / ul / li 等结构标签会自动回退 web 渲染（native 解析不稳）
- 全局样式仅支持 font-size / font-family / line-height / color（写在 rich-text 元素上，优先级低于内容内样式）
