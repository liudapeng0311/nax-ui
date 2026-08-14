export default [
  {
    heading: '基础 + 内容联动',
    body: "```uvue\n<nax-tabs v-model=\"basicCurrent\" :list=\"basicList\" @change=\"onBasicChange\" @click=\"onBasicClick\"></nax-tabs>\n```\n\n```uts\nconst basicCurrent = ref(0)\nconst lastEvent = ref('')\n\nconst basicList = [\n\t{ name: '关注' },\n\t{ name: '推荐' },\n\t{ name: '热榜' }\n]\n\nfunction onBasicChange(index : number) {\n\tlastEvent.value = 'change → ' + index.toString()\n}\n\nfunction onBasicClick(index : number) {\n\tlastEvent.value = 'click → ' + index.toString()\n}\n```"
  },
  {
    heading: '可滚动（多项）· 居中 scrollAlign=center',
    body: "```uvue\n<nax-tabs v-model=\"scrollCurrent\" :list=\"scrollList\" :scrollable=\"true\" scroll-align=\"center\"></nax-tabs>\n```\n\n```uts\nconst scrollCurrent = ref(1)\n\nconst scrollList = [\n\t{ name: '关注' },\n\t{ name: '推荐' },\n\t{ name: '热榜' },\n\t{ name: '同城' },\n\t{ name: '直播' },\n\t{ name: '影视' },\n\t{ name: '游戏' },\n\t{ name: '音乐' },\n\t{ name: '科技' },\n\t{ name: '更多' }\n]\n```"
  },
  {
    heading: '可滚动 · 贴左 scrollAlign=left',
    body: "```uvue\n<nax-tabs v-model=\"scrollLeftCurrent\" :list=\"scrollList\" :scrollable=\"true\" scroll-align=\"left\"></nax-tabs>\n```\n\n```uts\nconst scrollLeftCurrent = ref(4)\n\n// scrollList 同上：10 项可滚动列表\n```"
  },
  {
    heading: '均分宽度',
    body: "```uvue\n<nax-tabs v-model=\"equalCurrent\" :list=\"equalList\" :scrollable=\"false\"></nax-tabs>\n\n<nax-button size=\"sm\" label=\"选中 0\" @click=\"setEqual(0)\"></nax-button>\n<nax-button size=\"sm\" label=\"选中 1\" @click=\"setEqual(1)\"></nax-button>\n<nax-button size=\"sm\" label=\"选中 2\" @click=\"setEqual(2)\"></nax-button>\n```\n\n```uts\nconst equalCurrent = ref(0)\n\nconst equalList = [\n\t{ name: '全部' },\n\t{ name: '待付款' },\n\t{ name: '已完成' }\n]\n\nfunction setEqual(index : number) {\n\tequalCurrent.value = index\n}\n```"
  },
  {
    heading: '徽标 / 红点 / 禁用',
    body: "```uvue\n<nax-tabs v-model=\"badgeCurrent\" :list=\"badgeList\" :scrollable=\"false\"></nax-tabs>\n\n<nax-button size=\"sm\" label=\"消息+1\" @click=\"incBadge\"></nax-button>\n<nax-button size=\"sm\" label=\"重置徽标\" @click=\"resetBadge\"></nax-button>\n```\n\n```uts\nconst badgeCurrent = ref(0)\nconst msgBadge = ref(5)\n\nconst badgeList = computed((): any[] => {\n\treturn [\n\t\t{ name: '消息', badge: msgBadge.value },\n\t\t{ name: '动态', dot: true },\n\t\t{ name: '下线', disabled: true },\n\t\t{ name: '我的' }\n\t] as any[]\n})\n\nfunction incBadge() {\n\tmsgBadge.value = msgBadge.value + 1\n}\n\nfunction resetBadge() {\n\tmsgBadge.value = 5\n}\n```"
  },
  {
    heading: '尺寸 size',
    body: "```uvue\n<nax-tabs v-model=\"sizeCurrent\" :list=\"sizeList\" size=\"sm\" :scrollable=\"false\"></nax-tabs>\n<nax-tabs v-model=\"sizeCurrent\" :list=\"sizeList\" size=\"md\" :scrollable=\"false\"></nax-tabs>\n<nax-tabs v-model=\"sizeCurrent\" :list=\"sizeList\" size=\"lg\" :scrollable=\"false\"></nax-tabs>\n```\n\n```uts\nconst sizeCurrent = ref(0)\n\nconst sizeList = [\n\t{ name: '选项A' },\n\t{ name: '选项B' },\n\t{ name: '选项C' }\n]\n```"
  },
  {
    heading: '指示条宽度 / 无指示条',
    body: "```uvue\n<nax-tabs v-model=\"lineCurrent\" :list=\"equalList\" :scrollable=\"false\" line-width=\"40\"></nax-tabs>\n<nax-tabs v-model=\"lineCurrent\" :list=\"equalList\" :scrollable=\"false\" :show-line=\"false\"></nax-tabs>\n```\n\n```uts\nconst lineCurrent = ref(1)\n\n// equalList 同「均分宽度」：3 项均分\n```"
  },
  {
    heading: '字符串 list + keyName',
    body: "```uvue\n<nax-tabs v-model=\"strCurrent\" :list=\"strList\" :scrollable=\"false\"></nax-tabs>\n<nax-tabs v-model=\"keyCurrent\" :list=\"keyList\" key-name=\"title\" :scrollable=\"false\"></nax-tabs>\n```\n\n```uts\nconst strCurrent = ref(0)\nconst keyCurrent = ref(0)\n\nconst strList = ['早报', '午报', '晚报']\n\nconst keyList = [\n\t{ title: '标题一', name: '忽略' },\n\t{ title: '标题二', name: '忽略' },\n\t{ title: '标题三', name: '忽略' }\n]\n```"
  },
  {
    heading: '无底部分割线',
    body: "```uvue\n<nax-tabs v-model=\"basicCurrent\" :list=\"basicList\" :border=\"false\"></nax-tabs>\n```\n\n```uts\n// basicCurrent / basicList 复用「基础 + 内容联动」的声明\n```"
  }
]
