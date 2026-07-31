## 0.1.6（2026-07-31）
- 修复暗黑模式下加载、失败与空图片占位文字因浅色背景与亮色文字叠加而不可见的问题
- Web、Android、iOS 与小程序端的占位背景改为跟随 `--nax-color-bg-secondary`，文字跟随 `--nax-color-text-secondary`
- 鸿蒙端通过 `APP-HARMONY` 显式解析暗色主题背景、文字与图标 token，变量不可用时回退到可读的浅色组合；默认图标尺寸保持 20px
## 0.1.5（2026-07-17）
- 新增 forceLoading：强制展示加载占位（demo/预览）
- demo「加载占位」改为 force-loading，避免真实图加载成功后盖住图标

## 0.1.4（2026-07-17）
- 新增 timeout：超时未 load 则进入失败态（缓解鸿蒙等端无效域名 DNS 久等）

## 0.1.3（2026-07-17）
- 加载中占位改用 nax-icon `image`，失败占位改用 `image-off`
- 移除 loading 旋转动画（静态图片占位）

## 0.1.2（2026-07-16）

- package：安装依赖增加 nax-ui-theme（运行时仍弱依赖 + fallback）

## 0.1.1（2026-07-16）

- 修复鸿蒙：加载失败 / 空图 / 自定义失败插槽背景不显示
- 状态层使用 width/height:100% + 内联 background-color 兜底
- 去掉嵌套 CSS 变量写法（蒸汽模式兼容）

## 0.1.0（2026-07-16）

- 初版 nax-image（uvue）
- 原生 image 封装：mode / lazyLoad / 尺寸 / shape
- 加载中占位（默认 loading 旋转图标；App 端定时 transform 兜底）
- 加载失败 / 空 src 占位（error 图标 + 文案）
- loading / error 插槽可覆盖默认占位
