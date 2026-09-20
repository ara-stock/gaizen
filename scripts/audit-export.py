#!/usr/bin/env python3
"""Validate exported navigation, XML, and the public workbook without network access."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
from zipfile import ZipFile
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "out"
ORIGIN = "https://gaizen.xyz"
NS = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.links = []
        self.ids = set()
        self.canonical = None
        self.noindex = False
        self.h1 = 0
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.add(a["id"])
        if tag == "h1":
            self.h1 += 1
        if tag == "a" and "href" in a:
            self.links.append(a["href"])
        if tag == "link" and a.get("rel") == "canonical":
            self.canonical = a.get("href")
        if tag == "meta" and a.get("name") == "robots":
            self.noindex = "noindex" in a.get("content", "")


def file_for(route):
    target = OUT / unquote(route).lstrip("/")
    return target / "index.html" if target.is_dir() else target


pages = {file: Page(file.read_text()) for file in OUT.rglob("*.html")}
sitemap = ET.parse(OUT / "sitemap.xml").getroot()
urls = [node.text for node in sitemap.findall("s:url/s:loc", NS)]
assert urls and len(urls) == len(set(urls)), "Empty or duplicate sitemap"
assert (OUT / "sitemap.xml").read_bytes() == (OUT / "sitemap-index.xml").read_bytes()
for url in urls:
    assert url.startswith(ORIGIN + "/") and url.endswith("/"), url
    file = file_for(urlsplit(url).path)
    assert file in pages, f"Missing sitemap target: {url}"
    assert pages[file].canonical == url, f"Canonical mismatch: {url}"
    assert not pages[file].noindex, f"Noindex sitemap target: {url}"
    assert pages[file].h1 == 1, f"Expected one H1: {url}"

links = 0
for file, page in pages.items():
    for href in page.links:
        parsed = urlsplit(href)
        if parsed.netloc and parsed.netloc != "gaizen.xyz":
            continue
        if parsed.scheme not in ("", "https"):
            continue
        if not parsed.path:
            target = file
        elif parsed.path.startswith("/"):
            target = file_for(parsed.path)
        else:
            continue
        assert target.exists(), f"Broken local link: {file.relative_to(OUT)} -> {href}"
        if parsed.fragment and target in pages:
            assert unquote(parsed.fragment) in pages[target].ids, f"Missing anchor: {href} in {file}"
        links += 1

feed = ET.parse(OUT / "feed.xml").getroot()
items = feed.findall("channel/item")
assert items, "Empty RSS"
for item in items:
    assert item.findtext("link") in urls, "RSS includes a non-canonical/unpublished article"

with ZipFile(OUT / "downloads/gaizen-asset-tracking-template.xlsx") as workbook:
    names = workbook.namelist()
    assert not any("externalLink" in name or "vbaProject" in name for name in names)
    sheets = ET.fromstring(workbook.read("xl/workbook.xml"))
    x = {"x": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
    sheet_names = [sheet.attrib["name"] for sheet in sheets.findall("x:sheets/x:sheet", x)]
    assert set(sheet_names) == {"使い方", "資産記録", "ダッシュボード", "記入例（架空）"}, sheet_names
    assert len([name for name in names if name.startswith("xl/charts/chart") and name.endswith(".xml")]) == 3
    sample_number = sheet_names.index("記入例（架空）") + 1
    sample = ET.fromstring(workbook.read(f"xl/worksheets/sheet{sample_number}.xml"))
    values = {cell.attrib["r"]: cell.findtext("x:v", namespaces=x) for cell in sample.findall(".//x:c", x)}
    assert [values[f"{col}10"] for col in "BCD"] == ["1900000", "1970000", "1980000"]
    for name in names:
        if name.endswith(".xml"):
            tree = ET.fromstring(workbook.read(name))
            for formula in tree.findall(".//x:f", x):
                assert "#REF!" not in (formula.text or ""), name

print(f"PASS: {len(pages)} HTML pages, {len(urls)} sitemap URLs, {links} local links, {len(items)} RSS items, workbook structure")
