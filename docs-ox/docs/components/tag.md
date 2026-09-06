
# nax-tag

> 当前版本：0.1.6

标签。提供常用能力。

## 安装

- 插件市场：[nax-tag](https://ext.dcloud.net.cn/plugin?id=29071)

easycom 自动生效，页面直接使用 `<nax-tag />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 用法
```demo demo-tag
<nax-tag label="标签"></nax-tag>
<nax-tag type="success" label="成功"></nax-tag>
<nax-tag type="error" closable label="可关闭" @close="onClose"></nax-tag>
<nax-tag checkable :checked="checked" @update:checked="onChecked">可选</nax-tag>
```

### 基础
```uvue
<nax-tag label="标签"></nax-tag>
<nax-tag type="info" label="标签文案"></nax-tag>
<nax-tag icon="star" label="图标"></nax-tag>
<nax-tag strong label="加粗"></nax-tag>
```

### 类型 type
```uvue
<nax-tag type="default" label="default"></nax-tag>
<nax-tag type="primary" label="primary"></nax-tag>
<nax-tag type="info" label="info"></nax-tag>
<nax-tag type="success" label="success"></nax-tag>
<nax-tag type="warning" label="warning"></nax-tag>
<nax-tag type="error" label="error"></nax-tag>
```

### 层级 variant
```uvue
<nax-tag type="primary" variant="light" label="light"></nax-tag>
<nax-tag type="primary" variant="solid" label="solid"></nax-tag>
<nax-tag type="primary" variant="outline" label="outline"></nax-tag>
<nax-tag type="primary" variant="text" label="text"></nax-tag>
```

### 尺寸 size
```uvue
<nax-tag size="sm" type="info" label="sm"></nax-tag>
<nax-tag size="md" type="info" label="md"></nax-tag>
<nax-tag size="lg" type="info" label="lg"></nax-tag>
<nax-tag size="tiny" type="info" label="tiny"></nax-tag>
<nax-tag size="large" type="info" label="large"></nax-tag>
```

### 圆角 / 无边框
```uvue
<nax-tag round type="success" label="round"></nax-tag>
<nax-tag :bordered="false" type="success" label="no border"></nax-tag>
<nax-tag round :bordered="false" type="warning" label="round+无边"></nax-tag>
```

### 可关闭 closable
```uvue
<nax-tag v-if="showCloseA" closable type="error" label="关闭我" @close="onCloseA" @click="onTagClick('A')"></nax-tag>
<nax-tag v-if="showCloseB" closable :trigger-click-on-close="false" type="warning" label="关不触发 click" @close="onCloseB" @click="onTagClick('B')"></nax-tag>
```

```uts
const showCloseA = ref(true)
const showCloseB = ref(true)
const lastEvent = ref('')

function onCloseA() {
	showCloseA.value = false
}

function onCloseB() {
	showCloseB.value = false
}

function onTagClick(name : string) {
	lastEvent.value = 'click ' + name
}
```

### 可选中 checkable
```uvue
<nax-tag checkable type="primary" label="可选 primary" :checked="checkedPrimary" @update:checked="onCheckedPrimary"></nax-tag>
<nax-tag checkable type="info" label="可选 info" :checked="checkedInfo" @update:checked="onCheckedInfo"></nax-tag>
<nax-tag checkable type="success" variant="outline" label="outline 可选" :checked="checkedOutline" @update:checked="onCheckedOutline"></nax-tag>
```

```uts
const checkedPrimary = ref(false)
const checkedInfo = ref(true)
const checkedOutline = ref(false)

function onCheckedPrimary(v : boolean) {
	checkedPrimary.value = v
}

function onCheckedInfo(v : boolean) {
	checkedInfo.value = v
}

function onCheckedOutline(v : boolean) {
	checkedOutline.value = v
}
```

### 禁用 disabled
```uvue
<nax-tag disabled label="禁用"></nax-tag>
<nax-tag disabled type="primary" label="禁用 primary"></nax-tag>
<nax-tag disabled closable type="error" label="禁用关闭"></nax-tag>
```

### 自定义 color
```uvue
<nax-tag color="#8a2be2" label="紫 light"></nax-tag>
<nax-tag color="#8a2be2" variant="solid" label="紫 solid"></nax-tag>
<nax-tag color="#8a2be2" variant="outline" label="紫 outline"></nax-tag>
<nax-tag color="#ff6b00" text-color="#ff6b00" :bordered="false" label="橙字"></nax-tag>
```

### solid × type
```uvue
<nax-tag variant="solid" label="default"></nax-tag>
<nax-tag type="primary" variant="solid" label="primary"></nax-tag>
<nax-tag type="info" variant="solid" label="info"></nax-tag>
<nax-tag type="success" variant="solid" label="success"></nax-tag>
<nax-tag type="warning" variant="solid" label="warning"></nax-tag>
<nax-tag type="error" variant="solid" label="error"></nax-tag>
```

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg-secondary` | 次级背景色 |
| `--nax-color-border` | 边框色 |
| `--nax-color-button-secondary` | 按钮次要底色 |
| `--nax-color-error` | 错误色 |
| `--nax-color-error-secondary` | 错误色浅底 |
| `--nax-color-info` | 信息色 |
| `--nax-color-info-secondary` | 信息色浅底 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-primary-secondary` | 主题主色浅底 |
| `--nax-color-success` | 成功色 |
| `--nax-color-success-secondary` | 成功色浅底 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-text-inverse` | 反白文字色 |
| `--nax-color-warning` | 警告色 |
| `--nax-color-warning-secondary` | 警告色浅底 |
| `--nax-opacity-disabled` | 禁用透明度 |

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | string | `'default'` | `default` 默认 \| `primary` 主要 \| `info` 信息 \| `success` 成功 \| `warning` 警告 \| `error` 错误（兼容 `danger`） |
| variant | string | `'light'` | `solid` 实心 \| `light` 浅色（等价 `secondary`）\| `outline` 描边 \| `text` 文字（等价 `quaternary`）；默认 `light` |
| size | string | `'md'` | `sm` 小 \| `md` 中 \| `lg` 大（兼容 `tiny` / `small` / `medium` / `large`） |
| closable | boolean | `false` | 是否可关闭 |
| disabled | boolean | `false` | 禁用 |
| round | boolean | `false` | 圆角胶囊 |
| bordered | boolean | `true` | 是否显示边框，默认 true |
| checkable | boolean | `false` | 可选中模式 |
| checked | boolean | `false` | 选中态（配合 checkable / update:checked） |
| strong | boolean | `false` | 加粗文字 |
| triggerClickOnClose | boolean | `true` | 点关闭时是否同时触发 click，默认 true（对齐 ） |
| label | string | `''` | 文案；也可用默认插槽 |
| icon | string | `''` | 前缀 nax-icon 名 |
| color | string | `''` | 自定义主色（覆盖 type 色） |
| textColor | string | `''` | 自定义文字色 |
| borderColor | string | `''` | 自定义边框色 |
| customClass | string | `''` | 根节点扩展 class |

## Events

| 事件 | 说明 |
|------|------|
| click | 点击（disabled 不触发；关闭区见 triggerClickOnClose） |
| close | 关闭 |
| update:checked | 选中态变化（checkable） |

## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义内容 |
| icon | 自定义前缀图标区域 |
