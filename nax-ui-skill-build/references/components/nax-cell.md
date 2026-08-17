# nax-cell

单元格与单元格组。

## 用法示例

```uvue
<nax-cell-group title="设置">
  <nax-cell title="个人资料" is-link @click="onProfile"></nax-cell>
  <nax-cell icon="settings" title="系统设置" value="已开启" is-link></nax-cell>
  <nax-cell title="昵称" label="用于展示" value="Nax"></nax-cell>
</nax-cell-group>

<nax-cell-group title="卡片样式" inset>
  <nax-cell title="消息通知" is-link></nax-cell>
  <nax-cell title="隐私" is-link></nax-cell>
</nax-cell-group>

<!-- inset 外框：none 无边框 / horizontal 仅上下 / vertical 仅左右 -->
<nax-cell-group title="无左右边框" inset inset-border="horizontal">
  <nax-cell title="仅上下描边" is-link></nax-cell>
</nax-cell-group>
```

## Props — nax-cell Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| title | string | `''` | 左侧标题 |
| label | string | `''` | 标题下方说明 |
| value | string | `''` | 右侧内容 |
| icon | string | `''` | 左侧 `nax-icon` 名 |
| is-link | boolean | `false` | 展示右侧箭头 |
| arrow | boolean | `false` | 同 `is-link`（兼容） |
| border | boolean | `true` | 底部分割线；组内受 group.border 控制 |
| disabled | boolean | `false` | 禁用 |
| required | boolean | `false` | 标题旁必填星号 |
| center | boolean | `false` | 垂直居中 |
| clickable | boolean | `false` | 无箭头时也显示按压态 |
| size | string | `md` | `sm` / `md` / `lg` |
| icon-color | string | `''` | 左侧图标色 |
| title-color | string | `''` | 标题色 |
| value-color | string | `''` | 右侧值颜色 |
| custom-class | string | `''` | 根节点扩展 class |

## Props — nax-cell-group Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| title | string | `''` | 分组标题 |
| inset | boolean | `false` | 圆角卡片内嵌 |
| insetBorder | string | `all` | inset 外框：`all` / `none` / `horizontal` / `vertical` |
| border | boolean | `true` | 子 cell 底部分割线 |
| custom-class | string | `''` | 根节点扩展 class |

## Events

| 事件 | 说明 |
|---|---|
| click | 点击（`disabled` 不触发） |

## Slots — nax-cell 插槽

| 名称 | 说明 |
|---|---|
| icon | 自定义左侧图标 |
| title | 自定义标题 |
| label | 自定义说明 |
| value | 自定义右侧值 |
| right | 右侧扩展（如 switch） |
| right-icon | 右侧图标区 |
| default | 标题区额外内容 |

## Slots — nax-cell-group 插槽

| 名称 | 说明 |
|---|---|
| default | 放置 `nax-cell` |
| title | 自定义分组标题 |

## 依赖

- `nax-icon`
- `nax-ui-theme`（可选，提供 `--nax-*` token）
