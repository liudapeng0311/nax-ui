export default [
  {
    heading: '声明式 · 基础确认',
    body: "```uvue\n<nax-button type=\"primary\" label=\"打开确认框\" @click=\"basicShow = true\"></nax-button>\n\n<nax-dialog\n\tv-model:show=\"basicShow\"\n\ttitle=\"提示\"\n\tcontent=\"确定执行该操作吗？\"\n\t@confirm=\"onConfirm\"\n\t@cancel=\"onCancel\"\n></nax-dialog>\n```\n\n```uts\nconst basicShow = ref(false)\n\nfunction onConfirm() {\n\t// 点击确定\n}\n\nfunction onCancel() {\n\t// 点击取消\n}\n```"
  },
  {
    heading: '声明式 · 告警（仅确定）',
    body: "show-cancel 隐藏取消按钮，confirm-text 自定义确定文案。\n\n```uvue\n<nax-button label=\"打开告警\" @click=\"alertShow = true\"></nax-button>\n\n<nax-dialog\n\tv-model:show=\"alertShow\"\n\ttitle=\"提示\"\n\tcontent=\"操作已完成\"\n\t:show-cancel=\"false\"\n\tconfirm-text=\"我知道了\"\n\t@confirm=\"onConfirm\"\n></nax-dialog>\n```\n\n```uts\nconst alertShow = ref(false)\n\nfunction onConfirm() {\n\t// 点击确定\n}\n```"
  },
  {
    heading: '声明式 · 危险操作',
    body: "confirm-type 指定确定按钮语义色。\n\n```uvue\n<nax-button type=\"error\" label=\"删除确认\" @click=\"dangerShow = true\"></nax-button>\n\n<nax-dialog\n\tv-model:show=\"dangerShow\"\n\ttitle=\"删除确认\"\n\tcontent=\"删除后不可恢复，是否继续？\"\n\tconfirm-text=\"删除\"\n\tconfirm-type=\"error\"\n\t@confirm=\"onConfirm\"\n\t@cancel=\"onCancel\"\n></nax-dialog>\n```\n\n```uts\nconst dangerShow = ref(false)\n\nfunction onConfirm() {\n\t// 点击确定\n}\n\nfunction onCancel() {\n\t// 点击取消\n}\n```"
  },
  {
    heading: '声明式 · 自定义内容插槽',
    body: "默认插槽自定义内容区。\n\n```uvue\n<nax-button type=\"info\" label=\"自定义内容\" @click=\"customShow = true\"></nax-button>\n\n<nax-dialog\n\tv-model:show=\"customShow\"\n\ttitle=\"用户协议\"\n\tconfirm-text=\"同意\"\n\tcancel-text=\"拒绝\"\n\t@confirm=\"onConfirm\"\n\t@cancel=\"onCancel\"\n>\n\t<text class=\"dialog-content\" :lines=\"6\">请阅读并同意服务条款与隐私政策。本示例用默认插槽自定义内容区。</text>\n</nax-dialog>\n```\n\n```uts\nconst customShow = ref(false)\n\nfunction onConfirm() {\n\t// 点击确定\n}\n\nfunction onCancel() {\n\t// 点击取消\n}\n```"
  },
  {
    heading: '声明式 · 异步关闭',
    body: "async-close 开启后点确定不会自动关闭，需业务在请求结束后手动关 show。\n\n```uvue\n<nax-button label=\"asyncClose\" @click=\"asyncShow = true\"></nax-button>\n<nax-button size=\"sm\" label=\"手动关闭\" @click=\"asyncShow = false\"></nax-button>\n\n<nax-dialog\n\tv-model:show=\"asyncShow\"\n\ttitle=\"提交\"\n\tcontent=\"确认提交当前内容？\"\n\t:async-close=\"true\"\n\t@confirm=\"onAsyncConfirm\"\n\t@cancel=\"onCancel\"\n></nax-dialog>\n```\n\n```uts\nconst asyncShow = ref(false)\n\n// 模拟异步请求：结束后手动关闭\nfunction onAsyncConfirm() {\n\tsetTimeout(() => {\n\t\tasyncShow.value = false\n\t}, 1500)\n}\n\nfunction onCancel() {\n\t// 点击取消\n}\n```"
  },
  {
    heading: '命令式 · API',
    body: "宿主与 toast 相同，全局挂一次即可；未挂载时回退系统 showModal。\n\n```uvue\n<nax-button size=\"sm\" type=\"primary\" label=\"naxDialogConfirm\" @click=\"onApiConfirm\"></nax-button>\n<nax-button size=\"sm\" label=\"naxDialogAlert\" @click=\"onApiAlert\"></nax-button>\n<nax-button size=\"sm\" type=\"error\" label=\"危险确认\" @click=\"onApiDanger\"></nax-button>\n<nax-button size=\"sm\" label=\"Promise\" @click=\"onApiPromise\"></nax-button>\n\n<!-- 命令式宿主：须放在声明式实例之后 -->\n<nax-dialog></nax-dialog>\n```\n\n```uts\nimport {\n\tnaxDialog as showNaxDialog,\n\tnaxDialogAlert,\n\tnaxDialogConfirm\n} from '@/uni_modules/nax-dialog/index.uts'\n\nfunction onApiConfirm() {\n\tnaxDialogConfirm({\n\t\ttitle: '确认',\n\t\tcontent: '使用命令式打开确认框'\n\t} as UTSJSONObject).then((res: UTSJSONObject) => {\n\t\tif (res.getBoolean('confirm') == true) {\n\t\t\t// 已确定\n\t\t}\n\t})\n}\n\nfunction onApiAlert() {\n\tnaxDialogAlert({\n\t\ttitle: '提示',\n\t\tcontent: '这是一条告警信息'\n\t} as UTSJSONObject).then((res: UTSJSONObject) => {\n\t\tconst action = res.getString('action')\n\t\t// action：'confirm' | 'cancel'\n\t})\n}\n\nfunction onApiDanger() {\n\tnaxDialogConfirm({\n\t\ttitle: '删除',\n\t\tcontent: '删除后不可恢复',\n\t\tconfirmText: '删除',\n\t\tconfirmType: 'error'\n\t} as UTSJSONObject).then((res: UTSJSONObject) => {\n\t\tif (res.getBoolean('confirm') == true) {\n\t\t\t// 已删除\n\t\t}\n\t})\n}\n\nfunction onApiPromise() {\n\tshowNaxDialog({\n\t\ttitle: 'Promise',\n\t\tcontent: '等待你的选择',\n\t\tshowCancel: true\n\t} as UTSJSONObject).then((res: UTSJSONObject) => {\n\t\tconst action = res.getString('action')\n\t\t// action：'confirm' | 'cancel'\n\t})\n}\n```"
  }
]
