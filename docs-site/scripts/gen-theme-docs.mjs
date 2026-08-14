// 统一各组件 readme 的"主题"小节为 button 风格（通过 CSS 变量覆盖 + Token|用途 表格）
// 用法：node scripts/gen-theme-docs.mjs [--write]
// 不带 --write 时只打印将要改动的内容摘要
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../../')
const UM = path.join(ROOT, 'uni_modules')
const WRITE = process.argv.includes('--write')
const TODAY = '2026-08-11'

// 通用 token → 用途
const COMMON = {
  '--nax-color-primary': '主题主色',
  '--nax-color-primary-deep': '主题主色（加深）',
  '--nax-color-primary-hover': '主题主色（悬停）',
  '--nax-color-primary-disabled': '主题主色（禁用）',
  '--nax-color-primary-secondary': '主题主色浅底',
  '--nax-color-primary-tertiary': '主题主色次浅底',
  '--nax-color-info': '信息色',
  '--nax-color-info-deep': '信息色（加深）',
  '--nax-color-info-hover': '信息色（悬停）',
  '--nax-color-info-disabled': '信息色（禁用）',
  '--nax-color-info-secondary': '信息色浅底',
  '--nax-color-info-tertiary': '信息色次浅底',
  '--nax-color-success': '成功色',
  '--nax-color-success-deep': '成功色（加深）',
  '--nax-color-success-hover': '成功色（悬停）',
  '--nax-color-success-disabled': '成功色（禁用）',
  '--nax-color-success-secondary': '成功色浅底',
  '--nax-color-success-tertiary': '成功色次浅底',
  '--nax-color-warning': '警告色',
  '--nax-color-warning-deep': '警告色（加深）',
  '--nax-color-warning-hover': '警告色（悬停）',
  '--nax-color-warning-disabled': '警告色（禁用）',
  '--nax-color-warning-secondary': '警告色浅底',
  '--nax-color-warning-tertiary': '警告色次浅底',
  '--nax-color-error': '错误色',
  '--nax-color-error-deep': '错误色（加深）',
  '--nax-color-error-hover': '错误色（悬停）',
  '--nax-color-error-disabled': '错误色（禁用）',
  '--nax-color-error-secondary': '错误色浅底',
  '--nax-color-error-tertiary': '错误色次浅底',
  '--nax-color-bg': '背景色',
  '--nax-color-bg-secondary': '次级背景色',
  '--nax-color-bg-hover': '按压/悬停背景色',
  '--nax-color-bg-dark': '深色背景',
  '--nax-color-border': '边框色',
  '--nax-color-border-strong': '强调边框色',
  '--nax-color-divider': '分割线色',
  '--nax-color-mask': '遮罩色',
  '--nax-color-text': '主文字色',
  '--nax-color-text-secondary': '次要文字色',
  '--nax-color-text-disabled': '禁用文字色',
  '--nax-color-text-placeholder': '占位文字色',
  '--nax-color-text-inverse': '反白文字色',
  '--nax-color-text-black': '纯黑文字色',
  '--nax-color-text-tertiary': '三级文字色',
  '--nax-opacity-disabled': '禁用透明度',
  '--nax-border-width': '边框粗细'
}

// 组件专用 token → 用途
const SPECIFIC = {
  '--nax-button-height': '按钮高度',
  '--nax-button-padding-x': '按钮水平内边距',
  '--nax-button-radius': '按钮圆角',
  '--nax-color-button-secondary': '按钮次要底色',
  '--nax-color-button-tertiary': '按钮次次要底色',
  '--nax-avatar-color': '头像背景色',
  '--nax-avatar-text-color': '头像文字色',
  '--nax-avatar-radius': '头像圆角',
  '--nax-avatar-radius-square': '方形头像圆角',
  '--nax-image-radius': '图片圆角',
  '--nax-icon-color': '图标颜色',
  '--nax-input-bg': '输入框背景色',
  '--nax-textarea-bg': '多行输入框背景色',
  '--nax-skeleton-radius': '骨架屏圆角',
  '--nax-color-skeleton': '骨架屏占位色',
  '--nax-swiper-number-bg': '数字指示器背景色',
  '--nax-swiper-number-color': '数字指示器文字色',
  '--nax-swiper-radius': '轮播圆角',
  '--nax-upload-border-color': '上传项边框色',
  '--nax-upload-item-bg': '上传项背景色',
  '--nax-upload-item-radius': '上传项圆角'
}

