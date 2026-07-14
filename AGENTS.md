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
- `docs/theme.md` — 主题 token 接入（nax-ui-theme）
- `docs/README.md` — 文档索引

实现前先读上述文档；**不要**在未更新清单的情况下随意新增清单外大型组件。

---

## 2. 技术边界（硬约束）

### 2.1 允许

- `*.uvue` 组件 + `<script setup lang="uts">`
- 组合式 API（`ref` / `computed` / `watch` / props / emits 等）
- `uni_modules/nax-ui/components/nax-*/nax-*.uvue` 结构
- CSS 变量（`--nax-*`）与 class 修饰符主题化
- 必要的条件编译：`#ifdef` / `#ifndef`（尽量少）
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
| 仓库协作约束变化 | `AGENTS.md` |

完成组件实现后：

- 将看板 `planned` → `done`
- 补充 demo 页
- 如有已知端差异，写在组件说明或清单备注

**不要**只写代码不改清单，导致文档漂移。

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

若用户要求与文档冲突：

1. 先指出冲突点  
2. 按用户明确指令执行  
3. 回写 `docs/*` / 本文件，避免再次漂移  

---

## 10. 变更检查清单（PR / 任务完成前）

- [ ] 未违反第 2 节硬约束  
- [ ] 命名符合 `nax-` / easycom  
- [ ] 样式符合 ucss / 隔离 2.0 思路  
- [ ] 清单或设计文档已同步  
- [ ] 有可运行 demo 或明确说明为何没有  
- [ ] 无无关重构与无关文件打扰  

---

## 11. 快速链接

- 设计规范：`docs/design-system.md`
- 组件清单：`docs/component-inventory.md`
- 主题接入：`docs/theme.md`
- 文档索引：`docs/README.md`
- 主题包：`uni_modules/nax-ui-theme`
- 官方参考（人工查阅）：
  - uni-app x 文档：https://doc.dcloud.net.cn/uni-app-x/
  - uni_modules：https://doc.dcloud.net.cn/uni-app-x/plugin/uni_modules.html
  - 样式隔离：https://doc.dcloud.net.cn/uni-app-x/css/common/style-isolation.html
  - uni-ui x：https://doc.dcloud.net.cn/uni-app-x/component/uni-ui-x/index.html

