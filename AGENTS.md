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
- 整个 `nax-ui` 组件库定位为 **uni-app x 蒸汽模式组件库**：默认开发环境即为蒸汽模式（演示宿主 `manifest.json` 已开启 `"vapor": true`），组件设计、实现与验证均以蒸汽模式为唯一基准，不承诺 VDOM 渲染模式兼容。
- App 端版本门槛：HBuilderX 鸿蒙 5.0+ / iOS 5.11+ / Android 5.21+；系统要求 Android 6.0+ / iOS 15+ / 鸿蒙 6.0+（API 20+）。Web 与小程序不受蒸汽模式影响。

权威文档：

- `docs/design-system.md` — 设计与 API 规范
- `docs/component-inventory.md` — 组件分期与清单
- `uni_modules/nax-ui-theme/readme.md` — 主题 token 接入（随主题包发布）
- `docs/README.md` — 文档索引

实现前先读上述文档；**不要**在未更新清单的情况下随意新增清单外大型组件。

---

## 2. 技术边界（硬约束）

### 2.1 允许

- `*.uvue` 组件 + `<script setup>`：蒸汽模式下 script **不写 `lang`**（官方允许 js/ts/uts 混写）；存量组件的 `lang="uts"` 保留、不批量迁移；外部脚本文件保持 `.uts` 后缀
- 组合式 API（`ref` / `computed` / `watch` / props / emits 等）
- 组合式函数（`useXxx`，无头逻辑复用）：放 `uni_modules/nax-use/composables/`，文件名 kebab-case（如 `use-countdown.uts`）
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
    nax-ui/                      # 套装入口（仅聚合依赖）
      package.json
      readme.md
      changelog.md
      components/
        nax-button/nax-button.uvue
        nax-text/nax-text.uvue
        ...
      # 可选：theme、utils
    nax-use/                     # 组合式函数包（无头逻辑复用）
      composables/use-*.uts
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

## 5. 文档与周边同步规则

**默认原则：修改 `uni_modules/nax-*` 组件包（代码 / API / 样式 / 行为 / 兼容性）时，只改组件本身与对应 demo 页；不主动联动更新任何文档、changelog、版本号、套装聚合信息或技能包。**

以下同步动作 **仅在用户明确要求时** 才执行：

| 用户要求 | 更新文件 |
|----------|----------|
| 同步设计规范 / 组件清单 | `docs/design-system.md`、`docs/component-inventory.md` |
| 记录版本 / 发布说明 | 对应组件包的 `changelog.md` + `package.json` 版本号（按 5.1 规则） |
| 同步套装聚合信息 | `uni_modules/nax-ui` 套装 `package.json` / `changelog.md` / `readme.md` |
| 同步技能包 | `nax-ui-skill-build/`（按 5.2 映射，发布走 5.3 流程） |
| 协作约束变化 | `AGENTS.md` |

用户未明确要求时，**不要**为"保持一致"而顺手改动上述文件，避免无关文件打扰。

### 5.1 组件版本与 changelog（按用户要求执行）

仅当用户明确要求记录版本 / 更新 changelog 时，才执行以下操作：

1. 在对应组件包的 `changelog.md` 顶部增加本次改动说明，包含新版本号、日期、主要变化；涉及端差异时写明平台与条件编译宏
2. 更新对应组件包 `package.json` 的 `version`；如包内还有需要保持一致的发布版本字段，也一并同步
3. 版本号按 SemVer 判断：

| 升级位 | 适用情况 | 示例 |
|--------|----------|------|
| `major`：`X.0.0` | 不兼容变更、删除/重命名公共 API、默认行为发生破坏性变化 | `0.2.5` → `1.0.0` |
| `minor`：`x.Y.0` | 向后兼容的新功能、新 prop/event/slot、新能力 | `0.2.5` → `0.3.0` |
| `patch`：`x.y.Z` | 向后兼容的 bug 修复、样式/端兼容修复、内部实现或文档修正 | `0.2.5` → `0.2.6` |

补充约定：

- 若用户同时要求同步套装 `uni_modules/nax-ui`（它不收录组件源码，只聚合依赖）：
  - 新增/移除组件包 → 更新套装 `package.json` 的 `uni_modules.dependencies` 列表与 readme 中的组件数量表述
  - 依赖组件更新 → 套装 `changelog.md` 记一条说明并递增版本（新增组件按 `minor`，修复类按 `patch`）
- 同一任务多次修改同一组件包时只确定一个最终版本，changelog 合并记录本次任务的全部变化
- 为记录版本而修改 `changelog.md` / `package.json`，不视为需要再次递增版本号的新一轮组件改动

### 5.2 技能包同步（按用户要求执行）

**技能包**（`nax-ui-skill-build/`，发布为 GitHub `liudapeng0311/nax-ui-skills`）是给 AI 编码助手使用的 nax-ui 使用指南。**仅当用户明确要求同步技能包时**，按以下映射更新：

| 组件包变更 | 技能包动作 |
|-----------|-----------|
| 组件 props / events / slots / methods / 枚举值变化 | 重新生成对应组件卡：`python nax-ui-skill-build/scripts/gen-nax-refs.py <uni_modules 路径> nax-ui-skill-build/references/components` |
| 新增组件 | 重新生成组件卡 + 更新 `references/component-index.md`（分类、一句话说明、组件数量） |
| 移除组件 | 删除对应组件卡 + 更新 `references/component-index.md` |
| 主题 token 变化 | 检查 `references/theme-guide.md` 及受影响组件卡 token 表是否需同步 |
| 组件 readme 文档变化 | 重新生成组件卡（脚本以 readme 为数据源） |

