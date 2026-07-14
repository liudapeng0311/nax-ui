# nax-ui 组件清单

> 状态说明  
> - `planned`：规划中  
> - `mvp`：首期必做  
> - `next`：二期  
> - `later`：三期及以后  
> - `done`：已完成（实现后更新）

命名统一：`nax-<name>`，目录 `uni_modules/nax-ui/components/nax-<name>/nax-<name>.uvue`。

---

## 1. 分期总览

| 阶段 | 目标 | 组件数（约） |
|------|------|--------------|
| **MVP（v0.1）** | 可搭页面骨架 + 主操作闭环 | 12 |
| **Next（v0.2）** | 表单与反馈可用 | 12 |
| **Later（v0.3+）** | 导航/展示/业务增强 | 15+ |

原则：

1. 先通用、高频、跨端稳。
2. 先原子组件，再复合组件。
3. 弹层类依赖稳定基础（Popup / Overlay）后再做 Dialog / ActionSheet。
4. 业务组件（如商品卡片）最后做，避免过早绑定业务。

---

## 2. MVP（v0.1）— 必做

### 2.1 基础 Foundation

| 组件 | 标签 | 优先级 | 说明 | 核心 API（草案） |
|------|------|--------|------|------------------|
| 按钮 | `nax-button` | P0 | 主操作入口 | `type(default/tertiary/primary/info/success/warning/error)` `variant` `size` `disabled` `loading` `block` `icon` / `click` |
| 文本 | `nax-text` | P0 | 统一字号/颜色/省略 | `type` `size` `lines` `selectable` |
| 图标 | `nax-icon` | P0 | 字体/图片图标壳 | `name` `size` `color` / `click` |
| 间距 | `nax-space` | P0 | 横向/纵向间距容器 | `direction` `size` `wrap` `align` |
| 分割线 | `nax-divider` | P1 | 内容分隔 | `direction` `dashed` `text` |
| 标签 | `nax-tag` | P1 | 状态/分类标记 | `type` `variant` `size` `closable` / `close` |

### 2.2 布局与列表单元

| 组件 | 标签 | 优先级 | 说明 | 核心 API（草案） |
|------|------|--------|------|------------------|
| 单元格 | `nax-cell` | P0 | 设置项/列表行基础 | `title` `label` `value` `is-link` `border` / `click` |
| 单元格组 | `nax-cell-group` | P0 | Cell 分组容器 | `title` `inset` |
| 卡片 | `nax-card` | P1 | 内容承载 | `title` `extra` 插槽 `header` `footer` |

### 2.3 展示 / 状态

| 组件 | 标签 | 优先级 | 说明 | 核心 API（草案） |
|------|------|--------|------|------------------|
| 徽标 | `nax-badge` | P1 | 数字/红点 | `value` `dot` `max` `show-zero` |
| 头像 | `nax-avatar` | P1 | 图/文字头像 | `src` `text` `size` `shape` |
| 空状态 | `nax-empty` | P1 | 无数据占位 | `description` `image` 插槽 `action` |

### 2.4 MVP 验收标准

- [ ] 能用 Button + Cell + Space + Text + Empty 搭出列表页与简单设置页
- [ ] 主题色可通过 CSS 变量全局切换
- [ ] 每个组件有 demo 页
- [ ] App 与 Web 至少一端主流程可跑通（优先双端）

---

## 3. Next（v0.2）— 表单与反馈

### 3.1 表单 Form

| 组件 | 标签 | 优先级 | 说明 | 核心 API（草案） |
|------|------|--------|------|------------------|
| 输入框 | `nax-input` | P0 | 单行输入 | `v-model` `type` `placeholder` `clearable` `disabled` `maxlength` / `change` `focus` `blur` |
| 多行输入 | `nax-textarea` | P1 | 多行文本 | `v-model` `auto-height` `maxlength` `show-count` |
| 开关 | `nax-switch` | P0 | 布尔切换 | `v-model` `disabled` `loading` / `change` |
| 复选框 | `nax-checkbox` | P0 | 多选 | `v-model` `value` `disabled` |
| 复选框组 | `nax-checkbox-group` | P0 | 多选组 | `v-model` / `change` |
| 单选框 | `nax-radio` | P0 | 单选 | `value` `disabled` |
| 单选组 | `nax-radio-group` | P0 | 单选组 | `v-model` / `change` |
| 步进器 | `nax-stepper` | P1 | 数量调节 | `v-model` `min` `max` `step` `disabled` |
| 表单项 | `nax-form-item` | P1 | 标签+控件+错误 | `label` `required` `status` `error-message` |
| 表单 | `nax-form` | P2 | 校验容器（可后置） | `model` `rules` / `submit` `validate` |

