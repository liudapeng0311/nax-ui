## 0.1.3（2026-07-18）

- 修复鸿蒙键盘遮挡：对齐 nax-input，高度改为写在原生 textarea 上的明确 px，去掉 height:100% 与 translateY 兜底（鸿蒙 height 百分比会导致键盘上推测高失败）

## 0.1.2（2026-07-18）

- （已回退）鸿蒙 translateY 兜底方案无效

## 0.1.1（2026-07-18）

- 修复回车失焦无法换行：confirm-type 默认由 done 改为 return

## 0.1.0（2026-07-18）

- 初版 nax-textarea 多行文本域