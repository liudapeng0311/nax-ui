---
demo: virtual-list
---

# nax-virtual-list

固定行高**虚拟列表**。使用 `scroll-view` + 上下 spacer，只渲染可视区与缓冲行，适合一次性持有大量数据。鸿蒙端对窗口更新做滞后合并，`scroll`/`visible-change` 在 `scrollend` 同步。
> 与 `nax-list` 的区别：`nax-list` 是滚动壳（内容自行 `v-for`，不裁剪 DOM）；本组件接管数据源并做窗口裁剪。

## 安装

```text
uni_modules/nax-virtual-list
```

easycom 自动生效，页面直接使用 `<nax-virtual-list />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

> 当前版本：0.1.7（见 `changelog.md`）

## 代码示例

### 能力

- 固定 `itemHeight`：全端窗口裁剪；鸿蒙滞后更新 + scrollend 事件
- 作用域插槽自定义行：`{ item, index }`
- 触底 `load`、下拉刷新、空 / 加载 / 结束 / 错误态（对齐 `nax-list`）
- 方法：`scrollToIndex` / `scrollToOffset` / `getVisibleRange`

### 用法

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

### Methods

| 方法 | 说明 |
|------|------|
| scrollToIndex(index, animated?) | 滚到索引（尽量置顶） |
| scrollToOffset(offsetY, animated?) | 滚到 px 偏移 |
| getVisibleRange() | `{ start, end, scrollTop }` |
| tryLoad() | canLoad 时发 load |

### Slots

| 名称 | 说明 |
|------|------|
| default | 作用域 `{ item, index }`；未传时用 title/label/name/text 或 `#index` 兜底 |
| header / footer | 顶 / 底 |
| empty / loading / finished / error | 状态覆盖 |

### 注意

1. **必须等高**：每行实际高度应等于 `item-height`，否则滚动定位会漂。
2. 必须有明确高度：`height` 或父级 flex 高度链。
3. 作用域插槽在部分端对类型较严，demo 用 `UTSJSONObject` 取字段。
4. **鸿蒙端**使用与其它端相同的窗口裁剪（**不用**全量 `list-view` 挂载，避免进页卡死）；滚动窗口滞后更新，`scroll`/`visible-change` 在 `scrollend` 同步。
5. 不做瀑布流 / 不等高测量（后续可增强）。
6. **Web 端**使用固定总高 + `translateY` 窗口偏移，并关闭 `overflow-anchor`，避免滚动锚定导致连滚到底。
7. **Web / 微信小程序**：每次进入触底阈值只派发一次 `load`；组件按滚动区剩余距离判断是否真正离开底部，并在追加数据后恢复原 `scrollTop`，避免视口跳到新增页底部（`#ifdef WEB || MP-WEIXIN`）。
8. **微信小程序**：行节点使用窗口位置 key，避免 “More than one slot named d-N” 警告。


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| list | array | `() => [] as any[]` | 完整数据源（不切片传参；内部按滚动窗口渲染） |
| itemHeight | number | `48` | 行高 px（固定等高） |
| buffer | number | `6` | 上下额外缓冲行数，默认 6；鸿蒙不足 12 抬到 12 |
| keyField | string | `''` | 业务 id 字段；行 DOM key 使用窗口位置 |
| height | string | `''` | 滚动区高度；空则 flex:1 |
| showScrollbar | boolean | `true` | 是否显示滚动条 |
| nestedScroll | boolean | `false` | Android 端与外层 scroll-view 协商嵌套滚动 |
| loading | boolean | `false` | / finished / error / empty 底栏状态（对齐 nax-list） |
| finished | boolean | `false` |  |
| error | boolean | `false` |  |
| empty | boolean | `false` |  |
| disabled | boolean | `false` |  |
| offset | number | `80` | 触底阈值 px |
| enableRefresh | boolean | `false` | 下拉刷新 |
| refreshing | boolean | `false` | 刷新中（受控） |
| refresherThreshold | number | `45` |  |
| refresherBackground | string | `'transparent'` |  |
| refresherDefaultStyle | string | `'black'` |  |
| loadingText | string | `'加载中...'` |  |
| finishedText | string | `'没有更多了'` |  |
| errorText | string | `'加载失败，点击重试'` |  |
| emptyText | string | `'暂无数据'` |  |
| emptyIcon | string | `'notes-off'` |  |
| customClass | string | `''` | 根扩展 class |
| itemClass | string | `''` | 行容器扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| load | 触底需要加载更多 |
| refresh | 下拉刷新 |
| update:refreshing |  |
| click-error |  |
| click | 点击行，payload: { index, item } |
| visible-change | 可视窗口变化，payload: { start, end } |
| scroll | 滚动，payload: { scrollTop, start, end } |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 作用域插槽 { item, index } |
| header | / footer / empty / loading / finished / error |
