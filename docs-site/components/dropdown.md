---
demo: dropdown
---

# nax-dropdown

> 当前版本：0.1.7

筛选栏式下拉菜单。

## 安装

- 插件市场：[nax-dropdown](https://ext.dcloud.net.cn/plugin?id=29033)

easycom 自动生效，页面直接使用 `<nax-dropdown />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

::: details 基础用法

```html
<nax-dropdown border-bottom>
  <nax-dropdown-item v-model="near" title="附近" :options="nearOptions"></nax-dropdown-item>
  <nax-dropdown-item v-model="sort" title="排序" :options="sortOptions"></nax-dropdown-item>
  <nax-dropdown-item title="筛选" :highlighted="filtered">
    <!-- 自定义面板 -->
    <view>...</view>
  </nax-dropdown-item>
</nax-dropdown>
```

:::

::: details 基础（附近 / 排序 / 价格）

```uvue
<nax-dropdown border-bottom @open="onOpen" @close="onClose" @change="onMenuChange">
	<nax-dropdown-item
		v-model="nearValue"
		title="附近"
		:options="nearOptions"
		@change="onNearChange"
	></nax-dropdown-item>
	<nax-dropdown-item v-model="sortValue" title="排序" :options="sortOptions"></nax-dropdown-item>
	<nax-dropdown-item v-model="priceValue" title="价格" :options="priceOptions" display-selected></nax-dropdown-item>
</nax-dropdown>
```

```uts
const nearValue = ref('1')
const sortValue = ref('default')
const priceValue = ref('')

const nearOptions = [
	{ label: '附近', value: '1' },
	{ label: '500m', value: '2' },
	{ label: '1km', value: '3' },
	{ label: '3km', value: '4' }
]

const sortOptions = [
	{ label: '智能排序', value: 'default' },
	{ label: '距离优先', value: 'distance' },
	{ label: '好评优先', value: 'rate' },
	{ label: '销量优先', value: 'sales' }
]

const priceOptions = [
	{ label: '不限', value: '' },
	{ label: '0-50', value: '0-50' },
	{ label: '50-100', value: '50-100' },
	{ label: '100 以上', value: '100+' }
]

function onOpen(index : number) {
	// 打开第 index 个菜单
}

function onClose(index : number) {
	// 关闭第 index 个菜单
}

function onMenuChange(index : number) {
	// 切换菜单
}

function onNearChange(value : string) {
	// value：选中值
}
```

:::

::: details 自定义面板 + 手动关闭

dropdown-item 默认插槽自定义面板内容，ref 手动关闭弹层。

```uvue
<nax-dropdown ref="filterDropdown" border-bottom border-radius="12">
	<nax-dropdown-item title="筛选" :highlighted="filterActive">
		<view class="filter-panel">
			<text>仅看包邮</text>
			<nax-switch v-model="onlyFreeShip"></nax-switch>
		</view>
		<view class="filter-panel">
			<text>仅看有货</text>
			<nax-switch v-model="onlyInStock"></nax-switch>
		</view>
		<view class="filter-actions">
			<nax-button size="sm" label="重置" @click="resetFilter"></nax-button>
			<nax-button size="sm" type="primary" label="确定" @click="confirmFilter"></nax-button>
		</view>
	</nax-dropdown-item>
	<nax-dropdown-item v-model="brandValue" title="品牌" :options="brandOptions" height="200"></nax-dropdown-item>
</nax-dropdown>
```

```uts
type NaxDropdownExpose = {
	open : (index : number) => void
	close : () => void
}
const filterDropdown = ref(null as NaxDropdownExpose | null)

const onlyFreeShip = ref(false)
const onlyInStock = ref(false)
const filterActive = ref(false)
const brandValue = ref('')

const brandOptions = [
	{ label: '全部品牌', value: '' },
	{ label: '品牌 A', value: 'a' },
	{ label: '品牌 B', value: 'b' },
	{ label: '品牌 C', value: 'c' },
	{ label: '品牌 D', value: 'd' },
	{ label: '品牌 E', value: 'e' },
	{ label: '品牌 F', value: 'f' },
	{ label: '品牌 G', value: 'g' }
]

function resetFilter() {
	onlyFreeShip.value = false
	onlyInStock.value = false
	filterActive.value = false
}

function confirmFilter() {
	filterActive.value = onlyFreeShip.value || onlyInStock.value
	if (filterDropdown.value != null) {
		filterDropdown.value.close()
	}
}
```

:::

::: details 尺寸 size / 禁用项

```uvue
<nax-dropdown size="sm" border-bottom>
	<nax-dropdown-item v-model="sizeValue" title="小号" :options="sizeOptions"></nax-dropdown-item>
	<nax-dropdown-item title="禁用" disabled :options="sizeOptions"></nax-dropdown-item>
</nax-dropdown>

<nax-dropdown size="lg" border-bottom>
	<nax-dropdown-item v-model="sizeValue" title="大号" :options="sizeOptions"></nax-dropdown-item>
	<nax-dropdown-item v-model="sizeValue2" title="大号2" :options="sizeOptions"></nax-dropdown-item>
</nax-dropdown>
```

```uts
const sizeValue = ref('a')
const sizeValue2 = ref('b')

const sizeOptions = [
	{ label: '选项 A', value: 'a' },
	{ label: '选项 B', value: 'b' },
	{ label: '选项 C', value: 'c' }
]
```

:::

::: details 命令式 open / close

通过 ref 调用 open(index) / close() 控制弹层。

```uvue
<nax-button size="sm" label="打开第 0 项" @click="openFirst"></nax-button>
<nax-button size="sm" label="关闭" @click="closeCmd"></nax-button>

<nax-dropdown ref="cmdDropdown" border-bottom>
	<nax-dropdown-item v-model="cmdValue" title="命令式" :options="nearOptions"></nax-dropdown-item>
	<nax-dropdown-item v-model="cmdValue2" title="第二项" :options="sortOptions"></nax-dropdown-item>
</nax-dropdown>
```

```uts
type NaxDropdownExpose = {
	open : (index : number) => void
	close : () => void
}
const cmdDropdown = ref(null as NaxDropdownExpose | null)
const cmdValue = ref('')
const cmdValue2 = ref('')

function openFirst() {
	if (cmdDropdown.value != null) {
		cmdDropdown.value.open(0)
	}
}

function closeCmd() {
	if (cmdDropdown.value != null) {
		cmdDropdown.value.close()
	}
}
```

:::

## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg` | 背景色 |
| `--nax-color-border` | 边框色 |
| `--nax-color-mask` | 遮罩色 |
| `--nax-color-primary` | 主题主色 |
| `--nax-color-text` | 主文字色 |


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| size | string | `'md'` | `sm` 小 \| `md` 中 \| `lg` 大（菜单栏高度）；默认 `md` |
| menuIcon | string | `'chevron-down'` | 收起图标，默认 chevron-down |
| menuIconOpen | string | `'chevron-up'` | 展开图标，默认 chevron-up |
| menuIconSize | string | `'14'` | 图标尺寸，默认 14 |
| borderBottom | boolean | `false` | 菜单底部分割线，默认 false |
| closeOnClickMask | boolean | `true` | 点遮罩关闭，默认 true |
| closeOnClickSelf | boolean | `true` | 点默认选项后关闭，默认 true |
| duration | number | `280` | 遮罩动画 ms，默认 280 |
| borderRadius | string | `'0'` | 内容区底部圆角 px，默认 0 |
| zIndex | number | `1000` | 层级，默认 1000 |
| fixed | boolean | `false` | 菜单栏吸顶 fixed，默认 false |
| offsetTop | string | `'0'` | fixed 额外 top 偏移 px，默认 0 |
| immersive | boolean | `false` | 沉浸导航：fixed top 叠加状态栏+导航栏高度 |
| navbarHeight | string | `'44'` | 沉浸时导航栏高度，默认 44 |
| placeholder | boolean | `true` | fixed 时是否占位，默认 true |
| customClass | string | `''` | 根扩展 class |

## Props（nax-dropdown-item）

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|
| modelValue | string | `''` | 当前选中值（v-model），与 `options[].value` 对应 |
| title | string | `''` | 菜单标题 |
| options | array | `[]` | 选项 `{ label, value }` 或字符串 |
| disabled | boolean | `false` | 禁用该菜单 |
| show | boolean | `true` | 是否展示该菜单标题 |
| height | string | `''` | 默认列表高度（有值时 scroll-view，纯数字按 px） |
| highlighted | boolean | `false` | 强制高亮标题；默认跟 modelValue 自动 |
| displaySelected | boolean | `false` | 标题展示已选 label |
| labelName | string | `'label'` | 选项文案字段 |
| valueName | string | `'value'` | 选项值字段 |
| customClass | string | `''` | 根扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| open | 打开（index） |
| close | 关闭（index） |
| change | 切换菜单项（index） |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 放置 nax-dropdown-item |
