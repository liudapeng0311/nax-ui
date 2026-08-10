---
demo: text
---

# nax-text

> 当前版本：0.1.14（见 `changelog.md`）

uni-app x 文本组件。

## 安装

- 插件市场：[nax-text](https://ext.dcloud.net.cn/plugin?id=29072)

easycom 自动生效，页面直接使用 `<nax-text />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

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
| type | string | `'default'` | `default` 默认 \| `primary` 主题色 \| `info` 信息 \| `success` 成功 \| `warning` 警告 \| `error` 错误 \| `secondary` 次要 \| `placeholder` 占位 |
| show | boolean | `true` | 是否显示 |
| text | string | `''` | 显示文案 |
| prefixIcon | string | `''` | 前置 nax-icon 名 |
| suffixIcon | string | `''` | 后置 nax-icon 名 |
| mode | string | `'text'` | 模式：`text` 文本 \| `price` 价格 \| `phone` 手机号 \| `name` 姓名 \| `date` 日期 \| `link` 链接 |
| href | string | `''` | mode=link 时的链接 |
| format | string | `''` | 格式化：phone/name 传 encrypt；date 传时间格式（默认 yyyy-mm-dd） |
| call | boolean | `false` | mode=phone 时点击是否拨号 |
| bold | boolean | `false` | 是否加粗 |
| block | boolean | `false` | 是否块级 |
| lines | number | `0` | 最大行数，>0 时超出省略；0 不限制 |
| color | string | `''` | 自定义文字色（优先于 type） |
| size | string | `'md'` | 字号：`sm`(14) \| `md`(16 默认) \| `lg`(18) \| `xl`(20) \| 数字字符串（px） |
| decoration | string | `'none'` | 装饰：`none` 无 \| `underline` 下划线 \| `line-through` 删除线 |
| align | string | `'left'` | 对齐：`left` 左对齐（默认）\| `center` 居中 \| `right` 右对齐 |
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
