# nax-ui

uni-app x 通用 UI 相关插件集合（当前以**独立插件**为主，不强制单包套装）。

## 已有插件

| 插件 | 说明 |
|------|------|
| `nax-ui-theme` | 主题 token 约定包（CSS 变量） |
| `nax-button` | 通用按钮 |
| `nax-badge` | 徽标 |
| `nax-avatar` | 头像 |
| `nax-icon` | 字体图标（Lucide 语义子集） |
| `nax-swiper` | 轮播（原生 swiper 封装） |
| `nax-image` | 图片（原生 image 封装，加载/失败占位） |
| `nax-tag` | 标签（对齐 Naive Tag） |
| `nax-number-box` | 步进器（对齐 uView Pro NumberBox） |
| `nax-rate` | 评分（对齐 uView Pro Rate） |

## 推荐接入

1. 安装 `nax-ui-theme`
2. `App.uvue` 引入 `theme/default.css`
3. 安装需要的 `nax-*` 组件插件

详见：`docs/theme.md`、`docs/component-inventory.md`。

