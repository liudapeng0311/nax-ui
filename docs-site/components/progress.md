---
demo: progress
---

# nax-progress

# nax-progress
进度条。线形 / 圆形统一入口，用 `shape` 切换。

## 安装

```text
uni_modules/nax-progress
```

easycom 自动生效，页面直接使用 `<nax-progress />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 基础用法

```uvue
<!-- 线形（默认） -->
<nax-progress :percent="60"></nax-progress>

<!-- 圆形 -->
<nax-progress shape="circle" :percent="60"></nax-progress>

<!-- 语义色 -->
<nax-progress type="success" :percent="80"></nax-progress>
<nax-progress type="warning" :percent="40"></nax-progress>
<nax-progress type="error" :percent="20"></nax-progress>

<!-- 自定义信息区（需 useSlot） -->
<nax-progress :percent="50" use-slot>
  <text>一半</text>
</nax-progress>
```

### 说明

- 主题优先 CSS 变量；`color` / `track-color` 仅作局部覆盖。
- 圆形采用双半环 + `transform: rotate`，全端公共实现。
- App 鸿蒙线形进度使用 `APP-HARMONY` 条件编译，以 `transform: scaleX()` 驱动动画，避开百分比宽度过渡的满宽闪烁；其它端仍使用 `width` 过渡。


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| percent | number | `0` | 进度 0–100 |
| shape | string | `'line'` | line \| circle |
| type | string | `'primary'` | default \| primary \| info \| success \| warning \| error（兼容 danger） |
| status | string | `''` | success \| warning \| error；有值时覆盖 type 色 |
| size | string | `'md'` | sm \| md \| lg |
| showInfo | boolean | `true` | 是否显示百分比/文案 |
| textInside | boolean | `false` | 线形文案是否在条内 |
| useSlot | boolean | `false` | 使用默认插槽自定义信息区 |
| strokeWidth | number | `0` | 线形高度 / 圆形描边（px）；0 跟随 size |
| width | number | `0` | 圆形直径（px）；0 跟随 size |
| color | string | `''` | 激活色覆盖 |
| trackColor | string | `''` | 轨道色覆盖 |
| pivotText | string | `''` | 自定义文案；空则 percent% |
| customClass | string | `''` | 根节点扩展 class |



## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义信息区（需 useSlot） |
