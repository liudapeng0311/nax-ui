# nax-line

纯线条（布局分隔）。围绕常见布局场景 做了主题 token、粗细阶梯、方向命名与间距语义优化。

## 用法示例

```uvue
<nax-line></nax-line>
<nax-line length="200"></nax-line>
<nax-line dashed space="12"></nax-line>
<nax-line direction="vertical" length="40"></nax-line>
<nax-line type="primary" size="md"></nax-line>
```

## Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| direction | string | `horizontal` | `horizontal` / `vertical`；兼容 `row` / `column` |
| length | string | `100%` | 长度；横线=宽、竖线=高；纯数字按 `px`；可写 `%` / `px` / `rpx` |
| size | string | `hairline` | 粗细：`hairline` / `sm` / `md` / `lg` |
| dashed | boolean | `false` | 虚线 |
| type | string | `default` | `default` / `primary` / `info` / `success` / `warning` / `error`（兼容 `danger`） |
| color | string | `''` | 自定义颜色（覆盖 type） |
| space | string | `''` | 交叉轴外边距：横线=上下，竖线=左右；纯数字按 `px` |
| inset | string | `''` | 主轴两端内缩：横线=左右，竖线=上下；纯数字按 `px` |
| custom-class | string | `''` | 根节点扩展 class |

## 依赖

- `nax-ui-theme`（可选，提供统一 token）
