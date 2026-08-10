---
demo: empty
---

# nax-empty

> 当前版本：0.1.2（见 `changelog.md`）

空状态占位。用于列表无数据、搜索无结果、加载失败等场景。

## 安装

```text
uni_modules/nax-empty
```

easycom 自动生效，页面直接使用 `<nax-empty />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 用法

```uvue
<!-- 基础 -->
<nax-empty></nax-empty>

<!-- 自定义文案 + 操作 -->
<nax-empty title="暂无订单" description="去逛逛，下单后会出现在这里">
  <template #action>
    <nax-button type="primary" size="sm" label="去首页" @click="goHome"></nax-button>
  </template>
</nax-empty>

<!-- 图标语义 -->
<nax-empty icon="file-off" description="暂无相关文件"></nax-empty>
<nax-empty icon="message-off" description="消息箱是空的"></nax-empty>

<!-- 自定义图片 -->
<nax-empty image="/static/empty.png" description="网络异常"></nax-empty>
```


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | boolean | `true` | 是否显示，默认 true |
| title | string | `''` | 主标题（可选） |
| description | string | `'暂无数据'` | 描述文案，默认「暂无数据」 |
| image | string | `''` | 插图地址；有值时优先于 icon |
| imageSize | string | `'120'` | 插图边长；纯数字按 px，或 sm/md/lg；默认 120 |
| imageMode | string | `'aspectFit'` | 图片 mode，默认 aspectFit |
| icon | string | `''` | 无图时的 nax-icon 名；空则 database-off（暂无数据） |
| iconSize | string | `'48'` | 图标尺寸；纯数字 px 或 sm/md/lg；默认 48 |
| iconColor | string | `''` | 图标颜色 |
| showImage | boolean | `true` | 是否展示插图区，默认 true |
| customClass | string | `''` | 根节点扩展 class |



## Slots

| 插槽 | 说明 |
|------|------|
| image | 自定义插图 |
| title | 自定义标题 |
| description | 自定义描述 |
| action | 操作区（按钮等） |
| default | 额外内容 |
