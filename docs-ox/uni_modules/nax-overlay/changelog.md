## 0.1.3（2026-08-14）
- 精简 readme：移除内部开发向内容（设计说明 / 实现细节 / 平台差异实现等），只保留安装、用法、API、主题等用户文档
## 0.1.2（2026-08-11）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.1（2026-08-07）
- 支持 iOS 端：走 `#ifndef APP-HARMONY` 公共分支（class + opacity 过渡），无需额外端差异代码
## 0.1.0（2026-07-31）
- 初版 `nax-overlay` 全屏遮罩
- `show` / `v-model:show`、`zIndex`、`duration`、`color`、`closeOnClick`
- 默认插槽叠内容；`click` / `open` / `opened` / `close`
- 鸿蒙 opacity 三阶段淡入淡出；其它端 class + opacity 过渡
