# nax-avatar

uni-app x 头像组件，提供常用能力。

## 用法示例

```uvue
<!-- 图片头像 -->
<nax-avatar src="https://example.com/a.jpg"></nax-avatar>

<!-- 文字头像 -->
<nax-avatar text="NA" color="#18a058"></nax-avatar>

<!-- 自定义尺寸（px） -->
<nax-avatar src="https://example.com/a.jpg" size="48"></nax-avatar>

<!-- 边框 -->
<nax-avatar src="https://example.com/a.jpg" border-color="#18a058"></nax-avatar>
```

## Props — 形状 shape

| 值 | 说明 |
|---|---|
| `circle` | 圆形（默认） |
| `square` | 直角方形 |
| `round` | 圆角方形 |

## Props — 尺寸 size

| 值 | 边长 | 尺寸别名 |
|---|---|---|
| `sm` / `small` | 28px | small |
| `md` / `medium` | 34px | medium（默认） |
| `lg` / `large` | 40px | large |
| 数字字符串 | 自定义 px | number |

## Props — Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| src | string | `''` | 图片地址 |
| text | string | `''` | 文字头像；无图或失败时展示 |
| size | string | `md` | `sm` / `md` / `lg` 或数字字符串 |
| shape | string | `circle` | `circle` / `square` / `round` |
| bordered | boolean | `false` | 描边 |
| border-color | string | `''` | 描边颜色；有值时自动显示描边 |
| color | string | `''` | 背景色（文字头像常用） |
| text-color | string | `''` | 文字颜色；有 `color` 时默认 `#fff` |
| mode | string | `aspectFill` | 原生 image mode |
| object-fit | string | `''` | 兼容常用取值：`fill` / `contain` / `cover` / `none` / `scale-down` |
| fallback-src | string | `''` | 加载失败回退图 |
| custom-class | string | `''` | 根节点扩展 class |

## Events

| 事件 | 说明 |
|---|---|
| click | 点击 |
| load | 图片加载成功 |
| error | 主图与 fallback 均失败（或仅主图失败且无 fallback） |

## Slots

| 名称 | 说明 |
|---|---|
| default | 无图 / 最终失败时的自定义内容（如 `nax-icon`） |

## 依赖

- `nax-ui-theme`（CSS 变量 `--nax-*`，安装时依赖 / 运行时弱依赖）
