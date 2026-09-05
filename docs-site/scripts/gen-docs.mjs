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
import { fileURLToPath, pathToFileURL } from 'node:url'

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
    items: ['button', 'text', 'icon', 'space', 'line', 'divider', 'tag', 'badge', 'avatar', 'rich-text']
  },
  {
    text: '布局组件',
    items: ['cell', 'card', 'grid', 'steps', 'list', 'virtual-list', 'swipe-action', 'swiper']
  },
  {
    text: '表单组件',
    items: [
      'input', 'search', 'textarea', 'select', 'calendar', 'datetime-picker', 'date-strip', 'keyboard',
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
  'date-strip': '日期横条',
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
  empty: '空状态',
  'rich-text': '富文本'
}

// 文档站点级覆盖（只影响生成的 docs-site 页面，不改组件包内容）
// 插件市场链接：有值的组件，安装节展示插件市场链接替代 uni_modules 目录
const PLUGIN_URLS = {
  'action-sheet': 'https://ext.dcloud.net.cn/plugin?id=29020',
  alert: 'https://ext.dcloud.net.cn/plugin?id=29022',
  avatar: 'https://ext.dcloud.net.cn/plugin?id=29023',
  badge: 'https://ext.dcloud.net.cn/plugin?id=29024',
  button: 'https://ext.dcloud.net.cn/plugin?id=29025',
  calendar: 'https://ext.dcloud.net.cn/plugin?id=29026',
  checkbox: 'https://ext.dcloud.net.cn/plugin?id=29029',
  'datetime-picker': 'https://ext.dcloud.net.cn/plugin?id=29030',
  dialog: 'https://ext.dcloud.net.cn/plugin?id=29031',
  divider: 'https://ext.dcloud.net.cn/plugin?id=29032',
  dropdown: 'https://ext.dcloud.net.cn/plugin?id=29033',
  empty: 'https://ext.dcloud.net.cn/plugin?id=29034',
  form: 'https://ext.dcloud.net.cn/plugin?id=29035',
  icon: 'https://ext.dcloud.net.cn/plugin?id=29021',
  image: 'https://ext.dcloud.net.cn/plugin?id=29037',
  input: 'https://ext.dcloud.net.cn/plugin?id=29038',
  keyboard: 'https://ext.dcloud.net.cn/plugin?id=29039',
  line: 'https://ext.dcloud.net.cn/plugin?id=29040',
  loading: 'https://ext.dcloud.net.cn/plugin?id=29041',
  'nav-bar': 'https://ext.dcloud.net.cn/plugin?id=29043',
  'notice-bar': 'https://ext.dcloud.net.cn/plugin?id=29044',
  'number-box': 'https://ext.dcloud.net.cn/plugin?id=29045',
  overlay: 'https://ext.dcloud.net.cn/plugin?id=29046',
  picker: 'https://ext.dcloud.net.cn/plugin?id=29019',
  popup: 'https://ext.dcloud.net.cn/plugin?id=29054',
  progress: 'https://ext.dcloud.net.cn/plugin?id=29055',
  radio: 'https://ext.dcloud.net.cn/plugin?id=29056',
  rate: 'https://ext.dcloud.net.cn/plugin?id=29057',
  search: 'https://ext.dcloud.net.cn/plugin?id=29059',
  select: 'https://ext.dcloud.net.cn/plugin?id=29060',
  skeleton: 'https://ext.dcloud.net.cn/plugin?id=29061',
  slider: 'https://ext.dcloud.net.cn/plugin?id=29062',
  space: 'https://ext.dcloud.net.cn/plugin?id=29063',
  'swipe-action': 'https://ext.dcloud.net.cn/plugin?id=29065',
  swiper: 'https://ext.dcloud.net.cn/plugin?id=29066',
  switch: 'https://ext.dcloud.net.cn/plugin?id=29067',
  tabbar: 'https://ext.dcloud.net.cn/plugin?id=29069',
  tabs: 'https://ext.dcloud.net.cn/plugin?id=29070',
  tag: 'https://ext.dcloud.net.cn/plugin?id=29071',
  text: 'https://ext.dcloud.net.cn/plugin?id=29072',
  textarea: 'https://ext.dcloud.net.cn/plugin?id=29073',
  toast: 'https://ext.dcloud.net.cn/plugin?id=29074',
  transition: 'https://ext.dcloud.net.cn/plugin?id=29018',
  upload: 'https://ext.dcloud.net.cn/plugin?id=29075'
}

// 依赖表（已决定不展示，保留配置结构便于将来恢复：有值的组件会展示依赖表）
const SKIP_DEP_TABLE = {
  swiper: true,
  calendar: true,
  keyboard: true,
  '*': true
}

// 组件总览表说明覆盖
const OVERVIEW_DESCS = {
  icon: '字体图标（Tabler 语义子集）；支持 `glyph` + `font-family` 接入自备图标字体（iconfont 码位可直接粘贴）。',
  badge: '徽标。'
}

// 页面 intro 覆盖（替代 readme intro；仅影响生成的 docs-site 页面，不改组件包内容）
const INTRO_OVERRIDES = {
  'swipe-action': 'uni-app x 滑动操作组件，功能覆盖常用场景。',
  upload: '`nax-ui` 上传组件（uni-app x / uvue）。提供文件列表预览、选择、删除与状态展示能力。实际上传由业务在 `afterRead` 中调用 `uni.uploadFile` 等完成。',
  dialog: '居中对话框（确认 / 告警）。\n\n1. **声明式**：页面里写 `<nax-dialog v-model:show>`，可插槽自定义内容\n2. **命令式**：全局挂一次宿主后，业务只调 `naxDialog()` / `naxDialogAlert()` / `naxDialogConfirm()`\n自定义任意复杂弹层请直接用 `nax-picker`。',
  'action-sheet': '底部操作菜单（动作面板）。只提供「选项列表 + 取消」语义。'
}

// 示例小节内容剔除（键：组件名 -> 小节名 -> 要从小节 body 中移除的段落）
const SECTION_STRIPS = {
  'swipe-action': {
    '互斥展开（推荐列表场景）': '> Android 端组内互斥已适配响应式注入；无需额外配置。'
  },
  transition: {
    '说明': '- 动画依赖 opacity / transform + transition，全端公共实现，无 Web 专用 @keyframes 依赖'
  },
  overlay: {
    '说明': '2. 鸿蒙端淡入淡出走 opacity 三阶段，避免首帧闪黑。'
  },
  'notice-bar': {
    '端差异': '- **Web / 小程序**：衔接模式用 CSS `@keyframes` 动画\n- **App Android / iOS**：双段显式宽度 + `setInterval` `translateX` 模回绕（uvue 不支持 keyframes）\n- **App 鸿蒙**：`UniElement.animate` 双段 0→-half 线性循环为主；失败回退 `requestAnimationFrame` + `style.setProperty` 模回绕（`#ifdef APP-HARMONY`）；步进仍用原生 swiper\n'
  },
  tabbar: {
    '自定义底栏 + 原生 Tab 路由（推荐方案）': '（本仓库已采用）',
    '与原生 tabBar': '- **多页秒切（推荐）**：`pages.json` 登记原生 `tabBar` → 业务用 `uni.switchTab` 互切 → 各 Tab 页 `uni.hideTabBar` → 底部渲染本组件。'
  },
  popup: {
    '安装与注册': '3. 小程序降级 / 声明式宿主：页面挂一次 `<nax-popup />`（可空标签）。'
  }
}

// 示例小节整体剔除（键：组件名 -> 小节名数组；与“主题 Token”合并进“主题”表配套使用）
const SKIP_SECTIONS_OVERRIDES = {
  'swipe-action': ['主题 Token'],
  swiper: ['Slots'],
  input: ['常用 Props'],
  search: ['常用 Props', '形状 shape'],
  textarea: ['常用 Props'],
  select: ['组件特性', '常用 Props'],
  calendar: ['Props（摘要）'],
  'datetime-picker': ['常用 Props'],
  keyboard: ['Props（摘要）', 'Slot'],
  switch: ['设计说明'],
  slider: ['Slot', '设计说明'],
  checkbox: ['设计说明'],
  radio: ['设计说明'],
  rate: ['设计说明'],
  'number-box': ['设计说明', 'Slot'],
  loading: ['平台动画', '说明'],
  progress: ['说明'],
  toast: ['宿主组件 props', '主题 Token（改默认背景）'],
  'notice-bar': ['端差异'],
  tabs: ['与 nax-tabbar'],
  dropdown: ['组件', '组件 的改进'],
  button: ['Slots'],
  image: ['Slots'],
  list: ['Slots'],
  upload: ['Slots'],
  'virtual-list': ['Slots']
}

// 从代码示例区移出、改在 Props 之后单独成节的小节（键：组件名 -> 小节名数组）
const MOVE_SECTIONS_AFTER_PROPS = {
  input: ['类型 type'],
  select: ['模式 mode'],
  'datetime-picker': ['mode'],
  upload: ['fileList 项结构'],
  form: ['规则字段（常用）'],
  picker: ['弹出位置'],
  'action-sheet': ['actions 项字段']
}

// 示例小节内容追加（键：组件名 -> 小节名 -> 追加的段落）
const SECTION_APPENDS = {
  'swipe-action': {
    '主题': '| `--nax-font-size-sm` | 按钮字号 |'
  },
  popup: {
    '安装与注册': '3. **小程序端：页面挂一次 `<nax-popup />`**（空标签、不传属性即可）。微信小程序不支持官方 `dialogPage` 压窗能力（见下方平台能力矩阵），弹层需降级为页面内渲染；这个标签就是命令式调用时的弹层容器，页面挂一次即可复用。'
  },
  toast: {
    '主题': "\n在 `nax-theme` 节点或全局 CSS 覆盖：\n\n```css\n.nax-theme {\n  --nax-toast-bg: rgba(0, 0, 0, 0.85);\n  --nax-toast-color: #ffffff;\n  --nax-toast-bg-success: #18a058;\n  --nax-toast-bg-error: #d03050;\n  --nax-toast-bg-warning: #f0a020;\n  --nax-toast-bg-info: #2080f0;\n}\n```\n\n- 默认文案 / loading：半透明黑（`--nax-toast-bg`）\n- success / error / warning / info：使用对应语义色底\n- 单次调用优先 `bg`，覆盖主题与 type 底色\n- **鸿蒙 / App**：背景请用实色 hex（如 `#18a058`）。`rgba(...)`、嵌套 `var()` 在 ucss 下可能失效"
  }
}

// 站点级补充的示例小节：按演示项目展示补齐代码示例（含 uvue 用法 + uts 数据/回调），
// 不修改组件 readme。内容放在 scripts/example-sections/<name>.mjs，
// 默认导出一组 { heading, body }，body 追加到组件 readme 已有示例小节之后。
const EXAMPLE_SECTIONS = {}
{
  const dir = path.join(__dirname, 'example-sections')
  if (fs.existsSync(dir)) {
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.mjs'))) {
      const name = f.replace(/\.mjs$/, '')
      try {
        const mod = await import(pathToFileURL(path.join(dir, f)).href)
        EXAMPLE_SECTIONS[name] = mod.default || []
      } catch (e) {
        console.warn(`WARN 解析示例文件失败：${f}（${e.message}）`)
      }
    }
  }
}

