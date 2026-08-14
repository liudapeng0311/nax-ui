# nax-video

`nax-ui` 无头视频播放器（uni-app x / uvue）。

基于原生 `<video>` + `uni.createVideoContext`，负责媒体承载、事件归一化与播放控制。**不提供** nax 风格默认控制条皮肤；通过作用域插槽自行组合 UI。

## 安装

```text
uni_modules/nax-video
```

easycom 自动生效。首版**无**运行时依赖（不强制 `nax-icon` / `nax-slider` / `nax-ui-theme`）。

## 支持平台

| 平台 | 状态 |
|------|------|
| Web | √ |
| App Android | √ |
| App HarmonyOS | √ |
| 微信小程序 | √ |
| App iOS | `-`（未验证，公共代码不故意破坏） |

能力下限按 **uni-app x 4.61**（含 HarmonyOS `video` / `createVideoContext`）。

## 基础用法（无头）

```uvue
<nax-video src="https://example.com/video.mp4" height="220">
  <template #default="{ playing, waiting, currentTime, duration, toggle, toggleFullscreen }">
    <view class="my-controls">
      <text @click="toggle">{{ playing ? '暂停' : '播放' }}</text>
      <text v-if="waiting">加载中</text>
      <text>{{ currentTime }} / {{ duration }}</text>
      <text @click="toggleFullscreen">全屏</text>
    </view>
  </template>
</nax-video>
```

## 原生控制条降级

```uvue
<nax-video src="https://example.com/video.mp4" controls height="220"></nax-video>
```

## 静音与倍速

```uvue
<nax-video
  src="https://example.com/video.mp4"
  v-model:muted="muted"
  :playback-rate="rate"
  height="220"
></nax-video>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| src | string | `''` | 视频地址；变化时重置播放状态 |
| poster | string | `''` | 封面 |
| autoplay | boolean | `false` | 自动播放；成功与否以原生 `play` 为准 |
| loop | boolean | `false` | 循环 |
| muted | boolean | `false` | 静音，支持 `v-model:muted` |
| initialTime | number | `0` | 初始位置（秒） |
| controls | boolean | `false` | 原生控制条；Headless 默认关 |
| objectFit | string | `contain` | `contain` / `fill` / `cover` |
| title | string | `''` | 全屏标题 |
| header | object | `{}` | 请求头 |
| playbackRate | number | `1` | `0.5` / `0.8` / `1` / `1.25` / `1.5` |
| fullscreenDirection | number | `90` | 请求全屏方向 `0` / `90` / `-90` |
| width | string | `100%` | 纯数字按 px |
| height | string | `225` | 纯数字按 px |
| customClass | string | `''` | 根节点扩展 class |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| play / pause / ended | 原生事件 | 播放态 |
| timeupdate | `{ currentTime, duration }` | 进度 |
| waiting | 原生事件 | 缓冲 |
| progress | 原生事件 | 加载进度透传 |
| error | `{ errCode }` | 错误 |
| fullscreenchange | `{ fullScreen, direction }` | 全屏变化 |
| controlstoggle | 原生事件 | 原生控制条显隐 |
| fullscreenclick | 原生事件 | 全屏区域点击 |
| state-change | 状态快照 | 语义状态变化时 |
| update:muted | boolean | 静音同步 |

## 方法（defineExpose / 插槽）

| 方法 | 说明 |
|------|------|
| play / pause / toggle / stop | 播放控制 |
| seek(seconds) / seekBy(delta) | 跳转 |
| setPlaybackRate(rate) | 倍速 |
| setMuted(muted) / toggleMuted | 静音 |
| requestFullscreen(direction?) / exitFullscreen / toggleFullscreen | 全屏 |
| getState() | 公共标量快照 |

## 插槽

默认作用域插槽逐项传递：`status` `playing` `waiting` `ended` `currentTime` `duration` `fullscreen` `muted` `playbackRate` `errorCode` 以及上表控制方法。

## 说明与边界

- “无头”指**控制 UI 无头**，视频仍渲染原生 `<video>`。
- 状态以原生事件为真相来源；`play()` 不会乐观把 `playing` 设为 true。
- 不提供持续受控的 `currentTime` prop，避免 `timeupdate → prop → seek` 循环。
- 不承诺可放入虚拟列表并保持播放状态。
- 不暴露 `VideoContext` / 平台播放器实例。
