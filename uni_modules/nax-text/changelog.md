## 0.1.15（2026-08-14）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.14（2026-08-10）
- 文档：Props 说明去掉 `type` 的旧名兼容标注（`main`/`content`/`tips`/`light`/`danger`），仅保留现行枚举；兼容行为不变。
## 0.1.13（2026-08-07）
- 修复 iOS 端单行和多行文本省略不生效：在 `APP-IOS` 下补充根节点宽度约束，并将原生 `<text :lines>` 与 CSS `lines` 双写（对齐 Android 0.1.11 方案）。Android、鸿蒙、Web 与小程序行为不变。
## 0.1.12（2026-08-01）
- 修改文档，去掉系统判定的敏感词汇
## 0.1.11（2026-08-01）
- 修复 Android 端单行和多行文本省略不生效：在 `APP-ANDROID` 下补充根节点宽度约束，并将原生 `<text :lines>` 与 CSS `lines` 双写；文本 flex 子项增加收缩约束。鸿蒙、Web 与微信小程序行为保持不变。
## 0.1.10 (2026-07-30)
- 修复微信小程序端单行和多行文本省略不生效：在 `MP-WEIXIN` 下补充宽度收缩、`white-space` 与 `-webkit-line-clamp` 兜底；Web 与 App 端行为保持不变。

## 0.1.9 (2026-07-29)
- 移除第三方组件库参考表述，完善独立组件文档。

## （2026-07-18）

- 默认字号仍为 md=16；与全局 `--nax-font-size-md` 对齐（不再单独大于控件）
## 0.1.8
- 鸿蒙编译：	ext-decoration 改为仅 #ifdef WEB || MP-WEIXIN 编入，彻底避免 App uvue-css 警告

## 0.1.7
- 消除鸿蒙编译警告：App 端样式不再包含 	ext-decoration（#ifndef APP-*）

## 0.1.6
- 修复鸿蒙点击 link 不触发 click：文案层 @click.stop + 先 emit 再 openURL

## 0.1.5
- 修复 link 模式 Web 端文字色被 default 覆盖为黑色；与鸿蒙统一信息蓝
- 演示文案改为 nax-ui文档

## 0.1.4
- 修复鸿蒙下划线/删除线不生效：	ext-decoration 改用底边框与中线视图兜底（#ifdef APP-HARMONY）

## 0.1.3
- 正文默认字号调整为 16px（size=md）；阶梯 sm14 / md16 / lg18 / xl20

## 0.1.2
- 修复 Web 端单行/多行省略不生效：white-space:nowrap / -webkit-line-clamp + 宽度与 min-width 约束（#ifdef WEB）

## 0.1.1
- 修复鸿蒙（APP-HARMONY）单行/多行省略不生效：约束宽度、flex 收缩，并双写 CSS lines

## 0.1.0
- 首版：支持 Text 核心能力（type/size/lines/mode/format/call/decoration/icons/selectable 等）
