export default [
  {
    heading: '单列 + 按钮打开',
    body: "```uvue\n<nax-button label=\"选择水果\" type=\"primary\" @click=\"openSingle\"></nax-button>\n\n<nax-select\n\tv-model:show=\"singleShow\"\n\t:list=\"fruitList\"\n\ttitle=\"选择水果\"\n\t:default-value=\"singleDefault\"\n\t@confirm=\"onSingleConfirm\"\n\t@cancel=\"onCancel\"\n></nax-select>\n```\n\n```uts\nconst singleShow = ref(false)\nconst singleDefault = [1] as number[]\nconst singleText = ref('未选择')\nconst fruitList = [\n\t{ value: 'apple', label: '苹果' },\n\t{ value: 'banana', label: '香蕉' },\n\t{ value: 'orange', label: '橙子' },\n\t{ value: 'grape', label: '葡萄' },\n\t{ value: 'mango', label: '芒果' }\n]\n\nfunction openSingle() {\n\tsingleShow.value = true\n}\n\n// items 为选中项数组，含 value / label 字段\nfunction onSingleConfirm(items: UTSJSONObject[]) {\n\tsingleText.value = '已选择'\n}\n\nfunction onCancel() {\n\t// 点击取消\n}\n```"
  },
  {
    heading: '内置触发条 show-trigger',
    body: "```uvue\n<nax-select\n\tv-model:show=\"triggerShow\"\n\tshow-trigger\n\tplaceholder=\"请选择城市\"\n\t:list=\"cityList\"\n\ttitle=\"城市\"\n\t@confirm=\"onTriggerConfirm\"\n></nax-select>\n```\n\n```uts\nconst triggerShow = ref(false)\nconst triggerText = ref('未选择')\nconst cityList = [\n\t{ value: 'bj', label: '北京' },\n\t{ value: 'sh', label: '上海' },\n\t{ value: 'gz', label: '广州' },\n\t{ value: 'sz', label: '深圳' },\n\t{ value: 'cd', label: '成都' }\n]\n\nfunction onTriggerConfirm(items: UTSJSONObject[]) {\n\ttriggerText.value = '已选择'\n}\n```"
  },
  {
    heading: '多列 multi-column',
    body: "```uvue\n<nax-button label=\"选择时间段\" @click=\"multiShow = true\"></nax-button>\n\n<nax-select\n\tv-model:show=\"multiShow\"\n\tmode=\"multi-column\"\n\t:list=\"multiList\"\n\ttitle=\"上课时间\"\n\t@confirm=\"onMultiConfirm\"\n></nax-select>\n```\n\n```uts\nconst multiShow = ref(false)\nconst multiText = ref('未选择')\nconst multiList = [\n\t[\n\t\t{ value: 'mon', label: '周一' },\n\t\t{ value: 'tue', label: '周二' },\n\t\t{ value: 'wed', label: '周三' },\n\t\t{ value: 'thu', label: '周四' },\n\t\t{ value: 'fri', label: '周五' }\n\t],\n\t[\n\t\t{ value: 'am', label: '上午' },\n\t\t{ value: 'pm', label: '下午' },\n\t\t{ value: 'eve', label: '晚上' }\n\t]\n]\n\nfunction onMultiConfirm(items: UTSJSONObject[]) {\n\tmultiText.value = '已选择'\n}\n```"
  },
  {
    heading: '多列联动 multi-column-auto',
    body: "```uvue\n<nax-select\n\tv-model:show=\"cascadeShow\"\n\tshow-trigger\n\tmode=\"multi-column-auto\"\n\t:list=\"regionList\"\n\ttitle=\"选择地区\"\n\tplaceholder=\"省 / 市 / 区\"\n\t@confirm=\"onCascadeConfirm\"\n\t@change=\"onCascadeChange\"\n></nax-select>\n```\n\n```uts\nconst cascadeShow = ref(false)\nconst cascadeText = ref('未选择')\nconst cascadeLive = ref('-')\n// 联动数据：children 表示下一级\nconst regionList = [\n\t{\n\t\tvalue: 'zhejiang',\n\t\tlabel: '浙江',\n\t\tchildren: [\n\t\t\t{\n\t\t\t\tvalue: 'hangzhou',\n\t\t\t\tlabel: '杭州',\n\t\t\t\tchildren: [\n\t\t\t\t\t{ value: 'xihu', label: '西湖' },\n\t\t\t\t\t{ value: 'yuhang', label: '余杭' }\n\t\t\t\t]\n\t\t\t},\n\t\t\t{\n\t\t\t\tvalue: 'ningbo',\n\t\t\t\tlabel: '宁波',\n\t\t\t\tchildren: [\n\t\t\t\t\t{ value: 'haishu', label: '海曙' },\n\t\t\t\t\t{ value: 'jiangbei', label: '江北' }\n\t\t\t\t]\n\t\t\t}\n\t\t]\n\t},\n\t{\n\t\tvalue: 'jiangsu',\n\t\tlabel: '江苏',\n\t\tchildren: [\n\t\t\t{\n\t\t\t\tvalue: 'nanjing',\n\t\t\t\tlabel: '南京',\n\t\t\t\tchildren: [\n\t\t\t\t\t{ value: 'xuanwu', label: '玄武' },\n\t\t\t\t\t{ value: 'gulou', label: '鼓楼' }\n\t\t\t\t]\n\t\t\t},\n\t\t\t{\n\t\t\t\tvalue: 'suzhou',\n\t\t\t\tlabel: '苏州',\n\t\t\t\tchildren: [\n\t\t\t\t\t{ value: 'gusu', label: '姑苏' },\n\t\t\t\t\t{ value: 'wuzhong', label: '吴中' }\n\t\t\t\t]\n\t\t\t}\n\t\t]\n\t}\n]\n\nfunction onCascadeConfirm(items: UTSJSONObject[]) {\n\tcascadeText.value = '已选择'\n}\n\n// 滚动切换联动项时触发\nfunction onCascadeChange(items: UTSJSONObject[]) {\n\tcascadeLive.value = '滚动中'\n}\n```"
  },
  {
    heading: '自定义字段名',
    body: "```uvue\n<nax-button label=\"打开（id/name）\" size=\"sm\" @click=\"customShow = true\"></nax-button>\n\n<nax-select\n\tv-model:show=\"customShow\"\n\t:list=\"customList\"\n\tvalue-name=\"id\"\n\tlabel-name=\"name\"\n\ttitle=\"自定义字段\"\n\t@confirm=\"onCustomConfirm\"\n></nax-select>\n```\n\n```uts\nconst customShow = ref(false)\nconst customText = ref('未选择')\nconst customList = [\n\t{ id: 10, name: '一号方案' },\n\t{ id: 20, name: '二号方案' },\n\t{ id: 30, name: '三号方案' }\n]\n\nfunction onCustomConfirm(items: UTSJSONObject[]) {\n\tcustomText.value = '已选择'\n}\n```"
  },
  {
    heading: '禁用触发条',
    body: "```uvue\n<nax-select\n\tshow-trigger\n\tdisabled\n\tplaceholder=\"已禁用\"\n\t:list=\"fruitList\"\n></nax-select>\n```\n\n```uts\nconst fruitList = [\n\t{ value: 'apple', label: '苹果' },\n\t{ value: 'banana', label: '香蕉' },\n\t{ value: 'orange', label: '橙子' }\n]\n```"
  }
]
