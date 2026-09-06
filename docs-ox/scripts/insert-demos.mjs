// 向 docs-ox/docs/components/*.md 的首个代码示例插入 demo 交互块（幂等：已有 demo 块的文件跳过）
import fs from 'node:fs'
import path from 'node:path'

const dir = new URL('../docs/components/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')

// 组件文件 -> demo 围栏信息串（wrapper 演示用 demo-* 名称）
const spec = {
  'action-sheet': 'demo-action-sheet',
  'alert': 'nax-alert',
  'avatar': 'nax-avatar',
  'badge': 'nax-badge',
  'calendar': 'demo-calendar',
  'card': 'nax-card',
  'cell': 'nax-cell',
  'checkbox': 'nax-checkbox label="同意协议"',
  'date-strip': 'nax-date-strip',
  'datetime-picker': 'demo-datetime-picker',
  'dialog': 'demo-dialog',
  'divider': 'nax-divider',
  'dropdown': 'demo-dropdown',
  'empty': 'nax-empty',
  'form': 'demo-form',
  'grid': 'nax-grid',
  'icon': 'nax-icon',
  'image': 'nax-image',
  'input': 'nax-input',
  'keyboard': 'demo-keyboard',
  'line': 'nax-line',
  'list': 'demo-list',
  'loading': 'nax-loading',
  'nav-bar': 'nax-nav-bar',
  'notice-bar': 'nax-notice-bar',
  'number-box': 'nax-number-box',
  'overlay': 'demo-overlay',
  'picker': 'demo-picker',
  'popup': 'demo-popup',
  'progress': 'nax-progress',
  'radio': 'nax-radio label="默认选项"',
  'rate': 'nax-rate',
  'rich-text': 'nax-rich-text',
  'search': 'nax-search',
  'select': 'demo-select',
  'skeleton': 'nax-skeleton',
  'slider': 'nax-slider',
  'space': 'nax-space',
  'steps': 'nax-steps current="1"',
  'swipe-action': 'demo-swipe-action',
  'swiper': 'nax-swiper height="180" indicator',
  'switch': 'nax-switch',
  'tabbar': 'demo-tabbar',
  'tabs': 'demo-tabs',
  'tag': 'nax-tag',
  'text': 'nax-text',
  'textarea': 'nax-textarea',
  'toast': 'demo-toast',
  'transition': 'nax-transition name="slide-up"',
  'upload': 'demo-upload',
  'virtual-list': 'demo-virtual-list',
}

let inserted = 0
let skipped = 0
const missing = []

for (const [name, demoLine] of Object.entries(spec)) {
  const file = path.join(dir, `${name}.md`)
  if (!fs.existsSync(file)) {
    missing.push(name)
    continue
  }
  let src = fs.readFileSync(file, 'utf8')
  if (/^```demo /m.test(src)) {
    skipped++
    continue
  }
  // 首个 html/vue/uvue 围栏
  const m = src.match(/^```(html|vue|uvue)\r?\n([\s\S]*?)\r?\n```/m)
  if (!m) {
    console.log(`no code fence: ${name}`)
    continue
  }
  const block = '```demo ' + demoLine + '\n' + m[2] + '\n```'
  src = src.replace(m[0], block)
  fs.writeFileSync(file, src)
  inserted++
}

console.log(`inserted: ${inserted}, skipped(has demo): ${skipped}, missing files: ${missing.join(',') || '-'}`)
