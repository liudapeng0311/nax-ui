export default [
  {
    heading: '尺寸 size',
    body: "```uvue\n<nax-icon name=\"search\" size=\"sm\"></nax-icon>\n<nax-icon name=\"search\" size=\"md\"></nax-icon>\n<nax-icon name=\"search\" size=\"lg\"></nax-icon>\n<nax-icon name=\"search\" size=\"28\"></nax-icon>\n```"
  },
  {
    heading: '颜色 color',
    body: "```uvue\n<nax-icon name=\"heart\" color=\"#d03050\"></nax-icon>\n<nax-icon name=\"star\" color=\"#f0a020\"></nax-icon>\n<nax-icon name=\"success\" color=\"#18a058\"></nax-icon>\n<nax-icon name=\"info\" color=\"#2080f0\"></nax-icon>\n```"
  },
  {
    heading: '状态',
    body: "```uvue\n<nax-icon name=\"settings\" @click=\"onTap\"></nax-icon>\n<nax-icon name=\"settings\" disabled @click=\"onTap\"></nax-icon>\n```\n\n```uts\nfunction onTap() {\n\t// 处理点击；disabled 时不会触发\n}\n```"
  },
  {
    heading: '配合 nax-button',
    body: "```uvue\n<nax-button type=\"primary\" label=\"搜索\">\n\t<template #icon>\n\t\t<nax-icon name=\"search\" size=\"sm\"></nax-icon>\n\t</template>\n</nax-button>\n<nax-button type=\"error\" variant=\"outline\" label=\"删除\">\n\t<template #icon>\n\t\t<nax-icon name=\"delete\" size=\"sm\" color=\"#d03050\"></nax-icon>\n\t</template>\n</nax-button>\n```"
  }
]
