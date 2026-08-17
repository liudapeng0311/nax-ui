# nax-upload

`nax-ui` 上传组件（uni-app x / uvue）。

## Props — fileList 项结构

| 字段 | 类型 | 说明 |
|---|---|---|
| url | string | 预览地址 / 本地临时路径 / 远程地址 |
| thumb | string | 视频封面；空则用 url |
| name | string | 文件名 |
| type | string | `image` / `video` / `file` |
| size | number | 字节大小 |
| status | string | `''` / `ready` / `uploading` / `success` / `failed` |
| message | string | 状态文案（如「上传中…」「失败」） |

## Props — Props

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
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
|---|---|---|
| update:fileList | 列表变化（删除时） | `any[]` |
| afterRead | 选择完成 | `{ file, files, name, index }` |
| beforeRead | useBeforeRead 时拦截 | `{ file, files, name, index }` |
| oversize | 超出 maxSize | `{ file, files, name }` |
| delete | 删除一项 | `{ index, file, name, fileList }` |
| beforeDelete | 删除前 | `{ index, file, name }` |
| clickPreview | 点击预览项 | `{ index, file, name, url }` |
| success | 自动上传成功 | `{ index, file, name, data, url }` |
| fail | 自动上传失败 | `{ index, file, name, error }` |

## Slots

| 插槽 | 说明 |
|---|---|
| default | 自定义添加按钮（替换默认「+」格） |

## Methods（ref 调用）

| 方法 | 说明 |
|---|---|
| chooseFile | 手动唤起选择 |
| confirmRead | useBeforeRead 场景下确认继续（参数同 afterRead 载荷） |
