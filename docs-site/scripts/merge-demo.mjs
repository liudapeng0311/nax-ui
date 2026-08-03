/**
 * 将 demo 构建的根级资源合并进 VitePress 构建产物（.vitepress/dist/）
 *
 * 原因：宿主 Web 构建以站点根为 base（vite 默认 "/"），运行时通过
 * __vitePreload 把 CSS/静态资源请求强制归一化为 /assets/xxx、/static/xxx 等
 * 根路径。若只部署在 /demo/ 子路径下，这些请求会 404。
 * 本脚本在 vitepress build 之后执行，把 demo 的 assets/static/uni_modules
 * 复制到 dist 根目录，使绝对路径请求可命中（文件名带内容 hash，与
 * VitePress 自身资源不冲突）。
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SITE = path.resolve(__dirname, '..')
const DIST = path.join(SITE, '.vitepress', 'dist')
const DEMO = path.join(SITE, 'public', 'demo')

function copyDirMerge(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  let count = 0
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name)
    const d = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      count += copyDirMerge(s, d)
    } else {
      fs.copyFileSync(s, d)
      count++
    }
  }
  return count
}

if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.error('未找到 vitepress 构建产物：' + DIST + '，请先执行 vitepress build')
  process.exit(1)
}
if (!fs.existsSync(DEMO)) {
  console.warn('public/demo 不存在，跳过 demo 资源合并（请先 npm run sync:demo）')
  process.exit(0)
}

let total = 0
for (const dir of ['assets', 'static', 'uni_modules']) {
  const src = path.join(DEMO, dir)
  if (!fs.existsSync(src)) continue
  total += copyDirMerge(src, path.join(DIST, dir))
}

console.log(`demo 根级资源合并完成：${total} 个文件 → ${DIST}`)
