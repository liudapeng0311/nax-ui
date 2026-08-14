export default [
  {
    heading: '基础',
    body: "```uvue\n<nax-search\n\tv-model=\"basic\"\n\t@search=\"onSearch\"\n\t@custom=\"onCustom\"\n\t@change=\"onChange\"\n></nax-search>\n```\n\n```uts\nconst basic = ref('')\n\n// 点击键盘搜索按钮\nfunction onSearch(val: string) {\n\t// 处理搜索\n}\n\n// 点击右侧搜索按钮\nfunction onCustom(val: string) {\n\t// 处理自定义操作\n}\n\n// 输入内容变化\nfunction onChange() {\n\t// 处理变化\n}\n```"
  },
  {
    heading: '形状 shape',
    body: "```uvue\n<nax-search v-model=\"shapeRound\" shape=\"round\" placeholder=\"round 胶囊\"></nax-search>\n<nax-search v-model=\"shapeSquare\" shape=\"square\" placeholder=\"square 方角\"></nax-search>\n```\n\n```uts\nconst shapeRound = ref('')\nconst shapeSquare = ref('')\n```"
  },
  {
    heading: '尺寸 size',
    body: "```uvue\n<nax-search v-model=\"sizeSm\" size=\"sm\" placeholder=\"sm\"></nax-search>\n<nax-search v-model=\"sizeMd\" size=\"md\" placeholder=\"md\"></nax-search>\n<nax-search v-model=\"sizeLg\" size=\"lg\" placeholder=\"lg\"></nax-search>\n```\n\n```uts\nconst sizeSm = ref('')\nconst sizeMd = ref('')\nconst sizeLg = ref('')\n```"
  },
  {
    heading: '无右侧按钮',
    body: "```uvue\n<nax-search v-model=\"noAction\" :show-action=\"false\" placeholder=\"show-action=false\"></nax-search>\n```\n\n```uts\nconst noAction = ref('')\n```"
  },
  {
    heading: 'animation（聚焦才显示操作）',
    body: "```uvue\n<nax-search\n\tv-model=\"anim\"\n\tanimation\n\taction-text=\"取消\"\n\tplaceholder=\"聚焦后出现取消\"\n\t@custom=\"onCustom\"\n></nax-search>\n```\n\n```uts\nconst anim = ref('')\n\nfunction onCustom(val: string) {\n\t// 点击取消\n}\n```"
  },
  {
    heading: 'label + 边框色',
    body: "```uvue\n<nax-search\n\tv-model=\"withLabel\"\n\tlabel=\"地址\"\n\tborder-color=\"#18a058\"\n\tplaceholder=\"请输入地址\"\n></nax-search>\n```\n\n```uts\nconst withLabel = ref('')\n```"
  },
  {
    heading: '对齐 input-align',
    body: "```uvue\n<nax-search v-model=\"alignCenter\" input-align=\"center\" :show-action=\"false\" placeholder=\"居中\"></nax-search>\n<nax-search v-model=\"alignRight\" input-align=\"right\" :show-action=\"false\" placeholder=\"右对齐\"></nax-search>\n```\n\n```uts\nconst alignCenter = ref('')\nconst alignRight = ref('')\n```"
  },
  {
    heading: '自定义背景 / 图标色',
    body: "```uvue\n<nax-search\n\tv-model=\"customBg\"\n\tbackground=\"#e8f5ee\"\n\tsearch-icon-color=\"#18a058\"\n\taction-color=\"#18a058\"\n\tplaceholder=\"浅绿背景\"\n></nax-search>\n```\n\n```uts\nconst customBg = ref('')\n```"
  },
  {
    heading: '禁用（点击跳转场景）',
    body: "```uvue\n<nax-search\n\tv-model=\"disabledVal\"\n\tdisabled\n\tplaceholder=\"点击整条触发 click\"\n\t@click=\"onDisabledClick\"\n></nax-search>\n```\n\n```uts\nconst disabledVal = ref('')\n\n// 整条可点击，适合跳转搜索页等场景\nfunction onDisabledClick() {\n\tuni.showToast({\n\t\ttitle: '跳转搜索页',\n\t\ticon: 'none'\n\t})\n}\n```"
  },
  {
    heading: '清除 clearable',
    body: "```uvue\n<nax-search\n\tv-model=\"clearable\"\n\t:show-action=\"false\"\n\t@clear=\"onClear\"\n></nax-search>\n```\n\n```uts\nconst clearable = ref('可清除示例')\n\nfunction onClear() {\n\t// 点击清除按钮\n}\n```"
  }
]
