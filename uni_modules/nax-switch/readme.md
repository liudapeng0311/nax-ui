# nax-switch

uni-app x 开关，功能主要对齐 [uView Pro Switch](https://uviewpro.cn/zh/components/switch.html)。

## 依赖

- `nax-icon`（loading 图标）
- `nax-ui-theme`（CSS 变量 `--nax-*`，安装时依赖 / 运行时弱依赖）

## 基础用法

```uvue
<nax-switch v-model="checked" @change="onChange"></nax-switch>
```

## Props

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| modelValue | boolean | `false` | 开关状态（`v-model`） |
| disabled | boolean | `false` | 禁用 |
| loading | boolean | `false` | 加载中，阻止切换 |
| size | string | `md` | `sm` / `md` / `lg` |
| activeColor | string | `''` | 打开时轨道色；空则 `--nax-color-primary` |
| inactiveColor | string | `''` | 关闭时轨道色；空则 `--nax-color-border` |
| vibrateShort | boolean | `false` | 切换时短震动（App / 微信小程序等） |
| customClass | string | `''` | 根节点扩展 class |

## Events

| 事件 | 说明 |
|------|------|
| update:modelValue | v-model |
| change | 状态变化（boolean） |

## 主题 Token

- `--nax-color-primary` 默认打开色
- `--nax-color-border` 默认关闭色
- `--nax-color-bg` 滑块底色
- `--nax-color-text-secondary` 关闭态 loading 图标色
- `--nax-opacity-disabled` 禁用透明度
- `--nax-radius-full` 胶囊圆角

## 与 uView Pro 差异（有意）

- 尺寸统一为 `sm | md | lg`（不用 rpx 数字作默认 API）
- `v-model` 固定为 boolean（自定义 open/close 值可在业务层映射）
- 不提供 `customStyle` 泛样式入口，扩展用 `customClass` + CSS 变量
- 滑块位移用 flex `justify-content`，避免依赖 transform 平移