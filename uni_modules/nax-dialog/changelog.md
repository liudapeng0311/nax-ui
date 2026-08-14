## 0.2.3（2026-08-14）
- 精简 readme：移除内部开发向内容（设计说明 / 实现细节 / 平台差异实现等），只保留安装、用法、API、主题等用户文档
## 0.2.2（2026-08-12）
- readme 命令式 API 的 input 参数表补全：类型、默认值、枚举取值与兼容字段说明
## 0.2.1（2026-08-11）
- readme 统一主题小节：通过 CSS 变量覆盖表格（button 风格），补充组件可覆盖的主题 Token
# nax-dialog 变更记录

## 0.2.0（2026-08-07）
- 声明支持 iOS 端（`APP-IOS`）：声明式与命令式弹窗已在 iOS 真机验证，公共实现无需端差异处理；`package.json` 平台标记 ios 由 `-` 更新为 `√`
- Android、鸿蒙、Web、微信小程序行为保持不变
## 0.1.1（2026-07-31）
- 微信小程序：修复宿主页同时使用 `<nax-dialog />` 与同名导入 `naxDialog` 时的编译命名冲突；示例通过 `MP-WEIXIN` 条件编译使用本地函数别名，确保声明式实例与命令式宿主正常注册，点击可打开对话框。Web 与 App 端行为保持不变。
## 0.1.0（2026-07-20）

- 首版：声明式 `<nax-dialog v-model:show>` + 命令式 `naxDialog()` / `naxDialogAlert()` / `naxDialogConfirm()`
- 薄封装 `nax-picker`（position=center）
- 支持 title/content、取消/确定、confirmType、asyncClose、maskClosable
- 全局挂一次宿主后函数式调用；未挂载回退 `uni.showModal`
- 自定义内容：默认插槽 / title / footer；更复杂布局请用 `nax-picker`
