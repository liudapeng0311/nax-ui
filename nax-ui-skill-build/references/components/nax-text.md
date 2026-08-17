# nax-text

uni-app x 文本组件。

## 用法示例

```uvue
<nax-text text="这是多行输入啊"></nax-text>
<nax-text type="primary" text="主题色"></nax-text>
<nax-text mode="price" text="128.5" type="error"></nax-text>
<nax-text mode="phone" format="encrypt" text="130xxxxxxxx"></nax-text>
<nax-text :lines="2" text="超出两行显示省略号……"></nax-text>
```

## Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| type | string | `default` | `default` / `primary` / `info` / `success` / `warning` / `error` / `secondary` / `placeholder` |
| show | boolean | `true` | 是否显示 |
| text | string | `''` | 文案 |
| prefix-icon | string | `''` | 前置图标名（nax-icon） |
| suffix-icon | string | `''` | 后置图标名 |
| mode | string | `text` | `text` / `price` / `phone` / `name` / `date` / `link` |
| href | string | `''` | `mode=link` 链接 |
| format | string | `''` | `phone`/`name` 用 `encrypt`；`date` 用时间格式，默认 `yyyy-mm-dd` |
| call | boolean | `false` | `mode=phone` 时点击拨号 |
| bold | boolean | `false` | 加粗 |
| block | boolean | `false` | 块级 |
| lines | number | `0` | 最大行数，超出省略；`0` 不限制 |
| color | string | `''` | 自定义颜色（优先于 type） |
| size | string | `md` | `sm`(14) / `md`(16 默认) / `lg`(18) / `xl`(20) 或数字 px |
| decoration | string | `none` | `none` / `underline` / `line-through` |
| align | string | `left` | `left` / `center` / `right` |
| line-height | string | `''` | 行高 |
| selectable | boolean | `false` | 是否可选中 |
| icon-size | string | `''` | 图标尺寸，默认跟随字号 |
| icon-color | string | `''` | 图标颜色 |
| custom-class | string | `''` | 根节点扩展 class |

## Events

| 事件 | 说明 |
|---|---|
| click | 点击；`phone+call` 会拨号，`link` 会打开/复制链接 |

## Slots

| 名称 | 说明 |
|---|---|
| default | 文案后的附加内容 |
| prefix | 自定义前置区域 |
| suffix | 自定义后置区域 |

## 依赖

- `nax-icon`（前/后缀图标）
- `nax-ui-theme`（CSS 变量 `--nax-*`，弱依赖）
