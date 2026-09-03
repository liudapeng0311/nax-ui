# -*- coding: utf-8 -*-
"""从 nax-ui 组件 readme.md 提取结构化 API 参考，生成技能包 references。

每个组件输出一个精简卡：定位语 + 用法示例 + Props/Events/Slots/Methods 表格 + 依赖 + 平台说明。

用法：
    python gen-nax-refs.py <组件库uni_modules目录> <输出目录>
    例：python gen-nax-refs.py F:/work/mine/nax-ui/uni_modules references/components

说明：
    - 排除 nax-ui / nax-ui-theme / nax-video（技能包不含这三个）
    - 组件卡由 readme.md 自动生成；组件索引（component-index.md）与 SKILL.md 需手动同步
"""
import os
import re
import json
import sys

ROOT = r"F:\work\mine\nax-ui\uni_modules"
OUT = r"F:\work\mine\nax-ui-skill-build\references\components"

if len(sys.argv) >= 3:
    ROOT = sys.argv[1]
    OUT = sys.argv[2]

# 分类：组件名 -> (分类, 一句话)
# 分类与 component-inventory 对齐
CATEGORY = {}

def parse_readme(path):
    with open(path, "r", encoding="utf-8-sig") as f:
        lines = f.read().splitlines()
    return lines

