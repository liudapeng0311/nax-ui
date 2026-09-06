## 0.1.0

- 首个版本：AST 渲染器、通用文档页、侧边栏/目录/搜索、深色模式、代码复制、图片预览
- 内置内容 Provider（LocalContentProvider）
- uniCloud 远程 Provider：持久缓存（按 releaseId 隔离）、断网回退缓存/内置快照、页面 checksum 校验、schemaVersion 与 minClientVersion 错误码（CLIENT_UPGRADE_REQUIRED 升级引导）
- 注意：UTS 侧 checksum 依赖 JSON 序列化与 Node 端一致，真机验证前若出现 CHECKSUM_MISMATCH 可通过 Provider 选项 `verifyChecksum: false` 临时关闭
