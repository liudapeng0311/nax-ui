export default [
  {
    heading: '基础用法',
    body: "```uvue\n<nax-slider v-model=\"basic\" @change=\"onBasicChange\"></nax-slider>\n```\n\n```uts\nconst basic = ref(30)\n\nfunction onBasicChange(v: number) {\n\t// 值变化回调\n}\n```"
  },
  {
    heading: '尺寸 size',
    body: "```uvue\n<nax-slider v-model=\"sizeSm\" size=\"sm\"></nax-slider>\n<nax-slider v-model=\"sizeMd\" size=\"md\"></nax-slider>\n<nax-slider v-model=\"sizeLg\" size=\"lg\"></nax-slider>\n```\n\n```uts\nconst sizeSm = ref(20)\nconst sizeMd = ref(40)\nconst sizeLg = ref(60)\n```"
  },
  {
    heading: '范围 min / max',
    body: "```uvue\n<nax-slider v-model=\"rangeVal\" :min=\"30\" :max=\"80\" show-edge-value></nax-slider>\n```\n\n```uts\nconst rangeVal = ref(50)\n```"
  },
  {
    heading: '步长 step',
    body: "```uvue\n<nax-slider v-model=\"stepVal\" :step=\"10\"></nax-slider>\n```\n\n```uts\nconst stepVal = ref(30)\n```"
  },
  {
    heading: '小数步长',
    body: "```uvue\n<nax-slider v-model=\"stepFloat\" :step=\"0.1\" :start=\"0\" :end=\"1\"></nax-slider>\n```\n\n```uts\nconst stepFloat = ref(0.3)\n```"
  },
  {
    heading: '自定义颜色',
    body: "```uvue\n<nax-slider\n\tv-model=\"colorVal\"\n\tactive-color=\"#2080f0\"\n\tinactive-color=\"#d6e4ff\"\n\tblock-color=\"#ffffff\"\n></nax-slider>\n```\n\n```uts\nconst colorVal = ref(45)\n```"
  },
  {
    heading: '显示起止值 showEdgeValue',
    body: "```uvue\n<nax-slider\n\tv-model=\"edgeVal\"\n\t:start=\"0\"\n\t:end=\"100\"\n\tshow-edge-value\n\tedge-value-position=\"bottom\"\n></nax-slider>\n```\n\n```uts\nconst edgeVal = ref(55)\n```"
  },
  {
    heading: '自定义滑块 useSlot',
    body: "```uvue\n<nax-slider v-model=\"slotVal\" use-slot :block-width=\"28\">\n\t<view class=\"custom-thumb\">\n\t\t<text class=\"custom-thumb__text\">{{ slotVal }}</text>\n\t</view>\n</nax-slider>\n```\n\n```uts\nconst slotVal = ref(35)\n```"
  },
  {
    heading: '禁用 disabled',
    body: "```uvue\n<nax-slider v-model=\"disabledVal\" disabled></nax-slider>\n```\n\n```uts\nconst disabledVal = ref(40)\n```"
  },
  {
    heading: '事件 start / moving / end',
    body: "```uvue\n<nax-slider\n\tv-model=\"eventVal\"\n\t@start=\"onStart\"\n\t@moving=\"onMoving\"\n\t@end=\"onEnd\"\n\t@change=\"onEventChange\"\n></nax-slider>\n```\n\n```uts\nconst eventVal = ref(25)\n\nfunction onStart() {\n\t// 开始拖动\n}\n\nfunction onMoving() {\n\t// 拖动中\n}\n\nfunction onEnd() {\n\t// 结束拖动\n}\n\nfunction onEventChange(v: number) {\n\t// 值变化\n}\n```"
  }
]
