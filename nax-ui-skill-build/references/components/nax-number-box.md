# nax-number-box

uni-app x 步进器（加减数量）。

## 用法示例

```uvue
<nax-number-box v-model="value" @change="onChange"></nax-number-box>
```

## Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| modelValue | number | `0` | 当前值（`v-model`） |
| min | number | `0` | 最小值 |
| max | number | `999999` | 最大值 |
| step | number | `1` | 步长 |
| integer | boolean | `false` | 是否仅允许整数 |
| disabled | boolean | `false` | 整体禁用 |
| disabledInput | boolean | `false` | 仅禁用中间输入 |
| disablePlus | boolean | `false` | 禁用加号 |
| disableMinus | boolean | `false` | 禁用减号 |
| asyncChange | boolean | `false` | 异步变更：点击后不立刻改内部值，等外部 `v-model` 回写 |
| longPress | boolean | `true` | 长按连续加减 |
| size | string | `md` | `sm` / `md` / `lg` |
| inputWidth | number | `0` | 输入框宽度（px）；`0` 跟随 size |
| buttonSize | number | `0` | 按钮边长（px）；`0` 跟随 size |
| showMinus | boolean | `true` | 显示减号 |
| showPlus | boolean | `true` | 显示加号 |
| bgColor | string | `''` | 按钮/输入背景；空则主题次级背景 |
| color | string | `''` | 文字/图标色；空则主题正文色 |
| cursorSpacing | number | `100` | 键盘与光标间距 |
| customClass | string | `''` | 根节点扩展 class |

## Events

| 事件 | 说明 |
|---|---|
| update:modelValue | v-model |
| change | 值变化（number） |
| focus | 输入框聚焦 |
| blur | 输入框失焦（number） |
| overlimit | 触达边界（`'minus'` / `'plus'`） |
| minus | 点击减号 |
| plus | 点击加号 |

## Slots

| 名称 | 说明 |
|---|---|
| minus | 自定义减号内容 |
| plus | 自定义加号内容 |

## 依赖

- `nax-icon`（加减图标）
- `nax-ui-theme`（CSS 变量 `--nax-*`，安装时依赖 / 运行时弱依赖）
