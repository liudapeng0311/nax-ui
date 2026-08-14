# nax-card

内容卡片。标题 / 额外区 / 封面 / 页脚，主题 token 背景与边框。

## 用法

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

## Props

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| title | string | `''` | 标题 |
| extra | string | `''` | 右侧额外文案 |
| bordered | boolean | `true` | 边框 |
| hoverable | boolean | `false` | 按压反馈 |
| size | string | `md` | `sm` / `md` / `lg` |
| segmented | boolean | `false` | 页头/页脚分割线 |
| show-cover | boolean | `false` | 启用封面插槽区域 |
| show-footer | boolean | `false` | 启用页脚插槽区域 |
| show-header | boolean | `false` | 无 title/extra 时仍显示页头（配合 header 插槽） |
| custom-class | string | `''` | 根节点扩展 class |

## 事件

| 事件 | 说明 |
|------|------|
| click | 点击卡片 |

## 插槽

| 名称 | 说明 |
|------|------|
| default | 正文 |
| header | 整块自定义页头 |
| title | 自定义标题 |
| extra | 自定义右侧 |
| cover | 封面（需 `show-cover`） |
| footer | 页脚（需 `show-footer`） |

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 背景色 |
| `--nax-color-bg-hover` | 按压/悬停背景色 |
| `--nax-color-border` | 边框色 |
| `--nax-color-divider` | 分割线色 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-text-secondary` | 次要文字色 |


## 依赖

- `nax-ui-theme`（可选）
