export default [
  {
    heading: '基础（list + current）',
    body: "```uvue\n<nax-steps :list=\"basicList\" :current=\"basicCurrent\"></nax-steps>\n\n<nax-button size=\"sm\" label=\"上一步\" :disabled=\"basicCurrent <= 0\" @click=\"prevBasic\"></nax-button>\n<nax-button size=\"sm\" type=\"primary\" label=\"下一步\" :disabled=\"basicCurrent >= basicList.length - 1\" @click=\"nextBasic\"></nax-button>\n```\n\n```uts\nconst basicList = [\n\t{ name: '下单' },\n\t{ name: '出库' },\n\t{ name: '运输' },\n\t{ name: '签收' }\n]\n\nconst basicCurrent = ref(1)\n\nfunction prevBasic() {\n\tif (basicCurrent.value > 0) {\n\t\tbasicCurrent.value = basicCurrent.value - 1\n\t}\n}\n\nfunction nextBasic() {\n\tif (basicCurrent.value < basicList.length - 1) {\n\t\tbasicCurrent.value = basicCurrent.value + 1\n\t}\n}\n```"
  },
  {
    heading: '点状 mode=dot',
    body: "```uvue\n<nax-steps :list=\"basicList\" :current=\"1\" mode=\"dot\"></nax-steps>\n```\n\n```uts\nconst basicList = [\n\t{ name: '下单' },\n\t{ name: '出库' },\n\t{ name: '运输' },\n\t{ name: '签收' }\n]\n```"
  },
  {
    heading: '语义色 type',
    body: "```uvue\n<nax-steps :list=\"typeList\" :current=\"2\" type=\"info\"></nax-steps>\n<nax-steps :list=\"typeList\" :current=\"2\" type=\"warning\"></nax-steps>\n<nax-steps :list=\"typeList\" :current=\"2\" type=\"error\"></nax-steps>\n```\n\n```uts\nconst typeList = [\n\t{ name: '步骤一' },\n\t{ name: '步骤二' },\n\t{ name: '步骤三' },\n\t{ name: '步骤四' }\n]\n```"
  },
  {
    heading: '尺寸 size',
    body: "```uvue\n<nax-steps :list=\"sizeList\" :current=\"1\" size=\"sm\"></nax-steps>\n<nax-steps :list=\"sizeList\" :current=\"1\" size=\"md\"></nax-steps>\n<nax-steps :list=\"sizeList\" :current=\"1\" size=\"lg\"></nax-steps>\n```\n\n```uts\nconst sizeList = [\n\t{ name: '选购' },\n\t{ name: '确认' },\n\t{ name: '支付' }\n]\n```"
  },
  {
    heading: '纵向 + 描述',
    body: "```uvue\n<nax-steps :list=\"verticalList\" :current=\"verticalCurrent\" direction=\"vertical\"></nax-steps>\n\n<nax-button size=\"sm\" type=\"primary\" label=\"推进进度\" @click=\"nextVertical\"></nax-button>\n```\n\n```uts\nconst verticalList = [\n\t{ name: '买家下单', desc: '2026-07-01 10:00' },\n\t{ name: '商家发货', desc: '2026-07-01 18:20' },\n\t{ name: '运输中', desc: '快递已揽收' },\n\t{ name: '已签收', desc: '待更新' }\n]\n\nconst verticalCurrent = ref(1)\n\nfunction nextVertical() {\n\tif (verticalCurrent.value < verticalList.length - 1) {\n\t\tverticalCurrent.value = verticalCurrent.value + 1\n\t} else {\n\t\tverticalCurrent.value = 0\n\t}\n}\n```"
  },
  {
    heading: '单步 status（含失败）',
    body: "```uvue\n<nax-steps :list=\"statusList\" :current=\"1\"></nax-steps>\n```\n\n```uts\nconst statusList = [\n\t{ name: '填写信息', status: 'finish' },\n\t{ name: '身份核验', status: 'error', desc: '证件模糊，请重传' },\n\t{ name: '人工复核', status: 'wait' },\n\t{ name: '开通完成', status: 'wait' }\n]\n```"
  },
  {
    heading: '组合式 nax-step',
    body: "```uvue\n<nax-steps :current=\"1\" direction=\"vertical\" type=\"success\">\n\t<nax-step title=\"提交资料\" desc=\"已完成\"></nax-step>\n\t<nax-step title=\"人工审核\" desc=\"进行中\"></nax-step>\n\t<nax-step title=\"开通成功\" desc=\"等待中\"></nax-step>\n</nax-steps>\n```"
  },
  {
    heading: '可点击 clickable',
    body: "```uvue\n<nax-steps\n\t:list=\"clickList\"\n\t:current=\"clickCurrent\"\n\tclickable\n\t@click=\"onStepClick\"\n></nax-steps>\n```\n\n```uts\nconst clickList = [\n\t{ name: '基本信息' },\n\t{ name: '上传材料' },\n\t{ name: '确认提交' }\n]\n\nconst clickCurrent = ref(0)\n\n// 点击第 index 步跳转\nfunction onStepClick(index: number) {\n\tclickCurrent.value = index\n}\n```"
  }
]
