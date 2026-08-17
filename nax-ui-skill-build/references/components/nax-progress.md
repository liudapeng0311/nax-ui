# nax-progress

进度条。线形 / 圆形统一入口，用 `shape` 切换。

## 用法示例

```uvue
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

## Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| percent | number | `0` | 进度 0–100，越界自动夹取 |
| shape | string | `line` | `line` / `circle` |
| type | string | `primary` | `default` / `primary` / `info` / `success` / `warning` / `error`（`danger`→error） |
| status | string | `''` | `success` / `warning` / `error`；有值时覆盖 type 颜色 |
| size | string | `md` | `sm` / `md` / `lg` |
| show-info | boolean | `true` | 是否显示百分比/文案 |
| text-inside | boolean | `false` | 线形：文案画在进度条内 |
| use-slot | boolean | `false` | 使用默认插槽自定义信息区 |
| stroke-width | number | `0` | 线形高度 / 圆形描边宽（px）；`0` 跟随 size |
| width | number | `0` | 圆形直径（px）；`0` 跟随 size |
| color | string | `''` | 激活色，覆盖 type/status |
| track-color | string | `''` | 轨道色；空则 divider token |
| pivot-text | string | `''` | 自定义文案；空则 `{percent}%` |
| custom-class | string | `''` | 根节点扩展 class |

## Slots

| 名称 | 说明 |
|---|---|
| default | 自定义信息区（需 `use-slot`；线形外侧/条内，或圆形中心） |

## 依赖

- `nax-ui-theme`（可选，CSS 变量 `--nax-*`）