// 通用排版类 token：不在表格列出（主题包统一管理）
const SKIP_PREFIXES = ['--nax-font-', '--nax-space-', '--nax-radius-', '--nax-color-shadow']

function isColorToken(t) {
  return !SKIP_PREFIXES.some((p) => t.startsWith(p))
}

function usageOf(t) {
  return COMMON[t] || SPECIFIC[t] || ''
}

function buildSection(name, tokens) {
  const rows = tokens.filter(isColorToken).map((t) => {
    const u = usageOf(t)
    return `| \`${t}\` | ${u || '组件自定义（见主题包）'} |`
  })
  return [
    '## 主题',
    '',
    '通过 CSS 变量覆盖：',
    '',
    '| Token | 用途 |',
    '|-------|------|',
    ...rows,
    ''
  ].join('\n') + '\n'
}

function upsertSection(readme, section) {
  // 替换已有主题小节（## 主题... 至下一个 ##）
  const m = readme.match(/^## 主题[^\n]*\n[\s\S]*?(?=^## |\Z)/m)
  if (m) {
    return readme.replace(m[0], section + '\n')
  }
  // 插入到"## 依赖"前
  const dep = readme.match(/^## 依赖/m)
  if (dep) {
    return readme.slice(0, dep.index) + section + '\n' + readme.slice(dep.index)
  }
  return readme.trimEnd() + '\n\n' + section + '\n'
}

function bumpVersion(umDir) {
  const pkgPath = path.join(umDir, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8').replace(/^\uFEFF/, ''))
  const [a, b, c] = pkg.version.split('.').map(Number)
  const next = `${a}.${b}.${c + 1}`
  pkg.version = next
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, '\t') + '\n')
  return next
}

function bumpChangelog(umDir, next) {
  const clPath = path.join(umDir, 'changelog.md')
  const cl = fs.readFileSync(clPath, 'utf8')
  const entry = `## ${next}（${TODAY}）\n- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token\n`
  fs.writeFileSync(clPath, entry + cl)
}

const dirs = fs
  .readdirSync(UM)
  .filter((d) => d.startsWith('nax-') && d !== 'nax-ui' && d !== 'nax-ui-theme')
  .sort()

function collectTokens(compDir) {
  const toks = new Set()
  const files = fs.readdirSync(compDir, { recursive: true }).filter((f) => f.endsWith('.uvue'))
  for (const f of files) {
    const src = fs.readFileSync(path.join(compDir, f), 'utf8')
    const re = /--nax-[a-z0-9-]+/g
    let m
    while ((m = re.exec(src))) toks.add(m[0])
  }
  return toks
}

let changed = 0
for (const d of dirs) {
  const compParent = path.join(UM, d, 'components')
  if (!fs.existsSync(compParent)) continue
  const toks = collectTokens(compParent)
  if (toks.size === 0) continue

  const readmePath = path.join(UM, d, 'readme.md')
  const readme = fs.readFileSync(readmePath, 'utf8')
  const section = buildSection(d, [...toks].sort())
  const next = upsertSection(readme, section)

  if (next !== readme) {
    if (WRITE) {
      fs.writeFileSync(readmePath, next)
      const v = bumpVersion(path.join(UM, d))
      bumpChangelog(path.join(UM, d), v)
    }
    changed++
    console.log(`${d}: 主题小节 ${readme.includes('## 主题') ? '已更新' : '已新增'}`)
  }
}
console.log(`\n组件数：${changed}${WRITE ? '（已写入 readme + changelog + 版本号）' : '（dry-run，加 --write 生效）'}`)
