# 压窗屏（nax-popup）跨端说明

> 对应插件：`uni_modules/nax-popup`  
> 官方能力：uni-app x [dialogPage](https://doc.dcloud.net.cn/uni-app-x/api/dialog-page.html)

## 1. 什么是压窗屏

业务常说的「压窗屏」= **弹层遮罩能盖住原生导航栏和底部 tabBar**，而不是只盖住页面内容区。

| 层级 | 能否盖原生导航栏 / tabBar | 典型实现 |
|------|---------------------------|----------|
| 页面内 fixed 弹层 | ❌ | `nax-picker` / `nax-dialog` / 声明式 `nax-popup` |
| dialogPage 对话框页 | ✅（App / Web） | `openNaxPopup` / `uni.openDialogPage` |
| 系统 Modal | ✅（样式受限） | `uni.showModal` |

## 2. 平台矩阵

| 端 | 真压窗 | nax-popup 行为 |
|----|--------|----------------|
| App Android / iOS | ✅（HX ≥ 4.31） | `openDialogPage` + 内置 host 或业务 url |
| App HarmonyOS | ✅（HX ≥ 4.61） | 同上 |
| Web | ✅（HX ≥ 4.31） | 同上 |
| 微信小程序 | ❌ | **无 dialogPage**；降级页面级宿主，并 console.warn |

## 3. 推荐用法

### App / Web 需要盖住原生栏

```uts
import { openNaxPopup, closeNaxPopup } from '@/uni_modules/nax-popup/index.uts'

// 简易
openNaxPopup({ title: '提示', content: '...' })

// 复杂 UI：自建透明页
openNaxPopup({ url: '/pages/xxx/my-dialog', animationType: 'fade-in' })
```

`pages.json` 必须注册：

- `uni_modules/nax-popup/pages/host/index`（用内置简易面板时）
- 以及你的自定义 dialog 页（`navigationStyle: custom`；`backgroundColor: transparent` 仅放在 `app-plus` / `app-harmony` / `h5`，微信小程序不支持 transparent，须用 hex）

### 不需要盖原生栏 / 需要插槽

继续用 `nax-picker` 或声明式：

```uvue
<nax-popup v-model:show="show" position="bottom">
  <view>自定义</view>
</nax-popup>
```

### 微信小程序

1. **无法**用本库实现「盖住原生导航栏 + 原生 tabBar」的自定义 UI。  
2. `openNaxPopup` 会降级为页面级 `<nax-popup />` 宿主（需页面挂载一次）。  
3. 若产品强制全屏遮罩：
   - 页面 `navigationStyle: custom`
   - 避免原生 tabBar，或改自定义 tabBar
   - 或接受系统 `showModal`

```uts
import { naxPopupSupportsWindowCover } from '@/uni_modules/nax-popup/index.uts'

if (!naxPopupSupportsWindowCover()) {
  // 小程序分支：引导自定义导航，或仅用页面级弹层
}
```

## 4. 与 page-container 的区别

官方 `page-container`：跨端弹出层组件，可拦截返回，但**不支持**覆盖顶部导航栏与 tabBar。  
nax-popup 的 window 模式基于 **dialogPage**，才具备压窗能力（小程序除外）。

## 5. 接入检查清单

- [ ] HBuilderX / uni-app x 版本满足 dialogPage 要求  
- [ ] `pages.json` 已注册 host 与自定义 dialog 页  
- [ ] 小程序已挂 `<nax-popup />` 宿主（若用 API）  
- [ ] 产品文档写明小程序限制  
- [ ] 复杂 UI 不用插槽跨 dialog 页，改 `url` 独立页  

## 6. 演示

宿主工程：`pages/components/popup/index`  
自定义 dialog 示例：`pages/components/popup/demo-dialog`
