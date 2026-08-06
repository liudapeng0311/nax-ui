# nax-video 无头视频播放器开发规范

> 状态：`done`，实现见 `uni_modules/nax-video`，demo 见 `pages/components/video/index.uvue`。
> 文档基线：2026-08-05，uni-app x / HBuilderX 5.15 文档。
> 目标组件：`nax-video`，仅支持 uni-app x，uvue + UTS，蒸汽模式优先。

---

## 1. 目标与边界

`nax-video` 是一个**无头控制器式视频组件**：

- 必须渲染 uni-app x 原生 `<video>`，负责媒体承载、事件归一化和 `VideoContext` 控制。
- 不提供 nax-ui 风格的默认控制条、进度条、按钮、图标或全屏皮肤。
- 消费者通过作用域插槽获得播放状态和控制方法，自行组合 `view`、`text`、`nax-icon`、`nax-slider` 等 UI。
- 可通过 `controls=true` 临时启用原生控制条，作为调试、降级或无自定义插槽时的选择。
- 不把 Web HTMLVideoElement、DOM、CSS 伪类或第三方播放器库作为核心依赖。

这里的“无头”只指**控制 UI 无头化**，不代表组件完全无渲染。视频播放必须依赖原生 `<video>`。

### 1.1 MVP 包含

- 单视频源播放
- 播放、暂停、切换播放状态、停止
- 跳转和相对跳转
- 播放倍速
- 静音状态控制
- 原生全屏进入、退出和状态同步
- 当前时间、总时长、等待、结束、错误状态
- 自定义控制 UI 作用域插槽
- 原生控制条降级
- 多实例隔离
- Android、HarmonyOS、Web、微信小程序的条件编译边界

### 1.2 MVP 不包含

- 播放列表、自动连播、清晰度切换
- HLS/DASH 自适应策略封装
- DRM、投屏、AirPlay、Chromecast
- 字幕文件解析和字幕轨道管理
- 后台音频播放
- 画中画（官方 uni-app x 文档未形成足够稳定的全端公共能力）
- 弹幕 UI；仅可在后续阶段按官方能力增加 `sendDanmu`
- 自定义手势系统、音量滑动、亮度滑动
- 视频下载、缓存管理和预加载策略
- Web 专属 HTMLMediaElement API

不得为了支持上述能力而在首版引入 Web 播放器生态依赖。

---

## 2. 官方能力基线

实现前必须重新核对以下官方文档，不能只依赖本文：

- 视频组件：https://doc.dcloud.net.cn/uni-app-x/component/video.html
- `uni.createVideoContext`：https://doc.dcloud.net.cn/uni-app-x/api/create-video-context.html
- 条件编译：https://doc.dcloud.net.cn/uni-app-x/tutorial/platform.html
- 样式隔离：https://doc.dcloud.net.cn/uni-app-x/css/common/style-isolation.html

本文通过 Context7 查询的官方文档快照显示：

| 能力 | Web | Android | iOS | HarmonyOS | 微信小程序 |
|------|-----|---------|-----|-----------|------------|
| `<video>` | 4.0+ | 3.9+ | 4.11+ | 4.61+ | 4.41+ |
| `uni.createVideoContext` | 4.0+ | 4.11+ | 4.11+ | 4.61+ | 4.41+ |

为了让首版公共行为覆盖本仓库当前主目标端，`nax-video` 的实际能力下限按 **4.61** 设计。实现时应同步检查插件 `package.json` 的 `engines`，并确认 DCloud 插件市场对版本范围字符串的解释后再填写，不能机械复制现有 `^4.25`。

本仓库当前没有宣称 App iOS 可用。首版平台表继续将 iOS 标为 `-`，不得因为官方 `<video>` 已支持 iOS 就虚构组件已完成 iOS 验证。

---

## 3. 包结构与依赖

目标结构：

```text
uni_modules/nax-video/
  package.json
  readme.md
  changelog.md
  components/
    nax-video/
      nax-video.uvue

pages/components/video/
  index.uvue
```

首版不依赖 `nax-icon`、`nax-slider` 或 `nax-ui-theme`。无头组件不应强迫用户安装某套控制 UI。

如果 demo 使用 `nax-icon`、`nax-slider`、`nax-button`，它们只属于演示宿主依赖，不写入 `nax-video` 的运行时依赖。

`nax-ui` 套装在组件完成后聚合 `nax-video`；只写本文时不要修改套装依赖和版本。

---

## 4. 公共 API

### 4.1 Props

