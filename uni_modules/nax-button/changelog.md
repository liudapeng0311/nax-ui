## 0.1.23（2026-08-18）
- 修复鸿蒙端（含蒸汽）按钮文字被误省略：`max-lines="1"` 与 `text-overflow: ellipsis` 在无宽度约束的 flex 子项上测量失真，鸿蒙端改为双分支渲染（不带省略），完整展示；其它端保持单行省略
- 修复模板条件编译注释位于标签属性区被解析为属性的告警：按钮文字改为条件编译双分支（注释移至标签外），消除安卓/iOS 端 "Property '<!--'" 警告
## 0.1.22（2026-08-18）
- 蒸汽模式兼容：`lines` CSS 声明迁移为 `<text>` 的 `:max-lines` 属性（官方蒸汽模式方案），消除 Vapor 运行时与 CSS 编译器警告
## 0.1.21（2026-08-18）
- 蒸汽模式兼容：移除 `<text>` 上不支持的 `lines` 属性，改为 CSS `lines` 声明（各文本 class 补齐 `lines: N;`），消除 App 蒸汽模式 warning
## 0.1.20（2026-08-14）
- readme 合并重复的“主题”小节：完整 Token 表 + 绿色主色示例并入一节
## 0.1.19（2026-08-11）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
## 0.1.18（2026-08-07）
- 修复 iOS 启动报错 `null is not an object (evaluating 'this.getNativePage().document')`：原生页面未就绪时 `uni.getElementById` 在 iOS 直接抛错，`getSpinElement` 增加防御性 try/catch，按未命中处理并走原有重试等待挂载
## 0.1.17（2026-08-07）
- 修复 iOS 加载动画掉帧：App 三端统一改用原生 `UniElement.animate()` 无限旋转（`APP-ANDROID || APP-IOS || APP-HARMONY`），移除 setInterval + 响应式 transform 方案；对齐 nax-loading / nax-switch 实现
## 0.1.16（2026-08-07）
- 支持 iOS 端：App 端条件编译分支（loading 旋转、禁用透明度）已覆盖 `APP-IOS`，iOS 直接可用
## 0.1.15（2026-07-31）
- 移除第三方组件库参考表述，完善独立组件文档。
## 0.1.14（2026-07-27）

- 修复深色主题下内置 `nax-icon` 与 loading 图标仍使用浅色固定值的问题
- 图标颜色改为与按钮文案一致的 `--nax-*` 主题 token，并保留未接主题时的 fallback

## （2026-07-18）

- 默认字号与尺寸档对齐新标准：sm14 / **md16** / lg18；高度 sm32 / md40 / lg48
## 0.1.13（2026-07-16）
- fallback 对齐 默认按钮色：primary/success `#18a058`，info/warning/error 同步官方 common
## 0.1.12（2026-07-16）
- fallback 色值对齐设计稿：主色 `#ff6b35`，同步 success/warning/error/info 与中性色
## 0.1.11（2026-07-16）

- package：安装依赖增加 nax-ui-theme（运行时仍弱依赖 + fallback）

## 0.1.10（2026-07-16）

- 修复带图标按钮图标颜色不对：改为通过 nax-icon color prop 传色
- 原因：样式隔离 2.0 下父组件 CSS 变量 `--nax-icon-color` 无法进入子组件
## 0.1.9（2026-07-15）

- 依赖 `nax-icon@0.1.5` 单节点居中修复；请同步更新 nax-icon

## 0.1.8（2026-07-15）

- 图标居中依赖 `nax-icon@0.1.4` 字体 metrics 修复；请同步更新 nax-icon

## 0.1.7（2026-07-15）

- 修复 web / 小程序：单图标圆形按钮图标不居中
- 修复 loading 旋转轴偏移：固定 loading 方盒尺寸并设置 transform-origin: center

## 0.1.6（2026-07-15）

- loading 使用旋转的 `nax-icon name="loading"`，替换原来的 `...`
- loading 图标颜色跟随按钮文案色；无文案时不额外留间距

## 0.1.5（2026-07-15）

- 支持 `icon` / `iconPosition`：内置渲染 `nax-icon`
- 图标尺寸跟随按钮 size；颜色跟随文案色（`--nax-icon-color`）
- loading 时隐藏 icon（保留 loading 占位）
- 声明依赖 `nax-icon`

## 0.1.4（2026-07-15）

- 鸿蒙：次要/次次要 soft fill 改为实色 hex（
gba 背景在 ucss 下会丢失）
- 禁用态：无背景（基础/描边/虚线）保留边框；有 soft fill 的次要/次次要仍去边
- secondary / tertiary / quaternary 统一无边框
## 0.1.3（2026-07-15）

- 按钮层级：基础 / 次要 / 次次要 / 次次次要 / 虚线 / 禁用
- `variant` 扩展：`solid` | `secondary` | `tertiary` | `quaternary` | `dashed` | `outline`
- 兼容：`light`→`secondary`，`text`→`quaternary`，`type="tertiary"`→default+tertiary
- 次要/次次要使用半透明 soft fill；禁用 `opacity: 0.5`
- 默认尺寸采用默认尺寸（md 高 34px）

## 0.1.2（2026-07-15）

- 修复鸿蒙：error 类型嵌套 var() 导致背景/文字失效（空白按钮）
- 修复鸿蒙：disabled 不再强制灰字，仅用根节点 opacity，避免 primary 禁用态几乎不可见

## 0.1.1（2026-07-14）

- type 调整为：default / tertiary / primary / info / success / warning / error
- danger 兼容映射为 error

## 0.1.0（2026-07-14）

- 初版 `nax-button`
- 支持 type / variant / size / shape / disabled / loading / block / label / customClass
- 支持 click 事件与 icon / default 插槽
- 使用 `--nax-*` CSS 变量主题
