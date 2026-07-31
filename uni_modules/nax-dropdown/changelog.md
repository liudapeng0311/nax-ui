## 0.1.3（2026-07-31）
- 修复 Android 端 `nax-dropdown-item` 注入响应式值和回调时的 `RefImpl cannot be cast to java.lang.Void` 崩溃：在 `APP-ANDROID` 下使用同类型兜底值；Web、iOS、鸿蒙和小程序保持原有注入行为。
## 0.1.2 (2026-07-29)

- 修复鸿蒙端（`APP-HARMONY`）默认下拉选项文字未与 48px 选项行垂直居中的问题：为选项文字显式设置同高行框；其它端保持原有排版。

## 0.1.1 (2026-07-29)
- 移除第三方组件库参考表述，完善独立组件文档。

## 0.1.0

- 首版：`nax-dropdown` + `nax-dropdown-item`
- 默认单选 options、自定义 slot、遮罩关闭、fixed 吸顶
- 选中自动高亮 / `displaySelected` / `highlight` 命令式
