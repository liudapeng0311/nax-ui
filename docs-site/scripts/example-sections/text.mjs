export default [
  {
    heading: '基础用法',
    body: "```uvue\n<nax-text text=\"我用十年青春,赴你最后之约\"></nax-text>\n<nax-text text=\"带图标的文本\" prefix-icon=\"star\" type=\"primary\"></nax-text>\n<nax-text text=\"后缀图标\" suffix-icon=\"arrow-right\" type=\"secondary\"></nax-text>\n```"
  },
  {
    heading: '主题色',
    body: "```uvue\n<nax-text type=\"default\" text=\"default 主文案\"></nax-text>\n<nax-text type=\"primary\" text=\"primary 主题\"></nax-text>\n<nax-text type=\"info\" text=\"info 信息\"></nax-text>\n<nax-text type=\"success\" text=\"success 成功\"></nax-text>\n<nax-text type=\"warning\" text=\"warning 警告\"></nax-text>\n<nax-text type=\"error\" text=\"error 错误\"></nax-text>\n<nax-text type=\"secondary\" text=\"secondary 次文案\"></nax-text>\n<nax-text type=\"placeholder\" text=\"placeholder 占位\"></nax-text>\n```"
  },
  {
    heading: '文字尺寸',
    body: "```uvue\n<nax-text size=\"sm\" text=\"sm 14px\"></nax-text>\n<nax-text size=\"md\" text=\"md 16px（默认）\"></nax-text>\n<nax-text size=\"lg\" text=\"lg 18px\"></nax-text>\n<nax-text size=\"xl\" text=\"xl 20px\"></nax-text>\n<nax-text size=\"20\" text=\"数字 20px\"></nax-text>\n```"
  },
  {
    heading: '字重与装饰',
    body: "```uvue\n<nax-text bold text=\"加粗 bold\"></nax-text>\n<nax-text decoration=\"underline\" text=\"下划线 underline\" type=\"info\"></nax-text>\n<nax-text decoration=\"line-through\" text=\"删除线 line-through\" type=\"secondary\"></nax-text>\n```"
  },
  {
    heading: '文本省略',
    body: "```uvue\n<nax-text\n\t:lines=\"1\"\n\tblock\n\ttext=\"单行省略：这是一段很长很长的文本内容，超出一行后会显示省略号，方便列表场景使用。\"\n></nax-text>\n<nax-text\n\t:lines=\"2\"\n\tblock\n\ttype=\"secondary\"\n\ttext=\"两行省略：这是一段很长很长的文本内容，用于演示多行省略效果。超出两行后会显示省略号，方便卡片摘要等场景使用。再追加一些文字以确保足够长。\"\n></nax-text>\n```"
  },
  {
    heading: '内容格式化',
    body: "```uvue\n<nax-text mode=\"price\" text=\"128.5\" type=\"error\" bold></nax-text>\n<nax-text mode=\"phone\" text=\"13800138000\" type=\"info\"></nax-text>\n<nax-text mode=\"phone\" format=\"encrypt\" text=\"13800138000\"></nax-text>\n<nax-text mode=\"name\" format=\"encrypt\" text=\"张三丰\"></nax-text>\n<nax-text mode=\"date\" text=\"1710000000\"></nax-text>\n<nax-text mode=\"date\" format=\"yyyy-mm-dd HH:MM\" text=\"1710000000000\" type=\"secondary\"></nax-text>\n<nax-text mode=\"link\" text=\"nax-ui文档\" href=\"https://gitee.com/liusixsix/nax-ui\" @click=\"onLinkClick\"></nax-text>\n```\n\n```uts\nfunction onLinkClick() {\n\tuni.showToast({\n\t\ttitle: '已触发 click',\n\t\ticon: 'none'\n\t})\n}\n```"
  },
  {
    heading: '拨号操作',
    body: "```uvue\n<nax-text\n\tmode=\"phone\"\n\tcall\n\ttype=\"primary\"\n\ttext=\"10086\"\n\tprefix-icon=\"share\"\n\t@click=\"onCallClick\"\n></nax-text>\n```\n\n```uts\nfunction onCallClick() {\n\t// 点击尝试拨打电话（真机有效）\n}\n```"
  },
  {
    heading: '块级对齐',
    body: "```uvue\n<nax-text block align=\"left\" text=\"左对齐 left\"></nax-text>\n<nax-text block align=\"center\" text=\"居中 center\" type=\"primary\"></nax-text>\n<nax-text block align=\"right\" text=\"右对齐 right\" type=\"secondary\"></nax-text>\n```"
  },
  {
    heading: '文本选择',
    body: "```uvue\n<nax-text selectable text=\"长按可选中复制这段文字\" type=\"info\"></nax-text>\n```"
  },
  {
    heading: '自定义颜色',
    body: "```uvue\n<nax-text color=\"#8a2be2\" text=\"自定义紫色 #8a2be2\"></nax-text>\n```"
  }
]
