# nax-action-sheet

底部操作菜单（动作面板），提供「选项列表 + 取消」语义。

## 用法示例

```uvue
<nax-button label="打开" @click="show = true"></nax-button>
<nax-action-sheet
  v-model:show="show"
  title="请选择操作"
  :actions="actions"
  @select="onSelect"
  @cancel="onCancel"
></nax-action-sheet>
```

## Props — actions 项字段

| 字段 | 类型 | 默认 | 说明 |
|---|---|---|---|
| name | string | — | 主文案（优先 `name`，兼容 `text` / `label`） |
| subname | string | `''` | 副文案，显示在主文案下方（优先 `subname`，兼容 `subText` / `description`） |
| disabled | boolean | `false` | 禁用该项：点击不触发事件，文字置灰 |
| type | string | `'default'` | 文案色：`default` 默认 / `error` 错误红（`danger` 同 `error`） |
| color | string | `''` | 自定义文字色，优先于 `type` |

## Props — Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| show | boolean | false | `v-model:show` 显隐 |
| actions | array | `[]` | 操作项 |
| list | array | `[]` | 兼容别名，仅当 `actions` 为空时使用 |
| title | string | `''` | 顶部标题 |
| description | string | `''` | 顶部描述 |
| tips | string | `''` | 同 description（兼容） |
| showCancel | boolean | true | 是否显示取消 |
| cancelText | string | 取消 | 取消文案 |
| closeOnSelect | boolean | true | 点选项后关闭 |
| asyncClose | boolean | false | 为 true 时点选项不自动关闭（由业务关） |
| round | boolean | true | 圆角 |
| mask | boolean | true | 遮罩 |
| maskClosable | boolean | true | 点遮罩关闭 |
| zIndex | number | 10080 | 层级 |
| duration | number | 280 | 动画 ms |
| safeAreaInsetBottom | boolean | true | 底部安全区 |
| customClass | string | `''` | 根扩展 class |

## Events

| 事件 | 说明 | 参数 |
|---|---|---|
| update:show | 显隐变更 | boolean |
| select | 选中操作项 | `UTSJSONObject`：`index` `name` `disabled` … |
| cancel | 点取消 | — |
| open | 打开开始 | — |
| opened | 打开完成 | — |
| close | 关闭完成 | — |
| click-mask | 点遮罩 | — |

## 依赖

- `nax-picker`
- `nax-ui-theme`（可选，主题 token）
