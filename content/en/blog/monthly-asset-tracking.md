---
title: "Monthly Asset Tracking Workbook | Record Balances and Understand Changes"
date: "2026-06-20"
updatedAt: "2026-09-11"
description: "Download a free Excel workbook and follow a fictional example. Learn to distinguish transfers, cash flows, and investment gains, and to handle missing months without treating them as zero."
tags: ["asset tracking", "household finance", "investment journal", "spreadsheet", "long-term investing", "recurring investment"]
category: "us-stock"
published: true
featured: true
---

## Record Account Balances at Month-End

I record my total assets monthly in Google Sheets. Bank and brokerage accounts are rows; months are columns. The bottom rows calculate the total and the change from the previous month. I include physical cash, but do not currently record allocation percentages.

I usually record after salary arrives and credit card payments clear at month-end. I focus more on changes over a year than on a single month.

:::comment
I do not track investment performance very closely. With salary and bonuses continually going into investments, an increase in assets is not the same as an investment gain.

My starting point is simply to check bank and brokerage accounts each month. Being a little late is less important to me than keeping the record going.
:::

The downloadable workbook is based on this routine. The figures below are **fictional examples, not my actual balances**.

## Download the Workbook

[Download the monthly asset tracking workbook (.xlsx, Japanese labels)](/downloads/gaizen-asset-tracking-template.xlsx)

No registration is required. The distributed file contains no personal Google account, email address, or actual author balances.

| Sheet | Purpose |
|---|---|
| 資産記録 / Asset record | Enter bank, brokerage, pension, points, gift card, cash, and crypto balances in yellow cells |
| ダッシュボード / Dashboard | Latest recorded month, totals, monthly change, change since January-end, and column charts |
| 使い方 / Instructions | Input and interpretation notes |
| 記入例（架空） / Fictional example | Three months of example balances, separate from your own records |

The total covers the financial assets and other balances you enter. **It is not net worth after deducting debt, and it does not calculate investment returns or taxable gains.** Points and gift cards are not as freely spendable as cash. Check bank and cash subtotals separately when planning living expenses.

## Enter the First Month

1. Identify the accounts you use in the asset record. Account names can be changed; keep subtotal and total rows intact.
2. Enter balances in yen for the relevant month, using a consistent valuation date. Headers initially cover January through December 2026; rename them for a different year.
3. Include both securities and uninvested brokerage cash. If the account total already includes cash, do not add it again.
4. Do not count pensions such as iDeCo in both a brokerage total and their dedicated rows.
5. Check the total, then open the dashboard. Investigate missing entries before interpreting a surprising monthly change.

The physical cash row is for notes and coins, not bank balances or brokerage cash already recorded elsewhere. Convert foreign currency and crypto to yen using a consistent method at the recording date.

## Example: JPY 1.90 Million Becomes JPY 1.97 Million

This fictional example is simplified to four accounts. All figures are yen.

| Account | January-end | February-end | March-end |
|---|---:|---:|---:|
| Rakuten Bank | 300,000 | 250,000 | 280,000 |
| SMBC | 100,000 | 120,000 | 110,000 |
| Rakuten Securities | 1,000,000 | 1,080,000 | 1,050,000 |
| SBI Securities | 500,000 | 520,000 | 540,000 |
| Total | 1,900,000 | 1,970,000 | 1,980,000 |
| Monthly change | No comparison | +70,000 | +10,000 |

February's assets increased by JPY 70,000. **That is not necessarily an investment gain.** Suppose salary and other non-investment income were JPY 300,000, while living expenses and other non-investment spending were JPY 240,000:

```text
Increase in assets                         JPY 70,000
Non-investment income less spending        JPY 60,000
Remaining difference                       JPY 10,000
```

With a consistent set of accounts, aligned valuation dates, and no omitted cash flows, the difference is a starting point for investigating investment results. Dividends, taxes, fees, and currency changes can all contribute. It is not necessarily realized trading profit.

A proper investment return requires a defined portfolio boundary and dated contributions and withdrawals. This workbook does not perform that calculation.

### Moving JPY 100,000 to a Brokerage Does Not Increase Assets

Assume no fees or market changes. A bank balance of JPY 300,000 plus a brokerage balance of JPY 1,000,000 totals JPY 1,300,000. Transfer JPY 100,000 to the brokerage: balances become JPY 200,000 and JPY 1,100,000. The total remains JPY 1,300,000.

Because this workbook includes both accounts, the transfer is internal. Adding it again as new assets would inflate the total. For a performance calculation covering only the brokerage, however, the transfer would count as an external contribution. Define what you are measuring first.

## Blank, Zero, and Missing Entries

| Situation | Treatment |
|---|---|
| A month has not been recorded | Leave the entire month blank; totals and changes remain blank |
| A checked account has a zero balance | Enter numeric 0, which counts as an entry |
| The previous month is missing | Current total is available, but monthly change cannot be compared |
| Only some accounts are entered | The workbook totals entered balances; check completeness yourself |
| January has no record | Change since January-end is unavailable; recording can still start later |

A pending transfer may also be absent from one account before appearing in another. Align records after the transfer clears instead of treating that temporary gap as a loss.

“Change since January-end” compares with the January month-end balance. It is not a calendar-year change starting from the previous December-end. Keep the previous year-end record if you want that comparison.

## Using Google Sheets

Upload the Excel file to Google Drive and open it in Google Sheets. See [Google's official Excel and Sheets instructions](https://support.google.com/docs/answer/9331167).

After importing, check that the fictional example totals are JPY 1,900,000, JPY 1,970,000, and JPY 1,980,000, and that charts appear. Formula handling and chart appearance can differ by application. Behavior inside your Google account needs verification in your own environment.

Check sharing settings after entering your own data. An anonymous template does not make the balances and account names you add anonymous.

## What to Check in a Negative Month

I invest after salary arrives and do not stop solely because the previous month's total fell. When markets decline, I tend to want to invest more. But a balance change first deserves a practical check:

1. Are any accounts missing or counted twice?
2. Was there a large purchase, tax payment, bonus, or unusual cash flow?
3. Is enough cash left for living expenses, card payments, and planned spending?
4. After those checks, how much of the change reflects investment prices?

Assets can fall over a full year as well. The record cannot guarantee progress; it helps plan contributions and cash reserves. Continue with [emergency cash planning](/en/blog/emergency-fund/) and [portfolio rebalancing](/en/blog/portfolio-rebalancing/).

## Changes and References

- September 11, 2026: Added a fictional example, corrected comparisons with missing months, renamed year-start comparisons to January-end comparisons, and clarified transfers and cash flows.
- [Google Docs Editors Help: Use both Excel & Sheets](https://support.google.com/docs/answer/9331167)
- [Financial Services Agency: Investment Basics](https://www.fsa.go.jp/policy/nisa2/knowledge/basic/index.html)
