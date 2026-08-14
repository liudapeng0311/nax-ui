export default [
	{
		heading: '判断当前环境是否支持压窗',
		body: "```uts\nimport { naxPopupSupportsWindowCover } from '@/uni_modules/nax-popup/index.uts'\n\n// 当前环境是否支持真·压窗（dialogPage）？\n// App / Web：支持，可盖住原生导航栏与 tabBar\n// 微信小程序等：不支持，组件已自动降级为页面级弹层\nconst supported = naxPopupSupportsWindowCover()\n```"
	},
	{
		heading: '压窗 · 内置 host（title/content）',
		body: "```uvue\n<nax-button type=\"primary\" label=\"居中压窗\" @click=\"openWindowCenter\"></nax-button>\n<nax-button size=\"sm\" label=\"底部\" @click=\"openWindowBottom\"></nax-button>\n<nax-button size=\"sm\" label=\"mode=window\" @click=\"openForceWindow\"></nax-button>\n```\n\n```uts\nfunction openWindowCenter() {\n\topenNaxPopup({\n\t\ttitle: '压窗屏',\n\t\tcontent: 'App/Web 下遮罩应盖住导航栏。点遮罩或关闭按钮退出。',\n\t\tposition: 'center',\n\t\tmaskClosable: true\n\t})\n}\n\nfunction openWindowBottom() {\n\topenNaxPopup({\n\t\ttitle: '底部压窗',\n\t\tcontent: 'position=bottom 的内置 host 面板。',\n\t\tposition: 'bottom',\n\t\tmaskClosable: true\n\t})\n}\n\nfunction openForceWindow() {\n\topenNaxPopup({\n\t\tmode: 'window',\n\t\ttitle: '强制 window',\n\t\tcontent: 'mode=window：不支持的端会 warn 并尝试页面宿主降级。',\n\t\tposition: 'center'\n\t})\n}\n```"
	},
	{
		heading: '压窗 · 自定义 dialog 页',
		body: "```uvue\n<nax-button type=\"info\" label=\"打开 demo-dialog 页\" @click=\"openCustomDialog\"></nax-button>\n```\n\n```uts\n// 复杂 UI 推荐自建透明页 + openNaxPopup({ url })；\n// animationType 建议 none，进退场动画写在 dialog 页内\nfunction openCustomDialog() {\n\topenNaxPopup({\n\t\turl: '/pages/components/popup/demo-dialog',\n\t\tanimationType: 'none'\n\t})\n}\n```"
	},
	{
		heading: '页面级 · 不压窗（全端一致）',
		body: "```uvue\n<nax-button label=\"mode=page API\" @click=\"openPageMode\"></nax-button>\n<nax-button label=\"声明式插槽\" @click=\"openDeclarative\"></nax-button>\n\n<nax-popup v-model:show=\"declShow\" position=\"bottom\">\n\t<view class=\"demo-panel\">\n\t\t<text class=\"demo-panel__title\">声明式 nax-popup</text>\n\t\t<nax-button size=\"sm\" type=\"primary\" label=\"关闭\" @click=\"declShow = false\"></nax-button>\n\t</view>\n</nax-popup>\n```\n\n```uts\nconst declShow = ref(false)\n\nfunction openPageMode() {\n\topenNaxPopup({\n\t\tmode: 'page',\n\t\ttitle: '页面级 API',\n\t\tcontent: 'mode=page：全端走页面宿主，不盖原生栏。',\n\t\tposition: 'center'\n\t})\n}\n\nfunction openDeclarative() {\n\tdeclShow.value = true\n}\n```"
	},
	{
		heading: '关闭',
		body: "```uvue\n<nax-button size=\"sm\" label=\"closeNaxPopup()\" @click=\"onCloseApi\"></nax-button>\n```\n\n```uts\nfunction onCloseApi() {\n\tcloseNaxPopup()\n}\n```"
	}
]
