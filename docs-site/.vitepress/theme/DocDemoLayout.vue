<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { demoRoutes } from '../../.vitepress/demo-routes.mjs'

const { page } = useData()
const { Layout } = DefaultTheme
const demoName = computed(() => String(page.value.frontmatter?.demo || ''))
const demoRoute = computed(() =>
  demoRoutes[demoName.value] || `pages/components/${demoName.value}/index`
)
const demoUrl = computed(() => `/demo/index.html#/${demoRoute.value}`)

const iframeRef = ref<HTMLIFrameElement | null>(null)
let themeObserver: MutationObserver | null = null
let pollTimer: number | null = null
let lastSyncedTheme: boolean | null = null

function isSiteDark(): boolean {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
}

function showIframe(): void {
  if (iframeRef.value) iframeRef.value.style.opacity = '1'
}

function hideIframe(): void {
  if (iframeRef.value) iframeRef.value.style.opacity = '0'
}

const REVEAL_MIN_HOLD = 200

// 文档内嵌演示隐藏导航栏返回按钮（点击会 reLaunch 回演示首页）。
// 只在此 iframe 内注入样式，不改宿主演示工程本身。
const HIDE_BACK_CSS = '.nax-nav-bar__back { display: none !important; }'

function hideDemoBackButton(): void {
  const doc = iframeRef.value?.contentDocument
  if (!doc) return
  if (doc.getElementById('nax-doc-demo-hide-back')) return
  const style = doc.createElement('style')
  style.id = 'nax-doc-demo-hide-back'
  style.textContent = HIDE_BACK_CSS
  doc.head.appendChild(style)
}

function onIframeLoad(): void {
  // 暗色模式下，演示应用先以浅色首绘、再挂 nax-theme-dark，
  // 直接显示会闪白。这里等 iframe 内部出现暗色类，并保证最小持有期
  // （覆盖演示自身的白色首绘帧）后再淡入。
  hideDemoBackButton()
  if (!isSiteDark()) {
    showIframe()
    return
  }
  const startedAt = Date.now()
  let tries = 0
  const check = (): void => {
    const doc = iframeRef.value?.contentDocument
    tries++
    hideDemoBackButton()
    const hasDark = !!(doc && doc.querySelector('.nax-theme-dark'))
    const held = Date.now() - startedAt >= REVEAL_MIN_HOLD
    if ((hasDark && held) || tries > 80) {
      showIframe()
    } else {
      pollTimer = setTimeout(check, 50)
    }
  }
  check()
}

// 演示应用与文档站同源（/demo/index.html）。
// 站点暗黑切换只改 <html class="dark">，进不了 iframe；
// 这里把站点主题镜像到演示自己的主题存储，再刷新 iframe 让演示按新主题重新初始化。
// 注意：uni Web 的 storage 值是 JSON 包装（{"type":"string","data":...}），
// 且历史构建用旧键 nax_demo_dark_mode（"1"/"0"）、新代码用 nax_demo_theme_mode（"dark"/"light"），
// 两个键都写，兼容当前产物与重新构建后的产物。
const DEMO_THEME_KEYS = [
  { key: 'nax_demo_theme_mode', dark: 'dark', light: 'light' },
  { key: 'nax_demo_dark_mode', dark: '1', light: '0' }
]

function writeDemoTheme(dark: boolean): void {
  for (const { key, dark: darkVal, light: lightVal } of DEMO_THEME_KEYS) {
    window.localStorage.setItem(
      key,
      JSON.stringify({ type: 'string', data: dark ? darkVal : lightVal })
    )
  }
}

function syncDemoTheme(): void {
  if (typeof window === 'undefined') return
  const iframe = iframeRef.value
  if (!iframe || !iframe.contentWindow) return
  const dark = document.documentElement.classList.contains('dark')
  // 只在暗色状态真正变化时同步（防导航等其它 html class 变更误触发重载）
  if (lastSyncedTheme === dark) return
  lastSyncedTheme = dark
  try {
    writeDemoTheme(dark)
    hideIframe()
    iframe.contentWindow.location.reload()
  } catch (e) {
    // 存储不可用等极端情况：保持演示自身主题
  }
}

onMounted(() => {
  if (typeof window === 'undefined') return
  // 首次加载前先写入主题，保证 iframe 首次加载即生效
  try {
    writeDemoTheme(document.documentElement.classList.contains('dark'))
  } catch (e) {
    // ignore
  }
  lastSyncedTheme = document.documentElement.classList.contains('dark')
  // 暗色下先隐藏 iframe，等演示自身挂上暗色类后再淡入
  if (isSiteDark()) hideIframe()
  // 站点主题切换时同步刷新演示
  themeObserver = new MutationObserver(() => syncDemoTheme())
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})

onBeforeUnmount(() => {
  themeObserver?.disconnect()
  themeObserver = null
  if (pollTimer != null) {
    clearTimeout(pollTimer)
    pollTimer = null
  }
})
</script>

<template>
  <div class="nax-demo-layout">
    <Layout />
    <aside class="nax-demo-layout__preview">
      <div class="nax-demo-layout__frame">
        <iframe
          ref="iframeRef"
          :src="demoUrl"
          :title="`nax-${demoName} demo`"
          loading="lazy"
          @load="onIframeLoad"
        />
      </div>
    </aside>
  </div>
</template>

<style scoped>
.nax-demo-layout {
  position: relative;
}

/* 正文区域右侧让位给悬浮演示卡片。
   侧边栏在 VitePress 中是 fixed，正文用 VPContent 的 padding 让位；
   这里追加右侧 padding（面板 380px + 右缘 16px），
   并把 >=1440px 时原有的居中 padding 一并 +396。 */
.nax-demo-layout :deep(.VPContent.has-sidebar) {
  padding-right: 396px;
}

@media (min-width: 1440px) {
  .nax-demo-layout :deep(.VPContent.has-sidebar) {
    padding-right: calc((100vw - var(--vp-layout-max-width)) / 2 + 396px);
  }
}

.nax-demo-layout__preview {
  position: fixed;
  top: calc(var(--vp-nav-height) + 16px);
  right: 16px;
  z-index: 20;
  width: 380px;
  height: calc(100vh - var(--vp-nav-height) - 56px);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--nax-radius-lg);
  background: var(--vp-c-bg-elv);
  box-shadow: var(--nax-shadow-2);
  overflow: hidden;
}

.nax-demo-layout__frame {
  flex: 1;
  min-height: 0;
  padding: 12px;
}

.nax-demo-layout__frame iframe {
  width: 100%;
  height: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--nax-radius-lg, 14px);
  box-shadow: var(--nax-shadow-1, 0 1px 2px rgba(31, 35, 38, 0.04));
  background: var(--vp-c-bg);
  transition: opacity 150ms var(--nax-ease-out, cubic-bezier(0.23, 1, 0.32, 1));
}

@media (max-width: 1024px) {
  .nax-demo-layout__preview {
    display: none;
  }

  .nax-demo-layout :deep(.VPContent.has-sidebar) {
    padding-right: 0;
  }
}
</style>
