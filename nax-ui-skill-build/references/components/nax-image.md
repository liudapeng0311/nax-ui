# nax-image

`nax-ui` 图片组件（uni-app x / uvue）。

## 用法示例

```uvue
<nax-image
  src="https://example.com/a.jpg"
  width="120"
  height="120"
  shape="round"
></nax-image>
```

```uvue
<nax-image src="https://example.com/a.jpg" width="160" height="120">
  <template #loading>
    <text>加载中…</text>
  </template>
  <template #error>
    <text>图片走丢了</text>
  </template>
</nax-image>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| src | string | `''` | 图片地址 |
| mode | string | `aspectFill` | 同原生 image mode |
| width | string | `100%` | 宽度；纯数字按 px |
| height | string | `200` | 高度；纯数字按 px |
| shape | string | `square` | `square` / `round` / `circle` |
| lazyLoad | boolean | `false` | 懒加载 |
| fadeShow | boolean | `true` | 加载完成淡入（按端支持） |
| webp | boolean | `false` | 是否解析 webp（按端支持） |
| draggable | boolean | `true` | 是否可拖拽（Web） |
| showMenuByLongpress | boolean | `false` | 长按菜单（小程序） |
| showLoading | boolean | `true` | 展示加载占位 |
| showError | boolean | `true` | 展示失败占位 |
| loadingText | string | `''` | 加载文案 |
| errorText | string | `加载失败` | 失败文案 |
| customClass | string | `''` | 根节点扩展 class |

## Events

| 事件 | 说明 |
|---|---|
| load | 加载成功（透传原生事件） |
| error | 加载失败（透传原生事件） |
| click | 点击 |

## Slots

| 插槽 | 说明 |
|---|---|
| default | 覆盖在图片上的内容 |
| loading | 自定义加载占位 |
| error | 自定义失败占位 |
