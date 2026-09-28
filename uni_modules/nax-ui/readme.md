# nax-ui

`nax-ui` 是面向 uni-app x 的 UI 组件套装入口，定位为 **uni-app x 蒸汽模式组件库**：基于原生渲染管线的 vapor 模式（去虚拟 DOM），不承诺 VDOM 渲染模式兼容。

组件源码按独立 `nax-*` uni_modules 发布；本包不重复收录组件源码，而是通过 `package.json` 聚合当前 53 个 `nax-*` 组件包、`nax-ui-theme`（主题）与 `nax-use`（组合式函数）（`nax-video` 独立发布，不在套装内）。可以安装整套，也可以只安装需要的独立组件。

## 官方文档

在线文档与组件示例：[https://www.nax-ui.cn/](https://www.nax-ui.cn/)

## 安装方式

### 整套安装

安装 `nax-ui`。套装依赖以本包 `package.json` 的 `uni_modules.dependencies` 为准。

### 按需安装

只安装需要的 `nax-*` 组件，并按对应组件文档补充它的依赖。

## 支持平台

- Web
- 微信小程序
- App Android
- App iOS
- App HarmonyOS

App 端版本要求：HBuilderX 鸿蒙 5.0+ / iOS 5.11+ / Android 5.21+（需在 `manifest.json` 开启蒸汽模式）；系统要求 Android 6.0+ / iOS 15+ / 鸿蒙 6.0+。Web 与微信小程序不受蒸汽模式影响。

## 主题接入

在 `App.uvue` 引入主题样式：

```css
@import "@/uni_modules/nax-ui-theme/theme/default.css";
```

页面或布局根节点挂载 `class="nax-theme"`。暗色主题使用 `nax-theme-dark` 修饰类，详见 `uni_modules/nax-ui-theme/readme.md`。

## 组合式函数

套装依赖聚合 `nax-use` 包（倒计时、防抖、节流、轮询、本地缓存、表单校验、日期时间 parts），导入方式：

```ts
import { useCountdown } from '@/uni_modules/nax-use/composables/use-countdown.uts'
```

详见 `uni_modules/nax-use/readme.md`。

## 使用示例

`nax-ui` 是套装入口，不是实际渲染组件，不需要也不能写成 `<nax-ui />`。安装完成后直接使用具体组件：

```uvue
<nax-button type="primary" label="确定" @click="onConfirm"></nax-button>
```

