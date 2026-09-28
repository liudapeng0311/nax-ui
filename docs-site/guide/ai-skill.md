# AI 技能包（Agent Skill）

> nax-ui 提供官方 **Agent 技能包**，让 AI 编码助手（Claude Code、Cursor、OpenCode、Codex 等）更准确地使用 nax-ui 编写页面：组件速查、每组件 API 参考、主题接入指南。

## 一键安装（推荐）

通过 [skills.sh](https://skills.sh/liudapeng0311/nax-ui-skills) 生态的 CLI 安装：

```bash
npx skills add liudapeng0311/nax-ui-skills
```

按提示选择要安装的 AI 代理（或加 `--yes -g` 跳过交互直接全局安装）：

```bash
npx skills add liudapeng0311/nax-ui-skills --yes -g
```

安装后，AI 在遇到 nax-ui 相关任务时（写页面、查组件 API、配主题）会自动加载本技能。

## 手动安装

不使用 skills CLI 时，将技能目录复制到对应工具的 skills 目录：

```bash
# 克隆技能仓库
git clone https://github.com/liudapeng0311/nax-ui-skills.git
```

| 工具 | 安装目录 |
|------|----------|
| Claude Code | `~/.claude/skills/nax-ui/` |
| OpenCode / 通用 | `~/.agents/skills/nax-ui/` |
| 项目级 | 项目根目录 `.claude/skills/nax-ui/` 或 `.agents/skills/nax-ui/` |

> 技能目录 = 仓库中的 `SKILL.md` + `references/`（组件索引、53 个组件 API 卡、nax-use 组合式函数卡、主题指南）。

## 技能包含什么

```
SKILL.md                      # 使用流程 + uni-app x 代码规范 + 常见陷阱
references/
  component-index.md          # 53 个组件分类速查（基础/布局/表单/反馈/导航/展示）+ nax-use 组合式函数
  theme-guide.md              # 主题接入指南（L0/L1/L2、CSS 变量、暗色模式）
  components/nax-*.md         # 各组件 API 参考卡（Props/Events/Slots/Methods/用法示例）
```

## 验证安装

对 AI 说类似下面的任务，检查它是否使用 nax-ui 真实组件与正确 API：

```
在 uni-app x 项目里用 nax-ui 写一个登录页：nax-input 手机号/密码、
nax-button 登录、校验失败用 naxToast 轻提示、成功用 nax-dialog 提示。
```

AI 应主动参考组件卡中的 API（如 `v-model:show`、`naxToast()` 函数式调用）而不是凭空猜测。

## 相关链接

- skills.sh 页面：https://skills.sh/liudapeng0311/nax-ui-skills
- 技能仓库：https://github.com/liudapeng0311/nax-ui-skills
- 组件总览：[组件文档](../components/)
