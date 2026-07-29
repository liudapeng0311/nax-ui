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

## 0.1.2?2026-07-20?

- ???????autoUpload + action + header + formData
- ?? success / fail??? upload / uploadAll / reupload
- ????? uploadFile???? fileList ??

## 0.1.1 (2026-07-20)

- fix chooseImage/chooseVideo success: use native fields instead of UTSJSONObject.getArray

﻿## 0.1.0（2026-07-20）

- 初版 nax-upload（uvue）
- 支持 Upload 主能力：fileList / 选图 / 预览 / 删除 / 状态遮罩
- 支持 maxCount / maxSize / multiple / accept(image|video|media) / disabled / deletable
- 事件：afterRead / beforeRead / oversize / delete / beforeDelete / clickPreview