// 主组件 API 小节内嵌子表独立成节（键：组件名 -> [父小节名, 子表标题]）
// 父小节整体被过滤出“代码示例”后，子表内容不会丢失，改在 Props 之后单独成表
const NESTED_API_TABLES = {
  'swipe-action': ['nax-swipe-action Props', 'options 项'],
  swiper: ['Props', 'list 项'],
  tabs: ['Props', 'list 项字段'],
  tabbar: ['Props', 'list 项字段']
}

// 内嵌子表的单元格内容替换（键：组件名 -> 子表标题 -> [原文本, 新文本] 列表）
const NESTED_TABLE_REPLACES = {
  'swipe-action': {
    'options 项': [
      ['`default` / `primary` / `info` / `success` / `warning` / `error`（`danger` 同 error）',
       '`default` 默认 / `primary` 主要 / `info` 信息 / `success` 成功 / `warning` 警告 / `error` 错误（`danger` 同 error）']
    ]
  }
}

// 从指定小节 body 中提取子标题后的 markdown 表格
function extractNestedTable(sections, heading, subHeading) {
  const sec = sections.find((s) => s.heading === heading)
  if (!sec) return null
  const lines = sec.body.map((l) => l.trim())
  const start = lines.findIndex((l) => l === `### ${subHeading}`)
  if (start === -1) return null
  let end = start + 1
  while (end < lines.length && !/^#{1,3}\s/.test(lines[end])) end++
  const table = lines.slice(start + 1, end).join('\n').replace(/\n{3,}/g, '\n\n').trim()
  if (!table.includes('|')) return null
  return table
}

// 事件说明覆盖（键：组件名 -> 事件名 -> 说明）
const EVENTS_DESC_OVERRIDES = {
  'swipe-action': {
    click: '点击操作按钮；回调参数为对象，含 `index` 按钮序号、`name` 按钮标识、`text` 按钮文案、`itemName` 所在列表项 name、`itemIndex` 所在列表项 index'
  },
  swiper: {
    change: '页码变化，参数 `current`',
    'update:current': '同步 `v-model:current`',
    animationfinish: '动画结束，参数 `current`',
    click: '点击某一项，参数 `index`（list 模式）'
  },
  select: {
    open: '弹层打开',
    close: '弹层关闭'
  },
  calendar: {
    open: '弹层打开',
    close: '弹层关闭'
  },
  'datetime-picker': {
    'update:show': '弹层显隐',
    'update:modelValue': 'v-model 选中值（时间戳或日期字符串）',
    confirm: '点确认，回调对象含 value / timestamp / formatted / year / month / day / hour / minute / second / mode',
    cancel: '点取消',
    change: '滚轮变化（当前选中值）',
    open: '弹层打开',
    close: '弹层关闭'
  },
  form: {
    validate: '提交校验完成，参数为是否通过（boolean）'
  },
  upload: {
    'update:fileList': '列表变化（增删）时',
    afterRead: '选择文件后（参数 `{ file, files, name, index }`）',
    beforeRead: 'useBeforeRead 时先触发（参数 `{ file, files, name, index }`）',
    oversize: '超过 `maxSize`（参数 `{ file, files, name }`）',
    delete: '删除一项（参数 `{ index, file, name, fileList }`）',
    beforeDelete: '删除前（参数 `{ index, file, name }`）',
    clickPreview: '点击预览（参数 `{ index, file, name, url }`）',
    success: '自动上传成功（参数 `{ index, file, name, data, url }`）',
    fail: '自动上传失败',
    progress: '自动上传进度'
  },
  popup: {
    'update:show': '声明式显隐（v-model:show）',
    open: '弹层打开',
    opened: '弹层打开动画结束',
    close: '弹层关闭',
    'click-mask': '点击遮罩'
  },
  'notice-bar': {
    click: '点击文案；步进为 index，衔接为 `-1`',
    close: '点击关闭',
    getMore: '点击更多',
    end: '步进播到最后一项',
    'update:show': '显示状态变化'
  },
  tabs: {
    'update:modelValue': 'v-model 选中下标',
    change: '选中下标变化',
    click: '点击项（含重复点同一项；禁用项不触发）'
  }
}

// Props 说明覆盖（键：组件名 -> 属性名 -> 说明）
// 风格统一参考 nax-button：枚举值反引号 + 中文含义，`|` 分隔
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
  },
  alert: {
    type: '`primary` 主要 | `info` 信息 | `success` 成功 | `warning` 警告 | `error` 错误（兼容 `danger`）；默认 `warning`',
    variant: '`light` 浅色 | `solid` 实心（兼容 `effect` 的 light/dark）；默认 `light`',
    effect: '兼容别名：`light`（对应 `light`）/ `dark`（对应 `solid`）'
  },
  avatar: {
    size: '`sm` 小 | `md` 中 | `lg` 大 | 数字字符串（px，默认 48）；兼容 `small` / `medium` / `large`',
    shape: '`circle` 圆形 | `square` 方形 | `round` 圆角（`round` 等价 `circle`）',
    objectFit: '`fill` 填充 | `contain` 包含 | `cover` 覆盖 | `none` 原样 | `scale-down` 缩小（兼容字段，优先于 `mode`）'
  },
  badge: {
    type: '`default` 默认 | `success` 成功 | `error` 错误 | `warning` 警告 | `info` 信息'
  },
  calendar: {
    mode: '`date` 单选日期 | `range` 范围选择',
    minYear: '可切换年份下限',
    maxYear: '可切换年份上限（与 `minYear` 配套）',
    minDate: '可选日期下限，YYYY-MM-DD',
    maxDate: '可选日期上限，YYYY-MM-DD；空则为今天',
    startDate: '范围选择开始日期',
    endDate: '范围选择结束日期（与 `startDate` 配套）',
    maskClosable: '点遮罩关闭',
    maskCloseAble: '点遮罩关闭（兼容拼写，等价 `maskClosable`）',
    startText: '范围开始标记文案',
    endText: '范围结束标记文案（与 `startText` 配套）',
    holidays: '节假日 YYYY-MM-DD 列表',
    workdays: '加班日 YYYY-MM-DD 列表（与 `holidays` 配套）'
  },
  card: {
    size: '`sm` 小 | `md` 中 | `lg` 大（内边距档位）；默认 `md`'
  },
  cell: {
    size: '`sm` 小 | `md` 中 | `lg` 大'
  },
  checkbox: {
    shape: '`square` 方形 | `circle` 圆形',
    size: '`sm` 小 | `md` 中 | `lg` 大'
  },
  'datetime-picker': {
    mode: '`datetime` 日期时间 | `date` 日期 | `time` 时间 | `year-month` 年月 | `year` 年 | `month-day` 月日',
    minDate: '可选范围下限（时间戳或 YYYY-MM-DD[ HH:mm:ss]）',
    maxDate: '可选范围上限（时间戳或 YYYY-MM-DD[ HH:mm:ss]）',
    minHour: '小时范围下限',
    maxHour: '小时范围上限',
    minMinute: '分钟范围下限',
    maxMinute: '分钟范围上限',
    minSecond: '秒范围下限',
    maxSecond: '秒范围上限',
    title: '弹层标题',
    confirmText: '确认按钮文案',
    cancelText: '取消按钮文案',
    confirmColor: '确认按钮文字色',
    cancelColor: '取消按钮文字色',
    maskClosable: '点遮罩关闭',
    maskCloseAble: '点遮罩关闭（兼容拼写，等价 `maskClosable`）',
    safeAreaInsetBottom: '底部安全区',
    zIndex: '弹层层级',
    preserveSelection: '重新打开时保留上次确认的选中值',
    placeholder: '触发条占位文案',
    disabled: '禁用（触发条模式）',
    border: '触发条边框',
    size: '触发条尺寸：`sm` 小 | `md` 中 | `lg` 大',
    customClass: '根节点扩展 class'
  },
  dialog: {
    confirmType: '`primary` 主要 | `info` 信息 | `success` 成功 | `warning` 警告 | `error` 错误 | `default` 默认；默认 `primary`'
  },
  divider: {
    direction: '`horizontal` 横向 | `vertical` 纵向（兼容 `row` / `column`）',
    contentPosition: '`left` 左 | `center` 中 | `right` 右（横线时；兼容 `start` / `end`）',
    size: '`hairline` 细线 | `sm` 小 | `md` 中（线粗细）；默认 `hairline`',
    type: '`default` 默认 | `primary` 主要 | `info` 信息 | `success` 成功 | `warning` 警告 | `error` 错误（兼容 `danger`）'
  },
  dropdown: {
    size: '`sm` 小 | `md` 中 | `lg` 大（菜单栏高度）；默认 `md`'
  },
  empty: {
    imageSize: '`sm` 小 | `md` 中 | `lg` 大 或数字（px）；默认 120',
    iconSize: '`sm` 小 | `md` 中 | `lg` 大 或数字（px）；默认 48'
  },
  form: {
    errorType: '`message` 消息 | `toast` 轻提示 | `border-bottom` 底部描边 | `none` 不提示',
    labelPosition: '`left` 左侧 | `top` 顶部',
    labelAlign: '`left` 左对齐 | `center` 居中 | `right` 右对齐'
  },
  grid: {
    align: '`left` 左对齐 | `center` 居中 | `right` 右对齐；默认 `left`'
  },
  icon: {
    name: '图标名（必填），可选值见“当前支持的图标”，如 `close` / `search` / `arrow-right`',
    glyph: '自定义字形字符或码位；可直接粘贴 iconfont 页面显示的 `&amp;#xe6cf;`，无需转义，也支持 `e6cf` / `0xe6cf` / `U+E6CF` / `\\ue6cf` / 字符本身。非空时优先于 `name`',
    fontFamily: '自定义图标字体族名；需自行 `@font-face` 注册后配合 `glyph` 使用',
    size: '`sm` 小 | `md` 中 | `lg` 大 | 数字字符串像素值（如 20 表示 20px）',
    color: '可选颜色；默认走 `--nax-icon-color` / `--nax-color-text`'
  },
  image: {
    shape: '`square` 方形 | `round` 圆角 | `circle` 圆形',
    timeout: '加载超时（ms）；0 不限制，超时未加载完成按失败处理'
  },
  'notice-bar': {
    list: '通告文案，`string` 或 `{ text | title | label }` 对象',
    type: '`primary` 主要 | `info` 信息 | `success` 成功 | `warning` 警告 | `error` 错误 | `none` 无',
    mode: '`horizontal` 横向 | `vertical` 垂直',
    scroll: '`seamless` 衔接 / `step` 步进；空则看 `is-circular`',
    isCircular: '兼容：水平衔接 vs 步进',
    showIcon: '左侧图标',
    icon: '自定义 `nax-icon` 名',
    showMore: '右侧更多箭头',
    closable: '右侧关闭',
    autoplay: '自动播放',
    paused: '暂停（优先于 `playState`）',
    playState: '`play` 播放 | `paused` 暂停',
    duration: '步进周期 ms',
    speed: '衔接滚动 px/s',
    separator: '衔接拼接分隔符',
    disableTouch: '步进禁止手滑',
    show: '是否显示',
    noListHidden: 'list 为空时隐藏',
    customClass: '根节点扩展 class'
  },
  input: {
    type: '`text` 文本 | `number` 数字 | `digit` 小数 | `tel` 电话 | `password` 密码 | `email` 邮箱 | `url` 链接 | `nickname` 昵称 | `safe-password` 安全密码 | `none`（不支持 select / textarea / idcard）',
    inputAlign: '`left` 左对齐 | `center` 居中 | `right` 右对齐',
    confirmType: '`done` 完成 | `send` 发送 | `search` 搜索 | `next` 下一项 | `go` 前往',
    borderType: '`surround` 四边（默认）| `bottom` 仅下边框',
    size: '`sm` 小 | `md` 中 | `lg` 大'
  },
  keyboard: {
    mode: '`number` 数字 | `car` 车牌 | `card` 卡号；默认 `number`'
  },
  line: {
    direction: '`horizontal` 横向 | `vertical` 纵向（兼容 `row` / `column`）',
    size: '`hairline` 细线 | `sm` 小 | `md` 中 | `lg` 大；默认 `hairline`',
    type: '`default` 默认 | `primary` 主要 | `info` 信息 | `success` 成功 | `warning` 警告 | `error` 错误（兼容 `danger`）'
  },
  list: {
    refresherDefaultStyle: '`black` 黑 | `white` 白 | `none` 无'
  },
  loading: {
    size: '`sm` 小 | `md` 中 | `lg` 大',
    type: '`default` 默认 | `primary` 主要 | `info` 信息 | `success` 成功 | `warning` 警告 | `error` 错误（兼容 `danger`）',
    icon: '旋转图标：`loading` | `loader` | `loader-4`；默认 `loading`'
  },
  'nav-bar': {
    type: '`default` 默认 | `primary` 主要；默认 `default`',
    titleAlign: '`center` 居中 | `left` 左对齐；默认 `center`'
  },
  'number-box': {
    size: '`sm` 小 | `md` 中 | `lg` 大'
  },
  picker: {
    position: '`bottom` 底部 | `center` 居中 | `left` 左侧 | `right` 右侧；默认 `bottom`'
  },
  popup: {
    position: '`center` 居中 | `bottom` 底部 | `left` 左侧 | `right` 右侧',
    closeOnMask: '点遮罩关闭（兼容命名，等价 `maskClosable`）',
    closeOnClickOverlay: '点遮罩关闭（兼容命名，等价 `maskClosable`）'
  },
  progress: {
    shape: '`line` 条形 | `circle` 圆形',
    type: '`default` 默认 | `primary` 主要 | `info` 信息 | `success` 成功 | `warning` 警告 | `error` 错误（兼容 `danger`）',
    status: '`success` 成功 | `warning` 警告 | `error` 错误（有值时覆盖 type 色）',
    size: '`sm` 小 | `md` 中 | `lg` 大'
  },
  radio: {
    shape: '`circle` 圆形 | `square` 方形（默认 `circle`）',
    size: '`sm` 小 | `md` 中 | `lg` 大'
  },
  rate: {
    size: '`sm` 小 | `md` 中 | `lg` 大 | 数字像素字符串'
  },
  search: {
    shape: '`round` 圆形 | `square` 方形（默认 `round`）',
    inputAlign: '`left` 左对齐 | `center` 居中 | `right` 右对齐',
    size: '`sm` 小 | `md` 中 | `lg` 大'
  },  select: {
    mode: '`single-column` 单列 | `multi-column` 多列 | `multi-column-auto` 多列联动（兼容 `mutil-column` / `mutil-column-auto`）',
    size: '`sm` 小 | `md` 中 | `lg` 大（触发条尺寸）'
  },
  skeleton: {
    avatarShape: '`circle` 圆形 | `square` 方形；默认 `circle`'
  },
  slider: {
    size: '`sm` 小 | `md` 中 | `lg` 大（影响轨道高度与滑块尺寸；可用 blockWidth / height 覆盖）',
    edgeValuePosition: '`top` 上方 | `bottom` 下方'
  },
  space: {
    direction: '`horizontal` 横向 | `vertical` 纵向（兼容 `row` / `column`）',
    size: '`xs` 特小 | `sm` 小 | `md` 中 | `lg` 大 | `xl` 特大（token 档）或 1~10（token 档）或数字（px）/ 带单位',
    align: '`start` 起点 | `center` 居中 | `end` 终点 | `baseline` 基线 | `stretch` 拉伸（兼容 flex 原语）',
    justify: '`start` 起点 | `center` 居中 | `end` 终点 | `between` 两端对齐 | `around` 环绕 | `evenly` 均匀分布'
  },
  steps: {
    direction: '`horizontal` 横向 | `vertical` 纵向（兼容 `row` / `column`）',
    mode: '`number` 数字 | `dot` 圆点',
    type: '`primary` 主要 | `info` 信息 | `success` 成功 | `warning` 警告 | `error` 错误',
    size: '`sm` 小 | `md` 中 | `lg` 大'
  },
  'swipe-action': {
    options: '按钮列表，字段明细见下方 options 项表'
  },
  swiper: {
    list: '图片 url 或对象；字段明细见下方 list 项表',
    indicatorType: '`dot` 圆点 | `number` 数字',
    indicatorPosition: '数字指示器位置：`bottom` 底部（默认）| `bottom-left` 左下 | `bottom-right` 右下 | `top` 顶部 | `top-left` 左上 | `top-right` 右上'
  },
  switch: {
    size: '`sm` 小 | `md` 中 | `lg` 大'
  },
  tabbar: {
    iconSize: '`sm` 小 | `md` 中 | `lg` 大 或数字（px）；默认 22'
  },
  tabs: {
    size: '`sm` 小 | `md` 中 | `lg` 大；默认 `md`',
    scrollAlign: '`left` 左对齐 | `center` 居中；默认 `center`；`left` 为必要时贴左并露出前一项'
  },
  tag: {
    type: '`default` 默认 | `primary` 主要 | `info` 信息 | `success` 成功 | `warning` 警告 | `error` 错误（兼容 `danger`）',
    variant: '`solid` 实心 | `light` 浅色（等价 `secondary`）| `outline` 描边 | `text` 文字（等价 `quaternary`）；默认 `light`',
    size: '`sm` 小 | `md` 中 | `lg` 大（兼容 `tiny` / `small` / `medium` / `large`）'
  },
  textarea: {
    confirmType: '`return` 回车换行（默认）| `done` 完成 | `send` 发送 | `search` 搜索 | `next` 下一项 | `go` 前往',
    borderType: '`surround` 四边 | `bottom` 仅下边框',
    size: '`sm` 小 | `md` 中 | `lg` 大'
  },
  transition: {
    name: '动画预设：`fade` 淡入淡出（默认）| `slide-up` 上滑 | `slide-down` 下滑 | `slide-left` 左滑 | `slide-right` 右滑 | `zoom` 缩放 | `fade-up` 淡入上滑'
  },
  upload: {
    accept: '`image` 图片 | `video` 视频 | `media` 媒体',
    capture: '`album` 相册 | `camera` 相机（逗号分隔可组合）',
    camera: '`back` 后置 | `front` 前置（按端支持）',
    sizeType: '`original` 原图 | `compressed` 压缩 | `original,compressed` 两者皆可；空则跟随 compressed',
    autoUpload: '为 true 且配置 `action` 时，选择文件后自动 `uni.uploadFile`',
    action: '上传接口地址（autoUpload 时必填）',
    header: '上传请求头',
    formData: '上传表单附加字段'
  },
  video: {
    objectFit: '`contain` 包含 | `fill` 填充 | `cover` 覆盖',
    fullscreenDirection: '`0` 竖屏 | `90` 右横屏 | `-90` 左横屏'
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
  const scriptMatch = src.match(/<script setup(?:\s+lang="uts")?>([\s\S]*?)<\/script>/)
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
    const rawName = entry.slice(0, colonIdx).trim()
    // defineProps 属性前的块注释会混入条目（如 `/** 说明 */\n\t\tpropName`），跳过
    if (/^\/\*\*/.test(rawName)) continue
    // 去掉混入的行注释（如 `// 兼容 xx 命名\n\t\tpropName`）
    const name = rawName.replace(/^\/\/.*$/gm, '').trim().replace(/^['"]|['"]$/g, '')
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
// readme 中属于组件 API 的小节名（主/子组件 props/events/slots/methods 表），
// 底部会由代码生成 ## Props / ## Events / ## Slots，避免在“代码示例”里重复
const API_SECTIONS = new Set(['Props', 'Events', 'Slots', '插槽', '事件'])

const skipSection = (h) =>
  SKIP_SECTIONS.has(h) || SKIP_PREFIX.some((p) => h.startsWith(p))

// 从示例区移出、合并到 Events 之后"说明"节的小节（键：组件名 -> { title, sections }）
const NOTES_AFTER_EVENTS = {
  tabbar: { title: '说明', sections: ['与原生 tabBar'] }
}

// 归入文档末尾"特殊说明"区的小节：值为小节名，或 { name, title }（title 为重命名后的标题）
const SPECIAL_SECTIONS_OVERRIDES = {
  popup: ['平台能力矩阵', '与 nax-picker / nax-dialog 的关系', '已知限制'],
  dialog: ['与 nax-picker / toast 的关系'],
  'action-sheet': ['与 nax-picker 的关系'],
  'nav-bar': ['注意'],
  'date-strip': ['注意'],
  tabbar: ['自定义底栏 + 原生 Tab 路由（推荐方案）'],
  tabs: [{ name: '与内容区联动（全屏选项卡配方）', title: '全屏选项卡方案实现' }]
}

// 小节分类：
//   main-api  主组件 API 表（丢弃，底部由 JSDoc 生成）
//   sub-api   子组件 API 表（如 nax-checkbox-group Props），移出示例区并保留
//   api-misc  主组件 Methods 等其它 API 小节（保留，放 API 区尾部）
//   theme     主题小节（独立成 ## 主题）
//   special   特殊说明（如平台说明，放文档末尾）
//   example   用法示例（进代码示例区，折叠展示）
function classifySection(name, heading) {
  if (heading === '主题' || heading === '主题定制') return 'theme'
  if (heading === '平台说明' || heading === '说明') return 'special'
  const specialExtra = SPECIAL_SECTIONS_OVERRIDES[name]
  if (specialExtra) {
    const hit = specialExtra.find((h) => (typeof h === 'string' ? h === heading : h.name === heading))
    if (hit) return 'special'
  }
  if (API_SECTIONS.has(heading)) return 'main-api'
  const prefixed = heading.match(/^nax-([\w-]+)\s+(.+)$/)
  if (prefixed) {
    const rest = prefixed[2].trim()
    if (API_SECTIONS.has(rest) || rest.includes('Methods')) {
      return prefixed[1] === name ? 'main-api' : 'sub-api'
    }
  }
  const paren = heading.match(/^([\w-]+)（nax-([\w-]+)）$/)
  if (paren && API_SECTIONS.has(paren[1])) {
    return paren[2] === name ? 'main-api' : 'sub-api'
  }
  const dot = heading.match(/^([\w-]+) · (.+)$/)
  if (dot && API_SECTIONS.has(dot[1])) {
    return dot[2].toLowerCase() === name ? 'main-api' : 'sub-api'
  }
  if (heading.includes('Methods')) return 'api-misc'
  return 'example'
}

const isPropsLike = (h) => /\bProps\b/.test(h)
const isEventsLike = (h) => /Events|事件/.test(h)
const isSlotsLike = (h) => /Slots|插槽/.test(h)

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

function eventsTable(name, events) {
  if (events.length === 0) return ''
  const overrides = EVENTS_DESC_OVERRIDES[name] || {}
  const rows = events.map((e) => `| ${e.name} | ${escTableCell(overrides[e.name] || e.desc)} |`)
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

// 图标页特殊处理：内置图标清单 → IconGrid 网格组件
function iconListToGrid(body) {
  const lines = body.join('\n')
  const codeMatch = lines.match(/```text\n([\s\S]*?)```/)
  if (!codeMatch) return body.join('\n')
  const names = codeMatch[1]
    .split(/[\s,，]+/)
    .map((s) => s.trim())
    .filter((s) => /^[a-z0-9-]+$/i.test(s))
  const grid = `<IconGrid :names="['${names.join(`', '`)}']" />`
  return lines.replace(/```text\n[\s\S]*?```/, grid)
}

function buildPage(name, pkg) {
  const display = COMPONENT_DISPLAY[name] || `nax-${name}`
  const uvue = parseUvue(pkg.uvuePath)
  const readme = parseReadme(name)

  const intro = INTRO_OVERRIDES[name] !== undefined
    ? INTRO_OVERRIDES[name]
    : (readme && readme.intro ? readme.intro : uvue.description)
  const parts = []
  parts.push('---')
  parts.push(`demo: ${name}`)
  parts.push('---\n')
  parts.push(`# ${display}\n`)
  if (pkg.version) {
    parts.push('> 当前版本：' + pkg.version + '\n')
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

  // 依赖表（全局默认不展示；如需恢复，去掉 "*" 并维护 SKIP_DEP_TABLE）
  if (readme && !SKIP_DEP_TABLE['*'] && !SKIP_DEP_TABLE[name]) {
    const depTable = extractDepTable(readme.sections)
    if (depTable) {
      parts.push('## 依赖\n', depTable, '\n')
    }
  }

  // 小节分类
  const examples = []
  const themes = []
  const specials = []
  const subApi = []
  const apiMisc = []
  const moved = []
  const notes = []
  const notesConfig = NOTES_AFTER_EVENTS[name]
  if (readme) {
    const skipExtra = SKIP_SECTIONS_OVERRIDES[name] || []
    const moveExtra = MOVE_SECTIONS_AFTER_PROPS[name] || []
    for (const s of readme.sections) {
      if (skipSection(s.heading)) continue
      if (s.heading === '依赖') continue
      if (skipExtra.includes(s.heading)) continue
      if (notesConfig && notesConfig.sections.includes(s.heading)) {
        notes.push({ kind: 'readme', s })
        continue
      }
      const cls = classifySection(name, s.heading)
      if (cls === 'main-api') continue
      if (cls === 'theme') { themes.push(s); continue }
      if (cls === 'special') {
        const cfg = (SPECIAL_SECTIONS_OVERRIDES[name] || []).find((h) =>
          typeof h === 'string' ? h === s.heading : h.name === s.heading
        )
        specials.push({ s, title: typeof cfg === 'object' ? cfg.title : undefined })
        continue
      }
      if (cls === 'sub-api') { subApi.push(s); continue }
      if (cls === 'api-misc') { apiMisc.push(s); continue }
      if (moveExtra.includes(s.heading)) { moved.push(s); continue }
      examples.push(s)
    }
  }

  const renderBody = (s) => {
    let body = s.body.join('\n').trim()
    const strips = SECTION_STRIPS[name]
    if (strips && strips[s.heading]) {
      body = body.split(strips[s.heading]).join('').replace(/\n{3,}/g, '\n\n').trim()
    }
    const appends = SECTION_APPENDS[name]
    if (appends && appends[s.heading]) {
      body += '\n' + appends[s.heading]
    }
    if (name === 'icon' && s.heading.includes('当前支持的图标')) {
      body = iconListToGrid(s.body)
    }
    return body
  }

  // 代码示例（可展开/隐藏）
  const moveExtra = MOVE_SECTIONS_AFTER_PROPS[name] || []
  const extraMoved = []
  const extraExamples = (EXAMPLE_SECTIONS[name] || []).filter((x) => {
    if (moveExtra.includes(x.heading)) {
      extraMoved.push(x)
      return false
    }
    if (notesConfig && notesConfig.sections.includes(x.heading)) {
      notes.push({ kind: 'extra', body: x.body })
      return false
    }
    return true
  })
  if (examples.length > 0 || extraExamples.length > 0) {
    parts.push('## 代码示例\n')
    for (const s of examples) {
      const body = renderBody(s)
      if (body) parts.push(`::: details ${s.heading}\n\n${body}\n\n:::\n`)
    }
    for (const extra of extraExamples) {
      parts.push(`::: details ${extra.heading}\n\n${extra.body}\n\n:::\n`)
    }
  }

  // 主题（通过 CSS 变量覆盖）
  for (const s of themes) {
    const body = renderBody(s)
    if (body) parts.push('## 主题\n', body + '\n')
  }

  // Props：主组件 + 子组件 Props 类
  parts.push(propsTable(name, uvue.props))
  for (const s of moved) {
    const body = renderBody(s)
    if (body) parts.push(`## ${s.heading}\n`, body + '\n')
  }
  for (const extra of extraMoved) {
    parts.push(`## ${extra.heading}\n`, extra.body + '\n')
  }
  if (readme) {
    const nested = NESTED_API_TABLES[name]
    if (nested) {
      const nestedTable = extractNestedTable(readme.sections, nested[0], nested[1])
      if (nestedTable) {
        const replaces = NESTED_TABLE_REPLACES[name] && NESTED_TABLE_REPLACES[name][nested[1]]
        let table = nestedTable
        if (replaces) {
          for (const [from, to] of replaces) table = table.split(from).join(to)
        }
        parts.push(`## ${nested[1]}\n`, table + '\n')
      }
    }
  }
  for (const s of subApi) {
    if (isPropsLike(s.heading)) {
      const body = renderBody(s)
      if (body) parts.push(`## ${s.heading}\n`, body + '\n')
    }
  }

  // Events：主组件 + 子组件 Events 类
  parts.push(eventsTable(name, uvue.events))
  for (const s of subApi) {
    if (isEventsLike(s.heading)) {
      const body = renderBody(s)
      if (body) parts.push(`## ${s.heading}\n`, body + '\n')
    }
  }

  // 合并的说明节（Events 之后）
  if (notes.length > 0) {
    const noteBodies = notes
      .map((n) => (n.kind === 'readme' ? renderBody(n.s) : n.body))
      .filter((b) => b && b.trim().length > 0)
    if (noteBodies.length > 0) {
      parts.push(`## ${notesConfig ? notesConfig.title : '说明'}\n`, noteBodies.join('\n\n') + '\n')
    }
  }

  // Slots：主组件 + 子组件 Slots 类
  parts.push(slotsTable(uvue.jsdocSlots))
  for (const s of subApi) {
    if (isSlotsLike(s.heading)) {
      const body = renderBody(s)
      if (body) parts.push(`## ${s.heading}\n`, body + '\n')
    }
  }

  // 其它 API 小节（Methods 等）
  for (const s of apiMisc) {
    const body = renderBody(s)
    if (body) parts.push(`## ${s.heading}\n`, body + '\n')
  }

  // 特殊说明
  for (const sp of specials) {
    const body = renderBody(sp.s)
    if (body) parts.push(`## ${sp.title || sp.s.heading}\n`, body + '\n')
  }

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

// 组件英文名：去掉 nax- 前缀并转 PascalCase，如 datetime-picker -> DateTimePicker
function englishName(n) {
  return n.split('-').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('')
}

// 组合式函数分区（docs-site/composables/ 下手写页面，此处只维护侧边栏）
const COMPOSABLES = [
  { text: '总览', link: '/composables/' },
  { text: 'useCountdown <span class="nax-sidebar-en">倒计时</span>', link: '/composables/use-countdown' },
  { text: 'useDebounce <span class="nax-sidebar-en">防抖</span>', link: '/composables/use-debounce' },
  { text: 'useThrottle <span class="nax-sidebar-en">节流</span>', link: '/composables/use-throttle' },
  { text: 'useInterval <span class="nax-sidebar-en">轮询</span>', link: '/composables/use-interval' },
  { text: 'useStorage <span class="nax-sidebar-en">本地缓存</span>', link: '/composables/use-storage' },
  { text: 'useValidate <span class="nax-sidebar-en">表单校验</span>', link: '/composables/use-validate' },
  { text: 'useDatetimeParts <span class="nax-sidebar-en">日期时间</span>', link: '/composables/use-datetime-parts' }
]

function generateSidebar(found) {
  // 按路径前缀分区：指南页只显示指南侧栏，组合式函数/组件页只显示各自侧栏
  const groups = CATEGORIES.map((c) => ({
    text: c.text,
    items: c.items
      .filter((n) => found.some((f) => f.name === n))
      .map((n) => ({
        text: `${COMPONENT_LABELS[n] || '组件'} <span class="nax-sidebar-en">${englishName(n)}</span>`,
        link: `/components/${n}`
      }))
  }))
  return {
    '/guide/': [
      { text: '指南', items: [
        { text: '介绍', link: '/guide/intro' },
        { text: '快速开始', link: '/guide/' },
        { text: '主题接入', link: '/guide/theme' },
        { text: '暗黑模式', link: '/guide/dark-mode' },
        { text: 'AI 技能包', link: '/guide/ai-skill' }
      ] }
    ],
    '/composables/': [
      { text: '组合式函数', items: COMPOSABLES }
    ],
    '/components/': [
      { text: '组件', items: [{ text: '组件总览', link: '/components/' }] },
      ...groups
    ]
  }
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
  const parts = ['# 组件总览', '', '> 52 个独立组件包 + 1 个主题包 + nax-use 组合式函数包，全部基于 uni-app x / uvue 实现，组件 easycom 自动注册。', '']
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

  // 单组件模式：node gen-docs.mjs <name>，只重写该组件页（不触碰总览页与侧边栏）
  const only = process.argv[2]
  const targets = only ? found.filter((f) => f.name === only) : found
  if (only && targets.length === 0) {
    console.error(`未找到组件：${only}`)
    process.exit(1)
  }

  fs.mkdirSync(OUT_DIR, { recursive: true })
  for (const f of targets) {
    const page = buildPage(f.name, f)
    fs.writeFileSync(path.join(OUT_DIR, `${f.name}.md`), page, 'utf8')
  }
  if (only) {
    console.log(`生成完成：${targets.length} 个组件页（单组件模式）`)
    return
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
