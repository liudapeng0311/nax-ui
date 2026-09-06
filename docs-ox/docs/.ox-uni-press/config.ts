// 不 import @ox-uni-press/core：defineConfig 仅为类型包装，普通对象等价，
// 免去宿主工程 node_modules 必须能解析该包才能加载配置的限制
export default {
  site: {
    title: 'nax-ui Docs',
    description: '面向 uni-app x（uvue）的通用 UI 组件库',
    lang: 'zh-CN',
    logo: '/static/logo.png',
    footer: {
      copyright: '© 2026 nax-ui',
      links: [
        { text: 'GitHub', link: 'https://github.com/liudapeng0311/nax-ui' },
        { text: 'Gitee', link: 'https://gitee.com/liusixsix/nax-ui' },
      ],
    },
  },
  theme: {
    nav: [
      { text: '指南', link: '/guide/intro' },
      { text: '组件', link: '/components/' },
      { text: '组合式函数', link: '/composables/' },
    ],
    // 显式分组：与 docs-site 侧边栏分组/命名保持一致
    // 本文件由 scripts/sync-sidebar.mjs 从 docs-site/sidebar-data.mjs 生成，勿手改分组部分
    sidebar: [
    // /guide/
      {
        text: "指南",
        items: [
          { text: "介绍", link: "/guide/intro" },
          { text: "快速开始", link: "/guide/" },
          { text: "主题接入", link: "/guide/theme" },
          { text: "暗黑模式", link: "/guide/dark-mode" },
          { text: "AI 技能包", link: "/guide/ai-skill" },
        ],
      },
    // /composables/
      {
        text: "组合式函数",
        items: [
          { text: "总览", link: "/composables/" },
          { text: "useCountdown 倒计时", link: "/composables/use-countdown" },
          { text: "useDebounce 防抖", link: "/composables/use-debounce" },
          { text: "useThrottle 节流", link: "/composables/use-throttle" },
          { text: "useInterval 轮询", link: "/composables/use-interval" },
          { text: "useStorage 本地缓存", link: "/composables/use-storage" },
          { text: "useValidate 表单校验", link: "/composables/use-validate" },
          { text: "useDatetimeParts 日期时间", link: "/composables/use-datetime-parts" },
        ],
      },
    // /components/
      {
        text: "组件",
        items: [
          { text: "组件总览", link: "/components/" },
        ],
      },
      {
        text: "基础组件",
        items: [
          { text: "按钮 Button", link: "/components/button" },
          { text: "文本 Text", link: "/components/text" },
          { text: "图标 Icon", link: "/components/icon" },
          { text: "间距 Space", link: "/components/space" },
          { text: "线条 Line", link: "/components/line" },
          { text: "分割线 Divider", link: "/components/divider" },
          { text: "标签 Tag", link: "/components/tag" },
          { text: "徽标 Badge", link: "/components/badge" },
          { text: "头像 Avatar", link: "/components/avatar" },
          { text: "富文本 RichText", link: "/components/rich-text" },
        ],
      },
      {
        text: "布局组件",
        items: [
          { text: "单元格 Cell", link: "/components/cell" },
          { text: "卡片 Card", link: "/components/card" },
          { text: "宫格 Grid", link: "/components/grid" },
          { text: "步骤条 Steps", link: "/components/steps" },
          { text: "列表 List", link: "/components/list" },
          { text: "虚拟列表 VirtualList", link: "/components/virtual-list" },
          { text: "滑动操作 SwipeAction", link: "/components/swipe-action" },
          { text: "轮播 Swiper", link: "/components/swiper" },
        ],
      },
      {
        text: "表单组件",
        items: [
          { text: "输入框 Input", link: "/components/input" },
          { text: "搜索框 Search", link: "/components/search" },
          { text: "文本域 Textarea", link: "/components/textarea" },
          { text: "选择器 Select", link: "/components/select" },
          { text: "日历 Calendar", link: "/components/calendar" },
          { text: "日期时间选择器 DatetimePicker", link: "/components/datetime-picker" },
          { text: "日期横条 DateStrip", link: "/components/date-strip" },
          { text: "键盘 Keyboard", link: "/components/keyboard" },
          { text: "开关 Switch", link: "/components/switch" },
          { text: "滑动选择器 Slider", link: "/components/slider" },
          { text: "复选框 Checkbox", link: "/components/checkbox" },
          { text: "单选框 Radio", link: "/components/radio" },
          { text: "步进器 NumberBox", link: "/components/number-box" },
          { text: "评分 Rate", link: "/components/rate" },
          { text: "上传 Upload", link: "/components/upload" },
          { text: "表单 Form", link: "/components/form" },
        ],
      },
      {
        text: "反馈组件",
        items: [
          { text: "过渡 Transition", link: "/components/transition" },
          { text: "加载 Loading", link: "/components/loading" },
          { text: "进度条 Progress", link: "/components/progress" },
          { text: "骨架屏 Skeleton", link: "/components/skeleton" },
          { text: "遮罩层 Overlay", link: "/components/overlay" },
          { text: "弹出容器 Picker", link: "/components/picker" },
          { text: "压窗屏 Popup", link: "/components/popup" },
          { text: "轻提示 Toast", link: "/components/toast" },
          { text: "对话框 Dialog", link: "/components/dialog" },
          { text: "动作面板 ActionSheet", link: "/components/action-sheet" },
          { text: "警告提示 Alert", link: "/components/alert" },
          { text: "通告栏 NoticeBar", link: "/components/notice-bar" },
        ],
      },
      {
        text: "导航组件",
        items: [
          { text: "导航栏 NavBar", link: "/components/nav-bar" },
          { text: "底部标签栏 Tabbar", link: "/components/tabbar" },
          { text: "标签页 Tabs", link: "/components/tabs" },
          { text: "下拉菜单 Dropdown", link: "/components/dropdown" },
        ],
      },
      {
        text: "展示组件",
        items: [
          { text: "图片 Image", link: "/components/image" },
          { text: "空状态 Empty", link: "/components/empty" },
        ],
      },
    ],
    outline: { depth: 2 },
  },
}
