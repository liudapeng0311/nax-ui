<script setup lang="ts">
import { computed } from 'vue'
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
</script>

<template>
  <div class="nax-demo-layout">
    <Layout />
    <aside class="nax-demo-layout__preview">
      <div class="nax-demo-layout__bar">
        <span class="nax-demo-layout__bar-title">实时演示</span>
        <a
          class="nax-demo-layout__bar-link"
          :href="demoUrl"
          target="_blank"
          rel="noopener"
          title="新窗口打开"
        >↗</a>
      </div>
      <div class="nax-demo-layout__frame">
        <iframe
          :src="demoUrl"
          :title="`nax-${demoName} demo`"
          loading="lazy"
        />
      </div>
    </aside>
  </div>
</template>

<style scoped>
.nax-demo-layout {
  position: relative;
}

/* 正文区域右侧让位给悬浮演示列。
   侧边栏在 VitePress 中是 fixed，正文用 VPContent 的 padding 让位；
   这里追加右侧 padding，并把 >=1440px 时原有的居中 padding 一并 +380。 */
.nax-demo-layout :deep(.VPContent.has-sidebar) {
  padding-right: 380px;
}

@media (min-width: 1440px) {
  .nax-demo-layout :deep(.VPContent.has-sidebar) {
    padding-right: calc((100vw - var(--vp-layout-max-width)) / 2 + 380px);
  }
}

.nax-demo-layout__preview {
  position: fixed;
  top: var(--vp-nav-height);
  right: 0;
  z-index: 20;
  width: 380px;
  height: calc(100vh - var(--vp-nav-height));
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
}

.nax-demo-layout__bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
}

.nax-demo-layout__bar-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-size: 14px;
  line-height: 1;
}

.nax-demo-layout__bar-link:hover {
  color: var(--vp-c-brand-2);
}

.nax-demo-layout__frame {
  flex: 1;
  min-height: 0;
  padding: 16px;
}

.nax-demo-layout__frame iframe {
  width: 100%;
  height: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: #fff;
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
