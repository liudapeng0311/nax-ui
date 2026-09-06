
# nax-input

> 当前版本：0.2.6

uni-app x 单行输入框。

## 安装

- 插件市场：[nax-input](https://ext.dcloud.net.cn/plugin?id=29038)

easycom 自动生效，页面直接使用 `<nax-input />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 基础用法
```demo demo-input
<nax-input v-model="value" border placeholder="请输入内容"></nax-input>

<!-- 仅下边框 -->
<nax-input v-model="value" border border-type="bottom" placeholder="下划线风格"></nax-input>
```

### 边框 border / 无边框
```uvue
<nax-input v-model="basic" border placeholder="请输入内容" @change="onChange"></nax-input>
<nax-input v-model="plain" placeholder="无边框输入"></nax-input>
<nax-input v-model="plainBg" background="#f3f3f5" placeholder="无边框 + 背景色"></nax-input>
```

```uts
const basic = ref('')
const plain = ref('')
const plainBg = ref('')

function onChange(val : string) {
	// change 事件
}
```

### 尺寸 size
```uvue
<nax-input v-model="sizeSm" size="sm" border placeholder="sm"></nax-input>
<nax-input v-model="sizeMd" size="md" border placeholder="md"></nax-input>
<nax-input v-model="sizeLg" size="lg" border placeholder="lg"></nax-input>
```

```uts
const sizeSm = ref('')
const sizeMd = ref('')
const sizeLg = ref('')
```

### 密码 password
```uvue
<nax-input v-model="password" type="password" border placeholder="请输入密码" :password-icon="true"></nax-input>
```

```uts
const password = ref('')
```

### 可清除 clearable
```uvue
<nax-input v-model="clearable" border clearable placeholder="有内容时可清除" @clear="onClear"></nax-input>
```

```uts
const clearable = ref('可清除示例')

function onClear() {
	// clear 事件
}
```

### 对齐 input-align
```uvue
<nax-input v-model="alignLeft" border input-align="left" placeholder="left"></nax-input>
<nax-input v-model="alignCenter" border input-align="center" placeholder="center"></nax-input>
<nax-input v-model="alignRight" border input-align="right" placeholder="right"></nax-input>
```

```uts
const alignLeft = ref('左对齐')
const alignCenter = ref('居中')
const alignRight = ref('右对齐')
```

### 前后缀图标
```uvue
<nax-input v-model="withIcon" border prefix-icon="search" suffix-icon="user" placeholder="搜索用户"></nax-input>
```

```uts
const withIcon = ref('')
```

### maxlength + confirm
```uvue
<nax-input v-model="limited" border :maxlength="10" confirm-type="search" placeholder="最多 10 字，键盘 search" @confirm="onConfirm"></nax-input>
```

```uts
const limited = ref('')

function onConfirm(val : string) {
	// confirm: 键盘确认时触发
}
```

### 禁用 / 只读
```uvue
<nax-input v-model="disabledVal" border disabled></nax-input>
<nax-input v-model="readonlyVal" border readonly></nax-input>
```

```uts
const disabledVal = ref('禁用状态')
const readonlyVal = ref('只读状态')
```

### border-type / border-color
```uvue
<nax-input v-model="bottomBorder" border border-type="bottom" placeholder="下划线风格输入"></nax-input>
<nax-input v-model="colorBorder" border border-color="#18a058" placeholder="border-color primary"></nax-input>
```

```uts
const bottomBorder = ref('')
const colorBorder = ref('')
```

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-border-width` | 边框粗细 |
| `--nax-color-bg` | 背景色 |
| `--nax-color-bg-secondary` | 次级背景色 |
| `--nax-color-border` | 边框色 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-text-disabled` | 禁用文字色 |
| `--nax-input-bg` | 输入框背景色 |
| `--nax-opacity-disabled` | 禁用透明度 |

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | string | `''` | v-model 绑定值 |
| type | string | `'text'` | `text` 文本 \| `number` 数字 \| `digit` 小数 \| `tel` 电话 \| `password` 密码 \| `email` 邮箱 \| `url` 链接 \| `nickname` 昵称 \| `safe-password` 安全密码 \| `none`（不支持 select / textarea / idcard） |
| clearable | boolean | `true` | 是否显示清除按钮，默认 true |
| inputAlign | string | `'left'` | `left` 左对齐 \| `center` 居中 \| `right` 右对齐 |
| placeholder | string | `'请输入内容'` | 占位文案 |
| disabled | boolean | `false` | 禁用 |
| readonly | boolean | `false` | 只读（不可编辑，样式弱于 disabled） |
| maxlength | number | `140` | 最大长度；-1 不限制（默认 140，对齐 ） |
| placeholderStyle | string | `'color: #e5e5ea;'` | placeholder 样式字符串 |
| confirmType | string | `'done'` | `done` 完成 \| `send` 发送 \| `search` 搜索 \| `next` 下一项 \| `go` 前往 |
| focus | boolean | `false` | 自动聚焦；运行时置 true 可拉起焦点 |
| passwordIcon | boolean | `true` | type=password 时是否显示可见性切换，默认 true |
| border | boolean | `false` | 是否显示边框，默认 false |
| borderColor | string | `''` | 边框色 |
| height | string | `''` | 高度，数字字符串按 px；空则跟随 size |
| cursorSpacing | number | `0` | 光标与键盘距离 px |
| selectionStart | number | `-1` | 聚焦时选区起点 |
| selectionEnd | number | `-1` | 聚焦时选区终点 |
| trim | boolean | `true` | 失焦时去掉两端空格，默认 true |
| confirmHold | boolean | `false` | 点完成是否保持键盘 |
| adjustPosition | boolean | `true` | 键盘弹起是否上推页面 |
| holdKeyboard | boolean | `false` | 聚焦时点页面不收起键盘 |
| size | string | `'md'` | `sm` 小 \| `md` 中 \| `lg` 大 |
| prefixIcon | string | `''` | 前缀 nax-icon 名 |
| suffixIcon | string | `''` | 后缀 nax-icon 名 |
| customClass | string | `''` | 根节点扩展 class |
| borderType | string | — | `surround` 四边（默认）\| `bottom` 仅下边框 |
| background | string | — | 背景色；无边框默认透明，有值时覆盖 |

## 类型 type

| 值 | 说明 |
|----|------|
| `text` | 文本（默认） |
| `password` | 密码（可配 `password-icon` 切换可见） |
| `number` | 数字键盘 |
| `digit` | 带小数点数字键盘 |
| `tel` | 电话键盘 |
| `email` / `url` / `nickname` / `safe-password` / `none` | 透传原生 input type |

传入 `select` / `textarea` / `idcard` 会回落为 `text`。

## 类型 type

```uvue
<nax-input v-model="typeText" type="text" border placeholder="text"></nax-input>
<nax-input v-model="typeNumber" type="number" border placeholder="number"></nax-input>
<nax-input v-model="typeDigit" type="digit" border placeholder="digit"></nax-input>
<nax-input v-model="typeTel" type="tel" border placeholder="tel"></nax-input>
```

```uts
const typeText = ref('')
const typeNumber = ref('')
const typeDigit = ref('')
const typeTel = ref('')
```

## Events

| 事件 | 说明 |
|------|------|
| update:modelValue | v-model |
| input | 输入变化（当前值），输入过程中每次触发 |
| change | 失焦时内容与聚焦时不同才触发（当前值），对齐原生 input 语义 |
| focus | 聚焦（当前值） |
| blur | 失焦（当前值） |
| confirm | 键盘完成（当前值） |
| click | 点击输入区域 |
| clear | 点击清除 |

## Slots

| 插槽 | 说明 |
|------|------|
| prefix | 自定义前缀 |
| suffix | 自定义后缀 |

## 平台说明

- 基于原生 `input`，键盘类型随端能力差异以官方文档为准。
- `readonly` 通过禁用原生编辑实现（样式弱于 `disabled`）。
- Android 暗黑模式下跨组件 CSS 变量可能失效，请通过 `custom-class` 传入 `nax-theme-dark`。
