## 0.1.5（2026-08-07）
- 兼容性声明：补充 iOS（`APP-IOS`）端支持，package.json 平台标记同步为 `√`
## 0.1.4（2026-08-01）
- package：安装依赖增加 nax-ui-theme（运行时仍弱依赖 + fallback）
## 0.1.3（2026-07-16）

- 修复微信小程序：自定义 swiper-item 时 display-multiple-items 大于 item 数量
- list / slot 分模式渲染；list 支持 { bg, text } 色块文案项（小程序推荐）
- 自定义默认插槽时请传 itemCount，用于钳制 display-multiple-items

## 0.1.2（2026-07-16）

- 修复微信小程序：display-multiple-items 不能大于 swiper-item 数量
- 新增 itemCount

## 0.1.1（2026-07-16）

- 修复微信小程序：移除 v-for 内 item 具名插槽

## 0.1.0（2026-07-16）

- 初版 nax-swiper（uvue）