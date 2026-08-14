export default [
  {
    heading: '基础',
    body: "```uvue\n<nax-card title=\"基础卡片\" extra=\"更多\">\n\t<text>用卡片承载一段说明、列表摘要或操作入口。</text>\n</nax-card>\n```"
  },
  {
    heading: '仅正文',
    body: "```uvue\n<nax-card>\n\t<text>没有标题时，正文自动吃掉上下内边距，适合纯内容块。</text>\n</nax-card>\n```"
  },
  {
    heading: '尺寸 size',
    body: "```uvue\n<nax-card size=\"sm\" title=\"小号 sm\" extra=\"sm\">\n\t<text>更紧凑的内边距</text>\n</nax-card>\n\n<nax-card size=\"md\" title=\"中号 md\" extra=\"md\">\n\t<text>默认档</text>\n</nax-card>\n\n<nax-card size=\"lg\" title=\"大号 lg\" extra=\"lg\">\n\t<text>更宽松</text>\n</nax-card>\n```"
  },
  {
    heading: '分割线 segmented',
    body: "```uvue\n<nax-card title=\"订单摘要\" extra=\"详情\" segmented :show-footer=\"true\">\n\t<text>商品合计 ¥128.00</text>\n\t<text>含运费 ¥8.00</text>\n\t<template #footer>\n\t\t<nax-button type=\"primary\" size=\"sm\" label=\"去支付\" @click=\"onPay\"></nax-button>\n\t</template>\n</nax-card>\n```\n\n```uts\nfunction onPay() {\n\tuni.showToast({ title: '去支付', icon: 'none' })\n}\n```"
  },
  {
    heading: '封面 cover',
    body: "```uvue\n<nax-card title=\"风景推荐\" extra=\"2.3k\" :show-cover=\"true\" :show-footer=\"true\" segmented>\n\t<template #cover>\n\t\t<view class=\"cover\"><text>Cover</text></view>\n\t</template>\n\t<text>周末短途：湖边步道与日落观景点。</text>\n\t<template #footer>\n\t\t<nax-space size=\"sm\">\n\t\t\t<nax-space-item>\n\t\t\t\t<nax-button size=\"sm\" label=\"收藏\" @click=\"onStar\"></nax-button>\n\t\t\t</nax-space-item>\n\t\t\t<nax-space-item>\n\t\t\t\t<nax-button type=\"primary\" size=\"sm\" label=\"查看\" @click=\"onView\"></nax-button>\n\t\t\t</nax-space-item>\n\t\t</nax-space>\n\t</template>\n</nax-card>\n```\n\n```uts\nfunction onStar() {\n\tuni.showToast({ title: '已收藏', icon: 'none' })\n}\n\nfunction onView() {\n\tuni.showToast({ title: '查看', icon: 'none' })\n}\n```"
  },
  {
    heading: '可点击 hoverable',
    body: "```uvue\n<nax-card title=\"设置项入口\" hoverable @click=\"onCardClick\">\n\t<template #extra>\n\t\t<nax-icon name=\"chevron-right\" size=\"18\" color=\"var(--nax-color-text-secondary, #767c82)\"></nax-icon>\n\t</template>\n\t<text>开启 hoverable 后有按压反馈</text>\n</nax-card>\n```\n\n```uts\nfunction onCardClick() {\n\tuni.showToast({ title: '卡片点击', icon: 'none' })\n}\n```"
  },
  {
    heading: '无边框',
    body: "```uvue\n<nax-card title=\"无边框\" :bordered=\"false\">\n\t<text>bordered=false，适合嵌在已有面板里</text>\n</nax-card>\n```"
  }
]
