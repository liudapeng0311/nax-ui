---
name: nax-ui
description: >-
  uni-app x UI 组件库 nax-ui 的使用指南。当用户需要在 uni-app x / uvue 项目中使用 nax-ui 组件
  （nax-button、nax-input、nax-form、nax-toast、nax-dialog 等 52 个 nax-* 组件）编写页面、
  搭建表单、实现弹窗反馈、配置主题，或询问某个 nax-* 组件的 props/事件/用法、以及使用 nax-use
  组合式函数（useCountdown / useValidate / useDebounce 等）时，必须使用本技能。
  也适用于用户提到 nax-ui、nax- 前缀组件、uni-app x 组件库、或要求在 uni-app x 项目中"用组件库写
  xxx 页面"的场景，即使没有明确说"nax-ui"。
---

# nax-ui 组件库使用指南

`nax-ui` 是面向 **uni-app x（uvue）** 的 UI 组件库：52 个 `nax-*` 组件包 + 1 个主题包 + 1 个组合式函数包（`nax-use`）。组件通过
easycom 自动注册，**无需手动 import**，在模板里直接写 `<nax-button>` 即可；组合式函数在 `<script setup>` 中 `import` 使用。

## 使用流程（按顺序执行）

1. **先读索引**：读 `references/component-index.md`，确定要用的组件名与分类（索引里每个组件有一句话说明）。
2. **再读组件详情**：读 `references/components/<组件名>.md`，获取该组件的完整 Props / Events / Slots / 用法示例。
   使用组合式函数时读 `references/components/nax-use.md`（函数速查、返回结构与用法）。
   只需要一个组件时，不要读其他组件的详情文件。
3. **按主题接入章节确认集成方式**（首次集成时必读）：
   - 主题接入：`references/theme-guide.md`
4. **编写代码**时遵守下方「代码规范」，特别是：
   - 组件必须用 `nax-` 前缀
   - 文本样式写在 `<text>` 上，不依赖继承
   - 横向布局必须显式 `flex-direction: row`
   - `#ifdef` 平台差异
5. **检查依赖**：组件卡里的「依赖」列出的 `nax-*` 依赖包，需要同时安装。若项目未安装主题包
   `nax-ui-theme`，组件仍可用（内置 fallback 颜色），但外观可能与文档示例不同。

## 快速上手（最小集成）

```text
安装：将需要的 nax-* 组件包（如 nax-button、nax-input）复制到项目的 uni_modules/ 目录
```

```css
/* App.uvue */
@import "@/uni_modules/nax-ui-theme/theme/default.css";
```

```html
<!-- 页面根节点加 class="nax-theme" -->
<view class="page nax-theme">
  <nax-button type="primary" label="确定" @click="onConfirm"></nax-button>
</view>
```

## 代码规范（uni-app x 硬约束）

违反这些约束的代码在 uni-app x 上可能无法编译或表现异常：

1. **仅 class 选择器**做核心样式；禁止依赖 tag / id / 属性选择器实现关键外观
2. 默认布局按 **flex** 思考；横向必须显式 `flex-direction: row`
3. **文本样式写在 `<text>` 上**，不假设继承（uni-app x 的文字样式不继承）
4. 组件默认样式隔离；对外扩展用 `custom-class`（externalClasses）
5. 组件实现使用 `<script setup lang="uts">` 组合式 API，不用 Options API
6. 平台差异用条件编译 `#ifdef` / `#ifndef` 隔离（如 `APP-ANDROID`、`APP-IOS`、`APP-HARMONY`、
   `WEB`、`MP-WEIXIN`），禁止"统一写法硬扛全端"
7. 事件命名用语义动词：`click` / `change` / `confirm`；布尔 prop 不带 `is` 前缀

## 常见陷阱

- **v-model 形式**：表单控件（input/checkbox/radio/switch/slider/number-box/rate）用
  `v-model`；弹层组件（picker/dialog/action-sheet/calendar）用 `v-model:show`。
  `nax-select` / `nax-datetime-picker` 同时支持 `v-model:show`（显隐）与 `v-model`（选中值）；
  微信小程序端两者改用系统弹层 `picker`，`v-model:show` 不生效（点触发条弹出，见组件卡）。
- **函数式组件**：`nax-toast` 用 `naxToast()` 函数调用，`nax-dialog` 支持
  `naxDialog()`/`naxDialogAlert()`/`naxDialogConfirm()` 命令式调用，需要先挂一次宿主组件
  （见组件卡）。
- **nax-form 校验**：提交时调 `ref.validate()` 返回 Promise；小程序端函数规则可能被过滤，需在
  `onReady` 中 `setRules(rules)`。
- **nax-use 组合式函数**：无头逻辑（不渲染 UI），必须在 `<script setup>` 内同步调用；返回的
  Handle / State 直接读标量或调方法；`useValidate` 依赖 `nax-form`、`useDatetimeParts` 依赖
  `nax-datetime-picker`（安装时自动带依赖）；防抖/节流为单载荷设计，多参数请包对象传入。
- **不要造轮子**：需要哪个能力先查索引——nax-ui 已覆盖按钮/表单/弹窗/列表/导航/反馈等常见场景。

## 主题定制

- 通过 CSS 变量 `--nax-*` 覆盖（每个组件卡里有该组件的 token 表）
- 暗色主题用 `nax-theme-dark` 修饰类，详见 `references/theme-guide.md`
- 弹层内组件如需继承页面主题，弹层内容根节点也要加 `nax-theme` 类
