/**
 * 同步宿主工程 Web 构建产物到 docs 站点（public/demo）
 *
 * 先决条件：宿主工程已通过 HBuilderX 执行「发行 → 网站-PC Web / 手机H5」，
 * 产物位于 unpackage/dist/build/web。
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SITE = path.resolve(__dirname, '..')
const ROOT = path.resolve(SITE, '..')
const SRC = path.join(ROOT, 'unpackage', 'dist', 'build', 'web')
const DEST = path.join(SITE, 'public', 'demo')

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name)
    const d = path.join(dest, entry.name)
    if (entry.isDirectory()) copyDir(s, d)
    else fs.copyFileSync(s, d)
  }
}

if (!fs.existsSync(SRC)) {
  console.warn('未找到宿主 Web 构建产物：' + SRC)
  console.warn('请先在 HBuilderX 中运行宿主工程「发行 → 网站-PC Web 或手机H5」，再执行本脚本。')
  console.warn('跳过同步，组件文档页的实时演示区将无法加载。')
  process.exit(0)
}

fs.rmSync(DEST, { recursive: true, force: true })
copyDir(SRC, DEST)

// index.html 的绝对资源路径改为相对路径（站点部署在 /demo/ 子路径下）
const idx = path.join(DEST, 'index.html')
let html = fs.readFileSync(idx, 'utf8')
html = html.replace(/(src|href)="\/(assets\/)/g, '$1="./$2')
fs.writeFileSync(idx, html, 'utf8')

// 从主 chunk 提取构建内实际注册的页面路由，生成组件 demo 路由映射。
// 避免宿主工程页面路径调整（如 pages/image/index → pages/components/image/index）
// 而 Web 构建未重新发行时 iframe 404。
const mainMatch = html.match(/src="\.\/assets\/([^"]+\.js)"/)
if (mainMatch) {
  const mainChunk = fs.readFileSync(path.join(DEST, 'assets', mainMatch[1]), 'utf8')
  const routes = [...new Set(
    [...mainChunk.matchAll(/pages\/[\w/-]+\/index/g)].map((m) => m[0])
  )]
  const map = {}
  for (const r of routes) {
    const m = r.match(/^pages\/components\/([\w-]+)\/index$/)
    if (m) map[m[1]] = r
  }
  for (const r of routes) {
    const m = r.match(/^pages\/([\w-]+)\/index$/)
    if (m && !map[m[1]]) map[m[1]] = r
  }
  const out = path.join(SITE, '.vitepress', 'demo-routes.mjs')
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(
    out,
    '// 由 scripts/sync-demo.mjs 自动生成（基于宿主 Web 构建的实际路由表）\n' +
      'export const demoRoutes = ' + JSON.stringify(map, null, 2) + '\n',
    'utf8'
  )
  console.log(`demo 路由映射：${Object.keys(map).length} 个组件页面`)
} else {
  console.warn('未找到主 chunk，跳过 demo 路由映射生成')
}

console.log('demo 同步完成：' + DEST)
