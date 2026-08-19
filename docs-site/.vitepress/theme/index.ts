import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import Contributors from './Contributors.vue'
import IconGrid from './IconGrid.vue'
import './index.css'

let scrollbarSetup = false
// 滚动时显示滚动条、停止 500ms 后隐藏（配合 index.css 的 .scrolling 样式）
function setupScrollbarHiding() {
  if (typeof window === 'undefined' || scrollbarSetup) return
  scrollbarSetup = true
  let timer = 0
  const hide = () => document.documentElement.classList.remove('scrolling')
  const onScroll = () => {
    document.documentElement.classList.add('scrolling')
    window.clearTimeout(timer)
    timer = window.setTimeout(hide, 500)
  }
  // 捕获阶段监听，覆盖页面根滚动与所有内层滚动容器（侧栏、代码块等）
  document.addEventListener('scroll', onScroll, true)
}

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Contributors', Contributors)
    app.component('IconGrid', IconGrid)
    setupScrollbarHiding()
  }
}
