export default [
  {
    heading: '基础 value',
    body: "```uvue\n<nax-badge value=\"5\">\n\t<view class=\"avatar\"><text class=\"avatar__text\">消息</text></view>\n</nax-badge>\n\n<nax-badge value=\"15\">\n\t<view class=\"avatar\"><text class=\"avatar__text\">通知</text></view>\n</nax-badge>\n\n<nax-badge value=\"hot\">\n\t<view class=\"avatar\"><text class=\"avatar__text\">文本</text></view>\n</nax-badge>\n```"
  },
  {
    heading: '红点 dot',
    body: "```uvue\n<nax-badge dot>\n\t<view class=\"avatar\"><text class=\"avatar__text\">未读</text></view>\n</nax-badge>\n\n<nax-badge dot type=\"success\">\n\t<view class=\"avatar\"><text class=\"avatar__text\">在线</text></view>\n</nax-badge>\n```"
  },
  {
    heading: '类型 type',
    body: "```uvue\n<nax-badge value=\"6\" type=\"default\">\n\t<view class=\"avatar\"><text class=\"avatar__text\">default</text></view>\n</nax-badge>\n\n<nax-badge value=\"6\" type=\"error\">\n\t<view class=\"avatar\"><text class=\"avatar__text\">error</text></view>\n</nax-badge>\n\n<nax-badge value=\"6\" type=\"info\">\n\t<view class=\"avatar\"><text class=\"avatar__text\">info</text></view>\n</nax-badge>\n\n<nax-badge value=\"6\" type=\"success\">\n\t<view class=\"avatar\"><text class=\"avatar__text\">success</text></view>\n</nax-badge>\n\n<nax-badge value=\"6\" type=\"warning\">\n\t<view class=\"avatar\"><text class=\"avatar__text\">warning</text></view>\n</nax-badge>\n```"
  },
  {
    heading: '最大值 max',
    body: "```uvue\n<nax-badge value=\"100\" :max=\"99\">\n\t<view class=\"avatar\"><text class=\"avatar__text\">99+</text></view>\n</nax-badge>\n\n<nax-badge value=\"1000\" :max=\"999\">\n\t<view class=\"avatar\"><text class=\"avatar__text\">999+</text></view>\n</nax-badge>\n\n<nax-badge :value=\"countText\" :max=\"99\">\n\t<view class=\"avatar\"><text class=\"avatar__text\">动态</text></view>\n</nax-badge>\n\n<nax-button size=\"sm\" label=\"-10\" @click=\"changeCount(-10)\"></nax-button>\n<nax-button size=\"sm\" label=\"+10\" @click=\"changeCount(10)\"></nax-button>\n```\n\n```uts\nconst count = ref(100)\nconst countText = computed((): string => {\n\treturn '' + count.value\n})\n\nfunction changeCount(delta: number) {\n\tconst next = count.value + delta\n\tif (next < 0) {\n\t\tcount.value = 0\n\t\treturn\n\t}\n\tcount.value = next\n}\n```"
  },
  {
    heading: 'show-zero',
    body: "```uvue\n<nax-badge value=\"0\">\n\t<view class=\"avatar\"><text class=\"avatar__text\">隐藏 0</text></view>\n</nax-badge>\n\n<nax-badge value=\"0\" show-zero>\n\t<view class=\"avatar\"><text class=\"avatar__text\">显示 0</text></view>\n</nax-badge>\n```"
  },
  {
    heading: 'show 开关',
    body: "```uvue\n<nax-badge value=\"8\" :show=\"badgeShow\">\n\t<view class=\"avatar\"><text class=\"avatar__text\">可控</text></view>\n</nax-badge>\n\n<nax-button size=\"sm\" :label=\"badgeShow ? '隐藏' : '显示'\" @click=\"toggleShow\"></nax-button>\n```\n\n```uts\nconst badgeShow = ref(true)\n\nfunction toggleShow() {\n\tbadgeShow.value = !badgeShow.value\n}\n```"
  },
  {
    heading: 'processing 处理中',
    body: "```uvue\n<nax-badge value=\"3\" processing>\n\t<view class=\"avatar\"><text class=\"avatar__text\">同步</text></view>\n</nax-badge>\n\n<nax-badge dot processing type=\"info\">\n\t<view class=\"avatar\"><text class=\"avatar__text\">点</text></view>\n</nax-badge>\n```"
  },
  {
    heading: '自定义 color',
    body: "```uvue\n<nax-badge value=\"8\" color=\"#8a2be2\">\n\t<view class=\"avatar\"><text class=\"avatar__text\">紫</text></view>\n</nax-badge>\n\n<nax-badge dot color=\"#f0a020\">\n\t<view class=\"avatar\"><text class=\"avatar__text\">橙点</text></view>\n</nax-badge>\n```"
  },
  {
    heading: '偏移 offset',
    body: "```uvue\n<nax-badge value=\"6\" offset-x=\"0\" offset-y=\"0\">\n\t<view class=\"avatar\"><text class=\"avatar__text\">默认</text></view>\n</nax-badge>\n\n<nax-badge value=\"6\" offset-x=\"8\" offset-y=\"-4\">\n\t<view class=\"avatar\"><text class=\"avatar__text\">偏移</text></view>\n</nax-badge>\n```"
  },
  {
    heading: '独立 alone',
    body: "```uvue\n<nax-badge alone value=\"15\"></nax-badge>\n<nax-badge alone value=\"99+\" type=\"success\"></nax-badge>\n<nax-badge alone dot></nax-badge>\n<nax-badge alone value=\"NEW\" type=\"warning\"></nax-badge>\n```"
  },
  {
    heading: '自定义 value 插槽',
    body: "```uvue\n<nax-badge value=\"VIP\">\n\t<view class=\"avatar\"><text class=\"avatar__text\">插槽</text></view>\n\t<template #value>\n\t\t<text class=\"custom-value\">VIP</text>\n\t</template>\n</nax-badge>\n```"
  }
]
