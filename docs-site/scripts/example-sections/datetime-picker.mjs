export default [
  {
    heading: '日期时间 datetime',
    body: "通过按钮控制弹层，v-model:show 控制显示，v-model 绑定时间戳。\n\n```uvue\n<nax-button type=\"primary\" label=\"选择日期时间\" @click=\"dtShow = true\"></nax-button>\n\n<nax-datetime-picker\n\tv-model:show=\"dtShow\"\n\tv-model=\"dtValue\"\n\tmode=\"datetime\"\n\ttitle=\"选择日期时间\"\n\t@confirm=\"onDtConfirm\"\n\t@cancel=\"onCancel('datetime')\"\n></nax-datetime-picker>\n```\n\n```uts\nconst dtShow = ref(false)\nconst dtValue = ref(0)\n\nfunction onDtConfirm(e : UTSJSONObject) {\n\tconst s = e.getString('formatted')\n\t// s：如 2026-08-13 10:30\n}\n\nfunction onCancel(name : string) {\n\t// 取消回调\n}\n```"
  },
  {
    heading: '内置触发条 + 日期 date',
    body: "show-trigger 内置触发条，点击展开弹层。有选中值时下箭头左侧显示清除按钮（clearable 默认开启）。\n\n```uvue\n<nax-datetime-picker\n\tv-model:show=\"dateShow\"\n\tv-model=\"dateValue\"\n\tmode=\"date\"\n\tshow-trigger\n\ttitle=\"选择日期\"\n\tplaceholder=\"请选择日期\"\n\t@confirm=\"onDateConfirm\"\n\t@clear=\"onDateClear\"\n></nax-datetime-picker>\n```\n\n```uts\nconst dateShow = ref(false)\nconst dateValue = ref(0)\n\nfunction onDateConfirm(e : UTSJSONObject) {\n\tconst s = e.getString('formatted')\n\t// s：如 2026-08-13\n}\n\nfunction onDateClear() {\n\t// 触发条清除，v-model 已回写 0\n}\n```"
  },
  {
    heading: '时间 time + 秒',
    body: "show-second 显示秒级选择。\n\n```uvue\n<nax-button label=\"选择时间\" @click=\"timeShow = true\"></nax-button>\n\n<nax-datetime-picker\n\tv-model:show=\"timeShow\"\n\tv-model=\"timeValue\"\n\tmode=\"time\"\n\tshow-second\n\ttitle=\"选择时间\"\n\t@confirm=\"onTimeConfirm\"\n></nax-datetime-picker>\n```\n\n```uts\nconst timeShow = ref(false)\nconst timeValue = ref(0)\n\nfunction onTimeConfirm(e : UTSJSONObject) {\n\tconst s = e.getString('formatted')\n\t// s：如 10:30:45\n}\n```"
  },
  {
    heading: '年月 year-month',
    body: "```uvue\n<nax-datetime-picker\n\tv-model:show=\"ymShow\"\n\tv-model=\"ymValue\"\n\tmode=\"year-month\"\n\tshow-trigger\n\ttitle=\"选择年月\"\n\tplaceholder=\"请选择年月\"\n\t@confirm=\"onYmConfirm\"\n></nax-datetime-picker>\n```\n\n```uts\nconst ymShow = ref(false)\nconst ymValue = ref(0)\n\nfunction onYmConfirm(e : UTSJSONObject) {\n\tconst s = e.getString('formatted')\n\t// s：如 2026-08\n}\n```"
  },
  {
    heading: '年 year / 月日 month-day',
    body: "```uvue\n<nax-button size=\"sm\" label=\"选择年\" @click=\"yearShow = true\"></nax-button>\n<nax-button size=\"sm\" label=\"选择月日\" @click=\"mdShow = true\"></nax-button>\n\n<nax-datetime-picker v-model:show=\"yearShow\" v-model=\"yearValue\" mode=\"year\" title=\"选择年份\" @confirm=\"onYearConfirm\"></nax-datetime-picker>\n<nax-datetime-picker v-model:show=\"mdShow\" v-model=\"mdValue\" mode=\"month-day\" title=\"选择月日\" @confirm=\"onMdConfirm\"></nax-datetime-picker>\n```\n\n```uts\nconst yearShow = ref(false)\nconst yearValue = ref(0)\nconst mdShow = ref(false)\nconst mdValue = ref(0)\n\nfunction onYearConfirm(e : UTSJSONObject) {\n\tconst s = e.getString('formatted')\n\t// s：如 2026\n}\n\nfunction onMdConfirm(e : UTSJSONObject) {\n\tconst s = e.getString('formatted')\n\t// s：如 08-13\n}\n```"
  },
  {
    heading: '范围限制 minDate / maxDate',
    body: "```uvue\n<nax-button label=\"2020-01-01 ~ 2026-12-31\" @click=\"rangeShow = true\"></nax-button>\n\n<nax-datetime-picker\n\tv-model:show=\"rangeShow\"\n\tv-model=\"rangeValue\"\n\tmode=\"date\"\n\tmin-date=\"2020-01-01\"\n\tmax-date=\"2026-12-31\"\n\ttitle=\"限定范围\"\n\t@confirm=\"onRangeConfirm\"\n></nax-datetime-picker>\n```\n\n```uts\nconst rangeShow = ref(false)\nconst rangeValue = ref(0)\n\nfunction onRangeConfirm(e : UTSJSONObject) {\n\tconst s = e.getString('formatted')\n\t// s：范围外的日期不可选\n}\n```"
  },
  {
    heading: '自定义 format / 无单位',
    body: "show-unit 控制是否显示年月日等单位文字，format 自定义结果格式。\n\n```uvue\n<nax-datetime-picker\n\tv-model:show=\"fmtShow\"\n\tv-model=\"fmtValue\"\n\tmode=\"datetime\"\n\tshow-trigger\n\t:show-unit=\"false\"\n\tformat=\"YYYY/MM/DD HH:mm\"\n\tplaceholder=\"自定义格式\"\n\ttitle=\"自定义\"\n\t@confirm=\"onFmtConfirm\"\n></nax-datetime-picker>\n```\n\n```uts\nconst fmtShow = ref(false)\nconst fmtValue = ref(0)\n\nfunction onFmtConfirm(e : UTSJSONObject) {\n\tconst s = e.getString('formatted')\n\t// s：如 2026/08/13 10:30\n}\n```"
  },
  {
    heading: '禁用触发条',
    body: "```uvue\n<nax-datetime-picker\n\tshow-trigger\n\tdisabled\n\tplaceholder=\"已禁用\"\n\tmode=\"date\"\n></nax-datetime-picker>\n```"
  }
]
