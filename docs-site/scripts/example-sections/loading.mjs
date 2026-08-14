export default [
  {
    heading: '基础',
    body: "```uvue\n<nax-loading></nax-loading>\n```"
  },
  {
    heading: '带文案',
    body: "```uvue\n<nax-loading text=\"加载中\"></nax-loading>\n```"
  },
  {
    heading: '纵向 vertical',
    body: "```uvue\n<nax-loading vertical text=\"请稍候\"></nax-loading>\n```"
  },
  {
    heading: '尺寸 size',
    body: "```uvue\n<nax-loading size=\"sm\" text=\"sm\"></nax-loading>\n<nax-loading size=\"md\" text=\"md\"></nax-loading>\n<nax-loading size=\"lg\" text=\"lg\"></nax-loading>\n```"
  },
  {
    heading: '图标 icon',
    body: "```uvue\n<nax-loading icon=\"loading\" text=\"loading\"></nax-loading>\n<nax-loading icon=\"loader\" text=\"loader\"></nax-loading>\n<nax-loading icon=\"loader-4\" text=\"loader-4\"></nax-loading>\n```"
  },
  {
    heading: '类型 type',
    body: "```uvue\n<nax-loading type=\"default\" text=\"默认\"></nax-loading>\n<nax-loading type=\"primary\" text=\"主色\"></nax-loading>\n<nax-loading type=\"info\" text=\"信息\"></nax-loading>\n<nax-loading type=\"warning\" text=\"警告\"></nax-loading>\n<nax-loading type=\"error\" text=\"错误\"></nax-loading>\n```"
  },
  {
    heading: '区块占位',
    body: "```uvue\n<nax-loading v-if=\"blockLoading\" vertical text=\"内容加载中\" type=\"primary\"></nax-loading>\n<view v-else>\n\t<text class=\"body-text\">数据已就绪</text>\n</view>\n<nax-button type=\"primary\" size=\"sm\" label=\"模拟加载 1.5s\" @click=\"simulate\"></nax-button>\n```\n\n```uts\nconst blockLoading = ref(true)\n\nfunction simulate() {\n\tblockLoading.value = true\n\tsetTimeout(() => {\n\t\tblockLoading.value = false\n\t}, 1500)\n}\n```"
  },
  {
    heading: 'show 控制',
    body: "```uvue\n<nax-loading :show=\"toggled\" text=\"可开关\"></nax-loading>\n<nax-button size=\"sm\" :label=\"toggled ? '隐藏' : '显示'\" @click=\"toggleShow\"></nax-button>\n```\n\n```uts\nconst toggled = ref(true)\n\nfunction toggleShow() {\n\ttoggled.value = !toggled.value\n}\n```"
  }
]
