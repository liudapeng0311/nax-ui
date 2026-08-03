---
demo: tag
---

# nax-tag

标签。提供常用能力。

## 安装

```text
uni_modules/nax-tag
```

easycom 自动生效，页面直接使用 `<nax-tag />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

> 当前版本：0.1.2（见 `changelog.md`）

## 代码示例

### 用法

```uvue
<nax-tag label="标签"></nax-tag>
<nax-tag type="success" label="成功"></nax-tag>
<nax-tag type="error" closable label="可关闭" @close="onClose"></nax-tag>
<nax-tag checkable :checked="checked" @update:checked="onChecked">可选</nax-tag>
```

### 事件

| 事件 | 说明 |
|------|------|
| click | 点击（`disabled` 不触发） |
| close | 关闭（关闭后组件隐藏） |
| update:checked | 选中态变化（`checkable`） |

### 主题 Token

使用 `nax-ui-theme` 语义色：`--nax-color-primary` / `info` / `success` / `warning` / `error` 及对应 `*-secondary` 浅底。


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | string | `'default'` | default \| primary \| info \| success \| warning \| error（兼容 danger） |
| variant | string | `'light'` | solid \| light(secondary) \| outline \| text(quaternary)；默认 light（对齐  浅底） |
| size | string | `'md'` | sm \| md \| lg；兼容 tiny/small/medium/large（） |
| closable | boolean | `false` | 是否可关闭 |
| disabled | boolean | `false` | 禁用 |
| round | boolean | `false` | 圆角胶囊 |
| bordered | boolean | `true` | 是否显示边框，默认 true |
| checkable | boolean | `false` | 可选中模式 |
| checked | boolean | `false` | 选中态（配合 checkable / update:checked） |
| strong | boolean | `false` | 加粗文字 |
| triggerClickOnClose | boolean | `true` | 点关闭时是否同时触发 click，默认 true（对齐 ） |
| label | string | `''` | 文案；也可用默认插槽 |
| icon | string | `''` | 前缀 nax-icon 名 |
| color | string | `''` | 自定义主色（覆盖 type 色） |
| textColor | string | `''` | 自定义文字色 |
| borderColor | string | `''` | 自定义边框色 |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| click | 点击（disabled 不触发；关闭区见 triggerClickOnClose） |
| close | 关闭 |
| update:checked | 选中态变化（checkable） |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义内容 |
| icon | 自定义前缀图标区域 |
