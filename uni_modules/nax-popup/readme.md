# nax-popup

压窗屏 / 页面级弹层。

> **压窗屏**：遮罩与内容能盖住 `pages.json` 配置的**原生导航栏**和**底部 tabBar**。  
> 官方能力来源：uni-app x [`dialogPage`](https://doc.dcloud.net.cn/uni-app-x/api/dialog-page.html)（HBuilderX 4.31+）。

## 平台能力矩阵

| 端 | 真·压窗（盖原生导航栏 + tabBar） | 实现方式 | 说明 |
|----|----------------------------------|----------|------|
| **App Android** | ✅ | `uni.openDialogPage` | HX ≥ 4.31 |
| **App iOS** | ✅ | `uni.openDialogPage` | HX ≥ 4.31 |
| **App HarmonyOS** | ✅ | `uni.openDialogPage` | HX ≥ 4.61 |
| **Web** | ✅ | `uni.openDialogPage` | HX ≥ 4.31 |
| **微信小程序** | ❌ | 页面级 `nax-picker` 降级 | 官方 **不支持** dialogPage |

### 为什么小程序做不到真压窗？

1. uni-app x **微信小程序端不提供** `openDialogPage` / `closeDialogPage`。  
2. 页面内 `position: fixed` 组件（含 `nax-picker` / `page-container`）只能盖住**页面内容区**，盖不住原生导航栏与原生 tabBar。  
3. 业务若必须全屏遮罩，请改用：
   - `navigationStyle: custom` 自定义导航栏；和/或
   - 自定义 tabBar（非原生 tabBar）；或
   - 系统级 `uni.showModal`（样式不可完全自定义）。

检测：

```uts
import { naxPopupSupportsWindowCover } from '@/uni_modules/nax-popup/index.uts'

if (naxPopupSupportsWindowCover()) {
  // App / Web：可压窗
} else {
  // 小程序：仅页面级
}
```

## 与 nax-picker / nax-dialog 的关系

| 组件 | 定位 | 能否盖原生栏 |
|------|------|--------------|
| `nax-picker` | 页面级通用弹出容器（插槽） | ❌ |
| `nax-dialog` | 居中确认框（页面级） | ❌ |
| **`nax-popup`** | 压窗屏 API + 简易 host + 页面级声明式 | App/Web ✅；小程序 ❌（降级） |

复杂自定义 UI：

- **不需要盖原生栏** → 继续用 `nax-picker` 声明式插槽。  
- **需要盖原生栏（App/Web）** → `openNaxPopup({ url: '/pages/你的透明弹层页' })`，自己写 dialog 页。  
- **简易文案面板** → `openNaxPopup({ title, content })` 走内置 host。

## 安装与注册

1. 放入 `uni_modules/nax-popup`（依赖 `nax-picker`、`nax-ui-theme`）。  
2. **注册内置 host 页**（使用简易 title/content 或默认 window 模式时必须）：

```json
{
  "path": "uni_modules/nax-popup/pages/host/index",
  "style": {
    "navigationStyle": "custom",
    "navigationBarTitleText": "",
    "backgroundColor": "transparent"
  }
}
```

3. 小程序降级 / 声明式宿主：页面挂一次 `<nax-popup />`（可空标签）。

## 命令式：压窗屏

```uts
import {
  openNaxPopup,
  closeNaxPopup,
  naxPopupSupportsWindowCover
} from '@/uni_modules/nax-popup/index.uts'

// 1) 内置简易面板（App/Web 真压窗；小程序需挂宿主后降级）
openNaxPopup({
  title: '提示',
  content: '遮罩会盖住导航栏与 tabBar（App/Web）',
  position: 'center', // center | bottom | left | right
  maskClosable: true
})

// 2) 打开业务自定义 dialog 页（推荐复杂 UI）
openNaxPopup({
  url: '/pages/components/popup/demo-dialog',
  animationType: 'fade-in'
})

// 3) 强制页面级（全端一致，不压窗）
openNaxPopup({
  mode: 'page',
  title: '页面级',
  content: '不盖原生栏'
})

closeNaxPopup()
```

### options

| 字段 | 类型 | 默认 | 说明 |
|------|------|------|------|
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
| animationType | string | fade-in | dialogPage 动画 |
| animationDuration | number | 280 | dialogPage 动画时长 |
| disableEscBack | boolean | false | 禁 ESC 关闭 |
| triggerParentHide | boolean | false | 是否触发父页 onHide |

`mode`：

- `auto`：能压窗用 window，否则 page  
- `window`：强制 dialogPage；不支持则 warn 并降级 page  
- `page`：强制页面宿主（全端不盖原生栏）

## 声明式：页面级插槽

```uvue
<nax-button label="打开" @click="show = true"></nax-button>
<nax-popup v-model:show="show" position="bottom">
  <view class="panel">
    <text>自定义内容（页面级，不盖原生栏）</text>
  </view>
</nax-popup>
```

与 `nax-picker` 类似，适合自定义导航页或可接受不盖原生栏的场景。

## 自定义 dialog 页模板（App/Web 压窗）

```uvue
<!-- pages/xxx/my-dialog.uvue -->
<template>
  <view class="wrap" @click="close">
    <view class="mask"></view>
    <view class="panel" @click.stop>
      <!-- 业务内容 -->
    </view>
  </view>
</template>
<script setup lang="uts">
function close() {
  // #ifdef APP-ANDROID || APP-IOS || APP-HARMONY || WEB
  uni.closeDialogPage({})
  // #endif
}
</script>
<style>
.wrap { position: absolute; left:0; top:0; right:0; bottom:0; }
.mask { position: absolute; left:0; top:0; right:0; bottom:0; background-color: rgba(0,0,0,0.4); }
</style>
```

pages.json 注册该页，`navigationStyle: custom`，背景透明；再：

```uts
openNaxPopup({ url: '/pages/xxx/my-dialog' })
```

## 依赖

- `nax-picker`（声明式 / 小程序降级）
- `nax-ui-theme`（token，可选）

### 自定义 dialog 页动画建议

- 推荐 `animationType: 'none'`，由页面内部做遮罩淡入 + 面板缩放/滑入（见演示 `demo-dialog`）。
- 若用页级 `fade-in`，请勿再在页内对同一遮罩做首帧 opacity 动画，以免鸿蒙叠闪。

## 已知限制

1. dialogPage **不能把 Vue 插槽跨页传递**；复杂 UI 请用独立 dialog 页 + `url`。  
2. 小程序无法真压窗，库内已降级并 warn，请业务按上表改造导航/tabBar。  
3. 内置 host 仅为简易 title/content，不承担复杂表单。  
4. tabBar 页上 dialogPage 在 App 切换 tab 时可能保持（官方行为）；Web 会随 tab 隐藏/恢复。
