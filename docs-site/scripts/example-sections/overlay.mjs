export default [
	{
		heading: '基础遮罩',
		body: "```uvue\n<nax-button type=\"primary\" size=\"sm\" label=\"打开遮罩\" @click=\"openBasic\"></nax-button>\n\n<nax-overlay v-model:show=\"basicShow\" close-on-click @click=\"onOverlayClick\"></nax-overlay>\n```\n\n```uts\nconst basicShow = ref(false)\n\nfunction openBasic() {\n\tbasicShow.value = true\n}\n\nfunction onOverlayClick() {\n\t// 点击遮罩\n}\n```"
	},
	{
		heading: '遮罩 + Loading',
		body: "```uvue\n<nax-button type=\"primary\" size=\"sm\" label=\"全屏加载 2s\" @click=\"openLoading\"></nax-button>\n\n<nax-overlay :show=\"loadingShow\" :close-on-click=\"true\" @update:show=\"onLoadingShowUpdate\">\n\t<view class=\"loading-box\">\n\t\t<nax-loading vertical text=\"加载中\" type=\"primary\"></nax-loading>\n\t</view>\n</nax-overlay>\n```\n\n```uts\nconst loadingShow = ref(false)\nlet loadingTimer : number = -1\n\nfunction openLoading() {\n\tloadingShow.value = true\n\tloadingTimer = setTimeout(() => {\n\t\tloadingShow.value = false\n\t\tloadingTimer = -1\n\t}, 2000)\n}\n\nfunction onLoadingShowUpdate(val : boolean) {\n\tloadingShow.value = val\n\tif (!val && loadingTimer >= 0) {\n\t\tclearTimeout(loadingTimer)\n\t\tloadingTimer = -1\n\t}\n}\n```"
	},
	{
		heading: '自定义颜色',
		body: "```uvue\n<nax-button size=\"sm\" label=\"深蓝遮罩\" @click=\"openColor\"></nax-button>\n\n<nax-overlay v-model:show=\"colorShow\" close-on-click color=\"rgba(8, 40, 90, 0.55)\"></nax-overlay>\n```\n\n```uts\nconst colorShow = ref(false)\n\nfunction openColor() {\n\tcolorShow.value = true\n}\n```"
	},
	{
		heading: '无动画 duration=0',
		body: "```uvue\n<nax-button size=\"sm\" label=\"立即显示\" @click=\"openInstant\"></nax-button>\n\n<nax-overlay v-model:show=\"instantShow\" :duration=\"0\" close-on-click></nax-overlay>\n```\n\n```uts\nconst instantShow = ref(false)\n\nfunction openInstant() {\n\tinstantShow.value = true\n}\n```"
	},
	{
		heading: '事件日志',
		body: "```uvue\n<nax-overlay v-model:show=\"basicShow\" close-on-click @click=\"onOverlayClick\" @open=\"onOpen('basic')\" @opened=\"onOpened('basic')\" @close=\"onClose('basic')\"></nax-overlay>\n```\n\n```uts\nconst basicShow = ref(false)\nconst logText = ref('暂无事件')\n\nfunction onOverlayClick() {\n\tlogText.value = 'click 遮罩'\n}\n\nfunction onOpen(name : string) {\n\tlogText.value = name + ' open'\n}\n\nfunction onOpened(name : string) {\n\tlogText.value = name + ' opened'\n}\n\nfunction onClose(name : string) {\n\tlogText.value = name + ' close'\n}\n```"
	}
]
