export default [
	{
		heading: '水平衔接（默认）',
		body: "```uvue\n<nax-notice-bar :list=\"list\" @click=\"onClick\"></nax-notice-bar>\n```\n\n```uts\nconst list = ref([\n\t'寒雨连江夜入吴',\n\t'平明送客楚山孤',\n\t'洛阳亲友如相问',\n\t'一片冰心在玉壶'\n] as string[])\n\nfunction onClick(index : number) {\n\t// 点击第 index 条公告\n}\n```"
	},
	{
		heading: '水平步进 scroll=step',
		body: "```uvue\n<nax-notice-bar\n\tscroll=\"step\"\n\t:list=\"list\"\n\t:duration=\"2500\"\n\t@click=\"onClick\"\n\t@end=\"onEnd\"\n></nax-notice-bar>\n```\n\n```uts\nconst list = ref([\n\t'寒雨连江夜入吴',\n\t'平明送客楚山孤',\n\t'洛阳亲友如相问',\n\t'一片冰心在玉壶'\n] as string[])\n\nfunction onClick(index : number) {\n\t// 点击第 index 条公告\n}\n\nfunction onEnd() {\n\t// 一轮滚动结束\n}\n```"
	},
	{
		heading: '垂直滚动 mode=vertical',
		body: "```uvue\n<nax-notice-bar\n\tmode=\"vertical\"\n\ttype=\"info\"\n\t:list=\"list\"\n\t:duration=\"2000\"\n\t@click=\"onClick\"\n></nax-notice-bar>\n```\n\n```uts\nconst list = ref([\n\t'寒雨连江夜入吴',\n\t'平明送客楚山孤',\n\t'洛阳亲友如相问',\n\t'一片冰心在玉壶'\n] as string[])\n\nfunction onClick(index : number) {\n\t// 点击第 index 条公告\n}\n```"
	},
	{
		heading: '类型 type',
		body: "```uvue\n<nax-notice-bar type=\"primary\" :list=\"shortList\"></nax-notice-bar>\n<nax-notice-bar type=\"info\" :list=\"shortList\"></nax-notice-bar>\n<nax-notice-bar type=\"success\" :list=\"shortList\"></nax-notice-bar>\n<nax-notice-bar type=\"warning\" :list=\"shortList\"></nax-notice-bar>\n<nax-notice-bar type=\"error\" :list=\"shortList\"></nax-notice-bar>\n<nax-notice-bar type=\"none\" :list=\"shortList\"></nax-notice-bar>\n```\n\n```uts\nconst shortList = ref([\n\t'系统将于今晚 23:00 进行维护升级，请提前保存数据。'\n] as string[])\n```"
	},
	{
		heading: '图标 / 更多 / 关闭',
		body: "```uvue\n<nax-notice-bar :show-icon=\"false\" :list=\"shortList\"></nax-notice-bar>\n\n<nax-notice-bar icon=\"star\" type=\"primary\" :list=\"shortList\"></nax-notice-bar>\n\n<nax-notice-bar\n\tshow-more\n\ttype=\"info\"\n\t:list=\"shortList\"\n\t@get-more=\"onGetMore\"\n></nax-notice-bar>\n\n<nax-notice-bar v-if=\"showClose\" closable type=\"error\" :list=\"shortList\" @close=\"onClose\"></nax-notice-bar>\n\n<nax-button size=\"sm\" label=\"重置关闭示例\" @click=\"resetClose\"></nax-button>\n```\n\n```uts\nconst shortList = ref([\n\t'系统将于今晚 23:00 进行维护升级，请提前保存数据。'\n] as string[])\n\nconst showClose = ref(true)\n\nfunction onGetMore() {\n\t// 点击“更多”\n}\n\nfunction onClose() {\n\tshowClose.value = false\n}\n\nfunction resetClose() {\n\tshowClose.value = true\n}\n```"
	},
	{
		heading: '暂停 / 播放',
		body: "```uvue\n<nax-notice-bar :list=\"list\" :paused=\"paused\" :speed=\"40\"></nax-notice-bar>\n\n<nax-button size=\"sm\" label=\"暂停\" @click=\"paused = true\"></nax-button>\n<nax-button size=\"sm\" type=\"primary\" label=\"播放\" @click=\"paused = false\"></nax-button>\n```\n\n```uts\nconst list = ref([\n\t'寒雨连江夜入吴',\n\t'平明送客楚山孤',\n\t'洛阳亲友如相问',\n\t'一片冰心在玉壶'\n] as string[])\n\nconst paused = ref(false)\n```"
	},
	{
		heading: '兼容 is-circular=false',
		body: "```uvue\n<nax-notice-bar\n\t:is-circular=\"false\"\n\ttype=\"success\"\n\t:list=\"list\"\n\t:duration=\"2200\"\n></nax-notice-bar>\n```\n\n```uts\nconst list = ref([\n\t'寒雨连江夜入吴',\n\t'平明送客楚山孤',\n\t'洛阳亲友如相问',\n\t'一片冰心在玉壶'\n] as string[])\n```"
	}
]
