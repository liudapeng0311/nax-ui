// 从 docs-site 的 sidebar-data.mjs 程序化生成 docs-ox 显式侧边栏配置并重建内容
// 用法：node scripts/sync-sidebar.mjs（改完 docs-site 分组后执行）
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const docsSiteData = path.join(here, '../../docs-site/.vitepress/sidebar-data.mjs')
const configPath = path.join(here, '../docs/.ox-uni-press/config.ts')

const { sidebar } = await import('file://' + docsSiteData)

// "按钮 <span class="nax-sidebar-en">Button</span>" -> "按钮 Button"
const clean = (t) => t.replace(/\s*<span class="nax-sidebar-en">(.*?)<\/span>/, ' $1')

const lines = []
for (const [key, groups] of Object.entries(sidebar)) {
  lines.push(`    // ${key}`)
  for (const g of groups) {
    lines.push('      {')
    lines.push(`        text: ${JSON.stringify(g.text)},`)
    lines.push('        items: [')
    for (const it of g.items) {
      lines.push(`          { text: ${JSON.stringify(clean(it.text))}, link: ${JSON.stringify(it.link)} },`)
    }
    lines.push('        ],')
    lines.push('      },')
  }
}
const snippet = lines.join('\n')

const config = `// 不 import @ox-uni-press/core：defineConfig 仅为类型包装，普通对象等价，
// 免去宿主工程 node_modules 必须能解析该包才能加载配置的限制
export default {
  site: {
    title: 'nax-ui Docs',
    description: '面向 uni-app x（uvue）的通用 UI 组件库',
    lang: 'zh-CN',
    logo: '/static/logo.png',
    footer: {
      copyright: '© 2026 nax-ui',
      links: [
        { text: 'GitHub', link: 'https://github.com/liudapeng0311/nax-ui' },
        { text: 'Gitee', link: 'https://gitee.com/liusixsix/nax-ui' },
      ],
    },
  },
  theme: {
    nav: [
      { text: '指南', link: '/guide/intro' },
      { text: '组件', link: '/components/' },
      { text: '组合式函数', link: '/composables/' },
    ],
    // 显式分组：与 docs-site 侧边栏分组/命名保持一致
    // 本文件由 scripts/sync-sidebar.mjs 从 docs-site/sidebar-data.mjs 生成，勿手改分组部分
    sidebar: [
${snippet}
    ],
    outline: { depth: 2 },
  },
}
`

fs.writeFileSync(configPath, config)
console.log('config.ts updated, groups:', sidebar ? Object.keys(sidebar).length : '?')
execSync('npm run build', { cwd: path.join(here, '..'), stdio: 'inherit' })
