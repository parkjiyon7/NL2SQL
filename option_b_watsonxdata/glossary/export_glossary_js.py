"""HTML(docs/glossary.js)용 용어집 데이터를 만든다. 원본은 build_glossary_csv.py의 TERMS 등이다(wxdi에 가져온 내용과 같다).

실행: ./venv/bin/python option_b_watsonxdata/glossary/export_glossary_js.py
"""
import json
import pathlib

import build_glossary_csv as g

OUT = pathlib.Path(__file__).resolve().parents[2] / "docs" / "glossary.js"


def main() -> None:
    def rel(pairs, key):
        return [b for a, b in pairs if a == key]

    terms = []
    for name, desc in g.TERMS.items():
        terms.append({
            "name": name,
            "desc": desc,
            "synonyms": g.SYNONYMS.get(name, []),
            "related": rel(g.RELATED, name) + [a for a, b in g.RELATED if b == name],
            "partOf": rel(g.PART_OF, name),
            "typeOf": rel(g.TYPE_OF, name),
        })
    data = {"category": g.CATEGORY, "terms": terms, "synonymCount": sum(len(v) for v in g.SYNONYMS.values())}
    OUT.write_text("window.GLOSSARY = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
    print(f"wrote {OUT.name}: terms={len(terms)}, synonyms={data['synonymCount']}")


if __name__ == "__main__":
    main()
