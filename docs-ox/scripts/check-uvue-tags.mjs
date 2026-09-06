// uvue 模板标签配对静态检查（demo-host + demo-* wrappers）
import fs from 'node:fs'
import glob from 'node:fs'

const files = [
  'uni_modules/ox-uni-press/components/ox-uni-press-demo-host/ox-uni-press-demo-host.uvue',
  ...fs.readdirSync('components').filter(d => d.startsWith('demo-')).map(d => `components/${d}/${d}.uvue`),
]

const tagRe = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:"[^"]*"|[^>])*?)(\/?)>/g
let allOk = true

for (const f of files) {
  const src = fs.readFileSync(f, 'utf8')
  const tpl = src.slice(src.indexOf('<template>') + 1, src.lastIndexOf('</template>'))
  const stack = []
  let ok = true
  let m
  const voidTags = new Set(['image', 'input'])
  while ((m = tagRe.exec(tpl)) !== null) {
    const [, close, name, , selfClose] = m
    if (close === '/') {
      const top = stack.pop()
      if (top !== name) { ok = false; console.log(`  mismatch in ${f}: expect </${top}> got </${name}>`) }
    } else if (selfClose !== '/' && !voidTags.has(name)) {
      stack.push(name)
    }
  }
  if (stack.length) { ok = false; console.log(`  unclosed in ${f}: ${stack.join(',')}`) }
  if (!ok) allOk = false
  console.log((ok ? 'OK  ' : 'FAIL') + ' ' + f)
}
console.log(allOk ? 'ALL PASS' : 'HAS FAILURES')
