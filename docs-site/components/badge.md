---
demo: badge
---

# nax-badge

> 当前版本：0.1.3（见 `changelog.md`）

uni-app x 徽标组件，提供常用能力。

## 安装

```text
uni_modules/nax-badge
```

easycom 自动生效，页面直接使用 `<nax-badge />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 基础用法

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

### 平台说明

- **processing 动画**：Web / 小程序使用 CSS `@keyframes`；App（Android / iOS / Harmony）使用 JS 定时 `transform/opacity` 波纹（条件编译隔离，对齐 nax-button loading）。


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | string | `''` | 显示值；数字超过 max 显示 {max}+ |
| max | number | `0` | 最大值，0 表示不限制 |
| dot | boolean | `false` | 红点 |
| showZero | boolean | `false` | 值为 0 时是否展示 |
| show | boolean | `true` | 是否显示徽标 |
| processing | boolean | `false` | 处理中波纹 |
| alone | boolean | `false` | 独立展示 |
| type | string | `'default'` | default \| success \| error \| warning \| info |
| color | string | `''` | 自定义颜色 |
| offsetX | string | `''` | 水平偏移，正值向右 |
| offsetY | string | `''` | 垂直偏移，正值向下 |
| customClass | string | `''` | 根节点扩展 class |



## Slots

| 插槽 | 说明 |
|------|------|
| default | 锚定内容 |
| value | 自定义徽标内容 |