首版只封装稳定、跨端价值明确的属性。

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `src` | string | `''` | 视频地址；变化时重置播放状态 |
| `poster` | string | `''` | 封面地址 |
| `autoplay` | boolean | `false` | 是否自动播放；最终状态以原生 `play` 事件为准 |
| `loop` | boolean | `false` | 是否循环 |
| `muted` | boolean | `false` | 静音状态，支持 `v-model:muted` |
| `initialTime` | number | `0` | 初始播放位置，单位秒；不作为持续受控的 currentTime |
| `controls` | boolean | `false` | 是否启用原生控制条；Headless 默认关闭 |
| `objectFit` | string | `contain` | `contain` / `fill` / `cover`，非法值回退 `contain` |
| `title` | string | `''` | 原生全屏标题，按端支持 |
| `header` | object | `{}` | 视频请求头，按原生能力透传 |
| `playbackRate` | number | `1` | 倍速；变化时调用 `VideoContext.playbackRate` |
| `fullscreenDirection` | number | `90` | 请求全屏方向：`0` / `90` / `-90` |
| `width` | string/number | `100%` | 结构尺寸；纯数字按 px 处理 |
| `height` | string/number | `225` | 结构尺寸；纯数字按 px 处理 |
| `customClass` | string | `''` | 根节点扩展 class |

约束：

- 不提供 `color`、`background`、`icon`、`progressColor`、`controlStyle` 等皮肤 props。
- 不提供持续受控的 `currentTime` prop，避免 `timeupdate -> prop -> seek` 循环。
- `playbackRate` 首版只接受官方 `VideoContext` 文档列出的 `0.5 / 0.8 / 1 / 1.25 / 1.5`；非法值回退 `1`。
- 不把 `autoplay=true` 等同于播放成功，Web 等平台可能受自动播放策略限制。

### 4.2 Events

| Event | 参数 | 说明 |
|-------|------|------|
| `play` | 原生事件 | 收到原生播放事件后派发 |
| `pause` | 原生事件 | 收到原生暂停事件后派发 |
| `ended` | 原生事件 | 播放结束 |
| `timeupdate` | `{ currentTime, duration }` | 使用稳定的语义对象，不要求业务解析整份原生事件 |
| `waiting` | 原生事件 | 进入缓冲等待 |
| `progress` | 原生事件 | 原样透传；首版不假设各端 detail 完全一致 |
| `error` | `{ errCode }` | 播放错误；无法读取时使用 `0` |
| `fullscreenchange` | `{ fullScreen, direction }` | 全屏状态变化 |
| `controlstoggle` | 原生事件 | 原生控制条显隐变化，按端支持 |
| `fullscreenclick` | 原生事件 | 全屏控制区域点击，按端支持 |
| `state-change` | 状态快照 | 仅在语义状态发生变化时派发 |
| `update:muted` | boolean | 自定义 UI 修改静音状态 |

必须先更新内部状态，再派发对应事件，让事件处理器读取到最新插槽状态。

### 4.3 状态模型

内部状态必须保持简单标量，避免把平台原生对象暴露给业务：

```uts
type NaxVideoStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'ended' | 'error'
```

状态快照至少包含：

| 字段 | 类型 | 初始值 |
|------|------|--------|
| `status` | string | `idle` |
| `playing` | boolean | `false` |
| `waiting` | boolean | `false` |
| `ended` | boolean | `false` |
| `currentTime` | number | `0` |
| `duration` | number | `0` |
| `fullscreen` | boolean | `false` |
| `fullscreenDirection` | string | `''` |
| `muted` | boolean | props 初始值 |
| `playbackRate` | number | 归一化后的 props 值 |
| `errorCode` | number | `0` |

不要在首版状态中暴露 `VideoContext`、`UniVideoElement` 或平台播放器实例。

### 4.4 Methods / `defineExpose`

| 方法 | 签名 | 行为 |
|------|------|------|
| `play` | `(): void` | 调用原生播放；不提前把 `playing` 设为 true |
| `pause` | `(): void` | 调用暂停；状态等原生事件确认 |
| `toggle` | `(): void` | 根据已确认的 `playing` 状态调用 play/pause |
| `stop` | `(): void` | 调用 stop，并将时间与状态复位 |
| `seek` | `(seconds: number): void` | 跳转到绝对时间 |
| `seekBy` | `(delta: number): void` | 在当前时间基础上前后跳转 |
| `setPlaybackRate` | `(rate: number): void` | 归一化后调用 `playbackRate` |
| `setMuted` | `(muted: boolean): void` | 更新本地静音并派发 `update:muted` |
| `toggleMuted` | `(): void` | 切换静音 |
| `requestFullscreen` | `(direction?: number): void` | 使用 `{ direction }` 请求全屏 |
| `exitFullscreen` | `(): void` | 退出全屏 |
| `toggleFullscreen` | `(): void` | 根据已确认的全屏状态切换 |
| `getState` | `(): UTSJSONObject` | 返回只包含公共标量的快照 |

