# nax-ui

uni-app x 通用 UI 相关插件集合（当前以**独立插件**为主，不强制单包套装）。

`nax-ui` 套装入口通过 `package.json` 聚合当前全部 50 个 `nax-*` 组件包与 `nax-ui-theme`；按需使用时仍可只安装独立插件。

## 已有插件

| 插件 | 说明 |
|------|------|
| `nax-ui-theme` | 主题 token 约定包（CSS 变量） |
| `nax-button` | 通用按钮 |
| `nax-badge` | 徽标 |
| `nax-avatar` | 头像 |
| `nax-icon` | 字体图标（Tabler Icons 语义子集） |
| `nax-swiper` | 轮播（原生 swiper 封装） |
| `nax-image` | 图片（原生 image 封装，加载/失败占位） |
| `nax-tag` | 标签 |
| `nax-number-box` | 步进器（支持 NumberBox） |
| `nax-rate` | 评分（支持 Rate） |
| `nax-toast` | 轻提示（函数式 naxToast） |
| `nax-dialog` | 对话框（声明式 + 函数式 naxDialog） |
| `nax-nav-bar` | 自定义顶部导航栏（状态栏 / fixed 占位 / 返回栈） |
| `nax-list` | 滚动列表壳（触底加载 / 空错底态） |
| `nax-virtual-list` | 固定行高虚拟列表（窗口裁剪） |

## 推荐接入

1. 安装 `nax-ui-theme`
2. `App.uvue` 引入 `theme/default.css`
3. 安装需要的 `nax-*` 组件插件

详见：`docs/theme.md`、`docs/component-inventory.md`。
