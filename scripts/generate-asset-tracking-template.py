#!/usr/bin/env python3
"""Generate the GAIZEN FINANCE monthly asset tracking workbook."""

from pathlib import Path

try:
    import xlsxwriter
except ImportError as exc:
    raise SystemExit(
        "XlsxWriter is required. Install it in a virtual environment with "
        "`pip install XlsxWriter==3.2.5`."
    ) from exc


ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "public" / "downloads" / "gaizen-asset-tracking-template.xlsx"

MONTHS = [f"2026年{month}月" for month in range(1, 13)]

CATEGORIES = [
    (
        "銀行",
        "#D9EAD3",
        [
            "楽天銀行",
            "三菱UFJ銀行",
            "三井住友銀行",
            "みずほ銀行",
            "ゆうちょ銀行",
            "埼玉りそな銀行",
            "あおぞら銀行",
            "auじぶん銀行",
            "SBI新生銀行",
        ],
    ),
    ("証券会社", "#F4CCCC", ["楽天証券", "マネックス証券", "SBI証券", "野村證券"]),
    ("iDeCo", "#CFE2F3", ["楽天証券"]),
    ("確定拠出年金", "#D9D2E9", ["野村證券"]),
    (
        "アプリ・ポイント",
        "#FCE5CD",
        ["PayPay", "FamiPay", "楽天ポイント", "dポイント", "Vポイント", "Pontaポイント", "WAONポイント", "Amazonギフト残高"],
    ),
    ("商品券", "#E4DFEC", ["QUOカード", "VJAギフトカード", "Visaギフトカード"]),
    ("現金", "#D9E1F2", ["現金"]),
    ("暗号資産", "#DDEBF7", ["暗号資産（円換算）"]),
]


def excel_row(row_index: int) -> int:
    return row_index + 1


