---
demo: card
---

# nax-card

> 当前版本：0.1.1（见 `changelog.md`）

内容卡片。标题 / 额外区 / 封面 / 页脚，主题 token 背景与边框。

## 安装

```text
uni_modules/nax-card
```

easycom 自动生效，页面直接使用 `<nax-card />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 用法

```uvue
<nax-card title="标题" extra="更多">
  <text>正文内容</text>
</nax-card>

<nax-card title="带页脚" :show-footer="true" segmented>
  <text>正文</text>
  <template #footer>
    <nax-button size="sm" label="操作"></nax-button>
  </template>
</nax-card>
```

### 事件

| 事件 | 说明 |
|------|------|
| click | 点击卡片 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | `''` | 标题 |
| extra | string | `''` | 右侧额外文案 |
| bordered | boolean | `true` | 是否显示边框，默认 true |
| hoverable | boolean | `false` | 是否开启按压反馈 |
| size | string | `'md'` | sm \| md \| lg；内边距档位，默认 md |
| segmented | boolean | `false` | 页头/页脚与正文间是否画分割线，默认 false |
| // 显式控制区段：有具名插槽时调用方传 true 开启（uvue 不便可靠探测插槽）
		showCover | boolean | `false` |  |
| showFooter | boolean | `false` |  |
| // 无 title/extra 时仍显示默认页头结构（仅当用了 title/extra 插槽）
		showHeader | boolean | `false` |  |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| click | 点击卡片 |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 正文 |
| header | 自定义整块页头（覆盖 title/extra） |
| title | 自定义标题 |
| extra | 自定义右侧区 |
| cover | 封面（页头上方） |
| footer | 页脚 |
