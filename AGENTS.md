# AGENTS.md — nax-ui 仓库约束

本文件约束在本仓库内工作的 AI 助手与协作者。
**范围：整个仓库根目录及子目录。**
更细的产品规范见 `docs/`；若与本文件冲突，以 **更严格且不破坏 uni-app x 兼容性** 的规则为准。

---

## 1. 项目目标

- 本仓库用于开发 **uni-app x 通用 UI 组件库 `nax-ui`**。
- 组件库本体位于 `uni_modules/nax-ui`（单包套装，easycom）。
- 根工程是 **演示 / 开发宿主**，不是业务 App。
- 技术主路径：**uvue 前端组件**，不是 uts 原生组件/原生插件。

权威文档：

- `docs/design-system.md` — 设计与 API 规范
- `docs/component-inventory.md` — 组件分期与清单
- `uni_modules/nax-ui-theme/readme.md` — 主题 token 接入（随主题包发布）
- `docs/README.md` — 文档索引

实现前先读上述文档；**不要**在未更新清单的情况下随意新增清单外大型组件。

---

## 2. 技术边界（硬约束）

### 2.1 允许

- `*.uvue` 组件 + `<script setup lang="uts">`
- 组合式 API（`ref` / `computed` / `watch` / props / emits 等）
- `uni_modules/nax-ui/components/nax-*/nax-*.uvue` 结构
- CSS 变量（`--nax-*`）与 class 修饰符主题化
- 必要的条件编译：`#ifdef` / `#ifndef`
- 演示页、`docs` 规范、组件 demo

### 2.2 禁止

- 把 UI 库做成 **uts 原生组件**（除非任务明确要求原生视图能力）
- Options API 作为组件实现方式
- 在 `uni_modules/nax-ui` 内放置：
  - `manifest.json`
  - `pages.json`
  - `App.uvue`
  - `main.uts`
  - `uni.scss`
- 依赖 **Web 独有 CSS** 作为组件核心样式（如复杂选择器、依赖继承的文字样式）
- 用大量 props 传颜色/样式字符串充当主题系统（如 `color`、`background`、`customStyle` 泛滥）
- 为了“通用”同时维护老 uni-app 与 uni-app x 双栈（除非任务明确要求）
- 引入与 uni-app x 蒸汽模式不兼容的 Vue 生态大库作为组件库运行时依赖

### 2.3 样式硬约束（uni-app x）

1. **仅 class 选择器**作为核心样式手段
2. 默认布局按 **flex** 思考；横向必须显式 `flex-direction: row`
3. 文本样式写在 **`<text>`** 上，不假设继承
4. 组件默认 **样式隔离**；对外扩展用 `class` / `externalClasses` / CSS 变量
5. 仓库已启用 `styleIsolationVersion: "2"`，新组件按隔离 2.0 设计
6. 禁止依赖 tag/id/属性选择器实现关键外观

### 2.4 平台差异与条件编译（硬约束）

**触发条件：** 用户提问 / 需求 / 反馈中出现任一平台语义时，**必须**用条件编译实现端差异，禁止用“统一写法硬扛全端”或只改某一端却污染其它端。

常见平台表述（含同义说法）→ 条件编译宏：

| 用户表述（示例） | 优先宏 | 说明 |
|------------------|--------|------|
| 鸿蒙 / HarmonyOS / App 鸿蒙 | `APP-HARMONY` | App 鸿蒙端 |
| 安卓 / Android | `APP-ANDROID` | App Android 端 |
| iOS / 苹果 | `APP-IOS` | App iOS 端 |
| App / 原生 App / 客户端 | `APP-ANDROID` `APP-IOS` `APP-HARMONY` 按需组合 | 三端或子集 |
| Web / H5 / 浏览器 | `WEB` / `H5`（按官方与工程实际宏） | Web 端 |
| 微信小程序 / 小程序 | `MP-WEIXIN` / `MP` | 小程序端 |

实现要求：

1. **template / script / style 均可**使用 `// #ifdef`、`// #ifndef`、`/* #ifdef */`、`<!-- #ifdef -->`（按所在区块语法）
2. **仅某端支持的 API / CSS / 行为**必须包在对应 `#ifdef` / `#ifndef` 内  
   - 例：Web 支持的 `@keyframes`，App uvue 不支持时，CSS 动画放在 `#ifndef APP-ANDROID || APP-IOS || APP-HARMONY`，App 用其它兜底
