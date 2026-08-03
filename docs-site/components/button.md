---
demo: button
---

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

easycom 自动生效，页面直接使用 `<nax-button />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 依赖

| 依赖 | 说明 |
|------|------|
| `nax-icon` | 图标（loading 等） |
| `nax-ui-theme` | **安装时依赖**；**运行时弱依赖**（组件内 `var(--nax-*, fallback)`，未接主题也能显示） |


## 代码示例

### 基础用法

```html
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

### Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义内容 |
| icon | 自定义前缀图标区域（可与 icon prop 并存；loading 时隐藏） |

### 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-primary` | 主色实心/描边/文字 |
| `--nax-color-button-secondary` | default 次要底 |
| `--nax-color-button-tertiary` | default 次次要底 |
| `--nax-color-primary-secondary` | primary 次要底 |
| `--nax-color-primary-tertiary` | primary 次次要底 |
| `--nax-opacity-disabled` | 禁用透明度（默认 0.5） |
| `--nax-button-height` / `--nax-button-radius` | 尺寸圆角 |

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
| type | string | `'default'` | default \| primary \| info \| success \| warning \| error（兼容 tertiary / danger） |
| variant | string | `'solid'` | solid \| secondary \| tertiary \| quaternary \| outline \| dashed \| text \| light |
| size | string | `'md'` | sm \| md \| lg |
| shape | string | `'square'` | square \| round \| circle |
| disabled | boolean | `false` | 禁用 |
| loading | boolean | `false` | 加载中（阻止点击；显示旋转 loading 图标） |
| block | boolean | `false` | 块级宽度 |
| label | string | `''` | 文案；也可用默认插槽扩展 |
| icon | string | `''` | nax-icon 图标名；空则不渲染内置图标 |
| iconPosition | string | `'left'` | left \| right，默认 left |
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
