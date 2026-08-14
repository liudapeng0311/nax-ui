export default [
  {
    heading: '基础用法',
    body: "```uvue\n<nax-swipe-action :options=\"singleOptions\" @click=\"onSingleClick\">\n\t<nax-cell title=\"左滑删除\" label=\"options 单按钮\"></nax-cell>\n</nax-swipe-action>\n```\n\n```uts\nconst singleOptions = [\n\t{\n\t\ttext: '删除',\n\t\ttype: 'error',\n\t\tname: 'delete'\n\t}\n]\n\n// payload 含 name / text / itemName 字段\nfunction onSingleClick(e: any) {\n\t// 处理删除\n}\n```"
  },
  {
    heading: '多按钮 + type',
    body: "```uvue\n<nax-swipe-action :options=\"multiOptions\" @click=\"onMultiClick\">\n\t<nax-cell title=\"多操作\" value=\"左滑试试\" is-link></nax-cell>\n</nax-swipe-action>\n```\n\n```uts\nconst multiOptions = [\n\t{\n\t\ttext: '收藏',\n\t\ttype: 'info',\n\t\tname: 'fav',\n\t\twidth: 72\n\t},\n\t{\n\t\ttext: '删除',\n\t\ttype: 'error',\n\t\tname: 'delete',\n\t\twidth: 80\n\t}\n]\n\nfunction onMultiClick(e: any) {\n\t// 处理点击\n}\n```"
  },
  {
    heading: '组内互斥（推荐）',
    body: "```uvue\n<nax-swipe-action-group>\n\t<nax-swipe-action\n\t\tv-for=\"(id, index) in groupIds\"\n\t\t:key=\"id\"\n\t\t:name=\"id\"\n\t\t:options=\"groupOptions\"\n\t\t@click=\"onGroupClick\"\n\t>\n\t\t<nax-cell :title=\"groupTitleAt(index)\" :label=\"groupLabelAt(index)\"></nax-cell>\n\t</nax-swipe-action>\n</nax-swipe-action-group>\n```\n\n```uts\n// key / name 用稳定 id，同时只展开一项\nconst groupIds = ref(['g1', 'g2', 'g3'] as string[])\nconst groupTitles = ref(['张三', '李四', '王五'] as string[])\nconst groupLabels = ref(['今天 10:20', '昨天', '周一'] as string[])\nconst groupOptions = [\n\t{\n\t\ttext: '标为已读',\n\t\ttype: 'primary',\n\t\tname: 'read',\n\t\twidth: 88\n\t},\n\t{\n\t\ttext: '删除',\n\t\ttype: 'error',\n\t\tname: 'delete',\n\t\twidth: 72\n\t}\n]\n\nfunction groupTitleAt(index: number): string {\n\tif (index < 0 || index >= groupTitles.value.length) {\n\t\treturn ''\n\t}\n\treturn groupTitles.value[index]\n}\n\nfunction groupLabelAt(index: number): string {\n\tif (index < 0 || index >= groupLabels.value.length) {\n\t\treturn ''\n\t}\n\treturn groupLabels.value[index]\n}\n\nfunction onGroupClick(e: any) {\n\t// 处理点击\n}\n```"
  },
  {
    heading: '受控 show',
    body: "```uvue\n<nax-button size=\"sm\" label=\"展开\" @click=\"openControlled\"></nax-button>\n<nax-button size=\"sm\" variant=\"secondary\" label=\"收起\" @click=\"closeControlled\"></nax-button>\n\n<nax-swipe-action v-model:show=\"controlledShow\" :options=\"singleOptions\" @open=\"onCtrlOpen\" @close=\"onCtrlClose\">\n\t<nax-cell title=\"受控项\" :value=\"controlledValueText\"></nax-cell>\n</nax-swipe-action>\n```\n\n```uts\nconst singleOptions = [\n\t{\n\t\ttext: '删除',\n\t\ttype: 'error',\n\t\tname: 'delete'\n\t}\n]\n\nconst controlledShow = ref(false)\nconst controlledValueText = computed((): string => {\n\treturn controlledShow.value ? '已展开' : '已收起'\n})\n\nfunction openControlled() {\n\tcontrolledShow.value = true\n}\n\nfunction closeControlled() {\n\tcontrolledShow.value = false\n}\n\nfunction onCtrlOpen() {\n\t// 已展开\n}\n\nfunction onCtrlClose() {\n\t// 已收起\n}\n```"
  },
  {
    heading: '禁用 disabled',
    body: "```uvue\n<nax-swipe-action disabled :options=\"singleOptions\">\n\t<nax-cell title=\"不可滑动\" label=\"disabled=true\"></nax-cell>\n</nax-swipe-action>\n```\n\n```uts\nconst singleOptions = [\n\t{\n\t\ttext: '删除',\n\t\ttype: 'error',\n\t\tname: 'delete'\n\t}\n]\n```"
  },
  {
    heading: '自定义右侧 right 插槽',
    body: "```uvue\n<nax-swipe-action :right-width=\"88\">\n\t<template #right>\n\t\t<view class=\"custom-right\" @click.stop=\"onCustomDelete\">\n\t\t\t<text class=\"custom-right__text\">删除</text>\n\t\t</view>\n\t</template>\n\t<nax-cell title=\"自定义按钮区\" label=\"slot right\"></nax-cell>\n</nax-swipe-action>\n```\n\n```uts\n// custom-right 为页面自定义样式\nfunction onCustomDelete() {\n\tuni.showToast({\n\t\ttitle: '自定义删除',\n\t\ticon: 'none'\n\t})\n}\n```"
  },
  {
    heading: '列表删除示例',
    body: "```uvue\n<nax-swipe-action-group>\n\t<nax-swipe-action\n\t\tv-for=\"(id, index) in deleteIds\"\n\t\t:key=\"id\"\n\t\t:name=\"id\"\n\t\t:options=\"deleteOptions\"\n\t\t@click=\"onDeleteClick\"\n\t>\n\t\t<nax-cell :title=\"deleteTitleAt(index)\" :value=\"id\"></nax-cell>\n\t</nax-swipe-action>\n</nax-swipe-action-group>\n\n<nax-button size=\"sm\" label=\"重置列表\" @click=\"resetDeletable\"></nax-button>\n```\n\n```uts\n// 删除后用稳定 id 当 key，避免列表错乱\nconst deleteIds = ref(['d1', 'd2', 'd3'] as string[])\nconst deleteTitles = ref(['待办 A', '待办 B', '待办 C'] as string[])\nconst deleteOptions = [\n\t{\n\t\ttext: '删除',\n\t\ttype: 'error',\n\t\tname: 'delete'\n\t}\n]\n\nfunction deleteTitleAt(index: number): string {\n\tif (index < 0 || index >= deleteTitles.value.length) {\n\t\treturn ''\n\t}\n\treturn deleteTitles.value[index]\n}\n\nfunction onDeleteClick(e: any) {\n\tconst itemName = (e as UTSJSONObject).getString('itemName')\n\tconst nextIds = [] as string[]\n\tconst nextTitles = [] as string[]\n\tconst ids = deleteIds.value\n\tconst titles = deleteTitles.value\n\tfor (let i = 0; i < ids.length; i++) {\n\t\tif (ids[i] != itemName) {\n\t\t\tnextIds.push(ids[i])\n\t\t\tif (i < titles.length) {\n\t\t\t\tnextTitles.push(titles[i])\n\t\t\t}\n\t\t}\n\t}\n\tdeleteIds.value = nextIds\n\tdeleteTitles.value = nextTitles\n}\n\nfunction resetDeletable() {\n\tdeleteIds.value = ['d1', 'd2', 'd3'] as string[]\n\tdeleteTitles.value = ['待办 A', '待办 B', '待办 C'] as string[]\n}\n```"
  }
]
