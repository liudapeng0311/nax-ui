export default [
  {
    heading: '基础横向',
    body: "```uvue\n<nax-space size=\"md\">\n\t<nax-space-item>\n\t\t<nax-button type=\"primary\" size=\"sm\" label=\"主要\"></nax-button>\n\t</nax-space-item>\n\t<nax-space-item>\n\t\t<nax-button size=\"sm\" label=\"默认\"></nax-button>\n\t</nax-space-item>\n\t<nax-space-item>\n\t\t<nax-button variant=\"tertiary\" size=\"sm\" label=\"次要\"></nax-button>\n\t</nax-space-item>\n</nax-space>\n```"
  },
  {
    heading: '间距 size',
    body: "```uvue\n<!-- xs (4) -->\n<nax-space size=\"xs\">\n\t<nax-space-item><nax-tag label=\"A\"></nax-tag></nax-space-item>\n\t<nax-space-item><nax-tag label=\"B\"></nax-tag></nax-space-item>\n\t<nax-space-item><nax-tag label=\"C\"></nax-tag></nax-space-item>\n</nax-space>\n\n<!-- sm (8) -->\n<nax-space size=\"sm\">\n\t<nax-space-item><nax-tag label=\"A\"></nax-tag></nax-space-item>\n\t<nax-space-item><nax-tag label=\"B\"></nax-tag></nax-space-item>\n\t<nax-space-item><nax-tag label=\"C\"></nax-tag></nax-space-item>\n</nax-space>\n\n<!-- md (12) -->\n<nax-space size=\"md\">\n\t<nax-space-item><nax-tag label=\"A\"></nax-tag></nax-space-item>\n\t<nax-space-item><nax-tag label=\"B\"></nax-tag></nax-space-item>\n\t<nax-space-item><nax-tag label=\"C\"></nax-tag></nax-space-item>\n</nax-space>\n\n<!-- lg (16) -->\n<nax-space size=\"lg\">\n\t<nax-space-item><nax-tag label=\"A\"></nax-tag></nax-space-item>\n\t<nax-space-item><nax-tag label=\"B\"></nax-tag></nax-space-item>\n\t<nax-space-item><nax-tag label=\"C\"></nax-tag></nax-space-item>\n</nax-space>\n\n<!-- 自定义 24 -->\n<nax-space size=\"24\">\n\t<nax-space-item><nax-tag label=\"A\"></nax-tag></nax-space-item>\n\t<nax-space-item><nax-tag label=\"B\"></nax-tag></nax-space-item>\n\t<nax-space-item><nax-tag label=\"C\"></nax-tag></nax-space-item>\n</nax-space>\n```"
  },
  {
    heading: '纵向 vertical',
    body: "```uvue\n<nax-space direction=\"vertical\" size=\"sm\">\n\t<nax-space-item>\n\t\t<nax-button size=\"sm\" label=\"第一行\"></nax-button>\n\t</nax-space-item>\n\t<nax-space-item>\n\t\t<nax-button size=\"sm\" type=\"primary\" label=\"第二行\"></nax-button>\n\t</nax-space-item>\n\t<nax-space-item>\n\t\t<nax-button size=\"sm\" type=\"success\" label=\"第三行\"></nax-button>\n\t</nax-space-item>\n</nax-space>\n```"
  },
  {
    heading: '换行 wrap',
    body: "```uvue\n<nax-space size=\"sm\" wrap>\n\t<nax-space-item><nax-tag type=\"primary\" label=\"标签1\"></nax-tag></nax-space-item>\n\t<nax-space-item><nax-tag type=\"info\" label=\"标签2\"></nax-tag></nax-space-item>\n\t<nax-space-item><nax-tag type=\"success\" label=\"标签3\"></nax-tag></nax-space-item>\n\t<nax-space-item><nax-tag type=\"warning\" label=\"标签4\"></nax-tag></nax-space-item>\n\t<nax-space-item><nax-tag type=\"error\" label=\"标签5\"></nax-tag></nax-space-item>\n\t<nax-space-item><nax-tag label=\"标签6\"></nax-tag></nax-space-item>\n\t<nax-space-item><nax-tag label=\"标签7\"></nax-tag></nax-space-item>\n\t<nax-space-item><nax-tag label=\"标签8\"></nax-tag></nax-space-item>\n</nax-space>\n```"
  },
  {
    heading: '对齐 align',
    body: "```uvue\n<!-- start -->\n<nax-space align=\"start\" size=\"md\">\n\t<nax-space-item><view class=\"box box--sm\"></view></nax-space-item>\n\t<nax-space-item><view class=\"box box--lg\"></view></nax-space-item>\n\t<nax-space-item><view class=\"box box--md\"></view></nax-space-item>\n</nax-space>\n\n<!-- center（默认） -->\n<nax-space align=\"center\" size=\"md\">\n\t<nax-space-item><view class=\"box box--sm\"></view></nax-space-item>\n\t<nax-space-item><view class=\"box box--lg\"></view></nax-space-item>\n\t<nax-space-item><view class=\"box box--md\"></view></nax-space-item>\n</nax-space>\n\n<!-- end -->\n<nax-space align=\"end\" size=\"md\">\n\t<nax-space-item><view class=\"box box--sm\"></view></nax-space-item>\n\t<nax-space-item><view class=\"box box--lg\"></view></nax-space-item>\n\t<nax-space-item><view class=\"box box--md\"></view></nax-space-item>\n</nax-space>\n```\n\nbox--sm / box--md / box--lg 为三种不同尺寸的方块，样式由页面定义。"
  },
  {
    heading: '主轴 justify',
    body: "```uvue\n<!-- between -->\n<nax-space justify=\"between\" size=\"0\" fill>\n\t<nax-space-item><nax-tag label=\"左\"></nax-tag></nax-space-item>\n\t<nax-space-item><nax-tag label=\"中\"></nax-tag></nax-space-item>\n\t<nax-space-item><nax-tag label=\"右\"></nax-tag></nax-space-item>\n</nax-space>\n\n<!-- center -->\n<nax-space justify=\"center\" size=\"sm\" fill>\n\t<nax-space-item><nax-tag label=\"A\"></nax-tag></nax-space-item>\n\t<nax-space-item><nax-tag label=\"B\"></nax-tag></nax-space-item>\n</nax-space>\n```"
  },
  {
    heading: 'fill 纵向撑满',
    body: "```uvue\n<nax-space direction=\"vertical\" size=\"sm\" fill>\n\t<nax-space-item>\n\t\t<nax-button block type=\"primary\" label=\"通栏按钮 A\"></nax-button>\n\t</nax-space-item>\n\t<nax-space-item>\n\t\t<nax-button block label=\"通栏按钮 B\"></nax-button>\n\t</nax-space-item>\n</nax-space>\n```"
  }
]
