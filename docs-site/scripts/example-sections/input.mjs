export default [
  {
    heading: '边框 border / 无边框',
    body: "```uvue\n<nax-input v-model=\"basic\" border placeholder=\"请输入内容\" @change=\"onChange\"></nax-input>\n<nax-input v-model=\"plain\" placeholder=\"无边框输入\"></nax-input>\n<nax-input v-model=\"plainBg\" background=\"#f3f3f5\" placeholder=\"无边框 + 背景色\"></nax-input>\n```\n\n```uts\nconst basic = ref('')\nconst plain = ref('')\nconst plainBg = ref('')\n\nfunction onChange(val : string) {\n\t// change 事件\n}\n```"
  },
  {
    heading: '尺寸 size',
    body: "```uvue\n<nax-input v-model=\"sizeSm\" size=\"sm\" border placeholder=\"sm\"></nax-input>\n<nax-input v-model=\"sizeMd\" size=\"md\" border placeholder=\"md\"></nax-input>\n<nax-input v-model=\"sizeLg\" size=\"lg\" border placeholder=\"lg\"></nax-input>\n```\n\n```uts\nconst sizeSm = ref('')\nconst sizeMd = ref('')\nconst sizeLg = ref('')\n```"
  },
  {
    heading: '类型 type',
    body: "```uvue\n<nax-input v-model=\"typeText\" type=\"text\" border placeholder=\"text\"></nax-input>\n<nax-input v-model=\"typeNumber\" type=\"number\" border placeholder=\"number\"></nax-input>\n<nax-input v-model=\"typeDigit\" type=\"digit\" border placeholder=\"digit\"></nax-input>\n<nax-input v-model=\"typeTel\" type=\"tel\" border placeholder=\"tel\"></nax-input>\n```\n\n```uts\nconst typeText = ref('')\nconst typeNumber = ref('')\nconst typeDigit = ref('')\nconst typeTel = ref('')\n```"
  },
  {
    heading: '密码 password',
    body: "```uvue\n<nax-input v-model=\"password\" type=\"password\" border placeholder=\"请输入密码\" :password-icon=\"true\"></nax-input>\n```\n\n```uts\nconst password = ref('')\n```"
  },
  {
    heading: '可清除 clearable',
    body: "```uvue\n<nax-input v-model=\"clearable\" border clearable placeholder=\"有内容时可清除\" @clear=\"onClear\"></nax-input>\n```\n\n```uts\nconst clearable = ref('可清除示例')\n\nfunction onClear() {\n\t// clear 事件\n}\n```"
  },
  {
    heading: '对齐 input-align',
    body: "```uvue\n<nax-input v-model=\"alignLeft\" border input-align=\"left\" placeholder=\"left\"></nax-input>\n<nax-input v-model=\"alignCenter\" border input-align=\"center\" placeholder=\"center\"></nax-input>\n<nax-input v-model=\"alignRight\" border input-align=\"right\" placeholder=\"right\"></nax-input>\n```\n\n```uts\nconst alignLeft = ref('左对齐')\nconst alignCenter = ref('居中')\nconst alignRight = ref('右对齐')\n```"
  },
  {
    heading: '前后缀图标',
    body: "```uvue\n<nax-input v-model=\"withIcon\" border prefix-icon=\"search\" suffix-icon=\"user\" placeholder=\"搜索用户\"></nax-input>\n```\n\n```uts\nconst withIcon = ref('')\n```"
  },
  {
    heading: 'maxlength + confirm',
    body: "```uvue\n<nax-input v-model=\"limited\" border :maxlength=\"10\" confirm-type=\"search\" placeholder=\"最多 10 字，键盘 search\" @confirm=\"onConfirm\"></nax-input>\n```\n\n```uts\nconst limited = ref('')\n\nfunction onConfirm(val : string) {\n\t// confirm: 键盘确认时触发\n}\n```"
  },
  {
    heading: '禁用 / 只读',
    body: "```uvue\n<nax-input v-model=\"disabledVal\" border disabled></nax-input>\n<nax-input v-model=\"readonlyVal\" border readonly></nax-input>\n```\n\n```uts\nconst disabledVal = ref('禁用状态')\nconst readonlyVal = ref('只读状态')\n```"
  },
  {
    heading: 'border-type / border-color',
    body: "```uvue\n<nax-input v-model=\"bottomBorder\" border border-type=\"bottom\" placeholder=\"下划线风格输入\"></nax-input>\n<nax-input v-model=\"colorBorder\" border border-color=\"#18a058\" placeholder=\"border-color primary\"></nax-input>\n```\n\n```uts\nconst bottomBorder = ref('')\nconst colorBorder = ref('')\n```"
  }
]