方法必须同时用于 `defineExpose` 和作用域插槽，禁止维护两套行为实现。

`seek` 规则：

1. 非数字、NaN 和无穷值直接忽略。
2. 最小值限制为 `0`。
3. 已知 `duration > 0` 时限制到 `duration`。
4. 只调用一次原生 `seek`，不提前伪造 `timeupdate`。

### 4.5 Scoped Slots

默认插槽是无头控制 UI 的主要入口：

| Slot prop | 类型 | 说明 |
|-----------|------|------|
| `status` | string | 当前语义状态 |
| `playing` / `waiting` / `ended` | boolean | 快捷状态 |
| `currentTime` / `duration` | number | 秒 |
| `fullscreen` | boolean | 是否全屏 |
| `muted` | boolean | 当前静音状态 |
| `playbackRate` | number | 当前倍速 |
| `errorCode` | number | 错误码 |
| `play` / `pause` / `toggle` / `stop` | function | 播放控制 |
| `seek` / `seekBy` | function | 进度控制 |
| `setPlaybackRate` | function | 倍速控制 |
| `setMuted` / `toggleMuted` | function | 静音控制 |
| `requestFullscreen` / `exitFullscreen` / `toggleFullscreen` | function | 全屏控制 |

推荐用法：

```uvue
<nax-video src="https://example.com/video.mp4" :height="220">
  <template #default="{ playing, waiting, currentTime, duration, toggle, seek, toggleFullscreen }">
    <view class="demo-video-controls">
      <text class="demo-video-controls__button" @click="toggle">{{ playing ? '暂停' : '播放' }}</text>
      <text v-if="waiting" class="demo-video-controls__status">加载中</text>
      <text class="demo-video-controls__time">{{ currentTime }} / {{ duration }}</text>
      <text class="demo-video-controls__button" @click="toggleFullscreen">全屏</text>
    </view>
  </template>
</nax-video>
```

为降低蒸汽模式和 UTS 编译差异，首版应逐个传递 slot prop；不要把包含函数的复杂 `actions` 对象塞进 `UTSJSONObject`。

---

## 5. 模板与控制器实现要求

建议骨架：

```uvue
<template>
  <view class="nax-video" :class="rootClass" :style="rootStyle">
    <video
      :id="resolvedVideoId"
      class="nax-video__media"
      :src="src"
      :poster="poster"
      :autoplay="autoplay"
      :loop="loop"
      :muted="mutedState"
      :initial-time="initialTime"
      :controls="controls"
      :object-fit="normalizedObjectFit"
      :title="title"
      :header="header"
      @play="onPlay"
      @pause="onPause"
      @ended="onEnded"
      @timeupdate="onTimeUpdate"
      @waiting="onWaiting"
      @progress="onProgress"
      @error="onError"
      @fullscreenchange="onFullscreenChange"
    >
      <slot
        :status="status"
        :playing="playing"
        :waiting="waiting"
        :ended="ended"
        :current-time="currentTime"
        :duration="duration"
        :fullscreen="fullscreen"
        :muted="mutedState"
        :playback-rate="rateState"
        :error-code="errorCode"
        :play="play"
        :pause="pause"
        :toggle="toggle"
        :stop="stop"
        :seek="seek"
        :seek-by="seekBy"
        :set-playback-rate="setPlaybackRate"
        :set-muted="setMuted"
        :toggle-muted="toggleMuted"
        :request-fullscreen="requestFullscreen"
        :exit-fullscreen="exitFullscreen"
        :toggle-fullscreen="toggleFullscreen"
      ></slot>
    </video>
  </view>
</template>
```

这是方向示例，不允许直接复制后跳过平台编译检查。

### 5.1 VideoContext 初始化

- 每个实例生成稳定且唯一的 `resolvedVideoId`，允许后续增加可选 `videoId` prop，但首版不必暴露。
- 在 `onMounted + nextTick` 后创建 context。
- 组合式 API 使用当前组件实例限定查询范围：

```uts
const instance = getCurrentInstance()
videoContext = uni.createVideoContext(resolvedVideoId, instance!.proxy!)
```

