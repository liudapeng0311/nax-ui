# nax-dialog

居中对话框（确认 / 告警）。

## 用法示例

```uvue
<nax-button label="打开" @click="show = true"></nax-button>
<nax-dialog
  v-model:show="show"
  title="提示"
  content="确定执行该操作吗？"
  @confirm="onConfirm"
  @cancel="onCancel"
></nax-dialog>
```

```uvue
<nax-dialog v-model:show="show" title="协议" :show-cancel="true" confirm-text="同意">
  <view class="custom">
    <text>这里可以放自定义布局</text>
  </view>
</nax-dialog>
```

## Props — Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| show | boolean | false | `v-model:show` 显隐 |
| title | string | `''` | 标题 |
| content | string | `''` | 内容 |
| message | string | `''` | 同 content（兼容） |
| showCancel | boolean | true | 显示取消 |
| showConfirm | boolean | true | 显示确定 |
| cancelText | string | 取消 | 取消文案 |
| confirmText | string | 确定 | 确定文案 |
| confirmType | string | primary | primary / info / success / warning / error / default |
| asyncClose | boolean | false | 点确定不自动关闭 |
| mask | boolean | true | 遮罩 |
| maskClosable | boolean | false | 点遮罩关闭（默认不关，更安全） |
| closeOnMask | boolean | false | 同 maskClosable |
| closeOnClickOverlay | boolean | false | 同 maskClosable |
| round | boolean | true | 圆角 |
| width | string | `''` | 宽度（空则走 picker 居中默认） |
| zIndex | number | 10085 | 层级 |
| duration | number | 280 | 动画 ms |
| customClass | string | `''` | 根扩展 class |

## Props — 命令式 API

| 字段 | 类型 | 默认 | 说明 |
|---|---|---|---|
| title | string | `''` | 标题文案（显示在内容上方，加粗） |
| content | string | `''` | 正文文案；传 string 时等价于只传 content |
| message | string | `''` | 兼容字段，同 `content` |
| showCancel | boolean | `true` | 是否显示取消按钮 |
| showConfirm | boolean | `true` | 是否显示确认按钮 |
| cancelText | string | `'取消'` | 取消按钮文案 |
| confirmText | string | `'确认'` | 确认按钮文案 |
| confirmType | string | `'primary'` | 确认按钮色：`primary` 主要 / `info` 信息 / `success` 成功 / `warning` 警告 / `error` 错误（`danger` 同 `error`）/ `default` 默认 |
| confirmButtonType | string | `'primary'` | 兼容字段，同 `confirmType` |
| maskClosable | boolean | `false` | 点遮罩是否关闭弹层 |
| closeOnClickOverlay | boolean | `false` | 兼容字段，同 `maskClosable` |
| asyncClose | boolean | `false` | `true` 时点击确认不自动关闭，由业务手动关闭（异步提交场景） |
| width | string | `''` | 对话框宽度；纯数字按 px |

## Events

| 事件 | 说明 |
|---|---|
| update:show | 显隐变更 |
| confirm | 点确定 |
| cancel | 点取消；或点遮罩关闭时 |
| open | 打开开始 |
| opened | 打开完成 |
| close | 关闭完成 |
| click-mask | 点遮罩 |

## Slots

| 插槽 | 说明 |
|---|---|
| default | 自定义内容区（替代 content 文案） |
| title | 自定义标题 |
| footer | 自定义底部按钮区 |

## Methods（ref 调用）

| 方法 | 说明 |
|---|---|
| `naxDialog(input?)` | 通用打开，默认双按钮 |
| `naxDialogAlert(input?)` | 告警，默认仅确定 |
| `naxDialogConfirm(input?)` | 确认，默认取消+确定 |
| `hideNaxDialog()` / `closeNaxDialog()` | 关闭当前命令式对话框 |

## 依赖

- `nax-picker`
- `nax-ui-theme`（可选，主题 token）
