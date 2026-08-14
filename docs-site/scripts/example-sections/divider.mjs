export default [
  {
    heading: '基础',
    body: "```uvue\n<nax-divider></nax-divider>\n```"
  },
  {
    heading: '带文字',
    body: "```uvue\n<nax-divider text=\"或者\" space=\"8\"></nax-divider>\n<nax-divider text=\"更多内容\" space=\"8\"></nax-divider>\n```"
  },
  {
    heading: '位置 content-position',
    body: "```uvue\n<nax-divider text=\"居中\" content-position=\"center\" space=\"8\"></nax-divider>\n<nax-divider text=\"左侧\" content-position=\"left\" space=\"8\"></nax-divider>\n<nax-divider text=\"右侧\" content-position=\"right\" space=\"8\"></nax-divider>\n```"
  },
  {
    heading: '虚线 / 类型',
    body: "```uvue\n<nax-divider dashed text=\"虚线\" space=\"8\"></nax-divider>\n<nax-divider text=\"主色\" type=\"primary\" space=\"8\"></nax-divider>\n<nax-divider text=\"警告\" type=\"warning\" space=\"8\"></nax-divider>\n<nax-divider text=\"错误\" type=\"error\" space=\"8\"></nax-divider>\n```"
  },
  {
    heading: '粗细 size',
    body: "```uvue\n<nax-divider text=\"hairline\" size=\"hairline\" space=\"8\"></nax-divider>\n<nax-divider text=\"sm\" size=\"sm\" space=\"8\"></nax-divider>\n<nax-divider text=\"md\" size=\"md\" space=\"8\"></nax-divider>\n```"
  },
  {
    heading: '竖向',
    body: "父容器固定高度 + align-items:stretch，竖线自动拉满。\n\n```uvue\n<view class=\"v-box\">\n\t<text>左</text>\n\t<nax-divider direction=\"vertical\" space=\"12\"></nax-divider>\n\t<text>中</text>\n\t<nax-divider direction=\"vertical\" space=\"12\" type=\"primary\" size=\"sm\"></nax-divider>\n\t<text>右</text>\n</view>\n```\n\n与文字并排时可用 length 指定高度（如 16）。\n\n```uvue\n<view class=\"v-inline\">\n\t<text>左</text>\n\t<nax-divider direction=\"vertical\" length=\"16\" space=\"10\"></nax-divider>\n\t<text>中</text>\n\t<nax-divider direction=\"vertical\" length=\"16\" space=\"10\" type=\"warning\"></nax-divider>\n\t<text>右</text>\n</view>\n```"
  }
]
