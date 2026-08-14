export default [
  {
    heading: '单独使用',
    body: "```uvue\n<nax-checkbox v-model=\"alone\" label=\"同意用户协议\" @change=\"onAloneChange\"></nax-checkbox>\n```\n\n```uts\nconst alone = ref(true)\n\nfunction onAloneChange(v : boolean) {\n\t// change：true / false\n}\n```"
  },
  {
    heading: '基础组',
    body: "```uvue\n<nax-checkbox-group v-model=\"basic\" @change=\"onGroupChange\">\n\t<nax-checkbox name=\"apple\" label=\"苹果\"></nax-checkbox>\n\t<nax-checkbox name=\"banana\" label=\"香蕉\"></nax-checkbox>\n\t<nax-checkbox name=\"orange\" label=\"橙子\"></nax-checkbox>\n</nax-checkbox-group>\n```\n\n```uts\nconst basic = ref(['apple'] as string[])\n\nfunction onGroupChange(v : string[]) {\n\t// v：当前选中值数组\n}\n```"
  },
  {
    heading: '形状 shape',
    body: "```uvue\n<nax-checkbox-group v-model=\"shapeVals\" shape=\"circle\">\n\t<nax-checkbox name=\"a\" label=\"圆形\"></nax-checkbox>\n\t<nax-checkbox name=\"b\" label=\"多选\"></nax-checkbox>\n</nax-checkbox-group>\n```\n\n```uts\nconst shapeVals = ref(['a'] as string[])\n```"
  },
  {
    heading: '尺寸 size',
    body: "```uvue\n<nax-checkbox-group v-model=\"sizeSm\" size=\"sm\">\n\t<nax-checkbox name=\"s\" label=\"sm\"></nax-checkbox>\n</nax-checkbox-group>\n\n<nax-checkbox-group v-model=\"sizeMd\" size=\"md\">\n\t<nax-checkbox name=\"m\" label=\"md\"></nax-checkbox>\n</nax-checkbox-group>\n\n<nax-checkbox-group v-model=\"sizeLg\" size=\"lg\">\n\t<nax-checkbox name=\"l\" label=\"lg\"></nax-checkbox>\n</nax-checkbox-group>\n```\n\n```uts\nconst sizeSm = ref(['s'] as string[])\nconst sizeMd = ref(['m'] as string[])\nconst sizeLg = ref(['l'] as string[])\n```"
  },
  {
    heading: '禁用 disabled',
    body: "```uvue\n<nax-checkbox-group v-model=\"disabledVals\">\n\t<nax-checkbox name=\"on\" label=\"可选\"></nax-checkbox>\n\t<nax-checkbox name=\"off\" label=\"禁用项\" disabled></nax-checkbox>\n</nax-checkbox-group>\n\n<nax-checkbox-group v-model=\"disabledGroup\" disabled>\n\t<nax-checkbox name=\"g1\" label=\"整组禁用\"></nax-checkbox>\n\t<nax-checkbox name=\"g2\" label=\"不可点\"></nax-checkbox>\n</nax-checkbox-group>\n```\n\n```uts\nconst disabledVals = ref(['on'] as string[])\nconst disabledGroup = ref(['g1'] as string[])\n```"
  },
  {
    heading: '文案不可点 labelDisabled',
    body: "```uvue\n<nax-checkbox-group v-model=\"labelLock\" label-disabled>\n\t<nax-checkbox name=\"x\" label=\"只能点左侧方框\"></nax-checkbox>\n\t<nax-checkbox name=\"y\" label=\"点文字无效\"></nax-checkbox>\n</nax-checkbox-group>\n```\n\n```uts\nconst labelLock = ref([] as string[])\n```"
  },
  {
    heading: '最多选 2 项 max',
    body: "```uvue\n<nax-checkbox-group v-model=\"maxVals\" :max=\"2\" wrap>\n\t<nax-checkbox name=\"1\" label=\"选项一\"></nax-checkbox>\n\t<nax-checkbox name=\"2\" label=\"选项二\"></nax-checkbox>\n\t<nax-checkbox name=\"3\" label=\"选项三\"></nax-checkbox>\n\t<nax-checkbox name=\"4\" label=\"选项四\"></nax-checkbox>\n</nax-checkbox-group>\n```\n\n```uts\nconst maxVals = ref(['1'] as string[])\n```"
  },
  {
    heading: '自定义颜色 activeColor',
    body: "```uvue\n<nax-checkbox-group v-model=\"colorVals\" active-color=\"#2080f0\">\n\t<nax-checkbox name=\"c1\" label=\"信息色\"></nax-checkbox>\n\t<nax-checkbox name=\"c2\" label=\"多选\"></nax-checkbox>\n</nax-checkbox-group>\n```\n\n```uts\nconst colorVals = ref(['c1'] as string[])\n```"
  },
  {
    heading: '横向均分 width',
    body: "```uvue\n<nax-checkbox-group v-model=\"widthVals\" width=\"50%\">\n\t<nax-checkbox name=\"w1\" label=\"左侧 50%\"></nax-checkbox>\n\t<nax-checkbox name=\"w2\" label=\"右侧 50%\"></nax-checkbox>\n\t<nax-checkbox name=\"w3\" label=\"再一行左\"></nax-checkbox>\n\t<nax-checkbox name=\"w4\" label=\"再一行右\"></nax-checkbox>\n</nax-checkbox-group>\n```\n\n```uts\nconst widthVals = ref(['w1', 'w2'] as string[])\n```"
  }
]
