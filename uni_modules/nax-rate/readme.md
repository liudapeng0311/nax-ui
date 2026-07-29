# nax-rate

uni-app x 评分组件，功能覆盖常用场景。

## 依赖

- `nax-icon`（星形图标）
- `nax-ui-theme`（CSS 变量 `--nax-*`，安装时依赖 / 运行时弱依赖）

## 基础用法

```uvue
<nax-rate v-model="value" @change="onChange"></nax-rate>
```

## Props

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
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

### 尺寸

| size | 图标边长 |
|------|----------|
| sm | 18px |
| md | 22px |
| lg | 28px |

## Events

| 事件 | 说明 |
|------|------|
| update:modelValue | v-model |
| change | 分值变化（number） |

## 主题 Token

- `--nax-color-warning` 默认选中色
- `--nax-color-text-placeholder` 默认未选中色
- `--nax-opacity-disabled` 禁用透明度

## 设计说明

- 尺寸统一为 `sm | md | lg` 或 **px** 数字字符串（不用 rpx）
- `gutter` 单位为 **px**
- 默认选中色用 warning 黄，更符合评分场景（常用错误色）
- 图标默认均为 Lucide `star`（当前图标集无 `star-fill`）；通过 `activeColor` 区分选中态
- 增加 `readonly` / `touchable`
- 不提供 `current` 遗留 API、`customStyle`、`colors` / `icons` 分段数组、`customPrefix`
- 不提供 `customStyle` 泛样式入口，扩展用 `customClass` + CSS 变量
