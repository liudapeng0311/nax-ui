## 0.1.16 (2026-07-29)
- 修复 `nax-notice-bar.uvue` 中的中文注释乱码，不影响组件 API 和运行行为。

## 0.1.15 (2026-07-29)
- 移除第三方组件库参考表述，完善独立组件文档。

## 0.1.14（2026-07-23）

- 修复鸿蒙无缝滚动后半段文案被裁切：测宽取 `max(测量, 字数估算)`；鸿蒙 seg 取消 overflow 裁剪

## 0.1.13（2026-07-23）

- 鸿蒙通告文案：`font-family: HarmonyOS Sans`，配合 nax-icon 字体 codepage 修复，避免英文（如 CSS）空白

## 0.1.12（2026-07-23）

- 修复鸿蒙等 App 端通告文案中英文（如 CSS）不显示：文本显式 `font-family: sans-serif`，避免图标字体抢占

## 0.1.11（2026-07-23）

- 修复 `separator` 默认值乱码导致多条公告拼接显示异常

﻿## 0.1.10（2026-07-23）
- 鸿蒙：页面卸载 / Tab 切换时先置 hostAlive=false，停止动画时不再调用 UniElement.animate / setProperty，避免 unmounted 阶段 Cannot read property context of undefined
- Android / iOS / Web 行为不变
## 0.1.9锛?026-07-21锛?
- 楦胯挋琛旀帴锛氭寜瀹樻柟鏂囨。鏀逛负 `UniElement.animate`锛?鈫?half 绾挎€ц繎浼兼棤闄愬惊鐜級涓轰富璺緞锛屾秷闄?setInterval/Vue `:style` 楂橀閲嶇粯鎺夊抚
- 娴嬪鏈畬鎴愭椂 `translateX(0)` 闈欐€佸睍绀猴紝閬垮厤銆屽厛绌虹櫧鍐嶄粠鍙充晶婊氳繘銆嶏紱鍗婂 `Math.round` 闄嶄綆鎺ョ紳寰烦
- 鍏冪礌鏈氨缁椂鍥為€€ `requestAnimationFrame` + `style.setProperty` 妯″洖缁曪紙璇箟鍚?setInterval锛?
- 楦胯挋鍋滄鍔ㄧ敾锛?ms `animate` 椤舵帀锛圴DOM 涓嶈繑鍥炲姩鐢诲疄渚嬶級锛汚ndroid/iOS/Web 琛屼负涓嶅彉

## 0.1.8锛?026-07-21锛?
- 楦胯挋琛旀帴锛氬彇娑堛€屾暣娈?transition 0鈫?half銆嶅惊鐜紙浼氱┖鐧姐€佷粠鍙虫粴杩涖€佷腑閫旇烦娈碉級
- 鎭㈠涓?setInterval 鐩稿悓鐨勮繛缁?-step 妯″洖缁曡涔夛紱楦胯挋鐢?80ms 姝ヨ繘 + 鐭?linear transition 鎻掑€煎噺杞绘帀甯э紝鍥炵粫鐬棿 duration=0
- 鏈疄娴嬪搴﹀墠涓嶅啀寮哄埗娈靛锛岄伩鍏嶄及绠楄繃瀹藉鑷村厛绌虹櫧锛涢缚钂欏鍔犲彲瑙佹娴嬪鍥為€€
## 0.1.7锛?026-07-21锛?
- 楦胯挋琛旀帴锛氭敼涓?CSS transition 鏁存绾挎€ф粦鍔紙鍙屾 0 鈫?-half 寰幆锛夛紝娑堥櫎 setInterval 楂橀鏀?transform 鎺夊抚锛?ifdef APP-HARMONY锛?
- 濮嬬粓鍐欏叆 transition-property / duration / timing-function:linear锛岄伩鍏嶇┖ timing 璀﹀憡
- Android / iOS 浠嶄负 timer 妯″洖缁曪紱Web / 灏忕▼搴忎粛涓?CSS keyframes
## 0.1.6锛?026-07-21锛?
- 楦胯挋锛氭仮澶嶆按骞宠鎺ヤ粠鍙冲悜宸﹁窇椹伅锛堝彇娑堝己鍒堕檷绾т负 swiper 姝ヨ繘锛?
- App 琛旀帴锛氭祴瀹芥湭瀹屾垚鏃剁珛鍗崇敤浼扮畻寮€婊氾紝閬垮厤涓€鐩撮潤姝紱tick 鍐呰礋鍚?translateX 寰幆
- Web / Android / iOS 琛屼负涓嶅彉
## 0.1.5锛?026-07-21锛?

- 楦胯挋锛氭按骞宠鎺ワ紙seamless锛夐檷绾т负鍘熺敓 swiper 姝ヨ繘锛屾秷闄ゆ姌琛屽彔瀛椾笌 timer 鎺夊抚锛坄#ifdef APP-HARMONY`锛?
- 鍏ㄦ枃妗堝己鍒跺崟琛?`:lines="1"` + 鍥哄畾 22px 琛岄珮锛岄伩鍏嶅琛屾姌鍙?
- Web / Android / iOS 琛旀帴璺戦┈鐏€昏緫涓嶅彉

## 0.1.4锛?026-07-21锛?

- 楦胯挋琛旀帴锛氬彇娑堟暣娈?CSS transition锛涘弻娈垫樉寮忓搴?+ 绂诲睆娴嬪 + timer 妯″洖缁曪紝娑堥櫎銆岀┖鐧解啋浠庡彸婊氳繘鈫掓粴绌哄啀閲嶆潵銆?
- 娴嬪埌瀹藉害鍓嶉潤鎬佸睍绀哄唴瀹癸紝閬垮厤棣栧睆绌虹櫧鏁扮
- App Android/iOS 鍚屾鍚屼竴濂楀彲闈犲洖缁曪紱Web 浠嶄负 CSS -50%

## 0.1.3锛?026-07-21锛?

- 琛旀帴婊氬姩锛氬疄娴嬪崟浠芥枃妗堝搴﹀仛寰幆浣嶇Щ锛涘幓鎺?clone margin锛屾秷闄ょ涓€杞帴绗簩杞烦鍙?
- 楦胯挋锛歵ransitionend 鎺ユ寰幆锛屽浣嶄笌绗簩浠界浉浣嶅榻?

## 0.1.2锛?026-07-21锛?

- 楦胯挋锛氳鎺ユ粴鍔?transition 濮嬬粓鍐欏叆 `transition-timing-function:linear`锛屾秷闄?`transitionTimingFunction is empty` 鎻愮ず

锘?# 0.1.1锛?026-07-21锛?

- 楦胯挋锛氳鎺ユ粴鍔ㄦ敼涓?CSS transition 鏁存婊戝姩锛岄伩鍏?setInterval 楂橀鏀?transform 鎺夊抚锛坄#ifdef APP-HARMONY`锛?
- Android / iOS / Web / 灏忕▼搴忚涓轰笉鍙?

## 0.1.0锛?026-07-21锛?

- 鍒濈増 `nax-notice-bar`
- 瀵归綈  NoticeBar锛氭按骞宠鎺?/ 姘村钩姝ヨ繘 / 鍨傜洿姝ヨ繘
- type 涓婚 light 鏉?+ showIcon / showMore / closable
- 鎾斁鎺у埗锛歛utoplay / paused / playState锛沝uration / speed
- 浜嬩欢锛歝lick / close / getMore / end / update:show
- App 绔窇椹伅鏉′欢缂栬瘧 JS 鍏滃簳锛學eb/灏忕▼搴?CSS 鍔ㄧ敾

