## 0.1.8（2026-08-14）
- readme 新增“list 项”字段说明表（src/image/url、text/title、bg/background 及优先级）
## 0.1.7（2026-08-12）
- readme 移除底部重复的“主题 Token”小节，统一收敛到“通过 CSS 变量覆盖”主题表
## 0.1.6（2026-08-11）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
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