
# 介绍

nax-ui 是面向 uni-app x（uvue）的通用 UI 组件库，以组合式 API 与 CSS 变量主题化为核心设计，覆盖基础、布局、表单、反馈、导航、展示六大类常用业务场景。

- **uvue 优先**：围绕 uni-app x 蒸汽模式构建
- **按需接入**：独立 uni_modules 组件包与 easycom
- **统一主题**：语义化 `--nax-*` CSS 变量

## 由来

uni-app x 生态起步较晚，社区组件大多仍是老 uni-app（Vue2/Vue3 + wxml）时代的产物，或仅做简单兼容。`nax-ui` 选择只做 uni-app x：

### 从 uvue 出发

全部组件基于 uvue（`<script setup lang="uts">`）从零实现，不是兼容层，也不维护双栈。

### 遵循蒸汽模式

组合式 API 与样式隔离 2.0 共同约束组件实现，避免遗留模式带来的额外负担。

### 样式可控可扩展

核心样式只用 class 选择器 + `--nax-*` CSS 变量，适配 App 端 ucss 子集。

## 特性

### 组件齐全

52 个独立 nax-* 组件包、nax-ui-theme 主题包与 nax-use 组合式函数包。

### 零配置接入

独立 uni_modules 插件包通过 easycom 自动注册，可整套安装也可按需安装。

### 多端运行

一套代码覆盖 Web、微信小程序，以及 App Android、iOS、鸿蒙。

### 主题 token

`--nax-*` 驱动设计体系，业务改色无需改组件源码，支持运行时换肤。

### 双模式反馈

Toast、Dialog 等同时提供声明式与命令式调用方式，适配不同页面组织方式。

### 端差异显式处理

通过条件编译隔离平台差异，不以牺牲其它端能力来换取单端适配。

## 平台支持

| 平台 | 支持 |
|------|------|
| Web（H5） | 支持 |
| 微信小程序 | 支持 |
| App Android | 支持 |
| App iOS | 支持 |
| App HarmonyOS | 支持 |

## 与其它框架的区别

- 老 uni-app 组件库以 Vue 生态 + wxml 渲染为基础，无法直接用于 uni-app x 工程
- `nax-ui` 以 **uvue 前端组件 + uts setup 逻辑**实现，面向 uni-app x 蒸汽模式设计，不做与老 uni-app 的双栈兼容，因此没有历史包袱，组件 API 与样式约束更统一

## 相关地址

- 插件市场（整套套装）：[nax-ui - uni-app x 通用 UI 组件库](https://ext.dcloud.net.cn/plugin?id=29077)
- 组件文档站：本站点（指南 / 组件 / 主题接入 / 暗黑模式）
- GitHub：[liudapeng0311/nax-ui](https://github.com/liudapeng0311/nax-ui)
- Gitee：[liusixsix/nax-ui](https://gitee.com/liusixsix/nax-ui)

> 本项目已完全由国产大模型接管并开源，欢迎 Star、Issue 与 PR 参与共建。

## 交流群

如果在使用过程中遇到任何问题，欢迎加入 QQ 交流群一起讨论：**462353434**

## 赞赏支持

如果这个项目对您有帮助，可以请作者喝杯咖啡。

![微信赞赏码](/static/reward/weixin.png)

![支付宝收款码](/static/reward/zhifubao.png)

## 下一步

- 想要快速跑起来，见 [快速开始](./)
- 查看全部组件，见 [组件总览](../components/)
- 主题接入与暗黑模式，见 [主题接入](./theme) 与 [暗黑模式](./dark-mode)