### 3.2 反馈 Feedback

| 组件 | 标签 | 优先级 | 说明 | 核心 API（草案） |
|------|------|--------|------|------------------|
| 加载 | `nax-loading` | P0 | 局部/页面加载 | `size` `vertical` `text` |
| 遮罩 | `nax-overlay` | P0 | 弹层底层 | `show` `z-index` / `click` |
| 弹出层 | `nax-popup` | P0 | 底部/中心/侧滑 | `v-model:open` `position` `round` `close-on-mask` |
| 对话框 | `nax-dialog` | P1 | 确认/取消 | `title` `content` `show-cancel` / `confirm` `cancel` |
| 轻提示 | `nax-toast`（组件或 API） | P1 | 短反馈 | `message` `type` `duration` |
| 动作面板 | `nax-action-sheet` | P2 | 底部操作列表 | `actions` / `select` `cancel` |

### 3.3 v0.2 验收标准

- [ ] 可完成登录/设置类表单页
- [ ] Popup + Dialog + Toast 反馈闭环
- [ ] 表单控件支持 disabled / 基础 change 事件
- [ ] 弹层在蒸汽模式下行为稳定（打开/关闭/遮罩）

---

## 4. Later（v0.3+）— 导航 / 展示 / 增强

### 4.1 导航 Navigation

| 组件 | 标签 | 优先级 | 说明 |
|------|------|--------|------|
| 导航栏 | `nax-nav-bar` | P1 | 页头标题/返回/右侧操作 |
| 标签栏 | `nax-tab-bar` | P1 | 底部导航（可先 demo，不强制替换原生 tabBar） |
| 分段器 | `nax-tabs` | P1 | 内容切换 |
| 分段面板 | `nax-tab-pane` | P1 | Tabs 子项 |
| 步骤条 | `nax-steps` | P2 | 流程步骤 |
| 面包屑 | `nax-breadcrumb` | P3 | 多用于 Web |

### 4.2 数据展示 Data Display

| 组件 | 标签 | 优先级 | 说明 |
|------|------|--------|------|
| 网格 | `nax-grid` / `nax-grid-item` | P1 | 宫格入口 |
| 通知栏 | `nax-notice-bar` | P2 | 滚动通知 |
| 进度条 | `nax-progress` | P2 | 线形进度 |
| 骨架屏 | `nax-skeleton` | P2 | 加载占位 |
| 折叠面板 | `nax-collapse` / `nax-collapse-item` | P2 | 手风琴 |
| 图片 | `nax-image` | P2 | 封装加载失败/圆角/懒加载 |
| 评分 | `nax-rate` | P2 | 星级 |
| 搜索栏 | `nax-search-bar` | P1 | 搜索输入组合 |
| 索引列表 | `nax-index-bar` | P3 | 通讯录类 |

### 4.3 业务增强（按需）

| 组件 | 标签 | 优先级 | 说明 |
|------|------|--------|------|
| 下拉刷新容器 | `nax-pull-refresh` | P2 | 若端能力允许再做 |
| 无限滚动 | `nax-list` | P2 | 列表加载更多模式 |
| 优惠/价格 | `nax-price` | P3 | 电商展示 |
| 商品卡 | `nax-goods-card` | P3 | 业务示例，可拆独立扩展包 |

---

## 5. 组件依赖关系

```text
nax-text / nax-icon
    ↑
nax-button / nax-tag / nax-badge / nax-avatar
    ↑
nax-cell / nax-cell-group / nax-card / nax-empty
    ↑
nax-input / nax-switch / nax-checkbox* / nax-radio*
    ↑
nax-overlay → nax-popup → nax-dialog / nax-action-sheet / nax-toast
    ↑
nax-nav-bar / nax-tabs / nax-grid / nax-search-bar
```

开发顺序建议严格按依赖自底向上，避免复合组件先写后改。

