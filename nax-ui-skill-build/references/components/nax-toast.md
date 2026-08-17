# nax-toast

`nax-ui` 轻提示（uni-app x / uvue）。

## 用法示例

```uvue
<nax-toast />
```

```uvue
import {
  naxToast as showNaxToast,
  hideNaxToast,
  naxToastSuccess,
  naxToastError,
  naxToastLoading
} from '@/uni_modules/nax-toast/index.uts'

showNaxToast('操作成功')
showNaxToast({ title: '保存成功', type: 'success' })
naxToastSuccess('已提交')
naxToastError('网络异常')
naxToastLoading('提交中…')
// 手动关闭（loading 常用）
hideNaxToast()
```

## Props — naxToast(input)

| 入参 | 说明 |
|---|---|
| `string` | 等价 `{ title: string, type: 'text' }` |
| `object` | 见下表 |

## Props — naxToast(input)

| 字段 | 类型 | 默认 | 说明 |
|---|---|---|---|
| title / message | string | `''` | 文案（message 为别名） |
| type | string | `text` | `text` / `success` / `error` / `warning` / `info` / `loading` |
| icon | string | `''` | 自定义 `nax-icon` 名；空则按 type 映射 |
| duration | number | `2000` | 毫秒；`0` 不自动关闭（loading 默认 0） |
| position | string | `center` | `top` / `center` / `bottom` |
| overlay | boolean | `false` | 是否显示遮罩（loading 可设 true 防误触） |
| showIcon | boolean | `true` | 是否显示图标；`text` 类型默认无图标 |
| bg / background | string | `''` | 单次背景色（如 `#18a058` / `rgba(0,0,0,0.85)`）；空则走主题/type |

## Props — 宿主组件 props

| prop | 类型 | 默认 | 说明 |
|---|---|---|---|
| z-index | number | `10090` | 层级 |
| custom-class | string | `''` | 根节点扩展 class |

## Methods（ref 调用）

**快捷方法**

- `naxToastSuccess(title)`
- `naxToastError(title)`
- `naxToastWarning(title)`
- `naxToastInfo(title)`
- `naxToastLoading(title?, overlay?)`


## 依赖

- `nax-icon`（类型图标 / loading）
- `nax-ui-theme`（可选 token）
