export default [
  {
    heading: '基础（标题 + 段落）',
    body: "```uvue\n<nax-skeleton></nax-skeleton>\n```"
  },
  {
    heading: '头像 + 标题 + 段落',
    body: "```uvue\n<nax-skeleton avatar :rows=\"2\"></nax-skeleton>\n```"
  },
  {
    heading: '方形头像 avatar-shape',
    body: "```uvue\n<nax-skeleton avatar avatar-shape=\"square\" avatar-size=\"40\" :rows=\"2\"></nax-skeleton>\n```"
  },
  {
    heading: '自定义行宽 rows-width',
    body: "```uvue\n<nax-skeleton :rows=\"3\" rows-width=\"100%,88%,52%\" title-width=\"50%\"></nax-skeleton>\n```"
  },
  {
    heading: '列表重复 count',
    body: "```uvue\n<nax-skeleton avatar :rows=\"2\" :count=\"3\" gap=\"20\"></nax-skeleton>\n```"
  },
  {
    heading: '关闭动画 animate=false',
    body: "```uvue\n<nax-skeleton :animate=\"false\" avatar :rows=\"2\"></nax-skeleton>\n```"
  },
  {
    heading: '仅段落（无标题）',
    body: "```uvue\n<nax-skeleton :title=\"false\" :rows=\"4\" rows-width=\"100%,100%,90%,40%\"></nax-skeleton>\n```"
  },
  {
    heading: 'loading 切换真实内容',
    body: "```uvue\n<nax-skeleton :loading=\"demoLoading\" avatar :rows=\"2\">\n\t<view class=\"real__row\">\n\t\t<view class=\"real__avatar\"></view>\n\t\t<view class=\"real__body\">\n\t\t\t<text class=\"real__title\">张三 · 前端工程师</text>\n\t\t\t<text class=\"real__desc\">骨架结束后展示真实列表项内容。</text>\n\t\t</view>\n\t</view>\n</nax-skeleton>\n\n<nax-button\n\ttype=\"primary\"\n\tsize=\"sm\"\n\t:label=\"demoLoading ? '结束加载' : '重新加载 1.5s'\"\n\t@click=\"toggleDemo\"\n></nax-button>\n```\n\n```uts\nconst demoLoading = ref(true)\nlet demoTimer = -1\n\nfunction toggleDemo() {\n\tif (demoLoading.value) {\n\t\tdemoLoading.value = false\n\t\tclearTimeout(demoTimer)\n\t\treturn\n\t}\n\tdemoLoading.value = true\n\tdemoTimer = setTimeout(() => {\n\t\tdemoTimer = -1\n\t\tdemoLoading.value = false\n\t}, 1500)\n}\n```"
  },
  {
    heading: '自定义骨架 #skeleton',
    body: "```uvue\n<nax-skeleton :loading=\"cardLoading\">\n\t<template #skeleton>\n\t\t<view class=\"card-sk\">\n\t\t\t<view class=\"card-sk__cover nax-sk-bone\"></view>\n\t\t\t<view class=\"card-sk__line nax-sk-bone\"></view>\n\t\t\t<view class=\"card-sk__line nax-sk-bone card-sk__line--short\"></view>\n\t\t</view>\n\t</template>\n\t<view class=\"card-real\">\n\t\t<view class=\"card-real__cover\"></view>\n\t\t<text class=\"card-real__title\">自定义卡片内容</text>\n\t\t<text class=\"card-real__desc\">封面 + 两行文案已加载完成</text>\n\t</view>\n</nax-skeleton>\n\n<nax-button type=\"primary\" size=\"sm\" label=\"模拟卡片加载\" @click=\"reloadCard\"></nax-button>\n```\n\n骨架占位块样式（nax-sk-bone 等 class）由页面样式自行定义。\n\n```uts\nconst cardLoading = ref(true)\nlet cardTimer = -1\n\nfunction reloadCard() {\n\tcardLoading.value = true\n\tcardTimer = setTimeout(() => {\n\t\tcardTimer = -1\n\t\tcardLoading.value = false\n\t}, 1500)\n}\n```"
  }
]
