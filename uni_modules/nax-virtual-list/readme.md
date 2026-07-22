# nax-virtual-list

固定行高**虚拟列表**。内部用 `scroll-view` + 上下 spacer，只渲染可视区与缓冲行，适合一次性持有大量数据（成百上千、上万级）的长列表。

> 与 `nax-list` 的区别：`nax-list` 是滚动壳（内容自行 `v-for`，不裁剪 DOM）；本组件接管数据源并做窗口裁剪。

## 能力

- 固定 `itemHeight` 窗口裁剪（全端一致）
- 作用域插槽自定义行：`{ item, index }`
- 触底 `load`、下拉刷新、空 / 加载 / 结束 / 错误态（对齐 `nax-list`）
- 方法：`scrollToIndex` / `scrollToOffset` / `getVisibleRange`

## 用法

### 基础（大数据）

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

```uts
const list = ref([] as UTSJSONObject[])
// 一次性生成 / 从本地读入大量数据
```

### 触底加载更多

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

### 滚动到指定行

```uts
// 模板 ref
const vlRef = ref(null)
// 调用
// vlRef.value!.scrollToIndex(500)
```

## Props

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| list | array | `[]` | 完整数据源 |
| item-height | number | `48` | 行高 **px**（固定等高） |
| buffer | number | `6` | 上下额外缓冲行 |
| key-field | string | `''` | 对象唯一键字段；空则用 index |
| height | string | `''` | 滚动区高度；空则 `flex:1` |
| show-scrollbar | boolean | `true` | 滚动条 |
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
|------|------|
| load | 触底需要加载更多 |
| refresh | 下拉刷新 |
| update:refreshing | 刷新态同步 |
| click-error | 点击错误区（随后仍发 load） |
| click | 点击行 `{ index, item }` |
| visible-change | 可视窗口 `{ start, end }`（半开区间 end） |
| scroll | 滚动 `{ scrollTop, start, end }` |

## Methods

| 方法 | 说明 |
|------|------|
| scrollToIndex(index, animated?) | 滚到索引（尽量置顶） |
| scrollToOffset(offsetY, animated?) | 滚到 px 偏移 |
| getVisibleRange() | `{ start, end, scrollTop }` |
| tryLoad() | canLoad 时发 load |

## Slots

| 名称 | 说明 |
|------|------|
| default | 作用域 `{ item, index }`；未传时用 title/label/name/text 或 `#index` 兜底 |
| header / footer | 顶 / 底 |
| empty / loading / finished / error | 状态覆盖 |

## 依赖

- `nax-empty`
- `nax-loading`
- `nax-ui-theme`（可选 token）

## 注意

1. **必须等高**：每行实际高度应等于 `item-height`，否则滚动定位会漂。
2. 必须有明确高度：`height` 或父级 flex 高度链。
3. 作用域插槽在部分端对类型较严，demo 用 `UTSJSONObject` 取字段。
4. App 端若只需系统级回收、数据量中等，也可直接用原生 `list-view`；本组件侧重**跨端窗口裁剪**与大数据 DOM 控制。
5. 不做瀑布流 / 不等高测量（后续可增强）。
