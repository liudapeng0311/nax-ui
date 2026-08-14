export default [
	{
		heading: '单独使用',
		body: "```uvue\n<nax-radio v-model=\"alone\" label=\"默认选项\" @change=\"onAloneChange\"></nax-radio>\n```\n\n```uts\nconst alone = ref(true)\n\nfunction onAloneChange(v : boolean) {\n\t// v 为选中状态\n}\n```"
	},
	{
		heading: '基础组',
		body: "```uvue\n<nax-radio-group v-model=\"basic\" @change=\"onGroupChange\">\n\t<nax-radio name=\"apple\" label=\"苹果\"></nax-radio>\n\t<nax-radio name=\"banana\" label=\"香蕉\"></nax-radio>\n\t<nax-radio name=\"orange\" label=\"橙子\"></nax-radio>\n</nax-radio-group>\n```\n\n```uts\nconst basic = ref('apple')\n\nfunction onGroupChange(v : string) {\n\t// v 为当前选中 name\n}\n```"
	},
	{
		heading: '形状 shape',
		body: "```uvue\n<nax-radio-group v-model=\"shapeCircle\" shape=\"circle\">\n\t<nax-radio name=\"c1\" label=\"圆形（默认）\"></nax-radio>\n\t<nax-radio name=\"c2\" label=\"另一项\"></nax-radio>\n</nax-radio-group>\n\n<nax-radio-group v-model=\"shapeSquare\" shape=\"square\">\n\t<nax-radio name=\"s1\" label=\"方形\"></nax-radio>\n\t<nax-radio name=\"s2\" label=\"另一项\"></nax-radio>\n</nax-radio-group>\n```\n\n```uts\nconst shapeCircle = ref('c1')\nconst shapeSquare = ref('s1')\n```"
	},
	{
		heading: '尺寸 size',
		body: "```uvue\n<nax-radio-group v-model=\"sizeSm\" size=\"sm\">\n\t<nax-radio name=\"s\" label=\"sm\"></nax-radio>\n</nax-radio-group>\n\n<nax-radio-group v-model=\"sizeMd\" size=\"md\">\n\t<nax-radio name=\"m\" label=\"md\"></nax-radio>\n</nax-radio-group>\n\n<nax-radio-group v-model=\"sizeLg\" size=\"lg\">\n\t<nax-radio name=\"l\" label=\"lg\"></nax-radio>\n</nax-radio-group>\n```\n\n```uts\nconst sizeSm = ref('s')\nconst sizeMd = ref('m')\nconst sizeLg = ref('l')\n```"
	},
	{
		heading: '禁用 disabled',
		body: "```uvue\n<nax-radio-group v-model=\"disabledVals\">\n\t<nax-radio name=\"on\" label=\"可选\"></nax-radio>\n\t<nax-radio name=\"off\" label=\"禁用项\" disabled></nax-radio>\n</nax-radio-group>\n\n<nax-radio-group v-model=\"disabledGroup\" disabled>\n\t<nax-radio name=\"g1\" label=\"整组禁用\"></nax-radio>\n\t<nax-radio name=\"g2\" label=\"不可点\"></nax-radio>\n</nax-radio-group>\n```\n\n```uts\nconst disabledVals = ref('on')\nconst disabledGroup = ref('g1')\n```"
	},
	{
		heading: '文案不可点 labelDisabled',
		body: "```uvue\n<nax-radio-group v-model=\"labelLock\" label-disabled>\n\t<nax-radio name=\"x\" label=\"只能点左侧圆框\"></nax-radio>\n\t<nax-radio name=\"y\" label=\"点文字无效\"></nax-radio>\n</nax-radio-group>\n```\n\n```uts\nconst labelLock = ref('x')\n```"
	},
	{
		heading: '纵向排列 wrap',
		body: "```uvue\n<nax-radio-group v-model=\"wrapVal\" wrap>\n\t<nax-radio name=\"1\" label=\"选项一\"></nax-radio>\n\t<nax-radio name=\"2\" label=\"选项二\"></nax-radio>\n\t<nax-radio name=\"3\" label=\"选项三\"></nax-radio>\n</nax-radio-group>\n```\n\n```uts\nconst wrapVal = ref('1')\n```"
	},
	{
		heading: '自定义颜色 activeColor',
		body: "```uvue\n<nax-radio-group v-model=\"colorVal\" active-color=\"#2080f0\">\n\t<nax-radio name=\"c1\" label=\"信息色\"></nax-radio>\n\t<nax-radio name=\"c2\" label=\"另一项\"></nax-radio>\n</nax-radio-group>\n```\n\n```uts\nconst colorVal = ref('c1')\n```"
	},
	{
		heading: '横向均分 width',
		body: "```uvue\n<nax-radio-group v-model=\"widthVal\" width=\"50%\">\n\t<nax-radio name=\"w1\" label=\"左侧 50%\"></nax-radio>\n\t<nax-radio name=\"w2\" label=\"右侧 50%\"></nax-radio>\n\t<nax-radio name=\"w3\" label=\"再一行左\"></nax-radio>\n\t<nax-radio name=\"w4\" label=\"再一行右\"></nax-radio>\n</nax-radio-group>\n```\n\n```uts\nconst widthVal = ref('w1')\n```"
	}
]
