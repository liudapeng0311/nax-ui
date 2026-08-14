export default [
  {
    heading: '基础（4 项）',
    body: "```uvue\n<nax-tabbar\n\tv-model=\"current\"\n\t:list=\"mainList\"\n\t@change=\"onMainChange\"\n\t@click=\"onMainClick\"\n></nax-tabbar>\n\n<nax-button size=\"sm\" label=\"选中 0\" @click=\"setTab(0)\"></nax-button>\n<nax-button size=\"sm\" label=\"消息+1\" @click=\"incBadge\"></nax-button>\n```\n\n```uts\nconst current = ref(0)\nconst msgBadge = ref(5)\nconst lastEvent = ref('')\n\nconst mainList = computed((): any[] => {\n\treturn [\n\t\t{ text: '首页', icon: 'home' },\n\t\t{ text: '发现', icon: 'search' },\n\t\t{ text: '消息', icon: 'heart', badge: msgBadge.value },\n\t\t{ text: '我的', icon: 'user', dot: true }\n\t] as any[]\n})\n\nfunction setTab(index : number) {\n\tcurrent.value = index\n}\n\nfunction incBadge() {\n\tmsgBadge.value = msgBadge.value + 1\n}\n\nfunction onMainChange(index : number) {\n\tlastEvent.value = 'change → ' + index.toString()\n}\n\nfunction onMainClick(index : number) {\n\tlastEvent.value = 'click → ' + index.toString()\n}\n```"
  },
  {
    heading: '非固定 / 无安全区预览',
    body: "```uvue\n<nax-tabbar\n\t:model-value=\"inlineTab\"\n\t:list=\"inlineList\"\n\t:fixed=\"false\"\n\t:placeholder=\"false\"\n\t:safe-area-inset-bottom=\"false\"\n\t@update:model-value=\"onInlineUpdate\"\n\t@change=\"onInlineChange\"\n></nax-tabbar>\n```\n\n```uts\nconst inlineTab = ref(0)\n\nconst inlineList = [\n\t{ text: '首页', icon: 'home' },\n\t{ text: '分类', icon: 'more' },\n\t{ text: '购物', icon: 'star' },\n\t{ text: '我的', icon: 'user' }\n]\n\nfunction onInlineUpdate(index : number) {\n\tinlineTab.value = index\n}\n\nfunction onInlineChange(index : number) {\n\t// index\n}\n```"
  },
  {
    heading: '中间凸起 + 禁用项',
    body: "```uvue\n<nax-tabbar\n\t:model-value=\"midTab\"\n\t:list=\"midList\"\n\t:fixed=\"false\"\n\t:placeholder=\"false\"\n\t:safe-area-inset-bottom=\"false\"\n\t@update:model-value=\"onMidUpdate\"\n\t@change=\"onMidChange\"\n></nax-tabbar>\n```\n\n```uts\nconst midTab = ref(2)\n\nconst midList = [\n\t{ text: '首页', icon: 'home' },\n\t{ text: '动态', icon: 'image' },\n\t{ text: '发布', icon: 'plus', midButton: true },\n\t{ text: '收藏', icon: 'star', disabled: true },\n\t{ text: '我的', icon: 'user' }\n]\n\nfunction onMidUpdate(index : number) {\n\tmidTab.value = index\n}\n\nfunction onMidChange(index : number) {\n\t// index\n}\n```"
  },
  {
    heading: '自定义选中色',
    body: "```uvue\n<nax-tabbar\n\t:model-value=\"colorTab\"\n\t:list=\"colorList\"\n\tactive-color=\"#2080f0\"\n\tinactive-color=\"#a0a0a8\"\n\t@update:model-value=\"onColorUpdate\"\n></nax-tabbar>\n```\n\n```uts\nconst colorTab = ref(0)\n\nconst colorList = [\n\t{ text: '首页', icon: 'home' },\n\t{ text: '搜索', icon: 'search', badge: 3 },\n\t{ text: '设置', icon: 'settings' }\n]\n\nfunction onColorUpdate(index : number) {\n\tcolorTab.value = index\n}\n```"
  }
]
