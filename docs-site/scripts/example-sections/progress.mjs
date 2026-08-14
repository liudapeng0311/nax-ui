export default [
	{
		heading: '基础线形',
		body: "```uvue\n<nax-progress :percent=\"30\"></nax-progress>\n<nax-progress :percent=\"60\"></nax-progress>\n<nax-progress :percent=\"100\"></nax-progress>\n```"
	},
	{
		heading: '动态 percent',
		body: "```uvue\n<nax-progress :percent=\"dynamicPercent\" type=\"primary\"></nax-progress>\n\n<nax-button size=\"sm\" label=\"-10\" @click=\"dec\"></nax-button>\n<nax-button size=\"sm\" type=\"primary\" label=\"+10\" @click=\"inc\"></nax-button>\n<nax-button size=\"sm\" variant=\"secondary\" label=\"随机\" @click=\"rand\"></nax-button>\n\n<nax-progress shape=\"circle\" :percent=\"dynamicPercent\" type=\"info\" :width=\"112\" :stroke-width=\"8\"></nax-progress>\n```\n\n```uts\nconst dynamicPercent = ref(42)\n\nfunction clamp(v : number) : number {\n\tif (v < 0) {\n\t\treturn 0\n\t}\n\tif (v > 100) {\n\t\treturn 100\n\t}\n\treturn v\n}\n\nfunction inc() {\n\tdynamicPercent.value = clamp(dynamicPercent.value + 10)\n}\n\nfunction dec() {\n\tdynamicPercent.value = clamp(dynamicPercent.value - 10)\n}\n\nfunction rand() {\n\tdynamicPercent.value = Math.floor(Math.random() * 101)\n}\n```"
	},
	{
		heading: '类型 type',
		body: "```uvue\n<nax-progress type=\"primary\" :percent=\"70\"></nax-progress>\n<nax-progress type=\"info\" :percent=\"70\"></nax-progress>\n<nax-progress type=\"success\" :percent=\"70\"></nax-progress>\n<nax-progress type=\"warning\" :percent=\"70\"></nax-progress>\n<nax-progress type=\"error\" :percent=\"70\"></nax-progress>\n```"
	},
	{
		heading: '尺寸 size',
		body: "```uvue\n<nax-progress size=\"sm\" :percent=\"50\"></nax-progress>\n<nax-progress size=\"md\" :percent=\"50\"></nax-progress>\n<nax-progress size=\"lg\" :percent=\"50\"></nax-progress>\n```"
	},
	{
		heading: '条内文案 textInside',
		body: "```uvue\n<nax-progress :percent=\"55\" text-inside></nax-progress>\n<nax-progress :percent=\"88\" text-inside type=\"success\"></nax-progress>\n```"
	},
	{
		heading: '隐藏文案 / 自定义 pivotText',
		body: "```uvue\n<nax-progress :percent=\"40\" :show-info=\"false\"></nax-progress>\n<nax-progress :percent=\"40\" pivot-text=\"上传中\"></nax-progress>\n```"
	},
	{
		heading: 'status 覆盖色',
		body: "```uvue\n<nax-progress :percent=\"100\" status=\"success\"></nax-progress>\n<nax-progress :percent=\"60\" status=\"warning\"></nax-progress>\n<nax-progress :percent=\"30\" status=\"error\"></nax-progress>\n```"
	},
	{
		heading: '圆形 shape=circle（含类型）',
		body: "```uvue\n<nax-progress shape=\"circle\" :percent=\"25\" size=\"sm\"></nax-progress>\n<nax-progress shape=\"circle\" :percent=\"60\"></nax-progress>\n<nax-progress shape=\"circle\" :percent=\"100\" type=\"success\" size=\"lg\"></nax-progress>\n\n<nax-progress shape=\"circle\" type=\"primary\" :percent=\"70\" size=\"sm\"></nax-progress>\n<nax-progress shape=\"circle\" type=\"info\" :percent=\"70\" size=\"sm\"></nax-progress>\n<nax-progress shape=\"circle\" type=\"warning\" :percent=\"70\" size=\"sm\"></nax-progress>\n<nax-progress shape=\"circle\" type=\"error\" :percent=\"70\" size=\"sm\"></nax-progress>\n```"
	},
	{
		heading: '插槽 useSlot',
		body: "```uvue\n<nax-progress :percent=\"50\" use-slot>\n\t<text class=\"slot-text\">一半啦</text>\n</nax-progress>\n\n<nax-progress shape=\"circle\" :percent=\"75\" use-slot size=\"md\">\n\t<text class=\"slot-text\">3/4</text>\n</nax-progress>\n```"
	}
]
