# nax-switch

uni-app x 开关，功能覆盖常用场景。

## 用法示例

```uvue
<nax-switch v-model="checked" @change="onChange"></nax-switch>
```

## Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
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
|---|---|
| update:modelValue | v-model |
| change | 状态变化（boolean） |

## 依赖

- `nax-icon`（loading 图标）
- `nax-ui-theme`（CSS 变量 `--nax-*`，安装时依赖 / 运行时弱依赖）
