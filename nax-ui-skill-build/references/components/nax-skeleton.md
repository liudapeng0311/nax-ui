# nax-skeleton

骨架屏。请求完成前用灰色块模拟页面结构，降低白屏感。

## 用法示例

```uvue
<!-- 基础：标题 + 3 行段落 -->
<nax-skeleton></nax-skeleton>

<!-- 列表信息流：头像 + 标题 + 段落，重复 3 条 -->
<nax-skeleton :loading="loading" avatar :rows="2" :count="3">
  <view v-for="item in list" :key="item.id">
    <text>{{ item.title }}</text>
  </view>
</nax-skeleton>

<!-- 自定义每行宽度（逗号分隔） -->
<nax-skeleton :rows="3" rows-width="100%,90%,55%"></nax-skeleton>

<!-- 自定义骨架结构 -->
<nax-skeleton :loading="loading">
  <template #skeleton>
    <view class="card-sk">
      <view class="cover" style="height:120px;background:var(--nax-color-skeleton,#f2f3f5)"></view>
    </view>
  </template>
  <view>真实内容</view>
</nax-skeleton>
```

## Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| loading | boolean | `true` | 为 true 显示骨架；false 显示默认插槽 |
| animate | boolean | `true` | 是否开启动画（Web/小程序 CSS；App 透明度脉冲） |
| title | boolean | `true` | 是否显示标题行 |
| avatar | boolean | `false` | 是否显示头像占位 |
| avatar-size | string | `32` | 头像边长；纯数字按 px，也可 `rpx`/`%` |
| avatar-shape | string | `circle` | `circle` / `square` |
| rows | number | `3` | 段落行数；0 不显示段落 |
| title-width | string | `40%` | 标题宽度 |
| title-height | string | `16` | 标题高度（px 或带单位） |
| rows-width | string | `''` | 段落宽度；单值或逗号分隔；空则末行约 60% |
| rows-height | string | `16` | 段落高度；单值或逗号分隔 |
| count | number | `1` | 骨架条目重复次数（列表页） |
| gap | string | `16` | 多条目间距（px 或带单位） |
| custom-class | string | `''` | 根节点扩展 class |

## Slots

| 名称 | 说明 |
|---|---|
| default | `loading=false` 时展示的真实内容 |
| skeleton | 自定义骨架结构（覆盖默认头像/标题/段落） |

## 依赖

- `nax-ui-theme`（可选；未接入时用字面量 fallback）
