---
demo: divider
---

# nax-divider

内容分割线（可带文字）。纯线条请用 `nax-line`。

## 安装

```text
uni_modules/nax-divider
```

easycom 自动生效，页面直接使用 `<nax-divider />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

> 当前版本：0.1.1（见 `changelog.md`）

## 代码示例

### 用法

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

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| direction | string | `'horizontal'` | horizontal \| vertical；兼容 row / column |
| text | string | `''` | 中间文案；也可用默认插槽 |
| contentPosition | string | `'center'` | left \| center \| right（横线）；兼容 start/end |
| dashed | boolean | `false` | 虚线 |
| size | string | `'hairline'` | hairline \| sm \| md；线粗细，默认 hairline |
| type | string | `'default'` | default \| primary \| info \| success \| warning \| error（兼容 danger） |
| color | string | `''` | 自定义线色（覆盖 type） |
| textColor | string | `''` | 自定义文案色 |
| space | string | `''` | 外边距：横=上下，竖=左右 |
| length | string | `''` | 竖向高度（纯竖线默认 100%；与文字并排建议传如 16） |
| customClass | string | `''` | 根节点扩展 class |



## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义中间内容 |
