# nax-empty

空状态占位。用于列表无数据、搜索无结果、加载失败等场景。

## 用法示例

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

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| show | boolean | `true` | 是否显示 |
| title | string | `''` | 主标题 |
| description | string | `暂无数据` | 描述文案；传空字符串可隐藏 |
| image | string | `''` | 插图地址（优先于 icon） |
| image-size | string | `120` | 插图边长；数字 px 或 `sm`/`md`/`lg` |
| image-mode | string | `aspectFit` | 图片 mode |
| icon | string | `''` | 无图时图标名；默认 `database-off` |
| icon-size | string | `48` | 图标尺寸 |
| icon-color | string | `''` | 图标颜色 |
| show-image | boolean | `true` | 是否展示插图区 |
| custom-class | string | `''` | 根节点扩展 class |

## Slots

| 名称 | 说明 |
|---|---|
| image | 自定义插图 |
| title | 自定义标题 |
| description | 自定义描述 |
| action | 操作区（按钮等） |
| default | 额外内容 |

## 依赖

- `nax-icon`
- `nax-ui-theme`（可选）
