---
demo: action-sheet
---

# nax-action-sheet

> 当前版本：0.1.6

底部操作菜单（动作面板）。只提供「选项列表 + 取消」语义。

## 安装

- 插件市场：[nax-action-sheet](https://ext.dcloud.net.cn/plugin?id=29020)

easycom 自动生效，页面直接使用 `<nax-action-sheet />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 基础用法

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

```uts
const show = ref(false)
const actions = [
  { name: '分享' },
  { name: '收藏' },
  { name: '删除', type: 'error' }
]

function onSelect(payload: UTSJSONObject) {
  const index = payload.getNumber('index')
  const name = payload.getString('name')
  // ...
}

function onCancel() {
  // 点取消
}
```

:::

::: details 基础

```uvue
<nax-button type="primary" label="打开菜单" @click="openBasic"></nax-button>

<nax-action-sheet
	v-model:show="basicShow"
	:actions="basicActions"
	@select="onSelect"
	@cancel="onCancel"
	@open="onEvent('open')"
	@close="onEvent('close')"
></nax-action-sheet>
```

```uts
const basicShow = ref(false)
const basicActions = [
	{ name: '分享给朋友' },
	{ name: '生成海报', subname: '保存到相册' },
	{ name: '收藏' }
]

function openBasic() {
	basicShow.value = true
}

// select 载荷：{ index: number, name: string }
function onSelect(payload: UTSJSONObject) {
	const name = payload.getString('name')
	uni.showToast({ title: name != null ? name : '', icon: 'none' })
}

function onCancel() {
	// 点击取消或遮罩关闭
}

function onEvent(name: string) {
	console.log(name)
}
```

:::

::: details 标题 / 描述 / 危险项

```uvue
<nax-button label="带标题与删除" @click="openWithTitle"></nax-button>

<nax-action-sheet
	v-model:show="titleShow"
	title="对当前内容"
	description="请选择要执行的操作"
	:actions="titleActions"
	@select="onSelect"
	@cancel="onCancel"
></nax-action-sheet>
```

```uts
const titleShow = ref(false)
const titleActions = [
	{ name: '编辑' },
	{ name: '置顶' },
	{ name: '删除', type: 'error', subname: '删除后不可恢复' }
]

function openWithTitle() {
	titleShow.value = true
}

function onSelect(payload: UTSJSONObject) {
	// index: number, name: string
}

function onCancel() {
	// 点击取消
}
```

:::

::: details 禁用项 / 无取消

```uvue
<nax-button size="sm" label="含禁用项" @click="openDisabled"></nax-button>
<nax-button size="sm" label="隐藏取消" @click="openNoCancel"></nax-button>

<nax-action-sheet
	v-model:show="disabledShow"
	:actions="disabledActions"
	@select="onSelect"
	@cancel="onCancel"
></nax-action-sheet>

<nax-action-sheet
	v-model:show="noCancelShow"
	:show-cancel="false"
	:actions="basicActions"
	@select="onSelect"
></nax-action-sheet>
```

```uts
const disabledShow = ref(false)
const noCancelShow = ref(false)
const basicActions = [
	{ name: '分享给朋友' },
	{ name: '生成海报', subname: '保存到相册' },
	{ name: '收藏' }
]
const disabledActions = [
	{ name: '可选项 A' },
	{ name: '已禁用', disabled: true, subname: '当前不可用' },
	{ name: '可选项 B', type: 'primary' }
]

function openDisabled() {
	disabledShow.value = true
}

function openNoCancel() {
	noCancelShow.value = true
}

function onSelect(payload: UTSJSONObject) {
	// index: number, name: string
}

function onCancel() {
	// 点击取消
}
```

:::

::: details 异步关闭

```uvue
<nax-button size="sm" label="点项不自动关" @click="openAsync"></nax-button>

<nax-action-sheet
	v-model:show="asyncShow"
	title="异步关闭示例"
	description="选中后不会自动关闭，请点取消或遮罩"
	:actions="basicActions"
	:async-close="true"
	@select="onAsyncSelect"
	@cancel="onCancel"
></nax-action-sheet>
```

```uts
const asyncShow = ref(false)
const basicActions = [
	{ name: '分享给朋友' },
	{ name: '生成海报', subname: '保存到相册' },
	{ name: '收藏' }
]

function openAsync() {
	asyncShow.value = true
}

// async-close 下点项不自动关闭，由业务决定何时收起
function onAsyncSelect(payload: UTSJSONObject) {
	const name = payload.getString('name')
	uni.showToast({ title: '已选：' + (name != null ? name : ''), icon: 'none' })
	// 需要时：asyncShow.value = false
}

function onCancel() {
	// 点击取消
}
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 背景色 |
| `--nax-color-bg-hover` | 按压/悬停背景色 |
| `--nax-color-bg-secondary` | 次级背景色 |
| `--nax-color-border` | 边框色 |
| `--nax-color-error` | 错误色 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-text-disabled` | 禁用文字色 |
| `--nax-color-text-secondary` | 次要文字色 |
| `--nax-color-warning` | 警告色 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | boolean | `false` | v-model:show 控制显隐 |
| actions | array | `() => [] as any[]` | 操作项列表（name/text、subname、disabled、type、color） |
| list | array | `() => [] as any[]` | 兼容别名；actions 为空时使用 |
| title | string | `''` | 顶部标题 |
| description | string | `''` | 顶部描述 |
| tips | string | `''` | 同 description（兼容） |
| showCancel | boolean | `true` | 是否显示取消，默认 true |
| cancelText | string | `'取消'` | 取消文案，默认 取消 |
| closeOnSelect | boolean | `true` | 点选项后是否关闭，默认 true |
| asyncClose | boolean | `false` | 为 true 时点选项不自动关闭 |
| round | boolean | `true` | 圆角，默认 true |
| mask | boolean | `true` | 遮罩，默认 true |
| maskClosable | boolean | `true` | 点遮罩关闭，默认 true |
| zIndex | number | `10080` | 层级，默认 10080 |
| duration | number | `280` | 动画 ms，默认 280 |
| safeAreaInsetBottom | boolean | `true` | 底部安全区，默认 true |
| customClass | string | `''` | 根扩展 class |

## actions 项字段

| 字段 | 类型 | 默认 | 说明 |
|------|------|------|------|
| name | string | — | 主文案（优先 `name`，兼容 `text` / `label`） |
| subname | string | `''` | 副文案，显示在主文案下方（优先 `subname`，兼容 `subText` / `description`） |
| disabled | boolean | `false` | 禁用该项：点击不触发事件，文字置灰 |
| type | string | `'default'` | 文案色：`default` 默认 / `error` 错误红（`danger` 同 `error`） |
| color | string | `''` | 自定义文字色，优先于 `type` |

兼容：也可传 `list`（与 `actions` 相同形态；`actions` 优先）。


## Events

| 事件 | 说明 |
|------|------|
| update:show | 显隐变更 |
| select | 选中项，参数 UTSJSONObject（index/name/...） |
| cancel | 点取消 |
| open | 打开开始 |
| opened | 打开完成 |
| close | 关闭完成 |
| click-mask | 点遮罩 |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义整表操作区 |
| header | 自定义顶部 |
| cancel | 自定义取消区 |

## 与 nax-picker 的关系

| 组件 | 职责 |
|------|------|
| `nax-picker` | 通用弹出容器（任意内容 / 四向） |
| `nax-action-sheet` | 标准底部操作列表（组合 picker） |
