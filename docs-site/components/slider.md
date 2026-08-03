---
demo: slider
---

# nax-slider

uni-app x 滑动选择器，功能覆盖常用场景。

## 安装

```text
uni_modules/nax-slider
```

easycom 自动生效，页面直接使用 `<nax-slider />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

> 当前版本：1.0.0（见 `changelog.md`）

## 代码示例

### 基础用法

```uvue
<nax-slider v-model="value" @change="onChange"></nax-slider>
```

### Slot

| 名称 | 说明 |
|------|------|
| default | 自定义滑块（需 `useSlot`） |

### 主题 Token

- `--nax-color-primary` 默认已选轨道色
- `--nax-color-border` 默认轨道底色 / 滑块描边
- `--nax-color-bg` 默认滑块底色
- `--nax-color-text-secondary` 起止数值色
- `--nax-opacity-disabled` 禁用透明度
- `--nax-radius-full` 圆角

### 范围说明

- `start` / `end`：整条轨道的刻度范围（决定滑块视觉位置）
- `min` / `max`：可选取值区间，会被夹在 `[start, end]` 内
- 小数范围请同时设置 `:start` / `:end`（例如 0–1 且 `step=0.1`），不要只设 `min`/`max` 而保留默认 end=100

### 设计说明

- 尺寸增加 `size: sm | md | lg`；`blockWidth` / `height` 单位为 **px**（不用 rpx）
- 不提供 `blockStyle` / `customStyle` 对象样式入口，扩展用 `customClass` + CSS 变量
- 额外提供 `change` 事件（松手/点击最终值），便于表单联动
- 阴影仅 Web / 小程序；App 端用描边保证层次（条件编译）
- 组件不内置跟随滑块移动的数值气泡；需要展示当前值时，在滑块外使用普通文本绑定 `v-model`


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | number | `0` | 当前值（v-model），落在 [start, end] 内 |
| start | number | `0` | 整体范围起点 |
| end | number | `100` | 整体范围终点 |
| min | number | `0` | 可选最小值（夹在 start/end 内） |
| max | number | `100` | 可选最大值（夹在 start/end 内） |
| step | number | `1` | 步长 |
| size | string | `'md'` | sm \| md \| lg（影响轨道高度与滑块尺寸；可被 blockWidth/height 覆盖） |
| blockWidth | number | `0` | 滑块边长（px）；0 表示跟随 size |
| height | number | `0` | 轨道高度（px）；0 表示跟随 size |
| inactiveColor | string | `''` | 轨道底色；空则主题边框色 |
| activeColor | string | `''` | 已选轨道色；空则主题主色 |
| blockColor | string | `''` | 滑块颜色；空则主题背景色 |
| disabled | boolean | `false` | 禁用 |
| useSlot | boolean | `false` | 使用默认插槽自定义滑块 |
| showEdgeValue | boolean | `false` | 显示起止数值 |
| edgeValuePosition | string | `'top'` | top \| bottom |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| update:modelValue | v-model |
| change | 值变化（松手/点击后的最终值） |
| start | 开始滑动 |
| moving | 滑动中 |
| end | 滑动结束 |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义滑块（需 useSlot） |