判断标准：组件卡的"用法示例 / Props / Events / Slots / Methods / 依赖"与组件实际 API 不一致时，更新对应组件卡。

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
- 保持与现有 uni-app x 脚手架风格一致（uvue + 蒸汽模式 script setup；新代码不写 lang）

### 组件文件骨架（推荐）

```uvue
<template>
  <view class="nax-xxx" :class="rootClass">
    <text class="nax-xxx__text">{{ label }}</text>
  </view>
</template>

<script setup>
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
3. 不引入明显的类型/语法问题（新代码 script 不写 lang；`.uts` 文件按 uts 严格类型检查）
4. 若用户要求，再补充多端运行验证说明
5. **仅 Web 端可由 AI 助手按需运行或编译验证。Android、iOS、鸿蒙、小程序等非 Web 端改完代码后，不运行、不编译，由用户自行核实；助手只做代码静态检查并说明影响端与条件编译宏。**

不要虚构“已在真机验证”的结果。

---

## 9. 与用户协作时的默认决策

当需求含糊时，默认采用：

| 问题 | 默认选择 |
|------|----------|
| 兼容范围 | 仅 uni-app x |
| 渲染模式 | 仅支持蒸汽模式（vapor）；不支持 VDOM 渲染模式 |
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
- [ ] **未主动改动文档 / changelog / 版本号 / 套装 / 技能包**（除非用户在本次任务中明确要求同步）
- [ ] 有可运行 demo 或明确说明为何没有
- [ ] 除 Web 端外，未主动运行或编译其它端；非 Web 端由用户自行核实
- [ ] 无无关重构与无关文件打扰
- [ ] **用户未明确要求发布线上时，未执行任何服务器部署 / 上传操作**（发布流程见 `docs/deploy-docs.md`）
- [ ] **git 提交已同时推送到 Gitee（`origin`）与 GitHub（`github`）双远端**（见 10.1）
- [ ] **`manifest.json` 本地配置未提交**（见 10.2）

---

## 10.1 双远端提交约定（GitHub + Gitee）

**硬约束：任何 git 提交都必须同时推送 Gitee 与 GitHub 两个远端；只推一个不算完成。**

| 远端 | 地址 | 用途 |
|------|------|------|
| `origin` | `https://gitee.com/liusixsix/nax-ui.git` | Gitee 主仓库（默认） |
| `github` | `https://github.com/liudapeng0311/nax-ui.git` | GitHub 镜像（新增组件/文档时保持同步） |

推送命令：

```bash
git push origin main
git push github main
```

注意事项：

1. **GitHub 直连不稳定**：本机直连 github.com 常被重置，推送前先确认 MyClash 代理（`127.0.0.1:7877`）运行中，必要时用：
   ```bash
   git -c http.proxy=http://127.0.0.1:7877 -c https.proxy=http://127.0.0.1:7877 push github main
   ```
2. **认证方式**：GitHub 用 Personal Access Token（`repo` 权限）或 Git Credential Manager 浏览器授权（代理环境下 device flow 可能无反应，优先 PAT）；token 由用户提供，**不得写入仓库文件或 git 配置**
3. 推送失败需排查解决后补推成功，并向用户汇报两端 commit 状态
4. 新增 remote 已配置；若 clone 新机器，执行 `git remote add github https://github.com/liudapeng0311/nax-ui.git`

---

## 10.2 manifest.json 本地配置约束

**硬约束：`manifest.json` 的本地配置一律不提交（stage / commit），git 忽略或提交前 `git restore` 该文件。**

原因：`manifest.json` 中的 `app-harmonyConfig.signingConfigs`（鸿蒙签名证书路径 `certpath` / `profile` / `storeFile` 与对应密码）随机器/账号不同而不同（如 `c:\Users\<用户名>\AppData\...`），且密码含敏感凭据；提交会造成仓库内配置漂移与凭据暴露。

注意事项：

1. 若 `git status` 出现 `manifest.json` 改动，先确认是否仅本地证书/密钥相关；是 → 不 stage 该文件；已 stage → `git restore --staged manifest.json` 后再提交
2. 即使改动看似只是机器路径差异，也不提交；本地签名配置保持工作区自由变化
3. 不将本机证书路径 / 密码写入任何提交到仓库的文件（含 AGENTS.md 之外的文档）
4. 若仓库其他成员需要鸿蒙签名说明，走线下 / 私密渠道提供，不走 git

---

## 11. 快速链接

- 设计规范：`docs/design-system.md`
- 组件清单：`docs/component-inventory.md`
  - 主题接入：`uni_modules/nax-ui-theme/readme.md`
- 文档索引：`docs/README.md`
- 线上部署手册（**仅用户明确要求发布时执行**）：`docs/deploy-docs.md`
- 主题包：`uni_modules/nax-ui-theme`
- 组合式函数包：`uni_modules/nax-use`
- 技能包（AI 使用指南，发布到 GitHub `liudapeng0311/nax-ui-skills`）：`nax-ui-skill-build/`（源目录）、`nax-ui-skill-release/`（发布副本）
- 官方参考（人工查阅）：
  - uni-app x 文档：https://doc.dcloud.net.cn/uni-app-x/
  - uni_modules：https://doc.dcloud.net.cn/uni-app-x/plugin/uni_modules.html
  - 样式隔离：https://doc.dcloud.net.cn/uni-app-x/css/common/style-isolation.html
  - uni-ui x：https://doc.dcloud.net.cn/uni-app-x/component/uni-ui-x/index.html

