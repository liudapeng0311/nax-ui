# 快速开始

`nax-ui` 是面向 **uni-app x**（uvue）的通用 UI 组件库。组件以独立 `uni_modules` 插件包形式发布，通过 easycom 自动注册，无需手动 import。

## 环境要求

- HBuilderX（uni-app x 项目）或 uni-app x CLI 工程
- 项目语言：uvue（`<script setup lang="uts">`）
- 渲染模式：蒸汽模式优先（组件按样式隔离 2.0 设计）

## 安装组件

将组件包目录复制到项目的 `uni_modules/` 下即可，例如：

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

`nax-ui-theme` 提供统一的 `--nax-*` CSS 变量。组件未接主题时也有内置 fallback，但正式业务建议至少完成 L1 接入：

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

完整分档（L0 默认色 / L1 启动配置 / L2 运行时切换）见 [主题接入](./theme)。

## 与本仓库的关系

| 路径 | 角色 |
|------|------|
| `uni_modules/nax-*` | 50 个独立组件插件包 + 1 个主题包 |
| `pages/components/<name>/index.uvue` | 宿主工程内每个组件的可运行 demo |
| `docs/` | 设计规范与组件清单（`docs/design-system.md`、`docs/component-inventory.md`） |
| `docs-site/` | 本文档站（VitePress） |

> 本站点为静态 API 文档与用法示例；真实交互效果请在宿主工程中运行对应组件 demo 页（`pages/components/<name>/index`）查看。

## 本地运行文档站

```bash
cd docs-site
npm install
npm run gen        # 组件源码变更后重新生成组件文档页
npm run sync:demo  # 同步宿主工程 Web 构建（unpackage/dist/build/web → public/demo），实时演示区依赖它
npm run dev
```

> 每个组件文档页右侧的「实时演示」区加载的是宿主工程编译出的 Web 版 demo（`pages/components/<name>/index`）。若该区域空白，请先在 HBuilderX 中对宿主工程执行「发行 → 网站-PC Web 或手机H5」，再运行 `npm run sync:demo`。

## 平台差异说明

组件在必要处使用条件编译处理端差异（`#ifdef APP-HARMONY` / `APP-ANDROID` / `MP-WEIXIN` / `WEB` 等），例如鸿蒙的动画与滚动行为、微信小程序的弹层降级等。各组件页与 `docs/` 内文档会标注已知差异。
