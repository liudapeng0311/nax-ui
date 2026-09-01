# nax-ui

面向 **uni-app x**（uvue）的通用 UI 组件库，默认以**蒸汽模式（Vapor）**为基准开发与验证。

`nax-ui` 只做一件事：让 uni-app x 的组件开发像现代前端一样高效——组合式 API、`--nax-*` CSS 变量主题化、easycom 即装即用，不承诺 VDOM 渲染模式兼容，也不维护老 uni-app 双栈。

## 特性

- **uvue 原生**：全部组件基于 uvue + `<script setup lang="uts">` 实现，无中间层、无双栈
- **蒸汽模式优先**：以 uni-app x 蒸汽渲染模式为唯一基准，样式约束（class 选择器 + CSS 变量）贴合 ucss
- **统一主题**：`nax-ui-theme` 主题包 + `--nax-*` token，一套变量驱动全库
- **即装即用**：`uni_modules` 单包结构 + easycom 自动注册，按需安装单个组件即可
- **组合式函数**：`nax-use` 提供倒计时、防抖节流、响应式缓存、表单校验等无头逻辑

## 支持平台

Web / 微信小程序 / App Android / App iOS / App HarmonyOS

App 端版本门槛：HBuilderX 鸿蒙 5.0+ / iOS 5.11+ / Android 5.21+（需开启蒸汽模式）；系统要求 Android 6.0+ / iOS 15+ / 鸿蒙 6.0+（API 20+）。

## 快速开始

将 `uni_modules/` 下的组件包（或整套 `nax-ui`）拷贝到你的 uni-app x 工程，easycom 自动生效：

```html
<nax-button type="primary" label="确定"></nax-button>
```

推荐同时安装主题包并引入：

```css
/* App.uvue */
@import "@/uni_modules/nax-ui-theme/theme/default.css";
```

页面根节点加 `class="nax-theme"`（暗色用 `nax-theme-dark`）。

## 文档

- 在线文档与组件示例：[https://nax-ui.cn/](https://nax-ui.cn/)
- 组件清单与设计规范：`docs/component-inventory.md`、`docs/design-system.md`

## 仓库结构

```text
uni_modules/            # 组件包（nax-* 独立发布，nax-ui 为套装聚合入口）
  nax-ui/               # 套装入口（仅聚合依赖）
  nax-ui-theme/         # 主题 token 包
  nax-use/              # 组合式函数包
docs/                   # 设计规范与组件清单
docs-site/              # VitePress 文档站（nax-ui.cn 源码）
pages/                  # 演示宿主工程（组件 demo）
```

## 许可

[MIT](LICENSE)