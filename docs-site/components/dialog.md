---
demo: dialog
---

# nax-dialog

> 当前版本：0.2.3

居中对话框（确认 / 告警）。

1. **声明式**：页面里写 `<nax-dialog v-model:show>`，可插槽自定义内容
2. **命令式**：全局挂一次宿主后，业务只调 `naxDialog()` / `naxDialogAlert()` / `naxDialogConfirm()`
自定义任意复杂弹层请直接用 `nax-picker`。

## 安装

- 插件市场：[nax-dialog](https://ext.dcloud.net.cn/plugin?id=29031)

easycom 自动生效，页面直接使用 `<nax-dialog />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 声明式用法

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

:::

::: details 命令式用法

### 1. 全局挂一次宿主

```html
<nax-dialog />
```

> 与 toast 相同：挂在常驻根布局。  
> 未挂宿主时回退 `uni.showModal`。

### 2. 业务只调方法

```uts
import {
  naxDialog as showNaxDialog,
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
showNaxDialog({
  title: '提示',
  content: '自定义双按钮',
  showCancel: true
})
```

> 微信小程序端：若当前 SFC 同时挂载 `<nax-dialog />` 并导入 `naxDialog`，请像上例一样给函数设置本地别名。`naxDialog` 会与组件标签映射到同一个驼峰名，导致 `MP-WEIXIN` 未注册宿主组件；声明式与命令式按钮都会表现为点击无反应。仅调用函数、不挂载宿主的业务页可继续直接导入 `naxDialog`。

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

:::

::: details 命令式 API

| 方法 | 说明 |
|------|------|
| `naxDialog(input?)` | 通用打开，默认双按钮 |
| `naxDialogAlert(input?)` | 告警，默认仅确定 |
| `naxDialogConfirm(input?)` | 确认，默认取消+确定 |
| `hideNaxDialog()` / `closeNaxDialog()` | 关闭当前命令式对话框 |

`input` 可为 string（content）或 object：

| 字段 | 类型 | 默认 | 说明 |
|------|------|------|------|
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

返回 `Promise<UTSJSONObject>`，字段同上。

:::

::: details 声明式 · 基础确认

```uvue
<nax-button type="primary" label="打开确认框" @click="basicShow = true"></nax-button>

<nax-dialog
	v-model:show="basicShow"
	title="提示"
	content="确定执行该操作吗？"
	@confirm="onConfirm"
	@cancel="onCancel"
></nax-dialog>
```

```uts
const basicShow = ref(false)

function onConfirm() {
	// 点击确定
}

function onCancel() {
	// 点击取消
}
```

:::

::: details 声明式 · 告警（仅确定）

show-cancel 隐藏取消按钮，confirm-text 自定义确定文案。

```uvue
<nax-button label="打开告警" @click="alertShow = true"></nax-button>

<nax-dialog
	v-model:show="alertShow"
	title="提示"
	content="操作已完成"
	:show-cancel="false"
	confirm-text="我知道了"
	@confirm="onConfirm"
></nax-dialog>
```

```uts
const alertShow = ref(false)

function onConfirm() {
	// 点击确定
}
```

:::

::: details 声明式 · 危险操作

confirm-type 指定确定按钮语义色。

```uvue
<nax-button type="error" label="删除确认" @click="dangerShow = true"></nax-button>

<nax-dialog
	v-model:show="dangerShow"
	title="删除确认"
	content="删除后不可恢复，是否继续？"
	confirm-text="删除"
	confirm-type="error"
	@confirm="onConfirm"
	@cancel="onCancel"
></nax-dialog>
```

```uts
const dangerShow = ref(false)

function onConfirm() {
	// 点击确定
}

function onCancel() {
	// 点击取消
}
```

:::

::: details 声明式 · 自定义内容插槽

默认插槽自定义内容区。

```uvue
<nax-button type="info" label="自定义内容" @click="customShow = true"></nax-button>

<nax-dialog
	v-model:show="customShow"
	title="用户协议"
	confirm-text="同意"
	cancel-text="拒绝"
	@confirm="onConfirm"
	@cancel="onCancel"
>
	<text class="dialog-content" :lines="6">请阅读并同意服务条款与隐私政策。本示例用默认插槽自定义内容区。</text>
</nax-dialog>
```

```uts
const customShow = ref(false)

function onConfirm() {
	// 点击确定
}

function onCancel() {
	// 点击取消
}
```

:::

::: details 声明式 · 异步关闭

async-close 开启后点确定不会自动关闭，需业务在请求结束后手动关 show。

```uvue
<nax-button label="asyncClose" @click="asyncShow = true"></nax-button>
<nax-button size="sm" label="手动关闭" @click="asyncShow = false"></nax-button>

<nax-dialog
	v-model:show="asyncShow"
	title="提交"
	content="确认提交当前内容？"
	:async-close="true"
	@confirm="onAsyncConfirm"
	@cancel="onCancel"
></nax-dialog>
```

```uts
const asyncShow = ref(false)

// 模拟异步请求：结束后手动关闭
function onAsyncConfirm() {
	setTimeout(() => {
		asyncShow.value = false
	}, 1500)
}

function onCancel() {
	// 点击取消
}
```

:::

::: details 命令式 · API

宿主与 toast 相同，全局挂一次即可；未挂载时回退系统 showModal。

```uvue
<nax-button size="sm" type="primary" label="naxDialogConfirm" @click="onApiConfirm"></nax-button>
<nax-button size="sm" label="naxDialogAlert" @click="onApiAlert"></nax-button>
<nax-button size="sm" type="error" label="危险确认" @click="onApiDanger"></nax-button>
<nax-button size="sm" label="Promise" @click="onApiPromise"></nax-button>

<!-- 命令式宿主：须放在声明式实例之后 -->
<nax-dialog></nax-dialog>
```

```uts
import {
	naxDialog as showNaxDialog,
	naxDialogAlert,
	naxDialogConfirm
} from '@/uni_modules/nax-dialog/index.uts'

function onApiConfirm() {
	naxDialogConfirm({
		title: '确认',
		content: '使用命令式打开确认框'
	} as UTSJSONObject).then((res: UTSJSONObject) => {
		if (res.getBoolean('confirm') == true) {
			// 已确定
		}
	})
}

function onApiAlert() {
	naxDialogAlert({
		title: '提示',
		content: '这是一条告警信息'
	} as UTSJSONObject).then((res: UTSJSONObject) => {
		const action = res.getString('action')
		// action：'confirm' | 'cancel'
	})
}

function onApiDanger() {
	naxDialogConfirm({
		title: '删除',
		content: '删除后不可恢复',
		confirmText: '删除',
		confirmType: 'error'
	} as UTSJSONObject).then((res: UTSJSONObject) => {
		if (res.getBoolean('confirm') == true) {
			// 已删除
		}
	})
}

function onApiPromise() {
	showNaxDialog({
		title: 'Promise',
		content: '等待你的选择',
		showCancel: true
	} as UTSJSONObject).then((res: UTSJSONObject) => {
		const action = res.getString('action')
		// action：'confirm' | 'cancel'
	})
}
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 背景色 |
| `--nax-color-bg-hover` | 按压/悬停背景色 |
| `--nax-color-border` | 边框色 |
| `--nax-color-error` | 错误色 |
| `--nax-color-info` | 信息色 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-success` | 成功色 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-text-secondary` | 次要文字色 |
| `--nax-color-warning` | 警告色 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | boolean | `false` | v-model:show 显隐（声明式） |
| title | string | `''` | 标题 |
| content | string | `''` | 内容文案 |
| message | string | `''` | 同 content（兼容） |
| showCancel | boolean | `true` | 显示取消，默认 true |
| showConfirm | boolean | `true` | 显示确定，默认 true |
| cancelText | string | `'取消'` | 取消文案 |
| confirmText | string | `'确定'` | 确定文案 |
| confirmType | string | `'primary'` | `primary` 主要 \| `info` 信息 \| `success` 成功 \| `warning` 警告 \| `error` 错误 \| `default` 默认；默认 `primary` |
| asyncClose | boolean | `false` | 点确定不自动关闭，业务自行关 |
| mask | boolean | `true` | 遮罩，默认 true |
| maskClosable | boolean | `false` | 点遮罩关闭，默认 false |
| closeOnMask | boolean | `false` | 同 maskClosable |
| closeOnClickOverlay | boolean | `false` | 同 maskClosable |
| round | boolean | `true` | 圆角，默认 true |
| width | string | `''` | 面板宽度 |
| zIndex | number | `10085` | 层级，默认 10085 |
| duration | number | `280` | 动画 ms，默认 280 |
| customClass | string | `''` | 根扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| update:show | 显隐变更 |
| confirm | 点确定 |
| cancel | 点取消 / 遮罩关闭（声明式） |
| open | 打开开始 |
| opened | 打开完成 |
| close | 关闭完成 |
| click-mask | 点遮罩 |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义内容区 |
| title | 自定义标题 |
| footer | 自定义底部 |

## 与 nax-picker / toast 的关系

| 组件 | 职责 |
|------|------|
| `nax-picker` | 通用弹出容器（任意内容 / 四向） |
| `nax-dialog` | 标准确认/告警（组合 picker + 可选命令式） |
| `nax-toast` | 短反馈提示（命令式） |
| `nax-action-sheet` | 底部操作列表 |
