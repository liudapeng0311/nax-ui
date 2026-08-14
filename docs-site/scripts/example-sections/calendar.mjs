export default [
  {
    heading: '单选（弹层）',
    body: "```uvue\n<nax-button type=\"primary\" label=\"选择日期\" @click=\"openDate\"></nax-button>\n\n<nax-calendar\n\tv-model:show=\"dateShow\"\n\tmode=\"date\"\n\ttool-tip=\"选择日期\"\n\t@change=\"onDateChange\"\n\t@close=\"onClose('date')\"\n></nax-calendar>\n```\n\n```uts\nconst dateShow = ref(false)\n\nfunction openDate() {\n\tdateShow.value = true\n}\n\n// e.result 形如 '2026-01-01'，e.week 为星期文案\nfunction onDateChange(e: UTSJSONObject) {\n\tconst result = e.getString('result')\n\tconst week = e.getString('week')\n\tconsole.log((result != null ? result : '') + ' ' + (week != null ? week : ''))\n}\n```"
  },
  {
    heading: '范围选择',
    body: "```uvue\n<nax-button label=\"选择区间\" @click=\"openRange\"></nax-button>\n\n<nax-calendar\n\tv-model:show=\"rangeShow\"\n\tmode=\"range\"\n\ttool-tip=\"选择日期区间\"\n\t@change=\"onRangeChange\"\n></nax-calendar>\n```\n\n```uts\nconst rangeShow = ref(false)\n\nfunction openRange() {\n\trangeShow.value = true\n}\n\n// e.startDate / e.endDate 为 'YYYY-MM-DD'\nfunction onRangeChange(e: UTSJSONObject) {\n\tconst s = e.getString('startDate')\n\tconst end = e.getString('endDate')\n\tconsole.log((s != null ? s : '') + ' ~ ' + (end != null ? end : ''))\n}\n```"
  },
  {
    heading: '默认选中 default-date',
    body: "```uvue\n<nax-button size=\"sm\" label=\"打开看默认选中\" @click=\"customShow = true\"></nax-button>\n\n<nax-calendar\n\tv-model:show=\"customShow\"\n\t:default-date=\"customDefault\"\n\tconfirm-text=\"完成\"\n\ttool-tip=\"默认已选中\"\n\t@change=\"onCustomChange\"\n></nax-calendar>\n```\n\n```uts\nconst customShow = ref(false)\nconst now = new Date()\nconst tenDaysAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)\n\nfunction pad2(n: number): string {\n\treturn n < 10 ? '0' + n.toString() : n.toString()\n}\n\n// 'YYYY-MM-DD'，这里预设 10 天前\nconst customDefault = tenDaysAgo.getFullYear().toString() + '-' + pad2(tenDaysAgo.getMonth() + 1) + '-' + pad2(tenDaysAgo.getDate())\n\nfunction onCustomChange(e: UTSJSONObject) {\n\tconst result = e.getString('result')\n\tconsole.log(result != null ? result : '')\n}\n```"
  },
  {
    heading: '只读',
    body: "```uvue\n<nax-button size=\"sm\" label=\"打开只读\" @click=\"readonlyShow = true\"></nax-button>\n\n<nax-calendar\n\tv-model:show=\"readonlyShow\"\n\treadonly\n\t:default-date=\"customDefault\"\n\ttool-tip=\"只读预览\"\n></nax-calendar>\n```\n\n```uts\nconst readonlyShow = ref(false)\nconst customDefault = '2026-08-03' // 'YYYY-MM-DD'\n```"
  },
  {
    heading: '节假日 / 加班 / 节日',
    body: "```uvue\n<nax-button size=\"sm\" label=\"打开\" @click=\"holidayShow = true\"></nax-button>\n\n<nax-calendar\n\tv-model:show=\"holidayShow\"\n\t:holidays=\"holidayList\"\n\t:workdays=\"workdayList\"\n\t:festivals=\"festivalMap\"\n\tshow-festival\n\t:max-date=\"holidayMaxDate\"\n\t@change=\"onHolidayChange\"\n></nax-calendar>\n```\n\n```uts\nconst holidayShow = ref(false)\nconst now = new Date()\nconst y = now.getFullYear().toString()\nconst m = pad2(now.getMonth() + 1)\n\nfunction pad2(n: number): string {\n\treturn n < 10 ? '0' + n.toString() : n.toString()\n}\n\nconst holidayList = [y + '-' + m + '-01', y + '-' + m + '-02'] as string[]\nconst workdayList = [y + '-' + m + '-06'] as string[]\nconst festivalMap = {\n\t'2026-01-01': '元旦'\n} as UTSJSONObject\nconst holidayMaxDate = now.getFullYear().toString() + '-12-31'\n\nfunction onHolidayChange(e: UTSJSONObject) {\n\tconst result = e.getString('result')\n\tconsole.log(result != null ? result : '')\n}\n```"
  },
  {
    heading: '打卡签到',
    body: "```uvue\n<nax-button size=\"sm\" type=\"warning\" label=\"打开打卡日历\" @click=\"checkinShow = true\"></nax-button>\n\n<nax-calendar\n\tv-model:show=\"checkinShow\"\n\tcheckin-mode\n\t:checked-dates=\"checkedList\"\n\t:today-checked=\"todayChecked\"\n\t:max-date=\"holidayMaxDate\"\n\t@change=\"onCheckinChange\"\n></nax-calendar>\n```\n\n```uts\nconst checkinShow = ref(false)\nconst todayChecked = ref(false)\nconst holidayMaxDate = '2026-12-31'\n// change 后整表替换才能驱动日历重绘\nconst checkedList = ref(['2026-08-01', '2026-08-03'] as string[])\n\n// 已打卡再点取消，否则加入\nfunction onCheckinChange(e: UTSJSONObject) {\n\tconst result = e.getString('result')\n\tif (result == null || result.length == 0) {\n\t\treturn\n\t}\n\tconst date = result\n\tconst prev = checkedList.value\n\tconst next = [] as string[]\n\tlet cancelled = false\n\tlet i = 0\n\twhile (i < prev.length) {\n\t\tif (prev[i] == date) {\n\t\t\tcancelled = true\n\t\t} else {\n\t\t\tnext.push(prev[i])\n\t\t}\n\t\ti++\n\t}\n\tif (!cancelled) {\n\t\tnext.push(date)\n\t}\n\tcheckedList.value = next\n}\n```"
  },
  {
    heading: '页面内联模式 is-page',
    body: "```uvue\n<nax-calendar\n\tis-page\n\tmode=\"date\"\n\t:default-date=\"pageDefault\"\n\t:max-date=\"holidayMaxDate\"\n\t@change=\"onPageChange\"\n></nax-calendar>\n```\n\n```uts\nconst pageDefault = '2026-08-13' // 今天，'YYYY-MM-DD'\nconst holidayMaxDate = '2026-12-31'\n\nfunction onPageChange(e: UTSJSONObject) {\n\tconst result = e.getString('result')\n\tconsole.log(result != null ? result : '')\n}\n```"
  }
]
