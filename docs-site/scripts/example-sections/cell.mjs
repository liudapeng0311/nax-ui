export default [
  {
    heading: '基础',
    body: "```uvue\n<nax-cell-group>\n\t<nax-cell title=\"单元格\" value=\"内容\"></nax-cell>\n\t<nax-cell title=\"单元格\" label=\"描述信息\" value=\"内容\"></nax-cell>\n\t<nax-cell title=\"单元格\" value=\"详情\" is-link @click=\"onCellClick('基础链接')\"></nax-cell>\n</nax-cell-group>\n```\n\n```uts\nfunction onCellClick(name: string) {\n\tuni.showToast({ title: name, icon: 'none' })\n}\n```"
  },
  {
    heading: '分组标题',
    body: "```uvue\n<nax-cell-group title=\"个人信息\">\n\t<nax-cell title=\"昵称\" value=\"Nax\" is-link @click=\"onCellClick('昵称')\"></nax-cell>\n\t<nax-cell title=\"手机号\" value=\"138****0000\"></nax-cell>\n\t<nax-cell title=\"个性签名\" label=\"一句话介绍自己\" value=\"写点什么\" is-link></nax-cell>\n</nax-cell-group>\n\n<nax-cell-group title=\"其他设置\">\n\t<nax-cell title=\"消息通知\" is-link></nax-cell>\n\t<nax-cell title=\"关于我们\" is-link></nax-cell>\n</nax-cell-group>\n```"
  },
  {
    heading: '图标',
    body: "```uvue\n<nax-cell-group>\n\t<nax-cell icon=\"user\" title=\"个人中心\" is-link @click=\"onCellClick('个人中心')\"></nax-cell>\n\t<nax-cell icon=\"settings\" title=\"系统设置\" value=\"通用\" is-link></nax-cell>\n\t<nax-cell icon=\"search\" title=\"搜索\" label=\"全局搜索入口\" is-link></nax-cell>\n</nax-cell-group>\n```"
  },
  {
    heading: 'inset 圆角卡片',
    body: "```uvue\n<nax-cell-group title=\"账户\" inset>\n\t<nax-cell title=\"账号安全\" is-link></nax-cell>\n\t<nax-cell title=\"支付设置\" is-link></nax-cell>\n\t<nax-cell title=\"隐私\" value=\"已保护\" is-link></nax-cell>\n</nax-cell-group>\n```"
  },
  {
    heading: 'insetBorder 外框（inset 时）',
    body: "```uvue\n<nax-cell-group title=\"all 四边\" inset inset-border=\"all\">\n\t<nax-cell title=\"默认外框\" value=\"all\" is-link></nax-cell>\n</nax-cell-group>\n\n<nax-cell-group title=\"none 无外框\" inset inset-border=\"none\">\n\t<nax-cell title=\"仅圆角白底\" value=\"none\" is-link></nax-cell>\n</nax-cell-group>\n\n<nax-cell-group title=\"horizontal 上下\" inset inset-border=\"horizontal\">\n\t<nax-cell title=\"无左右边框\" value=\"horizontal\" is-link></nax-cell>\n</nax-cell-group>\n\n<nax-cell-group title=\"vertical 左右\" inset inset-border=\"vertical\">\n\t<nax-cell title=\"无上下边框\" value=\"vertical\" is-link></nax-cell>\n</nax-cell-group>\n```"
  },
  {
    heading: '尺寸 size',
    body: "```uvue\n<nax-cell-group>\n\t<nax-cell size=\"sm\" title=\"小号 sm\" value=\"紧凑\" is-link></nax-cell>\n\t<nax-cell size=\"md\" title=\"中号 md\" value=\"默认\" is-link></nax-cell>\n\t<nax-cell size=\"lg\" title=\"大号 lg\" value=\"宽松\" is-link></nax-cell>\n</nax-cell-group>\n```"
  },
  {
    heading: '状态',
    body: "```uvue\n<nax-cell-group>\n\t<nax-cell title=\"必填项\" required value=\"请填写\" is-link></nax-cell>\n\t<nax-cell title=\"禁用\" value=\"不可点\" disabled is-link></nax-cell>\n\t<nax-cell title=\"无箭头可点\" clickable @click=\"onCellClick('可点')\"></nax-cell>\n\t<nax-cell title=\"无分割线\" value=\"border=false\" :border=\"false\"></nax-cell>\n</nax-cell-group>\n```"
  },
  {
    heading: '右侧插槽（开关）',
    body: "```uvue\n<nax-cell-group>\n\t<nax-cell title=\"消息推送\" center>\n\t\t<template #right>\n\t\t\t<nax-switch v-model=\"pushOn\"></nax-switch>\n\t\t</template>\n\t</nax-cell>\n\t<nax-cell title=\"深色模式\" label=\"仅演示绑定\" center>\n\t\t<template #right>\n\t\t\t<nax-switch v-model=\"darkSwitch\"></nax-switch>\n\t\t</template>\n\t</nax-cell>\n</nax-cell-group>\n```\n\n```uts\nconst pushOn = ref(true)\nconst darkSwitch = ref(false)\n```"
  },
  {
    heading: '自定义颜色',
    body: "```uvue\n<nax-cell-group>\n\t<nax-cell title=\"标题色\" title-color=\"#18a058\" value=\"主色\" value-color=\"#18a058\" is-link></nax-cell>\n\t<nax-cell icon=\"user\" icon-color=\"#2080f0\" title=\"图标色\" value=\"info\" is-link></nax-cell>\n</nax-cell-group>\n```"
  }
]
