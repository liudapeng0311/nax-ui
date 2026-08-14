## 0.1.12（2026-08-14）
- 精简 readme：移除内部开发向内容（设计说明 / 实现细节 / 平台差异实现等），只保留安装、用法、API、主题等用户文档
## 0.1.11（2026-08-10）
- 文档：讲清自定义 `url` 弹层页为何要手动挂主题 class（独立页面不继承触发页），并说明浅色/暗色分别挂什么。
## 0.1.10（2026-08-07）
- package 元数据：`uni-app-x` 平台标记 `ios` 由 `-` 改为 `√`（主题为纯 CSS 变量，不涉及端能力，全端可用）
## 0.1.9（2026-07-31）
- 将完整主题接入指南迁移到随包发布的 `readme.md`，覆盖 L0/L1/L2、宿主 class、暗色切换、品牌色覆盖和 dialogPage 主题同步。
- 清理组件与仓库文档对旧主题接入入口的依赖，主题接入说明统一以本包 README 为准。
## 0.1.8 (2026-07-29)
- 移除第三方组件库参考表述，完善独立组件文档。

## 0.1.7（2026-07-23）

- 默认浅色描边调浅：`--nax-color-border` `#e0e0e6` → `#f0f0f3`
- `--nax-color-border-strong` `#d0d0d6` → `#e5e5ea`
- `--nax-color-divider` `#efeff5` → `#f5f5f7`

## 0.1.6（2026-07-18）

- **破坏性**：字号阶梯上调，默认正文/控件 `md` 改为 **16px**
- 阶梯：xs12 / sm14 / md16 / lg18 / xl20 / xxl22（与 nax-text 阅读阶梯对齐）
## 0.1.5（2026-07-18）

- **破坏性**：默认圆角统一为 3px，与 
nax-button（--nnax-button-radius）一致
- --nax-radius-sm/md/lg/xl 默认均改为 3px（--nax-radius-full 仍为胶囊/圆形）
## 0.1.4（2026-07-16）
- 色板改回 **默认 light/dark** 官方 common 色（按钮演示同款）
- primary/success `#18a058`，info `#2080f0`，warning `#f0a020`，error `#d03050`
- 补充 hover/pressed token；soft fill 按 secondary 透明度实色近似
## 0.1.3（2026-07-16）
- 色板对齐设计稿 Color 色彩：主题主色改为 `#ff6b35`，同步成功/警告/错误/信息及文字/背景/描边/遮罩
- 补充色阶 token：`*-deep` / `*-disabled`、`--nax-color-divider`、`--nax-color-bg-dark`、`--nax-color-shadow`
- soft fill（secondary/tertiary）改为设计稿禁用/淡阶实色
## 0.1.2（2026-07-16）

- 文档：主题接入改为 L0 默认色 / L1 启动配置 / L2 运行时切换
- 明确宿主 class 优先挂 layout，不必每页重复
## 0.1.1（2026-07-14）

- 主题挂载选择器由 `page` 改为 `.nax-theme`（兼容 uvue / 鸿蒙，仅 class 选择器）
- 暗色改为 `.nax-theme-dark`，移除 `page.nax-theme-dark`

## 0.1.0（2026-07-14）

- 初始化 token 约定包
- 提供 `theme/default.css` 默认浅色语义变量
- 提供 `theme/dark.css` 暗色覆盖（`.nax-theme-dark`）
- 文档说明与独立 `nax-*` 组件弱依赖接入方式
