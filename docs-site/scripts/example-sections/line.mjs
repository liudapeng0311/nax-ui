export default [
  {
    heading: '基础',
    body: "```uvue\n<nax-line></nax-line>\n```\n\n默认 hairline + 100% 宽 + divider 色。"
  },
  {
    heading: '长度 length',
    body: "```uvue\n<nax-line length=\"100%\" space=\"8\"></nax-line>\n<nax-line length=\"200\" space=\"8\"></nax-line>\n<nax-line length=\"50%\" space=\"8\"></nax-line>\n```\n\n纯数字按 px；可写 % / px / rpx。"
  },
  {
    heading: '粗细 size',
    body: "```uvue\n<nax-line size=\"hairline\"></nax-line>\n<nax-line size=\"sm\"></nax-line>\n<nax-line size=\"md\"></nax-line>\n<nax-line size=\"lg\"></nax-line>\n```"
  },
  {
    heading: '虚线 dashed',
    body: "```uvue\n<nax-line dashed space=\"8\"></nax-line>\n<nax-line dashed size=\"md\" type=\"primary\" space=\"8\"></nax-line>\n<nax-line dashed size=\"lg\" type=\"warning\" space=\"8\"></nax-line>\n```"
  },
  {
    heading: '类型 type',
    body: "```uvue\n<nax-line type=\"default\" space=\"8\"></nax-line>\n<nax-line type=\"primary\" space=\"8\"></nax-line>\n<nax-line type=\"info\" space=\"8\"></nax-line>\n<nax-line type=\"success\" space=\"8\"></nax-line>\n<nax-line type=\"warning\" space=\"8\"></nax-line>\n<nax-line type=\"error\" space=\"8\"></nax-line>\n```"
  },
  {
    heading: '内缩 inset',
    body: "```uvue\n<view class=\"card\">\n\t<text class=\"card__text\">列表项 A</text>\n\t<nax-line inset=\"16\"></nax-line>\n\t<text class=\"card__text\">列表项 B</text>\n\t<nax-line inset=\"16\"></nax-line>\n</view>\n```\n\n左右各内缩 16px，适合 cell 分割。"
  },
  {
    heading: '竖线 vertical',
    body: "```uvue\n<nax-line direction=\"vertical\" length=\"24\" space=\"12\"></nax-line>\n<nax-line direction=\"vertical\" length=\"24\" space=\"12\" type=\"primary\" size=\"md\"></nax-line>\n<nax-line direction=\"vertical\" length=\"100%\" space=\"12\"></nax-line>\n```\n\n竖线 length=100% 时父级需要有高度。"
  },
  {
    heading: '自定义 color',
    body: "```uvue\n<nax-line color=\"#8a2be2\" size=\"md\" space=\"8\"></nax-line>\n<nax-line color=\"#8a2be2\" dashed size=\"md\" space=\"8\"></nax-line>\n```"
  }
]
