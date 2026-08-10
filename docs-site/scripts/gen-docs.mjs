/**
 * nax-ui 组件文档生成器
 *
 * 从 uni_modules 组件包（JSDoc + defineProps/defineEmits）
 * 与包内 readme.md（用法示例）生成 VitePress 组件文档页 + 侧边栏数据。
 *
 * 用法：node scripts/gen-docs.mjs（在 docs-site 目录下运行）
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SITE = path.resolve(__dirname, '..')
const ROOT = path.resolve(SITE, '..')
const UNI = path.join(ROOT, 'uni_modules')
const OUT_DIR = path.join(SITE, 'components')
const SIDEBAR_OUT = path.join(SITE, '.vitepress', 'sidebar-data.mjs')

// ---------------------------------------------------------------------------
// 组件分类（对应 docs/component-inventory.md 的分期分组）
// ---------------------------------------------------------------------------
const CATEGORIES = [
  {
    text: '基础组件',
    items: ['button', 'text', 'icon', 'space', 'line', 'divider', 'tag', 'badge', 'avatar']
  },
  {
    text: '布局组件',
    items: ['cell', 'card', 'grid', 'steps', 'list', 'virtual-list', 'swipe-action', 'swiper']
  },
  {
    text: '表单组件',
    items: [
      'input', 'search', 'textarea', 'select', 'calendar', 'datetime-picker', 'keyboard',
      'switch', 'slider', 'checkbox', 'radio', 'number-box', 'rate', 'upload', 'form'
    ]
  },
  {
    text: '反馈组件',
    items: [
      'transition', 'loading', 'progress', 'skeleton', 'overlay', 'picker', 'popup',
      'toast', 'dialog', 'action-sheet', 'alert', 'notice-bar'
    ]
  },
  {
    text: '导航组件',
    items: ['nav-bar', 'tabbar', 'tabs', 'dropdown']
  },
  {
    text: '展示组件',
    items: ['image', 'empty']
  }
]

const CATEGORY_TEXT = {}
for (const c of CATEGORIES) {
  for (const name of c.items) {
    CATEGORY_TEXT[name] = c.text
  }
}

// 组件目录下还有子组件（group 等）需要提示，但文档页按包生成
const COMPONENT_DISPLAY = {
  'cell': 'nax-cell / nax-cell-group',
  'checkbox': 'nax-checkbox / nax-checkbox-group',
  'radio': 'nax-radio / nax-radio-group',
  'steps': 'nax-steps / nax-step',
  'grid': 'nax-grid / nax-grid-item',
  'form': 'nax-form / nax-form-item',
  'swipe-action': 'nax-swipe-action / nax-swipe-action-group',
  'space': 'nax-space / nax-space-item'
}

const COMPONENT_LABELS = {
  button: '按钮',
  text: '文本',
  icon: '图标',
  space: '间距',
  line: '线条',
  divider: '分割线',
  tag: '标签',
  badge: '徽标',
  avatar: '头像',
  cell: '单元格',
  card: '卡片',
  grid: '宫格',
  steps: '步骤条',
  list: '列表',
  'virtual-list': '虚拟列表',
  'swipe-action': '滑动操作',
  swiper: '轮播',
  input: '输入框',
  search: '搜索框',
  textarea: '文本域',
  select: '选择器',
  calendar: '日历',
  'datetime-picker': '日期时间选择器',
  keyboard: '键盘',
  switch: '开关',
  slider: '滑动选择器',
  checkbox: '复选框',
  radio: '单选框',
  'number-box': '步进器',
  rate: '评分',
  upload: '上传',
  form: '表单',
  transition: '过渡',
  loading: '加载',
  progress: '进度条',
  skeleton: '骨架屏',
  overlay: '遮罩层',
  picker: '弹出容器',
  popup: '压窗屏',
  toast: '轻提示',
  dialog: '对话框',
  'action-sheet': '动作面板',
  alert: '警告提示',
  'notice-bar': '通告栏',
  'nav-bar': '导航栏',
  tabbar: '底部标签栏',
  tabs: '标签页',
  dropdown: '下拉菜单',
  image: '图片',
  empty: '空状态'
}

// 文档站点级覆盖（只影响生成的 docs-site 页面，不改组件包内容）
// 插件市场链接：有值的组件，安装节展示插件市场链接替代 uni_modules 目录
const PLUGIN_URLS = {
  button: 'https://ext.dcloud.net.cn/plugin?id=29025',
  text: 'https://ext.dcloud.net.cn/plugin?id=29072'
}

// 组件总览表说明覆盖
const OVERVIEW_DESCS = {
  icon: '字体图标。',
  badge: '徽标。'
}

// Props 说明覆盖（键：组件名 -> 属性名 -> 说明）
const PROPS_DESC_OVERRIDES = {
  button: {
    type: '`default` 默认 | `primary` 主要 | `info` 信息 | `success` 成功 | `warning` 警告 | `error` 错误（兼容 `tertiary` / `danger`）',
    variant: '`solid` 实心 | `secondary` 次要 | `tertiary` 次次要 | `quaternary` 次次次要 | `outline` 描边 | `dashed` 虚线 | `text` 文字 | `light` 浅色',
    size: '`sm` 小 | `md` 中 | `lg` 大',
    shape: '`square` 方形 | `round` 圆角 | `circle` 圆形',
    iconPosition: '图标位置：`left` 左侧（默认）| `right` 右侧'
  },
  text: {
    type: '`default` 默认 | `primary` 主题色 | `info` 信息 | `success` 成功 | `warning` 警告 | `error` 错误 | `secondary` 次要 | `placeholder` 占位',
    mode: '模式：`text` 文本 | `price` 价格 | `phone` 手机号 | `name` 姓名 | `date` 日期 | `link` 链接',
    size: '字号：`sm`(14) | `md`(16 默认) | `lg`(18) | `xl`(20) | 数字字符串（px）',
    decoration: '装饰：`none` 无 | `underline` 下划线 | `line-through` 删除线',
    align: '对齐：`left` 左对齐（默认）| `center` 居中 | `right` 右对齐'
  }
}

// ---------------------------------------------------------------------------
// 通用工具
// ---------------------------------------------------------------------------
function readUtf8(p) {
  return fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '').replace(/\r\n/g, '\n')
}

function escTableCell(s) {
  return s.replace(/\|/g, '\\|').replace(/\r/g, ' ').replace(/\n/g, '<br>')
}

// 去掉行首的 "* "（JSDoc 注释行）
function cleanJsdocLine(line) {
  return line.replace(/^\s*\*?\s?/, '').replace(/\s+$/, '')
}

// ---------------------------------------------------------------------------
// uvue 解析
// ---------------------------------------------------------------------------
function parseUvue(uvuePath) {
  const src = readUtf8(uvuePath)
  const scriptMatch = src.match(/<script setup lang="uts">([\s\S]*?)<\/script>/)
  if (!scriptMatch) {
    throw new Error('未找到 <script setup lang="uts"> 块')
  }
  const script = scriptMatch[1]

  // JSDoc 块（组件文件里第一个块注释）
  const jsdocMatch = script.match(/\/\*\*([\s\S]*?)\*\//)
  const jsdoc = jsdocMatch ? jsdocMatch[1] : ''
  const jsdocLines = jsdoc.split('\n').map(cleanJsdocLine).filter((l) => l !== '')

  const jsdocProps = {}
  const jsdocEvents = {}
  const jsdocSlots = {}
  const description = []
  for (const line of jsdocLines) {
    const propM = line.match(/^@property\s+(?:\{([^}]+)\})?\s*([\w:-]+)\s*([\s\S]*)$/)
    const eventM = line.match(/^@event\s+([\w:-]+)\s*([\s\S]*)$/)
    const slotM = line.match(/^@slot\s+([\w:-]+)\s*([\s\S]*)$/)
    const descM = line.match(/^@description\s+([\s\S]*)$/)
    if (propM) {
      jsdocProps[propM[2]] = { type: (propM[1] || '').trim(), desc: (propM[3] || '').trim() }
    } else if (eventM) {
      jsdocEvents[eventM[1]] = (eventM[2] || '').trim()
    } else if (slotM) {
      jsdocSlots[slotM[1]] = (slotM[2] || '').trim()
    } else if (descM) {
      description.push(descM[1].trim())
    } else if (!/^nax-/.test(line)) {
      description.push(line)
    }
  }

  // defineProps({...}) —— 括号深度匹配
  const propsDecl = extractBalanced(script, 'defineProps(')
  const props = propsDecl ? parsePropsObject(propsDecl, jsdocProps) : []
  // defineEmits([...]) / defineEmits({...})
  const emitsDecl = extractBalanced(script, 'defineEmits(')
  const events = emitsDecl ? parseEmits(emitsDecl, jsdocEvents) : []

  return { description: description.join('\n').trim(), props, events, jsdocSlots }
}

// 从脚本中按括号深度截取 "fnName(" 到匹配 ")" 之间的内容
function extractBalanced(script, token) {
  const start = script.indexOf(token)
  if (start === -1) return null
  let depth = 0
  let i = start + token.length - 1
  for (; i < script.length; i++) {
    const ch = script[i]
    if (ch === '(') depth++
    else if (ch === ')') {
      depth--
      if (depth === 0) break
    } else if (ch === '"' || ch === "'" || ch === '`') {
      const quote = ch
      i++
      while (i < script.length && script[i] !== quote) {
        if (script[i] === '\\') i++
        i++
      }
    }
  }
  if (depth !== 0) return null
  return script.slice(start + token.length - 1 + 1, i)
}

// 解析 defineProps 对象：返回 [{ name, type, default, desc }]
function parsePropsObject(block, jsdocProps) {
  const trimmed = block.trim()
  const body = trimmed.startsWith('{')
    ? trimmed.slice(1, trimmed.lastIndexOf('}')).trim()
    : trimmed
  const entries = splitTopLevel(body)
  const result = []
  for (const entry of entries) {
    const colonIdx = entry.indexOf(':')
    if (colonIdx === -1) continue
    const name = entry.slice(0, colonIdx).trim().replace(/^['"]|['"]$/g, '')
    const value = entry.slice(colonIdx + 1).trim()
    if (!name) continue
    if (value.startsWith('{')) {
      const inner = value.slice(1, value.length - 1).trim()
      const fields = splitTopLevel(inner)
      const get = (key) => {
        const f = fields.find((x) => x.startsWith(key + ':'))
        return f ? f.slice(f.indexOf(':') + 1).trim() : undefined
      }
      const rawType = get('type')
      const rawDefault = get('default')
      result.push({
        name,
        type: rawType || (jsdocProps[name] && jsdocProps[name].type) || '',
        default: rawDefault,
        desc: (jsdocProps[name] && jsdocProps[name].desc) || ''
      })
    } else {
      // 简写：key: Type
      result.push({ name, type: value, default: undefined, desc: (jsdocProps[name] && jsdocProps[name].desc) || '' })
    }
  }
  // 兜底：JSDoc 声明了但 defineProps 没解析到的属性
  for (const [name, info] of Object.entries(jsdocProps)) {
    if (!result.some((p) => p.name === name)) {
      result.push({ name, type: info.type, default: undefined, desc: info.desc })
    }
  }
  return result
}

// 解析 defineEmits
function parseEmits(block, jsdocEvents) {
  const trimmed = block.trim()
  if (trimmed.startsWith('[')) {
    const names = []
    const re = /['"]([\w:-]+)['"]/g
    let m
    while ((m = re.exec(trimmed))) names.push(m[1])
    return names.map((n) => ({ name: n, desc: jsdocEvents[n] || '' }))
  }
  if (trimmed.startsWith('{')) {
    const names = splitTopLevel(trimmed)
      .map((e) => e.slice(0, e.indexOf(':') === -1 ? e.length : e.indexOf(':')).trim().replace(/['"]/g, ''))
      .filter(Boolean)
    return names.map((n) => ({ name: n, desc: jsdocEvents[n] || '' }))
  }
  return []
}

// 按逗号切分顶层条目（跳过括号/引号深度）
function splitTopLevel(block) {
  const parts = []
  let depth = 0
  let current = ''
  for (let i = 0; i < block.length; i++) {
    const ch = block[i]
    if (ch === '{' || ch === '[' || ch === '(') depth++
    else if (ch === '}' || ch === ']' || ch === ')') depth--
    else if (ch === ',' && depth === 0) {
      if (current.trim()) parts.push(current.trim())
      current = ''
      continue
    }
    current += ch
  }
  if (current.trim()) parts.push(current.trim())
  return parts
}

// ---------------------------------------------------------------------------
// readme 解析
// ---------------------------------------------------------------------------
const SKIP_SECTIONS = new Set(['安装', '推荐同时安装主题包', '重新生成图标映射'])
const SKIP_PREFIX = ['推荐同时安装']
const API_SECTIONS = new Set(['Props', 'Events', '插槽'])

const skipSection = (h) =>
  SKIP_SECTIONS.has(h) || SKIP_PREFIX.some((p) => h.startsWith(p))

function parseReadme(name) {
  const p = path.join(UNI, `nax-${name}`, 'readme.md')
  if (!fs.existsSync(p)) return null
  const text = readUtf8(p)
  const lines = text.split('\n')

  // 标题行：`# nax-x`
  const titleIdx = lines.findIndex((l) => /^#\s/.test(l))
  const intro = []
  let i = titleIdx === -1 ? 0 : titleIdx + 1
  while (i < lines.length && !/^##\s/.test(lines[i])) {
    if (lines[i].trim()) intro.push(lines[i])
    i++
  }

  // 按 `## ` 切段
  const sections = []
  let cur = null
  for (; i < lines.length; i++) {
    if (/^##\s/.test(lines[i])) {
      cur = { heading: lines[i].replace(/^##\s+/, '').trim(), body: [] }
      sections.push(cur)
    } else if (cur) {
      cur.body.push(lines[i])
    }
  }

  const skip = (h) =>
    SKIP_SECTIONS.has(h) || SKIP_PREFIX.some((p2) => h.startsWith(p2))

  return { intro: intro.join('\n').trim(), sections }
}

// 提取依赖表（markdown 表格）
function extractDepTable(sections) {
  const dep = sections.find((s) => s.heading === '依赖')
  if (!dep) return null
  const body = dep.body.join('\n')
  const tableMatch = body.match(/\n?(\|[\s\S]*?)\n(\n|$)/)
  return tableMatch ? tableMatch[1] : null
}

// ---------------------------------------------------------------------------
// 页面生成
// ---------------------------------------------------------------------------
function typeDisplay(type) {
  if (!type) return ''
  const map = {
    String: 'string', Number: 'number', Boolean: 'boolean', Array: 'array',
    Object: 'object', UTSJSONObject: 'object', Date: 'Date', Function: 'function'
  }
  return map[type] || type
}

function defaultDisplay(raw) {
  if (raw === undefined) return '—'
  const v = raw.trim()
  if (v.startsWith('() =>')) return '`' + v + '`'
  return '`' + v + '`'
}

function propsTable(name, props) {
  if (props.length === 0) return ''
  const overrides = PROPS_DESC_OVERRIDES[name] || {}
  const rows = props.map((p) => {
    const desc = overrides[p.name] || p.desc
    const type = p.type || (desc.includes(' ') ? '' : desc)
    return `| ${p.name} | ${escTableCell(typeDisplay(type))} | ${defaultDisplay(p.default)} | ${escTableCell(desc)} |`
  })
  return [
    '',
    '## Props',
    '',
    '| 属性 | 类型 | 默认值 | 说明 |',
    '|------|------|--------|------|',
    ...rows,
    ''
  ].join('\n')
}

function eventsTable(events) {
  if (events.length === 0) return ''
  const rows = events.map((e) => `| ${e.name} | ${escTableCell(e.desc)} |`)
  return [
    '',
    '## Events',
    '',
    '| 事件 | 说明 |',
    '|------|------|',
    ...rows,
    ''
  ].join('\n')
}

function slotsTable(slots) {
  const entries = Object.entries(slots)
  if (entries.length === 0) return ''
  const rows = entries.map(([n, d]) => `| ${n} | ${escTableCell(d)} |`)
  return [
    '',
    '## Slots',
    '',
    '| 插槽 | 说明 |',
    '|------|------|',
    ...rows,
    ''
  ].join('\n')
}

// 图标页特殊处理：内置图标清单 → 表格
function iconListToTable(body) {
  const lines = body.join('\n')
  const codeMatch = lines.match(/```text\n([\s\S]*?)```/)
  if (!codeMatch) return body.join('\n')
  const names = codeMatch[1]
    .split(/[\s,，]+/)
    .map((s) => s.trim())
    .filter((s) => /^[a-z0-9-]+$/i.test(s))
  const rows = names.map((n) => `| \`${n}\` |`)
  const table = [
    '| 图标名 |',
    '|--------|',
    ...rows
  ].join('\n')
  return lines.replace(/```text\n[\s\S]*?```/, table)
}

function buildPage(name, pkg) {
  const display = COMPONENT_DISPLAY[name] || `nax-${name}`
  const uvue = parseUvue(pkg.uvuePath)
  const readme = parseReadme(name)

  const intro = readme && readme.intro ? readme.intro : uvue.description
  const parts = []
  parts.push('---')
  parts.push(`demo: ${name}`)
  parts.push('---\n')
  parts.push(`# ${display}\n`)
  if (pkg.version) {
    parts.push('> 当前版本：' + pkg.version + '（见 `changelog.md`）\n')
  }
  if (intro) parts.push(intro + '\n')

  // 安装
  const pluginUrl = PLUGIN_URLS[name]
  parts.push(
    '## 安装\n',
    pluginUrl
      ? `- 插件市场：[nax-${name}](${pluginUrl})\n`
      : '```text\n' + `uni_modules/nax-${name}` + '\n```\n',
    'easycom 自动生效，页面直接使用 `<nax-' + name + ' />` 即可。\n',
    '> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。\n'
  )

  // 依赖表
  if (readme) {
    const depTable = extractDepTable(readme.sections)
    if (depTable) {
      parts.push('## 依赖\n', depTable, '\n')
    }
  }

  // 用法示例（readme 其它小节）
  if (readme) {
    const hasApi = uvue.props.length > 0 || uvue.events.length > 0
    const exampleSections = readme.sections.filter((s) => {
      if (skipSection(s.heading)) return false
      if (s.heading === '依赖') return false
      if (hasApi && API_SECTIONS.has(s.heading)) return false
      return true
    })
    if (exampleSections.length > 0) {
      parts.push('## 代码示例\n')
      for (const s of exampleSections) {
        let body = s.body.join('\n').trim()
        if (name === 'icon' && s.heading.includes('内置图标')) {
          body = iconListToTable(s.body)
        }
        if (body) parts.push(`### ${s.heading}\n`, body + '\n')
      }
    }
  }

  // API 表
  parts.push(propsTable(name, uvue.props))
  parts.push(eventsTable(uvue.events))
  parts.push(slotsTable(uvue.jsdocSlots))

  return parts.join('\n')
}

// ---------------------------------------------------------------------------
// 主流程
// ---------------------------------------------------------------------------
function collectPackages() {
  const names = new Set()
  for (const c of CATEGORIES) for (const n of c.items) names.add(n)

  const found = []
  const warnings = []
  for (const n of names) {
    const pkgDir = path.join(UNI, `nax-${n}`)
    if (!fs.existsSync(pkgDir)) {
      warnings.push(`[缺失] 分类含 ${n}，但 uni_modules/nax-${n} 不存在`)
      continue
    }
    const uvueCandidates = [
      path.join(pkgDir, 'components', `nax-${n}`, `nax-${n}.uvue`)
    ]
    // 部分组件主文件可能是子目录（如 nax-space-item 等），但主组件一般是同名路径
    const uvuePath = uvueCandidates.find((p) => fs.existsSync(p))
    if (!uvuePath) {
      warnings.push(`[缺失] ${n} 未找到主组件 uvue 文件`)
      continue
    }
    let version = ''
    try {
      version = JSON.parse(readUtf8(path.join(pkgDir, 'package.json'))).version || ''
    } catch (e) { /* ignore */ }
    found.push({ name: n, uvuePath, version })
  }

  // 检查有没有分类外的组件包
  const dirs = fs.readdirSync(UNI, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^nax-/.test(d.name))
    .map((d) => d.name.replace(/^nax-/, ''))
    .filter((n) => n !== 'ui' && n !== 'ui-theme')
  const missing = dirs.filter((d) => !names.has(d))
  if (missing.length) {
    warnings.push(`[分类外] uni_modules 中存在但未纳入分类：${missing.join(', ')}`)
  }

  return { found, warnings }
}