def extract(lines):
    """从 readme 行列表提取结构化内容。"""
    # 1. 定位语：# 标题后的第一个非空段落（跳过以"`nax-ui`"开头那种？保留原样）
    title = ""
    intro = ""
    for i, ln in enumerate(lines):
        if ln.startswith("# "):
            title = ln[2:].strip()
            # 找后面第一个非空行开始的连续段落
            j = i + 1
            paras = []
            while j < len(lines):
                l = lines[j].strip()
                if l == "":
                    if paras:
                        break
                elif l.startswith("#"):
                    break
                else:
                    paras.append(l)
                j += 1
            intro = " ".join(paras)
            break

    # 2. 章节切分（## 及 ###）
    sections = []  # (level, heading, start_idx)
    for i, ln in enumerate(lines):
        m = re.match(r"^(#{2,4})\s+(.*)$", ln)
        if m:
            sections.append((len(m.group(1)), m.group(2).strip(), i))

    def section_content(title_re, level=2):
        """返回匹配标题之后的表格/列表/代码块内容（原样行）。"""
        for idx, (lv, h, si) in enumerate(sections):
            if lv == level and re.search(title_re, h, re.I):
                end = sections[idx + 1][2] if idx + 1 < len(sections) else len(lines)
                return lines[si + 1:end]
        return []

    def tables(block):
        """把行块中的 markdown 表格解析为 list[list[str]]。"""
        out = []
        cur = None
        in_fence = False
        for l in block:
            if l.strip().startswith("```"):
                in_fence = not in_fence
                if not in_fence:
                    if cur is not None:
                        out.append(cur)
                        cur = None
                continue
            if in_fence:
                continue
            s = l.strip()
            if s.startswith("|") and s.endswith("|"):
                # 先保护 \| 转义管道符，避免误拆列
                esc = s.replace(r"\|", "\x00")
                cells = [c.strip().replace("\x00", r"\|") for c in esc.strip("|").split("|")]
                if all(re.fullmatch(r":?-{3,}:?", c) for c in cells):
                    continue  # 分隔行
                if cur is None:
                    cur = []
                cur.append(cells)
            else:
                if cur is not None:
                    out.append(cur)
                    cur = None
        if cur is not None:
            out.append(cur)
        return out

    def code_blocks(block, max_n=2):
        out = []
        buf = []
        in_fence = False
        fence_char = None
        for l in block:
            if not in_fence and l.strip().startswith("```"):
                in_fence = True
                buf = []
                continue
            if in_fence:
                if l.strip().startswith("```"):
                    in_fence = False
                    out.append("\n".join(buf))
                    if len(out) >= max_n:
                        break
                else:
                    buf.append(l)
        return out

    def list_items(block):
        out = []
        in_fence = False
        for l in block:
            if l.strip().startswith("```"):
                in_fence = not in_fence
                continue
            if in_fence:
                continue
            s = l.strip()
            if re.match(r"^[-*]\s+", s):
                out.append(re.sub(r"^[-*]\s+", "", s))
        return out

    # 3. 找用法示例：优先包含 `<nax-` 标签的代码块（安装块 uni_modules/ 跳过）
    first_props = len(lines)
    for idx, (lv, h, si) in enumerate(sections):
        if lv == 2 and re.search(r"props", h, re.I):
            first_props = si
            break
    use_block = lines[1:first_props]
    candidates = code_blocks(use_block, max_n=10)
    examples = []
    tagged = [cb for cb in candidates if "<nax-" in cb]
    pool = tagged + [cb for cb in candidates if cb not in tagged and "import" in cb]
    for cb in pool:
        # 跳过安装说明块（整块只有 uni_modules/ 路径或含 'easycom' 字样）
        if all("uni_modules/" in ln or "easycom" in ln or ln.strip() == "" for ln in cb.splitlines()):
            continue
        if len(cb.splitlines()) < 25:
            examples.append(cb)
        if len(examples) >= 2:
            break

    def markdown_table(rows):
        if not rows:
            return ""
        header = rows[0]
        lines_ = ["| " + " | ".join(header) + " |",
                  "|" + "|".join(["---"] * len(header)) + "|"]
        for r in rows[1:]:
            r = r + [""] * (len(header) - len(r))
            lines_.append("| " + " | ".join(r) + " |")
        return "\n".join(lines_)

    def pick_tables(keys, level=2):
        """在匹配 level 标题下收集表格，若第一个表头包含任一关键字则保留。
        level=0 表示搜索所有 2/3 级标题。"""
        res = []
        for key in keys:
            found = False
            for idx, (lv, h, si) in enumerate(sections):
                if lv not in (2, 3):
                    continue
                if level and lv != level:
                    continue
                if not re.search(key, h, re.I):
                    continue
                end = sections[idx + 1][2] if idx + 1 < len(sections) else len(lines)
                for t in tables(lines[si + 1:end]):
                    if len(t) >= 1 and t[0]:
                        head = " ".join(t[0]).lower()
                        if any(k in head for k in keys):
                            res.append((key, t))
                            found = True
                            break
                if found:
                    break
        return res

    def pick_tables_by_header(header_kw, exclude_kw=()):
        """扫描全部 2/3 级标题下的所有表格，按表头第一列关键字分类收集（不依赖标题名）。"""
        res = []
        for idx, (lv, h, si) in enumerate(sections):
            if lv not in (2, 3):
                continue
            end = sections[idx + 1][2] if idx + 1 < len(sections) else len(lines)
            for t in tables(lines[si + 1:end]):
                if len(t) < 1 or not t[0]:
                    continue
                col1 = t[0][0].lower()
                if not any(k in col1 for k in header_kw):
                    continue
                if exclude_kw and any(k in col1 for k in exclude_kw):
                    continue
                res.append((h, t))
        return res

    def pick_lists(keys, level=2):
        res = []
        for key in keys:
            block = section_content(key, level)
            items = list_items(block)
            if items:
                res.append((key, items))
        return res

    def pick_code(keys, level=2, max_n=1):
        res = []
        for key in keys:
            block = section_content(key, level)
            cbs = code_blocks(block, max_n=max_n)
            if cbs:
                res.append((key, cbs))
        return res

    # 表格分类：按表头内容归类（属性/事件/插槽/方法），跨标题名
    props_all = pick_tables_by_header(
        ["属性", "入参", "字段", "参数", "prop", "值"], ["事件", "说明", "返回值", "插槽"])
    events_all = pick_tables_by_header(["事件"], ["属性", "入参", "字段"])
    slots_all = pick_tables_by_header(["插槽", "slot", "名称"], ["属性", "字段", "类型", "参数", "默认", "事件"])
    methods_all = pick_tables_by_header(["方法"], ["属性", "字段", "事件"])

    # 函数式 API（如 naxToastSuccess(title)）——三级标题下的列表或代码块
    funcs = []
    for idx, (lv, h, si) in enumerate(sections):
        if lv != 3:
            continue
        if not re.search(r"(api|方法|快捷|函数)", h, re.I):
            continue
        end = sections[idx + 1][2] if idx + 1 < len(sections) else len(lines)
        block = lines[si + 1:end]
        items = []
        for it in list_items(block):
            clean = it.strip("`")
            if re.search(r"^\w+\(.*\)$", clean):
                items.append(clean)
        if items:
            funcs.append((h, items))
    methods_extra = []
    if funcs:
        methods_extra = [("函数式 API", funcs)]

    return {
        "title": title,
        "intro": intro,
        "examples": examples,
        "props": props_all,
        "events": events_all,
        "slots": slots_all,
        "methods": methods_all + methods_extra,
        "deps": pick_lists(["依赖"]),
        "platform": pick_lists(["平台说明", "平台差异", "注意事项"]),
        "tokens": pick_tables(["token", "主题"]),
    }

