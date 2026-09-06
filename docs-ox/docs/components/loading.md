
# nax-loading

> 当前版本：0.1.6

局部 / 区块加载指示。

## 安装

- 插件市场：[nax-loading](https://ext.dcloud.net.cn/plugin?id=29041)

easycom 自动生效，页面直接使用 `<nax-loading />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 用法
```demo demo-loading
<nax-loading></nax-loading>
<nax-loading text="加载中"></nax-loading>
<nax-loading icon="loader" text="加载中"></nax-loading>
<nax-loading icon="loader-4" vertical text="请稍候" size="lg" type="primary"></nax-loading>
<nax-loading :show="pending" text="提交中"></nax-loading>
```

### 基础
```uvue
<nax-loading></nax-loading>
```

### 带文案
```uvue
<nax-loading text="加载中"></nax-loading>
```

### 纵向 vertical
```uvue
<nax-loading vertical text="请稍候"></nax-loading>
```

### 尺寸 size
```uvue
<nax-loading size="sm" text="sm"></nax-loading>
<nax-loading size="md" text="md"></nax-loading>
<nax-loading size="lg" text="lg"></nax-loading>
```

### 图标 icon
```uvue
<nax-loading icon="loading" text="loading"></nax-loading>
<nax-loading icon="loader" text="loader"></nax-loading>
<nax-loading icon="loader-4" text="loader-4"></nax-loading>
```

### 类型 type
```uvue
<nax-loading type="default" text="默认"></nax-loading>
<nax-loading type="primary" text="主色"></nax-loading>
<nax-loading type="info" text="信息"></nax-loading>
<nax-loading type="warning" text="警告"></nax-loading>
<nax-loading type="error" text="错误"></nax-loading>
```

### 区块占位
```uvue
<nax-loading v-if="blockLoading" vertical text="内容加载中" type="primary"></nax-loading>
<view v-else>
	<text class="body-text">数据已就绪</text>
</view>
<nax-button type="primary" size="sm" label="模拟加载 1.5s" @click="simulate"></nax-button>
```

```uts
const blockLoading = ref(true)

function simulate() {
	blockLoading.value = true
	setTimeout(() => {
		blockLoading.value = false
	}, 1500)
}
```

### show 控制
```uvue
<nax-loading :show="toggled" text="可开关"></nax-loading>
<nax-button size="sm" :label="toggled ? '隐藏' : '显示'" @click="toggleShow"></nax-button>
```

```uts
const toggled = ref(true)

function toggleShow() {
	toggled.value = !toggled.value
}
```

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-error` | 错误色 |
| `--nax-color-info` | 信息色 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-text-secondary` | 次要文字色 |
| `--nax-color-warning` | 警告色 |

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | boolean | `true` | 是否显示，默认 true |
| size | string | `'md'` | `sm` 小 \| `md` 中 \| `lg` 大 |
| text | string | `''` | 文案；也可用默认插槽 |
| vertical | boolean | `false` | 纵向：图标在上、文案在下；默认 false（横向） |
| type | string | `'default'` | `default` 默认 \| `primary` 主要 \| `info` 信息 \| `success` 成功 \| `warning` 警告 \| `error` 错误（兼容 `danger`） |
| color | string | `''` | 自定义颜色（覆盖 type） |
| icon | string | `'loading'` | 旋转图标：`loading` \| `loader` \| `loader-4`；默认 `loading` |
| customClass | string | `''` | 根节点扩展 class |

## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义文案区 |
| icon | 自定义图标 |
