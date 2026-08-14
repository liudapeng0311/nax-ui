export default [
  {
    heading: '基础',
    body: "```uvue\n<nax-tag label=\"标签\"></nax-tag>\n<nax-tag type=\"info\" label=\"标签文案\"></nax-tag>\n<nax-tag icon=\"star\" label=\"图标\"></nax-tag>\n<nax-tag strong label=\"加粗\"></nax-tag>\n```"
  },
  {
    heading: '类型 type',
    body: "```uvue\n<nax-tag type=\"default\" label=\"default\"></nax-tag>\n<nax-tag type=\"primary\" label=\"primary\"></nax-tag>\n<nax-tag type=\"info\" label=\"info\"></nax-tag>\n<nax-tag type=\"success\" label=\"success\"></nax-tag>\n<nax-tag type=\"warning\" label=\"warning\"></nax-tag>\n<nax-tag type=\"error\" label=\"error\"></nax-tag>\n```"
  },
  {
    heading: '层级 variant',
    body: "```uvue\n<nax-tag type=\"primary\" variant=\"light\" label=\"light\"></nax-tag>\n<nax-tag type=\"primary\" variant=\"solid\" label=\"solid\"></nax-tag>\n<nax-tag type=\"primary\" variant=\"outline\" label=\"outline\"></nax-tag>\n<nax-tag type=\"primary\" variant=\"text\" label=\"text\"></nax-tag>\n```"
  },
  {
    heading: '尺寸 size',
    body: "```uvue\n<nax-tag size=\"sm\" type=\"info\" label=\"sm\"></nax-tag>\n<nax-tag size=\"md\" type=\"info\" label=\"md\"></nax-tag>\n<nax-tag size=\"lg\" type=\"info\" label=\"lg\"></nax-tag>\n<nax-tag size=\"tiny\" type=\"info\" label=\"tiny\"></nax-tag>\n<nax-tag size=\"large\" type=\"info\" label=\"large\"></nax-tag>\n```"
  },
  {
    heading: '圆角 / 无边框',
    body: "```uvue\n<nax-tag round type=\"success\" label=\"round\"></nax-tag>\n<nax-tag :bordered=\"false\" type=\"success\" label=\"no border\"></nax-tag>\n<nax-tag round :bordered=\"false\" type=\"warning\" label=\"round+无边\"></nax-tag>\n```"
  },
  {
    heading: '可关闭 closable',
    body: "```uvue\n<nax-tag v-if=\"showCloseA\" closable type=\"error\" label=\"关闭我\" @close=\"onCloseA\" @click=\"onTagClick('A')\"></nax-tag>\n<nax-tag v-if=\"showCloseB\" closable :trigger-click-on-close=\"false\" type=\"warning\" label=\"关不触发 click\" @close=\"onCloseB\" @click=\"onTagClick('B')\"></nax-tag>\n```\n\n```uts\nconst showCloseA = ref(true)\nconst showCloseB = ref(true)\nconst lastEvent = ref('')\n\nfunction onCloseA() {\n\tshowCloseA.value = false\n}\n\nfunction onCloseB() {\n\tshowCloseB.value = false\n}\n\nfunction onTagClick(name : string) {\n\tlastEvent.value = 'click ' + name\n}\n```"
  },
  {
    heading: '可选中 checkable',
    body: "```uvue\n<nax-tag checkable type=\"primary\" label=\"可选 primary\" :checked=\"checkedPrimary\" @update:checked=\"onCheckedPrimary\"></nax-tag>\n<nax-tag checkable type=\"info\" label=\"可选 info\" :checked=\"checkedInfo\" @update:checked=\"onCheckedInfo\"></nax-tag>\n<nax-tag checkable type=\"success\" variant=\"outline\" label=\"outline 可选\" :checked=\"checkedOutline\" @update:checked=\"onCheckedOutline\"></nax-tag>\n```\n\n```uts\nconst checkedPrimary = ref(false)\nconst checkedInfo = ref(true)\nconst checkedOutline = ref(false)\n\nfunction onCheckedPrimary(v : boolean) {\n\tcheckedPrimary.value = v\n}\n\nfunction onCheckedInfo(v : boolean) {\n\tcheckedInfo.value = v\n}\n\nfunction onCheckedOutline(v : boolean) {\n\tcheckedOutline.value = v\n}\n```"
  },
  {
    heading: '禁用 disabled',
    body: "```uvue\n<nax-tag disabled label=\"禁用\"></nax-tag>\n<nax-tag disabled type=\"primary\" label=\"禁用 primary\"></nax-tag>\n<nax-tag disabled closable type=\"error\" label=\"禁用关闭\"></nax-tag>\n```"
  },
  {
    heading: '自定义 color',
    body: "```uvue\n<nax-tag color=\"#8a2be2\" label=\"紫 light\"></nax-tag>\n<nax-tag color=\"#8a2be2\" variant=\"solid\" label=\"紫 solid\"></nax-tag>\n<nax-tag color=\"#8a2be2\" variant=\"outline\" label=\"紫 outline\"></nax-tag>\n<nax-tag color=\"#ff6b00\" text-color=\"#ff6b00\" :bordered=\"false\" label=\"橙字\"></nax-tag>\n```"
  },
  {
    heading: 'solid × type',
    body: "```uvue\n<nax-tag variant=\"solid\" label=\"default\"></nax-tag>\n<nax-tag type=\"primary\" variant=\"solid\" label=\"primary\"></nax-tag>\n<nax-tag type=\"info\" variant=\"solid\" label=\"info\"></nax-tag>\n<nax-tag type=\"success\" variant=\"solid\" label=\"success\"></nax-tag>\n<nax-tag type=\"warning\" variant=\"solid\" label=\"warning\"></nax-tag>\n<nax-tag type=\"error\" variant=\"solid\" label=\"error\"></nax-tag>\n```"
  }
]
