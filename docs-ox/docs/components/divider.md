
# nax-divider

> 当前版本：0.1.3

内容分割线（可带文字）。纯线条请用 `nax-line`。

## 安装

- 插件市场：[nax-divider](https://ext.dcloud.net.cn/plugin?id=29032)

easycom 自动生效，页面直接使用 `<nax-divider />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 用法
```demo demo-divider
<nax-divider></nax-divider>
<nax-divider text="或者"></nax-divider>
<nax-divider text="左侧" content-position="left"></nax-divider>
<nax-divider dashed text="虚线" type="primary"></nax-divider>

<!-- 竖向：父级固定高度时默认 height 100% 拉满 -->
<view style="height:120px;flex-direction:row;align-items:stretch;">
  <text>左</text>
  <nax-divider direction="vertical" space="12"></nax-divider>
  <text>右</text>
</view>

<!-- 与文字并排：用 length 指定高度 -->
<view style="flex-direction:row;align-items:center;">
  <text>左</text>
  <nax-divider direction="vertical" length="16" space="10"></nax-divider>
  <text>右</text>
</view>
```

### 基础
```uvue
<nax-divider></nax-divider>
```

### 带文字
```uvue
<nax-divider text="或者" space="8"></nax-divider>
<nax-divider text="更多内容" space="8"></nax-divider>
```

### 位置 content-position
```uvue
<nax-divider text="居中" content-position="center" space="8"></nax-divider>
<nax-divider text="左侧" content-position="left" space="8"></nax-divider>
<nax-divider text="右侧" content-position="right" space="8"></nax-divider>
```

### 虚线 / 类型
```uvue
<nax-divider dashed text="虚线" space="8"></nax-divider>
<nax-divider text="主色" type="primary" space="8"></nax-divider>
<nax-divider text="警告" type="warning" space="8"></nax-divider>
<nax-divider text="错误" type="error" space="8"></nax-divider>
```

### 粗细 size
```uvue
<nax-divider text="hairline" size="hairline" space="8"></nax-divider>
<nax-divider text="sm" size="sm" space="8"></nax-divider>
<nax-divider text="md" size="md" space="8"></nax-divider>
```

### 竖向
父容器固定高度 + align-items:stretch，竖线自动拉满。

```uvue
<view class="v-box">
	<text>左</text>
	<nax-divider direction="vertical" space="12"></nax-divider>
	<text>中</text>
	<nax-divider direction="vertical" space="12" type="primary" size="sm"></nax-divider>
	<text>右</text>
</view>
```

与文字并排时可用 length 指定高度（如 16）。

```uvue
<view class="v-inline">
	<text>左</text>
	<nax-divider direction="vertical" length="16" space="10"></nax-divider>
	<text>中</text>
	<nax-divider direction="vertical" length="16" space="10" type="warning"></nax-divider>
	<text>右</text>
</view>
```

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-divider` | 分割线色 |
| `--nax-color-error` | 错误色 |
| `--nax-color-info` | 信息色 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-success` | 成功色 |
| `--nax-color-text-secondary` | 次要文字色 |
| `--nax-color-warning` | 警告色 |

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| direction | string | `'horizontal'` | `horizontal` 横向 \| `vertical` 纵向（兼容 `row` / `column`） |
| text | string | `''` | 中间文案；也可用默认插槽 |
| contentPosition | string | `'center'` | `left` 左 \| `center` 中 \| `right` 右（横线时；兼容 `start` / `end`） |
| dashed | boolean | `false` | 虚线 |
| size | string | `'hairline'` | `hairline` 细线 \| `sm` 小 \| `md` 中（线粗细）；默认 `hairline` |
| type | string | `'default'` | `default` 默认 \| `primary` 主要 \| `info` 信息 \| `success` 成功 \| `warning` 警告 \| `error` 错误（兼容 `danger`） |
| color | string | `''` | 自定义线色（覆盖 type） |
| textColor | string | `''` | 自定义文案色 |
| space | string | `''` | 外边距：横=上下，竖=左右 |
| length | string | `''` | 竖向高度（纯竖线默认 100%；与文字并排建议传如 16） |
| customClass | string | `''` | 根节点扩展 class |

## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义中间内容 |
