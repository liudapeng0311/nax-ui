---
demo: alert
---

# nax-alert

> 当前版本：0.1.3（见 `changelog.md`）

警告提示条（页面内常驻提示）。提供常用能力。

## 安装

```text
uni_modules/nax-alert
```

easycom 自动生效，页面直接使用 `<nax-alert />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 用法

```uvue
<nax-alert title="温馨提示" description="请先完成实名认证后再操作。"></nax-alert>

<nax-alert type="success" title="提交成功" description="我们已收到你的申请。"></nax-alert>

<nax-alert
  type="error"
  closable
  :show="alertShow"
  title="账号异常"
  description="检测到异地登录，请修改密码。"
  @close="onClose"
  @update:show="onShowChange"
></nax-alert>
```

### 事件

| 事件 | 说明 |
|------|------|
| click | 点击主体 |
| close | 点击关闭 |
| update:show | 显示状态变化（关闭时为 `false`） |

### 主题 Token

使用 `nax-ui-theme` 语义色：`--nax-color-primary` / `info` / `success` / `warning` / `error` 及对应 `*-secondary` 浅底。


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | string | `'warning'` | primary \| info \| success \| warning \| error（兼容 danger）；默认 warning |
| variant | string | `'light'` | light \| solid；兼容 effect(light/dark)；默认 light |
| effect | string | `''` | 兼容 ：light / dark（等价 solid） |
| title | string | `''` | 标题 |
| description | string | `''` | 描述；也可用默认插槽 |
| closable | boolean | `false` | 是否可关闭 |
| showIcon | boolean | `true` | 是否显示左侧图标，默认 true |
| icon | string | `''` | 自定义 nax-icon 名；空则按 type 映射 |
| center | boolean | `false` | 内容是否水平居中 |
| show | boolean | `true` | 是否显示；配合 update:show |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| click | 点击主体 |
| close | 关闭 |
| update:show | 显示状态变化 |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义描述内容 |
| title | 自定义标题 |
| icon | 自定义左侧图标 |
