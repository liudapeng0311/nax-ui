## 0.1.0（2026-07-20）

- 首版：声明式 `<nax-dialog v-model:show>` + 命令式 `naxDialog()` / `naxDialogAlert()` / `naxDialogConfirm()`
- 薄封装 `nax-picker`（position=center）
- 支持 title/content、取消/确定、confirmType、asyncClose、maskClosable
- 全局挂一次宿主后函数式调用；未挂载回退 `uni.showModal`
- 自定义内容：默认插槽 / title / footer；更复杂布局请用 `nax-picker`
