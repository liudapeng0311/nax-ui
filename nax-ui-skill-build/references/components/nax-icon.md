# nax-icon

`nax-ui` 字体图标组件（uni-app x / uvue）。

## 支持的图标名

```text
close, check, plus, minus
arrow-left, arrow-right, arrow-up, arrow-down
chevron-left, chevron-right, chevron-up, chevron-down
search, loading, info, warning, success, error
user, home, more, edit, delete, star, heart
settings, eye, eye-off, copy, share, image, image-off, loader, loader-4, square, circle, square-check,
file-off, notes-off, database-off, message-off,
category, category-filled, map-pin, map-pin-filled
```

> 仅以上图标可用；不要使用列表中不存在的图标名，否则渲染为空白。

## 用法示例

```uvue
<nax-icon name="search"></nax-icon>
<nax-icon name="close" size="sm" color="#999999"></nax-icon>
<nax-icon name="arrow-right" size="20" @click="onTap"></nax-icon>
```

```uvue
<nax-button type="primary" icon="search" label="搜索"></nax-button>

<nax-button type="primary" label="搜索">
  <template #icon>
    <nax-icon name="search" size="sm" color="#ffffff"></nax-icon>
  </template>
</nax-button>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| name | string | `''` | 图标名（必填），可选值见“当前支持的图标”，如 close / search / arrow-right |
| size | string | `md` | 尺寸：`sm`（小）/ `md`（中）/ `lg`（大），或数字字符串像素值（如 20 表示 20px） |
| color | string | `''` | 可选颜色；空则走 CSS 变量 |
| disabled | boolean | `false` | 禁用点击 |
| customClass | string | `''` | 根节点扩展类名（class），用于自定义样式 |

## Events

| 事件 | 说明 |
|---|---|
| click | 点击触发；`disabled` 时不触发 |
