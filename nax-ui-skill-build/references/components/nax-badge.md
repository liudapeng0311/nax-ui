# nax-badge

uni-app x 徽标组件，提供常用能力。

## 用法示例

```uvue
<!-- 锚定在内容右上角 -->
<nax-badge value="8">
  <view class="box"></view>
</nax-badge>

<!-- 红点 -->
<nax-badge dot>
  <view class="box"></view>
</nax-badge>

<!-- 独立展示 -->
<nax-badge alone value="99+"></nax-badge>
```

## Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| value | string | `''` | 显示值；数字超过 max 显示 `{max}+` |
| max | number | `0` | 最大值，`0` 表示不限制 |
| dot | boolean | `false` | 红点模式 |
| show-zero | boolean | `false` | 值为 0 时是否展示 |
| show | boolean | `true` | 是否显示徽标 |
| processing | boolean | `false` | 处理中波纹 |
| alone | boolean | `false` | 独立展示（非角标定位） |
| type | string | `default` | `default` / `success` / `error` / `warning` / `info` |
| color | string | `''` | 自定义颜色，覆盖 type |
| offset-x | string | `''` | 水平偏移，正值向右 |
| offset-y | string | `''` | 垂直偏移，正值向下 |
| custom-class | string | `''` | 根节点扩展 class |

## Slots

| 名称 | 说明 |
|---|---|
| default | 被徽标锚定的内容 |
| value | 自定义徽标内容 |

## 依赖

- `nax-ui-theme`（CSS 变量 `--nax-*`）