- context 未初始化时，所有公开方法必须安全返回，不能抛空引用异常。
- `src` 变化时重置状态，但不要重复创建 context，除非目标平台确认旧 context 已失效。
- 组件卸载时停止后续状态更新；官方没有统一 `destroy` 方法，不得自行调用不存在的 API。

### 5.2 事件驱动状态

- `play()`、`pause()`、`requestFullscreen()` 等命令不做乐观状态更新。
- `playing` 只由原生 `play` / `pause` / `ended` / `error` 事件改变。
- `waiting=true` 由 `waiting` 触发，在下一次 `play` 或有效 `timeupdate` 时清除。
- `timeupdate.detail.currentTime` 和 `duration` 必须检查为有限数值后再写入。
- `fullscreenchange.detail.direction` 按官方事件返回的字符串保存，不与请求参数数字混为一种类型。
- 循环播放时可能出现 `ended` 行为差异，业务最终以随后收到的原生事件为准。

### 5.3 样式

只允许 class 选择器：

```css
.nax-video {
  position: relative;
  overflow: hidden;
}

.nax-video__media {
  width: 100%;
  height: 100%;
}
```

- 横向控制条由消费者实现时必须显式 `flex-direction: row`。
- 文本样式由消费者写在 `<text>` 上。
- 组件不定义品牌色、控制按钮尺寸和进度条 token。
- `width` / `height` 只用于建立可播放的稳定盒子尺寸。
- 不使用 tag、id、属性选择器，不依赖 `:deep()`。

---

## 6. 平台差异与条件编译

用户需求已经明确涉及多端视频能力，实现时必须用条件编译隔离差异。

### 6.1 公共代码

以下能力优先放公共代码：

- 原生 video 基础 props
- `VideoContext` 的 play / pause / seek / stop
- 时间、等待、结束、错误、全屏状态归一化
- 默认作用域插槽
- `defineExpose` 方法

### 6.2 HarmonyOS：`APP-HARMONY`

官方示例展示了 HarmonyOS 蒸汽模式下：

- `<video>` 在 `list-view` 中支持 `recycle` / `reuse` 事件。
- `reuse` 时可通过 `UniVideoElement.seek()` 恢复回收前位置。
- 全屏自定义控制可使用原生 video 的 `controls` 具名插槽。

首版普通页面播放器不实现列表回收，但代码和文档必须说明：

- 不得承诺 `nax-video` 首版可直接放入虚拟列表并保持播放状态。
- 后续支持时仅在 `APP-HARMONY` 下绑定 `recycle` / `reuse`，其它端不得收到无意义事件。
- 若增加 `fullscreen-controls` 插槽，只在 `APP-HARMONY` 下转发到原生 `<video>` 的 `#controls`。

### 6.3 Android：`APP-ANDROID`

- 使用公共 `VideoContext` 控制。
- 不直接访问 Android MediaPlayer、ExoPlayer 或原生 View。
- 不为修复 Android 问题改成 uts 原生组件。
- 若原生子组件覆盖层与 Web/Harmony 行为不同，只把覆盖层结构放入 `APP-ANDROID` 分支，不复制整份状态机。

### 6.4 Web：`WEB`

- 自动播放可能因浏览器策略被阻止；组件不得偷偷强制 `muted=true`。
- `play()` 返回值按 `VideoContext` 的 `void` 契约处理，不使用 HTMLVideoElement Promise。
- 禁止通过 DOM 查询、`document`、`HTMLVideoElement` 补齐公共行为。
- Web 专属增强必须放在 `#ifdef WEB`，且不能成为 MVP 必需能力。

### 6.5 微信小程序：`MP-WEIXIN`

- `video` 与 `createVideoContext` 的官方能力基线为 4.41+。
- 创建 context 时传当前组件实例，避免多个实例或组件作用域下只凭 id 查询错误。
- 不使用动态组件实现控制按钮或渲染器。
- 小程序事件 detail 若与 App 不同，先归一化为本文的标量状态，再向插槽暴露。

### 6.6 iOS：`APP-IOS`

官方 video 能力存在，但本仓库当前未声明 iOS 支持：

- 公共代码不得故意破坏 iOS。
- 不新增未经验证的 iOS 专属实现。
- package 平台表继续标记 `-`，由用户后续实机验证后再调整。

---

## 7. Demo 规格

实现时新增 `pages/components/video/index.uvue`，演示文案使用中文，至少覆盖：