---

## 6. 每个组件交付物清单

新建组件时必须同时具备：

```text
uni_modules/nax-ui/components/nax-xxx/nax-xxx.uvue
docs/components/nax-xxx.md          # 可二期再拆，MVP 可先写在 demo 注释 + 总清单状态
pages/components/xxx/index.uvue     # 演示页
pages.json 路由注册
```

最小 API 文档字段：

- 组件名 / 用途
- 平台支持
- Props 表（名、类型、默认、说明）
- Events 表
- Slots 表
- externalClasses
- 可覆盖 CSS 变量
- 示例代码

---

## 7. 平台兼容策略

| 级别 | 含义 | 清单标注 |
|------|------|----------|
| A | MVP 必须全目标端可用 | `compat: A` |
| B | 主端可用，个别端降级 | `compat: B` |
| C | 增强能力，允许条件编译 | `compat: C` |

MVP 组件默认目标 **A**。  
弹层/复杂手势组件允许 **B**，文档必须写降级说明。

目标端矩阵（文档统一列）：

- App-Android
- App-iOS
- App-Harmony
- Web
- 微信小程序

取值：`√` 支持 / `x` 不支持 / `-` 不适用

---

## 8. 与官方 / 竞品边界

| 类别 | 策略 |
|------|------|
| uni-app x 内置组件 | 可封装增强（如 image/button），不重复造轮子叙事 |
| uni-ui x | 可参考 API 习惯，不抄代码；差异化在 token、一致性、文档 |
| 第三方 UI（RiceUI 等） | 对标高频组件，不盲目堆数量 |

差异化优先级：

1. Token 主题与样式隔离 2.0 友好  
2. API 一致性（size/type/variant）  
3. 蒸汽模式稳定性  
4. demo / 文档可复制性  

---

## 9. 当前状态看板（实现时维护）

| 组件 | 阶段 | 状态 | 负责人 | 备注 |
|------|------|------|--------|------|
| nax-button | mvp | done | - | 已实现，demo: pages/components/button |
| nax-text | mvp | planned | - | 样板组件 |
| nax-icon | mvp | planned | - | |
| nax-space | mvp | planned | - | |
| nax-divider | mvp | planned | - | |
| nax-tag | mvp | planned | - | |
| nax-cell | mvp | planned | - | |
| nax-cell-group | mvp | planned | - | |
| nax-card | mvp | planned | - | |
| nax-badge | mvp | planned | - | |
| nax-avatar | mvp | planned | - | |
| nax-empty | mvp | planned | - | |
| nax-input | next | planned | - | |
| nax-textarea | next | planned | - | |
| nax-switch | next | planned | - | |
| nax-checkbox | next | planned | - | |
| nax-checkbox-group | next | planned | - | |
| nax-radio | next | planned | - | |
| nax-radio-group | next | planned | - | |
| nax-stepper | next | planned | - | |
| nax-form-item | next | planned | - | |
| nax-form | next | planned | - | |
| nax-loading | next | planned | - | |
| nax-overlay | next | planned | - | |
| nax-popup | next | planned | - | |
| nax-dialog | next | planned | - | |
| nax-toast | next | planned | - | |
| nax-action-sheet | next | planned | - | |
| nax-nav-bar | later | planned | - | |
| nax-tabs | later | planned | - | |
| nax-tab-pane | later | planned | - | |
| nax-tab-bar | later | planned | - | |
| nax-steps | later | planned | - | |
| nax-grid | later | planned | - | |
| nax-grid-item | later | planned | - | |
| nax-notice-bar | later | planned | - | |
| nax-progress | later | planned | - | |
| nax-skeleton | later | planned | - | |
| nax-collapse | later | planned | - | |
| nax-image | later | planned | - | |
| nax-rate | later | planned | - | |
| nax-search-bar | later | planned | - | |

> 实现组件后，将对应行 `status` 改为 `done`，并补充备注（如已知限制）。

---

## 10. 近期待办（文档落地后）

1. 搭 `uni_modules/nax-ui` 包骨架与 `package.json`
2. 落地 CSS 变量入口（theme）
3. 实现样板：`nax-button` + `nax-text`
4. 建组件 demo 路由结构
5. 按本清单从 P0 基础组件推进

