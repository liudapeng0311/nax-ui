export default [
  {
    heading: '基础',
    body: "```uvue\n<nax-alert\n\ttitle=\"温馨提示\"\n\tdescription=\"请先完成实名认证后再进行提现操作。\"\n></nax-alert>\n```"
  },
  {
    heading: '类型 type',
    body: "```uvue\n<nax-alert type=\"primary\" title=\"主色提示\" description=\"这是 primary 类型。\"></nax-alert>\n<nax-alert type=\"info\" title=\"信息提示\" description=\"这是 info 类型。\"></nax-alert>\n<nax-alert type=\"success\" title=\"成功提示\" description=\"操作已成功完成。\"></nax-alert>\n<nax-alert type=\"warning\" title=\"警告提示\" description=\"请注意相关风险。\"></nax-alert>\n<nax-alert type=\"error\" title=\"错误提示\" description=\"提交失败，请稍后重试。\"></nax-alert>\n```"
  },
  {
    heading: '实心 variant=solid',
    body: "```uvue\n<nax-alert type=\"info\" variant=\"solid\" title=\"信息\" description=\"实心填充样式。\"></nax-alert>\n<nax-alert type=\"success\" variant=\"solid\" title=\"成功\" description=\"实心填充样式。\"></nax-alert>\n<nax-alert type=\"warning\" variant=\"solid\" title=\"警告\" description=\"实心填充样式。\"></nax-alert>\n<nax-alert type=\"error\" variant=\"solid\" title=\"错误\" description=\"实心填充样式。\"></nax-alert>\n```"
  },
  {
    heading: '仅标题 / 仅描述',
    body: "```uvue\n<nax-alert type=\"info\" title=\"只有标题\"></nax-alert>\n<nax-alert type=\"warning\" description=\"只有描述文字，没有标题。\"></nax-alert>\n```"
  },
  {
    heading: '无图标 / 自定义图标',
    body: "```uvue\n<nax-alert :show-icon=\"false\" type=\"info\" title=\"不显示图标\" description=\"show-icon=false\"></nax-alert>\n<nax-alert icon=\"star\" type=\"primary\" title=\"自定义图标\" description=\"icon=star\"></nax-alert>\n```"
  },
  {
    heading: '居中 center',
    body: "```uvue\n<nax-alert\n\tcenter\n\ttype=\"success\"\n\ttitle=\"居中展示\"\n\tdescription=\"标题与描述水平居中。\"\n></nax-alert>\n```"
  },
  {
    heading: '可关闭 closable',
    body: "```uvue\n<nax-alert\n\tv-if=\"showCloseA\"\n\tclosable\n\ttype=\"error\"\n\ttitle=\"账号异常\"\n\tdescription=\"检测到异地登录，建议立即修改密码。\"\n\t@close=\"onCloseA\"\n></nax-alert>\n\n<nax-alert\n\tclosable\n\t:show=\"showCloseB\"\n\ttype=\"warning\"\n\ttitle=\"受控显示\"\n\tdescription=\"使用 show + update:show 控制。\"\n\t@close=\"onCloseB\"\n\t@update:show=\"onShowB\"\n></nax-alert>\n\n<nax-button size=\"sm\" label=\"重置关闭示例\" @click=\"resetClose\"></nax-button>\n```\n\n```uts\nconst showCloseA = ref(true)\nconst showCloseB = ref(true)\n\nfunction onCloseA() {\n\tshowCloseA.value = false\n}\n\nfunction onCloseB() {\n\t// 非受控关闭：组件已自行隐藏\n}\n\nfunction onShowB(v: boolean) {\n\tshowCloseB.value = v\n}\n\nfunction resetClose() {\n\tshowCloseA.value = true\n\tshowCloseB.value = true\n}\n```"
  },
  {
    heading: '默认插槽',
    body: "```uvue\n<nax-alert type=\"info\" title=\"自定义描述\">\n\t<text>描述可用默认插槽自定义，例如补充链接说明文案。</text>\n</nax-alert>\n```"
  }
]
