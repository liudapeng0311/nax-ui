## 0.1.1（2026-07-21）

- 鸿蒙：压窗遮罩对齐 nax-picker 三阶段动画，修复半透明背景闪动
- 内置 host 默认 dialogPage animationType 改为 none，避免与内部淡入叠闪
- 关闭时先退场再 closeDialogPage

﻿## 0.1.0（2026-07-21）

- 首版：压窗屏 `nax-popup`
- App / Web：`openNaxPopup()` 走 `uni.openDialogPage`，可盖住原生导航栏与 tabBar
- 内置 host 页：`uni_modules/nax-popup/pages/host/index`（简易 title/content）
- 声明式 `<nax-popup v-model:show>`：页面级插槽弹层（薄封装 nax-picker）
- 微信小程序：无 dialogPage，降级页面级宿主并在 readme 说明限制
