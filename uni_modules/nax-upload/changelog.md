## 0.1.11（2026-08-14）
- 精简 readme：移除内部开发向内容（设计说明 / 实现细节 / 平台差异实现等），只保留安装、用法、API、主题等用户文档
## 0.1.10（2026-08-11）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.9（2026-08-07）
- 支持 iOS 端：iOS 嵌套 CSS 变量解析失败导致添加格边框变黑、暗黑模式失效；并入 `APP-ANDROID || APP-IOS || APP-HARMONY` 实色兜底分支（背景、边框、图标、文案，含深浅色，与 Android/鸿蒙一致），演示页 iOS 下也向 `custom-class` 传递主题 class。Web 与小程序行为不变。
## 0.1.8（2026-08-01）
- 修复 Android 暗黑模式下添加上传格显示为灰白空框：在 `APP-ANDROID` 下通过 `custom-class` 识别主题并使用组件内实色背景、边框、图标与文案颜色。鸿蒙继续使用同一原生 App 兜底，Web、iOS 与小程序行为保持不变。
## 0.1.7 (2026-07-29)
- 修复鸿蒙端（`APP-HARMONY`）CSS 变量在组件隔离下失效的问题：通过 `custom-class` 中的 `nax-theme-dark` 选择组件内置深浅色背景、边框与文字色。

## 0.1.6 (2026-07-29)
- 鸿蒙端（`APP-HARMONY`）主题变量无法穿透组件隔离边界时，可将主题 class 直接传给 `custom-class`，保证上传格使用当前主题背景与边框。

## 0.1.5 (2026-07-29)
- 调整鸿蒙端（`APP-HARMONY`）添加格的暗色主题默认底色和虚线边框，提升与页面背景的对比度。

## 0.1.4 (2026-07-29)
- 修复鸿蒙端（`APP-HARMONY`）暗色主题下上传添加格及边框被浅色常量覆盖的问题，继续使用 `--nax-*` 主题 token。

## 0.1.3 (2026-07-29)
- 移除第三方组件库参考表述，完善独立组件文档。

## 0.1.1 (2026-07-20)

- fix chooseImage/chooseVideo success: use native fields instead of UTSJSONObject.getArray

## 0.1.0（2026-07-20）

- 初版 nax-upload（uvue）
- 支持 Upload 主能力：fileList / 选图 / 预览 / 删除 / 状态遮罩
- 支持 maxCount / maxSize / multiple / accept(image|video|media) / disabled / deletable
- 事件：afterRead / beforeRead / oversize / delete / beforeDelete / clickPreview
