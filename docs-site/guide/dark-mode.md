# 暗黑模式接入

> 本文面向**使用 nax-ui 的业务开发者**，介绍如何给应用接入"跟随系统 / 浅色 / 深色"三态暗黑模式。

## 功能

| 能力 | 说明 |
|------|------|
| 跟随系统 | 系统切深色，App 立即跟着变（前台实时、无需重启） |
| 手动选择 | 用户手动选了"浅色/深色"后，系统怎么切都不受影响 |
| 三态切换 | 跟随系统 / 浅色 / 深色，随意来回切 |
| 全端一致 | 鸿蒙、Android、iOS、Web、小程序都能用 |

## 先完成主题基础（L1）

暗黑模式建立在 CSS 变量主题之上，请先按[主题接入](./theme)完成 L1：

1. `App.uvue` 引入 `default.css` 和 `dark.css`
2. 应用根节点挂载 `class="nax-theme"`

## 核心原理（一句话版）

> 用一个**全局状态**记录"当前是不是暗黑"，页面根节点的 `nax-theme-dark` class 由它驱动。
> 系统主题变了 → 全局状态更新 → 所有页面自动换肤。

全局状态用 Vue 的 `ref` 实现（模块级共享），**不需要引入 Pinia 等状态库**——uni-app x 蒸汽模式也不建议引入。

## 第 1 步：创建全局主题状态模块

新建 `common/theme-manager.uts`，内容如下（可直接复制）：

```uts
/**
 * 全局主题状态（三态）：followSystem 跟随系统 / light 浅色 / dark 深色
 * 手动选择后不再跟随系统；切回 followSystem 恢复联动。
 */
const STORAGE_KEY = 'app_theme_mode'

var themeMode = 'followSystem'
var systemDark = false
var themeInited = false

/** 页面共享的暗黑状态：页面 computed 依赖它即可自动换肤 */
export const darkRef = ref(false)

function syncDark() {
	darkRef.value = isDark()
}

function readStorage(): string {
	const raw = uni.getStorageSync(STORAGE_KEY)
	if (raw != null) {
		const s = '' + raw
		if (s == 'followSystem' || s == 'light' || s == 'dark') {
			return s
		}
	}
	return 'followSystem'
}

function writeStorage(mode: string) {
	uni.setStorageSync(STORAGE_KEY, mode)
}

/** 当前系统主题是不是暗色（各平台读取方式不同，见文末"平台差异"） */
function readSystemDark(): boolean {
	// 鸿蒙：uni API 拿不到系统主题，用原生能力（无需 import）
	// #ifdef APP-HARMONY
	const osTheme = UTSHarmony.getOsTheme()
	if ((osTheme as string) == 'dark') {
		return true
	} else if ((osTheme as string) == 'light') {
		return false
	}
	// #endif
	// Android：uni API 没有可用字段，用原生能力（无需 import）
	// #ifdef APP-ANDROID
	const osThemeAndroid = UTSAndroid.getOsTheme()
	if ((osThemeAndroid as string) == 'dark') {
		return true
	} else if ((osThemeAndroid as string) == 'light') {
		return false
	}
	// #endif
	// iOS / Web / 小程序：osTheme 是系统主题字段（全端可用）
	const info = uni.getSystemInfoSync()
	if (info.osTheme == 'dark') {
		return true
	}
	return false
}

/** 切换 App 原生层主题（避免页面转场闪白/闪黑） */
function applyAppTheme(mode: string) {
	// #ifdef APP-ANDROID || APP-IOS || APP-HARMONY
	var theme = 'light'
	if (mode == 'dark') {
		theme = 'dark'
	} else if (mode == 'followSystem') {
		theme = 'auto'
	}
	try {
		uni.setAppTheme({
			theme: theme as 'light' | 'dark' | 'auto'
		})
	} catch (e : any) {
		// 低版本不支持时保持 manifest 默认配置即可
	}
	// #endif
}

/** 应用启动时调用一次：读取存档 + 注册系统主题监听 */
export function initTheme() {
	if (themeInited) {
		return
	}
	themeMode = readStorage()
	themeInited = true
	systemDark = readSystemDark()
	applyAppTheme(themeMode)
	syncDark()

	// Android：没有 onOsThemeChange，用 onAppThemeChange 当"触发信号"，
	// 系统主题真值仍用原生 API 读取
	// #ifdef APP-ANDROID
	try {
		uni.onAppThemeChange((res: AppThemeChangeResult) => {
			const osTheme = UTSAndroid.getOsTheme()
			systemDark = (osTheme as string) == 'dark'
			if (themeMode == 'followSystem') {
				applyAppTheme('followSystem')
				syncDark()
			}
		})
	} catch (e : any) {
	}
	// #endif

	// iOS / 鸿蒙：onOsThemeChange 监听系统主题切换
	// #ifdef APP-IOS || APP-HARMONY
	try {
		uni.onOsThemeChange((res: OnOsThemeChangeCallbackResult) => {
			// 鸿蒙回调不带主题值，用原生 API；iOS 回调可能为空，用 osTheme 兜底
			// #ifdef APP-HARMONY
			const osTheme = UTSHarmony.getOsTheme()
			systemDark = (osTheme as string) == 'dark'
			// #endif
			// #ifndef APP-HARMONY
			if (res.theme == null || res.theme.length == 0) {
				const info = uni.getSystemInfoSync()
				systemDark = info.osTheme == 'dark'
			} else {
				systemDark = res.theme == 'dark'
			}
			// #endif
			if (themeMode == 'followSystem') {
				applyAppTheme('followSystem')
				syncDark()
			}
		})
	} catch (e : any) {
	}
	// #endif
}

/** 当前三态：followSystem / light / dark */
export function getThemeMode(): string {
	if (!themeInited) {
		initTheme()
	}
	return themeMode
}

/** 设置三态 */
export function setThemeMode(mode: string) {
	themeMode = mode
	themeInited = true
	writeStorage(mode)
	applyAppTheme(mode)
	syncDark()
}

/** 当前实际生效的暗黑状态（followSystem 时取系统主题） */
export function isDark(): boolean {
	if (!themeInited) {
		initTheme()
	}
	if (themeMode == 'followSystem') {
		return systemDark
	}
	return themeMode == 'dark'
}
```

