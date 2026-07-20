# nax-dialog

居中对话框（确认 / 告警）。内部薄封装 `nax-picker`（`position=center`）。

支持两种用法：

1. **声明式**：页面里写 `<nax-dialog v-model:show>`，可插槽自定义内容
2. **命令式**：全局挂一次宿主后，业务只调 `naxDialog()` / `naxDialogAlert()` / `naxDialogConfirm()`

自定义任意复杂弹层请直接用 `nax-picker`。

## 依赖

- `nax-picker`
- `nax-ui-theme`（可选，主题 token）

easycom 自动注册：页面内直接使用 `<nax-dialog>`。

## 声明式用法

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

```uts
const show = ref(false)

function onConfirm() {
  // 点确定
}

function onCancel() {
  // 点取消或遮罩关闭（需 maskClosable）
}
```

### 自定义内容

```uvue
<nax-dialog v-model:show="show" title="协议" :show-cancel="true" confirm-text="同意">
  <view class="custom">
    <text>这里可以放自定义布局</text>
  </view>
</nax-dialog>
```

更复杂的居中/底部弹层请用 `nax-picker`。

## 命令式用法

### 1. 全局挂一次宿主

```html
<nax-dialog />
```

> 与 toast 相同：挂在常驻根布局；演示页可本地挂。  
> 未挂宿主时回退 `uni.showModal`。

### 2. 业务只调方法

```uts
import {
  naxDialog,
  naxDialogAlert,
  naxDialogConfirm,
  hideNaxDialog
} from '@/uni_modules/nax-dialog/index.uts'

// 确认框（默认双按钮）
naxDialogConfirm({
  title: '删除',
  content: '删除后不可恢复',
  confirmType: 'error'
}).then((res) => {
  if (res.getBoolean('confirm') == true) {
    // 用户点了确定
  }
})

naxDialogConfirm({ title: '提示', content: '继续？' }).then((res) => {
  const action = res.getString('action') // confirm | cancel
})

// 告警（仅确定）
naxDialogAlert('保存成功')
naxDialogAlert({ title: '提示', content: '网络已恢复' })

// 通用入口
naxDialog({
  title: '提示',
  content: '自定义双按钮',
  showCancel: true
})
```

### asyncClose（异步关闭）

```uts
naxDialogConfirm({
  title: '提交',
  content: '确认提交？',
  asyncClose: true
}).then((res) => {
  if (res.getBoolean('confirm') == true) {
    // 请求中…结束后再关
    // hideNaxDialog()
  }
})
```

## Props

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
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

## 事件

| 事件 | 说明 |
|------|------|
| update:show | 显隐变更 |
| confirm | 点确定 |
| cancel | 点取消；或点遮罩关闭时 |
| open | 打开开始 |
| opened | 打开完成 |
| close | 关闭完成 |
| click-mask | 点遮罩 |

## 命令式 API

| 方法 | 说明 |
|------|------|
| `naxDialog(input?)` | 通用打开，默认双按钮 |
| `naxDialogAlert(input?)` | 告警，默认仅确定 |
| `naxDialogConfirm(input?)` | 确认，默认取消+确定 |
| `hideNaxDialog()` / `closeNaxDialog()` | 关闭当前命令式对话框 |

`input` 可为 string（content）或 object：

| 字段 | 说明 |
|------|------|
| title / content / message | 文案 |
| showCancel / showConfirm | 按钮显隐 |
| cancelText / confirmText | 按钮文案 |
| confirmType / confirmButtonType | 确定按钮色 |
| maskClosable / closeOnClickOverlay | 遮罩关闭 |
| asyncClose | 异步关闭 |
| width | 宽度 |

返回 `Promise<UTSJSONObject>`，字段同上。

## 插槽

| 插槽 | 说明 |
|------|------|
| default | 自定义内容区（替代 content 文案） |
| title | 自定义标题 |
| footer | 自定义底部按钮区 |

## 与 nax-picker / toast 的关系

| 组件 | 职责 |
|------|------|
| `nax-picker` | 通用弹出容器（任意内容 / 四向） |
| `nax-dialog` | 标准确认/告警（组合 picker + 可选命令式） |
| `nax-toast` | 短反馈提示（命令式） |
| `nax-action-sheet` | 底部操作列表 |
