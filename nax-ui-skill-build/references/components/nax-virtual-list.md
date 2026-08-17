# nax-virtual-list

固定行高**虚拟列表**。使用 `scroll-view` + 上下 spacer，只渲染可视区与缓冲行，适合一次性持有大量数据。

## 用法示例

```uvue
<nax-virtual-list
  height="480px"
  :list="list"
  :item-height="56"
  :buffer="8"
  key-field="id"
>
  <template #default="{ item, index }">
    <nax-cell :title="item.title" :value="'' + (index + 1)" is-link></nax-cell>
  </template>
</nax-virtual-list>
```

```uvue
<nax-virtual-list
  height="480px"
  :list="list"
  :item-height="48"
  :loading="loading"
  :finished="finished"
  @load="onLoad"
>
  <template #default="{ item, index }">
    <nax-cell :title="item.title"></nax-cell>
  </template>
</nax-virtual-list>
```

## Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| list | array | `[]` | 完整数据源 |
| item-height | number | `48` | 行高 **px**（固定等高） |
| buffer | number | `6` | 上下缓冲行；鸿蒙不足 12 时抬到 12 |
| key-field | string | `''` | 数据项业务 id（行 DOM 使用窗口位置 key） |
| height | string | `''` | 滚动区高度；空则 `flex:1` |
| show-scrollbar | boolean | `true` | 滚动条 |
| nested-scroll | boolean | `false` | Android 端嵌套滚动：VDOM 外层需启用 `type="nested"` 并包裹 `nested-scroll-body`；蒸汽模式只需此属性；其它端无影响 |
| loading / finished / error / empty | boolean | `false` | 底栏 / 空态（受控） |
| disabled | boolean | `false` | 禁用触底 load |
| offset | number | `80` | 触底阈值 px |
| enable-refresh | boolean | `false` | 下拉刷新 |
| refreshing | boolean | `false` | 刷新中（受控） |
| loading-text / finished-text / error-text / empty-text / empty-icon | string | 中文默认 | 文案 |
| custom-class | string | `''` | 根 class |
| item-class | string | `''` | 行容器 class |

## Events

| 事件 | 说明 |
|---|---|
| load | 触底需要加载更多 |
| refresh | 下拉刷新 |
| update:refreshing | 刷新态同步 |
| click-error | 点击错误区（随后仍发 load） |
| click | 点击行 `{ index, item }` |
| visible-change | 可视窗口 `{ start, end }`（半开区间 end） |
| scroll | 滚动 `{ scrollTop, start, end }` |

## Slots

| 名称 | 说明 |
|---|---|
| default | 作用域 `{ item, index }`；未传时用 title/label/name/text 或 `#index` 兜底 |
| header / footer | 顶 / 底 |
| empty / loading / finished / error | 状态覆盖 |

## Methods（ref 调用）

| 方法 | 说明 |
|---|---|
| scrollToIndex(index, animated?) | 滚到索引（尽量置顶） |
| scrollToOffset(offsetY, animated?) | 滚到 px 偏移 |
| getVisibleRange() | `{ start, end, scrollTop }` |
| tryLoad() | canLoad 时发 load |

## 依赖

- `nax-empty`
- `nax-loading`
- `nax-ui-theme`（可选 token）
