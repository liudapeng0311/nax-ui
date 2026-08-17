# nax-list

滚动列表壳。负责内部滚动触底加载、下拉刷新与空 / 加载 / 结束 / 错误状态；**行内容由业务在默认插槽自行 `v-for`**（可配合 `nax-cell`）。

## 用法示例

```uvue
<nax-list
  height="400px"
  :loading="loading"
  :finished="finished"
  :error="error"
  :empty="list.length == 0 && !loading && loaded"
  @load="onLoad"
>
  <nax-cell
    v-for="item in list"
    :key="item.id"
    :title="item.title"
    is-link
  ></nax-cell>
</nax-list>
```

```uvue
<nax-list
  height="400px"
  :enable-refresh="true"
  :refreshing="refreshing"
  :loading="loading"
  :finished="finished"
  @refresh="onRefresh"
  @update:refreshing="(v: boolean) => { refreshing = v }"
  @load="onLoad"
>
  <!-- items -->
</nax-list>
```

## Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| loading | boolean | `false` | 加载更多中（受控） |
| finished | boolean | `false` | 没有更多 |
| error | boolean | `false` | 加载失败；点底栏重试会再发 `load` |
| empty | boolean | `false` | 空列表；展示空态并隐藏底栏。**建议首屏请求结束后再设 true** |
| disabled | boolean | `false` | 禁用触底加载 |
| immediate-check | boolean | `true` | 挂载 / 加载结束后检查是否需继续 load |
| offset | number | `50` | 距底触发距离（px），映射 `lower-threshold` |
| height | string | `''` | 内部滚动高度；空则 `flex:1` 由父级撑开 |
| use-page-scroll | boolean | `false` | 不包 `scroll-view`，配合页面滚动 + `check()` |
| show-scrollbar | boolean | `true` | 是否显示滚动条 |
| enable-refresh | boolean | `false` | 启用下拉刷新（**仅内部 scroll-view**） |
| refreshing | boolean | `false` | 刷新中（受控，映射 `refresher-triggered`） |
| refresher-threshold | number | `45` | 下拉触发阈值（px） |
| refresher-background | string | `transparent` | 刷新区背景色 |
| refresher-default-style | string | `black` | `black` / `white` / `none` |
| loading-text | string | `加载中...` |  |
| finished-text | string | `没有更多了` |  |
| error-text | string | `加载失败，点击重试` |  |
| empty-text | string | `暂无数据` | 默认空态描述 |
| empty-icon | string | `notes-off` | 默认空态图标 |
| custom-class | string | `''` | 根节点扩展 class |

## Events

| 事件 | 说明 |
|---|---|
| load | 需要加载更多（触底 / immediateCheck / 错误重试） |
| refresh | 下拉刷新触发（业务重拉第一页） |
| update:refreshing | 刷新态同步；可与 `refreshing` 组成 `v-model:refreshing` |
| click-error | 点击错误区（随后仍会发 `load`） |

## Slots

| 名称 | 说明 |
|---|---|
| default | 列表内容 |
| header | 顶部区（随列表滚动） |
| footer | 完全自定义底部（覆盖默认状态） |
| empty | 自定义空态 |
| loading / finished / error | 覆盖对应默认状态 UI |

## Methods（ref 调用）

| 方法 | 说明 |
|---|---|
| check() | 手动检查是否需 load（页面滚动触底时调用） |
| tryLoad() | 在 canLoad 时直接发 `load` |

## 依赖

- `nax-empty`
- `nax-loading`
- `nax-ui-theme`（可选）
