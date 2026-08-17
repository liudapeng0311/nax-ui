<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import DocDemoLayout from './DocDemoLayout.vue'

const { page } = useData()
const { Layout } = DefaultTheme
// 自定义字段 demo（不使用 layout，避免 VitePress 默认布局按 layout 渲染自定义组件）
const isDemo = computed(() => !!page.value.frontmatter?.demo)

onMounted(() => {
  if (isDemo.value) return
  // 不蒜子站点访问量统计：客户端注入脚本，避免 SSR 阶段执行
  const s = document.createElement('script')
  s.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
  s.async = true
  document.body.appendChild(s)
})
</script>

<template>
  <DocDemoLayout v-if="isDemo" />
  <Layout v-else>
    <template #layout-bottom>
      <footer class="nax-site-footer">
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
          鲁ICP备2026046667号-1
        </a>
        <span class="nax-site-footer__pv">
          · <span id="busuanzi_value_site_pv">0</span> 次访问
        </span>
      </footer>
    </template>
  </Layout>
</template>
