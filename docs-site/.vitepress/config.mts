import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar-data.mjs'

export default defineConfig({
  lang: 'zh-CN',
  title: 'nax-ui',
  description: 'nax-ui — uni-app x 通用 UI 组件库',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['meta', { name: 'keywords', content: 'uni-app x, uvue, nax-ui, UI 组件库' }]
  ],

  markdown: {
    languageAlias: {
      uvue: 'html',
      uts: 'ts'
    }
  },

  vite: {
    plugins: [
      {
        name: 'nax-demo-root-assets',
        configureServer(server) {
          // dev 模式下 demo 构建的资源只存在于 public/demo/ 下，
          // 但宿主构建以站点根为 base（请求 /assets/、/static/），
          // 统一重定向到 /demo/ 子路径；生产构建由 merge-demo.mjs 合并到 dist 根。
          server.middlewares.use((req, res, next) => {
            const url = req.url || ''
            if (
              url.startsWith('/assets/') ||
              url.startsWith('/static/') ||
              url.startsWith('/uni_modules/')
            ) {
              res.statusCode = 302
              res.setHeader('Location', '/demo' + url)
              res.end()
              return
            }
            next()
          })
        }
      }
    ]
  },

  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '指南', link: '/guide/intro' },
      { text: '组件', link: '/components/' }
    ],
    sidebar,
    outline: { label: '本页目录', level: [2, 3] },
    docFooter: { prev: '上一篇', next: '下一篇' },
    search: { provider: 'local' },
    lastUpdatedText: '最后更新',
    darkModeSwitchLabel: '主题',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})
