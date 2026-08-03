---
demo: text
---

# nax-text

uni-app x 文本组件。

## 安装

```text
uni_modules/nax-text
```

easycom 自动生效，页面直接使用 `<nax-text />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

> 当前版本：0.1.12（见 `changelog.md`）

## 代码示例

### 基础用法

```uvue
<nax-text text="这是多行输入啊"></nax-text>
<nax-text type="primary" text="主题色"></nax-text>
<nax-text mode="price" text="128.5" type="error"></nax-text>
<nax-text mode="phone" format="encrypt" text="130xxxxxxxx"></nax-text>
<nax-text :lines="2" text="超出两行显示省略号……"></nax-text>
```


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | string | `'default'` | default \| primary \| info \| success \| warning \| error \| secondary \| placeholder（兼容 main/content/tips/light/danger） |
| show | boolean | `true` | 是否显示 |
| text | string | `''` | 显示文案 |
| prefixIcon | string | `''` | 前置 nax-icon 名 |
| suffixIcon | string | `''` | 后置 nax-icon 名 |
| mode | string | `'text'` | text \| price \| phone \| name \| date \| link |
| href | string | `''` | mode=link 时的链接 |
| format | string | `''` | 格式化：phone/name 传 encrypt；date 传时间格式（默认 yyyy-mm-dd） |
| call | boolean | `false` | mode=phone 时点击是否拨号 |
| bold | boolean | `false` | 是否加粗 |
| block | boolean | `false` | 是否块级 |
| lines | number | `0` | 最大行数，>0 时超出省略；0 不限制 |
| color | string | `''` | 自定义文字色（优先于 type） |
| size | string | `'md'` | sm(14) \| md(16 默认) \| lg(18) \| xl(20) \| 数字字符串（px） |
| decoration | string | `'none'` | none \| underline \| line-through |
| align | string | `'left'` | left \| center \| right |
| lineHeight | string | `''` | 行高，如 22 或 22px |
| selectable | boolean | `false` | 是否可选中复制 |
| iconSize | string | `''` | 图标尺寸；默认跟随字号 |
| iconColor | string | `''` | 图标颜色；默认跟随文字色 |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| click | 点击 |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义附加内容 |
| prefix | 自定义前置区域 |
| suffix | 自定义后置区域 |
