# docs-site 线上部署手册

本手册供 AI 助手与协作者将 `docs-site`（VitePress 组件文档站）发布到线上环境时使用。

> **硬约束：只有在用户明确要求发布线上（如"发布上线 / 部署到线上 / 更新线上文档"）时，AI 才可以执行本手册的部署步骤。**
> 本地预览、构建、静态检查不视为发布。用户未明确要求时，不得上传服务器、不得改动线上文件。

---

## 1. 环境信息

| 项目 | 值 | 说明 |
|------|----|------|
| 站点地址 | `https://nax-ui.cn`（`www.nax-ui.cn` 同站） | 备案域名，ICP：鲁ICP备2026046667号-1 |
| 服务器 | 腾讯云 `110.42.251.203` | Ubuntu 24.04 |
| SSH 用户 | `ubuntu`（sudo 免密） | **root 密码登录被禁用**；密码由用户提供，不写入本仓库 |
| 网站根目录 | `/var/www/nax-ui-docs` | nginx 静态托管 |
| nginx 配置 | `/etc/nginx/sites-available/nax-ui-docs` | 已启用，`try_files $uri $uri.html $uri/ =404`（cleanUrls 必需） |
| HTTPS | Let's Encrypt（certbot 管理） | 自动续期（`certbot.timer`），无需人工干预 |
| 安全组 | 80 / 443 已放行 | 若新增端口需用户在腾讯云控制台放行 |

SSH 凭据：密码不在仓库中存储。AI 执行部署时，密码从用户当次会话获取，或由用户通过环境变量提供；不得把密码写入任何提交到仓库的文件。

---

## 2. 部署流程（全流程）

### 2.1 本地构建

在 `docs-site/` 目录执行（会依次跑生成脚本、同步 demo、VitePress 构建、合并 demo 资源）：

```powershell
npm run build
```

产物输出到 `docs-site/.vitepress/dist`。构建成功标志：日志出现 `build complete in xxx s` 与 `demo 根级资源合并完成`。

### 2.2 打包

将 dist 打成单个 tar.gz，便于单文件上传：

```powershell
tar -czf C:\Users\DELL\AppData\Local\Temp\opencode\nax-ui-docs.tar.gz -C docs-site\.vitepress\dist .
```

### 2.3 上传并解压

本机无 plink/pscp 时使用 Posh-SSH（密码认证）：

```powershell
Import-Module Posh-SSH
$pw = ConvertTo-SecureString '<用户提供的密码>' -AsPlainText -Force
$cred = New-Object System.Management.Automation.PSCredential('ubuntu', $pw)

# 上传
$sftp = New-SFTPSession -ComputerName 110.42.251.203 -Credential $cred -AcceptKey -ConnectionTimeout 30
Set-SFTPItem -SessionId $sftp.SessionId -Path '<tar 包本地路径>' -Destination '/tmp'
Remove-SFTPSession -SessionId $sftp.SessionId

# 服务器端：备份当前版本 → 清空目录 → 解压 → 清理
$s = New-SSHSession -ComputerName 110.42.251.203 -Credential $cred -AcceptKey -ConnectionTimeout 20
$cmds = @(
  'sudo cp -r /var/www/nax-ui-docs /var/www/nax-ui-docs.bak.$(date +%Y%m%d%H%M%S)',
  'sudo rm -rf /var/www/nax-ui-docs && sudo mkdir -p /var/www/nax-ui-docs',
  'sudo tar -xzf /tmp/nax-ui-docs.tar.gz -C /var/www/nax-ui-docs',
  'sudo rm -f /tmp/nax-ui-docs.tar.gz'
)
foreach ($c in $cmds) { (Invoke-SSHCommand -SessionId $s.SessionId -Command $c).Output }
Remove-SSHSession -SessionId $s.SessionId
```

> nginx 无需 reload：站点是纯静态文件，文件就位即生效。

### 2.4 验证

```powershell
# 外网验证关键路径均返回 200
$paths = @('https://nax-ui.cn/', 'https://nax-ui.cn/guide/intro', 'https://nax-ui.cn/components/button')
foreach ($p in $paths) {
  $r = Invoke-WebRequest -Uri $p -TimeoutSec 20 -UseBasicParsing
  "$p => HTTP $($r.StatusCode)"
}
```

同时可抽查首页包含 favicon、备案号、统计脚本：

```powershell
$r = Invoke-WebRequest -Uri 'https://nax-ui.cn/' -UseBasicParsing
$html = [System.Text.Encoding]::UTF8.GetString($r.RawContentStream.ToArray())
$html.Contains('rel="icon"')     # favicon
$html.Contains('鲁ICP备2026046667号-1')  # 备案
$html.Contains('hm.baidu.com')   # 百度统计
```

### 2.5 收尾

- 删除本地临时 tar 包
- 服务器上的 `nax-ui-docs.bak.*` 备份保留最近 2~3 份即可，可手动清理更早的
- 将"已部署 + 验证结果"在回复中向用户汇报

---

## 3. 回滚

若线上异常，将最近一份备份恢复：

```powershell
# 服务器上执行
ls -d /var/www/nax-ui-docs.bak.* | tail -1   # 取最新备份
sudo rm -rf /var/www/nax-ui-docs
sudo cp -r /var/www/nax-ui-docs.bak.<时间戳> /var/www/nax-ui-docs
```

恢复后同样按 2.4 验证。

---

## 4. 常见问题

| 现象 | 原因 / 处理 |
|------|-------------|
| 无后缀路径（如 `/guide/intro`）404 | nginx `try_files` 缺少 `$uri.html`。当前配置已含，若被改回需恢复 `try_files $uri $uri.html $uri/ =404;` |
| 外网 HTTPS 超时、服务器本机正常 | 腾讯云安全组未放行 443。需用户在控制台放行（服务器防火墙 ufw 当前未启用） |
| 证书过期 | certbot 自动续期已配置；检查 `sudo systemctl list-timers \| grep certbot` 确认 timer 存活 |
| `nginx -t` 失败 | 多半是配置语法/路径问题，恢复备份配置或比对 2 节环境信息中的配置要点 |
| 中文页面内容乱码 | PowerShell 读取响应用 `RawContentStream` + UTF8 解码，勿直接读 `.Content` |
| SFTP 直写 `/etc/` 失败 | `/etc/` 需 sudo；先上传 `/tmp` 再用 `sudo mv` |

---

## 5. 与其它流程的边界

- **组件包改动**（`uni_modules/nax-*`）不影响 docs-site 部署；若组件 API 变化，先按 `AGENTS.md` 5.1/5.2 更新 changelog 与技能包，再重新构建文档站。
- **文档站内容改动**（guide / components 源 md、主题样式、配置）→ 本地 `npm run build` 可先在 `npm run preview` 预览验证，确认后按本手册发布。
- **发布时机**：始终以用户明确指令为准；未要求发布时，改动停留在工作区即可。