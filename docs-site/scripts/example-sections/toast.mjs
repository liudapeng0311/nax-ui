export default [
  {
    heading: '基础（纯文案）',
    body: "```uvue\n<!-- 宿主挂载：生产建议根布局挂一次；演示页本地挂载保证可展示 -->\n<nax-toast></nax-toast>\n```\n\n```uts\nimport {\n\tnaxToast,\n\thideNaxToast,\n\tnaxToastSuccess,\n\tnaxToastError,\n\tnaxToastWarning,\n\tnaxToastInfo,\n\tnaxToastLoading\n} from '@/uni_modules/nax-toast/index.uts'\n\nnaxToast('你好，这是一条轻提示')\n```"
  },
  {
    heading: '类型 type',
    body: "```uvue\n<nax-button type=\"success\" label=\"success\" @click=\"onSuccess\"></nax-button>\n<nax-button type=\"error\" label=\"error\" @click=\"onError\"></nax-button>\n<nax-button type=\"warning\" label=\"warning\" @click=\"onWarning\"></nax-button>\n<nax-button type=\"info\" label=\"info\" @click=\"onInfo\"></nax-button>\n```\n\n```uts\nfunction onSuccess() {\n\tnaxToast({\n\t\ttitle: '保存成功',\n\t\ttype: 'success'\n\t} as UTSJSONObject)\n}\n\nfunction onError() {\n\tnaxToast({\n\t\ttitle: '提交失败',\n\t\ttype: 'error'\n\t} as UTSJSONObject)\n}\n\nfunction onWarning() {\n\tnaxToast({\n\t\ttitle: '请注意风险',\n\t\ttype: 'warning'\n\t} as UTSJSONObject)\n}\n\nfunction onInfo() {\n\tnaxToast({\n\t\ttitle: '已为你更新内容',\n\t\ttype: 'info'\n\t} as UTSJSONObject)\n}\n```"
  },
  {
    heading: '位置 position',
    body: "```uvue\n<nax-button label=\"top\" @click=\"onPos('top')\"></nax-button>\n<nax-button label=\"center\" @click=\"onPos('center')\"></nax-button>\n<nax-button label=\"bottom\" @click=\"onPos('bottom')\"></nax-button>\n```\n\n```uts\nfunction onPos(pos : string) {\n\tnaxToast({\n\t\ttitle: '位置：' + pos,\n\t\ttype: 'text',\n\t\tposition: pos\n\t} as UTSJSONObject)\n}\n```"
  },
  {
    heading: 'Loading + 手动关闭',
    body: "```uvue\n<nax-button type=\"primary\" label=\"显示 loading\" @click=\"onLoading\"></nax-button>\n<nax-button label=\"hideNaxToast()\" @click=\"onHide\"></nax-button>\n```\n\n```uts\nfunction onLoading() {\n\tnaxToastLoading('提交中…', true)\n\t// loading 默认 duration=0 且带遮罩，需手动关闭或稍后再调 hide\n\tsetTimeout(() => {\n\t\thideNaxToast()\n\t\tnaxToastSuccess('提交完成')\n\t}, 2500)\n}\n\nfunction onHide() {\n\thideNaxToast()\n}\n```"
  },
  {
    heading: '自定义图标 / 时长',
    body: "```uvue\n<nax-button label=\"自定义 icon\" @click=\"onCustomIcon\"></nax-button>\n<nax-button label=\"4 秒后关闭\" @click=\"onLong\"></nax-button>\n```\n\n```uts\nfunction onCustomIcon() {\n\tnaxToast({\n\t\ttitle: '收藏成功',\n\t\ttype: 'text',\n\t\ticon: 'star',\n\t\tshowIcon: true\n\t} as UTSJSONObject)\n}\n\nfunction onLong() {\n\tnaxToast({\n\t\ttitle: '这条会停留 4 秒',\n\t\ttype: 'info',\n\t\tduration: 4000\n\t} as UTSJSONObject)\n}\n```"
  },
  {
    heading: '自定义背景 bg（请用 hex）',
    body: "```uvue\n<nax-button label=\"品牌绿\" @click=\"onCustomBg('#18a058')\"></nax-button>\n```\n\n```uts\n// 鸿蒙/App 请优先 hex（如 #18a058）；rgba 在端上可能失效\nfunction onCustomBg(color : string) {\n\tnaxToast({\n\t\ttitle: '自定义背景色',\n\t\ttype: 'text',\n\t\tbg: color,\n\t\tcolor: '#ffffff',\n\t\tshowIcon: false\n\t} as UTSJSONObject)\n}\n```"
  },
  {
    heading: '快捷方法',
    body: "```uvue\n<nax-button type=\"success\" label=\"naxToastSuccess\" @click=\"onQuickSuccess\"></nax-button>\n<nax-button type=\"error\" label=\"naxToastError\" @click=\"onQuickError\"></nax-button>\n```\n\n```uts\nfunction onQuickSuccess() {\n\tnaxToastSuccess('快捷成功')\n}\n\nfunction onQuickError() {\n\tnaxToastError('快捷错误')\n}\n\n// 同系列：naxToastWarning('注意') / naxToastInfo('提示') / naxToastLoading('加载中', true)\n```"
  }
]
