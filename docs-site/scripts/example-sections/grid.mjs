export default [
  {
    heading: '基础 · 3 列 + 边框',
    body: "```uvue\n<nax-grid :col=\"3\" @click=\"onGridClick\">\n\t<nax-grid-item v-for=\"(icon, i) in basicIcons\" :key=\"i\" :index=\"'' + i\">\n\t\t<nax-icon :name=\"icon\" size=\"22\"></nax-icon>\n\t\t<text class=\"grid-text\">{{ basicLabels[i] }}</text>\n\t</nax-grid-item>\n</nax-grid>\n```\n\n```uts\nconst basicIcons = ['home', 'user', 'image', 'search', 'settings', 'star']\nconst basicLabels = ['首页', '我的', '相册', '搜索', '设置', '收藏']\n\nfunction onGridClick(index : string) {\n\t// index：grid-item 的 index\n}\n```"
  },
  {
    heading: '4 列 · 无边框',
    body: "```uvue\n<nax-grid :col=\"4\" :border=\"false\" @click=\"onGridClick\">\n\t<nax-grid-item v-for=\"(icon, i) in basicIcons\" :key=\"i\" :index=\"'noborder-' + i\">\n\t\t<nax-icon :name=\"icon\" size=\"20\"></nax-icon>\n\t\t<text class=\"grid-text\">{{ basicLabels[i] }}</text>\n\t</nax-grid-item>\n</nax-grid>\n```\n\n复用上一节的 basicIcons / basicLabels / onGridClick。"
  },
  {
    heading: '间距 gap + 卡片描边',
    body: "border 开启且 gap 大于 0 时，子项独立描边。\n\n```uvue\n<nax-grid :col=\"3\" gap=\"8\" @click=\"onGridClick\">\n\t<nax-grid-item v-for=\"(icon, i) in basicIcons\" :key=\"i\" :index=\"'gap-' + i\">\n\t\t<nax-icon :name=\"icon\" size=\"22\"></nax-icon>\n\t\t<text class=\"grid-text\">{{ basicLabels[i] }}</text>\n\t</nax-grid-item>\n</nax-grid>\n```\n\n复用上一节的 basicIcons / basicLabels / onGridClick。"
  },
  {
    heading: '对齐 align（仅 2 项）',
    body: "```uvue\n<nax-grid :col=\"3\" align=\"left\" :border=\"false\" gap=\"8\">\n\t<nax-grid-item index=\"a1\">\n\t\t<nax-icon name=\"home\" size=\"22\"></nax-icon>\n\t\t<text class=\"grid-text\">首页</text>\n\t</nax-grid-item>\n\t<nax-grid-item index=\"a2\">\n\t\t<nax-icon name=\"user\" size=\"22\"></nax-icon>\n\t\t<text class=\"grid-text\">我的</text>\n\t</nax-grid-item>\n</nax-grid>\n\n<nax-grid :col=\"3\" align=\"center\" :border=\"false\" gap=\"8\">\n\t<nax-grid-item index=\"b1\">\n\t\t<nax-icon name=\"home\" size=\"22\"></nax-icon>\n\t\t<text class=\"grid-text\">首页</text>\n\t</nax-grid-item>\n\t<nax-grid-item index=\"b2\">\n\t\t<nax-icon name=\"user\" size=\"22\"></nax-icon>\n\t\t<text class=\"grid-text\">我的</text>\n\t</nax-grid-item>\n</nax-grid>\n\n<nax-grid :col=\"3\" align=\"right\" :border=\"false\" gap=\"8\">\n\t<nax-grid-item index=\"c1\">\n\t\t<nax-icon name=\"home\" size=\"22\"></nax-icon>\n\t\t<text class=\"grid-text\">首页</text>\n\t</nax-grid-item>\n\t<nax-grid-item index=\"c2\">\n\t\t<nax-icon name=\"user\" size=\"22\"></nax-icon>\n\t\t<text class=\"grid-text\">我的</text>\n\t</nax-grid-item>\n</nax-grid>\n```"
  },
  {
    heading: '徽标组合',
    body: "徽标只包住图标，文案在下方；容器需 overflow: visible，避免角标被裁切。\n\n```uvue\n<nax-grid :col=\"3\" @click=\"onGridClick\">\n\t<nax-grid-item index=\"msg\">\n\t\t<nax-badge value=\"9\" offset-x=\"-9\" offset-y=\"9\">\n\t\t\t<nax-icon name=\"share\" size=\"22\"></nax-icon>\n\t\t</nax-badge>\n\t\t<text class=\"grid-text\">消息</text>\n\t</nax-grid-item>\n\t<nax-grid-item index=\"dot\">\n\t\t<nax-badge dot offset-x=\"-4\" offset-y=\"4\">\n\t\t\t<nax-icon name=\"heart\" size=\"22\"></nax-icon>\n\t\t</nax-badge>\n\t\t<text class=\"grid-text\">喜欢</text>\n\t</nax-grid-item>\n\t<nax-grid-item index=\"star\">\n\t\t<nax-icon name=\"star\" size=\"22\"></nax-icon>\n\t\t<text class=\"grid-text\">收藏</text>\n\t</nax-grid-item>\n</nax-grid>\n```\n\n复用上一节的 onGridClick。"
  },
  {
    heading: '禁用 · 关闭 hover',
    body: "整表 hover=false；单项 disabled 不触发 click。\n\n```uvue\n<nax-grid :col=\"3\" :hover=\"false\" @click=\"onGridClick\">\n\t<nax-grid-item index=\"ok\">\n\t\t<nax-icon name=\"check\" size=\"22\"></nax-icon>\n\t\t<text class=\"grid-text\">可用</text>\n\t</nax-grid-item>\n\t<nax-grid-item index=\"off\" disabled>\n\t\t<nax-icon name=\"close\" size=\"22\"></nax-icon>\n\t\t<text class=\"grid-text\">禁用</text>\n\t</nax-grid-item>\n\t<nax-grid-item index=\"set\">\n\t\t<nax-icon name=\"settings\" size=\"22\"></nax-icon>\n\t\t<text class=\"grid-text\">设置</text>\n\t</nax-grid-item>\n</nax-grid>\n```\n\n复用上一节的 onGridClick。"
  },
  {
    heading: '自动 index（不传 index）',
    body: "不传 index 时自动按 0, 1, 2... 递增。\n\n```uvue\n<nax-grid :col=\"3\" @click=\"onGridClick\">\n\t<nax-grid-item>\n\t\t<nax-icon name=\"image\" size=\"22\"></nax-icon>\n\t\t<text class=\"grid-text\">自动0</text>\n\t</nax-grid-item>\n\t<nax-grid-item>\n\t\t<nax-icon name=\"search\" size=\"22\"></nax-icon>\n\t\t<text class=\"grid-text\">自动1</text>\n\t</nax-grid-item>\n\t<nax-grid-item>\n\t\t<nax-icon name=\"edit\" size=\"22\"></nax-icon>\n\t\t<text class=\"grid-text\">自动2</text>\n\t</nax-grid-item>\n</nax-grid>\n```\n\n复用上一节的 onGridClick。"
  }
]
