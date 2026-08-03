---
demo: action-sheet
---

# nax-action-sheet

底部操作菜单（动作面板）。内部薄封装 `nax-picker`（`position=bottom`），只提供「选项列表 + 取消」语义。
自定义任意底部内容请直接用 `nax-picker`。

## 安装

```text
uni_modules/nax-action-sheet
```

easycom 自动生效，页面直接使用 `<nax-action-sheet />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

> 当前版本：0.1.0（见 `changelog.md`）

## 代码示例

### 基础用法

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

### actions 项字段

| 字段 | 说明 |
|------|------|
| `name` / `text` / `label` | 主文案（优先 `name`） |
| `subname` / `subText` / `description` | 副文案 |
| `disabled` | 禁用 |
| `type` | `default` / `error`（`danger` 兼容） |
| `color` | 可选自定义文字色（优先于 type） |

兼容：也可传 `list`（与 `actions` 相同形态；`actions` 优先）。

### 事件

| 事件 | 说明 | 参数 |
|------|------|------|
| update:show | 显隐变更 | boolean |
| select | 选中操作项 | `UTSJSONObject`：`index` `name` `disabled` … |
| cancel | 点取消 | — |
| open | 打开开始 | — |
| opened | 打开完成 | — |
| close | 关闭完成 | — |
| click-mask | 点遮罩 | — |

### 与 nax-picker 的关系

| 组件 | 职责 |
|------|------|
| `nax-picker` | 通用弹出容器（任意内容 / 四向） |
| `nax-action-sheet` | 标准底部操作列表（组合 picker） |


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
