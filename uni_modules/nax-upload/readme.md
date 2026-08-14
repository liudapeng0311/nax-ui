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

## 基础用法

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

## fileList 项结构

| 字段 | 类型 | 说明 |
|------|------|------|
| url | string | 预览地址 / 本地临时路径 / 远程地址 |
| thumb | string | 视频封面；空则用 url |
| name | string | 文件名 |
| type | string | `image` / `video` / `file` |
| size | number | 字节大小 |
| status | string | `''` / `ready` / `uploading` / `success` / `failed` |
| message | string | 状态文案（如「上传中…」「失败」） |

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| fileList | Array | `[]` | 文件列表（受控） |
| accept | string | `image` | `image` / `video` / `media` |
| capture | string | `album,camera` | 图片来源，逗号分隔 `album` / `camera` |
| compressed | boolean | `true` | 是否压缩图片（sizeType） |
| camera | string | `back` | 仅相机时默认前后置（透传，按端支持） |
| maxCount | number | `52` | 最多可选数量 |
| maxSize | number | `0` | 单文件大小上限（字节）；`0` 不限制；超限触发 oversize |
| previewFullImage | boolean | `true` | 点击图片是否全屏预览 |
| multiple | boolean | `false` | 是否多选 |
| disabled | boolean | `false` | 禁用 |
| deletable | boolean | `true` | 显示删除按钮 |
| imageMode | string | `aspectFill` | 预览图 mode |
| name | string | `file` | 标识，透传到事件 |
| sizeType | string | `''` | 覆盖 compressed：`original` / `compressed` / `original,compressed` |
| uploadText | string | `''` | 添加按钮文案 |
| uploadIcon | string | `plus` | 添加按钮图标（nax-icon） |
| width | string | `80` | 预览格宽度（纯数字补 px） |
| height | string | `80` | 预览格高度 |
| previewImage | boolean | `true` | 是否展示预览列表 |
| useBeforeRead | boolean | `false` | 为 true 时先触发 beforeRead，业务确认后再调 `confirmRead` |
| autoUpload | boolean | `false` | 为 true 且配置 action 时，选图后自动 uni.uploadFile |
| action | string | `''` | 上传接口地址（autoUpload 时必填） |
| header | object | `{}` | 上传请求头 |
| formData | object | `{}` | 上传额外表单字段 |
| customClass | string | `''` | 根节点扩展 class |

## Events

| 事件 | 说明 | 参数 |
|------|------|------|
| update:fileList | 列表变化（删除时） | `any[]` |
| afterRead | 选择完成 | `{ file, files, name, index }` |
| beforeRead | useBeforeRead 时拦截 | `{ file, files, name, index }` |
| oversize | 超出 maxSize | `{ file, files, name }` |
| delete | 删除一项 | `{ index, file, name, fileList }` |
| beforeDelete | 删除前 | `{ index, file, name }` |
| clickPreview | 点击预览项 | `{ index, file, name, url }` |
| success | 自动上传成功 | `{ index, file, name, data, url }` |
| fail | 自动上传失败 | `{ index, file, name, error }` |

## Methods（组件 ref）

| 方法 | 说明 |
|------|------|
| chooseFile | 手动唤起选择 |
| confirmRead | useBeforeRead 场景下确认继续（参数同 afterRead 载荷） |

## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义添加按钮（替换默认「+」格） |


## 自动上传

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

## 暗色主题

暗色主题时，请通过 `custom-class` 传入 `nax-theme-dark`；组件会在内部使用对应的深色背景、边框、图标和文字色，未传入时使用浅色样式。



## 主题

通过 CSS 变量覆盖：

| Token | 用途 |
|-------|------|
| `--nax-color-bg-hover` | 按压/悬停背景色 |
| `--nax-color-bg-secondary` | 次级背景色 |
| `--nax-color-border` | 边框色 |
| `--nax-color-text-placeholder` | 占位文字色 |
| `--nax-color-text-secondary` | 次要文字色 |
| `--nax-opacity-disabled` | 禁用透明度 |
| `--nax-upload-border-color` | 上传项边框色 |
| `--nax-upload-item-bg` | 上传项背景色 |
| `--nax-upload-item-radius` | 上传项圆角 |

