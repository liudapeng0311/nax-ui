
# nax-button

> 当前版本：0.1.23

`nax-ui` 通用按钮组件（uni-app x / uvue）。
色系与层级：
- **基础** `variant="solid"`
- **次要** `variant="secondary"`
- **次次要** `variant="tertiary"`
- **次次次要** `variant="quaternary"`
- **虚线** `variant="dashed"`
- **禁用** `disabled`

## 安装

- 插件市场：[nax-button](https://ext.dcloud.net.cn/plugin?id=29025)

easycom 自动生效，页面直接使用 `<nax-button />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 基础用法
```demo demo-button
<nax-button type="primary" label="确定" @click="onConfirm"></nax-button>
```

### 层级示例
```html
<!-- 基础 -->
<nax-button label="基础"></nax-button>
<!-- 次要 -->
<nax-button variant="secondary" label="次要"></nax-button>
<!-- 次次要 -->
<nax-button variant="tertiary" label="次次要"></nax-button>
<!-- 次次次要 -->
<nax-button variant="quaternary" label="次次次要"></nax-button>
<!-- 虚线 -->
<nax-button variant="dashed" label="虚线"></nax-button>
<!-- 禁用 -->
<nax-button disabled label="禁用"></nax-button>

<!-- 主色 × 次要 -->
<nax-button type="primary" variant="secondary" label="Primary 次要"></nax-button>
```

### 图标
需要同时安装 `nax-icon`。推荐直接用 `icon` prop：

```html
<nax-button type="primary" icon="search" label="搜索"></nax-button>
<nax-button type="primary" icon="arrow-right" icon-position="right" label="下一步"></nax-button>
<nax-button type="primary" shape="circle" icon="plus"></nax-button>
```

也可用插槽自定义图标：

```html
<nax-button type="primary" label="搜索">
  <template #icon>
    <nax-icon name="search" size="sm"></nax-icon>
  </template>
</nax-button>
```

### Loading
`loading` 为 true 时：

- 阻止 click
- 左侧显示旋转的 `nax-icon name="loading"`
- 隐藏 `icon` prop 与 `#icon` 插槽，避免与 loading 抢位

```html
<nax-button type="primary" :loading="true" label="提交中"></nax-button>
```

### 层级与类型（default / primary）
```uvue
<nax-button label="基础" @click="onTap('base')"></nax-button>
<nax-button variant="secondary" label="次要" @click="onTap('secondary')"></nax-button>
<nax-button variant="tertiary" label="次次要" @click="onTap('tertiary')"></nax-button>
<nax-button variant="quaternary" label="次次次要" @click="onTap('quaternary')"></nax-button>
<nax-button variant="dashed" label="虚线" @click="onTap('dashed')"></nax-button>
<nax-button disabled label="禁用" @click="onTap('disabled')"></nax-button>

<nax-button type="primary" label="基础"></nax-button>
<nax-button type="primary" variant="secondary" label="次要"></nax-button>
<nax-button type="primary" variant="tertiary" label="次次要"></nax-button>
<nax-button type="primary" variant="quaternary" label="次次次要"></nax-button>
<nax-button type="primary" variant="dashed" label="虚线"></nax-button>
<nax-button type="primary" disabled label="禁用"></nax-button>
```

```uts
function onTap(name: string) {
	uni.showToast({ title: name, icon: 'none' })
}
```

### 类型 type × variant
```uvue
<nax-button label="Default"></nax-button>
<nax-button type="primary" label="Primary"></nax-button>
<nax-button type="info" label="Info"></nax-button>
<nax-button type="success" label="Success"></nax-button>
<nax-button type="warning" label="Warning"></nax-button>
<nax-button type="error" label="Error"></nax-button>

<nax-button variant="secondary" label="Default"></nax-button>
<nax-button type="primary" variant="secondary" label="Primary"></nax-button>
<nax-button type="info" variant="secondary" label="Info"></nax-button>
<nax-button type="success" variant="secondary" label="Success"></nax-button>
<nax-button type="warning" variant="secondary" label="Warning"></nax-button>
<nax-button type="error" variant="secondary" label="Error"></nax-button>

<nax-button variant="tertiary" label="Default"></nax-button>
<nax-button type="primary" variant="tertiary" label="Primary"></nax-button>
<nax-button type="info" variant="tertiary" label="Info"></nax-button>
<nax-button type="success" variant="tertiary" label="Success"></nax-button>
<nax-button type="warning" variant="tertiary" label="Warning"></nax-button>
<nax-button type="error" variant="tertiary" label="Error"></nax-button>

<nax-button variant="quaternary" label="Default"></nax-button>
<nax-button type="primary" variant="quaternary" label="Primary"></nax-button>
<nax-button type="info" variant="quaternary" label="Info"></nax-button>
<nax-button type="success" variant="quaternary" label="Success"></nax-button>
<nax-button type="warning" variant="quaternary" label="Warning"></nax-button>
<nax-button type="error" variant="quaternary" label="Error"></nax-button>

<nax-button variant="dashed" label="Default"></nax-button>
<nax-button type="primary" variant="dashed" label="Primary"></nax-button>
<nax-button type="info" variant="dashed" label="Info"></nax-button>
<nax-button type="success" variant="dashed" label="Success"></nax-button>
<nax-button type="warning" variant="dashed" label="Warning"></nax-button>
<nax-button type="error" variant="dashed" label="Error"></nax-button>
```

### 禁用 disabled × type
```uvue
<nax-button disabled label="Default"></nax-button>
<nax-button type="primary" disabled label="Primary"></nax-button>
<nax-button type="info" disabled label="Info"></nax-button>
<nax-button type="success" disabled label="Success"></nax-button>
<nax-button type="warning" disabled label="Warning"></nax-button>
<nax-button type="error" disabled label="Error"></nax-button>
```

### 描边 outline（兼容）
```uvue
<nax-button type="primary" variant="outline" label="outline"></nax-button>
<nax-button type="error" variant="outline" label="outline error"></nax-button>
```

### 尺寸 size
```uvue
<nax-button type="primary" size="sm" label="small"></nax-button>
<nax-button type="primary" size="md" label="medium"></nax-button>
<nax-button type="primary" size="lg" label="large"></nax-button>
```

### 形状 shape
```uvue
<nax-button type="primary" shape="square" label="square"></nax-button>
<nax-button type="primary" shape="round" label="round"></nax-button>
<nax-button type="primary" shape="circle" label="好"></nax-button>
```

### 图标 icon（nax-icon）
```uvue
<nax-button type="primary" icon="search" label="搜索" @click="onTap('icon-search')"></nax-button>
<nax-button type="primary" icon="arrow-right" icon-position="right" label="下一步" @click="onTap('icon-right')"></nax-button>
<nax-button type="success" variant="secondary" icon="check" label="完成"></nax-button>
<nax-button type="error" variant="outline" icon="delete" label="删除"></nax-button>
<nax-button type="primary" shape="circle" icon="plus" @click="onTap('icon-circle')"></nax-button>
<nax-button type="primary" icon="search" :loading="loading" label="加载中"></nax-button>
```

```uts
const loading = ref(false)

function onTap(name: string) {
	uni.showToast({ title: name, icon: 'none' })
}
```

### 状态 loading 动画
```uvue
<nax-button type="primary" label="正常" @click="onTap('normal')"></nax-button>
<nax-button type="primary" :loading="loading" label="加载" @click="toggleLoading"></nax-button>
<nax-button type="primary" loading label="提交中"></nax-button>
<nax-button type="success" variant="secondary" loading label="保存中"></nax-button>
<nax-button type="primary" shape="circle" loading></nax-button>
```

```uts
const loading = ref(false)

function toggleLoading() {
	loading.value = !loading.value
}
```

### 块级 block
```uvue
<nax-button type="primary" block label="块级主按钮" @click="onTap('block')"></nax-button>
<nax-button type="error" variant="secondary" block label="块级次要错误按钮"></nax-button>
```

```uts
function onTap(name: string) {
	uni.showToast({ title: name, icon: 'none' })
}
```

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-border-width` | 边框粗细 |
| `--nax-button-height` | 按钮高度 |
| `--nax-button-padding-x` | 按钮水平内边距 |
| `--nax-button-radius` | 按钮圆角 |
| `--nax-color-bg` | 背景色 |
| `--nax-color-border` | 边框色 |
| `--nax-color-button-secondary` | 按钮次要底色 |
| `--nax-color-button-tertiary` | 按钮次次要底色 |
| `--nax-color-error` | 错误色 |
| `--nax-color-error-secondary` | 错误色浅底 |
| `--nax-color-error-tertiary` | 错误色次浅底 |
| `--nax-color-info` | 信息色 |
| `--nax-color-info-secondary` | 信息色浅底 |
| `--nax-color-info-tertiary` | 信息色次浅底 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-primary-secondary` | 主题主色浅底 |
| `--nax-color-primary-tertiary` | 主题主色次浅底 |
| `--nax-color-success` | 成功色 |
| `--nax-color-success-secondary` | 成功色浅底 |
| `--nax-color-success-tertiary` | 成功色次浅底 |
| `--nax-color-text` | 主文字色 |
| `--nax-color-text-inverse` | 反白文字色 |
| `--nax-color-warning` | 警告色 |
| `--nax-color-warning-secondary` | 警告色浅底 |
| `--nax-color-warning-tertiary` | 警告色次浅底 |
| `--nax-opacity-disabled` | 禁用透明度 |

若希望使用默认绿色主色：

```css
.nax-theme {
  --nax-color-primary: #18a058;
  --nax-color-primary-secondary: rgba(24, 160, 88, 0.16);
  --nax-color-primary-tertiary: rgba(24, 160, 88, 0.12);
}
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | string | `'default'` | `default` 默认 \| `primary` 主要 \| `info` 信息 \| `success` 成功 \| `warning` 警告 \| `error` 错误（兼容 `tertiary` / `danger`） |
| variant | string | `'solid'` | `solid` 实心 \| `secondary` 次要 \| `tertiary` 次次要 \| `quaternary` 次次次要 \| `outline` 描边 \| `dashed` 虚线 \| `text` 文字 \| `light` 浅色 |
| size | string | `'md'` | `sm` 小 \| `md` 中 \| `lg` 大 |
| shape | string | `'square'` | `square` 方形 \| `round` 圆角 \| `circle` 圆形 |
| disabled | boolean | `false` | 禁用 |
| loading | boolean | `false` | 加载中（阻止点击；显示旋转 loading 图标） |
| block | boolean | `false` | 块级宽度 |
| label | string | `''` | 文案；也可用默认插槽扩展 |
| icon | string | `''` | nax-icon 图标名；空则不渲染内置图标 |
| iconPosition | string | `'left'` | 图标位置：`left` 左侧（默认）\| `right` 右侧 |
| customClass | string | `''` | 根节点扩展 class |

## Events

| 事件 | 说明 |
|------|------|
| click | 点击（disabled / loading 时不触发） |

## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义内容 |
| icon | 自定义前缀图标区域（与 icon prop 可并存；loading 时隐藏） |
