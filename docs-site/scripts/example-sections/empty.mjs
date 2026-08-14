export default [
  {
    heading: '基础',
    body: "```uvue\n<nax-empty></nax-empty>\n```"
  },
  {
    heading: '标题 + 描述',
    body: "```uvue\n<nax-empty icon=\"notes-off\" title=\"暂无订单\" description=\"下单后，订单会出现在这里\"></nax-empty>\n```"
  },
  {
    heading: '图标语义',
    body: "```uvue\n<nax-empty icon=\"file-off\" description=\"暂无相关文件\"></nax-empty>\n<nax-empty icon=\"notes-off\" description=\"暂无列表\"></nax-empty>\n<nax-empty icon=\"database-off\" description=\"暂无数据\"></nax-empty>\n<nax-empty icon=\"message-off\" description=\"消息箱是空的\"></nax-empty>\n```"
  },
  {
    heading: '操作按钮',
    body: "```uvue\n<nax-empty icon=\"notes-off\" title=\"列表为空\" description=\"试着新建一条数据吧\">\n\t<template #action>\n\t\t<nax-button type=\"primary\" size=\"sm\" label=\"新建\" @click=\"onCreate\"></nax-button>\n\t</template>\n</nax-empty>\n```\n\n```uts\nconst lastEvent = ref('无')\n\nfunction onCreate() {\n\tlastEvent.value = '新建'\n}\n```"
  },
  {
    heading: '多个操作',
    body: "action 插槽配合 nax-space 排列多个按钮。\n\n```uvue\n<nax-empty icon=\"search\" description=\"换个关键词试试\">\n\t<template #action>\n\t\t<nax-space size=\"sm\">\n\t\t\t<nax-space-item>\n\t\t\t\t<nax-button size=\"sm\" label=\"清空筛选\" @click=\"onClear\"></nax-button>\n\t\t\t</nax-space-item>\n\t\t\t<nax-space-item>\n\t\t\t\t<nax-button type=\"primary\" size=\"sm\" label=\"重新搜索\" @click=\"onSearch\"></nax-button>\n\t\t\t</nax-space-item>\n\t\t</nax-space>\n\t</template>\n</nax-empty>\n```\n\n```uts\nfunction onClear() {\n\t// 清空筛选\n}\n\nfunction onSearch() {\n\t// 重新搜索\n}\n```"
  },
  {
    heading: '尺寸 image-size',
    body: "```uvue\n<nax-empty image-size=\"sm\" description=\"小号 sm\"></nax-empty>\n<nax-empty image-size=\"md\" description=\"中号 md（默认档）\"></nax-empty>\n```"
  },
  {
    heading: '隐藏插图',
    body: "```uvue\n<nax-empty :show-image=\"false\" description=\"仅文案的空状态\"></nax-empty>\n```"
  },
  {
    heading: '自定义插图槽',
    body: "```uvue\n<nax-empty description=\"使用 #image 自定义\">\n\t<template #image>\n\t\t<nax-icon name=\"star\" size=\"40\" color=\"#f0a020\"></nax-icon>\n\t</template>\n\t<template #action>\n\t\t<nax-button size=\"sm\" type=\"warning\" label=\"去收藏\" @click=\"onStar\"></nax-button>\n\t</template>\n</nax-empty>\n```\n\n```uts\nfunction onStar() {\n\t// 去收藏\n}\n```"
  }
]
