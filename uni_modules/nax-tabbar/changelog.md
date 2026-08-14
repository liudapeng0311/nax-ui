## 0.1.9（2026-08-14）
- 精简 readme：移除内部开发向内容（设计说明 / 实现细节 / 平台差异实现等），只保留安装、用法、API、主题等用户文档
## 0.1.8（2026-08-11）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.7（2026-08-07）
- 兼容性声明：补充 iOS（`APP-IOS`）端支持；安全区/固定定位等 App 端分支已含 iOS，package.json 平台标记同步为 `√`
## 0.1.6（2026-08-01）
- 修复暗黑模式下字体图标仍使用浅色主题固定色，导致激活图标与文字颜色不一致
- 图标默认激活色与未激活色改为跟随 `--nax-color-primary`、`--nax-color-text-secondary`；显式 `activeColor` / `inactiveColor` 行为不变
## 0.1.5（2026-07-23）

- 文档：补充多页自定义底栏推荐路由（原生 tabBar + `switchTab` + `hideTabBar`），见仓库 `docs/tabbar-routing.md`
- readme：强调勿对主 Tab 页默认 `reLaunch`

## 0.1.4（2026-07-21）

- 修复鸿蒙/App 底部安全区未抬高内容：独立 `nax-tabbar__safe` 占位；`APP-HARMONY` 下 window/systemInfo 双兜底 + 首帧延迟重测

## 0.1.3（2026-07-21）

- 角标/红点不再使用负 top，避免超出底栏顶边框；无凸起时裁剪越界

## 0.1.2（2026-07-21）

- 中间凸起时顶边框改画在底栏背景层：不再穿过凸起空区；圆钮白描边压住中段边线，形成贴合凸起的弧线观感

## 0.1.1（2026-07-21）

- 修复 midButton 中间凸起被固定栏高裁切：预留顶部高度 + 栏内上浮，去掉负 margin 溢出

## 0.1.0（2026-07-21）

- 初版 `nax-tabbar`
- 支持字体图标 / 图片图标、徽标 / 红点、禁用、中间凸起钮
- `v-model` 选中下标；`fixed` + 占位 + 底部安全区（App `getWindowInfo` / Web·小程序 CSS env）
- 事件：`change` / `click`（重复点击同一项仍触发 click）
