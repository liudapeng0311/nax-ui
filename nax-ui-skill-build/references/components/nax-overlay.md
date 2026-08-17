# nax-overlay

全屏遮罩层（弹层底层）。用于压暗页面、拦截点击，可叠加自定义内容（如 `nax-loading`）。

## 用法示例

```uvue
<nax-overlay :show="visible" @click="visible = false"></nax-overlay>
```

```uvue
<!-- v-model + 点遮罩关闭 -->
<nax-overlay v-model:show="visible" close-on-click></nax-overlay>
```

## Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| show | boolean | `false` | 是否显示；支持 `v-model:show` |
| z-index | number | `1000` | 层级 |
| duration | number | `280` | 淡入淡出 ms；`0` 无动画 |
| color | string | `''` | 遮罩色；空则 `--nax-color-mask` |
| close-on-click | boolean | `false` | 点遮罩时 `update:show=false` |
| custom-class | string | `''` | 根节点扩展 class |
| custom-style | string | `''` | 根节点扩展 style |

## Events

| 事件 | 说明 |
|---|---|
| update:show | 显隐变更 |
| click | 点击遮罩（点内容不触发） |
| open | 进场开始 |
| opened | 进场结束 |
| close | 退场结束并卸载 |

## Slots

| 名称 | 说明 |
|---|---|
| default | 叠在遮罩中央的内容 |

## 依赖

- `nax-ui-theme`（可选，提供 `--nax-color-mask`）
