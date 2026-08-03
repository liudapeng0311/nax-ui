---
demo: switch
---

# nax-switch

uni-app x 开关，功能覆盖常用场景。

## 安装

```text
uni_modules/nax-switch
```

easycom 自动生效，页面直接使用 `<nax-switch />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

> 当前版本：0.1.2（见 `changelog.md`）

## 代码示例

### 基础用法

```uvue
<nax-switch v-model="checked" @change="onChange"></nax-switch>
```

### 主题 Token

- `--nax-color-primary` 默认打开色
- `--nax-color-border` 默认关闭色
- `--nax-color-bg` 滑块底色
- `--nax-color-text-secondary` 关闭态 loading 图标色
- `--nax-opacity-disabled` 禁用透明度
- `--nax-radius-full` 胶囊圆角

### 设计说明

- 尺寸统一为 `sm | md | lg`（不用 rpx 数字作默认 API）
- `v-model` 固定为 boolean（自定义 open/close 值可在业务层映射）
- 不提供 `customStyle` 泛样式入口，扩展用 `customClass` + CSS 变量
- 滑块位移用 flex `justify-content`，避免依赖 transform 平移


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | boolean | `false` | 开关状态（v-model） |
| disabled | boolean | `false` | 禁用 |
| loading | boolean | `false` | 加载中（阻止切换） |
| size | string | `'md'` | sm \| md \| lg |
| activeColor | string | `''` | 打开时轨道色；空则主题 primary |
| inactiveColor | string | `''` | 关闭时轨道色；空则边框灰 |
| vibrateShort | boolean | `false` | 切换时短震动（支持端生效） |
| customClass | string | `''` | 根节点扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| update:modelValue | v-model |
| change | 状态变化（boolean） |

