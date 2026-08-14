export default [
  {
    heading: '基础',
    body: "```uvue\n<nax-button type=\"primary\" label=\"打开菜单\" @click=\"openBasic\"></nax-button>\n\n<nax-action-sheet\n\tv-model:show=\"basicShow\"\n\t:actions=\"basicActions\"\n\t@select=\"onSelect\"\n\t@cancel=\"onCancel\"\n\t@open=\"onEvent('open')\"\n\t@close=\"onEvent('close')\"\n></nax-action-sheet>\n```\n\n```uts\nconst basicShow = ref(false)\nconst basicActions = [\n\t{ name: '分享给朋友' },\n\t{ name: '生成海报', subname: '保存到相册' },\n\t{ name: '收藏' }\n]\n\nfunction openBasic() {\n\tbasicShow.value = true\n}\n\n// select 载荷：{ index: number, name: string }\nfunction onSelect(payload: UTSJSONObject) {\n\tconst name = payload.getString('name')\n\tuni.showToast({ title: name != null ? name : '', icon: 'none' })\n}\n\nfunction onCancel() {\n\t// 点击取消或遮罩关闭\n}\n\nfunction onEvent(name: string) {\n\tconsole.log(name)\n}\n```"
  },
  {
    heading: '标题 / 描述 / 危险项',
    body: "```uvue\n<nax-button label=\"带标题与删除\" @click=\"openWithTitle\"></nax-button>\n\n<nax-action-sheet\n\tv-model:show=\"titleShow\"\n\ttitle=\"对当前内容\"\n\tdescription=\"请选择要执行的操作\"\n\t:actions=\"titleActions\"\n\t@select=\"onSelect\"\n\t@cancel=\"onCancel\"\n></nax-action-sheet>\n```\n\n```uts\nconst titleShow = ref(false)\nconst titleActions = [\n\t{ name: '编辑' },\n\t{ name: '置顶' },\n\t{ name: '删除', type: 'error', subname: '删除后不可恢复' }\n]\n\nfunction openWithTitle() {\n\ttitleShow.value = true\n}\n\nfunction onSelect(payload: UTSJSONObject) {\n\t// index: number, name: string\n}\n\nfunction onCancel() {\n\t// 点击取消\n}\n```"
  },
  {
    heading: '禁用项 / 无取消',
    body: "```uvue\n<nax-button size=\"sm\" label=\"含禁用项\" @click=\"openDisabled\"></nax-button>\n<nax-button size=\"sm\" label=\"隐藏取消\" @click=\"openNoCancel\"></nax-button>\n\n<nax-action-sheet\n\tv-model:show=\"disabledShow\"\n\t:actions=\"disabledActions\"\n\t@select=\"onSelect\"\n\t@cancel=\"onCancel\"\n></nax-action-sheet>\n\n<nax-action-sheet\n\tv-model:show=\"noCancelShow\"\n\t:show-cancel=\"false\"\n\t:actions=\"basicActions\"\n\t@select=\"onSelect\"\n></nax-action-sheet>\n```\n\n```uts\nconst disabledShow = ref(false)\nconst noCancelShow = ref(false)\nconst basicActions = [\n\t{ name: '分享给朋友' },\n\t{ name: '生成海报', subname: '保存到相册' },\n\t{ name: '收藏' }\n]\nconst disabledActions = [\n\t{ name: '可选项 A' },\n\t{ name: '已禁用', disabled: true, subname: '当前不可用' },\n\t{ name: '可选项 B', type: 'primary' }\n]\n\nfunction openDisabled() {\n\tdisabledShow.value = true\n}\n\nfunction openNoCancel() {\n\tnoCancelShow.value = true\n}\n\nfunction onSelect(payload: UTSJSONObject) {\n\t// index: number, name: string\n}\n\nfunction onCancel() {\n\t// 点击取消\n}\n```"
  },
  {
    heading: '异步关闭',
    body: "```uvue\n<nax-button size=\"sm\" label=\"点项不自动关\" @click=\"openAsync\"></nax-button>\n\n<nax-action-sheet\n\tv-model:show=\"asyncShow\"\n\ttitle=\"异步关闭示例\"\n\tdescription=\"选中后不会自动关闭，请点取消或遮罩\"\n\t:actions=\"basicActions\"\n\t:async-close=\"true\"\n\t@select=\"onAsyncSelect\"\n\t@cancel=\"onCancel\"\n></nax-action-sheet>\n```\n\n```uts\nconst asyncShow = ref(false)\nconst basicActions = [\n\t{ name: '分享给朋友' },\n\t{ name: '生成海报', subname: '保存到相册' },\n\t{ name: '收藏' }\n]\n\nfunction openAsync() {\n\tasyncShow.value = true\n}\n\n// async-close 下点项不自动关闭，由业务决定何时收起\nfunction onAsyncSelect(payload: UTSJSONObject) {\n\tconst name = payload.getString('name')\n\tuni.showToast({ title: '已选：' + (name != null ? name : ''), icon: 'none' })\n\t// 需要时：asyncShow.value = false\n}\n\nfunction onCancel() {\n\t// 点击取消\n}\n```"
  }
]