3. **默认能力放公共代码**；差异逻辑用条件编译拆分，避免复制整份组件
4. **禁止**为迁就一端而删除另一端可用能力（除非用户明确要求“只保留某端”）
5. 条件编译处写**简短必要注释**（说明为何分端）；不要写长篇说明
6. 改完后在回复中点明：影响哪些端、用了哪些宏、其它端行为是否保持不变
7. 宏名以 [uni-app x 条件编译官方文档](https://doc.dcloud.net.cn/uni-app-x/) 与本仓库既有写法为准；拿不准时先与仓库内已有 `#ifdef` 对齐（见 `App.uvue` 等）

协作默认：

- 用户只提一端问题（如“鸿蒙下…”）→ 修该端，并用条件编译隔离，**不破坏** Web / 小程序 / 其它 App 端
- 用户提多端差异 → 按端分别实现并写清宏组合
- 用户未提平台 → 仍优先写**全端安全**的公共实现；只有确认存在端能力差时才加条件编译

---

## 3. 目录与命名

### 3.1 目标结构

```text
nax-ui/                          # 演示宿主
  AGENTS.md
  docs/
    README.md
    design-system.md
    component-inventory.md
  pages/
    index/                       # 组件导航
    components/<name>/index.uvue # 单组件 demo
  uni_modules/
    nax-ui/
      package.json
      readme.md
      changelog.md
      components/
        nax-button/nax-button.uvue
        nax-text/nax-text.uvue
        ...
      # 可选：theme、utils、composables
```

### 3.2 命名必须

| 对象 | 规则 | 示例 |
|------|------|------|
| 组件前缀 | 固定 `nax-` | `nax-button` |
| 组件文件 | 目录名 = 文件名 | `nax-button/nax-button.uvue` |
| class | BEM 轻量 | `nax-button--primary`、`nax-button__text` |
| token | `--nax-` | `--nax-color-primary` |
| 事件 | 语义动词 | `click` `change` `confirm` |
| 布尔 props | 无 `is` 前缀 | `disabled` `loading` |

---

## 4. 组件 API 约定

实现任何组件时遵守：

1. **props 管行为，样式管外观**
2. 枚举优先复用：
   - `type`: 组件自定；按钮为 `default | tertiary | primary | info | success | warning | error`
   - `variant`: `solid | outline | text | light`
   - `size`: `sm | md | lg`
3. 表单控件优先 `modelValue` + `update:modelValue`
4. 可点组件支持 `disabled`；异步操作支持 `loading`（如适用）
5. 至少考虑根节点 `custom-class`（externalClasses）
6. 不要提前实现未在清单中的冷门 API；需要时先改 `docs/component-inventory.md` / `docs/design-system.md`

---

## 5. 文档同步规则

以下变更 **必须** 同步文档：

| 变更 | 更新文件 |
|------|----------|
| 新增组件 | `docs/component-inventory.md` 状态看板 |
| 调整分期/优先级 | `docs/component-inventory.md` |
| 新增/修改 token | `docs/design-system.md` |
| 公共 API 原则变化 | `docs/design-system.md` |
| 组件包代码 / API / 样式 / 行为 / 依赖变化 | 对应组件的 `changelog.md` + `package.json` 版本号；并检查 `uni_modules/nax-ui` 套装是否需要同步 |
| 新增/移除组件包 | `uni_modules/nax-ui` 套装 `package.json` 的 `uni_modules.dependencies` + `changelog.md` + 版本号 |
| 组件 API / 主题 token / 组件数量变化 | **必须检查技能包 `nax-ui-skill-build` 是否需要同步更新**（见 5.2） |
| 仓库协作约束变化 | `AGENTS.md` |

完成组件实现后：

- 将看板 `planned` → `done`
- 补充 demo 页
- 如有已知端差异，写在组件说明或清单备注

**不要**只写代码不改清单，导致文档漂移。

### 5.1 组件版本与 changelog（硬约束）

凡修改 `uni_modules/nax-*` 组件包（包括组件代码、公共 API、样式、行为、兼容性、依赖或随包发布的文档），必须在同一次任务中：

1. 在对应组件包的 `changelog.md` 顶部增加本次改动说明，包含新版本号、日期、主要变化；涉及端差异时写明平台与条件编译宏
2. 自动更新对应组件包 `package.json` 的 `version`；如包内还有需要保持一致的发布版本字段，也一并同步
3. 版本号由 AI 根据改动内容按 SemVer 判断，无需等待用户指定：

| 升级位 | 适用情况 | 示例 |
|--------|----------|------|
| `major`：`X.0.0` | 不兼容变更、删除/重命名公共 API、默认行为发生破坏性变化 | `0.2.5` → `1.0.0` |
| `minor`：`x.Y.0` | 向后兼容的新功能、新 prop/event/slot、新能力 | `0.2.5` → `0.3.0` |
| `patch`：`x.y.Z` | 向后兼容的 bug 修复、样式/端兼容修复、内部实现或文档修正 | `0.2.5` → `0.2.6` |

补充约定：

- **每次修改任一 `nax-*` 组件包时，必须检查套装 `uni_modules/nax-ui` 是否需要同步更新**（它不收录组件源码，只聚合依赖）：
  - 新增/移除组件包 → 更新套装 `package.json` 的 `uni_modules.dependencies` 列表与 readme 中的组件数量表述
  - 套装依赖列表、平台支持、聚合说明等变化 → 同步套装 `changelog.md` + `package.json` 版本号（新增组件按 `minor`，修复类同步按 `patch`）
  - 若仅组件内部实现变化、套装聚合信息无任何变化，可在套装 `changelog.md` 记一条“依赖组件更新”说明并递增 `patch`，或经判断确认无需更新并在任务说明中写明原因
- 仅修改演示宿主页、且组件包本身未变化时，不强制升级组件版本
- 为记录本次版本而修改 `changelog.md` / `package.json`，不视为需要再次递增版本号的新一轮组件改动
- 同一任务多次修改同一组件包时只确定一个最终版本，changelog 合并记录本次任务的全部变化

### 5.2 技能包同步与发布（硬约束）

**技能包**（`nax-ui-skill-build/`，发布为 GitHub `liudapeng0311/nax-ui-skills`）是给 AI 编码助手使用的 nax-ui 使用指南。**凡修改任一 `nax-*` 组件包或 `nax-ui-theme` 的公共 API / 样式 / 行为 / 依赖 / 组件数量，必须检查技能包是否需要同步更新**：

| 组件包变更 | 技能包动作 |
|-----------|-----------|
| 组件 props / events / slots / methods / 枚举值变化 | 重新生成对应组件卡：`python nax-ui-skill-build/scripts/gen-nax-refs.py <uni_modules 路径> nax-ui-skill-build/references/components` |
| 新增组件 | 重新生成组件卡 + 更新 `references/component-index.md`（分类、一句话说明、组件数量） |
| 移除组件 | 删除对应组件卡 + 更新 `references/component-index.md` |
| 主题 token 变化 | 检查 `references/theme-guide.md` 及受影响组件卡 token 表是否需同步 |
| 组件 readme 文档变化 | 重新生成组件卡（脚本以 readme 为数据源） |

判断标准：**组件卡的"用法示例 / Props / Events / Slots / Methods / 依赖"与组件实际 API 不一致时，必须更新**；仅内部实现（不改公共 API）可不更新，但需在任务说明中写明判断依据。

### 5.3 技能包发布流程

技能包更新完成后，按以下流程发布（**用户未要求时不发布**）：

1. **更新源目录**：在 `nax-ui-skill-build/` 修改 `SKILL.md` / `references/` / `scripts/`
2. **重新生成组件卡**（如涉及组件 API 变化）：
   ```bash
   python nax-ui-skill-build/scripts/gen-nax-refs.py <nax-ui/uni_modules 路径> nax-ui-skill-build/references/components
   ```
3. **手动同步**：`SKILL.md` 中的组件数量、`references/component-index.md` 的组件清单与说明
4. **同步发布副本**：将更新内容复制到 `nax-ui-skill-release/`（该目录的 git origin 指向 GitHub `liudapeng0311/nax-ui-skills`）
5. **提交推送**：在 `nax-ui-skill-release/` 中 `git add` + `git commit` + `git push`（默认分支 `main`）
6. **验证**（可选）：`npx skills add liudapeng0311/nax-ui-skills --list` 确认 CLI 能识别技能；skills.sh 页面可能延迟更新，如长时间 404 可在 `vercel-labs/skills` 仓库提 re-index issue

---

## 6. 实现顺序（默认）

除非用户点名某组件，否则按依赖从底向上：

1. 设计 token / 主题入口
2. `nax-text` `nax-icon`
3. `nax-button` `nax-space` `nax-divider` `nax-tag`
4. `nax-cell` `nax-cell-group` `nax-card`
5. `nax-badge` `nax-avatar` `nax-empty`
6. 再进入 v0.2 表单与反馈（见清单）

禁止先做业务大组件（如 goods-card）再补基础件。

---

## 7. 编码风格

- 最小改动原则：不重构无关文件，不“顺便”大改宿主工程
- 不添加无意义注释；只在端差异/条件编译处写必要说明
- 不新增版权头，除非用户要求
- 用户未要求则 **不 git commit**
- 演示文案默认中文
- 保持与现有 uni-app x 脚手架风格一致（uvue + uts setup）

### 组件文件骨架（推荐）

```uvue
<template>
  <view class="nax-xxx" :class="rootClass">
    <text class="nax-xxx__text">{{ label }}</text>
  </view>
</template>

<script setup lang="uts">
const props = defineProps({
  // 行为 + 语义枚举
})
const emit = defineEmits(['click'])
</script>

<style>
.nax-xxx {
  /* 使用 --nax-* token，flex 布局 */
}
.nax-xxx__text {
  /* 文本样式单独写 */
}
</style>
```

---

## 8. 测试与验证预期

本仓库当前未必有完整单测体系。改动后至少：

1. 保证 easycom 路径可被页面直接使用
2. 新增/修改 demo 页，覆盖主 props 与关键状态
3. 不引入明显的类型/语法问题（`lang="uts"`）
4. 若用户要求，再补充多端运行验证说明
5. **仅 Web 端可由 AI 助手按需运行或编译验证。Android、iOS、鸿蒙、小程序等非 Web 端改完代码后，不运行、不编译，由用户自行核实；助手只做代码静态检查并说明影响端与条件编译宏。**

不要虚构“已在真机验证”的结果。

---

## 9. 与用户协作时的默认决策

当需求含糊时，默认采用：

| 问题 | 默认选择 |
|------|----------|
| 兼容范围 | 仅 uni-app x |
| 渲染模式 | 蒸汽模式优先 |
| 主题方案 | `nax-ui-theme` + CSS 变量 `--nax-*`（弱依赖） |
| 组件粒度 | 清单内 MVP/P0 优先 |
| 包结构 | 单包 `uni_modules/nax-ui` |
| 原生能力 | 不做 uts 原生组件 |
| 平台差异 | 用户点名端差异时用条件编译；未点名则优先全端安全公共实现 |

若用户要求与文档冲突：

1. 先指出冲突点
2. 按用户明确指令执行
3. 回写 `docs/*` / 本文件，避免再次漂移

---

## 10. 变更检查清单（PR / 任务完成前）

- [ ] 未违反第 2 节硬约束（含 2.4 条件编译）
- [ ] 若需求涉及鸿蒙 / 安卓 / iOS / Web / 小程序等平台表述，端差异已用 `#ifdef` / `#ifndef` 隔离
- [ ] 命名符合 `nax-` / easycom
- [ ] 样式符合 ucss / 隔离 2.0 思路
- [ ] 清单或设计文档已同步
- [ ] 每个发生变化的组件包均已更新对应 `changelog.md`
- [ ] 每个发生变化的组件包均已按 SemVer 自动递增并同步 `package.json` 版本号
- [ ] 已检查套装 `uni_modules/nax-ui` 是否需要同步（依赖列表 / 版本号 / changelog）
- [ ] **已检查技能包 `nax-ui-skill-build` 是否需要同步**（组件 API / 主题 token / 组件数量变化时，按 5.2 / 5.3 处理；不需要更新时在任务说明写明判断依据）
- [ ] 有可运行 demo 或明确说明为何没有
- [ ] 除 Web 端外，未主动运行或编译其它端；非 Web 端由用户自行核实
- [ ] 无无关重构与无关文件打扰

---

## 11. 快速链接

- 设计规范：`docs/design-system.md`
- 组件清单：`docs/component-inventory.md`
  - 主题接入：`uni_modules/nax-ui-theme/readme.md`
- 文档索引：`docs/README.md`
- 主题包：`uni_modules/nax-ui-theme`
- 技能包（AI 使用指南，发布到 GitHub `liudapeng0311/nax-ui-skills`）：`nax-ui-skill-build/`（源目录）、`nax-ui-skill-release/`（发布副本）
- 官方参考（人工查阅）：
  - uni-app x 文档：https://doc.dcloud.net.cn/uni-app-x/
  - uni_modules：https://doc.dcloud.net.cn/uni-app-x/plugin/uni_modules.html
  - 样式隔离：https://doc.dcloud.net.cn/uni-app-x/css/common/style-isolation.html
  - uni-ui x：https://doc.dcloud.net.cn/uni-app-x/component/uni-ui-x/index.html

