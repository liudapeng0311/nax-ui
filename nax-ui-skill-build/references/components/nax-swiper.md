# nax-swiper

`nax-ui` 轮播组件（uni-app x / uvue）。

## 用法示例

```uvue
<nax-swiper :list="banners" height="180" indicator></nax-swiper>
```

```uvue
<nax-swiper
  :list="banners"
  autoplay
  :interval="3000"
  circular
  height="180"
></nax-swiper>
```

## Props — Props

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| list | array | `[]` | 图片 url，或含 `src`/`image`/`url`/`text`/`bg` 的对象 |
| current | number | `0` | 当前页（可用 `v-model:current`） |
| height | string | `160` | 高度；纯数字按 px |
| autoplay | boolean | `false` | 自动播放 |
| interval | number | `3000` | 自动切换间隔 ms |
| duration | number | `500` | 动画时长 ms |
| circular | boolean | `true` | 循环衔接 |
| vertical | boolean | `false` | 纵向 |
| indicator | boolean | `true` | 显示指示器 |
| indicatorType | string | `dot` | `dot` / `number` |
| indicatorColor | string | `''` | 指示点颜色（dot） |
| indicatorActiveColor | string | `''` | 当前指示点颜色（dot） |
| indicatorPosition | string | `bottom` | number 指示器位置 |
| imageMode | string | `aspectFill` | image mode |
| previousMargin | string | `0px` | 前边距 |
| nextMargin | string | `0px` | 后边距 |
| displayMultipleItems | number | `1` | 同时显示滑块数（会按 item 数钳制） |
| itemCount | number | `0` | 自定义 `swiper-item` 数量（`list` 为空时建议必传） |
| disableTouch | boolean | `false` | 禁止手势 |
| radius | boolean | `true` | 圆角 |
| customClass | string | `''` | 根节点扩展 class |

## Props — list 项

| 字段 | 类型 | 说明 |
|---|---|---|
| src / image / url | string | 图片地址，优先级 `src` > `image` > `url`；字符串元素等价于传 `src` |
| bg / background | string | 背景色，优先级 `bg` > `background`；无图片时配合 `text` 渲染色块文案 |
| text / title | string | 文案，优先级 `text` > `title`；可叠加在图片上，或配合 `bg` 组成色块项 |

## Events

| 事件 | 说明 |
|---|---|
| change | 页码变化，参数 `current` |
| update:current | 同步 `v-model:current` |
| animationfinish | 动画结束，参数 `current` |
| click | 点击某一项，参数 `index`（list 模式） |

## Slots

| 插槽 | 说明 |
|---|---|
| default | 自定义 `swiper-item`（`list` 为空时；小程序请传 `itemCount`） |