def create_workbook() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    workbook = xlsxwriter.Workbook(OUTPUT)
    workbook.set_properties(
        {
            "title": "GAIZEN FINANCE 月次資産記録テンプレート",
            "subject": "銀行・証券・ポイント・現金・暗号資産の月次残高管理",
            "author": "GAIZEN FINANCE",
            "manager": "GAIZEN FINANCE",
            "company": "GAIZEN FINANCE",
            "category": "Personal Finance Template",
            "keywords": "資産管理, 月次記録, 投資, GAIZEN FINANCE",
            "comments": "個人情報を含まない配布用テンプレート",
        }
    )
    colors = {
        "navy": "#132238",
        "green": "#00A86B",
        "green_dark": "#087F5B",
        "green_light": "#E8F5EF",
        "gold": "#C9A84C",
        "surface": "#F7F9FA",
        "border": "#CBD5E1",
        "muted": "#64748B",
        "input": "#FFF8E1",
        "white": "#FFFFFF",
        "negative": "#B91C1C",
    }

    title_format = workbook.add_format(
        {
            "bold": True,
            "font_size": 20,
            "font_color": colors["white"],
            "bg_color": colors["navy"],
            "align": "left",
            "valign": "vcenter",
        }
    )
    subtitle_format = workbook.add_format(
        {
            "font_size": 10,
            "font_color": colors["muted"],
            "bg_color": colors["surface"],
            "align": "left",
            "valign": "vcenter",
        }
    )
    header_format = workbook.add_format(
        {
            "bold": True,
            "font_color": colors["white"],
            "bg_color": colors["navy"],
            "border": 1,
            "border_color": colors["border"],
            "align": "center",
            "valign": "vcenter",
        }
    )
    item_format = workbook.add_format(
        {
            "border": 1,
            "border_color": colors["border"],
            "valign": "vcenter",
        }
    )
    input_format = workbook.add_format(
        {
            "bg_color": colors["input"],
            "border": 1,
            "border_color": colors["border"],
            "num_format": '#,##0;[Red]-#,##0;"-"',
            "align": "right",
            "valign": "vcenter",
        }
    )
    subtotal_label_format = workbook.add_format(
        {
            "bold": True,
            "bg_color": colors["surface"],
            "border": 1,
            "border_color": colors["border"],
            "font_color": colors["muted"],
            "align": "right",
        }
    )
    subtotal_value_format = workbook.add_format(
        {
            "bold": True,
            "bg_color": colors["surface"],
            "border": 1,
            "border_color": colors["border"],
            "num_format": '#,##0;[Red]-#,##0;"-"',
            "align": "right",
        }
    )
    total_label_format = workbook.add_format(
        {
            "bold": True,
            "font_color": colors["white"],
            "bg_color": colors["green_dark"],
            "border": 1,
            "border_color": colors["green_dark"],
            "font_size": 11,
        }
    )
    total_value_format = workbook.add_format(
        {
            "bold": True,
            "font_color": colors["white"],
            "bg_color": colors["green_dark"],
            "border": 1,
            "border_color": colors["green_dark"],
            "num_format": '#,##0;[Red]-#,##0;"-"',
            "font_size": 11,
            "align": "right",
        }
    )
    metric_label_format = workbook.add_format(
        {
            "bold": True,
            "bg_color": colors["green_light"],
            "border": 1,
            "border_color": colors["border"],
        }
    )
    metric_value_format = workbook.add_format(
        {
            "bg_color": colors["green_light"],
            "border": 1,
            "border_color": colors["border"],
            "num_format": '#,##0;[Red]-#,##0;"-"',
            "align": "right",
        }
    )
    percent_format = workbook.add_format(
        {
            "bg_color": colors["green_light"],
            "border": 1,
            "border_color": colors["border"],
            "num_format": '0.0%;[Red]-0.0%;"-"',
            "align": "right",
        }
    )

    record = workbook.add_worksheet("資産記録")
    record.set_comments_author("GAIZEN FINANCE")
    record.set_tab_color(colors["green"])
    record.hide_gridlines(2)
    record.set_landscape()
    record.fit_to_pages(1, 0)
    record.set_margins(0.25, 0.25, 0.5, 0.5)
    record.set_column("A:A", 18)
    record.set_column("B:B", 22)
    record.set_column("C:N", 14)
    record.set_row(0, 34)
    record.merge_range("A1:N1", "月次資産記録", title_format)
    record.merge_range(
        "A2:N2",
        "毎月ほぼ同じタイミングで、各口座の月末時点の円換算残高を黄色いセルへ入力します。金額は半角数字で入力してください。",
        subtitle_format,
    )

    header_row = 3
    record.write(header_row, 0, "大項目", header_format)
    record.write(header_row, 1, "項目", header_format)
    for month_index, month in enumerate(MONTHS, start=2):
        record.write(header_row, month_index, month, header_format)
    record.set_row(header_row, 28)
    record.freeze_panes(header_row + 1, 2)

    item_rows: list[int] = []
    subtotal_rows: dict[str, int] = {}
    row = header_row + 1

    for category, color, items in CATEGORIES:
        category_format = workbook.add_format(
            {
                "bold": True,
                "bg_color": color,
                "border": 1,
                "border_color": colors["border"],
                "align": "center",
                "valign": "vcenter",
                "text_wrap": True,
            }
        )
        start_row = row
        for item in items:
            item_rows.append(row)
            record.write(row, 1, item, item_format)
            for col in range(2, 14):
                record.write_blank(row, col, None, input_format)
            row += 1

        if len(items) > 1:
            record.merge_range(start_row, 0, row - 1, 0, category, category_format)
        else:
            record.write(start_row, 0, category, category_format)

        subtotal_rows[category] = row
        record.write(row, 0, "", subtotal_label_format)
        record.write(row, 1, f"{category} 小計", subtotal_label_format)
        for col in range(2, 14):
            col_name = xlsxwriter.utility.xl_col_to_name(col)
            cells = f"{col_name}{excel_row(start_row)}:{col_name}{excel_row(row - 1)}"
            formula = f'=IF(COUNT({cells})=0,"",SUM({cells}))'
            record.write_formula(row, col, formula, subtotal_value_format, "")
        row += 1

    total_row = row
    record.merge_range(total_row, 0, total_row, 1, "合計", total_label_format)
    subtotal_excel_rows = [excel_row(value) for value in subtotal_rows.values()]
    for col in range(2, 14):
        col_name = xlsxwriter.utility.xl_col_to_name(col)
        inputs = ",".join(f"{col_name}{excel_row(item_row)}" for item_row in item_rows)
        subtotals = ",".join(f"{col_name}{subtotal_row}" for subtotal_row in subtotal_excel_rows)
        formula = f'=IF(COUNT({inputs})=0,"",SUM({subtotals}))'
        record.write_formula(total_row, col, formula, total_value_format, "")
    record.set_row(total_row, 24)

    previous_row = row + 1
    record.merge_range(previous_row, 0, previous_row, 1, "前月比（金額）", metric_label_format)
    record.write_blank(previous_row, 2, None, metric_value_format)
    for col in range(3, 14):
        current = xlsxwriter.utility.xl_col_to_name(col)
        previous = xlsxwriter.utility.xl_col_to_name(col - 1)
        record.write_formula(
            previous_row,
            col,
            f'=IF(COUNT({current}{excel_row(total_row)},{previous}{excel_row(total_row)})<2,"",{current}{excel_row(total_row)}-{previous}{excel_row(total_row)})',
            metric_value_format,
            "",
        )

    previous_percent_row = row + 2
    record.merge_range(previous_percent_row, 0, previous_percent_row, 1, "前月比（率）", metric_label_format)
    record.write_blank(previous_percent_row, 2, None, percent_format)
    for col in range(3, 14):
        current = xlsxwriter.utility.xl_col_to_name(col)
        previous = xlsxwriter.utility.xl_col_to_name(col - 1)
        formula = f'=IF(COUNT({current}{excel_row(total_row)},{previous}{excel_row(total_row)})<2,"",IFERROR({current}{excel_row(total_row)}/{previous}{excel_row(total_row)}-1,""))'
        record.write_formula(previous_percent_row, col, formula, percent_format, "")

    year_start_row = row + 3
    record.merge_range(year_start_row, 0, year_start_row, 1, "1月末比（金額）", metric_label_format)
    record.write_formula(year_start_row, 2, f'=IF(ISNUMBER(C{excel_row(total_row)}),0,"")', metric_value_format, "")
    for col in range(3, 14):
        current = xlsxwriter.utility.xl_col_to_name(col)
        record.write_formula(
            year_start_row,
            col,
            f'=IF(COUNT({current}{excel_row(total_row)},$C${excel_row(total_row)})<2,"",{current}{excel_row(total_row)}-$C${excel_row(total_row)})',
            metric_value_format,
            "",
        )

    input_count_row = row + 4
    record.write(input_count_row, 1, "入力件数")
    for col in range(2, 14):
        col_name = xlsxwriter.utility.xl_col_to_name(col)
        references = ",".join(f"{col_name}{excel_row(item_row)}" for item_row in item_rows)
        record.write_formula(input_count_row, col, f"=COUNT({references})", None, 0)
    record.set_row(input_count_row, None, None, {"hidden": True})

    validation = {
        "validate": "integer",
        "criteria": ">=",
        "value": 0,
        "input_title": "月末残高",
        "input_message": "円換算した0以上の整数を入力してください。",
        "error_title": "入力を確認してください",
        "error_message": "0以上の半角数字で入力してください。",
    }
    for item_row in item_rows:
        record.data_validation(item_row, 2, item_row, 13, validation)
    record.conditional_format(
        previous_row,
        3,
        year_start_row,
        13,
        {
            "type": "cell",
            "criteria": "<",
            "value": 0,
            "format": workbook.add_format({"font_color": colors["negative"]}),
        },
    )
    record.write_comment(
        header_row,
        2,
        "給料日やクレジットカードの支払いが終わった後など、毎月ほぼ同じ条件で記録すると比較しやすくなります。",
    )
    record.print_area(0, 0, year_start_row, 13)
    record.repeat_rows(0, header_row)

    dashboard = workbook.add_worksheet("ダッシュボード")
    dashboard.set_tab_color(colors["gold"])
    dashboard.hide_gridlines(2)
    dashboard.set_column("A:A", 3)
    dashboard.set_column("B:M", 13)
    dashboard.set_row(0, 34)
    dashboard.merge_range("B1:M1", "資産推移ダッシュボード", title_format)
    dashboard.merge_range(
        "B2:M2",
        "資産記録シートへ入力すると、総資産とカテゴリ別残高の棒グラフが自動で更新されます。",
        subtitle_format,
    )

    card_label = workbook.add_format(
        {
            "font_size": 9,
            "font_color": colors["muted"],
            "bg_color": colors["surface"],
            "align": "left",
            "valign": "vcenter",
            "left": 1,
            "right": 1,
            "top": 1,
            "border_color": colors["border"],
        }
    )
    card_value = workbook.add_format(
        {
            "bold": True,
            "font_size": 16,
            "font_color": colors["navy"],
            "bg_color": colors["surface"],
            "align": "left",
            "valign": "vcenter",
            "left": 1,
            "right": 1,
            "bottom": 1,
            "border_color": colors["border"],
            "num_format": '#,##0;[Red]-#,##0;"-"',
        }
    )
    card_text_value = workbook.add_format(
        {
            "bold": True,
            "font_size": 16,
            "font_color": colors["navy"],
            "bg_color": colors["surface"],
            "align": "left",
            "valign": "vcenter",
            "left": 1,
            "right": 1,
            "bottom": 1,
            "border_color": colors["border"],
        }
    )

    count_range = f"'資産記録'!$C${excel_row(input_count_row)}:$N${excel_row(input_count_row)}"
    month_range = f"'資産記録'!$C${excel_row(header_row)}:$N${excel_row(header_row)}"
    total_range = f"'資産記録'!$C${excel_row(total_row)}:$N${excel_row(total_row)}"
    previous_range = f"'資産記録'!$C${excel_row(previous_row)}:$N${excel_row(previous_row)}"
    year_start_range = f"'資産記録'!$C${excel_row(year_start_row)}:$N${excel_row(year_start_row)}"

    cards = [
        ("B4:E4", "B5:E6", "最新入力月", f'=IFERROR(LOOKUP(2,1/({count_range}>0),{month_range}),"未入力")', card_text_value, "未入力"),
        ("F4:I4", "F5:I6", "最新の総資産", f'=IFERROR(LOOKUP(2,1/({count_range}>0),{total_range}),"")', card_value, ""),
        ("J4:M4", "J5:M6", "直近の前月比", f'=IFERROR(LOOKUP(2,1/({count_range}>0),IF(ISNUMBER({previous_range}),{previous_range},"比較不可")),"未入力")', card_value, "未入力"),
    ]
    for label_range, value_range, label, formula, value_format, cached in cards:
        dashboard.merge_range(label_range, label, card_label)
        dashboard.merge_range(value_range, "", value_format)
        first_cell = value_range.split(":")[0]
        dashboard.write_formula(first_cell, formula, value_format, cached)

    dashboard.merge_range("B8:E8", "1月末からの増減", card_label)
    dashboard.merge_range("B9:E10", "", card_value)
    dashboard.write_formula(
        "B9",
        f'=IFERROR(LOOKUP(2,1/({count_range}>0),IF(ISNUMBER({year_start_range}),{year_start_range},"比較不可")),"未入力")',
        card_value,
        "未入力",
    )
    dashboard.merge_range("F8:M10", "入力は月1回、同じタイミングで。短期の上下より、年単位で積み上がっているかを確認します。", subtitle_format)

    total_chart = workbook.add_chart({"type": "column"})
    total_chart.add_series(
        {
            "name": "総資産",
            "categories": ["資産記録", header_row, 2, header_row, 13],
            "values": ["資産記録", total_row, 2, total_row, 13],
            "fill": {"color": colors["green"]},
            "border": {"color": colors["green_dark"]},
        }
    )
    total_chart.set_title({"name": "総資産の推移"})
    total_chart.set_y_axis({"name": "円", "num_format": '#,##0,"千"'})
    total_chart.set_x_axis({"name": "月"})
    total_chart.set_legend({"none": True})
    total_chart.set_style(10)
    total_chart.set_size({"width": 900, "height": 350})
    total_chart.set_plotarea({"fill": {"color": colors["white"]}, "border": {"none": True}})
    total_chart.set_chartarea({"fill": {"color": colors["white"]}, "border": {"color": colors["border"]}})
    dashboard.insert_chart("B12", total_chart)

    category_chart = workbook.add_chart({"type": "column", "subtype": "stacked"})
    chart_colors = ["#73B66B", "#E58C8C", "#6FA8DC", "#8E7CC3", "#F6B26B", "#B4A7D6", "#A2C4C9", "#4A86E8"]
    for (category, _, _), chart_color in zip(CATEGORIES, chart_colors):
        subtotal_row = subtotal_rows[category]
        category_chart.add_series(
            {
                "name": category,
                "categories": ["資産記録", header_row, 2, header_row, 13],
                "values": ["資産記録", subtotal_row, 2, subtotal_row, 13],
                "fill": {"color": chart_color},
                "border": {"none": True},
            }
        )
    category_chart.set_title({"name": "カテゴリ別残高の推移"})
    category_chart.set_y_axis({"name": "円", "num_format": '#,##0,"千"'})
    category_chart.set_x_axis({"name": "月"})
    category_chart.set_legend({"position": "bottom"})
    category_chart.set_style(10)
    category_chart.set_size({"width": 900, "height": 380})
    category_chart.set_plotarea({"fill": {"color": colors["white"]}, "border": {"none": True}})
    category_chart.set_chartarea({"fill": {"color": colors["white"]}, "border": {"color": colors["border"]}})
    dashboard.insert_chart("B31", category_chart)

    dashboard.merge_range(
        "B51:M52",
        "注意: 資産額の増減には入出金と運用損益の両方が含まれます。この表だけでは正確な運用利回りを算出できません。",
        subtitle_format,
    )

    guide = workbook.add_worksheet("使い方")
    guide.set_tab_color(colors["navy"])
    guide.hide_gridlines(2)
    guide.set_column("A:A", 3)
    guide.set_column("B:B", 22)
    guide.set_column("C:H", 15)
    guide.set_row(0, 34)
    guide.merge_range("B1:H1", "このテンプレートの使い方", title_format)
    guide.merge_range(
        "B2:H2",
        "個人情報や実際の資産額を含まない、GAIZEN FINANCEの配布用テンプレートです。",
        subtitle_format,
    )

    section_format = workbook.add_format(
        {
            "bold": True,
            "font_size": 13,
            "font_color": colors["green_dark"],
            "bottom": 2,
            "bottom_color": colors["green"],
        }
    )
    body_format = workbook.add_format(
        {
            "font_size": 11,
            "font_color": colors["navy"],
            "text_wrap": True,
            "valign": "top",
        }
    )
    note_format = workbook.add_format(
        {
            "font_size": 10,
            "font_color": colors["muted"],
            "bg_color": colors["surface"],
            "border": 1,
            "border_color": colors["border"],
            "text_wrap": True,
            "valign": "top",
        }
    )

    guide.merge_range("B4:H4", "1. 毎月の残高を入力する", section_format)
    guide.merge_range(
        "B5:H8",
        "「資産記録」シートの黄色いセルへ、各口座の月末時点の残高を円単位で入力します。給料日やクレジットカードの支払いが終わった後など、毎月ほぼ同じタイミングで記録すると比較しやすくなります。暗号資産は記録日時点の円換算額を入力します。",
        body_format,
    )
    guide.merge_range("B10:H10", "2. 自分に不要な項目を整理する", section_format)
    guide.merge_range(
        "B11:H14",
        "使っていない銀行や証券会社は項目名を変更して利用できます。行を削除すると数式やグラフの参照がずれる場合があるため、不要な行は空欄のまま残すか、別の口座名へ変更する方法が安全です。",
        body_format,
    )
    guide.merge_range("B16:H16", "3. ダッシュボードで推移を見る", section_format)
    guide.merge_range(
        "B17:H20",
        "「ダッシュボード」シートでは、総資産の推移とカテゴリ別残高を棒グラフで確認できます。前月比には運用損益だけでなく、給与・賞与からの入金や生活費の支出も含まれます。単月の増減だけで投資成績を判断しないでください。",
        body_format,
    )
    guide.merge_range("B22:H22", "Googleスプレッドシートで使う", section_format)
    guide.merge_range(
        "B23:H26",
        "Googleドライブで［新規］→［ファイルのアップロード］からこのExcelファイルを選び、Googleスプレッドシートとして開きます。取り込み後は、ご自身のGoogleアカウント内で管理してください。配布元のGoogleアカウントや個人情報はこのファイルに含まれていません。",
        body_format,
    )
    guide.merge_range(
        "B28:H31",
        "未記録の月は全欄を空欄にし、確認済みの残高ゼロには0を入力します。一部の口座だけ入力した月も集計されるため、全口座を確認してから比較してください。借入残高を差し引く純資産や、運用利回り・税務上の損益を計算する表ではありません。1月末比は1月末の残高との比較で、暦年の年間損益ではありません。",
        note_format,
    )
    guide.write_url("B33", "https://gaizen.xyz/blog/monthly-asset-tracking/", string="GAIZEN FINANCE｜資産額を毎月記録する方法")

    sample = workbook.add_worksheet("記入例（架空）")
    sample.hide_gridlines(2)
    sample.set_column("A:A", 22)
    sample.set_column("B:D", 18)
    sample.merge_range("A1:D1", "記入例（架空の金額・単位：円）", title_format)
    sample.set_row(0, 34)
    sample.merge_range("A2:D3", "筆者の実績ではありません。入力用シートやダッシュボードとは連動していない、計算の説明用シートです。", note_format)
    sample.write_row("A5", ["口座", "2026年1月", "2026年2月", "2026年3月"], header_format)
    examples = [
        ["楽天銀行", 300000, 250000, 280000],
        ["三井住友銀行", 100000, 120000, 110000],
        ["楽天証券", 1000000, 1080000, 1050000],
        ["SBI証券", 500000, 520000, 540000],
    ]
    for index, values in enumerate(examples, start=5):
        sample.write(index, 0, values[0], item_format)
        sample.write_row(index, 1, values[1:], input_format)
    sample.write("A10", "合計", total_label_format)
    sample.write("A11", "前月比（金額）", metric_label_format)
    for col, total in enumerate([1900000, 1970000, 1980000], start=1):
        letter = xlsxwriter.utility.xl_col_to_name(col)
        sample.write_formula(9, col, f"=SUM({letter}6:{letter}9)", total_value_format, total)
        if col > 1:
            previous = xlsxwriter.utility.xl_col_to_name(col - 1)
            sample.write_formula(10, col, f"={letter}10-{previous}10", metric_value_format, [70000, 10000][col - 2])
    sample.merge_range("A13:D16", "2月の増加7万円は運用益とは限りません。仮に給与等の収入30万円、生活費等の支出24万円なら、差し引き入金は6万円。残る1万円も、入出金・記録漏れを照合して初めて運用損益等と判断できます。銀行から証券への振替は合計を増やしません。", note_format)
    example_chart = workbook.add_chart({"type": "column"})
    example_chart.add_series({
        "name": "総資産（架空）",
        "categories": ["記入例（架空）", 4, 1, 4, 3],
        "values": ["記入例（架空）", 9, 1, 9, 3],
        "fill": {"color": colors["green"]},
    })
    example_chart.set_title({"name": "架空の記入例：総資産の推移"})
    example_chart.set_y_axis({"name": "円", "min": 0})
    example_chart.set_legend({"none": True})
    sample.insert_chart("A18", example_chart)

    workbook.close()


if __name__ == "__main__":
    create_workbook()
    print(f"Generated: {OUTPUT}")
