# nax-button

`nax-ui` 通用按钮组件（uni-app x / uvue）。

色系与层级：

- **基础** `variant="solid"`
- **次要** `variant="secondary"`
- **次次要** `variant="tertiary"`
- **次次次要** `variant="quaternary"`
- **虚线** `variant="dashed"`
- **禁用** `disabled`

## 安装

```text
uni_modules/nax-button
```

easycom 自动生效。

### 推荐同时安装主题包

```text
uni_modules/nax-ui-theme
```

并在 `App.uvue` 引入：

```css
@import "@/uni_modules/nax-ui-theme/theme/default.css";
```

页面根节点加 `class="nax-theme"`。未安装主题包时，组件仍可使用内置 fallback 颜色。

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


## 依赖

| 依赖 | 说明 |
|------|------|
| `nax-icon` | 图标（loading 等） |
| `nax-ui-theme` | **安装时依赖**；**运行时弱依赖**（组件内 `var(--nax-*, fallback)`，未接主题也能显示） |

> 安装 theme 后仍需：`App.uvue` `@import` + 应用 layout/页面 **一处** `class="nax-theme"`。详见 `uni_modules/nax-ui-theme/readme.md`（L0/L1/L2）。

## 基础用法

```html
<nax-button type="primary" label="确定" @click="onConfirm"></nax-button>
```

## 层级示例

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



## 图标

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


## Loading

`loading` 为 true 时：

- 阻止 click
- 左侧显示旋转的 `nax-icon name="loading"`
- 隐藏 `icon` prop 与 `#icon` 插槽，避免与 loading 抢位

```html
<nax-button type="primary" :loading="true" label="提交中"></nax-button>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | string | `default` | `default` / `primary` / `info` / `success` / `warning` / `error`（兼容 `tertiary`、`danger`） |
| variant | string | `solid` | `solid`(基础) / `secondary`(次要) / `tertiary`(次次要) / `quaternary`(次次次要) / `dashed`(虚线) / `outline`；兼容 `light`→secondary、`text`→quaternary |
| size | string | `md` | `sm` / `md` / `lg` |
| shape | string | `square` | `square` / `round` / `circle` |
| disabled | boolean | `false` | 禁用（整体 opacity，不触发 click） |
| loading | boolean | `false` | 加载中（阻止点击；显示旋转 loading 图标） |
| block | boolean | `false` | 块级宽度 |
| label | string | `''` | 文案 |
| icon | string | `''` | `nax-icon` 图标名；空则不渲染内置图标 |
| iconPosition | string | `left` | `left` / `right`（兼容 `end`→right） |
| customClass | string | `''` | 根节点扩展 class |

## Events

| 事件 | 说明 |
|------|------|
| click | 点击（disabled / loading 时不触发） |

## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义内容 |
| icon | 自定义前缀图标区域（可与 icon prop 并存；loading 时隐藏） |
