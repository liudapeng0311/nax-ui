export default [
  {
    heading: '默认 default',
    body: "```uvue\n<nax-nav-bar\n\ttitle=\"默认标题\"\n\t:fixed=\"false\"\n\t:safe-area-inset-top=\"false\"\n\t:auto-back=\"false\"\n\t@back=\"onBack\"\n></nax-nav-bar>\n```\n\n```uts\nconst lastBack = ref('—')\n\nfunction onBack() {\n\tlastBack.value = 'back'\n}\n```"
  },
  {
    heading: '主色 primary',
    body: "```uvue\n<nax-nav-bar\n\ttype=\"primary\"\n\ttitle=\"主色导航\"\n\t:fixed=\"false\"\n\t:safe-area-inset-top=\"false\"\n\t:auto-back=\"false\"\n\t@back=\"onBack\"\n></nax-nav-bar>\n```"
  },
  {
    heading: '返回文案 + 无图标',
    body: "```uvue\n<nax-nav-bar\n\ttitle=\"设置\"\n\tback-text=\"关闭\"\n\tback-icon=\"\"\n\t:fixed=\"false\"\n\t:safe-area-inset-top=\"false\"\n\t:auto-back=\"false\"\n\t@back=\"onBack\"\n></nax-nav-bar>\n```"
  },
  {
    heading: '左对齐标题 + 无返回',
    body: "```uvue\n<nax-nav-bar\n\ttitle=\"首页风格\"\n\ttitle-align=\"left\"\n\t:show-back=\"false\"\n\t:fixed=\"false\"\n\t:safe-area-inset-top=\"false\"\n>\n\t<template #right>\n\t\t<nax-icon name=\"search\" size=\"22\"></nax-icon>\n\t</template>\n</nax-nav-bar>\n```"
  },
  {
    heading: '自定义中间（插槽）',
    body: "```uvue\n<nax-nav-bar\n\t:fixed=\"false\"\n\t:safe-area-inset-top=\"false\"\n\t:auto-back=\"false\"\n\t@back=\"onBack\"\n>\n\t<view class=\"mid-tabs\">\n\t\t<text class=\"mid-tabs__item mid-tabs__item--on\">关注</text>\n\t\t<text class=\"mid-tabs__item\">推荐</text>\n\t</view>\n\t<template #right>\n\t\t<nax-icon name=\"plus\" size=\"22\"></nax-icon>\n\t</template>\n</nax-nav-bar>\n```"
  },
  {
    heading: '沉浸 immersive（预览）',
    body: "```uvue\n<nax-nav-bar\n\ttitle=\"沉浸标题\"\n\ttype=\"primary\"\n\timmersive\n\t:fixed=\"false\"\n\t:safe-area-inset-top=\"false\"\n\t:auto-back=\"false\"\n\t@back=\"onBack\"\n></nax-nav-bar>\n```\n\n开启 immersive 后导航栏透明底、无底边；若同时 fixed，组件不插入占位，内容可从顶栏下方透出。"
  }
]