## 第 2 步：App.uvue 启动时初始化

```uts
import { initTheme } from '@/common/theme-manager.uts'

onLaunch(() => {
	initTheme()
})
```

## 第 3 步：页面接入（每个页面只需 2 行）

在页面 `<script setup lang="uts">` 中：

```uts
import { initTheme, darkRef } from '@/common/theme-manager.uts'

initTheme()
const darkMode = darkRef
```

模板根节点（已有 `nax-theme` 的地方）绑定暗色 class：

```html
<view class="page-root nax-theme" :class="darkMode ? 'nax-theme-dark' : ''">
	<!-- 页面内容 -->
</view>
```

`darkMode` 是共享 ref：系统切主题 / 用户手动切换时，它自动变化，**所有页面**的 class 一起更新，无需页面自己监听。

## 第 4 步（可选）：设置页加三态选择

```html
<nax-cell title="外观模式" label="手动选择后不再跟随系统"></nax-cell>
<nax-cell title="跟随系统" @click="onMode('followSystem')">
	<template #right>
		<nax-icon v-if="themeMode == 'followSystem'" name="check" color="#18a058" :size="'18'"></nax-icon>
	</template>
</nax-cell>
<nax-cell title="浅色" @click="onMode('light')">
	<template #right>
		<nax-icon v-if="themeMode == 'light'" name="check" color="#18a058" :size="'18'"></nax-icon>
	</template>
</nax-cell>
<nax-cell title="深色" @click="onMode('dark')">
	<template #right>
		<nax-icon v-if="themeMode == 'dark'" name="check" color="#18a058" :size="'18'"></nax-icon>
	</template>
</nax-cell>
```

```uts
import { getThemeMode, setThemeMode } from '@/common/theme-manager.uts'

const themeMode = ref(getThemeMode())

function onMode(mode : string) {
	setThemeMode(mode)
	themeMode.value = mode
}
```

## 平台差异（为什么这么写）

不同平台拿到"系统是暗还是亮"的方式不一样，本方案已按平台自动适配：

| 平台 | 怎么知道系统是暗的 | 系统切换时如何感知 |
|------|--------------------|--------------------|
| 鸿蒙 | `UTSHarmony.getOsTheme()`（原生） | `onOsThemeChange` 回调 |
| Android | `UTSAndroid.getOsTheme()`（原生） | `onAppThemeChange` 回调（平台没有 `onOsThemeChange`） |
| iOS | `getSystemInfoSync().osTheme` | `onOsThemeChange` 回调 |
| Web / 小程序 | `getSystemInfoSync().osTheme` | 无实时通知，回到页面时 `onShow` 刷新即可 |

> 为什么不用 `uni.getAppBaseInfo().hostTheme`？官方文档明确：`hostTheme` **仅 Web 和微信小程序支持**，App 端拿不到（实测返回 `undefined`）。
> 为什么不用 `getSystemInfoSync().theme`？该字段在 Android 端类型中不存在（编译报错），鸿蒙端返回 `undefined`；请统一使用 `osTheme` 字段。

## 常见问题

**Q：系统切了深色，App 在前台没变？**
A：鸿蒙/Android 有实时监听会自动变；如果没变，先确认 `initTheme()` 已在 `App.uvue` 调用、页面用的是共享 `darkRef` 而不是本地 `ref`。

**Q：用户手动选"深色"后，系统切浅色会被覆盖吗？**
A：不会。只有 `followSystem` 模式下系统切换才生效，手动选择优先（主流 App 的标准行为）。

**Q：弹窗 / dialogPage 不跟随主题？**
A：`dialogPage` 是独立页面，无法继承触发页的主题 class。在弹层页根节点挂相同的 `nax-theme nax-theme-dark` class（按当前暗黑状态），详见 [主题接入](./theme#dialogpage-主题同步) 的"dialogPage 主题同步"章节。
