export default [
  {
    heading: '基础（点指示器）',
    body: "```uvue\n<nax-swiper\n\t:list=\"slides\"\n\theight=\"160\"\n\t@change=\"onChange\"\n\t@click=\"onClickItem\"\n></nax-swiper>\n```\n\n```uts\n// list 支持 string url 或 { src|image|url, text, bg|background } 对象\nconst slides = ref([\n\t{\n\t\tbg: '#18a058',\n\t\ttext: '色块 1 · primary'\n\t} as UTSJSONObject,\n\t{\n\t\tbg: '#2080f0',\n\t\ttext: '色块 2 · info'\n\t} as UTSJSONObject,\n\t{\n\t\tbg: '#f0a020',\n\t\ttext: '色块 3 · warning'\n\t} as UTSJSONObject\n] as UTSJSONObject[])\n\nfunction onChange(cur: number) {\n\t// 当前页索引\n}\n\nfunction onClickItem(index: number) {\n\t// 点击第 index 页\n}\n```"
  },
  {
    heading: '自动播放 + 循环',
    body: "```uvue\n<nax-swiper\n\t:list=\"slides\"\n\theight=\"160\"\n\tautoplay\n\t:interval=\"2500\"\n\tcircular\n></nax-swiper>\n```\n\n```uts\nconst slides = ref([\n\t{\n\t\tbg: '#18a058',\n\t\ttext: '色块 1 · primary'\n\t} as UTSJSONObject,\n\t{\n\t\tbg: '#2080f0',\n\t\ttext: '色块 2 · info'\n\t} as UTSJSONObject,\n\t{\n\t\tbg: '#f0a020',\n\t\ttext: '色块 3 · warning'\n\t} as UTSJSONObject\n] as UTSJSONObject[])\n```"
  },
  {
    heading: '数字指示器',
    body: "```uvue\n<nax-swiper\n\t:list=\"slides\"\n\theight=\"160\"\n\tindicator\n\tindicator-type=\"number\"\n\tindicator-position=\"bottom-right\"\n></nax-swiper>\n```\n\n```uts\nconst slides = ref([\n\t{\n\t\tbg: '#18a058',\n\t\ttext: '色块 1 · primary'\n\t} as UTSJSONObject,\n\t{\n\t\tbg: '#2080f0',\n\t\ttext: '色块 2 · info'\n\t} as UTSJSONObject,\n\t{\n\t\tbg: '#f0a020',\n\t\ttext: '色块 3 · warning'\n\t} as UTSJSONObject\n] as UTSJSONObject[])\n```"
  },
  {
    heading: '受控 current',
    body: "```uvue\n<nax-swiper\n\t:list=\"slides\"\n\theight=\"160\"\n\tv-model:current=\"current\"\n\t:indicator=\"true\"\n></nax-swiper>\n\n<nax-button size=\"sm\" label=\"上一页\" @click=\"prev\"></nax-button>\n<nax-button size=\"sm\" type=\"primary\" label=\"下一页\" @click=\"next\"></nax-button>\n```\n\n```uts\nconst slides = ref([\n\t{\n\t\tbg: '#18a058',\n\t\ttext: '色块 1 · primary'\n\t} as UTSJSONObject,\n\t{\n\t\tbg: '#2080f0',\n\t\ttext: '色块 2 · info'\n\t} as UTSJSONObject,\n\t{\n\t\tbg: '#f0a020',\n\t\ttext: '色块 3 · warning'\n\t} as UTSJSONObject\n] as UTSJSONObject[])\n\nconst current = ref(0)\n\nfunction prev() {\n\tif (current.value <= 0) {\n\t\tcurrent.value = slides.value.length - 1\n\t\treturn\n\t}\n\tcurrent.value = current.value - 1\n}\n\nfunction next() {\n\tif (current.value >= slides.value.length - 1) {\n\t\tcurrent.value = 0\n\t\treturn\n\t}\n\tcurrent.value = current.value + 1\n}\n```"
  }
]
