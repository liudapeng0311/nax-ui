# nax-popup

压窗屏 / 页面级弹层。

## 用法示例

```uvue
<nax-button label="打开" @click="show = true"></nax-button>
<nax-popup v-model:show="show" position="bottom">
  <view class="panel">
    <text>自定义内容（页面级，不盖原生栏）</text>
  </view>
</nax-popup>
```

```uvue
import { naxPopupSupportsWindowCover } from '@/uni_modules/nax-popup/index.uts'

if (naxPopupSupportsWindowCover()) {
  // App / Web：可压窗
} else {
  // 小程序：仅页面级
}
```

## Props

| 字段 | 类型 | 默认 | 说明 |
|---|---|---|---|
| url | string | 内置 host | 自定义 dialog 页面路径 |
| title / content | string | '' | 内置 host 文案 |
| position | string | center | center / bottom / left / right |
| mode | string | auto | auto / window / page |
| mask | boolean | true | 遮罩 |
| maskClosable | boolean | true | 点遮罩关闭 |
| round | boolean | true | 圆角 |
| width / height | string | '' | 面板尺寸 |
| zIndex | number | 10090 | 页面级层级 |
| duration | number | 280 | 动画 ms |
| themeClass | string | '' | 应用于内置 dialogPage host 的主题 class，例如 `nax-theme-dark` |
| animationType | string | fade-in | dialogPage 动画 |
| animationDuration | number | 280 | dialogPage 动画时长 |
| disableEscBack | boolean | false | 禁 ESC 关闭 |
| triggerParentHide | boolean | false | 是否触发父页 onHide |

## 依赖

- `nax-picker`（声明式 / 小程序降级）
- `nax-ui-theme`（token，可选）
