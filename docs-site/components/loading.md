---
demo: loading
---

# nax-loading

> 当前版本：0.1.4（见 `changelog.md`）

局部 / 区块加载指示。App 端定时 `transform` 旋转；Web / 小程序用 CSS `@keyframes`。

## 安装

```text
uni_modules/nax-loading
```

easycom 自动生效，页面直接使用 `<nax-loading />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 用法

```uvue
<nax-loading></nax-loading>
<nax-loading text="加载中"></nax-loading>
<nax-loading icon="loader" text="加载中"></nax-loading>
<nax-loading icon="loader-4" vertical text="请稍候" size="lg" type="primary"></nax-loading>
<nax-loading :show="pending" text="提交中"></nax-loading>
```

### 平台动画

| 端 | 实现 |
|------|------|
| 鸿蒙 App | 原生 `element.animate` 无限旋转；失败时 `setProperty` 低频兜底 |
| Android / iOS App | 定时 `transform`（uvue 不支持 `@keyframes`） |
| Web / 小程序 | CSS `@keyframes` |

### 说明

1. 全局面板式 Loading（遮罩 + 命令式 API）后续可对齐 `nax-toast` 宿主模式扩展。
2. 按钮内加载请继续用 `nax-button` 的 `loading`。


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | boolean | `true` | 是否显示，默认 true |
| size | string | `'md'` | sm \| md \| lg |
| text | string | `''` | 文案；也可用默认插槽 |
| vertical | boolean | `false` | 纵向：图标在上、文案在下；默认 false（横向） |
| type | string | `'default'` | default \| primary \| info \| success \| warning \| error（兼容 danger） |
| color | string | `''` | 自定义颜色（覆盖 type） |
| icon | string | `'loading'` | 旋转图标：loading \| loader \| loader-4，默认 loading |
| customClass | string | `''` | 根节点扩展 class |



## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义文案区 |
| icon | 自定义图标 |