1. **最小无头播放器**：播放/暂停、当前时间、总时长。
2. **自定义进度控制**：使用 `nax-slider` 或普通控件调用 `seek`，避免拖动时连续无节制 seek。
3. **静音与倍速**：`v-model:muted`、0.5/1/1.25/1.5 倍速。
4. **全屏控制**：进入/退出全屏，展示全屏状态和方向。
5. **原生控制条降级**：`controls=true`，不放默认插槽。
6. **加载和错误状态**：等待提示、无效地址错误码。
7. **多实例**：两个播放器独立控制，验证 id/context 不串台。

禁止只做一个能播放的视频页面就标记完成。

Demo 视频地址必须满足：

- HTTPS
- 可跨域访问 Web
- 长期稳定或放入仓库 `static` 测试资源
- 不包含授权、隐私或易失效签名参数

---

## 8. 测试与验收

### 8.1 静态检查

- easycom 路径正确：`nax-video/nax-video.uvue`
- `<script setup lang="uts">`
- 仅组合式 API
- 样式只使用 class 选择器
- 所有文本由 demo 的 `<text>` 渲染
- 不引入 Web DOM API
- 平台专属事件、slot、API 使用对应宏
- 不暴露原生播放器对象

### 8.2 Web 可执行验证

AI 可以运行 Web，至少验证：

- 播放、暂停、seek、stop
- 倍速和静音
- `timeupdate` 状态递增
- 播放结束状态
- 无效 src 错误状态
- 两个实例不串台
- `controls=true` 降级
- 自定义控件不重叠、不溢出

自动播放测试必须分别记录 muted 与非 muted 场景，不能把浏览器策略误判为组件 bug。

### 8.3 非 Web 验证

按仓库约束，AI 不运行、不编译 Android、iOS、HarmonyOS、微信小程序，只做静态检查并说明：

- 影响端
- 使用的宏
- 尚需用户验证的原生行为

用户侧重点验证：

| 平台 | 重点 |
|------|------|
| Android | 自定义子组件层级、全屏、返回键、seek |
| HarmonyOS | 全屏 controls slot、页面返回、后续 list recycle/reuse |
| 微信小程序 | createVideoContext 组件作用域、多实例、全屏事件 |
| iOS | 当前不在发布支持范围，仅探索性验证 |

### 8.4 完成标准

- [ ] 公共 API 与本文一致，任何增删先回写本文
- [ ] Styled 控件不是组件运行时依赖
- [ ] 默认 `controls=false` 时可完全自定义 UI
- [ ] `controls=true` 可作为原生降级
- [ ] 所有命令在 context 未就绪时安全
- [ ] 状态以原生事件为真相来源
- [ ] 多实例不串台
- [ ] demo 覆盖第 7 节所有场景
- [ ] `docs/component-inventory.md` 从 `planned` 更新为 `done`
- [ ] `uni_modules/nax-video/readme.md` 写明平台兼容和无头用法
- [ ] `uni_modules/nax-video/changelog.md` 增加首版记录
- [ ] `uni_modules/nax-video/package.json` 版本按 SemVer 设置并声明真实平台范围
- [ ] `uni_modules/nax-ui/package.json` 聚合新包并按 SemVer 升级
- [ ] 相关 demo 导航与 `pages.json` 已更新

---

## 9. 禁止实现

- 禁止将 `nax-video` 做成 uts 原生组件或原生插件。
- 禁止包装 Web 专属播放器库作为全端实现。
- 禁止提供一整套默认 nax 风格控制皮肤后仍称其为无头组件。
- 禁止使用 `customStyle` 或大量颜色 props 做换肤。
- 禁止用轮询猜测播放状态；以 video 事件为准。
- 禁止把 `currentTime` 设计为高频双向 `v-model`。
- 禁止在用户调用 `play()` 后立即假设播放成功。
- 禁止把平台播放器实例通过 slot 或 expose 交给业务。
- 禁止为某一端删除其它端的原生能力；必须条件编译隔离。
- 禁止宣称已经完成非 Web 真机验证。

---

## 10. 后续扩展顺序

首版稳定后，按以下顺序评估，且每项都要重新核对最新官方兼容表：

1. `loadedmetadata` 与更完整的媒体信息状态
2. 弹幕参数和 `sendDanmu`
3. HarmonyOS `fullscreen-controls` 插槽
4. HarmonyOS 列表 `recycle` / `reuse`
5. 原生手势能力透传
6. 画中画
7. 播放列表或清晰度切换

扩展原则仍是：行为能力可以增加，默认控制 UI 不进入 `nax-video`。
