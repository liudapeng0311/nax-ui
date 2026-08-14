export default [
	{
		heading: '基础用法',
		body: "```uvue\n<nax-rate v-model=\"basic\" @change=\"onBasicChange\"></nax-rate>\n```\n\n```uts\nconst basic = ref(3.0)\n\nfunction onBasicChange(v : number) {\n\t// v 为当前分值\n}\n```"
	},
	{
		heading: '尺寸 size',
		body: "```uvue\n<nax-rate v-model=\"sizeSm\" size=\"sm\"></nax-rate>\n<nax-rate v-model=\"sizeMd\" size=\"md\"></nax-rate>\n<nax-rate v-model=\"sizeLg\" size=\"lg\"></nax-rate>\n<nax-rate v-model=\"sizePx\" size=\"32\"></nax-rate>\n```\n\n```uts\nconst sizeSm = ref(2.0)\nconst sizeMd = ref(3.0)\nconst sizeLg = ref(4.0)\nconst sizePx = ref(3.0)\n```"
	},
	{
		heading: '星星数量 count',
		body: "```uvue\n<nax-rate v-model=\"countVal\" :count=\"8\"></nax-rate>\n```\n\n```uts\nconst countVal = ref(5.0)\n```"
	},
	{
		heading: '自定义颜色 / 间距',
		body: "```uvue\n<nax-rate v-model=\"colorVal\" active-color=\"#d03050\" inactive-color=\"#f0f0f3\" :gutter=\"12\"></nax-rate>\n\n<nax-rate v-model=\"infoVal\" active-color=\"#2080f0\" inactive-color=\"#d6e4ff\"></nax-rate>\n```\n\n```uts\nconst colorVal = ref(4.0)\nconst infoVal = ref(3.0)\n```"
	},
	{
		heading: '最少可选 minCount',
		body: "```uvue\n<nax-rate v-model=\"minVal\" :min-count=\"2\"></nax-rate>\n```\n\n```uts\nconst minVal = ref(2.0)\n```"
	},
	{
		heading: '半星 allowHalf',
		body: "```uvue\n<nax-rate v-model=\"halfVal\" allow-half></nax-rate>\n```\n\n```uts\nconst halfVal = ref(2.5)\n```"
	},
	{
		heading: '禁用 / 只读',
		body: "```uvue\n<nax-rate v-model=\"disabledVal\" disabled></nax-rate>\n<nax-rate v-model=\"readonlyVal\" readonly></nax-rate>\n<nax-rate v-model=\"halfReadonly\" allow-half readonly></nax-rate>\n```\n\n```uts\nconst disabledVal = ref(4.0)\nconst readonlyVal = ref(3.0)\nconst halfReadonly = ref(3.5)\n```"
	},
	{
		heading: '禁用滑动 touchable=false',
		body: "```uvue\n<nax-rate v-model=\"noTouchVal\" :touchable=\"false\"></nax-rate>\n```\n\n```uts\nconst noTouchVal = ref(2.0)\n```"
	},
	{
		heading: '自定义图标',
		body: "```uvue\n<nax-rate v-model=\"heartVal\" active-icon=\"heart\" inactive-icon=\"heart\" active-color=\"#d03050\"></nax-rate>\n```\n\n```uts\nconst heartVal = ref(3.0)\n```"
	}
]
