export default [
  {
    heading: '尺寸 size',
    body: "```uvue\n<nax-switch v-model=\"sizeSm\" size=\"sm\"></nax-switch>\n<nax-switch v-model=\"sizeMd\" size=\"md\"></nax-switch>\n<nax-switch v-model=\"sizeLg\" size=\"lg\"></nax-switch>\n```\n\n```uts\nconst sizeSm = ref(true)\nconst sizeMd = ref(true)\nconst sizeLg = ref(true)\n```"
  },
  {
    heading: '禁用 disabled',
    body: "```uvue\n<nax-switch v-model=\"disabledOff\" disabled></nax-switch>\n<nax-switch v-model=\"disabledOn\" disabled></nax-switch>\n```\n\n```uts\nconst disabledOff = ref(false)\nconst disabledOn = ref(true)\n```"
  },
  {
    heading: '加载 loading',
    body: "```uvue\n<nax-switch v-model=\"loadingOff\" loading></nax-switch>\n<nax-switch v-model=\"loadingOn\" loading></nax-switch>\n```\n\n```uts\nconst loadingOff = ref(false)\nconst loadingOn = ref(true)\n```\n\n模拟异步提交：switch 先切换到目标值，这里立刻回滚并进入 loading，成功后再写入。\n\n```uvue\n<nax-switch v-model=\"asyncVal\" :loading=\"asyncBusy\" @change=\"onAsyncChange\"></nax-switch>\n```\n\n```uts\nconst asyncVal = ref(false)\nconst asyncBusy = ref(false)\n\nfunction onAsyncChange(v : boolean) {\n\tif (asyncBusy.value) {\n\t\treturn\n\t}\n\tconst target = v\n\t// 回滚到切换前，进入 loading\n\tasyncVal.value = !target\n\tasyncBusy.value = true\n\tsetTimeout(() => {\n\t\tasyncVal.value = target\n\t\tasyncBusy.value = false\n\t}, 1200)\n}\n```"
  },
  {
    heading: '自定义颜色',
    body: "```uvue\n<nax-switch v-model=\"colorA\" active-color=\"#2080f0\"></nax-switch>\n<nax-switch v-model=\"colorB\" active-color=\"#d03050\" inactive-color=\"#f3f3f5\"></nax-switch>\n```\n\n```uts\nconst colorA = ref(true)\nconst colorB = ref(false)\n```"
  },
  {
    heading: '切换震动 vibrateShort',
    body: "```uvue\n<nax-switch v-model=\"vibrateVal\" vibrate-short></nax-switch>\n```\n\n```uts\nconst vibrateVal = ref(false)\n```"
  }
]
