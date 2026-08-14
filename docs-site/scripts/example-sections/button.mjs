export default [
  {
    heading: '层级与类型（default / primary）',
    body: "```uvue\n<nax-button label=\"基础\" @click=\"onTap('base')\"></nax-button>\n<nax-button variant=\"secondary\" label=\"次要\" @click=\"onTap('secondary')\"></nax-button>\n<nax-button variant=\"tertiary\" label=\"次次要\" @click=\"onTap('tertiary')\"></nax-button>\n<nax-button variant=\"quaternary\" label=\"次次次要\" @click=\"onTap('quaternary')\"></nax-button>\n<nax-button variant=\"dashed\" label=\"虚线\" @click=\"onTap('dashed')\"></nax-button>\n<nax-button disabled label=\"禁用\" @click=\"onTap('disabled')\"></nax-button>\n\n<nax-button type=\"primary\" label=\"基础\"></nax-button>\n<nax-button type=\"primary\" variant=\"secondary\" label=\"次要\"></nax-button>\n<nax-button type=\"primary\" variant=\"tertiary\" label=\"次次要\"></nax-button>\n<nax-button type=\"primary\" variant=\"quaternary\" label=\"次次次要\"></nax-button>\n<nax-button type=\"primary\" variant=\"dashed\" label=\"虚线\"></nax-button>\n<nax-button type=\"primary\" disabled label=\"禁用\"></nax-button>\n```\n\n```uts\nfunction onTap(name: string) {\n\tuni.showToast({ title: name, icon: 'none' })\n}\n```"
  },
  {
    heading: '类型 type × variant',
    body: "```uvue\n<nax-button label=\"Default\"></nax-button>\n<nax-button type=\"primary\" label=\"Primary\"></nax-button>\n<nax-button type=\"info\" label=\"Info\"></nax-button>\n<nax-button type=\"success\" label=\"Success\"></nax-button>\n<nax-button type=\"warning\" label=\"Warning\"></nax-button>\n<nax-button type=\"error\" label=\"Error\"></nax-button>\n\n<nax-button variant=\"secondary\" label=\"Default\"></nax-button>\n<nax-button type=\"primary\" variant=\"secondary\" label=\"Primary\"></nax-button>\n<nax-button type=\"info\" variant=\"secondary\" label=\"Info\"></nax-button>\n<nax-button type=\"success\" variant=\"secondary\" label=\"Success\"></nax-button>\n<nax-button type=\"warning\" variant=\"secondary\" label=\"Warning\"></nax-button>\n<nax-button type=\"error\" variant=\"secondary\" label=\"Error\"></nax-button>\n\n<nax-button variant=\"tertiary\" label=\"Default\"></nax-button>\n<nax-button type=\"primary\" variant=\"tertiary\" label=\"Primary\"></nax-button>\n<nax-button type=\"info\" variant=\"tertiary\" label=\"Info\"></nax-button>\n<nax-button type=\"success\" variant=\"tertiary\" label=\"Success\"></nax-button>\n<nax-button type=\"warning\" variant=\"tertiary\" label=\"Warning\"></nax-button>\n<nax-button type=\"error\" variant=\"tertiary\" label=\"Error\"></nax-button>\n\n<nax-button variant=\"quaternary\" label=\"Default\"></nax-button>\n<nax-button type=\"primary\" variant=\"quaternary\" label=\"Primary\"></nax-button>\n<nax-button type=\"info\" variant=\"quaternary\" label=\"Info\"></nax-button>\n<nax-button type=\"success\" variant=\"quaternary\" label=\"Success\"></nax-button>\n<nax-button type=\"warning\" variant=\"quaternary\" label=\"Warning\"></nax-button>\n<nax-button type=\"error\" variant=\"quaternary\" label=\"Error\"></nax-button>\n\n<nax-button variant=\"dashed\" label=\"Default\"></nax-button>\n<nax-button type=\"primary\" variant=\"dashed\" label=\"Primary\"></nax-button>\n<nax-button type=\"info\" variant=\"dashed\" label=\"Info\"></nax-button>\n<nax-button type=\"success\" variant=\"dashed\" label=\"Success\"></nax-button>\n<nax-button type=\"warning\" variant=\"dashed\" label=\"Warning\"></nax-button>\n<nax-button type=\"error\" variant=\"dashed\" label=\"Error\"></nax-button>\n```"
  },
  {
    heading: '禁用 disabled × type',
    body: "```uvue\n<nax-button disabled label=\"Default\"></nax-button>\n<nax-button type=\"primary\" disabled label=\"Primary\"></nax-button>\n<nax-button type=\"info\" disabled label=\"Info\"></nax-button>\n<nax-button type=\"success\" disabled label=\"Success\"></nax-button>\n<nax-button type=\"warning\" disabled label=\"Warning\"></nax-button>\n<nax-button type=\"error\" disabled label=\"Error\"></nax-button>\n```"
  },
  {
    heading: '描边 outline（兼容）',
    body: "```uvue\n<nax-button type=\"primary\" variant=\"outline\" label=\"outline\"></nax-button>\n<nax-button type=\"error\" variant=\"outline\" label=\"outline error\"></nax-button>\n```"
  },
  {
    heading: '尺寸 size',
    body: "```uvue\n<nax-button type=\"primary\" size=\"sm\" label=\"small\"></nax-button>\n<nax-button type=\"primary\" size=\"md\" label=\"medium\"></nax-button>\n<nax-button type=\"primary\" size=\"lg\" label=\"large\"></nax-button>\n```"
  },
  {
    heading: '形状 shape',
    body: "```uvue\n<nax-button type=\"primary\" shape=\"square\" label=\"square\"></nax-button>\n<nax-button type=\"primary\" shape=\"round\" label=\"round\"></nax-button>\n<nax-button type=\"primary\" shape=\"circle\" label=\"好\"></nax-button>\n```"
  },
  {
    heading: '图标 icon（nax-icon）',
    body: "```uvue\n<nax-button type=\"primary\" icon=\"search\" label=\"搜索\" @click=\"onTap('icon-search')\"></nax-button>\n<nax-button type=\"primary\" icon=\"arrow-right\" icon-position=\"right\" label=\"下一步\" @click=\"onTap('icon-right')\"></nax-button>\n<nax-button type=\"success\" variant=\"secondary\" icon=\"check\" label=\"完成\"></nax-button>\n<nax-button type=\"error\" variant=\"outline\" icon=\"delete\" label=\"删除\"></nax-button>\n<nax-button type=\"primary\" shape=\"circle\" icon=\"plus\" @click=\"onTap('icon-circle')\"></nax-button>\n<nax-button type=\"primary\" icon=\"search\" :loading=\"loading\" label=\"加载中\"></nax-button>\n```\n\n```uts\nconst loading = ref(false)\n\nfunction onTap(name: string) {\n\tuni.showToast({ title: name, icon: 'none' })\n}\n```"
  },
  {
    heading: '状态 loading 动画',
    body: "```uvue\n<nax-button type=\"primary\" label=\"正常\" @click=\"onTap('normal')\"></nax-button>\n<nax-button type=\"primary\" :loading=\"loading\" label=\"加载\" @click=\"toggleLoading\"></nax-button>\n<nax-button type=\"primary\" loading label=\"提交中\"></nax-button>\n<nax-button type=\"success\" variant=\"secondary\" loading label=\"保存中\"></nax-button>\n<nax-button type=\"primary\" shape=\"circle\" loading></nax-button>\n```\n\n```uts\nconst loading = ref(false)\n\nfunction toggleLoading() {\n\tloading.value = !loading.value\n}\n```"
  },
  {
    heading: '块级 block',
    body: "```uvue\n<nax-button type=\"primary\" block label=\"块级主按钮\" @click=\"onTap('block')\"></nax-button>\n<nax-button type=\"error\" variant=\"secondary\" block label=\"块级次要错误按钮\"></nax-button>\n```\n\n```uts\nfunction onTap(name: string) {\n\tuni.showToast({ title: name, icon: 'none' })\n}\n```"
  }
]