function generateSidebar(found) {
  const groups = CATEGORIES.map((c) => ({
    text: c.text,
    items: c.items
      .filter((n) => found.some((f) => f.name === n))
      .map((n) => ({
        text: `nax-${n}（${COMPONENT_LABELS[n] || '组件'}）`,
        link: `/components/${n}`
      }))
  }))
  return [
    { text: '指南', items: [
      { text: '快速开始', link: '/guide/' },
      { text: '主题接入', link: '/guide/theme' },
      { text: '暗黑模式', link: '/guide/dark-mode' }
    ] },
    { text: '组件', items: [{ text: '组件总览', link: '/components/' }] },
    ...groups
  ]
}

function buildOverview(found) {
  const byCategory = {}
  for (const c of CATEGORIES) {
    byCategory[c.text] = []
  }
  const meta = {}
  for (const f of found) {
    let desc = ''
    try {
      const parsed = parseUvue(f.uvuePath)
      desc = parsed.description.split('\n')[0]
      meta[f.name] = parsed.description
    } catch (e) {
      desc = ''
    }
    byCategory[CATEGORY_TEXT[f.name] || '其他'].push({ name: f.name, desc })
  }
  const parts = ['# 组件总览', '', '> 50 个独立组件包 + 1 个主题包，全部基于 uni-app x / uvue 实现，easycom 自动注册。', '']
  for (const c of CATEGORIES) {
    const items = byCategory[c.text]
    if (!items || items.length === 0) continue
    parts.push(`## ${c.text}`, '')
    parts.push('| 组件 | 说明 |', '|------|------|')
    for (const it of items) {
      const desc = OVERVIEW_DESCS[it.name] !== undefined ? OVERVIEW_DESCS[it.name] : it.desc
      parts.push(`| [nax-${it.name}](/components/${it.name}) | ${escTableCell(desc)} |`)
    }
    parts.push('')
  }
  return parts.join('\n')
}

function main() {
  const { found, warnings } = collectPackages()
  for (const w of warnings) console.warn('WARN ' + w)

  fs.mkdirSync(OUT_DIR, { recursive: true })
  for (const f of found) {
    const page = buildPage(f.name, f)
    fs.writeFileSync(path.join(OUT_DIR, `${f.name}.md`), page, 'utf8')
  }
  fs.writeFileSync(path.join(OUT_DIR, 'index.md'), buildOverview(found), 'utf8')

  const sidebar = generateSidebar(found)
  fs.writeFileSync(
    SIDEBAR_OUT,
    '// 由 scripts/gen-docs.mjs 自动生成，请勿手改；修改分类请在生成脚本中调整。\n' +
      'export const sidebar = ' + JSON.stringify(sidebar, null, 2) + '\n',
    'utf8'
  )

  console.log(`生成完成：${found.length} 个组件页 + 总览页 + 侧边栏`)
}

main()
