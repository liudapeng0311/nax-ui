# nax-rate

uni-app x 评分组件，功能覆盖常用场景。

## 用法示例

```uvue
<nax-rate v-model="value" @change="onChange"></nax-rate>
```

## Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| modelValue | number | `0` | 当前分值（`v-model`），`allowHalf` 时可为 `x.5` |
| count | number | `5` | 星星总数（1–20） |
| disabled | boolean | `false` | 禁用交互，并降低透明度 |
| readonly | boolean | `false` | 只读展示（不交互、不降透明度） |
| size | string | `md` | `sm` / `md` / `lg`，或数字像素字符串 |
| inactiveColor | string | `''` | 未选中色；空则 `--nax-color-text-placeholder` |
| activeColor | string | `''` | 选中色；空则 `--nax-color-warning` |
| gutter | number | `6` | 星星间距（**px**） |
| minCount | number | `0` | 最少可选星数 |
| allowHalf | boolean | `false` | 允许半星 |
| touchable | boolean | `true` | 允许滑动打分 |
| activeIcon | string | `star` | 选中图标（`nax-icon` name） |
| inactiveIcon | string | `star` | 未选中图标（`nax-icon` name） |
| customClass | string | `''` | 根节点扩展 class |

## Events

| 事件 | 说明 |
|---|---|
| update:modelValue | v-model |
| change | 分值变化（number） |

## 依赖

- `nax-icon`（星形图标）
- `nax-ui-theme`（CSS 变量 `--nax-*`，安装时依赖 / 运行时弱依赖）
