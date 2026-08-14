import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import IconGrid from './IconGrid.vue'
import './index.css'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('IconGrid', IconGrid)
  }
}
