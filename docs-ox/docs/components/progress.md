
# nax-progress

> 当前版本：0.1.10

进度条。线形 / 圆形统一入口，用 `shape` 切换。

## 安装

- 插件市场：[nax-progress](https://ext.dcloud.net.cn/plugin?id=29055)

easycom 自动生效，页面直接使用 `<nax-progress />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 基础用法
```demo demo-progress
<!-- 线形（默认） -->
<nax-progress :percent="60"></nax-progress>

<!-- 圆形 -->
<nax-progress shape="circle" :percent="60"></nax-progress>

<!-- 语义色 -->
<nax-progress type="success" :percent="80"></nax-progress>
<nax-progress type="warning" :percent="40"></nax-progress>
<nax-progress type="error" :percent="20"></nax-progress>

<!-- 自定义信息区（需 useSlot） -->
<nax-progress :percent="50" use-slot>
  <text>一半</text>
</nax-progress>
```

### 基础线形
```uvue
<nax-progress :percent="30"></nax-progress>
<nax-progress :percent="60"></nax-progress>
<nax-progress :percent="100"></nax-progress>
```

### 动态 percent
```uvue
<nax-progress :percent="dynamicPercent" type="primary"></nax-progress>

<nax-button size="sm" label="-10" @click="dec"></nax-button>
<nax-button size="sm" type="primary" label="+10" @click="inc"></nax-button>
<nax-button size="sm" variant="secondary" label="随机" @click="rand"></nax-button>

<nax-progress shape="circle" :percent="dynamicPercent" type="info" :width="112" :stroke-width="8"></nax-progress>
```

```uts
const dynamicPercent = ref(42)

function clamp(v : number) : number {
	if (v < 0) {
		return 0
	}
	if (v > 100) {
		return 100
	}
	return v
}

function inc() {
	dynamicPercent.value = clamp(dynamicPercent.value + 10)
}

function dec() {
	dynamicPercent.value = clamp(dynamicPercent.value - 10)
}

function rand() {
	dynamicPercent.value = Math.floor(Math.random() * 101)
}
```

### 类型 type
```uvue
<nax-progress type="primary" :percent="70"></nax-progress>
<nax-progress type="info" :percent="70"></nax-progress>
<nax-progress type="success" :percent="70"></nax-progress>
<nax-progress type="warning" :percent="70"></nax-progress>
<nax-progress type="error" :percent="70"></nax-progress>
```

### 尺寸 size
```uvue
<nax-progress size="sm" :percent="50"></nax-progress>
<nax-progress size="md" :percent="50"></nax-progress>
<nax-progress size="lg" :percent="50"></nax-progress>
```

### 条内文案 textInside
```uvue
<nax-progress :percent="55" text-inside></nax-progress>
<nax-progress :percent="88" text-inside type="success"></nax-progress>
```

### 隐藏文案 / 自定义 pivotText
```uvue
<nax-progress :percent="40" :show-info="false"></nax-progress>
<nax-progress :percent="40" pivot-text="上传中"></nax-progress>
```

### status 覆盖色
```uvue
<nax-progress :percent="100" status="success"></nax-progress>
<nax-progress :percent="60" status="warning"></nax-progress>
<nax-progress :percent="30" status="error"></nax-progress>
```

### 圆形 shape=circle（含类型）
```uvue
<nax-progress shape="circle" :percent="25" size="sm"></nax-progress>
<nax-progress shape="circle" :percent="60"></nax-progress>
<nax-progress shape="circle" :percent="100" type="success" size="lg"></nax-progress>

<nax-progress shape="circle" type="primary" :percent="70" size="sm"></nax-progress>
<nax-progress shape="circle" type="info" :percent="70" size="sm"></nax-progress>
<nax-progress shape="circle" type="warning" :percent="70" size="sm"></nax-progress>
<nax-progress shape="circle" type="error" :percent="70" size="sm"></nax-progress>
```

### 插槽 useSlot
```uvue
<nax-progress :percent="50" use-slot>
	<text class="slot-text">一半啦</text>
</nax-progress>

<nax-progress shape="circle" :percent="75" use-slot size="md">
	<text class="slot-text">3/4</text>
</nax-progress>
```

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 背景色 |
| `--nax-color-divider` | 分割线色 |
| `--nax-color-error` | 错误色 |
| `--nax-color-info` | 信息色 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-success` | 成功色 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-text-inverse` | 反白文字色 |
| `--nax-color-text-secondary` | 次要文字色 |
| `--nax-color-warning` | 警告色 |

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| percent | number | `0` | 进度 0–100 |
| shape | string | `'line'` | `line` 条形 \| `circle` 圆形 |
| type | string | `'primary'` | `default` 默认 \| `primary` 主要 \| `info` 信息 \| `success` 成功 \| `warning` 警告 \| `error` 错误（兼容 `danger`） |
| status | string | `''` | `success` 成功 \| `warning` 警告 \| `error` 错误（有值时覆盖 type 色） |
| size | string | `'md'` | `sm` 小 \| `md` 中 \| `lg` 大 |
| showInfo | boolean | `true` | 是否显示百分比/文案 |
| textInside | boolean | `false` | 线形文案是否在条内 |
| useSlot | boolean | `false` | 使用默认插槽自定义信息区 |
| strokeWidth | number | `0` | 线形高度 / 圆形描边（px）；0 跟随 size |
| width | number | `0` | 圆形直径（px）；0 跟随 size |
| color | string | `''` | 激活色覆盖 |
| trackColor | string | `''` | 轨道色覆盖 |
| pivotText | string | `''` | 自定义文案；空则 percent% |
| customClass | string | `''` | 根节点扩展 class |

## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义信息区（需 useSlot） |
