
# nax-upload

> 当前版本：0.1.14

`nax-ui` 上传组件（uni-app x / uvue）。提供文件列表预览、选择、删除与状态展示能力。实际上传由业务在 `afterRead` 中调用 `uni.uploadFile` 等完成。

## 安装

- 插件市场：[nax-upload](https://ext.dcloud.net.cn/plugin?id=29075)

easycom 自动生效，页面直接使用 `<nax-upload />` 即可。

> 建议同时安装主题包 `uni_modules/nax-ui-theme` 并在 `App.uvue` 引入主题变量，详见 [主题接入](/guide/theme)。

## 代码示例

### 基础用法
```demo demo-upload
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

### 暗色主题
暗色主题时，请通过 `custom-class` 传入 `nax-theme-dark`；组件会在内部使用对应的深色背景、边框、图标和文字色，未传入时使用浅色样式。

### 基础用法
```uvue
<nax-upload
	:file-list="basicList"
	:max-count="6"
	multiple
	name="basic"
	@after-read="onBasicAfterRead"
	@delete="onBasicDelete"
	@oversize="onOversize"
></nax-upload>
```

```uts
const basicList = ref([] as any[])

function onBasicAfterRead(e : any) {
	// 选择完成：从 e.files（或 e.file）取文件追加到列表
	basicList.value = appendFiles(basicList.value, e)
}

function onBasicDelete(e : any) {
	basicList.value = applyDelete(basicList.value, e)
}

function onOversize(_e : any) {
	uni.showToast({
		title: '文件过大',
		icon: 'none'
	})
}

// 通用工具：合并 after-read 文件（App UTS 不能对 any 访问 .value）
function appendFiles(list : any[], e : any) : any[] {
	const payload = e as UTSJSONObject
	const files = payload.getArray('files')
	const next = cloneList(list)
	if (files != null) {
		var i = 0
		while (i < files.length) {
			next.push(files[i] as any)
			i++
		}
	} else {
		const file = payload.getAny('file')
		if (file != null) {
			next.push(file)
		}
	}
	return next
}

// 通用工具：删除项（e.fileList 优先，否则按 e.index）
function applyDelete(list : any[], e : any) : any[] {
	const payload = e as UTSJSONObject
	const next = payload.getArray('fileList')
	if (next != null) {
		return next as any[]
	}
	const idx = payload.getNumber('index')
	if (idx == null) {
		return list
	}
	const out = [] as any[]
	var i = 0
	while (i < list.length) {
		if (i != idx) {
			out.push(list[i])
		}
		i++
	}
	return out
}

function cloneList(list : any[]) : any[] {
	const out = [] as any[]
	var i = 0
	while (i < list.length) {
		out.push(list[i])
		i++
	}
	return out
}
```

### 限制数量 maxCount=3
```uvue
<nax-upload
	:file-list="limitList"
	:max-count="3"
	multiple
	upload-text="上传"
	@after-read="onLimitAfterRead"
	@delete="onLimitDelete"
></nax-upload>
```

```uts
const limitList = ref([] as any[])

function onLimitAfterRead(e : any) {
	limitList.value = appendFiles(limitList.value, e)
}

function onLimitDelete(e : any) {
	limitList.value = applyDelete(limitList.value, e)
}

// appendFiles / applyDelete 见「基础用法」
```

### 状态展示（uploading / failed / success）
```uvue
<nax-upload
	:file-list="statusList"
	:max-count="4"
	:deletable="true"
	@delete="onStatusDelete"
></nax-upload>
```

```uts
const statusList = ref([
	{
		url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
		status: 'uploading',
		message: '上传中',
		type: 'image'
	} as UTSJSONObject,
	{
		url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
		status: 'failed',
		message: '失败',
		type: 'image'
	} as UTSJSONObject,
	{
		url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
		status: 'success',
		message: '',
		type: 'image'
	} as UTSJSONObject
] as any[])

function onStatusDelete(e : any) {
	statusList.value = applyDelete(statusList.value, e)
}
```

### 禁用 disabled
```uvue
<nax-upload :file-list="disabledList" disabled :max-count="4"></nax-upload>
```

```uts
const disabledList = ref([
	{
		url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
		status: 'success',
		message: '',
		type: 'image'
	} as UTSJSONObject
] as any[])
```

### 自定义尺寸 / 不可删除
```uvue
<nax-upload
	:file-list="sizeList"
	width="100"
	height="100"
	:deletable="false"
	:max-count="4"
	@after-read="onSizeAfterRead"
></nax-upload>
```

```uts
const sizeList = ref([] as any[])

function onSizeAfterRead(e : any) {
	sizeList.value = appendFiles(sizeList.value, e)
}
```

### 自定义添加按钮（slot）
```uvue
<nax-upload
	:file-list="slotList"
	:max-count="5"
	@after-read="onSlotAfterRead"
	@delete="onSlotDelete"
>
	<view class="custom-add">
		<nax-icon name="image" size="lg" color="#18a058"></nax-icon>
		<text class="custom-add__text">添加图片</text>
	</view>
</nax-upload>
```

```uts
const slotList = ref([] as any[])

function onSlotAfterRead(e : any) {
	slotList.value = appendFiles(slotList.value, e)
}

function onSlotDelete(e : any) {
	slotList.value = applyDelete(slotList.value, e)
}
```

### 自动上传 autoUpload
```uvue
<nax-upload
	:file-list="autoList"
	auto-upload
	:action="uploadAction"
	:max-count="4"
	multiple
	name="file"
	@update:file-list="onAutoFileList"
	@after-read="onAutoAfterRead"
	@success="onAutoSuccess"
	@fail="onAutoFail"
	@delete="onAutoDelete"
></nax-upload>
```

```uts
const autoList = ref([] as any[])
const uploadAction = ref('https://your-server.com/upload')
const autoEvent = ref('等待自动上传')

function onAutoFileList(list : any) {
	if (list == null) {
		autoList.value = [] as any[]
		return
	}
	autoList.value = list as any[]
}

function onAutoAfterRead(_e : any) {
	autoEvent.value = 'afterRead（随后自动上传）'
}

function onAutoSuccess(e : any) {
	const payload = e as UTSJSONObject
	const url = payload.getString('url')
	autoEvent.value = 'success: ' + (url != null ? url : '')
}

function onAutoFail(_e : any) {
	autoEvent.value = 'fail: 上传失败'
}

function onAutoDelete(e : any) {
	autoList.value = applyDelete(autoList.value, e)
}
```

### 模拟上传进度
```uvue
<nax-upload
	:file-list="mockList"
	:max-count="6"
	multiple
	@after-read="onMockAfterRead"
	@delete="onMockDelete"
></nax-upload>
```

```uts
const mockList = ref([] as any[])

function onMockAfterRead(e : any) {
	// 先把新文件置为 uploading，再模拟异步上传成功
	const payload = e as UTSJSONObject
	const files = payload.getArray('files')
	if (files == null) {
		return
	}
	const next = [] as any[]
	var i = 0
	while (i < files.length) {
		const raw = files[i] as UTSJSONObject
		const url = raw.getString('url')
		next.push({
			url: url != null ? url : '',
			thumb: url != null ? url : '',
			type: 'image',
			status: 'uploading',
			message: '上传中'
		} as UTSJSONObject)
		i++
	}
	const start = mockList.value.length
	const merged = cloneList(mockList.value)
	var j = 0
	while (j < next.length) {
		merged.push(next[j])
		j++
	}
	mockList.value = merged

	// 模拟异步上传完成
	const end = merged.length
	setTimeout(() => {
		const cur = cloneList(mockList.value)
		var k = start
		while (k < end && k < cur.length) {
			const it = cur[k] as UTSJSONObject
			const u = it.getString('url')
			cur[k] = {
				url: u != null ? u : '',
				thumb: u != null ? u : '',
				type: 'image',
				status: 'success',
				message: ''
			} as UTSJSONObject
			k++
		}
		mockList.value = cur
	}, 1200)
}

function onMockDelete(e : any) {
	mockList.value = applyDelete(mockList.value, e)
}
```

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

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| fileList | array | `() => [] as any[]` | 文件列表（受控） |
| accept | string | `'image'` | `image` 图片 \| `video` 视频 \| `media` 媒体 |
| capture | string | `'album` | `album` 相册 \| `camera` 相机（逗号分隔可组合） |
| compressed | boolean | `true` | 是否压缩图片 |
| camera | string | `'back'` | `back` 后置 \| `front` 前置（按端支持） |
| maxCount | number | `52` | 最多数量 |
| maxSize | number | `0` | 单文件最大字节 |
| previewFullImage | boolean | `true` | 点击全屏预览 |
| multiple | boolean | `false` | 多选 |
| disabled | boolean | `false` | 禁用 |
| deletable | boolean | `true` | 可删除 |
| imageMode | string | `'aspectFill'` | image mode |
| name | string | `'file'` | 标识，透传事件 |
| sizeType | string | `''` | `original` 原图 \| `compressed` 压缩 \| `original,compressed` 两者皆可；空则跟随 compressed |
| uploadText | string | `''` | 添加文案 |
| uploadIcon | string | `'plus'` | 添加图标 |
| width | string | `'80'` | 预览格宽 |
| height | string | `'80'` | 预览格高 |
| previewImage | boolean | `true` | 是否展示预览 |
| useBeforeRead | boolean | `false` | 先 beforeRead 再 confirmRead |
| autoUpload | boolean | `false` | 为 true 且配置 `action` 时，选择文件后自动 `uni.uploadFile` |
| action | string | `''` | 上传接口地址（autoUpload 时必填） |
| header | object | `() => ({} as UTSJSONObject)` | 上传请求头 |
| formData | object | `() => ({} as UTSJSONObject)` | 上传表单附加字段 |
| customClass | string | `''` | 扩展 class |

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

## Events

| 事件 | 说明 |
|------|------|
| update:fileList | 列表变化（增删）时 |
| afterRead | 选择文件后（参数 `{ file, files, name, index }`） |
| beforeRead | useBeforeRead 时先触发（参数 `{ file, files, name, index }`） |
| oversize | 超过 `maxSize`（参数 `{ file, files, name }`） |
| delete | 删除一项（参数 `{ index, file, name, fileList }`） |
| beforeDelete | 删除前（参数 `{ index, file, name }`） |
| clickPreview | 点击预览（参数 `{ index, file, name, url }`） |
| success | 自动上传成功（参数 `{ index, file, name, data, url }`） |
| fail | 自动上传失败 |
| progress | 自动上传进度 |

## Slots

| 插槽 | 说明 |
|------|------|
| default | 自定义添加按钮 |

## Methods（组件 ref）

| 方法 | 说明 |
|------|------|
| chooseFile | 手动唤起选择 |
| confirmRead | useBeforeRead 场景下确认继续（参数同 afterRead 载荷） |
