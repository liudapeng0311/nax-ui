---
demo: upload
---

# nax-upload

`nax-ui` 上传组件（uni-app x / uvue）。
提供文件列表预览、选择、删除与状态展示能力。实际上传由业务在 `afterRead` 中调用 `uni.uploadFile` 等完成。
依赖：
```text
uni_modules/nax-icon
uni_modules/nax-ui-theme
```
easycom 自动生效。
### 推荐同时安装主题包
```css
@import "@/uni_modules/nax-ui-theme/theme/default.css";
```
页面根节点加 `class="nax-theme"`。

## 安装

```text
uni_modules/nax-upload
```

easycom 自动生效，页面直接使用 `<nax-upload />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

> 当前版本：0.1.8（见 `changelog.md`）

## 代码示例

### 基础用法

```html
<template>
  <nax-upload
    :file-list="fileList"
    :max-count="6"
    name="photos"
    @after-read="onAfterRead"
    @delete="onDelete"
  ></nax-upload>
</template>

<script setup lang="uts">
  const fileList = ref([] as any[])

  function onAfterRead(e: UTSJSONObject) {
    const files = e.getArray('files')
    // 可在此调用 uni.uploadFile，并更新 fileList 的 status / url
    const next = [] as any[]
    var i = 0
    while (i < fileList.value.length) {
      next.push(fileList.value[i])
      i++
    }
    if (files != null) {
      var j = 0
      while (j < files.length) {
        next.push(files[j])
        j++
      }
    }
    fileList.value = next
  }

  function onDelete(e: UTSJSONObject) {
    // 组件已 emit update:fileList；也可自行处理
  }
</script>
```

### fileList 项结构

| 字段 | 类型 | 说明 |
|------|------|------|
| url | string | 预览地址 / 本地临时路径 / 远程地址 |
| thumb | string | 视频封面；空则用 url |
| name | string | 文件名 |
| type | string | `image` / `video` / `file` |
| size | number | 字节大小 |
| status | string | `''` / `ready` / `uploading` / `success` / `failed` |
| message | string | 状态文案（如「上传中…」「失败」） |

### Methods（组件 ref）

| 方法 | 说明 |
|------|------|
| chooseFile | 手动唤起选择 |
| confirmRead | useBeforeRead 场景下确认继续（参数同 afterRead 载荷） |

### Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义添加按钮（替换默认「+」格） |

### 自动上传

开启 `autoUpload` 并配置 `action` 后，组件在 `afterRead` 之后自动调用 `uni.uploadFile`：

```html
<nax-upload
  v-model:file-list="fileList"
  auto-upload
  action="https://example.com/upload"
  :header="header"
  :form-data="formData"
  name="file"
  @success="onSuccess"
  @fail="onFail"
></nax-upload>
```

```uts
const fileList = ref([] as any[])
const header = ref({ Authorization: 'Bearer xxx' } as UTSJSONObject)
const formData = ref({ biz: 'avatar' } as UTSJSONObject)
```

1. 必须绑定 `v-model:file-list`，才能回写 uploading/success/failed
2. `name` 也作为 uploadFile 文件字段名
3. 成功响应尝试解析 `url` / `data.url` / `path` / `fileUrl`
4. 失败项可调 ref：`upload(index)` / `uploadAll()` / `reupload(index)`

### 主题变量

- `--nax-upload-item-bg`
- `--nax-upload-item-radius`
- `--nax-upload-border-color`
- `--nax-color-bg-secondary` / `--nax-color-text-secondary` 等语义 token

Android / 鸿蒙端（`APP-ANDROID || APP-HARMONY`）不可靠解析跨组件 CSS 变量。暗色主题时，请通过 `custom-class` 传入 `nax-theme-dark`；组件会在内部使用对应的深色背景、边框、图标和文字色，未传入时使用浅色样式。


## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| fileList | array | `() => [] as any[]` | 文件列表（受控） |
| accept | string | `'image'` | image \| video \| media |
| capture | string | `'album` | 图片来源 album,camera（逗号分隔） |
| compressed | boolean | `true` | 是否压缩图片 |
| camera | string | `'back'` | back \| front（按端支持） |
| maxCount | number | `52` | 最多数量 |
| maxSize | number | `0` | 单文件最大字节 |
| previewFullImage | boolean | `true` | 点击全屏预览 |
| multiple | boolean | `false` | 多选 |
| disabled | boolean | `false` | 禁用 |
| deletable | boolean | `true` | 可删除 |
| imageMode | string | `'aspectFill'` | image mode |
| name | string | `'file'` | 标识，透传事件 |
| sizeType | string | `''` | original / compressed / original,compressed；空则跟 compressed |
| uploadText | string | `''` | 添加文案 |
| uploadIcon | string | `'plus'` | 添加图标 |
| width | string | `'80'` | 预览格宽 |
| height | string | `'80'` | 预览格高 |
| previewImage | boolean | `true` | 是否展示预览 |
| useBeforeRead | boolean | `false` | 先 beforeRead 再 confirmRead |
| autoUpload | boolean | `false` | 预留 |
| action | string | `''` |  |
| header | object | `() => ({} as UTSJSONObject)` |  |
| formData | object | `() => ({} as UTSJSONObject)` |  |
| customClass | string | `''` | 扩展 class |


## Events

| 事件 | 说明 |
|------|------|
| update:fileList | / afterRead / beforeRead / oversize / delete / beforeDelete / clickPreview / success / fail / progress |
| afterRead |  |
| beforeRead |  |
| oversize |  |
| delete |  |
| beforeDelete |  |
| clickPreview |  |
| success |  |
| fail |  |
| progress |  |


## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义添加按钮 |
