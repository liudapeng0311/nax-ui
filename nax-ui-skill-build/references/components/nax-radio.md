# nax-radio

uni-app x 单选框 / 单选框组，功能覆盖常用场景。

## 用法示例

```uvue
<nax-radio v-model="checked" label="默认选项" @change="onChange"></nax-radio>
```

```uvue
<nax-radio-group v-model="value" @change="onGroupChange">
  <nax-radio name="apple" label="苹果"></nax-radio>
  <nax-radio name="banana" label="香蕉"></nax-radio>
  <nax-radio name="orange" label="橙子"></nax-radio>
</nax-radio-group>
```

## Props — nax-radio Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| modelValue | boolean | `false` | 单独使用时的选中态（`v-model`） |
| name | string | `''` | 组内选项标识 |
| value | string | `''` | 组内选项标识，优先级高于 `name` |
| label | string | `''` | 右侧文案 |
| shape | string | `circle` | `circle` / `square`；组内可被 group 覆盖 |
| size | string | `md` | `sm` / `md` / `lg` |
| disabled | boolean | `false` | 禁用 |
| labelDisabled | boolean | `false` | 为 `true` 时点击文案不切换 |
| activeColor | string | `''` | 选中色；空则 `--nax-color-primary` |
| iconSize | string | `''` | 勾选图标字号（数字字符串 px） |
| labelSize | string | `''` | 文案字号（数字字符串 px） |
| customClass | string | `''` | 根节点扩展 class |

## Props — nax-radio-group Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| modelValue | string | `''` | 当前选中标识（`v-model`） |
| disabled | boolean | `false` | 整组禁用 |
| shape | string | `circle` | 统一子项形状 |
| size | string | `md` | 统一子项尺寸 |
| activeColor | string | `''` | 统一选中色 |
| iconSize | string | `''` | 统一图标字号 |
| labelSize | string | `''` | 统一文案字号 |
| labelDisabled | boolean | `false` | 统一：文案是否不可点选 |
| wrap | boolean | `false` | 每个选项独占一行 |
| width | string | `''` | 子项宽度（如 `50%` / `120px`） |
| customClass | string | `''` | 根节点扩展 class |

## Events — nax-radio Events

| 事件 | 说明 |
|---|---|
| update:modelValue | 单独使用时的 v-model |
| change | 选中态变化；组内为选项 name（string），单独为 boolean |

## Events — nax-radio-group Events

| 事件 | 说明 |
|---|---|
| update:modelValue | v-model |
| change | 选中值变化（string） |

## 依赖

- `nax-icon`（勾选图标）
- `nax-ui-theme`（CSS 变量 `--nax-*`，安装时依赖 / 运行时弱依赖）
