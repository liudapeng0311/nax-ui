# 介绍

`nax-ui` 是面向 **uni-app x**（uvue）的通用 UI 组件库，以组合式 API 与 CSS 变量主题化为核心设计，覆盖基础、布局、表单、反馈、导航、展示六大类常用业务场景。

## 由来

uni-app x 生态起步较晚，社区组件大多仍是老 uni-app（Vue2/Vue3 + wxml）时代的产物，或仅做简单兼容。`nax-ui` 选择**只做 uni-app x**：

- 全部组件基于 **uvue（`<script setup lang="uts">`）** 从零实现，不是兼容层、不是双栈维护
- 按 **蒸汽模式** 设计：组合式 API + 样式隔离 2.0，无历史包袱
- 样式仅用 **class 选择器 + `--nax-*` CSS 变量**，不依赖 Web 独有 CSS，适配 App 端 ucss 子集

## 特性

- 🧩 **组件齐全**：50+ 个独立 `nax-*` 组件包 + `nax-ui-theme` 主题包，按「基础 / 布局 / 表单 / 反馈 / 导航 / 展示」六大类组织
- ⚡ **零配置接入**：每个组件是独立 `uni_modules` 插件包，easycom 自动注册，页面直接 `<nax-button />` 即可使用，可整套安装也可按需安装
- 📱 **多端运行**：一套代码覆盖 Web、微信小程序、App Android / iOS / 鸿蒙（见下方平台支持）
- 🎨 **主题 token**：`--nax-*` CSS 变量驱动设计体系，业务改色不改组件源码；支持运行时换肤与三态暗黑模式（跟随系统 / 浅色 / 深色）
- 🔌 **双模式反馈**：Toast / Dialog 等同时提供声明式（`v-model:show`）与命令式（`naxToast()` / `naxDialog()`）调用
- 🛡️ **端差异显式处理**：平台差异用条件编译（`#ifdef`）隔离，不迁就一端而牺牲其它端

## 平台支持

| 平台 | 支持 |
|------|------|
| Web（H5） | ✅ |
| 微信小程序 | ✅ |
| App Android | ✅ |
| App iOS | ✅ |
| App HarmonyOS | ✅ |

## 与其它框架的区别

- 老 uni-app 组件库以 Vue 生态 + wxml 渲染为基础，无法直接用于 uni-app x 工程
- `nax-ui` 以 **uvue + uts 原生实现**，面向 uni-app x 蒸汽模式设计，不做与老 uni-app 的双栈兼容，因此没有历史包袱，组件 API 与样式约束更统一

## 相关地址

- 插件市场（整套套装）：[nax-ui - uni-app x 通用 UI 组件库](https://ext.dcloud.net.cn/plugin?id=29077)
- 组件文档站：本站点（指南 / 组件 / 主题接入 / 暗黑模式）

## 赞赏支持

如果这个项目对您有帮助，可以请作者喝杯咖啡 ☕️

<div style="display: flex; justify-content: center; gap: 32px; flex-wrap: wrap;">
  <div style="text-align: center;">
    <img src="/reward/weixin.png" alt="微信收款码" style="width: 210px; height: 300px; border-radius: 8px;" />
    <p style="margin: 8px 0 0; font-size: 14px; color: var(--vp-c-text-2);">微信</p>
  </div>
  <div style="text-align: center;">
    <img src="/reward/zhifubao.png" alt="支付宝收款码" style="width: 210px; height: 300px; border-radius: 8px;" />
    <p style="margin: 8px 0 0; font-size: 14px; color: var(--vp-c-text-2);">支付宝</p>
  </div>
</div>

## 下一步

- 想要快速跑起来，见 [快速开始](./)
- 查看全部组件，见 [组件总览](../components/)
- 主题接入与暗黑模式，见 [主题接入](./theme) 与 [暗黑模式](./dark-mode)
