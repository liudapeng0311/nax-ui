export default [
  {
    heading: '基础 / mode',
    body: "```uvue\n<nax-image :src=\"okSrc\" width=\"100\" height=\"100\" mode=\"aspectFill\"></nax-image>\n<nax-image :src=\"okSrc\" width=\"100\" height=\"100\" mode=\"aspectFit\"></nax-image>\n<nax-image :src=\"okSrc\" width=\"100\" height=\"100\" mode=\"scaleToFill\"></nax-image>\n```\n\n```uts\nconst okSrc = ref('https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg')\n```"
  },
  {
    heading: '形状 shape',
    body: "```uvue\n<nax-image :src=\"okSrc\" width=\"88\" height=\"88\" shape=\"square\"></nax-image>\n<nax-image :src=\"okSrc\" width=\"88\" height=\"88\" shape=\"round\"></nax-image>\n<nax-image :src=\"okSrc\" width=\"88\" height=\"88\" shape=\"circle\"></nax-image>\n```\n\n```uts\nconst okSrc = ref('https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg')\n```"
  },
  {
    heading: '加载中 / 失败',
    body: "```uvue\n<nax-image force-loading width=\"120\" height=\"120\" loading-text=\"加载中\"></nax-image>\n<nax-image :src=\"badSrc\" width=\"120\" height=\"120\" :timeout=\"8000\" error-text=\"加载失败\" @error=\"onError\"></nax-image>\n<nax-image src=\"\" width=\"120\" height=\"120\" error-text=\"无图片\"></nax-image>\n```\n\n```uts\nconst badSrc = ref('https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/nax-ui-not-found.png')\n\nfunction onError() {\n\t// error: 加载失败\n}\n```"
  },
  {
    heading: '自定义插槽',
    body: "```uvue\n<nax-image :src=\"badSrc\" :timeout=\"8000\" width=\"100%\" height=\"140\" shape=\"round\">\n\t<template #error>\n\t\t<view class=\"slot-box\">\n\t\t\t<text class=\"slot-box__text\">自定义失败插槽</text>\n\t\t</view>\n\t</template>\n</nax-image>\n```\n\n```uts\nconst badSrc = ref('https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/nax-ui-not-found.png')\n```"
  },
  {
    heading: '宽图（块级）',
    body: "```uvue\n<nax-image :src=\"okSrc\" width=\"100%\" height=\"160\" shape=\"round\" mode=\"aspectFill\" @click=\"onClickImage\"></nax-image>\n```\n\n```uts\nconst okSrc = ref('https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg')\n\nfunction onClickImage() {\n\t// click: 宽图\n}\n```"
  }
]
