## 0.1.1（2026-07-31）
- 微信小程序：修复宿主页同时使用 `<nax-dialog />` 与同名导入 `naxDialog` 时的编译命名冲突；示例通过 `MP-WEIXIN` 条件编译使用本地函数别名，确保声明式实例与命令式宿主正常注册，点击可打开对话框。Web 与 App 端行为保持不变。
## 0.1.0（2026-07-20）

- 首版：声明式 `<nax-dialog v-model:show>` + 命令式 `naxDialog()` / `naxDialogAlert()` / `naxDialogConfirm()`
- 薄封装 `nax-picker`（position=center）
- 支持 title/content、取消/确定、confirmType、asyncClose、maskClosable
- 全局挂一次宿主后函数式调用；未挂载回退 `uni.showModal`
- 自定义内容：默认插槽 / title / footer；更复杂布局请用 `nax-picker`
