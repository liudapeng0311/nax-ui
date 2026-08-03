---
demo: rate
---

# nax-rate

uni-app x 评分组件，功能覆盖常用场景。

## 安装

```text
uni_modules/nax-rate
```

easycom 自动生效，页面直接使用 `<nax-rate />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

> 当前版本：0.1.1（见 `changelog.md`）

## 代码示例

### 基础用法

```uvue
<nax-rate v-model="value" @change="onChange"></nax-rate>
```

### 主题 Token

- `--nax-color-warning` 默认选中色
- `--nax-color-text-placeholder` 默认未选中色
- `--nax-opacity-disabled` 禁用透明度

### 设计说明

- 尺寸统一为 `sm | md | lg` 或 **px** 数字字符串（不用 rpx）
- `gutter` 单位为 **px**
- 默认选中色用 warning 黄，更符合评分场景（常用错误色）
- 图标默认均为 Lucide `star`（当前图标集无 `star-fill`）；通过 `activeColor` 区分选中态
- 增加 `readonly` / `touchable`
- 不提供 `current` 遗留 API、`customStyle`、`colors` / `icons` 分段数组、`customPrefix`
- 不提供 `customStyle` 泛样式入口，扩展用 `customClass` + CSS 变量


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | number | `0` | 当前分值（v-model），支持半星小数 |
| count | number | `5` | 星星总数 |
| disabled | boolean | `false` | 禁用交互（降低透明度） |
| readonly | boolean | `false` | 只读展示（不触发交互，不降低透明度） |
| size | string | `'md'` | sm \| md \| lg \| 数字像素字符串 |
| inactiveColor | string | `''` | 未选中色；空则占位色 token |
| activeColor | string | `''` | 选中色；空则警告色 token |
| gutter | number | `6` | 星星间距（px） |
| minCount | number | `0` | 最少可选星数 |
| allowHalf | boolean | `false` | 允许半星（滑动按位置；点击在半星/整星间切换） |
| touchable | boolean | `true` | 允许滑动打分 |
| activeIcon | string | `'star'` | 选中图标名（nax-icon） |
| inactiveIcon | string | `'star'` | 未选中图标名（nax-icon） |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| update:modelValue | v-model |
| change | 分值变化（number） |

