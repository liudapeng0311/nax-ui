# nax-slider

uni-app x 滑动选择器，功能覆盖常用场景。

## 用法示例

```uvue
<nax-slider v-model="value" @change="onChange"></nax-slider>
```

## Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| modelValue | number | `0` | 当前值（`v-model`），落在 `[start, end]` |
| start | number | `0` | 整体范围起点 |
| end | number | `100` | 整体范围终点 |
| min | number | `0` | 可选最小值（夹在 start/end 内） |
| max | number | `100` | 可选最大值（夹在 start/end 内） |
| step | number | `1` | 步长 |
| size | string | `md` | `sm` / `md` / `lg`，影响轨道高度与滑块尺寸 |
| blockWidth | number | `0` | 滑块边长（px）；`0` 跟随 size |
| height | number | `0` | 轨道高度（px）；`0` 跟随 size |
| inactiveColor | string | `''` | 轨道底色；空则 `--nax-color-border` |
| activeColor | string | `''` | 已选轨道色；空则 `--nax-color-primary` |
| blockColor | string | `''` | 滑块颜色；空则 `--nax-color-bg` |
| disabled | boolean | `false` | 禁用 |
| useSlot | boolean | `false` | 使用默认插槽自定义滑块 |
| showEdgeValue | boolean | `false` | 显示起止数值 |
| edgeValuePosition | string | `top` | 起止数值位置 `top` / `bottom` |
| customClass | string | `''` | 根节点扩展 class |

## Events

| 事件 | 说明 |
|---|---|
| update:modelValue | v-model |
| change | 松手/点击后的最终值 |
| start | 开始滑动 |
| moving | 滑动中 |
| end | 滑动结束 |

## Slots

| 名称 | 说明 |
|---|---|
| default | 自定义滑块（需 `useSlot`） |

## 依赖

- `nax-ui-theme`（CSS 变量 `--nax-*`，安装时依赖 / 运行时弱依赖）
