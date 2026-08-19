<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import DocDemoLayout from './DocDemoLayout.vue'

const { page } = useData()
const { Layout } = DefaultTheme
// 自定义字段 demo（不使用 layout，避免 VitePress 默认布局按 layout 渲染自定义组件）
const isDemo = computed(() => !!page.value.frontmatter?.demo)

</script>

<template>
  <DocDemoLayout v-if="isDemo" />
  <Layout v-else>
    <template #layout-bottom>
      <footer class="nax-site-footer">
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
          鲁ICP备2026046667号-1
        </a>
      </footer>
    </template>
  </Layout>
</template>
