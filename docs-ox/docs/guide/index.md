# 快速开始

`nax-ui` 是面向 **uni-app x**（uvue）的通用 UI 组件库。组件以独立 `uni_modules` 插件包形式发布，通过 easycom 自动注册，无需手动 import。

## 环境要求

- HBuilderX（uni-app x 项目）或 uni-app x CLI 工程
- 项目语言：uvue（`<script setup lang="uts">`）
- 渲染模式：蒸汽模式优先（组件按样式隔离 2.0 设计）

## 安装组件

推荐直接在 **插件市场** 中下载安装整套组件库：

[**nax-ui - uni-app x 通用 UI 组件库**](https://ext.dcloud.net.cn/plugin?id=29077)

在 nax-ui 组件库的插件详情页点击绿色按钮「**下载插件并导入HBuilderX**」即可一键下载到当前项目（自动放入 `uni_modules/` 并声明依赖，无需手动配置 easycom）。

> 插件市场安装的是**整套套装**（含全部 `nax-*` 组件包与 `nax-ui-theme` 主题包）。也可以只安装单个组件包，例如：

```text
uni_modules/nax-button
uni_modules/nax-icon
uni_modules/nax-ui-theme
```

easycom 会自动完成注册，页面中直接使用：

```html
<nax-button type="primary" label="确定" @click="onConfirm"></nax-button>
```

## 安装主题包（推荐）

`nax-ui-theme` 提供统一的 `--nax-*` CSS 变量。组件未接主题时也有内置 fallback，但正式业务建议完成接入：

```css
/* App.uvue */
@import "@/uni_modules/nax-ui-theme/theme/default.css";
```

```html
<!-- 应用根节点挂载一次主题 class -->
<view class="nax-theme">
  <!-- 页面内容 -->
</view>
```

完整分档（L0 默认色 / L1 启动配置 / L2 运行时切换）见 [主题接入](./theme)；三态暗黑模式（跟随系统/浅色/深色）接入见 [暗黑模式](./dark-mode)。

## 让 AI 帮你写页面

nax-ui 提供官方 **Agent 技能包**（skills.sh 生态），安装后 Claude Code、Cursor、OpenCode 等 AI 编码助手能准确使用 nax-ui 的组件与 API：

```bash
npx skills add liudapeng0311/nax-ui-skills
```

详见 [AI 技能包](./ai-skill)。
