export default [
  {
    heading: '预设 name',
    body: "```uvue\n<nax-transition\n\t:show=\"visible\"\n\t:name=\"currentName\"\n\t:duration=\"duration\"\n\t@before-enter=\"onEvent('before-enter')\"\n\t@after-enter=\"onEvent('after-enter')\"\n\t@before-leave=\"onEvent('before-leave')\"\n\t@after-leave=\"onEvent('after-leave')\"\n>\n\t<view class=\"card\">\n\t\t<text>过渡内容</text>\n\t</view>\n</nax-transition>\n\n<nax-button type=\"primary\" :label=\"visible ? '隐藏' : '显示'\" @click=\"toggle\"></nax-button>\n```\n\n```uts\nconst visible = ref(true)\nconst currentName = ref('fade')\nconst duration = ref(280)\nconst lastEvent = ref('')\n\n// 可选预设：fade / slide-up / slide-down / slide-left / slide-right / zoom / fade-up\nfunction toggle() {\n\tvisible.value = !visible.value\n}\n\nfunction pickName(name : string) {\n\tcurrentName.value = name\n\t// 切换预设时重新播一次，便于对比\n\tvisible.value = false\n\tsetTimeout(() => {\n\t\tvisible.value = true\n\t}, 40)\n}\n\nfunction onEvent(name : string) {\n\tlastEvent.value = name\n}\n```"
  },
  {
    heading: '时长 duration',
    body: "```uvue\n<nax-transition :show=\"visible\" :name=\"currentName\" :duration=\"duration\">\n\t<!-- 内容 -->\n</nax-transition>\n```\n\n```uts\nconst duration = ref(280)\n\nfunction setDuration(v : number) {\n\tduration.value = v\n}\n\n// 0 表示无动画\n```"
  },
  {
    heading: '底部面板（slide-up 场景）',
    body: "```uvue\n<nax-transition :show=\"sheetShow\" name=\"fade\" :duration=\"280\" @after-leave=\"onSheetGone\">\n\t<view class=\"sheet-mask\" @click=\"closeSheet\"></view>\n</nax-transition>\n<nax-transition :show=\"sheetShow\" name=\"slide-up\" :duration=\"280\" @after-leave=\"onSheetGone\">\n\t<view class=\"sheet-panel\">\n\t\t<text>底部面板：遮罩 fade + 面板 slide-up</text>\n\t\t<nax-button label=\"关闭\" @click=\"closeSheet\"></nax-button>\n\t</view>\n</nax-transition>\n```\n\n```uts\nconst sheetShow = ref(false)\nconst sheetMounted = ref(false)\nlet sheetLeaveCount = 0\n\nfunction openSheet() {\n\tsheetLeaveCount = 0\n\tsheetMounted.value = true\n\t// 下一帧再 show，确保容器已挂载\n\tsetTimeout(() => {\n\t\tsheetShow.value = true\n\t}, 20)\n}\n\nfunction closeSheet() {\n\tsheetShow.value = false\n}\n\nfunction onSheetGone() {\n\t// mask + panel 各触发一次 after-leave\n\tsheetLeaveCount++\n\tif (sheetLeaveCount >= 2 && !sheetShow.value) {\n\t\tsheetMounted.value = false\n\t\tsheetLeaveCount = 0\n\t}\n}\n```"
  }
]
