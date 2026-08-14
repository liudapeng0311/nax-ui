export default [
  {
    heading: '数字键盘',
    body: "```uvue\n<nax-button type=\"primary\" label=\"打开数字键盘\" @click=\"openNumber\"></nax-button>\n<nax-keyboard\n\tv-model:show=\"numberShow\"\n\tmode=\"number\"\n\t@change=\"onChange\"\n\t@backspace=\"onBackspace\"\n\t@confirm=\"onConfirm\"\n\t@cancel=\"onCancel\"\n\t@close=\"onClose\"\n></nax-keyboard>\n```\n\n```uts\nconst numberShow = ref(false)\n\nfunction openNumber() {\n\tnumberShow.value = true\n}\n\nfunction onChange(val : string) {\n\t// 追加字符 val\n}\n\nfunction onBackspace() {\n\t// 删除末位\n}\n\nfunction onConfirm() {\n\t// 确认\n}\n\nfunction onCancel() {\n\t// 取消（未确认关闭）\n}\n\nfunction onClose() {\n\t// 弹层关闭后\n}\n```"
  },
  {
    heading: '无小数点数字键盘',
    body: "```uvue\n<nax-button label=\"打开（无 .）\" @click=\"openNoDot\"></nax-button>\n<nax-keyboard\n\tv-model:show=\"noDotShow\"\n\tmode=\"number\"\n\t:dot-enabled=\"false\"\n\ttips=\"支付密码\"\n\t@change=\"onChange\"\n\t@backspace=\"onBackspace\"\n\t@confirm=\"onConfirm\"\n\t@cancel=\"onCancel\"\n></nax-keyboard>\n```\n\n```uts\nconst noDotShow = ref(false)\n\nfunction openNoDot() {\n\tnoDotShow.value = true\n}\n// onChange / onBackspace 等回调同「数字键盘」示例\n```"
  },
  {
    heading: '身份证键盘',
    body: "```uvue\n<nax-button label=\"打开身份证键盘\" @click=\"openCard\"></nax-button>\n<nax-keyboard\n\tv-model:show=\"cardShow\"\n\tmode=\"card\"\n\t@change=\"onChange\"\n\t@backspace=\"onBackspace\"\n\t@confirm=\"onConfirm\"\n\t@cancel=\"onCancel\"\n></nax-keyboard>\n```\n\n```uts\nconst cardShow = ref(false)\n\nfunction openCard() {\n\tcardShow.value = true\n}\n// 回调同「数字键盘」示例\n```"
  },
  {
    heading: '车牌号键盘',
    body: "```uvue\n<nax-button type=\"warning\" label=\"打开车牌键盘\" @click=\"openCar\"></nax-button>\n<nax-keyboard\n\tv-model:show=\"carShow\"\n\tmode=\"car\"\n\t@change=\"onChange\"\n\t@backspace=\"onBackspace\"\n\t@confirm=\"onConfirm\"\n\t@cancel=\"onCancel\"\n></nax-keyboard>\n```\n\n```uts\nconst carShow = ref(false)\n\nfunction openCar() {\n\tcarShow.value = true\n}\n// 首字选中文省份简称，再点「中/英」切换字母数字；回调同「数字键盘」示例\n```"
  },
  {
    heading: '乱序键盘',
    body: "```uvue\n<nax-button size=\"sm\" label=\"打开乱序数字键盘\" @click=\"openRandom\"></nax-button>\n<nax-keyboard\n\tv-model:show=\"randomShow\"\n\tmode=\"number\"\n\trandom\n\ttips=\"安全输入\"\n\t@change=\"onChange\"\n\t@backspace=\"onBackspace\"\n\t@confirm=\"onConfirm\"\n\t@cancel=\"onCancel\"\n></nax-keyboard>\n```\n\n```uts\nconst randomShow = ref(false)\n\nfunction openRandom() {\n\trandomShow.value = true\n}\n// 每次打开按键随机排列，防止记录轨迹；回调同「数字键盘」示例\n```"
  },
  {
    heading: '无遮罩 / 自定义工具条',
    body: "```uvue\n<nax-button size=\"sm\" label=\"打开（无遮罩）\" @click=\"openNoMask\"></nax-button>\n<nax-keyboard\n\tv-model:show=\"noMaskShow\"\n\tmode=\"number\"\n\t:mask=\"false\"\n\tcancel-text=\"关闭\"\n\tconfirm-text=\"确定\"\n\t@change=\"onChange\"\n\t@backspace=\"onBackspace\"\n\t@confirm=\"onConfirm\"\n\t@cancel=\"onCancel\"\n></nax-keyboard>\n```\n\n```uts\nconst noMaskShow = ref(false)\n\nfunction openNoMask() {\n\tnoMaskShow.value = true\n}\n// 回调同「数字键盘」示例\n```"
  },
  {
    heading: '插槽：上方密码预览',
    body: "```uvue\n<nax-button size=\"sm\" type=\"success\" label=\"打开密码键盘\" @click=\"openSlot\"></nax-button>\n<nax-keyboard\n\tv-model:show=\"slotShow\"\n\tmode=\"number\"\n\t:dot-enabled=\"false\"\n\ttips=\"请输入支付密码\"\n\t@change=\"onSlotChange\"\n\t@backspace=\"onSlotBackspace\"\n\t@confirm=\"onConfirm\"\n\t@cancel=\"onCancel\"\n>\n\t<view class=\"pwd\">\n\t\t<view v-for=\"(item, index) in pwdBoxes\" :key=\"index\" class=\"pwd__box\">\n\t\t\t<text class=\"pwd__dot\">{{ item }}</text>\n\t\t</view>\n\t</view>\n</nax-keyboard>\n```\n\n```uts\nconst slotShow = ref(false)\nconst slotPwd = ref('')\n\nconst pwdBoxes = computed((): string[] => {\n\tconst boxes = [] as string[]\n\tvar i = 0\n\twhile (i < 6) {\n\t\tboxes.push(i < slotPwd.value.length ? '•' : '')\n\t\ti++\n\t}\n\treturn boxes\n})\n\nfunction openSlot() {\n\tslotPwd.value = ''\n\tslotShow.value = true\n}\n\nfunction onSlotChange(val : string) {\n\tif (slotPwd.value.length >= 6) {\n\t\treturn\n\t}\n\tslotPwd.value = slotPwd.value + val\n\tif (slotPwd.value.length >= 6) {\n\t\tslotShow.value = false\n\t}\n}\n\nfunction onSlotBackspace() {\n\tconst s = slotPwd.value\n\tif (s.length == 0) {\n\t\treturn\n\t}\n\tslotPwd.value = s.substring(0, s.length - 1)\n}\n```"
  }
]
