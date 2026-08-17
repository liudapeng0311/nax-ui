# nax-divider

内容分割线（可带文字）。纯线条请用 `nax-line`。

## 用法示例

```uvue
<nax-divider></nax-divider>
<nax-divider text="或者"></nax-divider>
<nax-divider text="左侧" content-position="left"></nax-divider>
<nax-divider dashed text="虚线" type="primary"></nax-divider>

<!-- 竖向：父级固定高度时默认 height 100% 拉满 -->
<view style="height:120px;flex-direction:row;align-items:stretch;">
  <text>左</text>
  <nax-divider direction="vertical" space="12"></nax-divider>
  <text>右</text>
</view>

<!-- 与文字并排：用 length 指定高度 -->
<view style="flex-direction:row;align-items:center;">
  <text>左</text>
  <nax-divider direction="vertical" length="16" space="10"></nax-divider>
  <text>右</text>
</view>
```

## Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| direction | string | `horizontal` | `horizontal` / `vertical` |
| text | string | `''` | 中间文案；有值时显示两侧线夹文字 |
| content-position | string | `center` | `left` / `center` / `right` |
| dashed | boolean | `false` | 虚线 |
| size | string | `hairline` | `hairline` / `sm` / `md` |
| type | string | `default` | 语义色 |
| color | string | `''` | 自定义线色 |
| text-color | string | `''` | 自定义文案色 |
| space | string | `''` | 外边距（横=上下，竖=左右） |
| length | string | 竖向纯线默认 `100%` | 竖向高度；纯数字按 px |
| custom-class | string | `''` | 根节点扩展 class |

## Slots

| 名称 | 说明 |
|---|---|
| default | 自定义中间内容（需同时提供 `text` 以开启中间区，可用 `text=" "`） |

## 依赖

- `nax-ui-theme`（可选）
