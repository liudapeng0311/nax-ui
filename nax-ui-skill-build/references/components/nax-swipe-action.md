# nax-swipe-action

uni-app x 滑动操作组件，功能覆盖常用场景，并增强：

## 用法示例

```uvue
<nax-swipe-action
  :options="options"
  @click="onAction"
>
  <nax-cell title="左滑删除"></nax-cell>
</nax-swipe-action>
```

```uvue
<nax-swipe-action-group>
  <nax-swipe-action
    v-for="item in list"
    :key="item.id"
    :name="item.id"
    :options="options"
    @click="onAction"
  >
    <nax-cell :title="item.title"></nax-cell>
  </nax-swipe-action>
</nax-swipe-action-group>
```

## Props — nax-swipe-action Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| show | boolean | `false` | 是否展开（`v-model:show`） |
| disabled | boolean | `false` | 禁用滑动与按钮 |
| name | string | `''` | 项标识；组内互斥推荐传稳定 id |
| index | number | `-1` | 业务序号（写入 click 载荷，兼容） |
| options | array | `[]` | 按钮列表，见下表 |
| btnWidth | number | `72` | 默认按钮宽度（px） |
| rightWidth | number | `0` | 自定义 `right` 插槽宽度（px） |
| threshold | number | `0` | 展开阈值（px）；`0` 为操作区一半 |
| autoClose | boolean | `true` | 点击按钮后自动收起 |
| closeOnClickContent | boolean | `true` | 展开时点内容区收起 |
| vibrateShort | boolean | `false` | 展开时短震动（支持端） |
| customClass | string | `''` | 根节点扩展 class |

## Props — options 项

| 字段 | 类型 | 说明 |
|---|---|---|
| text / label | string | 按钮文案 |
| name | string | 按钮标识（click 回调） |
| type | string | `default` / `primary` / `info` / `success` / `warning` / `error`（`danger` 同 error） |
| color | string | 文字色覆盖 |
| bgColor / backgroundColor | string | 背景色覆盖 |
| style.backgroundColor / style.color | string | 兼容 style 写法 |
| width | number | 单项宽度（px） |
| disabled | boolean | 禁用该按钮 |

## Props — nax-swipe-action-group

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| customClass | string | `''` | 根扩展 class |

## Events

| 事件 | 说明 |
|---|---|
| update:show | v-model:show |
| open | 展开 |
| close | 收起 |
| click | 点操作按钮；参数含 `index` / `name` / `text` / `itemName` / `itemIndex` |
| content-click | 点内容区（已展开且会自动收起时不额外依赖业务关单） |

## Slots

| 名称 | 说明 |
|---|---|
| default | 内容区（如 `nax-cell`） |
| right | 自定义右侧操作区（请同时设 `rightWidth`） |

## Methods — 方法（defineExpose）

| 方法 | 说明 |
|---|---|
| open | 展开 |
| close | 收起 |

## Methods — nax-swipe-action-group

| 方法 | 说明 |
|---|---|
| closeAll | 收起组内全部 |

## 依赖

- `nax-ui-theme`（CSS 变量 `--nax-*`，安装时依赖 / 运行时弱依赖）
