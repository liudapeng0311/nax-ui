export default [
  {
    heading: '基础用法',
    body: "```uvue\n<nax-textarea\n\tv-model=\"basic\"\n\tplaceholder=\"请输入内容\"\n\t@change=\"onChange('basic')\"\n\t@focus=\"onFieldFocus('sec-basic')\"\n\t@blur=\"onFieldBlur\"\n\t@keyboardheightchange=\"onTaKeyboard\"\n></nax-textarea>\n```\n\n```uts\nconst basic = ref('')\nconst lastEvent = ref('')\n\nfunction onChange(name : string) {\n\tlastEvent.value = 'change ' + name\n}\n\nfunction onFieldFocus(secId : string) {\n\tlastEvent.value = 'focus: ' + secId\n}\n\nfunction onFieldBlur(value : string) {\n\tlastEvent.value = 'blur: ' + value\n}\n\nfunction onTaKeyboard(detail : UniInputKeyboardHeightChangeEventDetail) {\n\t// 键盘高度变化：detail.height\n}\n```"
  },
  {
    heading: '字数统计 count',
    body: "```uvue\n<nax-textarea v-model=\"withCount\" count :maxlength=\"100\" placeholder=\"最多 100 字\"></nax-textarea>\n```\n\n```uts\nconst withCount = ref('统计字数')\n```"
  },
  {
    heading: '自动增高 auto-height',
    body: "```uvue\n<nax-textarea v-model=\"autoH\" auto-height height=\"70\" placeholder=\"输入时自动增高\"></nax-textarea>\n```\n\n```uts\nconst autoH = ref('')\n```"
  },
  {
    heading: '无边框 / 背景色',
    body: "```uvue\n<nax-textarea v-model=\"plain\" :border=\"false\" placeholder=\"无边框\"></nax-textarea>\n<nax-textarea v-model=\"plainBg\" :border=\"false\" background=\"#f3f3f5\" placeholder=\"无边框 + 背景色\"></nax-textarea>\n```\n\n```uts\nconst plain = ref('')\nconst plainBg = ref('')\n```"
  },
  {
    heading: '仅下边框 border-type=bottom',
    body: "```uvue\n<nax-textarea v-model=\"bottomBorder\" border border-type=\"bottom\" placeholder=\"下划线风格\"></nax-textarea>\n```\n\n```uts\nconst bottomBorder = ref('')\n```"
  },
  {
    heading: '尺寸 size',
    body: "```uvue\n<nax-textarea v-model=\"sizeSm\" size=\"sm\" height=\"56\" placeholder=\"sm\"></nax-textarea>\n<nax-textarea v-model=\"sizeMd\" size=\"md\" height=\"70\" placeholder=\"md\"></nax-textarea>\n<nax-textarea v-model=\"sizeLg\" size=\"lg\" height=\"88\" placeholder=\"lg\"></nax-textarea>\n```\n\n```uts\nconst sizeSm = ref('')\nconst sizeMd = ref('')\nconst sizeLg = ref('')\n```"
  },
  {
    heading: '禁用 / 只读',
    body: "```uvue\n<nax-textarea v-model=\"disabledVal\" disabled count></nax-textarea>\n<nax-textarea v-model=\"readonlyVal\" readonly></nax-textarea>\n```\n\n```uts\nconst disabledVal = ref('文本域已被禁用')\nconst readonlyVal = ref('只读状态，不可编辑')\n```"
  },
  {
    heading: '自定义边框色 + 高度',
    body: "```uvue\n<nax-textarea\n\tv-model=\"colorBorder\"\n\tborder\n\tborder-color=\"#18a058\"\n\theight=\"100\"\n\tplaceholder=\"height=100，边框 primary\"\n\t@confirm=\"onConfirm\"\n></nax-textarea>\n```\n\n```uts\nconst colorBorder = ref('')\nconst lastEvent = ref('')\n\nfunction onConfirm(value : string) {\n\tlastEvent.value = 'confirm: ' + value\n}\n```"
  }
]
