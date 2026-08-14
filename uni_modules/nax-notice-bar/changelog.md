## 0.1.19（2026-08-14）
- 精简 readme：移除内部开发向内容（设计说明 / 实现细节 / 平台差异实现等），只保留安装、用法、API、主题等用户文档
## 0.1.18（2026-08-11）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.17（2026-08-07）
- 修复 iOS 端无缝滚动暂停/播放不生效：`UniElement.animate` 无限循环在 iOS 上无法可靠停止（0ms 动画顶不掉循环），改为 rAF + `style.setProperty` 驱动（DOM 直写跳过 Vue diff，16ms/帧不掉帧），暂停/恢复通过 `cancelAnimationFrame` 全端语义一致（`APP-ANDROID`、`APP-IOS`、`APP-HARMONY` 统一）；Web 和小程序 CSS 动画行为不变。
## 0.1.16（2026-08-06）
- Android / iOS：无缝滚动改用原生 `UniElement.animate`（0→-half 线性无限循环，失败回退 rAF + setProperty），与鸿蒙方案统一；移除 setInterval + Vue `:style` 高频重绘，修复 Android / iOS 端掉帧（`APP-ANDROID`、`APP-IOS`）；Web 和小程序 CSS 动画行为不变。
## 0.1.15（2026-07-31）
- 移除第三方组件库参考表述，完善独立组件文档。
## 0.1.14 (2026-07-23)

- 修复鸿蒙无缝滚动后半段文案被裁切：测宽取 `max(测量, 字数估算)`；鸿蒙 seg 取消 overflow 裁剪

## 0.1.13 (2026-07-23)

- 鸿蒙通告文案：`font-family: HarmonyOS Sans`，配合 nax-icon 字体 codepage 修复，避免英文（如 CSS）空白

## 0.1.12 (2026-07-23)

- 修复鸿蒙等 App 端通告文案中英文（如 CSS）不显示：文本显式 `font-family: sans-serif`，避免图标字体抢占

## 0.1.11 (2026-07-23)

- 修复 `separator` 默认值乱码导致多条公告拼接显示异常

## 0.1.10 (2026-07-23)

- 鸿蒙：页面卸载 / Tab 切换时先置 hostAlive=false，停止动画时不再调用 UniElement.animate / setProperty，避免 unmounted 阶段 Cannot read property context of undefined
- Android / iOS / Web 行为不变

## 0.1.9 (2026-07-21)

- 鸿蒙衔接：按官方文档改为 `UniElement.animate`（0→-half 线性近似无限循环）为主路径，消除 setInterval/Vue `:style` 高频重绘掉帧
- 测宽未完成时 `translateX(0)` 静态展示，避免「先空白再从右侧滚进」；半宽 `Math.round` 降低接缝微跳
- 元素未就绪时回退 `requestAnimationFrame` + `style.setProperty` 模回绕（语义同 setInterval）
- 鸿蒙停止动画：0ms `animate` 顶掉（VDOM 不返回动画实例）；Android/iOS/Web 行为不变

## 0.1.8 (2026-07-21)

- 鸿蒙衔接：取消「整段 transition 0→-half」循环（会空白、从右滚进、中途跳段）
- 恢复与 setInterval 相同的连续 -step 模回绕语义；鸿蒙用 80ms 步进 + 短 linear transition 插值减轻掉帧，回绕瞬间 duration=0
- 未实测宽度前不再强制段宽，避免估算过宽导致先空白；鸿蒙增加可见段测宽回退

## 0.1.7 (2026-07-21)

- 鸿蒙衔接：改为 CSS transition 整段线性滑动（双段 0 → -half 循环），消除 setInterval 高频改 transform 掉帧（`#ifdef APP-HARMONY`）
- 始终写入 transition-property / duration / timing-function:linear，避免空 timing 警告
- Android / iOS 仍为 timer 模回绕；Web / 小程序仍为 CSS keyframes

## 0.1.6 (2026-07-21)

- 鸿蒙：恢复水平衔接从右向左跑马灯（取消强制降级为 swiper 步进）
- App 衔接：测宽未完成时立即用估算开滚，避免一直静止；tick 内负向 translateX 循环
- Web / Android / iOS 行为不变

## 0.1.5 (2026-07-21)

- 鸿蒙：水平衔接（seamless）降级为原生 swiper 步进，消除折行叠字与 timer 掉帧（`#ifdef APP-HARMONY`）
- 全文案强制单行 `:lines="1"` + 固定 22px 行高，避免多行折叠
- Web / Android / iOS 衔接跑马灯逻辑不变

## 0.1.4 (2026-07-21)

- 鸿蒙衔接：取消整段 CSS transition；双段显式宽度 + 离屏测宽 + timer 模回绕，消除「空白→从右滚进→滚空再重来」
- 测到宽度前静态展示内容，避免首屏空白数秒
- App Android/iOS 同步同一套可靠回绕；Web 仍为 CSS -50%

## 0.1.3 (2026-07-21)

- 衔接滚动：实测单份文案宽度做循环位移；去掉 clone margin，消除第一轮接第二轮跳变
- 鸿蒙：transitionend 接棒循环，复位与第二份相位对齐

## 0.1.2 (2026-07-21)

- 鸿蒙：衔接滚动 transition 始终写入 `transition-timing-function:linear`，消除 `transitionTimingFunction is empty` 提示

## 0.1.1 (2026-07-21)

- 鸿蒙：衔接滚动改为 CSS transition 整段滑动，避免 setInterval 高频改 transform 掉帧（`#ifdef APP-HARMONY`）
- Android / iOS / Web / 小程序行为不变

## 0.1.0 (2026-07-21)

- 初版 `nax-notice-bar`
- 对齐 uView Pro NoticeBar：水平衔接 / 水平步进 / 垂直步进
- type 主题 light 条 + showIcon / showMore / closable
- 播放控制：autoplay / paused / playState；duration / speed
- 事件：click / close / getMore / end / update:show
- App 端跑马灯条件编译 JS 兜底，Web/小程序 CSS 动画
