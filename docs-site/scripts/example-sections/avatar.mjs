export default [
  {
    heading: '基础图片',
    body: "```uvue\n<nax-avatar :src=\"okSrc\"></nax-avatar>\n<nax-avatar :src=\"okSrc\" bordered></nax-avatar>\n<nax-avatar :src=\"okSrc\" @click=\"onAvatarClick\"></nax-avatar>\n```\n\n```uts\nconst okSrc = '/static/logo.png'\n\nfunction onAvatarClick() {\n\tuni.showToast({ title: 'avatar click', icon: 'none' })\n}\n```"
  },
  {
    heading: '描边色 border-color',
    body: "```uvue\n<nax-avatar :src=\"okSrc\" bordered></nax-avatar>\n<nax-avatar :src=\"okSrc\" border-color=\"#18a058\"></nax-avatar>\n<nax-avatar :src=\"okSrc\" border-color=\"#2080f0\" size=\"48\"></nax-avatar>\n<nax-avatar text=\"NA\" color=\"#18a058\" border-color=\"#0c7a43\" size=\"48\"></nax-avatar>\n```\n\n```uts\nconst okSrc = '/static/logo.png'\n```"
  },
  {
    heading: '尺寸 size',
    body: "```uvue\n<nax-avatar :src=\"okSrc\" size=\"sm\"></nax-avatar>\n<nax-avatar :src=\"okSrc\" size=\"md\"></nax-avatar>\n<nax-avatar :src=\"okSrc\" size=\"lg\"></nax-avatar>\n<nax-avatar :src=\"okSrc\" size=\"56\"></nax-avatar>\n```\n\n```uts\nconst okSrc = '/static/logo.png'\n```"
  },
  {
    heading: '形状 shape',
    body: "```uvue\n<nax-avatar :src=\"okSrc\" shape=\"circle\" size=\"48\"></nax-avatar>\n<nax-avatar :src=\"okSrc\" shape=\"round\" size=\"48\"></nax-avatar>\n<nax-avatar :src=\"okSrc\" shape=\"square\" size=\"48\"></nax-avatar>\n```\n\n```uts\nconst okSrc = '/static/logo.png'\n```"
  },
  {
    heading: '文字头像 text + color',
    body: "```uvue\n<nax-avatar text=\"A\"></nax-avatar>\n<nax-avatar text=\"NA\" color=\"#18a058\"></nax-avatar>\n<nax-avatar text=\"UI\" color=\"#2080f0\"></nax-avatar>\n<nax-avatar text=\"!\" color=\"#d03050\" size=\"lg\"></nax-avatar>\n<nax-avatar text=\"文\" color=\"#f0a020\" text-color=\"#333639\"></nax-avatar>\n```"
  },
  {
    heading: 'object-fit',
    body: "```uvue\n<nax-avatar :src=\"okSrc\" size=\"56\" object-fit=\"cover\"></nax-avatar>\n<nax-avatar :src=\"okSrc\" size=\"56\" object-fit=\"contain\"></nax-avatar>\n<nax-avatar :src=\"okSrc\" size=\"56\" object-fit=\"fill\"></nax-avatar>\n```\n\n```uts\nconst okSrc = '/static/logo.png'\n```"
  },
  {
    heading: '失败回退 fallback-src / text',
    body: "```uvue\n<nax-avatar\n\t:src=\"badSrc\"\n\t:fallback-src=\"okSrc\"\n\tsize=\"48\"\n\t@error=\"onError\"\n></nax-avatar>\n\n<nax-avatar\n\t:src=\"badSrc\"\n\ttext=\"FB\"\n\tcolor=\"#18a058\"\n\tsize=\"48\"\n\t@error=\"onError\"\n></nax-avatar>\n\n<nax-avatar :src=\"badSrc\" size=\"48\" @error=\"onError\">\n\t<nax-icon name=\"user\" size=\"20\" color=\"#e5e5ea\"></nax-icon>\n</nax-avatar>\n```\n\n```uts\nconst okSrc = '/static/logo.png'\nconst badSrc = 'https://example.com/nax-avatar-not-found.png'\n\nfunction onError() {\n\tconsole.log('nax-avatar error')\n}\n```"
  },
  {
    heading: '仅插槽（无图无字）',
    body: "```uvue\n<nax-avatar size=\"48\">\n\t<nax-icon name=\"user\" size=\"22\" color=\"#767c82\"></nax-icon>\n</nax-avatar>\n\n<nax-avatar size=\"48\" color=\"#18a058\">\n\t<nax-icon name=\"user\" size=\"22\" color=\"#ffffff\"></nax-icon>\n</nax-avatar>\n```"
  },
  {
    heading: '与 nax-badge 组合',
    body: "```uvue\n<nax-badge value=\"8\" offset-x=\"3\" offset-y=\"-3\">\n\t<nax-avatar :src=\"okSrc\" size=\"48\"></nax-avatar>\n</nax-badge>\n\n<nax-badge dot type=\"success\" offset-x=\"3\" offset-y=\"-3\">\n\t<nax-avatar text=\"在\" color=\"#2080f0\" size=\"48\"></nax-avatar>\n</nax-badge>\n\n<nax-badge value=\"99+\" type=\"error\" offset-x=\"3\" offset-y=\"-3\">\n\t<nax-avatar :src=\"okSrc\" size=\"48\" shape=\"round\"></nax-avatar>\n</nax-badge>\n```\n\n```uts\nconst okSrc = '/static/logo.png'\n```"
  }
]
