## 0.3.1（2026-09-01）
- 修复 iOS 端视频点击播放不生效：`<video>` 改为常驻挂载、封面卡片覆盖其上（uni-app x 同层级渲染可覆盖），点击在用户手势内 `play()`（规避 iOS 动态挂载 / 非手势播放被拒，消除 `Possible Unhandled Promise Rejection` 告警）；App 端视频预先缓冲，点击通常即点即播；播放超时 4s 未开始自动退回可重试的播放按钮
- 新增视频加载反馈：点击封面后圆钮显示旋转 loading（复用 nax-loading），`@play` 开始播放后隐藏
- 修复鸿蒙编译报错：移除视频卡不支持的 `max-width: 100%`（鸿蒙 CSS 仅支持 number/pixel）
- 修复 iOS 蒸汽 CSS 告警：移除音频卡标题静态 `lines: 1`，行数由 `<text>` 的 `:max-lines` 属性承担（同 nax-text 先例）
## 0.3.0（2026-08-31）
- 新增自研解析渲染器引擎，默认 `engine="parser"`，App / Web / 小程序渲染一致：容错 HTML 解析 + 自绘节点树，内置标题 / 列表 / 表格列对齐 / 首行缩进默认排版
- 内置 rich-text 封装保留为 `engine="builtin"` 兜底；`mode` / `userSelect` / `space` 仅 builtin 引擎生效
- 多媒体（parser 引擎）：`<audio>` 播放卡（封面 + 播放钮叠放、标题行 title/文件名回退、当前/总时长、拖拽实时跳转，createInnerAudioContext 实现）；`<video>` 封面卡片（poster 封面 + 播放钮，点击后原生 video 接管，关原生中部大三角防闪现）
- 图片点击自动 `uni.previewImage` 全屏预览（同一段内容内图片可左右切换）
- `itemclick` 事件统一形状：`detail.type` 标记来源 `img` / `a` / `audio` / `embed`，图片 / 音频卡返回 `detail.src`、链接返回 `detail.href`（parser 引擎小程序端也可用）
- 新增 `linkColor` 链接颜色 prop（parser 引擎生效，默认主题绿 #18a058）
- 鸿蒙蒸汽 CSS 编译器警告消除：音频卡标题单行省略改 `:max-lines` 属性 + `lines` 约束 `#ifndef APP-HARMONY` 收窄、鸿蒙端补定宽裁剪双写（同 nax-text 先例），其它端行为不变
- 同步 readme 与 demo 说明
## 0.2.0（2026-08-21）
- 修复 App 端（Android / iOS）富文本渲染空白 / 不全：内置 rich-text `native` 模式对 h1-h6 / ul / li 等结构标签解析不稳，会导致整块内容丢弃
- 默认渲染模式 `mode` 由 `native` 调整为 `web`（与官方默认一致，开箱即正确渲染）；`native` 保持可选，适合纯文本长内容的高性能场景
- 新增自动回退：显式传 `mode="native"` 时，检测到内容含 native 不可靠的结构标签（HTML 字符串扫描 / nodes 序列化扫描）自动改用 web 渲染
- iOS / 鸿蒙开启 `user-select` 时自动回退 web 渲染，选中复制由"不支持"变为可用
- 同步 readme 与 demo 说明

## 0.1.0（2026-08-21）
- 初版 nax-rich-text（uvue）
- 基于内置 rich-text 封装：HTML 字符串 `content` / 节点列表 `nodes` 双入口（nodes 优先）
- App 渲染模式 `mode`：默认 `native`（蒸汽模式 C 实现原生渲染）；Android VDOM 模式下 native 标签受限，可传 `web`
- 全局样式：`size` / `color` / `lineHeight` / `fontFamily` 写在 rich-text 元素自身（uni-app x 文本样式不继承）
- 内容点击事件 `itemclick` 透传（img 返回 detail.src / a 返回 detail.href；小程序端官方不支持）
- `userSelect` 可选中复制、`space` 连续空格、`show` 显隐、`customClass` 扩展
