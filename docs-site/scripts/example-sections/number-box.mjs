export default [
	{
		heading: '基础用法',
		body: "```uvue\n<nax-number-box v-model=\"basic\" @change=\"onBasicChange\"></nax-number-box>\n```\n\n```uts\nconst basic = ref(1)\n\nfunction onBasicChange(v : number) {\n\t// v 为最新值\n}\n```"
	},
	{
		heading: '尺寸 size',
		body: "```uvue\n<nax-number-box v-model=\"sizeSm\" size=\"sm\"></nax-number-box>\n<nax-number-box v-model=\"sizeMd\" size=\"md\"></nax-number-box>\n<nax-number-box v-model=\"sizeLg\" size=\"lg\"></nax-number-box>\n```\n\n```uts\nconst sizeSm = ref(1)\nconst sizeMd = ref(2)\nconst sizeLg = ref(3)\n```"
	},
	{
		heading: '范围 min / max / step',
		body: "```uvue\n<nax-number-box v-model=\"rangeVal\" :min=\"1\" :max=\"10\" :step=\"1\" @overlimit=\"onOverlimit\"></nax-number-box>\n\n<nax-number-box v-model=\"stepVal\" :min=\"0\" :max=\"5\" :step=\"0.5\"></nax-number-box>\n```\n\n```uts\nconst rangeVal = ref(1)\nconst stepVal = ref(0)\n\nfunction onOverlimit(type : string) {\n\t// type 为 'plus' 或 'minus'，已达边界\n}\n```"
	},
	{
		heading: '仅整数 integer',
		body: "```uvue\n<nax-number-box v-model=\"intVal\" integer :min=\"0\" :max=\"99\"></nax-number-box>\n```\n\n```uts\nconst intVal = ref(3)\n```"
	},
	{
		heading: '禁用',
		body: "```uvue\n<nax-number-box v-model=\"disabledAll\" disabled></nax-number-box>\n\n<nax-number-box v-model=\"disabledInputVal\" disabled-input></nax-number-box>\n\n<nax-number-box v-model=\"disableBtnVal\" disable-plus disable-minus></nax-number-box>\n```\n\n```uts\nconst disabledAll = ref(5)\nconst disabledInputVal = ref(2)\nconst disableBtnVal = ref(4)\n```"
	},
	{
		heading: '长按 longPress',
		body: "```uvue\n<nax-number-box v-model=\"longPressOn\" :long-press=\"true\"></nax-number-box>\n\n<nax-number-box v-model=\"longPressOff\" :long-press=\"false\"></nax-number-box>\n```\n\n```uts\nconst longPressOn = ref(0)\nconst longPressOff = ref(0)\n```"
	},
	{
		heading: '异步变更 asyncChange',
		body: "```uvue\n<nax-number-box v-model=\"asyncVal\" async-change @change=\"onAsyncChange\"></nax-number-box>\n```\n\n```uts\nconst asyncVal = ref(1)\nconst asyncBusy = ref(false)\n\n// 收到 change 后延迟回写 v-model，期间可展示“提交中”状态\nfunction onAsyncChange(v : number) {\n\tif (asyncBusy.value) {\n\t\treturn\n\t}\n\tasyncBusy.value = true\n\tconst target = v\n\tsetTimeout(() => {\n\t\tasyncVal.value = target\n\t\tasyncBusy.value = false\n\t}, 800)\n}\n```"
	},
	{
		heading: '自定义颜色 / 宽度',
		body: "```uvue\n<nax-number-box v-model=\"colorVal\" bg-color=\"#e8f5ee\" color=\"#18a058\" :button-size=\"36\" :input-width=\"56\"></nax-number-box>\n```\n\n```uts\nconst colorVal = ref(1)\n```"
	},
	{
		heading: '自定义插槽',
		body: "```uvue\n<nax-number-box v-model=\"slotVal\">\n\t<template #minus>\n\t\t<text class=\"slot-text\">减</text>\n\t</template>\n\t<template #plus>\n\t\t<text class=\"slot-text\">加</text>\n\t</template>\n</nax-number-box>\n```\n\n```uts\nconst slotVal = ref(1)\n```"
	},
	{
		heading: '事件',
		body: "```uvue\n<nax-number-box\n\tv-model=\"eventVal\"\n\t:min=\"0\"\n\t:max=\"20\"\n\t@change=\"onEventChange\"\n\t@focus=\"onEventFocus\"\n\t@blur=\"onEventBlur\"\n\t@plus=\"onEventPlus\"\n\t@minus=\"onEventMinus\"\n\t@overlimit=\"onOverlimit\"\n></nax-number-box>\n```\n\n```uts\nconst eventVal = ref(0)\nconst eventLog = ref('等待操作')\n\nfunction onEventChange(v : number) {\n\teventLog.value = 'change: ' + v.toString()\n}\n\nfunction onEventFocus() {\n\teventLog.value = 'focus'\n}\n\nfunction onEventBlur(v : number) {\n\teventLog.value = 'blur: ' + v.toString()\n}\n\nfunction onEventPlus() {\n\teventLog.value = 'plus'\n}\n\nfunction onEventMinus() {\n\teventLog.value = 'minus'\n}\n\nfunction onOverlimit(type : string) {\n\teventLog.value = 'overlimit: ' + type\n}\n```"
	}
]