def render_component(name, data, extra_note=""):
    parts = []
    parts.append(f"# {data['title'] or name}")
    parts.append("")
    if data["intro"]:
        parts.append(data["intro"])
        parts.append("")
    if extra_note:
        parts.append(f"> 说明：{extra_note}")
        parts.append("")
    if name == "nax-icon":
        readme = os.path.join(ROOT, name, "readme.md")
        lines_ = parse_readme(readme)
        # 提取"## 当前支持的图标"章节的 text 代码块（必须匹配二级标题，避免误撞 Props 说明文字）
        for i, ln in enumerate(lines_):
            if ln.strip().startswith("## ") and "当前支持的图标" in ln:
                seg = lines_[i + 1:]
                for j, l2 in enumerate(seg):
                    if l2.strip().startswith("```"):
                        buf = []
                        for l3 in seg[j + 1:]:
                            if l3.strip().startswith("```"):
                                break
                            buf.append(l3)
                        parts.append("## 支持的图标名")
                        parts.append("")
                        parts.append("```text")
                        parts.extend(buf)
                        parts.append("```")
                        parts.append("")
                        parts.append("> `name` 仅支持以上图标名，不要使用列表中不存在的名字，否则渲染为空白；自定义图标用 `glyph` + `font-family`（glyph 支持直接粘贴 iconfont 码位，如 `&amp;#xe6cf;`）。")
                        parts.append("")
                        break
                break
    if data["examples"]:
        parts.append("## 用法示例")
        parts.append("")
        for i, cb in enumerate(data["examples"][:2]):
            parts.append("```uvue")
            parts.append(cb.strip())
            parts.append("```")
            parts.append("")
    for key, tabs in data["props"]:
        if len(data["props"]) > 1:
            parts.append(f"## Props — {key}")
        else:
            parts.append("## Props")
        parts.append("")
        parts.append(markdown_table(tabs))
        parts.append("")
    for key, tabs in data["events"]:
        if len(data["events"]) > 1:
            parts.append(f"## Events — {key}")
        else:
            parts.append("## Events")
        parts.append("")
        parts.append(markdown_table(tabs))
        parts.append("")
    for key, tabs in data["slots"]:
        if len(data["slots"]) > 1:
            parts.append(f"## Slots — {key}")
        else:
            parts.append("## Slots")
        parts.append("")
        parts.append(markdown_table(tabs))
        parts.append("")
    for key, tabs in data["methods"]:
        if len(data["methods"]) > 1:
            parts.append(f"## Methods — {key}")
        else:
            parts.append("## Methods（ref 调用）")
        parts.append("")
        if isinstance(tabs, list) and tabs and isinstance(tabs[0], str):
            for it in tabs:
                parts.append(f"- `{it}`")
        elif isinstance(tabs, list) and tabs and isinstance(tabs[0], tuple):
            for group_title, items in tabs:
                parts.append(f"**{group_title}**")
                parts.append("")
                for it in items:
                    parts.append(f"- `{it}`")
                parts.append("")
        else:
            parts.append(markdown_table(tabs))
        parts.append("")
    for key, items in data["deps"]:
        parts.append("## 依赖")
        parts.append("")
        for it in items:
            parts.append(f"- {it}")
        parts.append("")
    for key, items in data["platform"]:
        parts.append("## 平台说明")
        parts.append("")
        for it in items:
            parts.append(f"- {it}")
        parts.append("")
    return "\n".join(parts).rstrip() + "\n"

def markdown_table(rows):
    if not rows:
        return ""
    header = rows[0]
    out = ["| " + " | ".join(header) + " |",
           "|" + "|".join(["---"] * len(header)) + "|"]
    for r in rows[1:]:
        r = r + [""] * (len(header) - len(r))
        out.append("| " + " | ".join(r) + " |")
    return "\n".join(out)

def main():
    os.makedirs(OUT, exist_ok=True)
    for d in sorted(os.listdir(ROOT)):
        if not d.startswith("nax-") or d in ("nax-ui", "nax-ui-theme", "nax-video"):
            continue
        readme = os.path.join(ROOT, d, "readme.md")
        if not os.path.exists(readme):
            print("MISS readme:", d)
            continue
        data = parse_readme(readme)
        ref = extract(data)
        md = render_component(d, ref)
        with open(os.path.join(OUT, d + ".md"), "w", encoding="utf-8") as f:
            f.write(md)
        print(f"OK  {d}: {len(md.splitlines())} lines")

if __name__ == "__main__":
    main()
